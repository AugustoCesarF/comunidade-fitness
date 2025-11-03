'use client'

import { createContext, useContext, useEffect, useState } from 'react'
import { User } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

interface AuthContextType {
  user: User | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, password: string, name: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true

    // Verificar sessão atual
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        if (mounted) {
          setUser(session?.user ?? null)
          setLoading(false)
        }
      } catch (error) {
        console.error('Erro ao obter sessão:', error)
        if (mounted) {
          setUser(null)
          setLoading(false)
        }
      }
    }

    getSession()

    // Escutar mudanças de autenticação
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      if (mounted) {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    })

    return () => {
      mounted = false
      subscription.unsubscribe()
    }
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    }
  }

  const signUp = async (email: string, password: string, name: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (error) throw error
      
      // Criar perfil do usuário apenas se o usuário foi criado
      if (data.user && !data.user.email_confirmed_at) {
        // Aguardar confirmação de email antes de criar perfil
        return
      }
      
      if (data.user) {
        // Criar perfil do usuário
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert([
            {
              user_id: data.user.id,
              name,
              email,
            },
          ])
        
        if (profileError) {
          console.error('Erro ao criar perfil:', profileError)
        }

        // Criar estatísticas iniciais
        const { error: statsError } = await supabase
          .from('user_stats')
          .insert([
            {
              user_id: data.user.id,
              messages_sent: 0,
              reactions_received: 0,
              members_helped: 0,
              general_ranking: 0,
            },
          ])
        
        if (statsError) {
          console.error('Erro ao criar estatísticas:', statsError)
        }

        // Criar conquistas iniciais
        const initialAchievements = [
          {
            user_id: data.user.id,
            achievement_name: 'Primeira Semana',
            achievement_description: 'Complete 7 dias consecutivos',
            is_completed: false,
          },
          {
            user_id: data.user.id,
            achievement_name: 'Comunidade Ativa',
            achievement_description: 'Participe de 10 discussões',
            is_completed: false,
          },
          {
            user_id: data.user.id,
            achievement_name: 'Meta Alcançada',
            achievement_description: 'Atinja sua primeira meta de peso',
            is_completed: false,
          },
          {
            user_id: data.user.id,
            achievement_name: 'Transformação',
            achievement_description: 'Complete 30 dias de jornada',
            is_completed: false,
          },
        ]

        const { error: achievementsError } = await supabase
          .from('user_achievements')
          .insert(initialAchievements)
        
        if (achievementsError) {
          console.error('Erro ao criar conquistas:', achievementsError)
        }
      }
    } catch (error) {
      console.error('Erro no cadastro:', error)
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
    } catch (error) {
      console.error('Erro no logout:', error)
      throw error
    }
  }

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}