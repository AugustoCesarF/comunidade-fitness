'use client';

import { useState } from 'react';
import { OnboardingStep, OnboardingData } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Progress } from '@/components/ui/progress';
import { 
  Camera, 
  Target, 
  AlertCircle, 
  Music, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle,
  Scale,
  Clock,
  Utensils,
  Headphones
} from 'lucide-react';

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    step: 1,
    title: "Selfie e Peso Atual",
    description: "Vamos registrar seu ponto de partida com uma foto e seu peso atual",
    component: 'selfie-weight',
    isCompleted: false
  },
  {
    step: 2,
    title: "Sua Meta Principal",
    description: "Defina sua meta em uma frase clara e o tempo estimado",
    component: 'goal-phrase',
    isCompleted: false
  },
  {
    step: 3,
    title: "Restrições e Alergias",
    description: "Nos conte sobre suas restrições alimentares para personalizar seu plano",
    component: 'restrictions-quiz',
    isCompleted: false
  },
  {
    step: 4,
    title: "Preferência Musical",
    description: "Escolha seu estilo musical favorito para otimizar o BPM dos seus treinos",
    component: 'music-preference',
    isCompleted: false
  }
];

const MUSIC_GENRES = [
  { name: 'Pop/Dance', bpm: 128, description: 'Energético e motivacional' },
  { name: 'Rock/Metal', bpm: 140, description: 'Intenso e poderoso' },
  { name: 'Hip Hop', bpm: 95, description: 'Ritmo forte e constante' },
  { name: 'Eletrônica', bpm: 130, description: 'Batidas eletrônicas' },
  { name: 'Reggaeton', bpm: 90, description: 'Ritmo latino envolvente' },
  { name: 'Funk', bpm: 100, description: 'Groove brasileiro' }
];

const COMMON_RESTRICTIONS = [
  'Glúten', 'Lactose', 'Açúcar refinado', 'Carne vermelha', 
  'Frutos do mar', 'Nozes', 'Soja', 'Ovos'
];

const COMMON_ALLERGIES = [
  'Amendoim', 'Castanhas', 'Leite', 'Ovos', 'Peixe', 
  'Crustáceos', 'Soja', 'Trigo', 'Gergelim'
];

export default function OnboardingPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [onboardingData, setOnboardingData] = useState<OnboardingData>({});
  const [steps, setSteps] = useState(ONBOARDING_STEPS);

  const currentStepData = steps.find(step => step.step === currentStep);
  const progress = (currentStep / steps.length) * 100;

  const updateData = (newData: Partial<OnboardingData>) => {
    setOnboardingData(prev => ({ ...prev, ...newData }));
  };

  const completeStep = () => {
    setSteps(prev => prev.map(step => 
      step.step === currentStep ? { ...step, isCompleted: true } : step
    ));
  };

  const nextStep = () => {
    completeStep();
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Finalizar onboarding
      console.log('Onboarding completo:', onboardingData);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return onboardingData.currentWeight && onboardingData.currentWeight > 0;
      case 2:
        return onboardingData.goalPhrase && onboardingData.goalPhrase.length > 0 && onboardingData.estimatedWeeks;
      case 3:
        return true; // Opcional
      case 4:
        return onboardingData.favoriteGenre;
      default:
        return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Bem-vindo ao FitCommunity! 🎉
          </h1>
          <p className="text-lg text-gray-600">
            Vamos personalizar sua jornada em 4 passos simples
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Passo {currentStep} de {steps.length}
            </span>
            <span className="text-sm text-gray-500">
              {Math.round(progress)}% completo
            </span>
          </div>
          <Progress value={progress} className="h-3" />
        </div>

        {/* Step Content */}
        <Card className="mb-8">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl flex items-center justify-center space-x-2">
              {currentStep === 1 && <Camera className="w-6 h-6 text-blue-600" />}
              {currentStep === 2 && <Target className="w-6 h-6 text-green-600" />}
              {currentStep === 3 && <AlertCircle className="w-6 h-6 text-orange-600" />}
              {currentStep === 4 && <Music className="w-6 h-6 text-purple-600" />}
              <span>{currentStepData?.title}</span>
            </CardTitle>
            <p className="text-gray-600">{currentStepData?.description}</p>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Passo 1: Selfie e Peso */}
            {currentStep === 1 && (
              <div className="space-y-6">
                {/* Selfie Upload */}
                <div className="text-center">
                  <div className="w-32 h-32 mx-auto mb-4 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-gray-50 hover:bg-gray-100 cursor-pointer transition-colors">
                    {onboardingData.selfieUrl ? (
                      <img 
                        src={onboardingData.selfieUrl} 
                        alt="Selfie" 
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="text-center">
                        <Camera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                        <span className="text-sm text-gray-500">Adicionar Foto</span>
                      </div>
                    )}
                  </div>
                  <Button variant="outline" className="mb-6">
                    <Camera className="w-4 h-4 mr-2" />
                    Tirar Selfie
                  </Button>
                </div>

                {/* Peso Atual */}
                <div className="max-w-md mx-auto">
                  <Label htmlFor="weight" className="flex items-center space-x-2 mb-2">
                    <Scale className="w-4 h-4" />
                    <span>Peso Atual (kg)</span>
                  </Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="Ex: 75.5"
                    value={onboardingData.currentWeight || ''}
                    onChange={(e) => updateData({ currentWeight: parseFloat(e.target.value) })}
                    className="text-center text-lg"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Seja honesto - isso nos ajuda a criar o melhor plano para você
                  </p>
                </div>
              </div>
            )}

            {/* Passo 2: Meta e Tempo */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div>
                  <Label htmlFor="goal" className="flex items-center space-x-2 mb-2">
                    <Target className="w-4 h-4" />
                    <span>Complete a frase: "Quero __________ em ___ semanas"</span>
                  </Label>
                  <Textarea
                    id="goal"
                    placeholder="Ex: Quero perder 10kg e me sentir mais confiante em 12 semanas"
                    value={onboardingData.goalPhrase || ''}
                    onChange={(e) => updateData({ goalPhrase: e.target.value })}
                    className="min-h-[100px]"
                    maxLength={80}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    {onboardingData.goalPhrase?.length || 0}/80 caracteres
                  </p>
                </div>

                <div className="max-w-md mx-auto">
                  <Label htmlFor="weeks" className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4" />
                    <span>Tempo estimado (semanas)</span>
                  </Label>
                  <Input
                    id="weeks"
                    type="number"
                    placeholder="Ex: 12"
                    value={onboardingData.estimatedWeeks || ''}
                    onChange={(e) => updateData({ estimatedWeeks: parseInt(e.target.value) })}
                    className="text-center text-lg"
                    min="1"
                    max="52"
                  />
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Seja realista - metas alcançáveis geram mais motivação
                  </p>
                </div>
              </div>
            )}

            {/* Passo 3: Restrições */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div>
                  <Label className="flex items-center space-x-2 mb-4">
                    <Utensils className="w-4 h-4" />
                    <span>Restrições Alimentares (opcional)</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {COMMON_RESTRICTIONS.map((restriction) => (
                      <div key={restriction} className="flex items-center space-x-2">
                        <Checkbox
                          id={restriction}
                          checked={onboardingData.restrictions?.includes(restriction) || false}
                          onCheckedChange={(checked) => {
                            const current = onboardingData.restrictions || [];
                            if (checked) {
                              updateData({ restrictions: [...current, restriction] });
                            } else {
                              updateData({ restrictions: current.filter(r => r !== restriction) });
                            }
                          }}
                        />
                        <Label htmlFor={restriction} className="text-sm">{restriction}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label className="flex items-center space-x-2 mb-4">
                    <AlertCircle className="w-4 h-4" />
                    <span>Alergias Alimentares (opcional)</span>
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    {COMMON_ALLERGIES.map((allergy) => (
                      <div key={allergy} className="flex items-center space-x-2">
                        <Checkbox
                          id={allergy}
                          checked={onboardingData.allergies?.includes(allergy) || false}
                          onCheckedChange={(checked) => {
                            const current = onboardingData.allergies || [];
                            if (checked) {
                              updateData({ allergies: [...current, allergy] });
                            } else {
                              updateData({ allergies: current.filter(a => a !== allergy) });
                            }
                          }}
                        />
                        <Label htmlFor={allergy} className="text-sm">{allergy}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-sm text-blue-800">
                    💡 <strong>Dica:</strong> Essas informações nos ajudam a excluir automaticamente 
                    alimentos que você não pode consumir dos seus planos alimentares.
                  </p>
                </div>
              </div>
            )}

            {/* Passo 4: Música */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div>
                  <Label className="flex items-center space-x-2 mb-4">
                    <Headphones className="w-4 h-4" />
                    <span>Escolha seu estilo musical favorito para treinos</span>
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {MUSIC_GENRES.map((genre) => (
                      <div
                        key={genre.name}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                          onboardingData.favoriteGenre === genre.name
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                        onClick={() => updateData({ 
                          favoriteGenre: genre.name, 
                          targetBPM: genre.bpm 
                        })}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{genre.name}</h3>
                          <span className="text-sm text-gray-500">{genre.bpm} BPM</span>
                        </div>
                        <p className="text-sm text-gray-600">{genre.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-800">
                    🎵 <strong>Por que isso importa?</strong> Treinar com música no BPM ideal 
                    sincroniza seu ritmo cardíaco e pode aumentar sua performance em até 15%!
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={prevStep}
            disabled={currentStep === 1}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Anterior</span>
          </Button>

          <div className="flex items-center space-x-2">
            {steps.map((step) => (
              <div
                key={step.step}
                className={`w-3 h-3 rounded-full ${
                  step.isCompleted
                    ? 'bg-green-500'
                    : step.step === currentStep
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={nextStep}
            disabled={!canProceed()}
            className="flex items-center space-x-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
          >
            {currentStep === steps.length ? (
              <>
                <CheckCircle className="w-4 h-4" />
                <span>Finalizar</span>
              </>
            ) : (
              <>
                <span>Próximo</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>

        {/* Step Indicators */}
        <div className="mt-8 grid grid-cols-4 gap-2">
          {steps.map((step) => (
            <div
              key={step.step}
              className={`text-center p-2 rounded-lg text-xs ${
                step.isCompleted
                  ? 'bg-green-100 text-green-800'
                  : step.step === currentStep
                  ? 'bg-blue-100 text-blue-800'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              <div className="font-semibold">{step.step}</div>
              <div className="truncate">{step.title}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}