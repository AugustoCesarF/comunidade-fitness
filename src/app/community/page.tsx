'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  MessageCircle, 
  Crown, 
  Users, 
  Send, 
  Bot,
  Trophy,
  Flame,
  Star,
  Shield,
  Zap,
  LogOut
} from 'lucide-react';

const CHANNELS = [
  {
    id: 'coach-corner',
    name: 'Coach Corner',
    description: 'Dúvidas com nutricionistas e personal trainers',
    icon: '🧠',
    color: 'from-orange-500 to-red-500'
  },
  {
    id: 'workout-hacks',
    name: 'Workout Hacks',
    description: 'Dicas e truques de treino da comunidade',
    icon: '💪',
    color: 'from-green-500 to-emerald-500'
  },
  {
    id: 'progress-selfies',
    name: 'Progress Selfies',
    description: 'Fotos de progresso (auto-delete 24h)',
    icon: '📸',
    color: 'from-blue-600 to-blue-800'
  }
];

const REACTIONS = ['🔥', '💪', '👏', '❤️', '👍', '⚡', '🎯', '💯'];

type ChatMessage = {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  channel: string;
  timestamp: Date;
  reactions: { [emoji: string]: string[] };
  isFromBot?: boolean;
  botCommand?: string;
  deleteAt?: Date;
};

export default function CommunityPage() {
  const [activeChannel, setActiveChannel] = useState<'coach-corner' | 'workout-hacks' | 'progress-selfies'>('coach-corner');
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Dados limpos para lançamento - apenas mensagens essenciais
    const now = Date.now();
    const launchMessages: ChatMessage[] = [
      {
        id: '1',
        userId: 'bot',
        userName: 'FitBot',
        content: '🎉 Bem-vindos ao VIRA VIDA! Estamos oficialmente no ar! Use /help para ver comandos disponíveis.',
        channel: 'coach-corner',
        timestamp: new Date(now - 3600000),
        reactions: { '🎉': ['admin'], '🔥': ['admin'] },
        isFromBot: true
      },
      {
        id: '2',
        userId: 'admin',
        userName: 'Equipe VIRA VIDA',
        userAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        content: '🚀 Lançamento oficial! Sejam todos bem-vindos à nossa comunidade fitness. Vamos transformar vidas juntos!',
        channel: 'coach-corner',
        timestamp: new Date(now - 1800000),
        reactions: { '🚀': ['bot'], '❤️': ['bot'] }
      }
    ];
    
    setMessages(launchMessages);
  }, []);

  const channelMessages = messages.filter(msg => msg.channel === activeChannel);
  const activeChannelData = CHANNELS.find(ch => ch.id === activeChannel);

  const sendMessage = () => {
    if (!newMessage.trim()) return;

    const message: ChatMessage = {
      id: Date.now().toString(),
      userId: 'user1',
      userName: 'Você',
      userAvatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      content: newMessage,
      channel: activeChannel,
      timestamp: new Date(),
      reactions: {}
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simular resposta do bot para comandos
    if (newMessage.startsWith('/')) {
      setTimeout(() => {
        const botResponse = handleBotCommand(newMessage);
        if (botResponse) {
          setMessages(prev => [...prev, botResponse]);
        }
      }, 1000);
    }
  };

  const handleBotCommand = (command: string): ChatMessage | null => {
    const [cmd, ...args] = command.split(' ');
    
    let response = '';
    
    if (cmd === '/help') {
      response = '🤖 Comandos disponíveis:\n/macro [alimento] - Informações nutricionais\n/consulta - Agendar consulta\n/help - Mostrar comandos';
    } else if (cmd === '/macro' && args.length > 0) {
      const food = args.join(' ');
      response = `🍽️ ${food} (porção média): ~200 kcal | Proteína: 8g | Carbs: 25g | Gordura: 8g`;
    } else if (cmd === '/consulta') {
      response = '📅 Consulta agendada! Você receberá o link por email em breve.';
    } else {
      return null;
    }

    return {
      id: Date.now().toString() + '_bot',
      userId: 'bot',
      userName: 'FitBot',
      content: response,
      channel: activeChannel,
      timestamp: new Date(),
      reactions: {},
      isFromBot: true,
      botCommand: command
    };
  };

  const addReaction = (messageId: string, emoji: string) => {
    setMessages(prev => prev.map(msg => {
      if (msg.id === messageId) {
        const reactions = { ...msg.reactions };
        if (reactions[emoji]) {
          if (reactions[emoji].includes('user1')) {
            reactions[emoji] = reactions[emoji].filter(id => id !== 'user1');
            if (reactions[emoji].length === 0) {
              delete reactions[emoji];
            }
          } else {
            reactions[emoji] = [...reactions[emoji], 'user1'];
          }
        } else {
          reactions[emoji] = ['user1'];
        }
        return { ...msg, reactions };
      }
      return msg;
    }));
  };

  const formatTime = (date: Date) => {
    if (!isClient) return '00:00';
    return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
  };

  const getTimeUntilDelete = (deleteAt: Date) => {
    if (!isClient) return '0h 0m';
    const now = new Date();
    const diff = deleteAt.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  if (!isClient) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 bg-gradient-to-r from-orange-600 to-red-600 rounded-lg flex items-center justify-center mx-auto mb-4">
            <Crown className="w-5 h-5 text-white" />
          </div>
          <p className="text-gray-600">Carregando chat...</p>
        </div>
      </div>
    );
  }

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
                  Chat Exclusivo PRO
                </h1>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                <Crown className="w-3 h-3 mr-1" />
                PRO
              </Badge>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Users className="w-4 h-4" />
                <span>3 membros online</span>
              </div>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.href = '/dashboard'}
                className="border-orange-200 text-orange-600 hover:bg-orange-50"
              >
                <LogOut className="w-4 h-4 mr-1" />
                Voltar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Canais */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MessageCircle className="w-5 h-5" />
                  <span>Canais</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {CHANNELS.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => setActiveChannel(channel.id as any)}
                    className={`w-full p-3 rounded-lg text-left transition-all ${
                      activeChannel === channel.id
                        ? `bg-gradient-to-r ${channel.color} text-white`
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">{channel.icon}</span>
                      <span className="font-medium">{channel.name}</span>
                    </div>
                    <p className={`text-xs ${
                      activeChannel === channel.id ? 'text-white/80' : 'text-gray-500'
                    }`}>
                      {channel.description}
                    </p>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Bot Info */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="w-5 h-5 text-orange-600" />
                  <span>FitBot</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Shield className="w-4 h-4 text-green-500" />
                    <span>Moderador ativo</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span>Comandos disponíveis</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-orange-50 rounded-lg">
                  <p className="text-xs text-orange-800">
                    <strong>Comandos:</strong><br/>
                    /macro [alimento]<br/>
                    /consulta<br/>
                    /help
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Principal */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              {/* Chat Header */}
              <CardHeader className={`bg-gradient-to-r ${activeChannelData?.color} text-white rounded-t-lg`}>
                <CardTitle className="flex items-center space-x-2">
                  <span className="text-2xl">{activeChannelData?.icon}</span>
                  <div>
                    <div>{activeChannelData?.name}</div>
                    <div className="text-sm text-white/80">{activeChannelData?.description}</div>
                  </div>
                </CardTitle>
              </CardHeader>

              {/* Messages Area */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {channelMessages.length === 0 ? (
                  <div className="text-center text-gray-500 mt-8">
                    <MessageCircle className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Seja o primeiro a enviar uma mensagem neste canal!</p>
                  </div>
                ) : (
                  channelMessages.map((message) => (
                    <div key={message.id} className={`flex space-x-3 ${message.isFromBot ? 'bg-orange-50 p-3 rounded-lg' : ''}`}>
                      <Avatar className="w-10 h-10">
                        {message.isFromBot ? (
                          <div className="w-full h-full bg-orange-600 rounded-full flex items-center justify-center">
                            <Bot className="w-6 h-6 text-white" />
                          </div>
                        ) : (
                          <>
                            <AvatarImage src={message.userAvatar} />
                            <AvatarFallback>{message.userName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </>
                        )}
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-semibold text-sm">{message.userName}</span>
                          {message.isFromBot && (
                            <Badge variant="secondary" className="text-xs">
                              <Bot className="w-3 h-3 mr-1" />
                              Bot
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                          {message.deleteAt && (
                            <Badge variant="outline" className="text-xs text-orange-600">
                              📸 {getTimeUntilDelete(message.deleteAt)}
                            </Badge>
                          )}
                        </div>

                        <p className="text-gray-900 mb-2 whitespace-pre-line">{message.content}</p>

                        {/* Reactions */}
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            {Object.entries(message.reactions).map(([emoji, users]) => (
                              <button
                                key={emoji}
                                onClick={() => addReaction(message.id, emoji)}
                                className={`px-2 py-1 rounded-full text-xs flex items-center space-x-1 transition-colors ${
                                  users.includes('user1')
                                    ? 'bg-orange-100 text-orange-800'
                                    : 'bg-gray-100 hover:bg-gray-200'
                                }`}
                              >
                                <span>{emoji}</span>
                                <span>{users.length}</span>
                              </button>
                            ))}
                          </div>

                          {/* Add Reaction */}
                          <div className="flex space-x-1">
                            {REACTIONS.slice(0, 4).map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => addReaction(message.id, emoji)}
                                className="w-6 h-6 text-sm hover:bg-gray-100 rounded-full flex items-center justify-center transition-colors"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder={`Mensagem para ${activeChannelData?.name}...`}
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="flex-1"
                  />
                  <Button 
                    onClick={sendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-gray-500 mt-2">
                  💡 Use /help para ver comandos disponíveis
                </p>
              </div>
            </Card>
          </div>
        </div>

        {/* Community Stats - Dados Limpos */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Trophy className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">3</div>
              <div className="text-gray-600 text-sm">Membros PRO</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <MessageCircle className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">2</div>
              <div className="text-gray-600 text-sm">Mensagens hoje</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Flame className="w-8 h-8 mx-auto mb-2 text-red-500" />
              <div className="text-2xl font-bold">100%</div>
              <div className="text-gray-600 text-sm">Engajamento</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Star className="w-8 h-8 mx-auto mb-2 text-blue-600" />
              <div className="text-2xl font-bold">5.0</div>
              <div className="text-gray-600 text-sm">Avaliação</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}