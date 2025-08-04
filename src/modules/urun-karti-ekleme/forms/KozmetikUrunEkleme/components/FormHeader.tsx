// 💄 Kozmetik Form Header
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Heart } from 'lucide-react';
import { getStepIcon } from '../utils/helpers';

interface FormHeaderProps {
  currentStep: number;
  totalSteps: number;
}

function FormHeader({ currentStep, totalSteps }: FormHeaderProps) {
  const navigate = useNavigate();

  return (
    <header className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Sol Taraf */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => navigate('/admin/urun-ekleme-yeni')}
              className="flex items-center text-white hover:text-purple-200 transition-colors"
            >
              <ArrowLeft size={20} className="mr-2" />
              <span className="font-medium">Kategori Seçimine Dön</span>
            </button>
            
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full backdrop-blur-sm">
              <span className="font-bold text-white">Altıntassoft</span>
            </div>
          </div>

          {/* Orta - Form Başlığı */}
          <div className="flex items-center space-x-3">
            <div className="bg-white bg-opacity-20 p-3 rounded-full">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold text-white">
                🧴 Kozmetik & Bakım Ürünü Ekle
              </h1>
              <p className="text-purple-100 text-sm">
                {getStepIcon(currentStep)} Adım {currentStep}/{totalSteps}
              </p>
            </div>
          </div>

          {/* Sağ Taraf - Progress Bar */}
          <div className="flex items-center space-x-4">
            <div className="text-right">
              <div className="text-white font-medium text-sm">
                İlerleme
              </div>
              <div className="text-purple-100 text-xs">
                %{Math.round((currentStep / totalSteps) * 100)}
              </div>
            </div>
            <div className="w-32 h-3 bg-white bg-opacity-20 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-green-400 to-green-600 transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* Adım Göstergeleri */}
        <div className="flex justify-center space-x-8 pb-6">
          {Array.from({ length: totalSteps }, (_, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === currentStep;
            const isCompleted = stepNumber < currentStep;
            
            return (
              <div key={stepNumber} className="flex items-center">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold border-2 transition-all
                  ${isActive 
                    ? 'bg-white text-purple-600 border-white shadow-lg scale-110' 
                    : isCompleted
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-transparent text-white border-white border-opacity-50'
                  }
                `}>
                  {isCompleted ? '✓' : getStepIcon(stepNumber)}
                </div>
                {stepNumber < totalSteps && (
                  <div className={`w-8 h-1 mx-2 transition-all ${
                    isCompleted ? 'bg-green-500' : 'bg-white bg-opacity-30'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </header>
  );
}

export default FormHeader;