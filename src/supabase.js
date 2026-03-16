import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://hzlzltjcdrxyqvogkbms.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6bHpsdGpjZHJ4eXF2b2drYm1zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM2NTEwNzQsImV4cCI6MjA4OTIyNzA3NH0.m85j9UJ_MGZ6t6ijKfECdkaHabvHyiRHd0xGn8EkVtw'

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

// Create a session when the player starts — returns the session id
export async function createSession({ playerName, gameId, gameName }) {
  const { data, error } = await supabase
    .from('game_sessions')
    .insert({ player_name: playerName, game_id: gameId, game_name: gameName, score: 0, stages_completed: 0, completed: false })
    .select('id')
    .single()
  if (error) { console.error('createSession error:', error); return null }
  return data.id
}

// Update score + stages in real-time as the player progresses
export async function updateSession(sessionId, { score, stagesCompleted, completed }) {
  if (!sessionId) return
  const { error } = await supabase
    .from('game_sessions')
    .update({ score, stages_completed: stagesCompleted, completed, updated_at: new Date().toISOString() })
    .eq('id', sessionId)
  if (error) console.error('updateSession error:', error)
}

// Admin: fetch all sessions ordered by newest first
export async function fetchAllSessions() {
  const { data, error } = await supabase
    .from('game_sessions')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) { console.error('fetchAllSessions error:', error); return [] }
  return data || []
}
