'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { 
  Crown, 
  Zap, 
  Check, 
  Star,
  Shield,
  Sparkles,
  Users,
  Trophy,
  Target,
  Heart
} from 'lucide-react';

type Plan = {
  id: 'free' | 'pro' | 'premium';
  name: string;
  price: number;
  originalPrice?: number;
  description: string;
  features: string[];
  popular?: boolean;
  color: string;
  icon: any;
};

const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Gratuito',
    price: 0,
    description: 'Perfeito para começar sua jornada fitness',
    features: [
      'Acesso básico ao app',
      'Tracking de peso',
      'Exercícios básicos',
      'Comunidade geral'
    ],
    color: 'from-gray-500 to-gray-600',
    icon: Shield
  },
  {
    id: 'pro',
    name: 'PRO',
    price: 29.90,
    originalPrice: 49.90,
    description: 'Para quem quer resultados reais',
    features: [
      'Tudo do Gratuito',
      'Chat exclusivo PRO',
      'Planos personalizados',
      'Consultoria nutricional',
      'Desafios com prêmios',
      'Suporte prioritário'
    ],
    popular: true,
    color: 'from-orange-500 to-red-500',
    icon: Zap
  },
  {
    id: 'premium',
    name: 'Premium',
    price: 59.90,
    originalPrice: 99.90,
    description: 'Experiência completa e exclusiva',
    features: [
      'Tudo do PRO',
      'Personal trainer 1:1',
      'Análise corporal avançada',
      'Acesso antecipado',
      'Eventos exclusivos',
      'Cashback em compras'
    ],
    color: 'from-blue-600 to-blue-800',
    icon: Crown
  }
];

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro' | 'premium'>('pro');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simular processo de autenticação
    setTimeout(() => {
      if (mode === 'register') {
        // Criar conta
        console.log('Criando conta:', { ...formData, plan: selectedPlan });
        alert(`Conta criada com sucesso! Plano: ${PLANS.find(p => p.id === selectedPlan)?.name}`);
      } else {
        // Login
        console.log('Fazendo login:', { email: formData.email, password: formData.password });
        
        // Verificar se é admin
        if (formData.email === 'admin@fitcommunity.com' && formData.password === 'admin123') {
          alert('Login como Administrador realizado com sucesso!');
          window.location.href = '/admin';
        } else {
          alert('Login realizado com sucesso!');
          window.location.href = '/dashboard';
        }
      }
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/5c6d8ab8-5440-46bb-b3b1-b920061afb68.png" 
              alt="Logo VIRA VIDA" 
              className="h-12 w-auto"
            />
          </div>
          <p className="text-xl text-gray-600">
            Sua Nova Vida Começa Agora!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Formulário de Login/Cadastro */}
          <div className="space-y-6">
            <Card className="shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl">
                  {mode === 'login' ? 'Entrar na sua conta' : 'Criar conta'}
                </CardTitle>
                <p className="text-gray-600">
                  {mode === 'login' 
                    ? 'Bem-vindo de volta!' 
                    : 'Junte-se à nossa comunidade'
                  }
                </p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {mode === 'register' && (
                    <>
                      <div>
                        <Label htmlFor="name">Nome completo</Label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="Seu nome completo"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Telefone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(11) 99999-9999"
                          value={formData.phone}
                          onChange={(e) => handleInputChange('phone', e.target.value)}
                          required
                        />
                      </div>
                    </>
                  )}
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu@email.com"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="password">Senha</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Sua senha"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                      required
                    />
                  </div>
                  
                  {mode === 'register' && (
                    <div>
                      <Label htmlFor="confirmPassword">Confirmar senha</Label>
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="Confirme sua senha"
                        value={formData.confirmPassword}
                        onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                        required
                      />
                    </div>
                  )}

                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Processando...' : (mode === 'login' ? 'Entrar' : 'Criar conta')}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <button
                    onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                    className="text-orange-600 hover:text-orange-700 font-medium"
                  >
                    {mode === 'login' 
                      ? 'Não tem conta? Cadastre-se' 
                      : 'Já tem conta? Faça login'
                    }
                  </button>
                </div>
              </CardContent>
            </Card>


          </div>

          {/* Seleção de Planos (apenas no cadastro) */}
          {mode === 'register' && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6">Escolha seu plano</h2>
              <div className="space-y-4">
                {PLANS.map((plan) => {
                  const IconComponent = plan.icon;
                  return (
                    <Card 
                      key={plan.id}
                      className={`cursor-pointer transition-all hover:shadow-lg ${
                        selectedPlan === plan.id 
                          ? 'ring-2 ring-orange-500 shadow-lg' 
                          : ''
                      } ${plan.popular ? 'border-orange-200' : ''}`}
                      onClick={() => setSelectedPlan(plan.id)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-3">
                            <div className={`w-10 h-10 bg-gradient-to-r ${plan.color} rounded-lg flex items-center justify-center`}>
                              <IconComponent className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold flex items-center space-x-2">
                                <span>{plan.name}</span>
                                {plan.popular && (
                                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                    <Star className="w-3 h-3 mr-1" />
                                    Popular
                                  </Badge>
                                )}
                              </h3>
                              <p className="text-gray-600">{plan.description}</p>
                            </div>
                          </div>
                          
                          <div className="text-right">
                            <div className="text-3xl font-bold">
                              {plan.price === 0 ? 'Grátis' : `R$ ${plan.price.toFixed(2)}`}
                            </div>
                            {plan.originalPrice && (
                              <div className="text-sm text-gray-500 line-through">
                                R$ {plan.originalPrice.toFixed(2)}
                              </div>
                            )}
                            <div className="text-sm text-gray-600">/mês</div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {plan.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <Check className="w-4 h-4 text-green-500" />
                              <span className="text-sm">{feature}</span>
                            </div>
                          ))}
                        </div>

                        {selectedPlan === plan.id && (
                          <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                            <div className="flex items-center space-x-2 text-orange-700">
                              <Check className="w-5 h-5" />
                              <span className="font-medium">Plano selecionado</span>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Garantia */}
              <Card className="mt-6 bg-green-50 border-green-200">
                <CardContent className="p-4 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-green-600" />
                  <h3 className="font-semibold text-green-800">Garantia de 7 dias</h3>
                  <p className="text-sm text-green-700">
                    Não ficou satisfeito? Devolvemos 100% do seu dinheiro
                  </p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Benefícios (apenas no login) */}
          {mode === 'login' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-center">Por que escolher o VIRA VIDA?</h2>
              
              <div className="grid grid-cols-1 gap-4">
                {[
                  {
                    icon: Users,
                    title: 'Comunidade Ativa',
                    description: 'Mais de 10.000 membros te apoiando na jornada'
                  },
                  {
                    icon: Trophy,
                    title: 'Resultados Comprovados',
                    description: '89% dos usuários atingem suas metas em 3 meses'
                  },
                  {
                    icon: Target,
                    title: 'Planos Personalizados',
                    description: 'Treinos e dietas adaptados ao seu perfil'
                  },
                  {
                    icon: Heart,
                    title: 'Suporte 24/7',
                    description: 'Equipe de especialistas sempre disponível'
                  }
                ].map((benefit, index) => {
                  const IconComponent = benefit.icon;
                  return (
                    <Card key={index} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold">{benefit.title}</h3>
                            <p className="text-sm text-gray-600">{benefit.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              {/* Depoimentos */}
              <Card className="bg-gradient-to-r from-orange-600 to-red-600 text-white">
                <CardContent className="p-6 text-center">
                  <Sparkles className="w-8 h-8 mx-auto mb-4" />
                  <blockquote className="text-lg italic mb-4">
                    "Em 6 meses perdi 15kg e ganhei muito mais confiança. A comunidade fez toda a diferença!"
                  </blockquote>
                  <div className="flex items-center justify-center space-x-1">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-5 h-5 fill-current text-yellow-300" />
                    ))}
                  </div>
                  <p className="text-orange-100 mt-2">- Maria Silva, membro PRO</p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}