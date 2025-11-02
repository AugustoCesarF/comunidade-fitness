'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Shield, 
  Users, 
  Settings, 
  BarChart3,
  DollarSign,
  Crown,
  Zap,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Ban,
  UserCheck
} from 'lucide-react';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'plans' | 'settings'>('dashboard');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const stats = {
    totalUsers: 1247,
    activeUsers: 892,
    proUsers: 156,
    premiumUsers: 43,
    revenue: 8450.30,
    monthlyGrowth: 23.5
  };

  const recentUsers = [
    { id: 1, name: 'Ana Silva', email: 'ana@email.com', plan: 'PRO', status: 'active', joinDate: '2025-01-15' },
    { id: 2, name: 'Carlos Santos', email: 'carlos@email.com', plan: 'Premium', status: 'active', joinDate: '2025-01-14' },
    { id: 3, name: 'Maria Oliveira', email: 'maria@email.com', plan: 'Gratuito', status: 'pending', joinDate: '2025-01-13' },
    { id: 4, name: 'João Costa', email: 'joao@email.com', plan: 'PRO', status: 'suspended', joinDate: '2025-01-12' }
  ];

  const planStats = [
    { name: 'Gratuito', users: 1048, revenue: 0, color: 'from-gray-500 to-gray-600' },
    { name: 'PRO', users: 156, revenue: 4664.40, color: 'from-orange-500 to-red-500' },
    { name: 'Premium', users: 43, revenue: 2575.70, color: 'from-blue-600 to-blue-800' }
  ];

  const formatNumber = (num: number) => {
    if (!isClient) return num.toString();
    return num.toLocaleString('pt-BR');
  };

  const formatCurrency = (num: number) => {
    if (!isClient) return `R$ ${num.toFixed(2)}`;
    return `R$ ${num.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}`;
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-100 text-green-800"><CheckCircle className="w-3 h-3 mr-1" />Ativo</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-100 text-yellow-800"><AlertTriangle className="w-3 h-3 mr-1" />Pendente</Badge>;
      case 'suspended':
        return <Badge className="bg-red-100 text-red-800"><XCircle className="w-3 h-3 mr-1" />Suspenso</Badge>;
      default:
        return <Badge variant="secondary">Desconhecido</Badge>;
    }
  };

  const getPlanBadge = (plan: string) => {
    switch (plan) {
      case 'PRO':
        return <Badge className="bg-orange-100 text-orange-800"><Zap className="w-3 h-3 mr-1" />PRO</Badge>;
      case 'Premium':
        return <Badge className="bg-blue-100 text-blue-800"><Crown className="w-3 h-3 mr-1" />Premium</Badge>;
      default:
        return <Badge variant="outline"><Shield className="w-3 h-3 mr-1" />Gratuito</Badge>;
    }
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
                  VIRA VIDA Admin
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
                <Shield className="w-3 h-3 mr-1" />
                Administrador
              </Badge>
              <Button 
                variant="outline" 
                onClick={() => window.location.href = '/auth'}
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
              >
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
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'users', label: 'Usuários', icon: Users },
            { id: 'plans', label: 'Planos', icon: Crown },
            { id: 'settings', label: 'Configurações', icon: Settings }
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

        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-600 text-sm font-medium">Total de Usuários</p>
                      <p className="text-3xl font-bold text-blue-900">{formatNumber(stats.totalUsers)}</p>
                    </div>
                    <Users className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-green-600 text-sm font-medium">Usuários Ativos</p>
                      <p className="text-3xl font-bold text-green-900">{formatNumber(stats.activeUsers)}</p>
                    </div>
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-orange-50 to-red-50 border-orange-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-orange-600 text-sm font-medium">Usuários Premium</p>
                      <p className="text-3xl font-bold text-orange-900">{formatNumber(stats.proUsers + stats.premiumUsers)}</p>
                    </div>
                    <Crown className="w-8 h-8 text-orange-600" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-yellow-600 text-sm font-medium">Receita Mensal</p>
                      <p className="text-3xl font-bold text-yellow-900">{formatCurrency(stats.revenue)}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Planos Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Distribuição por Planos</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {planStats.map((plan, index) => (
                    <div key={index} className="text-center">
                      <div className={`w-16 h-16 bg-gradient-to-r ${plan.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                        <span className="text-2xl font-bold text-white">{plan.users}</span>
                      </div>
                      <h3 className="text-lg font-semibold">{plan.name}</h3>
                      <p className="text-gray-600">{formatNumber(plan.users)} usuários</p>
                      <p className="text-sm text-gray-500">
                        {formatCurrency(plan.revenue)}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Usuários Recentes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {getPlanBadge(user.plan)}
                        {getStatusBadge(user.status)}
                        <span className="text-sm text-gray-500">{user.joinDate}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Gerenciar Usuários</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentUsers.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">{user.name.charAt(0)}</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">{user.name}</h4>
                          <p className="text-sm text-gray-600">{user.email}</p>
                          <p className="text-xs text-gray-500">Membro desde: {user.joinDate}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        {getPlanBadge(user.plan)}
                        {getStatusBadge(user.status)}
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <UserCheck className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700">
                            <Ban className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Plans Tab */}
        {activeTab === 'plans' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {planStats.map((plan, index) => (
                <Card key={index}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <div className={`w-8 h-8 bg-gradient-to-r ${plan.color} rounded-lg flex items-center justify-center`}>
                        {plan.name === 'PRO' ? <Zap className="w-5 h-5 text-white" /> : 
                         plan.name === 'Premium' ? <Crown className="w-5 h-5 text-white" /> :
                         <Shield className="w-5 h-5 text-white" />}
                      </div>
                      <span>{plan.name}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-2xl font-bold">{formatNumber(plan.users)}</p>
                        <p className="text-gray-600">usuários ativos</p>
                      </div>
                      <div>
                        <p className="text-xl font-semibold text-green-600">
                          {formatCurrency(plan.revenue)}
                        </p>
                        <p className="text-gray-600">receita mensal</p>
                      </div>
                      <Button className="w-full" variant="outline">
                        Gerenciar Plano
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Configurações do Sistema</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-4">Configurações Gerais</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Registros Abertos</h4>
                          <p className="text-sm text-gray-600">Permitir novos usuários se cadastrarem</p>
                        </div>
                        <Button variant="outline" className="bg-green-50 text-green-600">
                          Ativo
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Modo Manutenção</h4>
                          <p className="text-sm text-gray-600">Desabilitar acesso temporariamente</p>
                        </div>
                        <Button variant="outline">
                          Inativo
                        </Button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-medium">Chat Moderado</h4>
                          <p className="text-sm text-gray-600">Ativar moderação automática</p>
                        </div>
                        <Button variant="outline" className="bg-green-50 text-green-600">
                          Ativo
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4">Status do Sistema</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">Servidor Online</span>
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">Banco de Dados OK</span>
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">Pagamentos Ativos</span>
                        </div>
                      </div>
                      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium text-green-800">Chat Funcionando</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}