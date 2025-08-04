import React, { useRef } from 'react';
import { Camera, Upload } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { validateImageFile } from '../utils/helpers';

interface ImageUploadProps {
  formData: FormData;
  onImagesUpdate: (images: File[]) => void;
}

export default function ImageUpload({ formData, onImagesUpdate }: ImageUploadProps) {
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {formData.images.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={URL.createObjectURL(image)}
                alt={`Ürün ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg"
              />
              <button
                onClick={() => removeImage(index)}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity"
              >
                ×
              </button>
              {index === 0 && (
                <div className="absolute bottom-1 left-1 bg-green-500 text-white px-2 py-1 rounded text-xs">
                  Ana
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}