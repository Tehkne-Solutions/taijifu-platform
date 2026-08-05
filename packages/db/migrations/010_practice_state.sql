CREATE TABLE IF NOT EXISTS practice_states (
  user_id text NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  belt_id text NOT NULL,
  schema_version integer NOT NULL DEFAULT 2,
  state jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, belt_id)
);

CREATE INDEX IF NOT EXISTS practice_states_updated_at_idx ON practice_states(updated_at DESC);
