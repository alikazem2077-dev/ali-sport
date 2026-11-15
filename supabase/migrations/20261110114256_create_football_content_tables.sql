/*
# Create football content tables with seed data

Plain-English summary: adds the three content lists the Ali Kazem Live app shows,
the live TV channels, the match schedule, and the match highlights, and fills them
with starter content so the app has something to display right away.

1. New Tables
- `channels`: the TV channels. Holds the English and Arabic name, a sort order,
  and whether the channel is currently on air.
- `matches`: the match schedule. Holds both teams and the competition in English
  and Arabic, the kickoff time, the match status (upcoming, live, or finished),
  the score, and the channel that broadcasts it.
- `highlights`: short match highlight clips. Holds the English and Arabic title,
  competition, length in seconds, thumbnail image, and publish time.

2. Security
- Row level security is enabled on all three tables.
- The app has no sign-in, so the public (anon) and signed-in roles can only read.
- Only SELECT is granted and only a SELECT policy exists. Visitors cannot create,
  change, or delete schedule or highlight content through the public API.

3. Notes
- Seed rows use fixed ids so re-running this migration does not duplicate data.
- Inserts use ON CONFLICT DO NOTHING so the migration is safe to re-run.
- Content management (adding matches, etc.) will need a separate, protected path later.
*/

CREATE TABLE IF NOT EXISTS channels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en text NOT NULL,
  name_ar text NOT NULL,
  sort_order integer NOT NULL DEFAULT 0,
  is_live boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS matches (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  competition_en text NOT NULL,
  competition_ar text NOT NULL,
  home_team_en text NOT NULL,
  home_team_ar text NOT NULL,
  away_team_en text NOT NULL,
  away_team_ar text NOT NULL,
  home_score integer,
  away_score integer,
  status text NOT NULL DEFAULT 'upcoming' CHECK (status IN ('upcoming', 'live', 'finished')),
  kickoff_at timestamptz NOT NULL,
  channel_id uuid REFERENCES channels(id) ON DELETE SET NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS matches_kickoff_at_idx ON matches (kickoff_at);
CREATE INDEX IF NOT EXISTS matches_channel_id_idx ON matches (channel_id);

CREATE TABLE IF NOT EXISTS highlights (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_en text NOT NULL,
  title_ar text NOT NULL,
  competition_en text NOT NULL,
  competition_ar text NOT NULL,
  duration_seconds integer NOT NULL CHECK (duration_seconds > 0),
  thumbnail_url text NOT NULL,
  published_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS highlights_published_at_idx ON highlights (published_at DESC);

ALTER TABLE channels ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE highlights ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON channels, matches, highlights TO anon, authenticated;

DROP POLICY IF EXISTS "public_select_channels" ON channels;
CREATE POLICY "public_select_channels" ON channels FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_select_matches" ON matches;
CREATE POLICY "public_select_matches" ON matches FOR SELECT
TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "public_select_highlights" ON highlights;
CREATE POLICY "public_select_highlights" ON highlights FOR SELECT
TO anon, authenticated USING (true);

INSERT INTO channels (id, name_en, name_ar, sort_order, is_live) VALUES
  ('10000000-0000-4000-8000-000000000001', 'Ali Kazem Sports 1', 'علي كاظم الرياضية 1', 1, true),
  ('10000000-0000-4000-8000-000000000002', 'Ali Kazem Sports 2', 'علي كاظم الرياضية 2', 2, true),
  ('10000000-0000-4000-8000-000000000003', 'Ali Kazem Premier', 'علي كاظم الدوري الممتاز', 3, false),
  ('10000000-0000-4000-8000-000000000004', 'Ali Kazem Champions', 'علي كاظم دوري الأبطال', 4, false)
ON CONFLICT (id) DO NOTHING;

INSERT INTO matches (id, competition_en, competition_ar, home_team_en, home_team_ar, away_team_en, away_team_ar, home_score, away_score, status, kickoff_at, channel_id) VALUES
  ('20000000-0000-4000-8000-000000000001', 'Iraqi Premier League', 'الدوري العراقي الممتاز', 'Al-Zawraa', 'الزوراء', 'Al-Shorta', 'الشرطة', 1, 0, 'live', '2026-11-10 17:00:00+00', '10000000-0000-4000-8000-000000000001'),
  ('20000000-0000-4000-8000-000000000002', 'Premier League', 'الدوري الإنجليزي الممتاز', 'Liverpool', 'ليفربول', 'Manchester City', 'مانشستر سيتي', 2, 2, 'finished', '2026-11-09 19:30:00+00', '10000000-0000-4000-8000-000000000003'),
  ('20000000-0000-4000-8000-000000000003', 'UEFA Champions League', 'دوري أبطال أوروبا', 'Real Madrid', 'ريال مدريد', 'Barcelona', 'برشلونة', NULL, NULL, 'upcoming', '2026-11-11 20:00:00+00', '10000000-0000-4000-8000-000000000004'),
  ('20000000-0000-4000-8000-000000000004', 'Iraqi Premier League', 'الدوري العراقي الممتاز', 'Al-Talaba', 'الطلبة', 'Al-Naft', 'النفط', NULL, NULL, 'upcoming', '2026-11-11 15:00:00+00', '10000000-0000-4000-8000-000000000002'),
  ('20000000-0000-4000-8000-000000000005', 'La Liga', 'الدوري الإسباني', 'Atletico Madrid', 'أتلتيكو مدريد', 'Sevilla', 'إشبيلية', NULL, NULL, 'upcoming', '2026-11-12 18:45:00+00', '10000000-0000-4000-8000-000000000003'),
  ('20000000-0000-4000-8000-000000000006', 'Iraqi Premier League', 'الدوري العراقي الممتاز', 'Al-Quwa Al-Jawiya', 'القوة الجوية', 'Al-Najaf', 'النجف', 3, 1, 'finished', '2026-11-08 16:00:00+00', '10000000-0000-4000-8000-000000000002')
ON CONFLICT (id) DO NOTHING;

INSERT INTO highlights (id, title_en, title_ar, competition_en, competition_ar, duration_seconds, thumbnail_url, published_at) VALUES
  ('30000000-0000-4000-8000-000000000001', 'Al-Zawraa vs Al-Shorta: Full Highlights', 'ملخص مباراة الزوراء والشرطة', 'Iraqi Premier League', 'الدوري العراقي الممتاز', 512, 'https://images.pexels.com/photos/32285250/pexels-photo-32285250.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '2026-11-08 22:00:00+00'),
  ('30000000-0000-4000-8000-000000000002', 'Liverpool 2-2 Manchester City: Goals and Chances', 'ليفربول 2-2 مانشستر سيتي: الأهداف والفرص', 'Premier League', 'الدوري الإنجليزي الممتاز', 438, 'https://images.pexels.com/photos/32190714/pexels-photo-32190714.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '2026-11-09 23:15:00+00'),
  ('30000000-0000-4000-8000-000000000003', 'Best Saves of the Week', 'أفضل التصديات في الأسبوع', 'UEFA Champions League', 'دوري أبطال أوروبا', 296, 'https://images.pexels.com/photos/32101293/pexels-photo-32101293.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '2026-11-07 12:00:00+00'),
  ('30000000-0000-4000-8000-000000000004', 'Al-Quwa Al-Jawiya 3-1 Al-Najaf: Extended Highlights', 'القوة الجوية 3-1 النجف: ملخص موسع', 'Iraqi Premier League', 'الدوري العراقي الممتاز', 604, 'https://images.pexels.com/photos/33827014/pexels-photo-33827014.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '2026-11-08 20:30:00+00'),
  ('30000000-0000-4000-8000-000000000005', 'Night Derby Goals', 'أهداف ديربي الليل', 'La Liga', 'الدوري الإسباني', 241, 'https://images.pexels.com/photos/32190700/pexels-photo-32190700.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '2026-11-06 21:10:00+00'),
  ('30000000-0000-4000-8000-000000000006', 'Top Skills and Dribbles', 'أفضل المهارات والمراوغات', 'Premier League', 'الدوري الإنجليزي الممتاز', 183, 'https://images.pexels.com/photos/39692338/pexels-photo-39692338.jpeg?auto=compress&cs=tinysrgb&h=650&w=940', '2026-11-05 18:00:00+00')
ON CONFLICT (id) DO NOTHING;
