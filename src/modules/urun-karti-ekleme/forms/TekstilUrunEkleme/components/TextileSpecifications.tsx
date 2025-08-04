import React from 'react';
import { Shirt } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { fabricTypes, fitTypes, patterns, neckTypes, sleeveTypes, closureTypes, careInstructions } from '../data/specs';
import { getCategorySpecsConfig } from '../data/categorySpecsMap';

interface TextileSpecificationsProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

export default function TextileSpecifications({ formData, updateFormData }: TextileSpecificationsProps) {
  // 🎯 Get current category specs configuration
  const currentCategory = formData.subCategory1 || formData.mainCategory || '';
  const specsConfig = getCategorySpecsConfig(currentCategory);

  const handleCareInstructionToggle = (instruction: string) => {
    const current = formData.careInstructions;
    const updated = current.includes(instruction)
      ? current.filter(i => i !== instruction)
      : [...current, instruction];
    updateFormData('careInstructions', updated);
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Shirt className="mr-2" size={20} />
        Tekstil Özellikleri
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Kumaş Türü - Hep göster */}
        {specsConfig.fabricType && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {fabricTypes.emoji} {fabricTypes.name}
            </label>
            <select
              value={formData.fabricType}
              onChange={(e) => updateFormData('fabricType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Kumaş türü seçin</option>
              {fabricTypes.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )}

        {/* Kalıp Tipi - Hep göster */}
        {specsConfig.fitType && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {fitTypes.emoji} {fitTypes.name}
            </label>
            <select
              value={formData.fitType}
              onChange={(e) => updateFormData('fitType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Kalıp seçin</option>
              {fitTypes.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )}

        {/* Desen - Hep göster */}
        {specsConfig.pattern && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {patterns.emoji} {patterns.name}
            </label>
            <select
              value={formData.pattern}
              onChange={(e) => updateFormData('pattern', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Desen seçin</option>
              {patterns.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )}

        {/* Yaka Tipi - Sadece üst giyim */}
        {specsConfig.neckType && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {neckTypes.emoji} {neckTypes.name}
            </label>
            <select
              value={formData.neckType}
              onChange={(e) => updateFormData('neckType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Yaka tipi seçin</option>
              {neckTypes.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )}

        {/* Kol Tipi - Sadece kol olan kıyafetler */}
        {specsConfig.sleeveType && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {sleeveTypes.emoji} {sleeveTypes.name}
            </label>
            <select
              value={formData.sleeveType}
              onChange={(e) => updateFormData('sleeveType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Kol tipi seçin</option>
              {sleeveTypes.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )}

        {/* Kapama Tipi - Kapanması olan kıyafetler */}
        {specsConfig.closureType && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {closureTypes.emoji} {closureTypes.name}
            </label>
            <select
              value={formData.closureType}
              onChange={(e) => updateFormData('closureType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Kapama tipi seçin</option>
              {closureTypes.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Bakım Talimatları */}
      <div>
        <h4 className="font-medium text-gray-700 mb-3">Bakım Talimatları</h4>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {careInstructions.options.map((instruction) => (
            <button
              key={instruction}
              onClick={() => handleCareInstructionToggle(instruction)}
              className={`p-3 rounded-lg border transition-all text-left ${
                formData.careInstructions.includes(instruction)
                  ? 'border-green-500 bg-green-50 text-green-700 relative'
                  : 'border-gray-200 hover:border-green-300 text-gray-700'
              }`}
            >
              {formData.careInstructions.includes(instruction) && (
                <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  ⭐
                </div>
              )}
              <div className="text-sm font-medium">{instruction}</div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}