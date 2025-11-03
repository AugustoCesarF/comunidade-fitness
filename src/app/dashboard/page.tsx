'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Zap, 
  Target,
  TrendingUp,
  Calendar,
  Users,
  MessageCircle,
  Trophy,
  Settings,
  LogOut,
  BarChart3,
  Heart,
  Flame
} from 'lucide-react';
import { supabase, getUserProfile, getUserStats, getUserAchievements, getUserWorkouts, getUserGoals, getWeeklyProgress } from '@/lib/supabase';

interface UserData {
  profile: any;
  stats: any;
  achievements: any[];
  workouts: any[];
  goals: any[];
  weeklyProgress: any[];
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'community' | 'goals'>('overview');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    // Verificar se usuário está logado
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        window.location.href = '/auth';
        return;
      }
      setUser(user);
      await loadUserData(user.id);
    };

    checkUser();
  }, []);

  const loadUserData = async (userId: string) => {
    try {
      setLoading(true);
      
      // Buscar todos os dados do usuário
      const [profileResult, statsResult, achievementsResult, workoutsResult, goalsResult, weeklyResult] = await Promise.all([
        getUserProfile(userId),
        getUserStats(userId),
        getUserAchievements(userId),
        getUserWorkouts(userId),
        getUserGoals(userId),
        getWeeklyProgress(userId)
      ]);

      setUserData({
        profile: profileResult.data,
        stats: statsResult.data,
        achievements: achievementsResult.data || [],
        workouts: workoutsResult.data || [],
        goals: goalsResult.data || [],
        weeklyProgress: weeklyResult.data || []
      });
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/auth';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Erro ao carregar dados. Tente novamente.</p>
          <Button onClick={() => window.location.reload()} className="mt-4">
            Recarregar
          </Button>
        </div>
      </div>
    );
  }

  // Dados com fallback para valores padrão
  const profile = userData.profile || { name: 'Usuário', plan: 'FREE', join_date: new Date().toISOString() };
  const stats = userData.stats || { 
    current_weight: 0, 
    goal_weight: 0, 
    streak_days: 0, 
    total_workouts: 0, 
    community_rank: 999,
    messages_sent: 0,
    reactions_received: 0,
    members_helped: 0
  };

  // Progresso semanal com dados reais ou padrão
  const weeklyProgress = userData.weeklyProgress.length > 0 ? userData.weeklyProgress : [
    { day_of_week: 1, workout_planned: 'Cardio 30min', is_completed: false },
    { day_of_week: 2, workout_planned: 'Musculação', is_completed: false },
    { day_of_week: 3, workout_planned: 'Yoga', is_completed: false },
    { day_of_week: 4, workout_planned: 'HIIT', is_completed: false },
    { day_of_week: 5, workout_planned: 'Descanso', is_completed: false },
    { day_of_week: 6, workout_planned: 'Caminhada', is_completed: false },
    { day_of_week: 7, workout_planned: 'Natação', is_completed: false }
  ];

  const dayNames = ['', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-orange-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <img 
                  src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/adfa270c-eb13-4644-b4b7-3785a5021aed.png" 
                  alt="Logo VIRA VIDA" 
                  className="h-8 w-auto"
                />
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                  VIRA VIDA
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <Zap className="w-3 h-3 mr-1" />
                {profile.plan}
              </Badge>
              <span className="text-sm text-gray-600">Olá, {profile.name}!</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleLogout}
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation */}
        <div className="flex space-x-1 mb-8 bg-white rounded-lg p-1 shadow-sm">
          {[
            { id: 'overview', label: 'Visão Geral', icon: BarChart3 },
            { id: 'progress', label: 'Progresso', icon: TrendingUp },
            { id: 'community', label: 'Comunidade', icon: Users },
            { id: 'goals', label: 'Metas', icon: Target }
          ].map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all ${
                activeTab === id
                  ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span className="font-medium">{label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Welcome Card */}
            <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">Bem-vinda de volta, {profile.name}!</h2>
                    <p className="text-orange-100">
                      Você está no plano {profile.plan} desde {new Date(profile.join_date).toLocaleDateString('pt-BR')}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{stats.streak_days}</div>
                    <div className="text-orange-100">dias consecutivos</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stats.current_weight || 0}kg</div>
                  <div className="text-gray-600">Peso atual</div>
                  <div className="text-sm text-green-600 mt-1">
                    Meta: {stats.goal_weight || 0}kg
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stats.streak_days}</div>
                  <div className="text-gray-600">Dias consecutivos</div>
                  <div className="text-sm text-orange-600 mt-1">
                    {stats.streak_days > 0 ? 'Continue assim!' : 'Comece hoje!'}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stats.total_workouts}</div>
                  <div className="text-gray-600">Treinos completos</div>
                  <div className="text-sm text-blue-600 mt-1">
                    Parabéns!
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">#{stats.community_rank}</div>
                  <div className="text-gray-600">Ranking comunidade</div>
                  <div className="text-sm text-yellow-600 mt-1">
                    {stats.community_rank <= 50 ? 'Top 50!' : 'Continue subindo!'}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Weekly Progress */}
            <Card>
              <CardHeader>
                <CardTitle>Progresso da Semana</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-4">
                  {weeklyProgress.map((day, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2 ${
                        day.is_completed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {day.is_completed ? '✓' : dayNames[day.day_of_week]?.charAt(0)}
                      </div>
                      <div className="text-xs font-medium">{dayNames[day.day_of_week]}</div>
                      <div className="text-xs text-gray-500 mt-1">{day.workout_planned}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle>Conquistas</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userData.achievements.map((achievement, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      achievement.is_completed 
                        ? 'bg-yellow-50 border-yellow-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{achievement.achievement_icon}</div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${
                            achievement.is_completed ? 'text-yellow-800' : 'text-gray-600'
                          }`}>
                            {achievement.achievement_name}
                          </h3>
                          <p className={`text-sm ${
                            achievement.is_completed ? 'text-yellow-700' : 'text-gray-500'
                          }`}>
                            {achievement.achievement_description}
                          </p>
                        </div>
                        {achievement.is_completed && (
                          <Badge className="bg-yellow-500 text-white">
                            Conquistado!
                          </Badge>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Progress Tab */}
        {activeTab === 'progress' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Evolução do Peso</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Peso atual:</span>
                    <span className="font-semibold text-green-600">{stats.current_weight || 0}kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Meta:</span>
                    <span className="font-semibold text-orange-600">{stats.goal_weight || 0}kg</span>
                  </div>
                  {stats.current_weight > 0 && stats.goal_weight > 0 && (
                    <>
                      <div className="w-full bg-gray-200 rounded-full h-3">
                        <div 
                          className="bg-gradient-to-r from-green-500 to-orange-500 h-3 rounded-full transition-all"
                          style={{ 
                            width: `${Math.min(100, Math.max(0, ((stats.current_weight - stats.goal_weight) / stats.current_weight) * 100))}%` 
                          }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 text-center">
                        {stats.current_weight > stats.goal_weight 
                          ? `Faltam ${(stats.current_weight - stats.goal_weight).toFixed(1)}kg para sua meta.`
                          : 'Parabéns! Você atingiu sua meta!'
                        }
                      </p>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Treinos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {userData.workouts.length > 0 ? userData.workouts.map((workout, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{workout.workout_name}</div>
                        <div className="text-sm text-gray-600">{new Date(workout.workout_date).toLocaleDateString('pt-BR')}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{workout.duration_minutes}min</div>
                        <div className="text-sm text-gray-600">{workout.calories_burned} kcal</div>
                      </div>
                    </div>
                  )) : (
                    <p className="text-center text-gray-500 py-8">
                      Nenhum treino registrado ainda. Comece hoje!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Community Tab */}
        {activeTab === 'community' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-8 h-8 mx-auto mb-2 text-orange-500" />
                  <div className="text-2xl font-bold">{stats.messages_sent}</div>
                  <div className="text-gray-600 text-sm">Mensagens enviadas</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
                  <div className="text-2xl font-bold">{stats.reactions_received}</div>
                  <div className="text-gray-600 text-sm">Reações recebidas</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">{stats.members_helped}</div>
                  <div className="text-gray-600 text-sm">Membros ajudados</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                  <div className="text-2xl font-bold">#{stats.community_rank}</div>
                  <div className="text-gray-600 text-sm">Ranking geral</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Acesso ao Chat Exclusivo {profile.plan}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Chat Exclusivo {profile.plan}</h3>
                  <p className="text-gray-600">
                    Converse com outros membros {profile.plan}, tire dúvidas com especialistas e participe de desafios exclusivos.
                  </p>
                  <Button 
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    onClick={() => window.location.href = '/community'}
                  >
                    <MessageCircle className="w-4 h-4 mr-2" />
                    Entrar no Chat
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Goals Tab */}
        {activeTab === 'goals' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Metas Atuais</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userData.goals.length > 0 ? userData.goals.map((goal, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{goal.goal_title}</h3>
                        <Badge className={`${
                          goal.status === 'completed' ? 'bg-green-100 text-green-800' :
                          goal.status === 'active' ? 'bg-orange-100 text-orange-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {goal.status === 'completed' ? 'Concluída' :
                           goal.status === 'active' ? 'Em progresso' : 'Pausada'}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{goal.goal_description}</p>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ 
                            width: `${Math.min(100, (goal.current_value / goal.target_value) * 100)}%` 
                          }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        {Math.round((goal.current_value / goal.target_value) * 100)}% concluído
                      </p>
                    </div>
                  )) : (
                    <p className="text-center text-gray-500 py-8">
                      Nenhuma meta definida ainda. Crie sua primeira meta!
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Definir Nova Meta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Meta de Peso', description: 'Definir novo peso alvo', icon: '⚖️' },
                    { title: 'Frequência de Treino', description: 'Treinos por semana', icon: '💪' },
                    { title: 'Meta de Calorias', description: 'Queima diária de calorias', icon: '🔥' },
                    { title: 'Desafio Pessoal', description: 'Criar desafio customizado', icon: '🎯' }
                  ].map((goal, index) => (
                    <div key={index} className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer">
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{goal.icon}</div>
                        <div>
                          <h3 className="font-semibold">{goal.title}</h3>
                          <p className="text-sm text-gray-600">{goal.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}