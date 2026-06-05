export interface CastMember {
  emoji: string;
  name: string;
  role: string;
  bg: string;
}

export interface Episode {
  n: number;
  emoji: string;
  title: string;
  meta: string;
  dur: string;
}

export interface Content {
  id: number;
  emoji: string;
  coverUrl?: string;
  title: string;
  sub: string;
  tag: 'new' | 'hot' | '4k' | '';
  rating: string;
  year: number;
  eps: number | null;
  genres: string[];
  desc: string;
  cast: CastMember[];
  episodes: Episode[];
}

export interface Channel {
  emoji: string;
  name: string;
  cat: string;
  live: boolean;
}

export interface Download {
  id: string;
  emoji: string;
  title: string;
  meta: string;
  size: string;
  prog: number;
}
