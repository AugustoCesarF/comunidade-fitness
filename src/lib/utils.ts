import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { User, UserLevel, USER_LEVELS, BadgeType, AVAILABLE_BADGES } from './types';

// Função essencial para shadcn/ui - combina classes CSS
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Utilitários para XP e níveis
export function getUserLevel(xp: number): UserLevel {
  return USER_LEVELS.find(level => xp >= level.minXP && xp <= level.maxXP) || USER_LEVELS[0];
}

export function getXPForNextLevel(xp: number): number {
  const currentLevel = getUserLevel(xp);
  return currentLevel.maxXP === Infinity ? 0 : currentLevel.maxXP - xp;
}

export function getProgressToNextLevel(xp: number): number {
  const currentLevel = getUserLevel(xp);
  if (currentLevel.maxXP === Infinity) return 100;
  
  const progress = ((xp - currentLevel.minXP) / (currentLevel.maxXP - currentLevel.minXP)) * 100;
  return Math.min(100, Math.max(0, progress));
}

// Utilitários para badges
export function checkBadgeEligibility(user: User, action: string, data?: any): BadgeType[] {
  const newBadges: BadgeType[] = [];
  
  switch (action) {
    case 'weight_logged_7_days':
      if (!user.badges.ferro && user.streakDays >= 7) {
        newBadges.push('ferro');
      }
      break;
      
    case 'weight_lost_2_percent':
      if (!user.badges.agua_pescoco && data?.percentLost >= 2) {
        newBadges.push('agua_pescoco');
      }
      break;
      
    case 'chat_tips_posted':
      if (!user.badges.helper && data?.tipsCount >= 3) {
        newBadges.push('helper');
      }
      break;
      
    case 'workouts_completed':
      if (!user.badges.grao_areia && data?.workoutCount >= 30) {
        newBadges.push('grao_areia');
      }
      if (!user.badges.warrior && data?.workoutCount >= 100) {
        newBadges.push('warrior');
      }
      break;
      
    case 'streak_30_days':
      if (!user.badges.disciplinado && user.streakDays >= 30) {
        newBadges.push('disciplinado');
      }
      break;
      
    case 'goal_achieved':
      if (!user.badges.transformer && data?.goalAchieved) {
        newBadges.push('transformer');
      }
      break;
      
    case 'xp_milestone':
      if (!user.badges.guru && user.xp >= 1000) {
        newBadges.push('guru');
      }
      if (!user.badges.legend && user.xp >= 5000) {
        newBadges.push('legend');
      }
      break;
  }
  
  return newBadges;
}

export function awardBadges(user: User, badges: BadgeType[]): { user: User; totalXP: number } {
  let totalXP = 0;
  const updatedUser = { ...user };
  
  badges.forEach(badgeId => {
    if (!updatedUser.badges[badgeId]) {
      updatedUser.badges[badgeId] = new Date();
      totalXP += AVAILABLE_BADGES[badgeId].xpReward;
    }
  });
  
  updatedUser.xp += totalXP;
  
  return { user: updatedUser, totalXP };
}

// Utilitários para cálculos de saúde
export function calculateBMI(weight: number, height: number): number {
  return weight / ((height / 100) ** 2);
}

export function calculateCalorieGoal(
  weight: number,
  height: number,
  age: number,
  gender: 'male' | 'female',
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'very_active',
  goal: 'lose' | 'maintain' | 'gain'
): number {
  // Fórmula Mifflin-St Jeor
  let bmr: number;
  if (gender === 'male') {
    bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
  } else {
    bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
  }
  
  // Multiplicadores de atividade
  const activityMultipliers = {
    sedentary: 1.2,
    light: 1.375,
    moderate: 1.55,
    active: 1.725,
    very_active: 1.9
  };
  
  const tdee = bmr * activityMultipliers[activityLevel];
  
  // Ajuste para objetivo
  switch (goal) {
    case 'lose':
      return Math.round(tdee - 500); // déficit de 500 cal
    case 'gain':
      return Math.round(tdee + 300); // superávit de 300 cal
    default:
      return Math.round(tdee);
  }
}

export function calculateMacros(calories: number, dietStyle: User['dietStyle']) {
  const macroRatios = {
    keto: { protein: 0.25, carbs: 0.05, fat: 0.70 },
    'low-carb': { protein: 0.30, carbs: 0.20, fat: 0.50 },
    vegan: { protein: 0.15, carbs: 0.60, fat: 0.25 },
    carnivore: { protein: 0.35, carbs: 0.05, fat: 0.60 },
    mediterranean: { protein: 0.20, carbs: 0.45, fat: 0.35 }
  };
  
  const ratios = macroRatios[dietStyle];
  
  return {
    protein: Math.round((calories * ratios.protein) / 4), // 4 cal/g
    carbs: Math.round((calories * ratios.carbs) / 4), // 4 cal/g
    fat: Math.round((calories * ratios.fat) / 9) // 9 cal/g
  };
}

// Utilitários para formatação
export function formatWeight(weight: number): string {
  return `${weight.toFixed(1)} kg`;
}

export function formatXP(xp: number): string {
  if (xp >= 1000) {
    return `${(xp / 1000).toFixed(1)}k XP`;
  }
  return `${xp} XP`;
}

export function formatStreak(days: number): string {
  if (days === 1) return '1 dia';
  return `${days} dias`;
}

export function getTimeUntilNextTip(): string {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(6, 30, 0, 0);
  
  const diff = tomorrow.getTime() - now.getTime();
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  
  return `${hours}h ${minutes}m`;
}

// Utilitários para datas
export function isToday(date: Date): boolean {
  const today = new Date();
  return date.toDateString() === today.toDateString();
}

export function getDaysDifference(date1: Date, date2: Date): number {
  const diffTime = Math.abs(date2.getTime() - date1.getTime());
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getWeekProgress(startDate: Date): number {
  const now = new Date();
  const daysPassed = getDaysDifference(startDate, now);
  return Math.min(100, (daysPassed / 7) * 100);
}

// Validações
export function validateGoalPhrase(phrase: string): boolean {
  return phrase.length > 0 && phrase.length <= 80;
}

export function validateWeight(weight: number): boolean {
  return weight > 0 && weight < 500; // kg
}

export function validateWeeks(weeks: number): boolean {
  return weeks > 0 && weeks <= 104; // máximo 2 anos
}