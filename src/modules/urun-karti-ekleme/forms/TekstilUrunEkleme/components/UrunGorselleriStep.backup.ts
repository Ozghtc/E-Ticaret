import React from 'react';
import { Camera, Plus, Upload, Video, Eye } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import ImageUpload from './ImageUpload';

interface UrunGorselleriStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

export default function UrunGorselleriStep({ formData, updateFormData }: UrunGorselleriStepProps) {
  const handleImagesUpdate = (images: File[]) => {
    updateFormData('images', images);
  };

  return (
    <div className="space-y-8">
      {/* Step Title */}
      <div className="text-center">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Camera className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ürün Görselleri</h2>
        <p className="text-gray-600">Ürününüzün fotoğraflarını ve görsellerini ekleyin</p>
      </div>

      {/* Main Image Upload Section */}
      <ImageUpload 
        formData={formData}
        onImagesUpdate={handleImagesUpdate}
      />

      {/* Future Features - Coming Soon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Video Upload - Coming Soon */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 opacity-50">
              <Video className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Video Upload</h3>
            <p className="text-xs text-gray-400 mb-3">Ürün videolarınızı ekleyin</p>
            <button 
              className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg text-sm cursor-not-allowed"
              disabled
            >
              Yakında...
            </button>
          </div>
        </div>

        {/* 360° View - Coming Soon */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 opacity-50">
              <Eye className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">360° Görünüm</h3>
            <p className="text-xs text-gray-400 mb-3">360 derece ürün görüntüleri</p>
            <button 
              className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg text-sm cursor-not-allowed"
              disabled
            >
              Yakında...
            </button>
          </div>
        </div>

        {/* AR Preview - Coming Soon */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 opacity-50">
              <Plus className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">AR Önizleme</h3>
            <p className="text-xs text-gray-400 mb-3">Artırılmış gerçeklik denemesi</p>
            <button 
              className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg text-sm cursor-not-allowed"
              disabled
            >
              Yakında...
            </button>
          </div>
        </div>
      </div>

      {/* Upload Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">📸 Fotoğraf İpuçları:</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• En az 1000x1000 piksel çözünürlük kullanın</li>
          <li>• İyi ışıklandırma ile net fotoğraflar çekin</li>
          <li>• Ürünü farklı açılardan gösterin</li>
          <li>• Model üzerinde veya düz zeminde fotoğraf çekin</li>
          <li>• Renk ve detayları net gösterin</li>
        </ul>
      </div>

      {/* Current Images Summary */}
      {formData.images && formData.images.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-800 mb-2">✅ Yüklenen Görseller:</h4>
          <p className="text-sm text-green-700">
            {formData.images.length} adet görsel yüklendi. 
            Sonraki adımda önizleme yapabilirsiniz.
          </p>
        </div>
      )}
    </div>
  );
}