import { createClient } from '@supabase/supabase-js'

// ─── Supabase configuration ───────────────────────────────────────────────────
// After creating your Supabase project at https://supabase.com, replace these:
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR_PROJECT.supabase.co'
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'YOUR_ANON_KEY'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// ─── SQL to run once in Supabase SQL editor ───────────────────────────────────
/*
CREATE TABLE game_sessions (
  id          uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  player_name text NOT NULL,
  game_id     text NOT NULL,
  game_name   text NOT NULL,
  score       int  NOT NULL DEFAULT 0,
  stages_completed int NOT NULL DEFAULT 0,
  completed   boolean NOT NULL DEFAULT false,
  created_at  timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE game_sessions ENABLE ROW LEVEL SECURITY;

-- Allow anyone to INSERT (players save their scores)
CREATE POLICY "allow_insert" ON game_sessions
  FOR INSERT WITH CHECK (true);

-- Block all SELECT/UPDATE/DELETE from anonymous users
-- (Admin reads via service role key or bypasses RLS with a function)
CREATE POLICY "block_select" ON game_sessions
  FOR SELECT USING (false);
*/

// ─── Save a game session (called when player finishes or quits) ────────────────
export async function saveSession({ playerName, gameId, gameName, score, stagesCompleted, completed }) {
  const { error } = await supabase.from('game_sessions').insert({
    player_name: playerName,
    game_id: gameId,
    game_name: gameName,
    score,
    stages_completed: stagesCompleted,
    completed,
  })
  if (error) console.error('Supabase insert error:', error)
}

// ─── Admin: fetch all sessions (uses service role key via Vercel env) ──────────
export async function fetchAllSessions() {
  // We use a Postgres function that bypasses RLS so the anon key can read
  // Run this once in Supabase SQL editor:
  /*
  CREATE OR REPLACE FUNCTION get_all_sessions()
  RETURNS SETOF game_sessions
  LANGUAGE sql SECURITY DEFINER
  AS $$ SELECT * FROM game_sessions ORDER BY created_at DESC; $$;
  */
  const { data, error } = await supabase.rpc('get_all_sessions')
  if (error) {
    console.error('Supabase fetch error:', error)
    return []
  }
  return data || []
}
