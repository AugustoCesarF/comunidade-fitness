// Tipos principais do sistema
export interface User {
  uid: string;
  displayName: string;
  avatarUrl?: string;
  weightStart: number;
  weightGoal: number;
  goalPhrase: string; // max 80 chars
  estDurationWeeks: number;
  dietStyle: 'keto' | 'low-carb' | 'vegan' | 'carnivore' | 'mediterranean';
  allergies: string[];
  restrictions: string[];
  favoriteMusic: string; // para BPM treino
  xp: number;
  badges: Record<BadgeType, Date>;
  streakDays: number;
  workoutPlanId?: string;
  mealPlanId?: string;
  isPro: boolean;
  isPremium: boolean;
  createdAt: Date;
  lastActive: Date;
  // Biomarcadores
  height?: number;
  age?: number;
  gender?: 'male' | 'female';
  activityLevel?: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active';
}

export interface MoodEntry {
  id: string;
  userId: string;
  value: number; // 1-10
  colorHue: number; // 0-360 HSL
  note?: string;
  photoUrl?: string;
  timestamp: Date;
}

export interface Badge {
  id: BadgeType;
  name: string;
  description: string;
  xpReward: number;
  icon: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export type BadgeType = 
  | 'ferro' // 7 dias peso
  | 'agua_pescoco' // 2% peso perdido
  | 'helper' // 3 dicas chat
  | 'grao_areia' // 30 treinos
  | 'disciplinado' // 30 dias streak
  | 'mentor' // ajudar 10 pessoas
  | 'transformer' // meta alcançada
  | 'warrior' // 100 treinos
  | 'guru' // 1000 XP
  | 'legend'; // 5000 XP

export interface WorkoutPlan {
  id: string;
  name: string;
  type: 'Gym' | 'Home' | 'HIIT 4-min';
  freqPerWeek: number;
  difficulty: 1 | 2 | 3 | 4 | 5;
  focusAreas: string[];
  exercises: WorkoutExercise[];
  estimatedDuration: number; // minutes
  musicBPM?: number; // baseado na preferência do usuário
}

export interface WorkoutExercise {
  id: string;
  name: string;
  videoUrl: string;
  sets: number;
  reps: number | string; // "10-12" or "30 sec"
  restSeconds: number;
  muscleGroups: string[];
  equipment: string[];
  difficulty: 1 | 2 | 3 | 4 | 5;
  // IA dinâmica baseada em humor e HRV
  dynamicSets?: number;
  dynamicReps?: number | string;
  dynamicRest?: number;
}

export interface MealPlan {
  id: string;
  name: string;
  dietStyle: User['dietStyle'];
  dailyCalories: number;
  macros: {
    protein: number; // grams
    carbs: number;
    fat: number;
  };
  meals: Meal[];
  shoppingList: ShoppingItem[];
  // Algoritmo GuloSwap
  swapSuggestions: SwapSuggestion[];
}

export interface Meal {
  id: string;
  name: string;
  type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories: number;
  macros: MealPlan['macros'];
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: number; // minutes
  imageUrl?: string;
  // Swap inteligente
  swappableWith: string[]; // IDs de refeições equivalentes
}

export interface Ingredient {
  name: string;
  amount: number;
  unit: string;
  calories: number;
}

export interface ShoppingItem {
  name: string;
  category: string; // corredor do supermercado
  quantity: string;
  estimated_price?: number;
  aisle: number; // ordem do corredor
}

export interface SwapSuggestion {
  originalMealId: string;
  alternatives: {
    mealId: string;
    reason: string; // "Mesmo macro perfil", "Ingredientes similares"
    confidenceScore: number; // 0-1
  }[];
}

export interface DailyTip {
  id: number;
  title: string;
  body: string;
  actionCTA?: string;
  category: 'nutrition' | 'workout' | 'mindset' | 'recovery';
  imageUrl?: string;
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'individual' | 'group' | 'battle-royale';
  duration: number; // days
  reward: {
    xp: number;
    badge?: BadgeType;
    prize?: string;
    stablecoinAmount?: number; // para battle-royale
  };
  participants: string[]; // user IDs
  startDate: Date;
  endDate: Date;
  isActive: boolean;
  // Battle Royale específico
  stakeAmount?: number;
  prizePool?: number;
  eliminationRate?: number; // % eliminados por rodada
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  channel: 'coach-corner' | 'workout-hacks' | 'progress-selfies';
  timestamp: Date;
  reactions: Record<string, string[]>; // emoji -> user IDs
  isDeleted?: boolean;
  deleteAt?: Date; // auto-delete for progress-selfies (24h)
  // Bot moderador
  isFromBot?: boolean;
  botCommand?: string;
}

export interface UserLevel {
  level: number;
  name: string;
  minXP: number;
  maxXP: number;
  perks: string[];
  avatarUnlocks: string[];
}

// Sistema de onboarding em 4 passos
export interface OnboardingStep {
  step: number;
  title: string;
  description: string;
  component: 'selfie-weight' | 'goal-phrase' | 'restrictions-quiz' | 'music-preference';
  isCompleted: boolean;
}

export interface OnboardingData {
  selfieUrl?: string;
  currentWeight?: number;
  goalPhrase?: string;
  estimatedWeeks?: number;
  restrictions?: string[];
  allergies?: string[];
  favoriteGenre?: string;
  targetBPM?: number;
}

// Níveis do sistema
export const USER_LEVELS: UserLevel[] = [
  {
    level: 1,
    name: "Iniciante",
    minXP: 0,
    maxXP: 500,
    perks: ["Acesso básico", "1 plano de treino"],
    avatarUnlocks: ["avatar_basic_1", "avatar_basic_2"]
  },
  {
    level: 2,
    name: "Disciplinado",
    minXP: 501,
    maxXP: 1500,
    perks: ["2 planos de treino", "Mood tracker"],
    avatarUnlocks: ["avatar_fit_1", "avatar_fit_2", "avatar_fit_3"]
  },
  {
    level: 3,
    name: "Guerreiro",
    minXP: 1501,
    maxXP: 3000,
    perks: ["Planos ilimitados", "Chat premium"],
    avatarUnlocks: ["avatar_warrior_1", "avatar_warrior_2"]
  },
  {
    level: 4,
    name: "Mestre",
    minXP: 3001,
    maxXP: 5000,
    perks: ["Mentor de outros", "Desafios exclusivos"],
    avatarUnlocks: ["avatar_master_1", "avatar_master_2"]
  },
  {
    level: 5,
    name: "Lenda",
    minXP: 5001,
    maxXP: Infinity,
    perks: ["Acesso total", "Criação de desafios"],
    avatarUnlocks: ["avatar_legend_1", "avatar_legend_2", "avatar_legend_3"]
  }
];

// Badges disponíveis
export const AVAILABLE_BADGES: Record<BadgeType, Badge> = {
  ferro: {
    id: 'ferro',
    name: 'Ferro',
    description: 'Registrou peso por 7 dias seguidos',
    xpReward: 50,
    icon: '⚖️',
    rarity: 'common'
  },
  agua_pescoco: {
    id: 'agua_pescoco',
    name: 'Água no Pescoço',
    description: 'Perdeu 2% do peso em 7 dias',
    xpReward: 75,
    icon: '💧',
    rarity: 'rare'
  },
  helper: {
    id: 'helper',
    name: 'Helper',
    description: 'Postou 3 dicas úteis no chat',
    xpReward: 100,
    icon: '🤝',
    rarity: 'rare'
  },
  grao_areia: {
    id: 'grao_areia',
    name: 'Grão de Areia',
    description: 'Completou 30 treinos',
    xpReward: 150,
    icon: '🥋',
    rarity: 'epic'
  },
  disciplinado: {
    id: 'disciplinado',
    name: 'Disciplinado',
    description: '30 dias de streak',
    xpReward: 200,
    icon: '🔥',
    rarity: 'epic'
  },
  mentor: {
    id: 'mentor',
    name: 'Mentor',
    description: 'Ajudou 10 pessoas',
    xpReward: 300,
    icon: '👨‍🏫',
    rarity: 'epic'
  },
  transformer: {
    id: 'transformer',
    name: 'Transformer',
    description: 'Alcançou sua meta de peso',
    xpReward: 500,
    icon: '🦋',
    rarity: 'legendary'
  },
  warrior: {
    id: 'warrior',
    name: 'Warrior',
    description: 'Completou 100 treinos',
    xpReward: 400,
    icon: '⚔️',
    rarity: 'legendary'
  },
  guru: {
    id: 'guru',
    name: 'Guru',
    description: 'Alcançou 1000 XP',
    xpReward: 100,
    icon: '🧘‍♂️',
    rarity: 'epic'
  },
  legend: {
    id: 'legend',
    name: 'Legend',
    description: 'Alcançou 5000 XP',
    xpReward: 500,
    icon: '👑',
    rarity: 'legendary'
  }
};

// 12 Features Inéditas
export interface MoreFeature {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'tracking' | 'social' | 'ai' | 'hardware' | 'wellness' | 'gamification';
  isPremium: boolean;
}

export const MORE_FEATURES: MoreFeature[] = [
  {
    id: 'fast-log',
    name: 'Fast-Log Widget',
    description: 'Registre alimentos em 1 tap como Shazam para comida',
    icon: '⚡',
    category: 'tracking',
    isPremium: false
  },
  {
    id: 'mood-color',
    name: 'Mood-Color Wheel',
    description: 'Registre humor com emoji + tonalidade HSL personalizada',
    icon: '🎨',
    category: 'wellness',
    isPremium: false
  },
  {
    id: 'selfie-timelapse',
    name: 'Selfie Timelapse',
    description: 'GIF automático de 3s mostrando sua transformação',
    icon: '📸',
    category: 'tracking',
    isPremium: true
  },
  {
    id: 'battle-royale',
    name: 'Desafios Battle-Royale',
    description: 'Competições com 30 pessoas, prêmios em stablecoin',
    icon: '⚔️',
    category: 'gamification',
    isPremium: true
  },
  {
    id: 'ai-podcast',
    name: 'Podcast IA Personalizado',
    description: 'Episódios de 3 min narrados por IA sobre seus progressos',
    icon: '🎧',
    category: 'ai',
    isPremium: true
  },
  {
    id: 'smart-water',
    name: 'SmartWater Bottle',
    description: 'Garrafa bluetooth que registra cada gole automaticamente',
    icon: '💧',
    category: 'hardware',
    isPremium: true
  },
  {
    id: 'ovulation-calendar',
    name: 'Calendário Ovulação',
    description: 'Ajuste calórico automático baseado no ciclo menstrual',
    icon: '🌸',
    category: 'wellness',
    isPremium: false
  },
  {
    id: 'whatsapp-reminders',
    name: 'Lembretes WhatsApp',
    description: 'Notificações via WhatsApp Business com botões interativos',
    icon: '💬',
    category: 'tracking',
    isPremium: false
  },
  {
    id: 'label-scanner',
    name: 'Scanner de Rótulos',
    description: 'OCR que detecta ultraprocessados e alerta automaticamente',
    icon: '🔍',
    category: 'ai',
    isPremium: false
  },
  {
    id: 'group-buying',
    name: 'Compra Coletiva',
    description: 'Desconto de 15% em suplementos comprando em grupo',
    icon: '🛒',
    category: 'social',
    isPremium: false
  },
  {
    id: 'sound-healing',
    name: 'Cura Sonora 432Hz',
    description: 'Timer com frequência 432Hz para reduzir compulsão noturna',
    icon: '🎵',
    category: 'wellness',
    isPremium: true
  },
  {
    id: 'stake-challenges',
    name: 'Desafios com Stake',
    description: 'Aposte em você mesmo - só os top 50% mantêm o investimento',
    icon: '💰',
    category: 'gamification',
    isPremium: true
  }
];

// Bot moderador do chat
export interface BotCommand {
  command: string;
  description: string;
  response: string;
  action?: 'schedule_consultation' | 'macro_lookup' | 'slow_mode' | 'help';
}

export const BOT_COMMANDS: BotCommand[] = [
  {
    command: '/macro',
    description: 'Buscar informações nutricionais',
    response: 'Digite o alimento após /macro (ex: /macro pizza)',
    action: 'macro_lookup'
  },
  {
    command: '/help',
    description: 'Lista de comandos disponíveis',
    response: 'Comandos disponíveis: /macro [alimento], /consulta, /progresso',
    action: 'help'
  },
  {
    command: '/consulta',
    description: 'Agendar micro-consulta de 15 min',
    response: 'Agendando sua consulta de 15 minutos via Zoom...',
    action: 'schedule_consultation'
  }
];

// Estrutura Firestore
export interface FirestoreUser extends Omit<User, 'createdAt' | 'lastActive' | 'badges'> {
  createdAt: any; // Firestore Timestamp
  lastActive: any; // Firestore Timestamp
  badges: Record<BadgeType, any>; // Firestore Timestamp
}

export interface FirestoreMoodEntry extends Omit<MoodEntry, 'timestamp'> {
  timestamp: any; // Firestore Timestamp
}