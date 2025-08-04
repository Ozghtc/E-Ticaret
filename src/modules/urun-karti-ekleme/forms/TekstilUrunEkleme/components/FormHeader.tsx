// 📋 Form Header Component
import React from 'react';
import { ArrowLeft, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getStepTitle, getStepIcon } from '../utils/helpers';

interface FormHeaderProps {
  currentStep: number;
  totalSteps: number;
}

export default function FormHeader({ currentStep, totalSteps }: FormHeaderProps) {
  const navigate = useNavigate();

  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <>
      {/* Header */}
      <header className="bg-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin/urun-ekleme-yeni')}
                className="flex items-center text-white hover:text-pink-200 mr-6"
              >
                <ArrowLeft size={20} className="mr-2" />
                Kategori Seçimine Dön
              </button>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-bold text-white">Altıntassoft</span>
              </div>
            </div>
            <div className="text-white text-sm">
              Tekstil Ürün Ekleme Sistemi
            </div>
          </div>
        </div>
      </header>

      {/* Progress Section */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {/* Step Title */}
          <div className="text-center mb-6">
            <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package className="w-8 h-8 text-pink-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              👕 Tekstil Ürünü Ekle
            </h1>
            <p className="text-gray-600">
              {getStepIcon(currentStep)} {getStepTitle(currentStep)} - Adım {currentStep}/{totalSteps}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-gray-700">İlerleme</span>
              <span className="text-sm font-medium text-pink-600">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Step Indicators */}
          <div className="flex items-center justify-between">
            {Array.from({ length: totalSteps }, (_, index) => {
              const stepNumber = index + 1;
              const isCompleted = stepNumber < currentStep;
              const isCurrent = stepNumber === currentStep;
              
              return (
                <div key={stepNumber} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                    isCompleted 
                      ? 'bg-pink-600 border-pink-600 text-white' 
                      : isCurrent 
                      ? 'border-pink-600 text-pink-600 bg-white' 
                      : 'border-gray-300 text-gray-400 bg-white'
                  }`}>
                    {isCompleted ? (
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    ) : (
                      <span className="text-sm font-medium">{stepNumber}</span>
                    )}
                  </div>
                  {stepNumber < totalSteps && (
                    <div className={`w-12 h-1 mx-2 ${
                      isCompleted ? 'bg-pink-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}