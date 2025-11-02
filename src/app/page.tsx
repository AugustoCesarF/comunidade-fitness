'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Zap, 
  Users, 
  Trophy, 
  Target,
  ArrowRight,
  Star,
  Crown,
  Shield,
  Quote
} from 'lucide-react';

export default function HomePage() {
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const reviews = [
    {
      text: "Transformei minha vida em 3 meses! Perdi 15kg e ganhei muita confiança. O suporte da comunidade é incrível!",
      name: "Maria Silva",
      status: "Membro Premium",
      rating: 5
    },
    {
      text: "Nunca pensei que conseguiria, mas com o VIRA VIDA alcancei meus objetivos. Os especialistas são fantásticos!",
      name: "João Santos",
      status: "Membro PRO",
      rating: 5
    },
    {
      text: "A metodologia funciona de verdade! Em 6 meses mudei completamente meu estilo de vida. Recomendo muito!",
      name: "Ana Costa",
      status: "Membro Premium",
      rating: 5
    },
    {
      text: "Melhor investimento que já fiz! O acompanhamento personalizado fez toda a diferença na minha jornada.",
      name: "Carlos Oliveira",
      status: "Membro PRO",
      rating: 5
    }
  ];

  useEffect(() => {
    // Redirecionar para autenticação após 3 segundos
    const timer = setTimeout(() => {
      window.location.href = '/auth';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Carrossel automático das avaliações
    const interval = setInterval(() => {
      setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 4000); // Troca a cada 4 segundos

    return () => clearInterval(interval);
  }, [reviews.length]);

  const goToAuth = () => {
    window.location.href = '/auth';
  };

  const goToHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center p-4">
      <div className="text-center max-w-4xl">
        {/* Logo e Título */}
        <div className="mb-8">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <img 
              src="https://k6hrqrxuu8obbfwn.public.blob.vercel-storage.com/temp/dd53dc38-149c-43d3-852f-13fb0aafcef1.png" 
              alt="Logo VIRA VIDA" 
              className="h-32 w-auto cursor-pointer hover:scale-105 transition-transform"
              onClick={goToHome}
            />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Lançamento Oficial - Janeiro 2025
          </h2>
          
          <p className="text-xl text-gray-600 mb-8">
            Sua Nova Vida Começa Agora!
          </p>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Users, number: '0', label: 'Membros ativos' },
            { icon: Trophy, number: '0%', label: 'Taxa de sucesso' },
            { icon: Target, number: '0', label: 'Especialistas' },
            { icon: Star, number: '0,0', label: 'Avaliação média' }
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-all">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-gray-600">{stat.label}</div>
                  {stat.label === 'Membros ativos' && (
                    <div className="text-sm text-gray-500 mt-1">0Membros ativos</div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Carrossel de Avaliações */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">O que nossos membros dizem</h3>
          <div className="relative max-w-2xl mx-auto">
            <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white overflow-hidden">
              <CardContent className="p-8 text-center relative">
                <Quote className="w-8 h-8 mx-auto mb-4 opacity-50" />
                <p className="text-lg italic mb-6 leading-relaxed">
                  "{reviews[currentReviewIndex].text}"
                </p>
                <div className="flex justify-center mb-4">
                  {[...Array(reviews[currentReviewIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-300 fill-current" />
                  ))}
                </div>
                <div>
                  <p className="font-semibold text-lg">{reviews[currentReviewIndex].name}</p>
                  <p className="text-orange-100 text-sm">{reviews[currentReviewIndex].status}</p>
                </div>
              </CardContent>
            </Card>
            
            {/* Indicadores do carrossel */}
            <div className="flex justify-center mt-4 space-x-2">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentReviewIndex 
                      ? 'bg-orange-500' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  onClick={() => setCurrentReviewIndex(index)}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Planos Disponíveis */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {[
            {
              name: 'Gratuito',
              price: 'R$ 0',
              icon: Shield,
              color: 'from-gray-500 to-gray-600',
              features: ['Acesso básico', 'Tracking peso', 'Comunidade geral']
            },
            {
              name: 'PRO',
              price: 'R$ 29,90',
              icon: Zap,
              color: 'from-orange-500 to-red-500',
              popular: true,
              features: ['Chat exclusivo', 'Planos personalizados', 'Consultoria nutricional']
            },
            {
              name: 'Premium',
              price: 'R$ 59,90',
              icon: Crown,
              color: 'from-blue-600 to-blue-800',
              features: ['Personal 1:1', 'Análise avançada', 'Eventos exclusivos']
            }
          ].map((plan, index) => {
            const IconComponent = plan.icon;
            return (
              <Card key={index} className={`hover:shadow-xl transition-all ${plan.popular ? 'ring-2 ring-orange-500 scale-105' : ''}`}>
                <CardContent className="p-6 text-center">
                  {plan.popular && (
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium mb-4 inline-block">
                      Mais Popular
                    </div>
                  )}
                  <div className={`w-12 h-12 bg-gradient-to-r ${plan.color} rounded-lg flex items-center justify-center mx-auto mb-4`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-3xl font-bold text-gray-900 mb-4">{plan.price}</div>
                  <div className="space-y-2 text-sm text-gray-600">
                    {plan.features.map((feature, i) => (
                      <div key={i}>• {feature}</div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="space-y-6">
          <Button 
            onClick={goToAuth}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-2xl hover:shadow-3xl transition-all"
          >
            Começar Agora
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
          
          <p className="text-gray-500">
            Redirecionando automaticamente em 3 segundos...
          </p>
        </div>

        {/* Garantia */}
        <Card className="mt-12 bg-green-50 border-green-200 max-w-md mx-auto">
          <CardContent className="p-6 text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-green-600" />
            <h3 className="font-semibold text-green-800 mb-1">Garantia de 7 dias</h3>
            <p className="text-sm text-green-700">
              100% do seu dinheiro de volta se não ficar satisfeito
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}