'use client';

import { useState } from 'react';
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

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'community' | 'goals'>('overview');

  // Dados do usuário (exemplo)
  const userData = {
    name: 'Ana Silva',
    plan: 'PRO',
    joinDate: '2025-01-15',
    currentWeight: 68.5,
    goalWeight: 65.0,
    weeklyGoal: 'Perder 0.5kg',
    streak: 12,
    totalWorkouts: 45,
    communityRank: 23
  };

  const weeklyProgress = [
    { day: 'Seg', completed: true, workout: 'Cardio 30min' },
    { day: 'Ter', completed: true, workout: 'Musculação' },
    { day: 'Qua', completed: false, workout: 'Yoga' },
    { day: 'Qui', completed: true, workout: 'HIIT' },
    { day: 'Sex', completed: false, workout: 'Descanso' },
    { day: 'Sáb', completed: false, workout: 'Caminhada' },
    { day: 'Dom', completed: false, workout: 'Natação' }
  ];

  const achievements = [
    { title: 'Primeira Semana', description: 'Complete 7 dias consecutivos', earned: true, icon: '🏆' },
    { title: 'Peso Meta', description: 'Alcance seu peso ideal', earned: false, icon: '⚖️' },
    { title: 'Comunidade Ativa', description: '50 mensagens no chat', earned: true, icon: '💬' },
    { title: 'Consistência', description: '30 dias de treino', earned: false, icon: '🔥' }
  ];

  const communityStats = {
    messages: 127,
    reactions: 89,
    helpedMembers: 12,
    rank: 23
  };

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
                {userData.plan}
              </Badge>
              <span className="text-sm text-gray-600">Olá, {userData.name}!</span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/auth'}
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
                    <h2 className="text-2xl font-bold mb-2">Bem-vinda de volta, {userData.name}!</h2>
                    <p className="text-orange-100">
                      Você está no plano {userData.plan} desde {userData.joinDate}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">{userData.streak}</div>
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
                  <div className="text-2xl font-bold text-gray-900">{userData.currentWeight}kg</div>
                  <div className="text-gray-600">Peso atual</div>
                  <div className="text-sm text-green-600 mt-1">
                    Meta: {userData.goalWeight}kg
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{userData.streak}</div>
                  <div className="text-gray-600">Dias consecutivos</div>
                  <div className="text-sm text-orange-600 mt-1">
                    Recorde pessoal!
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Trophy className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{userData.totalWorkouts}</div>
                  <div className="text-gray-600">Treinos completos</div>
                  <div className="text-sm text-blue-600 mt-1">
                    +3 esta semana
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">#{userData.communityRank}</div>
                  <div className="text-gray-600">Ranking comunidade</div>
                  <div className="text-sm text-yellow-600 mt-1">
                    Top 25!
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
                        day.completed 
                          ? 'bg-green-500 text-white' 
                          : 'bg-gray-200 text-gray-600'
                      }`}>
                        {day.completed ? '✓' : day.day.charAt(0)}
                      </div>
                      <div className="text-xs font-medium">{day.day}</div>
                      <div className="text-xs text-gray-500 mt-1">{day.workout}</div>
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
                  {achievements.map((achievement, index) => (
                    <div key={index} className={`p-4 rounded-lg border ${
                      achievement.earned 
                        ? 'bg-yellow-50 border-yellow-200' 
                        : 'bg-gray-50 border-gray-200'
                    }`}>
                      <div className="flex items-center space-x-3">
                        <div className="text-2xl">{achievement.icon}</div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${
                            achievement.earned ? 'text-yellow-800' : 'text-gray-600'
                          }`}>
                            {achievement.title}
                          </h3>
                          <p className={`text-sm ${
                            achievement.earned ? 'text-yellow-700' : 'text-gray-500'
                          }`}>
                            {achievement.description}
                          </p>
                        </div>
                        {achievement.earned && (
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
                    <span>Peso inicial:</span>
                    <span className="font-semibold">72.0kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Peso atual:</span>
                    <span className="font-semibold text-green-600">{userData.currentWeight}kg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Meta:</span>
                    <span className="font-semibold text-orange-600">{userData.goalWeight}kg</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-orange-500 h-3 rounded-full transition-all"
                      style={{ width: '70%' }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-600 text-center">
                    Você já perdeu 3.5kg! Faltam apenas 3.5kg para sua meta.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Histórico de Treinos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { date: '15/01/2025', type: 'Cardio', duration: '30min', calories: 250 },
                    { date: '14/01/2025', type: 'Musculação', duration: '45min', calories: 180 },
                    { date: '13/01/2025', type: 'HIIT', duration: '25min', calories: 300 },
                    { date: '12/01/2025', type: 'Yoga', duration: '40min', calories: 120 }
                  ].map((workout, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium">{workout.type}</div>
                        <div className="text-sm text-gray-600">{workout.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">{workout.duration}</div>
                        <div className="text-sm text-gray-600">{workout.calories} kcal</div>
                      </div>
                    </div>
                  ))}
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
                  <div className="text-2xl font-bold">{communityStats.messages}</div>
                  <div className="text-gray-600 text-sm">Mensagens enviadas</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Heart className="w-8 h-8 mx-auto mb-2 text-red-500" />
                  <div className="text-2xl font-bold">{communityStats.reactions}</div>
                  <div className="text-gray-600 text-sm">Reações recebidas</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <div className="text-2xl font-bold">{communityStats.helpedMembers}</div>
                  <div className="text-gray-600 text-sm">Membros ajudados</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 text-center">
                  <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
                  <div className="text-2xl font-bold">#{communityStats.rank}</div>
                  <div className="text-gray-600 text-sm">Ranking geral</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Acesso ao Chat Exclusivo PRO</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto">
                    <Crown className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold">Chat Exclusivo PRO</h3>
                  <p className="text-gray-600">
                    Converse com outros membros PRO, tire dúvidas com especialistas e participe de desafios exclusivos.
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
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">Perder 3.5kg</h3>
                      <Badge className="bg-orange-100 text-orange-800">Em progresso</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Meta: atingir 65kg até março</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-orange-500 h-2 rounded-full" style={{ width: '50%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">50% concluído</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">30 dias consecutivos</h3>
                      <Badge className="bg-yellow-100 text-yellow-800">Quase lá!</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Atual: {userData.streak} dias</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '40%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">40% concluído</p>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">100 treinos completos</h3>
                      <Badge className="bg-green-100 text-green-800">No prazo</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">Atual: {userData.totalWorkouts} treinos</p>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">45% concluído</p>
                  </div>
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