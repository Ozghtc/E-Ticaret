import React, { useRef } from 'react';
import { Camera, Upload, Tag } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { Variant } from '../hooks/useVariants';
import { validateImageFile } from '../utils/helpers';

interface ImageUploadProps {
  formData: FormData;
  variants: Variant[]; // Varyant listesi (Step 2'den gelecek)
  onImagesUpdate: (images: File[]) => void;
  onVariantMappingUpdate: (imageIndex: number, variantId: string) => void; // Mapping güncellemesi
}

export default function ImageUpload({ formData, variants, onImagesUpdate, onVariantMappingUpdate }: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    const validFiles: File[] = [];
    const errors: string[] = [];

    files.forEach(file => {
      const validation = validateImageFile(file);
      if (validation.valid) {
        validFiles.push(file);
      } else {
        errors.push(`${file.name}: ${validation.error}`);
      }
    });

    if (validFiles.length > 0) {
      const newImages = [...formData.images, ...validFiles];
      onImagesUpdate(newImages.slice(0, 10)); // Max 10 images
    }

    if (errors.length > 0) {
      alert('Bazı dosyalar yüklenemedi:\n' + errors.join('\n'));
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    onImagesUpdate(newImages);
    
    // Mapping'i de temizle - silinen fotoğrafın mapping'ini kaldır
    // NOT: Bu basit implementasyon, daha gelişmiş cleanup Step'te yapılabilir
  };

  return (
    <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <Camera className="mr-2" size={20} />
        Ürün Görselleri
      </h3>
      
      {/* Upload Area */}
      <div 
        className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-blue-400 transition-colors cursor-pointer mb-6"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="w-12 h-12 mx-auto text-gray-400 mb-4" />
        <h4 className="text-lg font-semibold text-gray-900 mb-2">Fotoğraf Yükle</h4>
        <p className="text-gray-600 text-sm mb-4">
          JPG, PNG veya WebP formatında, maksimum 5MB
        </p>
        <button 
          type="button"
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Fotoğraf Seç
        </button>
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Image Preview */}
      {formData.images.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formData.images.map((image, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-4">
              {/* Fotoğraf */}
              <div className="relative group mb-3">
                <img
                  src={URL.createObjectURL(image)}
                  alt={`Ürün ${index + 1}`}
                  className="w-full h-32 object-cover rounded-lg"
                />
                <button
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  ×
                </button>
                {index === 0 && (
                  <div className="absolute bottom-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
                    Ana Fotoğraf
                  </div>
                )}
              </div>

              {/* Varyant Seçimi */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-medium text-gray-700">
                  <Tag className="w-4 h-4 mr-1" />
                  Bu fotoğraf hangi varyant için?
                </label>
                <select
                  value={formData.imageVariantMapping[index] || ''}
                  onChange={(e) => onVariantMappingUpdate(index, e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="">🔄 Genel ürün fotoğrafı</option>
                  {variants.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      🎨 {variant.size} - {variant.color} ({variant.price}₺ • Stok: {variant.stock})
                    </option>
                  ))}
                </select>
                
                {/* Seçili varyant detay bilgileri */}
                {formData.imageVariantMapping[index] && (() => {
                  const selectedVariant = variants.find(v => v.id === formData.imageVariantMapping[index]);
                  if (!selectedVariant) return null;
                  
                  const discount = selectedVariant.originalPrice > selectedVariant.price ? 
                    Math.round(((selectedVariant.originalPrice - selectedVariant.price) / selectedVariant.originalPrice) * 100) : 0;
                  
                  return (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
                      <div className="flex items-center text-sm font-medium text-blue-800">
                        ✓ {selectedVariant.size} - {selectedVariant.color} varyantına atandı
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 text-xs">
                        <div className="space-y-1">
                          <div className="text-gray-600">💰 <strong>Satış Fiyatı:</strong></div>
                          <div className="text-green-600 font-bold">{selectedVariant.price}₺</div>
                        </div>
                        
                        {selectedVariant.originalPrice > selectedVariant.price && (
                          <div className="space-y-1">
                            <div className="text-gray-600">🏷️ <strong>Eski Fiyat:</strong></div>
                            <div className="text-red-500 line-through">{selectedVariant.originalPrice}₺</div>
                          </div>
                        )}
                        
                        <div className="space-y-1">
                          <div className="text-gray-600">📦 <strong>Kalan Stok:</strong></div>
                          <div className={`font-bold ${selectedVariant.stock > 5 ? 'text-green-600' : selectedVariant.stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                            {selectedVariant.stock} adet
                          </div>
                        </div>
                        
                        {discount > 0 && (
                          <div className="space-y-1">
                            <div className="text-gray-600">🎯 <strong>İndirim:</strong></div>
                            <div className="text-red-600 font-bold">%{discount}</div>
                          </div>
                        )}
                      </div>
                      
                      <div className="text-xs text-blue-600 bg-blue-100 px-2 py-1 rounded">
                        💡 Bu fotoğraf müşteriye "{selectedVariant.size} - {selectedVariant.color}" varyantı seçildiğinde gösterilecek
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}