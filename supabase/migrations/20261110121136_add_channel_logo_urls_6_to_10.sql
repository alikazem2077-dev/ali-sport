/*
# Assign logo images to Ali Kazem Sport 6 to 10

Plain-English summary: gives channels 6 through 10 their own logo images, so their cards and
watch pages show the matching channel logo instead of the shared banner design.

1. Modified Table: channels
- `logo_url` (text) is set for the five channels below. The column was added in an earlier migration.

2. Modified Rows
- Ali Kazem Sport 6 = ...246867.jpg
- Ali Kazem Sport 7 = ...251798.jpg
- Ali Kazem Sport 8 = ...256509.jpg
- Ali Kazem Sport 9 = ...261160.jpg
- Ali Kazem Sport 10 = ...265984.jpg
- Channels 1 to 5 are unchanged.

3. Security
- No new tables, columns, or policies.

4. Notes
- Updates set fixed values keyed by channel slug, so re-running this migration has no further effect.
*/

UPDATE channels SET logo_url = '/assets/images/1794312246867.jpg' WHERE slug = 'ali-kazem-sport-6';
UPDATE channels SET logo_url = '/assets/images/1794312251798.jpg' WHERE slug = 'ali-kazem-sport-7';
UPDATE channels SET logo_url = '/assets/images/1794312256509.jpg' WHERE slug = 'ali-kazem-sport-8';
UPDATE channels SET logo_url = '/assets/images/1794312261160.jpg' WHERE slug = 'ali-kazem-sport-9';
UPDATE channels SET logo_url = '/assets/images/1794312265984.jpg' WHERE slug = 'ali-kazem-sport-10';
