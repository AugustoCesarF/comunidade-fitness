'use client';

import { useState } from 'react';
import { WorkoutPlan, WorkoutExercise } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  Play, 
  Pause, 
  SkipForward, 
  RotateCcw, 
  Timer, 
  Dumbbell,
  Home,
  Zap,
  Target,
  Clock,
  Flame,
  Star,
  Shuffle,
  Volume2,
  Heart
} from 'lucide-react';

// Mock data para demonstração
const mockWorkoutPlans: WorkoutPlan[] = [
  {
    id: '1',
    name: 'HIIT Queima Gordura',
    type: 'HIIT 4-min',
    freqPerWeek: 5,
    difficulty: 3,
    focusAreas: ['Cardio', 'Queima de Gordura'],
    estimatedDuration: 20,
    musicBPM: 140,
    exercises: [
      {
        id: '1',
        name: 'Burpees',
        videoUrl: 'https://example.com/burpees.mp4',
        sets: 4,
        reps: '20 seg',
        restSeconds: 10,
        muscleGroups: ['Corpo todo'],
        equipment: ['Peso corporal'],
        difficulty: 4
      },
      {
        id: '2',
        name: 'Mountain Climbers',
        videoUrl: 'https://example.com/mountain-climbers.mp4',
        sets: 4,
        reps: '20 seg',
        restSeconds: 10,
        muscleGroups: ['Core', 'Cardio'],
        equipment: ['Peso corporal'],
        difficulty: 3
      },
      {
        id: '3',
        name: 'Jumping Jacks',
        videoUrl: 'https://example.com/jumping-jacks.mp4',
        sets: 4,
        reps: '20 seg',
        restSeconds: 10,
        muscleGroups: ['Cardio', 'Pernas'],
        equipment: ['Peso corporal'],
        difficulty: 2
      },
      {
        id: '4',
        name: 'High Knees',
        videoUrl: 'https://example.com/high-knees.mp4',
        sets: 4,
        reps: '20 seg',
        restSeconds: 10,
        muscleGroups: ['Cardio', 'Pernas'],
        equipment: ['Peso corporal'],
        difficulty: 3
      }
    ]
  },
  {
    id: '2',
    name: 'Força em Casa',
    type: 'Home',
    freqPerWeek: 3,
    difficulty: 2,
    focusAreas: ['Força', 'Tonificação'],
    estimatedDuration: 45,
    musicBPM: 120,
    exercises: [
      {
        id: '5',
        name: 'Flexões',
        videoUrl: 'https://example.com/push-ups.mp4',
        sets: 3,
        reps: '12-15',
        restSeconds: 60,
        muscleGroups: ['Peito', 'Tríceps', 'Core'],
        equipment: ['Peso corporal'],
        difficulty: 2
      },
      {
        id: '6',
        name: 'Agachamentos',
        videoUrl: 'https://example.com/squats.mp4',
        sets: 3,
        reps: '15-20',
        restSeconds: 60,
        muscleGroups: ['Quadríceps', 'Glúteos'],
        equipment: ['Peso corporal'],
        difficulty: 2
      }
    ]
  }
];

const WORKOUT_CATEGORIES = [
  { name: 'Treino em Casa', icon: Home, count: '120+ exercícios', color: 'from-green-500 to-emerald-500' },
  { name: 'Academia', icon: Dumbbell, count: '300+ exercícios', color: 'from-blue-500 to-indigo-500' },
  { name: 'HIIT 4 min', icon: Zap, count: '50+ exercícios', color: 'from-orange-500 to-red-500' }
];

export default function WorkoutsPage() {
  const [selectedPlan, setSelectedPlan] = useState<WorkoutPlan | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentExercise, setCurrentExercise] = useState(0);
  const [currentSet, setCurrentSet] = useState(1);
  const [timeRemaining, setTimeRemaining] = useState(20); // segundos
  const [isResting, setIsResting] = useState(false);

  const startWorkout = (plan: WorkoutPlan) => {
    setSelectedPlan(plan);
    setCurrentExercise(0);
    setCurrentSet(1);
    setIsResting(false);
    setTimeRemaining(20);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextExercise = () => {
    if (!selectedPlan) return;
    
    if (currentExercise < selectedPlan.exercises.length - 1) {
      setCurrentExercise(currentExercise + 1);
      setCurrentSet(1);
      setTimeRemaining(20);
      setIsResting(false);
    }
  };

  const resetWorkout = () => {
    setCurrentExercise(0);
    setCurrentSet(1);
    setTimeRemaining(20);
    setIsResting(false);
    setIsPlaying(false);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 2) return 'text-green-600 bg-green-100';
    if (difficulty <= 3) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getDifficultyText = (difficulty: number) => {
    if (difficulty <= 2) return 'Fácil';
    if (difficulty <= 3) return 'Médio';
    return 'Difícil';
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (selectedPlan) {
    const currentExerciseData = selectedPlan.exercises[currentExercise];
    const progress = ((currentExercise + 1) / selectedPlan.exercises.length) * 100;

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
        {/* Workout Player */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <div className="max-w-4xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">{selectedPlan.name}</h1>
              <p className="text-blue-100">
                Exercício {currentExercise + 1} de {selectedPlan.exercises.length}
              </p>
              <Progress value={progress} className="mt-4 h-2" />
            </div>

            {/* Video Player Placeholder */}
            <div className="bg-black/20 rounded-2xl aspect-video mb-8 flex items-center justify-center">
              <div className="text-center">
                <Play className="w-16 h-16 mx-auto mb-4 text-white/80" />
                <p className="text-white/80">Vídeo: {currentExerciseData.name}</p>
              </div>
            </div>

            {/* Exercise Info */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold mb-2">{currentExerciseData.name}</h2>
              <div className="flex items-center justify-center space-x-6 text-blue-100">
                <div className="flex items-center space-x-1">
                  <Target className="w-4 h-4" />
                  <span>Série {currentSet}/{currentExerciseData.sets}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Timer className="w-4 h-4" />
                  <span>{currentExerciseData.reps}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{currentExerciseData.restSeconds}s descanso</span>
                </div>
              </div>
            </div>

            {/* Timer */}
            <div className="text-center mb-8">
              <div className="text-6xl font-bold mb-2">
                {formatTime(timeRemaining)}
              </div>
              <p className="text-blue-100">
                {isResting ? 'Descansando...' : 'Exercitando!'}
              </p>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="secondary"
                size="lg"
                onClick={resetWorkout}
                className="bg-white/20 hover:bg-white/30 text-white"
              >
                <RotateCcw className="w-5 h-5" />
              </Button>
              
              <Button
                size="lg"
                onClick={togglePlayPause}
                className="bg-white text-blue-600 hover:bg-blue-50 w-16 h-16 rounded-full"
              >
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </Button>
              
              <Button
                variant="secondary"
                size="lg"
                onClick={nextExercise}
                className="bg-white/20 hover:bg-white/30 text-white"
                disabled={currentExercise >= selectedPlan.exercises.length - 1}
              >
                <SkipForward className="w-5 h-5" />
              </Button>
            </div>

            {/* Music Info */}
            <div className="flex items-center justify-center space-x-2 mt-6 text-blue-100">
              <Volume2 className="w-4 h-4" />
              <span>Tocando playlist {selectedPlan.musicBPM} BPM</span>
            </div>
          </div>
        </div>

        {/* Exercise List */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-6">Exercícios do Treino</h3>
          <div className="space-y-4">
            {selectedPlan.exercises.map((exercise, index) => (
              <Card 
                key={exercise.id} 
                className={`cursor-pointer transition-all ${
                  index === currentExercise ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:shadow-md'
                }`}
                onClick={() => setCurrentExercise(index)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        index === currentExercise ? 'bg-blue-600 text-white' : 'bg-gray-100'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <h4 className="font-semibold">{exercise.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <span>{exercise.sets} séries</span>
                          <span>{exercise.reps} reps</span>
                          <span>{exercise.restSeconds}s descanso</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={getDifficultyColor(exercise.difficulty)}>
                      {getDifficultyText(exercise.difficulty)}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button 
              variant="outline" 
              onClick={() => setSelectedPlan(null)}
              className="mr-4"
            >
              Voltar aos Treinos
            </Button>
            <Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
              <Heart className="w-4 h-4 mr-2" />
              Favoritar Treino
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Seus Treinos 💪
            </h1>
            <p className="text-xl text-gray-600">
              Biblioteca com 800+ exercícios e planos personalizados
            </p>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Treino do Dia */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-2xl">
              <Play className="w-6 h-6" />
              <span>Treino de Hoje</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold mb-2">{mockWorkoutPlans[0].name}</h3>
                <div className="flex items-center space-x-4 text-blue-100 mb-4">
                  <div className="flex items-center space-x-1">
                    <Dumbbell className="w-4 h-4" />
                    <span>{mockWorkoutPlans[0].exercises.length} exercícios</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{mockWorkoutPlans[0].estimatedDuration} minutos</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Flame className="w-4 h-4" />
                    <span>Nível {getDifficultyText(mockWorkoutPlans[0].difficulty)}</span>
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button 
                    onClick={() => startWorkout(mockWorkoutPlans[0])}
                    className="bg-white text-blue-600 hover:bg-blue-50"
                  >
                    <Play className="w-4 h-4 mr-2" />
                    Iniciar Treino
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-white text-white hover:bg-white/10"
                  >
                    Ver Detalhes
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="text-center">
                  <div className="text-4xl mb-2">🔥</div>
                  <p className="text-blue-100">Queime até 300 calorias</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Categorias de Treino */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Categorias</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WORKOUT_CATEGORIES.map((category) => (
              <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
                  <p className="text-gray-600">{category.count}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Planos de Treino */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Planos Recomendados</h2>
            <Button variant="outline">
              <Shuffle className="w-4 h-4 mr-2" />
              Gerar Novo Plano
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {mockWorkoutPlans.map((plan) => (
              <Card key={plan.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <Badge className={getDifficultyColor(plan.difficulty)}>
                      {getDifficultyText(plan.difficulty)}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <div className="flex items-center space-x-1">
                        <Dumbbell className="w-4 h-4" />
                        <span>{plan.exercises.length} exercícios</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-4 h-4" />
                        <span>{plan.estimatedDuration} min</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Target className="w-4 h-4" />
                        <span>{plan.freqPerWeek}x/semana</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {plan.focusAreas.map((area) => (
                        <Badge key={area} variant="secondary" className="text-xs">
                          {area}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <Button 
                        onClick={() => startWorkout(plan)}
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        Iniciar
                      </Button>
                      <Button variant="outline" size="sm">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center">
            <CardContent className="p-6">
              <Flame className="w-8 h-8 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">847</div>
              <div className="text-gray-600 text-sm">Calorias queimadas hoje</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Dumbbell className="w-8 h-8 mx-auto mb-2 text-blue-500" />
              <div className="text-2xl font-bold">23</div>
              <div className="text-gray-600 text-sm">Treinos este mês</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Clock className="w-8 h-8 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">12h</div>
              <div className="text-gray-600 text-sm">Tempo total treinado</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-6">
              <Star className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">4.8</div>
              <div className="text-gray-600 text-sm">Avaliação média</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}