import type { Channel, Highlight, Match } from '@/lib/types';
import { supabase } from '@/lib/supabase';

const CHANNEL_COLUMNS = 'id, slug, name_en, name_ar, sort_order, is_live, stream_url, logo_url';

export async function fetchChannels(): Promise<Channel[]> {
  const { data, error } = await supabase
    .from('channels')
    .select(CHANNEL_COLUMNS)
    .eq('is_active', true)
    .order('sort_order', { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []) as Channel[];
}

export async function fetchChannelBySlug(slug: string): Promise<Channel | null> {
  const { data, error } = await supabase
    .from('channels')
    .select(CHANNEL_COLUMNS)
    .eq('slug', slug)
    .eq('is_active', true)
    .maybeSingle();
  if (error) throw new Error(error.message);
  return (data ?? null) as Channel | null;
}

export async function fetchMatches(): Promise<Match[]> {
  const { data, error } = await supabase
    .from('matches')
    .select(
      'id, competition_en, competition_ar, home_team_en, home_team_ar, away_team_en, away_team_ar, home_score, away_score, status, kickoff_at, channel:channels(name_en, name_ar)'
    )
    .order('kickoff_at', { ascending: true });
  if (error) throw new Error(error.message);
  return (data ?? []).map((row) => {
    const { channel, ...match } = row;
    const joined = Array.isArray(channel) ? (channel[0] ?? null) : (channel ?? null);
    return { ...match, channel: joined } as Match;
  });
}

export async function fetchHighlights(): Promise<Highlight[]> {
  const { data, error } = await supabase
    .from('highlights')
    .select(
      'id, title_en, title_ar, competition_en, competition_ar, duration_seconds, thumbnail_url, published_at'
    )
    .order('published_at', { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Highlight[];
}
