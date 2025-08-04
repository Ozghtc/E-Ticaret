import { useState } from 'react';
import { Palette } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { colors } from '../data/colors';

// Debug: Console'da colors array'ini kontrol et
if (!colors || colors.length === 0) {
  console.error('🔴 ColorSelection: colors array yüklenemedi veya boş!', colors);
}

interface ColorSelectionProps {
  formData: FormData;
  onColorToggle: (colorId: string) => void;
}

export default function ColorSelection({ formData, onColorToggle }: ColorSelectionProps) {
  const [showAllColors, setShowAllColors] = useState(false);

  const getColorById = (colorId: string) => {
    return (colors || []).find(color => color.id === colorId);
  };

  // Eğer colors yüklenemedi ise error göster
  if (!colors || colors.length === 0) {
    return (
      <div className="bg-red-50 rounded-lg p-6 border border-red-200">
        <h3 className="text-lg font-semibold text-red-900 mb-4 flex items-center">
          <Palette className="mr-2" size={20} />
          Renk Seçimi - Yükleme Hatası
        </h3>
        <div className="text-red-700 text-sm">
          ⚠️ Renk paleti yüklenemedi. Sayfayı yenilemeyi deneyin.
          <button 
            onClick={() => window.location.reload()}
            className="ml-2 text-red-600 underline hover:text-red-800"
          >
            Sayfayı Yenile
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Palette className="mr-2" size={20} />
        Renk Seçimi
      </h3>

      {/* Kompakt Renk Seçimi - İlk 16 Renk */}
      <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mb-4">
        {(colors || []).slice(0, 16).map((color) => (
          <button
            key={color.id}
            onClick={() => onColorToggle(color.id)}
            className={`relative p-3 rounded-lg border-2 transition-all hover:scale-110 hover:shadow-lg group ${
              formData.selectedColors.includes(color.id)
                ? 'border-pink-500 bg-pink-50 shadow-lg ring-2 ring-pink-200'
                : 'border-gray-200 hover:border-pink-300 hover:shadow-md'
            }`}
          >
            {formData.selectedColors.includes(color.id) && (
              <div className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md">
                ✓
              </div>
            )}
            <div className="text-center">
              <div className="text-lg mb-1">{color.emoji}</div>
              <div 
                className="w-8 h-8 rounded-full mx-auto mb-2 border-2 border-gray-300 shadow-sm group-hover:shadow-md transition-shadow"
                style={{ backgroundColor: color.hex }}
              ></div>
              <div className="text-xs font-medium text-gray-700 leading-tight">{color.name}</div>
            </div>
          </button>
        ))}
      </div>
      
      {/* Genişletilebilir Renk Alanı */}
      {showAllColors && (
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mb-4 border-t border-gray-200 pt-4">
          {(colors || []).slice(16).map((color) => (
            <button
              key={color.id}
              onClick={() => onColorToggle(color.id)}
              className={`relative p-3 rounded-lg border-2 transition-all hover:scale-110 hover:shadow-lg group ${
                formData.selectedColors.includes(color.id)
                  ? 'border-pink-500 bg-pink-50 shadow-lg ring-2 ring-pink-200'
                  : 'border-gray-200 hover:border-pink-300 hover:shadow-md'
              }`}
            >
              {formData.selectedColors.includes(color.id) && (
                <div className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md">
                  ✓
                </div>
              )}
              <div className="text-center">
                <div className="text-lg mb-1">{color.emoji}</div>
                <div 
                  className="w-8 h-8 rounded-full mx-auto mb-2 border-2 border-gray-300 shadow-sm group-hover:shadow-md transition-shadow"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <div className="text-xs font-medium text-gray-700 leading-tight">{color.name}</div>
              </div>
            </button>
          ))}
        </div>
      )}
      
      {/* Daha Fazla Renk Butonu - Güvenli Halde */}
      {colors && colors.length > 16 && (
        <div className="text-center">
          <button 
            onClick={() => setShowAllColors(!showAllColors)}
            className="text-pink-600 hover:text-pink-700 text-sm font-medium bg-pink-50 hover:bg-pink-100 px-4 py-2 rounded-lg border border-pink-200 transition-all"
          >
            {showAllColors ? (
              <>
                ↑ Daha Az Renk Göster
              </>
            ) : (
              <>
                + Daha Fazla Renk Göster ({colors.length - 16} renk daha)
              </>
            )}
          </button>
        </div>
      )}
      
      {/* Seçilen Renkler Özeti */}
      {formData.selectedColors.length > 0 && (
        <div className="mt-4 bg-pink-50 rounded-lg p-3 border border-pink-200">
          <h4 className="text-sm font-medium text-pink-800 mb-2">
            Seçilen Renkler ({formData.selectedColors.length}):
          </h4>
          <div className="flex flex-wrap gap-2">
            {formData.selectedColors.map((colorId) => {
              const color = getColorById(colorId);
              return color ? (
                <span key={colorId} className="bg-white border border-pink-300 px-2 py-1 rounded-full text-xs flex items-center">
                  <span className="mr-1">{color.emoji}</span>
                  <div 
                    className="w-3 h-3 rounded-full mr-1 border border-gray-300"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  {color.name}
                  <button
                    onClick={() => onColorToggle(colorId)}
                    className="ml-1 text-pink-600 hover:text-pink-800"
                  >
                    ×
                  </button>
                </span>
              ) : null;
            })}
          </div>
        </div>
      )}
    </div>
  );
}