import React from 'react';
import { Ruler } from 'lucide-react';
import { FormData } from '../hooks/useFormData';

interface SizeSelectionProps {
  formData: FormData;
  sizeSystem: any;
  onSizeToggle: (size: string) => void;
}

export default function SizeSelection({ formData, sizeSystem, onSizeToggle }: SizeSelectionProps) {
  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <Ruler className="mr-2" size={20} />
          Beden Seçimi
        </h3>
        {sizeSystem && (
          <div className="bg-blue-100 px-3 py-1 rounded-full">
            <span className="text-sm font-medium text-blue-800">
              {sizeSystem.emoji} {sizeSystem.name}
            </span>
          </div>
        )}
      </div>

      {!formData.subCategory1 ? (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <p className="text-yellow-800 text-sm">
            Beden seçimi için önce kategori seçmelisiniz
          </p>
        </div>
      ) : !sizeSystem ? (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-800 text-sm">
            Bu kategori için beden sistemi bulunamadı
          </p>
        </div>
      ) : (
        <>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
            <p className="text-blue-800 text-sm">
              <strong>{sizeSystem.name}:</strong> {sizeSystem.description}
            </p>
          </div>
          
          <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
            {sizeSystem.sizes.map((size) => (
              <button
                key={size.value}
                onClick={() => onSizeToggle(size.value)}
                className={`p-3 rounded-lg border-2 transition-all text-center ${
                  formData.selectedSizes.includes(size.value)
                    ? 'border-pink-500 bg-pink-50 text-pink-700 relative'
                    : 'border-gray-200 hover:border-pink-300 text-gray-700'
                }`}
              >
                {formData.selectedSizes.includes(size.value) && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    ⭐
                  </div>
                )}
                <div className="font-medium">{size.label}</div>
                {size.description && (
                  <div className="text-xs text-gray-500 mt-1">{size.description}</div>
                )}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}