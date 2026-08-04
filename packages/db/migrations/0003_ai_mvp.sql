CREATE TABLE IF NOT EXISTS ai_conversations (
  id text PRIMARY KEY,
  user_id text NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  surface text NOT NULL CHECK (surface IN ('academy-tutor','instructor-assistant','research-assistant')),
  dojo_id text NULL,
  title text NULL,
  context_snapshot jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS ai_generations (
  id text PRIMARY KEY,
  conversation_id text NOT NULL REFERENCES ai_conversations(id) ON DELETE CASCADE,
  user_id text NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  surface text NOT NULL,
  query text NOT NULL,
  status text NOT NULL CHECK (status IN ('pending','complete','error')) DEFAULT 'pending',
  answer text NULL,
  mode text NULL,
  model text NULL,
  canon_release text NULL,
  official_position_available boolean NULL,
  source_refs jsonb NOT NULL DEFAULT '[]'::jsonb,
  usage jsonb NOT NULL DEFAULT '{}'::jsonb,
  estimated_cost_microusd bigint NOT NULL DEFAULT 0,
  error_code text NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz NULL
);

CREATE INDEX IF NOT EXISTS ai_conversations_user_idx ON ai_conversations(user_id, updated_at DESC);
CREATE INDEX IF NOT EXISTS ai_generations_conversation_idx ON ai_generations(conversation_id, created_at ASC);
CREATE INDEX IF NOT EXISTS ai_generations_user_idx ON ai_generations(user_id, created_at DESC);
