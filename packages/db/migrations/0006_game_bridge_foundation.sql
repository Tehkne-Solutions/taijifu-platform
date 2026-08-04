CREATE TABLE IF NOT EXISTS game_profiles (
  id text PRIMARY KEY,
  user_id text NOT NULL UNIQUE REFERENCES user_profiles(id) ON DELETE CASCADE,
  game_profile_id text NOT NULL UNIQUE,
  linked_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NULL
);

CREATE TABLE IF NOT EXISTS game_canon_links (
  game_entity_id text NOT NULL,
  canonical_entity_id text NOT NULL,
  relation text NOT NULL CHECK (relation IN ('inspired-by','represents','references')),
  label text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (game_entity_id,canonical_entity_id,relation)
);

CREATE TABLE IF NOT EXISTS game_progress_events (
  event_id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  game_profile_id text NOT NULL,
  event_type text NOT NULL CHECK (event_type IN ('achievement','skill-unlocked','match-completed','quest-completed','game-level')),
  game_entity_id text NULL,
  game_xp bigint NOT NULL DEFAULT 0,
  game_level integer NOT NULL DEFAULT 0,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  occurred_at timestamptz NOT NULL,
  received_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS game_progress_user_idx ON game_progress_events(user_id,occurred_at DESC);
CREATE INDEX IF NOT EXISTS game_progress_entity_idx ON game_progress_events(game_entity_id,occurred_at DESC);
