CREATE TABLE user_progress (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL,
  level VARCHAR(50) NOT NULL,
  card_expression TEXT NOT NULL,
  known BOOLEAN,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, level, card_expression)
);
