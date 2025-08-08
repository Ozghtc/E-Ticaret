// 📷 Kozmetik Ürün Görselleri - Adım 3
import React, { useState } from 'react';
import { Upload, Image, X, Eye, Camera } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { validateImageFile } from '../utils/helpers';
import { useTranslation } from "react-i18next";
interface UrunGorselleriStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}
function UrunGorselleriStep({
  formData,
  updateFormData
}: UrunGorselleriStepProps) {
  const {
    t
  } = useTranslation();
  const [dragActive, setDragActive] = useState(false);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);

  // Drag & Drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  };
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFiles = Array.from(e.dataTransfer.files);
    handleFiles(droppedFiles);
  };
  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    handleFiles(selectedFiles);
  };
  const handleFiles = (newFiles: File[]) => {
    const maxFiles = 10;
    const currentFiles = formData.images || [];
    if (currentFiles.length + newFiles.length > maxFiles) {
      alert(`En fazla ${maxFiles} görsel yükleyebilirsiniz!`);
      return;
    }

    // Dosya validasyonu
    const validFiles: File[] = [];
    const newPreviews: string[] = [];
    newFiles.forEach(file => {
      const validation = validateImageFile(file);
      if (validation.valid) {
        validFiles.push(file);
        // Preview oluştur
        const reader = new FileReader();
        reader.onload = e => {
          if (e.target?.result) {
            newPreviews.push(e.target.result as string);
            if (newPreviews.length === validFiles.length) {
              setPreviewImages(prev => [...prev, ...newPreviews]);
            }
          }
        };
        reader.readAsDataURL(file);
      } else {
        alert(`Dosya hatası: ${file.name} - ${validation.error}`);
      }
    });
    if (validFiles.length > 0) {
      updateFormData('images', [...currentFiles, ...validFiles]);
    }
  };
  const removeImage = (index: number) => {
    const currentFiles = formData.images || [];
    const updatedFiles = currentFiles.filter((_, i) => i !== index);
    const updatedPreviews = previewImages.filter((_, i) => i !== index);
    updateFormData('images', updatedFiles);
    setPreviewImages(updatedPreviews);

    // Seçili görsel silinirse selection'ı temizle
    if (selectedImageIndex === index) {
      setSelectedImageIndex(null);
    } else if (selectedImageIndex !== null && selectedImageIndex > index) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };
  const openPreview = (index: number) => {
    setSelectedImageIndex(index);
  };
  const closePreview = () => {
    setSelectedImageIndex(null);
  };
  return <div className="space-y-8">
      {/* Upload Area */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-center mb-4">
          <Camera className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Ürün Görselleri</h3>
        </div>

        <div className={`border-2 border-dashed rounded-xl p-8 text-center transition-all ${dragActive ? 'border-blue-500 bg-blue-100' : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'}`} onDragEnter={handleDrag} onDragLeave={handleDrag} onDragOver={handleDrag} onDrop={handleDrop}>
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h4 className="text-lg font-medium text-gray-900 mb-2">{t("common.görselleri_yükleyin")}</h4>
          <p className="text-gray-600 mb-4">{t("common.dosyaları_sürükleyip_bırakın_veya_seçin")}</p>
          <input type="file" multiple accept="image/jpeg,image/png,image/webp" onChange={handleFileInput} className="hidden" id="image-upload" />
          <label htmlFor="image-upload" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 cursor-pointer inline-block transition-colors">{t("common.dosya_seç")}</label>
          <p className="text-sm text-gray-500 mt-4">{t("common.jpg_png_veya_webp_formatında_maksimum_5mb_en_fazla_10_görsel")}</p>
        </div>
      </div>

      {/* Yüklenen Görseller */}
      {previewImages.length > 0 && <div className="bg-white p-6 rounded-xl border border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-semibold text-gray-900">{t("common.yüklenen_görseller")}{previewImages.length}/10)
            </h4>
            <div className="text-sm text-gray-600">{t("common.ana_görsel_olarak_kullanılacak_ilk_görselinizi_en_sola_yerleştirin")}</div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {previewImages.map((preview, index) => <div key={index} className="relative group">
                <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200 hover:border-blue-400 transition-colors">
                  <img src={preview} alt={`Görsel ${index + 1}`} className="w-full h-full object-cover" />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-200 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 flex space-x-2">
                      <button onClick={() => openPreview(index)} className="bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 transition-colors" title={t("common.önizleme")}>
                        <Eye size={16} />
                      </button>
                      <button onClick={() => removeImage(index)} className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition-colors" title="Sil">
                        <X size={16} />
                      </button>
                    </div>
                  </div>
                  
                  {/* Ana Görsel İşareti */}
                  {index === 0 && <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">{t("common.ana_görsel")}</div>}
                  
                  {/* Görsel Numarası */}
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                    {index + 1}
                  </div>
                </div>
              </div>)}
          </div>

          {/* Yükleme İpuçları */}
          <div className="mt-6 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <h5 className="font-medium text-yellow-800 mb-2">{t("common.görsel_i_puçları")}</h5>
            <ul className="text-sm text-yellow-700 space-y-1">
              <li>{t("common.i_lk_görsel_ana_ürün_görseli_olarak_kullanılacak")}</li>
              <li>{t("common.farklı_açılardan_çekilmiş_görseller_ekleyin")}</li>
              <li>{t("common.ürünün_kullanım_anını_gösteren_görseller_tercih_edin")}</li>
              <li>{t("common.renk_seçenekleri_varsa_her_renk_için_ayrı_görsel_ekleyin")}</li>
              <li>{t("common.ürün_ambalajını_da_göstermek_müşteri_güvenini_artırır")}</li>
            </ul>
          </div>
        </div>}

      {/* Görsel Önizleme Modal */}
      {selectedImageIndex !== null && <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-full p-4">
            <button onClick={closePreview} className="absolute top-4 right-4 bg-white text-gray-800 p-2 rounded-full hover:bg-gray-100 z-10">
              <X size={20} />
            </button>
            <img src={previewImages[selectedImageIndex]} alt={`Görsel ${selectedImageIndex + 1}`} className="max-w-full max-h-full rounded-lg" />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-60 text-white px-4 py-2 rounded-lg">{t("common.görsel")}{selectedImageIndex + 1} / {previewImages.length}
            </div>
          </div>
        </div>}

      {/* Gelecek Özellikler */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <div className="flex items-center mb-4">
          <Image className="w-5 h-5 text-gray-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Gelecek Özellikler</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium mb-2">{t("common.video_desteği")}</h4>
            <p>{t("common.ürün_tanıtım_videoları_yükleyebileceksiniz")}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium mb-2">{t("common.görsel_etiketleme")}</h4>
            <p>{t("common.görseller_üzerinde_özellik_işaretleri_ekleyebileceksiniz")}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <h4 className="font-medium mb-2">{t("common.görsel_düzenleme")}</h4>
            <p>{t("common.kırpma_döndürme_ve_filtre_uygulama_özellikleri")}</p>
          </div>
        </div>
      </div>
    </div>;
}
export default UrunGorselleriStep;