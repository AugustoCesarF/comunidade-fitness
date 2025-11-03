import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Variáveis de ambiente do Supabase não configuradas')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
  global: {
    headers: {
      'X-Client-Info': 'supabase-js-web',
    },
  },
})

// Tipos para as tabelas do banco de dados
export interface UserProfile {
  id: string
  user_id: string
  name: string
  email: string
  plan: string
  join_date: string
  created_at: string
  updated_at: string
}

export interface UserStats {
  id: string
  user_id: string
  current_weight: number
  goal_weight: number
  streak_days: number
  total_workouts: number
  community_rank: number
  messages_sent: number
  reactions_received: number
  members_helped: number
  created_at: string
  updated_at: string
}

export interface UserAchievement {
  id: string
  user_id: string
  achievement_name: string
  achievement_description: string
  achievement_icon: string
  is_completed: boolean
  completed_at: string | null
  created_at: string
}

export interface UserWeightProgress {
  id: string
  user_id: string
  weight: number
  weight_date: string
  created_at: string
}

export interface UserWorkout {
  id: string
  user_id: string
  workout_name: string
  workout_type: string
  duration_minutes: number
  calories_burned: number
  workout_date: string
  is_completed: boolean
  created_at: string
}

export interface UserGoal {
  id: string
  user_id: string
  goal_type: string
  goal_title: string
  goal_description: string
  target_value: number
  current_value: number
  target_date: string
  status: string
  created_at: string
  updated_at: string
}

export interface WeeklyProgress {
  id: string
  user_id: string
  week_start: string
  day_of_week: number
  workout_planned: string
  is_completed: boolean
  created_at: string
}

// Funções helper para buscar dados do usuário
export async function getUserProfile(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    return { data, error }
  } catch (error) {
    console.error('Erro ao buscar perfil:', error)
    return { data: null, error }
  }
}

export async function getUserStats(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single()
    
    return { data, error }
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error)
    return { data: null, error }
  }
}

export async function getUserAchievements(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_achievements')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  } catch (error) {
    console.error('Erro ao buscar conquistas:', error)
    return { data: [], error }
  }
}

export async function getUserWorkouts(userId: string, limit = 10) {
  try {
    const { data, error } = await supabase
      .from('user_workouts')
      .select('*')
      .eq('user_id', userId)
      .order('workout_date', { ascending: false })
      .limit(limit)
    
    return { data, error }
  } catch (error) {
    console.error('Erro ao buscar treinos:', error)
    return { data: [], error }
  }
}

export async function getUserGoals(userId: string) {
  try {
    const { data, error } = await supabase
      .from('user_goals')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    return { data, error }
  } catch (error) {
    console.error('Erro ao buscar metas:', error)
    return { data: [], error }
  }
}

export async function getWeeklyProgress(userId: string) {
  try {
    const { data, error } = await supabase
      .from('weekly_progress')
      .select('*')
      .eq('user_id', userId)
      .order('day_of_week', { ascending: true })
    
    return { data, error }
  } catch (error) {
    console.error('Erro ao buscar progresso semanal:', error)
    return { data: [], error }
  }
}

// Função para verificar se o usuário está autenticado
export async function getCurrentUser() {
  try {
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  } catch (error) {
    console.error('Erro ao verificar usuário:', error)
    return { user: null, error }
  }
}

// Função para fazer logout
export async function signOut() {
  try {
    const { error } = await supabase.auth.signOut()
    return { error }
  } catch (error) {
    console.error('Erro ao fazer logout:', error)
    return { error }
  }
}