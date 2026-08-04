CREATE TABLE IF NOT EXISTS community_profiles (
  user_id text PRIMARY KEY REFERENCES user_profiles(id) ON DELETE CASCADE,
  handle text UNIQUE NOT NULL,
  bio text NOT NULL DEFAULT '',
  visibility text NOT NULL CHECK (visibility IN ('public','members','private')) DEFAULT 'members',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS community_groups (
  id text PRIMARY KEY,
  slug text UNIQUE NOT NULL,
  name text NOT NULL,
  group_type text NOT NULL CHECK (group_type IN ('general','study','dojo','research','mentoring')),
  owner_user_id text NOT NULL REFERENCES user_profiles(id) ON DELETE RESTRICT,
  description text NOT NULL DEFAULT '',
  status text NOT NULL CHECK (status IN ('active','archived')) DEFAULT 'active',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS community_group_members (
  group_id text NOT NULL REFERENCES community_groups(id) ON DELETE CASCADE,
  user_id text NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('member','moderator','owner')) DEFAULT 'member',
  status text NOT NULL CHECK (status IN ('active','left','blocked')) DEFAULT 'active',
  joined_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (group_id,user_id)
);

CREATE TABLE IF NOT EXISTS community_posts (
  id text PRIMARY KEY,
  author_user_id text NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  group_id text NULL REFERENCES community_groups(id) ON DELETE CASCADE,
  body text NOT NULL,
  canonical_entity_ids jsonb NOT NULL DEFAULT '[]'::jsonb,
  post_type text NOT NULL CHECK (post_type IN ('reflection','question','practice','research','announcement')) DEFAULT 'reflection',
  status text NOT NULL CHECK (status IN ('published','hidden','removed')) DEFAULT 'published',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS mentoring_requests (
  id text PRIMARY KEY,
  requester_user_id text NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  mentor_user_id text NULL REFERENCES user_profiles(id) ON DELETE SET NULL,
  group_id text NULL REFERENCES community_groups(id) ON DELETE SET NULL,
  topic text NOT NULL,
  message text NOT NULL DEFAULT '',
  status text NOT NULL CHECK (status IN ('open','accepted','declined','completed','cancelled')) DEFAULT 'open',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK (mentor_user_id IS NULL OR mentor_user_id <> requester_user_id)
);

CREATE INDEX IF NOT EXISTS community_posts_feed_idx ON community_posts(status,created_at DESC);
CREATE INDEX IF NOT EXISTS community_posts_group_idx ON community_posts(group_id,created_at DESC);
CREATE INDEX IF NOT EXISTS mentoring_requests_requester_idx ON mentoring_requests(requester_user_id,status,created_at DESC);
CREATE INDEX IF NOT EXISTS mentoring_requests_mentor_idx ON mentoring_requests(mentor_user_id,status,created_at DESC);
