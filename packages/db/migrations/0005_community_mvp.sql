CREATE TABLE IF NOT EXISTS community_comments (
  id text PRIMARY KEY,
  post_id text NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  author_user_id text NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  body text NOT NULL,
  status text NOT NULL CHECK (status IN ('published','hidden','removed')) DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS community_reactions (
  post_id text NOT NULL REFERENCES community_posts(id) ON DELETE CASCADE,
  user_id text NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  reaction text NOT NULL CHECK (reaction IN ('support','insightful','practice','question')),
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (post_id,user_id,reaction)
);

CREATE TABLE IF NOT EXISTS community_moderation_events (
  id text PRIMARY KEY,
  actor_user_id text NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
  target_type text NOT NULL CHECK (target_type IN ('post','comment','member')),
  target_id text NOT NULL,
  action text NOT NULL CHECK (action IN ('hide','restore','remove','block','unblock')),
  reason text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS community_comments_post_idx ON community_comments(post_id,status,created_at ASC);
CREATE INDEX IF NOT EXISTS community_reactions_post_idx ON community_reactions(post_id,created_at DESC);
CREATE INDEX IF NOT EXISTS community_moderation_actor_idx ON community_moderation_events(actor_user_id,created_at DESC);
