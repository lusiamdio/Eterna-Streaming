-- 1. CREATE CUSTOM ENUMS (TYPES) WITH DUPLICATE HANDLING
DO $$ BEGIN
  CREATE TYPE public.user_role AS ENUM ('normal', 'partner', 'super_admin');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.content_status AS ENUM ('draft', 'pending_approval', 'published', 'rejected', 'archived');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.content_type AS ENUM ('movie', 'series', 'documentary', 'short', 'live_event');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- 2. CREATE AUTHORIZATION HELPERS TO PREVENT INFINITE RECURSION (Critical fix)
-- Supabase RLS causes infinite recursion if a policy queries its own table.
CREATE OR REPLACE FUNCTION public.authorize_user_role(required_role public.user_role)
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER 
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE id = auth.uid() AND role = required_role
  );
$$;

-- 3. CREATE TABLES 
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  avatar_url text,
  role public.user_role default 'normal'::public.user_role not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

CREATE TABLE IF NOT EXISTS public.content (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  cover_url text,
  video_url text,
  trailer_url text,
  content_type public.content_type not null default 'movie',
  status public.content_status not null default 'draft',
  release_year integer,
  rating text,
  genres text[],
  creator_id uuid references public.profiles(id) on delete set null,
  published_by uuid references public.profiles(id) on delete set null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

CREATE TABLE IF NOT EXISTS public.episodes (
  id uuid default gen_random_uuid() primary key,
  content_id uuid references public.content(id) on delete cascade not null,
  season_num integer not null default 1,
  episode_num integer not null,
  title text not null,
  description text,
  video_url text,
  thumbnail_url text,
  duration integer,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

CREATE TABLE IF NOT EXISTS public.watchlist (
  user_id uuid references public.profiles(id) on delete cascade not null,
  content_id uuid references public.content(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, content_id)
);

CREATE TABLE IF NOT EXISTS public.content_views (
  id uuid default gen_random_uuid() primary key,
  content_id uuid references public.content(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete set null,
  viewed_duration integer default 0,
  viewed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. APPLY RLS POLICIES

-- First, drop existing policies if they exist to avoid 'policy already exists' errors
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
DROP POLICY IF EXISTS "Super Admins can view all profiles" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;

DROP POLICY IF EXISTS "Anyone can view published content" ON public.content;
DROP POLICY IF EXISTS "Partners can view own content" ON public.content;
DROP POLICY IF EXISTS "Partners can insert own content" ON public.content;
DROP POLICY IF EXISTS "Partners can update own pending content" ON public.content;
DROP POLICY IF EXISTS "Super Admins manage all content" ON public.content;

DROP POLICY IF EXISTS "Anyone can view published episodes" ON public.episodes;
DROP POLICY IF EXISTS "Partners manage own episodes" ON public.episodes;
DROP POLICY IF EXISTS "Super admins manage all episodes" ON public.episodes;

DROP POLICY IF EXISTS "Users manage own watchlist" ON public.watchlist;
DROP POLICY IF EXISTS "Users can insert views" ON public.content_views;
DROP POLICY IF EXISTS "Partners view own stream analytics" ON public.content_views;
DROP POLICY IF EXISTS "Super Admins view all analytics" ON public.content_views;

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_views ENABLE ROW LEVEL SECURITY;

-- [PROFILES RLS]
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Super Admins can view all profiles" ON public.profiles FOR SELECT USING (public.authorize_user_role('super_admin'));
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- [CONTENT RLS]
CREATE POLICY "Anyone can view published content" ON public.content FOR SELECT USING (status = 'published');
CREATE POLICY "Partners can view own content" ON public.content FOR SELECT USING (creator_id = auth.uid());
CREATE POLICY "Partners can insert own content" ON public.content FOR INSERT WITH CHECK (
  auth.uid() = creator_id AND public.authorize_user_role('partner')
);
CREATE POLICY "Partners can update own pending content" ON public.content FOR UPDATE USING (
  auth.uid() = creator_id AND public.authorize_user_role('partner')
);
CREATE POLICY "Super Admins manage all content" ON public.content FOR ALL USING (public.authorize_user_role('super_admin'));

-- [EPISODES RLS]
CREATE POLICY "Anyone can view published episodes" ON public.episodes FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.content c WHERE c.id = episodes.content_id AND c.status = 'published')
);
CREATE POLICY "Partners manage own episodes" ON public.episodes FOR ALL USING (
  EXISTS (SELECT 1 FROM public.content c WHERE c.id = episodes.content_id AND c.creator_id = auth.uid())
);
CREATE POLICY "Super admins manage all episodes" ON public.episodes FOR ALL USING (public.authorize_user_role('super_admin'));

-- [WATCHLIST RLS]
CREATE POLICY "Users manage own watchlist" ON public.watchlist FOR ALL USING (auth.uid() = user_id);

-- [ANALYTICS RLS]
CREATE POLICY "Users can insert views" ON public.content_views FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Partners view own stream analytics" ON public.content_views FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.content c WHERE c.id = content_views.content_id AND c.creator_id = auth.uid())
);
CREATE POLICY "Super Admins view all analytics" ON public.content_views FOR SELECT USING (public.authorize_user_role('super_admin'));

-- 5. AUTOMATIC TRIGGER FOR NEW USERS
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)),
    -- Automatically make this specific email a super admin
    CASE WHEN new.email = 'simao@neurogrowthlabs.co.za' THEN 'super_admin'::public.user_role ELSE 'normal'::public.user_role END
  );
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
