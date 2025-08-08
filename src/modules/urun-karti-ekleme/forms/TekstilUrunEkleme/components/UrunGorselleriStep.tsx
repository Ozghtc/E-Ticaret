import React from 'react';
import { Camera, Plus, Upload, Video, Eye } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { Variant } from '../hooks/useVariants';
import ImageUpload from './ImageUpload';
import { useTranslation } from "react-i18next";
interface UrunGorselleriStepProps {
  formData: FormData;
  variants: Variant[]; // Step 2'den gelen varyant listesi
  updateFormData: (field: keyof FormData, value: any) => void;
}
export default function UrunGorselleriStep({
  formData,
  variants,
  updateFormData
}: UrunGorselleriStepProps) {
  const {
    t
  } = useTranslation();
  const handleImagesUpdate = (images: File[]) => {
    updateFormData('images', images);
  };
  const handleVariantMappingUpdate = (imageIndex: number, variantId: string) => {
    const newMapping = {
      ...formData.imageVariantMapping
    };
    if (variantId) {
      newMapping[imageIndex] = variantId;
    } else {
      delete newMapping[imageIndex]; // Genel fotoğraf seçildi, mapping'i kaldır
    }
    updateFormData('imageVariantMapping', newMapping);
  };
  return <div className="space-y-8">
      {/* Step Title */}
      <div className="text-center">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Camera className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ürün Görselleri</h2>
        <p className="text-gray-600">{t("common.ürününüzün_fotoğraflarını_ve_görsellerini_ekleyin")}</p>
      </div>

      {/* Main Image Upload Section */}
      <ImageUpload formData={formData} variants={variants} onImagesUpdate={handleImagesUpdate} onVariantMappingUpdate={handleVariantMappingUpdate} />

      {/* Future Features - Coming Soon */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Video Upload - Coming Soon */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 opacity-50">
              <Video className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">Video Upload</h3>
            <p className="text-xs text-gray-400 mb-3">{t("common.ürün_videolarınızı_ekleyin")}</p>
            <button className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg text-sm cursor-not-allowed" disabled>{t("common.yakında")}</button>
          </div>
        </div>

        {/* 360° View - Coming Soon */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 opacity-50">
              <Eye className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">{t("common.360_görünüm")}</h3>
            <p className="text-xs text-gray-400 mb-3">{t("common.360_derece_ürün_görüntüleri")}</p>
            <button className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg text-sm cursor-not-allowed" disabled>{t("common.yakında")}</button>
          </div>
        </div>

        {/* AR Preview - Coming Soon */}
        <div className="bg-gray-50 rounded-lg p-6 border-2 border-dashed border-gray-300">
          <div className="text-center">
            <div className="bg-gray-200 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3 opacity-50">
              <Plus className="w-6 h-6 text-gray-400" />
            </div>
            <h3 className="text-sm font-medium text-gray-500 mb-2">{t("common.ar_önizleme")}</h3>
            <p className="text-xs text-gray-400 mb-3">{t("common.artırılmış_gerçeklik_denemesi")}</p>
            <button className="px-4 py-2 bg-gray-300 text-gray-500 rounded-lg text-sm cursor-not-allowed" disabled>{t("common.yakında")}</button>
          </div>
        </div>
      </div>

      {/* Upload Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">{t("common.fotoğraf_i_puçları")}</h4>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>{t("common.en_az_1000x1000_piksel_çözünürlük_kullanın")}</li>
          <li>{t("common.i_yi_ışıklandırma_ile_net_fotoğraflar_çekin")}</li>
          <li>{t("common.ürünü_farklı_açılardan_gösterin")}</li>
          <li>{t("common.model_üzerinde_veya_düz_zeminde_fotoğraf_çekin")}</li>
          <li>{t("common.renk_ve_detayları_net_gösterin")}</li>
        </ul>
      </div>

      {/* Current Images Summary */}
      {formData.images && formData.images.length > 0 && <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-800 mb-2">✅ Yüklenen Görseller:</h4>
          <p className="text-sm text-green-700">
            {formData.images.length}{t("common.adet_görsel_yüklendi_sonraki_adımda_önizleme_yapabilirsiniz")}</p>
        </div>}
    </div>;
}