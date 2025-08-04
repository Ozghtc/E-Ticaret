import React from 'react';
import { Globe } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { genders, ageGroups, seasons } from '../data/specs';

interface BasicPropertiesProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

export default function BasicProperties({ formData, updateFormData }: BasicPropertiesProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Globe className="mr-2" size={20} />
        Temel Özellikler
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cinsiyet
          </label>
          <select
            value={formData.gender}
            onChange={(e) => updateFormData('gender', e.target.value)}
            className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
              formData.gender ? 'relative' : ''
            }`}
          >
            <option value="">Cinsiyet seçin</option>
            {genders.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
          {formData.gender && (
            <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transform translate-x-2 -translate-y-2">
              ⭐
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Yaş Grubu
          </label>
          <select
            value={formData.ageGroup}
            onChange={(e) => updateFormData('ageGroup', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">Yaş grubu seçin</option>
            {ageGroups.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Sezon
          </label>
          <select
            value={formData.season}
            onChange={(e) => updateFormData('season', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="">Sezon seçin</option>
            {seasons.options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Menşei (Opsiyonel)
          </label>
          <input
            type="text"
            value={formData.origin}
            onChange={(e) => updateFormData('origin', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Örn: Türkiye, İtalya, Çin"
          />
        </div>
      </div>
    </div>
  );
}