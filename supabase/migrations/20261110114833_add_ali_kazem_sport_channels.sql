/*
# Add 10 Ali Kazem Sport channels with watch pages

Plain-English summary: adds the ten channels "Ali Kazem Sport 1" to "Ali Kazem Sport 10".
Each channel gets a web address slug used by its watch page, and a stream address slot
that the video player will use once real streams are connected. The four original
sample channels are kept in the database but hidden from the app, and the sample
matches are moved onto the new channels so the schedule stays consistent.

1. Modified Table: channels
- `slug` (text, unique): short web address name for the watch page, e.g. "ali-kazem-sport-1".
- `stream_url` (text, nullable): HLS stream address for the player. Empty until streams are connected.
- `is_active` (boolean, default true): when false, the channel is hidden from the app.

2. New Rows: channels
- Ten channels with fixed ids, names in English and Arabic, sort order 1 to 10.
- Channels 1 and 2 are marked on air.

3. Modified Rows
- The four original sample channels are set to is_active = false (no rows are deleted).
- Sample matches that pointed at those channels now point at the matching new channel.

4. Security
- No new tables. Existing read-only access (anon and authenticated SELECT) already covers new columns.
- No write access is granted to visitors.

5. Notes
- Every statement is idempotent: columns and indexes use IF NOT EXISTS, inserts use ON CONFLICT DO NOTHING,
  and updates only set values to the same fixed targets when re-run.
*/

ALTER TABLE channels ADD COLUMN IF NOT EXISTS slug text;
ALTER TABLE channels ADD COLUMN IF NOT EXISTS stream_url text;
ALTER TABLE channels ADD COLUMN IF NOT EXISTS is_active boolean NOT NULL DEFAULT true;

CREATE UNIQUE INDEX IF NOT EXISTS channels_slug_key ON channels (slug);

INSERT INTO channels (id, name_en, name_ar, sort_order, is_live, slug, is_active) VALUES
  ('10000000-0000-4000-8000-000000000101', 'Ali Kazem Sport 1', 'علي كاظم سبورت 1', 1, true, 'ali-kazem-sport-1', true),
  ('10000000-0000-4000-8000-000000000102', 'Ali Kazem Sport 2', 'علي كاظم سبورت 2', 2, true, 'ali-kazem-sport-2', true),
  ('10000000-0000-4000-8000-000000000103', 'Ali Kazem Sport 3', 'علي كاظم سبورت 3', 3, false, 'ali-kazem-sport-3', true),
  ('10000000-0000-4000-8000-000000000104', 'Ali Kazem Sport 4', 'علي كاظم سبورت 4', 4, false, 'ali-kazem-sport-4', true),
  ('10000000-0000-4000-8000-000000000105', 'Ali Kazem Sport 5', 'علي كاظم سبورت 5', 5, false, 'ali-kazem-sport-5', true),
  ('10000000-0000-4000-8000-000000000106', 'Ali Kazem Sport 6', 'علي كاظم سبورت 6', 6, false, 'ali-kazem-sport-6', true),
  ('10000000-0000-4000-8000-000000000107', 'Ali Kazem Sport 7', 'علي كاظم سبورت 7', 7, false, 'ali-kazem-sport-7', true),
  ('10000000-0000-4000-8000-000000000108', 'Ali Kazem Sport 8', 'علي كاظم سبورت 8', 8, false, 'ali-kazem-sport-8', true),
  ('10000000-0000-4000-8000-000000000109', 'Ali Kazem Sport 9', 'علي كاظم سبورت 9', 9, false, 'ali-kazem-sport-9', true),
  ('10000000-0000-4000-8000-000000000110', 'Ali Kazem Sport 10', 'علي كاظم سبورت 10', 10, false, 'ali-kazem-sport-10', true)
ON CONFLICT (id) DO NOTHING;

UPDATE channels SET is_active = false
WHERE id IN (
  '10000000-0000-4000-8000-000000000001',
  '10000000-0000-4000-8000-000000000002',
  '10000000-0000-4000-8000-000000000003',
  '10000000-0000-4000-8000-000000000004'
);

UPDATE matches SET channel_id = '10000000-0000-4000-8000-000000000101' WHERE channel_id = '10000000-0000-4000-8000-000000000001';
UPDATE matches SET channel_id = '10000000-0000-4000-8000-000000000102' WHERE channel_id = '10000000-0000-4000-8000-000000000002';
UPDATE matches SET channel_id = '10000000-0000-4000-8000-000000000103' WHERE channel_id = '10000000-0000-4000-8000-000000000003';
UPDATE matches SET channel_id = '10000000-0000-4000-8000-000000000104' WHERE channel_id = '10000000-0000-4000-8000-000000000004';
