/*
# Assign logo images to Ali Kazem Sport 1 to 5

Plain-English summary: gives each of the first five channels its own logo image, so the
channel cards and the watch page show that channel's logo instead of the generic banner.

1. Modified Table: channels
- `logo_url` (text, nullable): web path of the channel's logo image. Empty means the app
  falls back to the shared banner design.

2. Modified Rows
- Ali Kazem Sport 1 to 5 each receive their matching logo image (Sport 1 = ...181736,
  Sport 2 = ...189343, Sport 3 = ...194764, Sport 4 = ...200518, Sport 5 = ...242128).
- Channels 6 to 10 are unchanged.

3. Security
- No new tables or policies. Existing read-only access covers the new column.

4. Notes
- Statements are idempotent: the column uses IF NOT EXISTS and the updates set fixed values.
*/

ALTER TABLE channels ADD COLUMN IF NOT EXISTS logo_url text;

UPDATE channels SET logo_url = '/assets/images/1794312181736.jpg' WHERE slug = 'ali-kazem-sport-1';
UPDATE channels SET logo_url = '/assets/images/1794312189343.jpg' WHERE slug = 'ali-kazem-sport-2';
UPDATE channels SET logo_url = '/assets/images/1794312194764.jpg' WHERE slug = 'ali-kazem-sport-3';
UPDATE channels SET logo_url = '/assets/images/1794312200518.jpg' WHERE slug = 'ali-kazem-sport-4';
UPDATE channels SET logo_url = '/assets/images/1794312242128.jpg' WHERE slug = 'ali-kazem-sport-5';
