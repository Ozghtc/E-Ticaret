import React from 'react';
import { Tag } from 'lucide-react';
import { FormData } from '../hooks/useFormData';

interface BasicProductInfoProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

export default function BasicProductInfo({ formData, updateFormData }: BasicProductInfoProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Tag className="mr-2" size={20} />
        Temel Ürün Bilgileri
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ürün Adı <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => updateFormData('name', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Örn: Zarif Şifon Bluz"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Marka (Opsiyonel)
          </label>
          <input
            type="text"
            value={formData.brand}
            onChange={(e) => updateFormData('brand', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Örn: Zara, H&M, Mango"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Model Kodu (Opsiyonel)
          </label>
          <input
            type="text"
            value={formData.model}
            onChange={(e) => updateFormData('model', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Örn: ZR2024-BLZ-001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Barkod (Opsiyonel)
          </label>
          <input
            type="text"
            value={formData.barcode}
            onChange={(e) => updateFormData('barcode', e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Örn: 8690123456789"
          />
        </div>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Ürün Açıklaması <span className="text-gray-400 text-xs">(Opsiyonel)</span>
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => updateFormData('description', e.target.value)}
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          placeholder="Zarif tasarım, kaliteli kumaş. El işçiliği detaylarla süslenmiş özel parça..."
        />
      </div>
    </div>
  );
}