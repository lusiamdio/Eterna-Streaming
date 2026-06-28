-- =====================================================================
-- ETERNA STREAMING OS - UNIFIED DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- =====================================================================
-- A robust, completely synced, production-hardened schema designed to 
-- connect Normal User engagements, Partner Platform workflows, and 
-- Super Admin Command Center operations on Supabase.
-- =====================================================================

-- 1. CUSTOM ENUMS (TYPES) WITH IDEMPOTENT CREATION
DO $$ BEGIN
  CREATE TYPE public.user_role AS ENUM ('normal', 'pending_partner', 'partner', 'super_admin');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.content_status AS ENUM ('draft', 'pending_approval', 'published', 'rejected', 'archived');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.content_type AS ENUM ('movie', 'series', 'documentary', 'short', 'live_event');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.license_status AS ENUM ('draft', 'pending_signature', 'active', 'expired', 'terminated');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.payout_status AS ENUM ('pending', 'processing', 'completed', 'failed');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE public.audit_category AS ENUM ('security', 'billing', 'content', 'system', 'general');
EXCEPTION WHEN duplicate_object THEN null; END $$;


-- 2. RECURSION-SAFE SECURITY DEFINER AUTHORIZATION HELPERS
-- These bypass row level security infinite loop checks on profiles
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

CREATE OR REPLACE FUNCTION public.is_admin_or_super()
RETURNS BOOLEAN
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'super_admin'
  );
$$;


-- 3. INTERACTIVE SCHEMA TABLES

-- A. PROFILES
-- Shared core table for all roles. Automatically created on supabase signUp trigger.
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid references auth.users on delete cascade not null primary key,
  email text not null,
  full_name text,
  avatar_url text,
  role public.user_role default 'normal'::public.user_role not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- B. CONTENT CATALOG
-- Media assets uploaded by content partners, subject to Super Admin approval.
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

-- C. SERIES EPISODES
-- Supports nested episode catalogs for episodic TV series or multi-part specials.
CREATE TABLE IF NOT EXISTS public.episodes (
  id uuid default gen_random_uuid() primary key,
  content_id uuid references public.content(id) on delete cascade not null,
  season_num integer not null default 1,
  episode_num integer not null,
  title text not null,
  description text,
  video_url text,
  thumbnail_url text,
  duration integer, -- in seconds
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- D. WATCHLISTS
-- Normal user personalization preferences. Fully synced.
CREATE TABLE IF NOT EXISTS public.watchlist (
  user_id uuid references public.profiles(id) on delete cascade not null,
  content_id uuid references public.content(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  primary key (user_id, content_id)
);

-- E. REVIEWS & RATINGS
-- Fosters normal user interactive social engagement with media items.
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references public.profiles(id) on delete cascade not null,
  content_id uuid references public.content(id) on delete cascade not null,
  rating numeric(3, 1) check (rating >= 0.0 AND rating <= 10.0),
  comment text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, content_id)
);

-- F. PLAYBACK HISTORY & ANALYTICS (Continue Watching)
-- Essential for normal users' media state synchronization, and feeds directly into Partner Analytics!
CREATE TABLE IF NOT EXISTS public.content_views (
  id uuid default gen_random_uuid() primary key,
  content_id uuid references public.content(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete set null,
  last_playback_position integer default 0, -- elapsed video seconds
  viewed_duration integer default 0, -- raw engagement metric
  completed boolean default false,
  viewed_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- G. REAL-TIME WATCH PARTIES
-- Normal user sync capabilities for social co-viewing.
CREATE TABLE IF NOT EXISTS public.watch_parties (
  id uuid default gen_random_uuid() primary key,
  host_id uuid references public.profiles(id) on delete cascade not null,
  content_id uuid references public.content(id) on delete cascade not null,
  current_time_pos numeric(10,2) default 0.00,
  is_playing boolean default false,
  pin_code text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- H. WATCH PARTY MESSAGES
-- Real-time chat integration during co-viewing parties.
CREATE TABLE IF NOT EXISTS public.watch_party_messages (
  id uuid default gen_random_uuid() primary key,
  party_id uuid references public.watch_parties(id) on delete cascade not null,
  sender_id uuid references public.profiles(id) on delete cascade not null,
  message text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- I. FILMS LICENSE AGREEMENTS
-- Fully connects Partner-initiated applications to the AI License generation and Super Admin Command Center workflows.
CREATE TABLE IF NOT EXISTS public.license_agreements (
  id uuid default gen_random_uuid() primary key,
  content_id uuid references public.content(id) on delete set null,
  partner_id uuid references public.profiles(id) on delete set null,
  rights text not null default 'Exclusive SVOD',
  contract_duration text not null default '2 Years',
  offer_amount text not null,
  sa_jurisdiction boolean default true,
  partner_country text,
  agreement_doc_markdown text, -- Stores AI generated Markdown legal clauses
  status public.license_status default 'draft'::public.license_status not null,
  signed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- J. PARTNER TREASURY SETTINGS
-- High-integrity bank details configuration for automated revenue distribution settings.
CREATE TABLE IF NOT EXISTS public.treasury_settings (
  id uuid default gen_random_uuid() primary key,
  partner_id uuid references public.profiles(id) on delete cascade not null unique,
  routing_code text,
  account_number text,
  bank_name text,
  swift_bic text,
  country text default 'ZAF',
  tax_identifier text,
  payout_frequency text default 'monthly', -- 'weekly', 'monthly', 'manual'
  is_verified boolean default false,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- K. FINANCIAL PAYOUT TRANSACTIONS
-- Dynamic treasury settlement details logged within the Partner Treasury modules and Admin tools.
CREATE TABLE IF NOT EXISTS public.payout_transactions (
  id uuid default gen_random_uuid() primary key,
  partner_id uuid references public.profiles(id) on delete cascade not null,
  amount numeric(12, 2) not null,
  currency text default 'USD',
  status public.payout_status default 'pending'::public.payout_status not null,
  payout_destination text not null, -- Rolled up target account/iban coordinates
  initiated_by uuid references public.profiles(id) on delete set null, -- Active Admin UID
  reference_code text unique,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- L. SUPER ADMIN AUDIT LOGGING
-- Critical legal compliance records loging all admin operations, contract releases, and metadata updates.
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid default gen_random_uuid() primary key,
  performing_user_id uuid references public.profiles(id) on delete set null,
  action text not null,
  details jsonb, -- Encapsulates event metadata fields
  category public.audit_category default 'general'::public.audit_category not null,
  ip_address text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);


-- 4. ENABLE ROW LEVEL SECURITY (RLS) FOR SYSTEM HARDENING
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_views ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watch_parties ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.watch_party_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.license_agreements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.treasury_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payout_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;


-- 5. RLS SECURITY POLICIES FOR UNMATCHED ACCESS CONTROL

-- DROPS OLD POLICIES PREVENTING CLASHES
DO $$ 
DECLARE
  pol record;
BEGIN
  FOR pol IN 
    SELECT policyname, tablename 
    FROM pg_policies 
    WHERE schemaname = 'public' 
      AND tablename IN ('profiles', 'content', 'episodes', 'watchlist', 'reviews', 'content_views', 
                        'watch_parties', 'watch_party_messages', 'license_agreements', 
                        'treasury_settings', 'payout_transactions', 'audit_logs')
  LOOP
    EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(pol.policyname) || ' ON ' || quote_ident(pol.tablename);
  END LOOP;
END $$;

-- A. PROFILES RLS
CREATE POLICY "Profiles are viewable by owners" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Profiles are viewable by administration" ON public.profiles FOR SELECT USING (public.is_admin_or_super());
CREATE POLICY "Profiles can be updated by owners" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Profiles can be fully managed by administration" ON public.profiles FOR ALL USING (public.is_admin_or_super());

-- B. CONTENT CATALOG RLS
CREATE POLICY "Published content is viewable by anyone" ON public.content FOR SELECT USING (status = 'published');
CREATE POLICY "Partners can view their own content library" ON public.content FOR SELECT USING (creator_id = auth.uid());
CREATE POLICY "Approved Partner uploads" ON public.content FOR INSERT WITH CHECK (
  auth.uid() = creator_id AND (public.authorize_user_role('partner') OR public.authorize_user_role('pending_partner'))
);
CREATE POLICY "Partners modify their own drafts or pending content" ON public.content FOR UPDATE USING (
  auth.uid() = creator_id AND (public.authorize_user_role('partner') OR public.authorize_user_role('pending_partner'))
);
CREATE POLICY "Super Admins can manage all contents" ON public.content FOR ALL USING (public.is_admin_or_super());

-- C. EPISODES RLS
CREATE POLICY "Episodes are viewable for published content" ON public.episodes FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.content c WHERE c.id = episodes.content_id AND c.status = 'published')
);
CREATE POLICY "Partners manage episodes for owned content" ON public.episodes FOR ALL USING (
  EXISTS (SELECT 1 FROM public.content c WHERE c.id = episodes.content_id AND c.creator_id = auth.uid())
);
CREATE POLICY "Super Admins can manage all season episodes" ON public.episodes FOR ALL USING (public.is_admin_or_super());

-- D. WATCHLIST RLS
CREATE POLICY "Users can manage their own watchlist" ON public.watchlist FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Super admins can audit user watchlists" ON public.watchlist FOR SELECT USING (public.is_admin_or_super());

-- E. REVIEWS RLS
CREATE POLICY "Anyone can see reviews for content" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Authenticated users can submit reviews" ON public.reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can edit their own reviews" ON public.reviews FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete their own reviews" ON public.reviews FOR DELETE USING (auth.uid() = user_id);
CREATE POLICY "Super admins can manage or moderate all reviews" ON public.reviews FOR ALL USING (public.is_admin_or_super());

-- F. HISTORY / ANALYTICS RLS
CREATE POLICY "Users can save or view their playback statistics" ON public.content_views FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Partners can view rolled up content stream analytics" ON public.content_views FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.content c WHERE c.id = content_views.content_id AND c.creator_id = auth.uid())
);
CREATE POLICY "Super Admins can view all streaming analytics" ON public.content_views FOR SELECT USING (public.is_admin_or_super());

-- G. WATCH PARTIES RLS
CREATE POLICY "Anyone can join or view active watch parties" ON public.watch_parties FOR SELECT USING (true);
CREATE POLICY "Registered users can create watch parties" ON public.watch_parties FOR INSERT WITH CHECK (auth.uid() = host_id);
CREATE POLICY "Hosts can control their watch party coordinates" ON public.watch_parties FOR UPDATE USING (auth.uid() = host_id);
CREATE POLICY "Hosts can disband their watch parties" ON public.watch_parties FOR DELETE USING (auth.uid() = host_id);
CREATE POLICY "Super admins can moderate active watch parties" ON public.watch_parties FOR ALL USING (public.is_admin_or_super());

-- H. CHAT MESSAGES RLS
CREATE POLICY "Anyone in watch party can view chat messages" ON public.watch_party_messages FOR SELECT USING (true);
CREATE POLICY "Authenticated users can post chat messages" ON public.watch_party_messages FOR INSERT WITH CHECK (auth.uid() = sender_id);
CREATE POLICY "Super admins can moderate chat messages" ON public.watch_party_messages FOR ALL USING (public.is_admin_or_super());

-- I. LICENSES RLS
CREATE POLICY "Partners can view their licensing agreements" ON public.license_agreements FOR SELECT USING (partner_id = auth.uid());
CREATE POLICY "Super Admins can manage all client licensing agreements" ON public.license_agreements FOR ALL USING (public.is_admin_or_super());

-- J. TREASURY RLS
CREATE POLICY "Partners can manage their treasury banking details" ON public.treasury_settings FOR ALL USING (partner_id = auth.uid());
CREATE POLICY "Super Admins can inspect and audit partner bank details" ON public.treasury_settings FOR SELECT USING (public.is_admin_or_super());
CREATE POLICY "Super Admins can update verification statuses on treasury" ON public.treasury_settings FOR UPDATE USING (public.is_admin_or_super());

-- K. PAYOUTS RLS
CREATE POLICY "Partners can track their financial payouts logs" ON public.payout_transactions FOR SELECT USING (partner_id = auth.uid());
CREATE POLICY "Super Admins can initiate or manage payouts" ON public.payout_transactions FOR ALL USING (public.is_admin_or_super());

-- L. AUDIT LOGGER RLS
CREATE POLICY "Super Admins can read system audit logs" ON public.audit_logs FOR SELECT USING (public.is_admin_or_super());
CREATE POLICY "System can record audit logs" ON public.audit_logs FOR INSERT WITH CHECK (true);


-- 6. AUTOMATED IDENTITY MANAGEMENT TRIGGERS

-- Auto-register user profiles upon Auth signups
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    COALESCE(
      new.raw_user_meta_data->>'full_name', 
      new.raw_user_meta_data->>'name',
      split_part(new.email, '@', 1)
    ),
    -- Automatically make this specific email a super admin, or let it fallback to normal
    CASE 
      WHEN new.email = 'simao@neurogrowthlabs.co.za' THEN 'super_admin'::public.user_role 
      WHEN new.email = 'lusimadio12@gmail.com' THEN 'super_admin'::public.user_role
      ELSE 'normal'::public.user_role 
    END
  );
  
  -- Create empty baseline treasury details for partner or pending partner registrations
  IF new.raw_user_meta_data->>'role' = 'partner' OR new.raw_user_meta_data->>'role' = 'pending_partner' THEN
    INSERT INTO public.treasury_settings(partner_id) VALUES (new.id) ON CONFLICT DO NOTHING;
  END IF;

  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Bind user trigger
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- Administrative helper function to log actions to Audit Log dynamically
CREATE OR REPLACE FUNCTION public.log_system_action(
  p_user_id uuid,
  p_action text,
  p_category public.audit_category,
  p_details jsonb
) RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  v_log_id uuid;
BEGIN
  INSERT INTO public.audit_logs (performing_user_id, action, category, details)
  VALUES (p_user_id, p_action, p_category, p_details)
  RETURNING id INTO v_log_id;
  RETURN v_log_id;
END;
$$;
