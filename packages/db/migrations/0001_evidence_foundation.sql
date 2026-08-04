BEGIN;

CREATE TABLE IF NOT EXISTS user_profiles (
  id text PRIMARY KEY,
  external_auth_id text UNIQUE NOT NULL,
  display_name text,
  current_belt_id text NOT NULL DEFAULT 'BELT-WHITE',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (current_belt_id ~ '^BELT-[A-Z-]+$')
);

CREATE TABLE IF NOT EXISTS credentials (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  credential_type text NOT NULL,
  scope text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  valid_from timestamptz NOT NULL DEFAULT now(),
  valid_until timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (status IN ('active','suspended','expired','revoked'))
);

CREATE TABLE IF NOT EXISTS authorizations (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  authorization_type text NOT NULL,
  scope text NOT NULL,
  status text NOT NULL DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (status IN ('active','suspended','revoked'))
);

CREATE TABLE IF NOT EXISTS learning_events (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  event_type text NOT NULL,
  canonical_entity_id text,
  detail text NOT NULL,
  payload jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS learning_events_user_created_idx ON learning_events(user_id, created_at DESC);

CREATE TABLE IF NOT EXISTS evidence_records (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  kind text NOT NULL,
  status text NOT NULL,
  canonical_entity_id text NOT NULL,
  path_id text,
  belt_id text NOT NULL,
  body text NOT NULL,
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (status IN ('draft','recorded','ready-for-review','submitted','accepted','rejected'))
);
CREATE INDEX IF NOT EXISTS evidence_user_entity_idx ON evidence_records(user_id, canonical_entity_id);

CREATE TABLE IF NOT EXISTS traversal_attempts (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  belt_id text NOT NULL,
  status text NOT NULL DEFAULT 'submitted',
  reflection text NOT NULL,
  evidence_snapshot jsonb NOT NULL DEFAULT '[]'::jsonb,
  submitted_at timestamptz NOT NULL DEFAULT now(),
  reviewed_at timestamptz,
  CHECK (status IN ('submitted','under-review','approved','rejected','cancelled'))
);
CREATE INDEX IF NOT EXISTS traversal_user_belt_idx ON traversal_attempts(user_id, belt_id, submitted_at DESC);

CREATE TABLE IF NOT EXISTS evaluation_decisions (
  id text PRIMARY KEY,
  traversal_attempt_id text UNIQUE NOT NULL REFERENCES traversal_attempts(id) ON DELETE RESTRICT,
  evaluator_user_id text NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
  decision text NOT NULL,
  rationale text NOT NULL,
  evaluator_credential_id text NOT NULL REFERENCES credentials(id) ON DELETE RESTRICT,
  evaluator_authorization_id text NOT NULL REFERENCES authorizations(id) ON DELETE RESTRICT,
  target_belt_id text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (decision IN ('approve','reject','needs-more-evidence'))
);

CREATE TABLE IF NOT EXISTS belt_promotions (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
  from_belt_id text NOT NULL,
  to_belt_id text NOT NULL,
  evaluation_decision_id text UNIQUE NOT NULL REFERENCES evaluation_decisions(id) ON DELETE RESTRICT,
  effective_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  CHECK (from_belt_id <> to_belt_id)
);
CREATE INDEX IF NOT EXISTS belt_promotions_user_idx ON belt_promotions(user_id, effective_at DESC);

COMMIT;
