export interface Channel {
  id: string;
  slug: string;
  name_en: string;
  name_ar: string;
  sort_order: number;
  is_live: boolean;
  stream_url: string | null;
  logo_url: string | null;
}

export type MatchStatus = 'upcoming' | 'live' | 'finished';

export interface Match {
  id: string;
  competition_en: string;
  competition_ar: string;
  home_team_en: string;
  home_team_ar: string;
  away_team_en: string;
  away_team_ar: string;
  home_score: number | null;
  away_score: number | null;
  status: MatchStatus;
  kickoff_at: string;
  channel: { name_en: string; name_ar: string } | null;
}

export interface Highlight {
  id: string;
  title_en: string;
  title_ar: string;
  competition_en: string;
  competition_ar: string;
  duration_seconds: number;
  thumbnail_url: string;
  published_at: string;
}
