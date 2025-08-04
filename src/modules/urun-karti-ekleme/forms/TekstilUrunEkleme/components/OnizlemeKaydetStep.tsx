import React, { useState } from 'react';
import { Check, Search, Globe, Tag, Eye } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { getCategoryById } from '../data/categories';
import { formatPrice, slugify } from '../utils/helpers';
import { generateSmartSeo } from '../../../../seo/utils/seoHelpers';

interface OnizlemeKaydetStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

export default function OnizlemeKaydetStep({ formData, updateFormData }: OnizlemeKaydetStepProps) {
  const [seoScore, setSeoScore] = useState<number | null>(null);
  const [seoSuggestions, setSeoSuggestions] = useState<string[]>([]);
  const [showSeoResult, setShowSeoResult] = useState(false);

  const handleKeywordAdd = (keyword: string) => {
    if (keyword.trim() && !formData.seoKeywords.includes(keyword.trim())) {
      const newKeywords = [...formData.seoKeywords, keyword.trim()];
      updateFormData('seoKeywords', newKeywords);
    }
  };

  const handleKeywordRemove = (keyword: string) => {
    const newKeywords = formData.seoKeywords.filter(k => k !== keyword);
    updateFormData('seoKeywords', newKeywords);
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const input = e.target as HTMLInputElement;
      handleKeywordAdd(input.value);
      input.value = '';
    }
  };

  const autoGenerateSeo = () => {
    // Akıllı SEO oluşturma
    const category = getCategoryById(formData.subCategory1)?.name || '';
    const features = [formData.fabricType, formData.fitType, formData.pattern].filter(Boolean);
    
    const seoResult = generateSmartSeo(
      formData.name,
      category,
      formData.brand,
      formData.description,
      formData.price,
      features
    );
    
    updateFormData('seoTitle', seoResult.title);
    updateFormData('seoDescription', seoResult.description);
    updateFormData('seoKeywords', seoResult.keywords);
  };

  return (
    <div className="space-y-8">
      {/* Step Title */}
      <div className="text-center">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Önizleme & Kaydet</h2>
        <p className="text-gray-600">SEO ayarları ve ürün kontrolü</p>
      </div>

      {/* SEO Ayarları */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Search className="mr-2" size={20} />
            SEO Ayarları
          </h3>
          <button
            onClick={autoGenerateSeo}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            🤖 Otomatik Oluştur
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SEO Başlığı
            </label>
            <input
              type="text"
              maxLength={60}
              value={formData.seoTitle}
              onChange={(e) => updateFormData('seoTitle', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Örn: Zarif Şifon Bluz - Zara - Kadın Giyim"
            />
            <div className="mt-1 text-sm text-gray-500">
              {formData.seoTitle.length}/60 karakter
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              SEO Açıklaması
            </label>
            <textarea
              maxLength={160}
              value={formData.seoDescription}
              onChange={(e) => updateFormData('seoDescription', e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Zarif şifon bluz ürününü Zara markasından uygun fiyatlarla satın alın..."
            />
            <div className="mt-1 text-sm text-gray-500">
              {formData.seoDescription.length}/160 karakter
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anahtar Kelimeler
            </label>
            <input
              type="text"
              onKeyPress={handleKeywordKeyPress}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Anahtar kelime yazıp Enter'a basın"
            />
            
            {formData.seoKeywords.length > 0 && (
              <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {formData.seoKeywords.map((keyword, index) => (
                    <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                      {keyword}
                      <button
                        onClick={() => handleKeywordRemove(keyword)}
                        className="ml-2 text-blue-500 hover:text-blue-700"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SEO Sonuç Bildirimi */}
      {showSeoResult && seoScore !== null && (
        <div className={`rounded-lg p-4 border ${
          seoScore >= 70 
            ? 'bg-green-50 border-green-200' 
            : 'bg-yellow-50 border-yellow-200'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className={`font-medium ${
              seoScore >= 70 ? 'text-green-800' : 'text-yellow-800'
            }`}>
              {seoScore >= 70 ? '✅ Mükemmel SEO!' : '⚠️ SEO İyileştirilebilir'}
            </h4>
            <div className={`px-3 py-1 rounded-full text-sm font-bold ${
              seoScore >= 70 
                ? 'bg-green-100 text-green-700' 
                : 'bg-yellow-100 text-yellow-700'
            }`}>
              Puan: {seoScore}/100
            </div>
          </div>
          
          {seoSuggestions.length > 0 && (
            <div>
              <h5 className={`font-medium mb-2 ${
                seoScore >= 70 ? 'text-green-700' : 'text-yellow-700'
              }`}>
                İyileştirme Önerileri:
              </h5>
              <ul className={`text-sm space-y-1 ${
                seoScore >= 70 ? 'text-green-600' : 'text-yellow-600'
              }`}>
                {seoSuggestions.map((suggestion, index) => (
                  <li key={index}>• {suggestion}</li>
                ))}
              </ul>
            </div>
          )}
          
          <button
            onClick={() => setShowSeoResult(false)}
            className="mt-3 text-sm text-gray-500 hover:text-gray-700"
          >
            Kapat ×
          </button>
        </div>
      )}

      {/* Ürün Önizlemesi */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Eye className="mr-2" size={20} />
          Ürün Önizlemesi
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol: Ürün Kartı Önizleme */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">Ürün Kartı Görünümü:</h4>
            <div className="bg-white rounded-lg shadow-sm overflow-hidden max-w-sm">
              {formData.images.length > 0 ? (
                <img
                  src={URL.createObjectURL(formData.images[0])}
                  alt={formData.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                  <span className="text-gray-500">Fotoğraf yok</span>
                </div>
              )}
              <div className="p-4">
                <h5 className="font-medium text-gray-900 mb-2">{formData.name || 'Ürün Adı'}</h5>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-pink-600">
                    {formData.price ? formatPrice(formData.price) : '0 TL'}
                  </span>
                  {formData.originalPrice > formData.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatPrice(formData.originalPrice)}
                    </span>
                  )}
                </div>
                <button className="w-full bg-pink-600 text-white py-2 rounded-md mt-3 text-sm">
                  Sepete Ekle
                </button>
              </div>
            </div>
          </div>

          {/* Sağ: Ürün Detayları */}
          <div>
            <h4 className="font-medium text-gray-800 mb-3">Ürün Detayları:</h4>
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-gray-600">Kategori:</span>
                  <div className="font-medium text-gray-900">
                    {getCategoryById(formData.mainCategory)?.name || 'Seçilmedi'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Alt Kategori:</span>
                  <div className="font-medium text-gray-900">
                    {getCategoryById(formData.subCategory1)?.name || 'Seçilmedi'}
                  </div>
                </div>
                <div>
                  <span className="text-gray-600">Marka:</span>
                  <div className="font-medium text-gray-900">{formData.brand || 'Belirtilmedi'}</div>
                </div>
                <div>
                  <span className="text-gray-600">Cinsiyet:</span>
                  <div className="font-medium text-gray-900">{formData.gender || 'Belirtilmedi'}</div>
                </div>
                <div>
                  <span className="text-gray-600">Kumaş:</span>
                  <div className="font-medium text-gray-900">{formData.fabricType || 'Belirtilmedi'}</div>
                </div>
                <div>
                  <span className="text-gray-600">Kalıp:</span>
                  <div className="font-medium text-gray-900">{formData.fitType || 'Belirtilmedi'}</div>
                </div>
                <div>
                  <span className="text-gray-600">Bedenler:</span>
                  <div className="font-medium text-gray-900">{formData.selectedSizes.length} adet</div>
                </div>
                <div>
                  <span className="text-gray-600">Renkler:</span>
                  <div className="font-medium text-gray-900">{formData.selectedColors.length} adet</div>
                </div>
                <div>
                  <span className="text-gray-600">Toplam Varyant:</span>
                  <div className="font-medium text-gray-900">{formData.selectedSizes.length * formData.selectedColors.length}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Önizleme */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h4 className="font-medium text-gray-800 mb-3">👁️ Arama Motoru Önizlemesi:</h4>
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <h5 className="text-blue-600 text-lg font-medium mb-1 line-clamp-1">
            {formData.seoTitle || formData.name || 'Ürün Başlığı'}
          </h5>
          <p className="text-green-600 text-sm mb-2">
            https://magaza.com/urun/{slugify(formData.name) || 'urun-adi'}
          </p>
          <p className="text-gray-600 text-sm line-clamp-2">
            {formData.seoDescription || formData.description || 'Ürün açıklaması burada görünecek...'}
          </p>
        </div>
      </div>

      {/* Form Tamamlanma Durumu */}
      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
        <h4 className="font-medium text-green-800 mb-2">✅ Form Tamamlanma Durumu:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className={`${formData.name ? 'text-green-700' : 'text-red-700'}`}>
            {formData.name ? '✓' : '✗'} Ürün Adı
          </div>
          <div className={`${formData.mainCategory ? 'text-green-700' : 'text-red-700'}`}>
            {formData.mainCategory ? '✓' : '✗'} Kategori
          </div>
          <div className={`${formData.selectedSizes.length > 0 ? 'text-green-700' : 'text-red-700'}`}>
            {formData.selectedSizes.length > 0 ? '✓' : '✗'} Bedenler
          </div>
          <div className={`${formData.selectedColors.length > 0 ? 'text-green-700' : 'text-red-700'}`}>
            {formData.selectedColors.length > 0 ? '✓' : '✗'} Renkler
          </div>
          <div className={`${formData.price > 0 ? 'text-green-700' : 'text-red-700'}`}>
            {formData.price > 0 ? '✓' : '✗'} Fiyat
          </div>
          <div className={`${formData.images.length > 0 ? 'text-green-700' : 'text-red-700'}`}>
            {formData.images.length > 0 ? '✓' : '✗'} Fotoğraflar
          </div>
          <div className={`${formData.seoTitle ? 'text-green-700' : 'text-orange-700'}`}>
            {formData.seoTitle ? '✓' : '!'} SEO Başlık
          </div>
          <div className={`${formData.fabricType ? 'text-green-700' : 'text-orange-700'}`}>
            {formData.fabricType ? '✓' : '!'} Kumaş Türü
          </div>
        </div>
      </div>
    </div>
  );
}