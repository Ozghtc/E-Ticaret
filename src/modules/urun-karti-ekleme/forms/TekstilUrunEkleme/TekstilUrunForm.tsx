import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Check, CheckCircle, X, AlertTriangle, XCircle } from 'lucide-react';
import { useFormData } from './hooks/useFormData';
import { useVariants } from './hooks/useVariants';
import { validateStep, isStepValid } from './utils/validation';
import { getStepTitle } from './utils/helpers';
import FormHeader from './components/FormHeader';
import UrunBilgileriStep from './components/UrunBilgileriStep';
import VaryantFiyatStep from './components/VaryantFiyatStep';
import UrunGorselleriStep from './components/UrunGorselleriStep';
import OnizlemeKaydetStep from './components/OnizlemeKaydetStep';

function TekstilUrunForm() {
  const navigate = useNavigate();
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastType, setToastType] = useState<'success' | 'error' | 'warning'>('success');
  
  const {
    formData,
    currentStep,
    updateFormData,
    updateMultipleFields,
    nextStep,
    prevStep,
    resetForm,
    goToStep
  } = useFormData();
  
  // Varyant hook'unu ana form'da kullan (state paylaşımı için)
  const variantHook = useVariants();

  const totalSteps = 4; // 4 adımlı sistem

  // Toast notification sistemi
  const showToastNotification = (message: string, type: 'success' | 'error' | 'warning' = 'success') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
  };

  // Toast'ı otomatik kapat
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 4000); // 4 saniye sonra kaybol
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const closeToast = () => {
    setShowToast(false);
  };

  const handleNext = () => {
    const errors = validateStep(currentStep, formData);
    if (errors.length > 0) {
      const errorMessages = errors.map(e => e.message).join('\n• ');
      showToastNotification('⚠️ Eksik Alanlar:\n• ' + errorMessages, 'warning');
      return;
    }
    nextStep();
  };

  const handleSubmit = () => {
    // Form submission logic here
    showToastNotification('🎉 Ürün başarıyla eklendi! Ürün Yönetimi sayfasına yönlendiriliyorsunuz...', 'success');
    
    // 2 saniye sonra yönlendir
    setTimeout(() => {
      resetForm();
      navigate('/admin/urun-yonetimi');
    }, 2000);
  };

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <UrunBilgileriStep
            formData={formData}
            updateFormData={updateFormData}
            updateMultipleFields={updateMultipleFields}
          />
        );
      case 2:
        return (
          <VaryantFiyatStep
            formData={formData}
            updateFormData={updateFormData}
            variantHook={variantHook}
          />
        );
      case 3:
        return (
          <UrunGorselleriStep
            formData={formData}
            variants={variantHook.variants}
            updateFormData={updateFormData}
          />
        );
      case 4:
        return (
          <OnizlemeKaydetStep
            formData={formData}
            variants={variantHook.variants}
            updateFormData={updateFormData}
          />
        );
      default:
        return null;
    }
  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Toast Notification */}
      {showToast && (
        <div className={`fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg flex items-start space-x-3 max-w-md ${
          toastType === 'success'
            ? 'bg-green-500 text-white'
            : toastType === 'error'
            ? 'bg-red-500 text-white'
            : 'bg-orange-500 text-white'
        } animate-pulse`}>
          {toastType === 'success' ? (
            <CheckCircle size={24} className="flex-shrink-0 mt-0.5" />
          ) : toastType === 'error' ? (
            <XCircle size={24} className="flex-shrink-0 mt-0.5" />
          ) : (
            <AlertTriangle size={24} className="flex-shrink-0 mt-0.5" />
          )}
          <div className="flex-1">
            <div className="font-medium whitespace-pre-line">{toastMessage}</div>
          </div>
          <button
            onClick={closeToast}
            className="text-white hover:text-gray-200 flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>
      )}
      
      <FormHeader currentStep={currentStep} totalSteps={totalSteps} />

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          {/* Step Title */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {getStepTitle(currentStep)}
            </h2>
            <p className="text-gray-600">
              Adım {currentStep} / {totalSteps}
            </p>
          </div>

          {/* Current Step Content */}
          {renderCurrentStep()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              <ArrowLeft size={16} />
              <span>Geri</span>
            </button>

            {currentStep < totalSteps ? (
              <button
                onClick={handleNext}
                disabled={!isStepValid(currentStep, formData)}
                className={`px-6 py-3 rounded-lg font-medium flex items-center space-x-2 ${
                  isStepValid(currentStep, formData)
                    ? 'bg-pink-600 text-white hover:bg-pink-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                <span>İleri</span>
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 flex items-center space-x-2"
              >
                <Check size={16} />
                <span>Ürünü Kaydet</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TekstilUrunForm;