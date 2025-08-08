import React, { useState } from 'react';
import { Check, Search, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { Variant } from '../hooks/useVariants';
import { getCategoryById } from '../data/categories';
import { getColorById } from '../data/colors';
import { formatPrice, slugify } from '../utils/helpers';
import { generateSmartSeo } from '../../../../seo/utils/seoHelpers';
import { useTranslation } from "react-i18next";
interface OnizlemeKaydetStepProps {
  formData: FormData;
  variants: Variant[];
  updateFormData: (field: keyof FormData, value: any) => void;
}
export default function OnizlemeKaydetStep({
  formData,
  variants,
  updateFormData
}: OnizlemeKaydetStepProps) {
  const {
    t
  } = useTranslation();
  const [seoScore] = useState<number | null>(null);
  const [seoSuggestions] = useState<string[]>([]);
  const [showSeoResult, setShowSeoResult] = useState(false);
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
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
    const seoResult = generateSmartSeo(formData.name, category, formData.brand, formData.description, formData.price, features);
    updateFormData('seoTitle', seoResult.title);
    updateFormData('seoDescription', seoResult.description);
    updateFormData('seoKeywords', seoResult.keywords);
  };

  // Varyant carousel navigasyon fonksiyonları
  const currentVariant = variants[selectedVariantIndex];
  const nextVariant = () => {
    setSelectedVariantIndex(prev => (prev + 1) % variants.length);
  };
  const prevVariant = () => {
    setSelectedVariantIndex(prev => (prev - 1 + variants.length) % variants.length);
  };
  const goToVariant = (index: number) => {
    setSelectedVariantIndex(index);
  };

  // Varyant için atanmış fotoğrafı bul
  const getVariantImage = (variant: Variant) => {
    // imageVariantMapping'ten bu varyanta atanmış fotoğrafı bul
    const mappingEntry = Object.entries(formData.imageVariantMapping).find(([_, variantId]) => variantId === variant.id);
    if (mappingEntry) {
      const imageIndex = parseInt(mappingEntry[0]);
      return formData.images[imageIndex];
    }
    // Eğer atanmış fotoğraf yoksa, ilk fotoğrafı göster
    return formData.images[0];
  };

  // Varyant için renk bilgisini al
  const getVariantColorInfo = (variant: Variant) => {
    const colorId = formData.selectedColors.find(colorId => {
      const color = getColorById(colorId);
      return color?.name === variant.color;
    });
    return colorId ? getColorById(colorId) : null;
  };
  return <div className="space-y-8">
      {/* Step Title */}
      <div className="text-center">
        <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{t("common.önizleme_kaydet")}</h2>
        <p className="text-gray-600">{t("common.seo_ayarları_ve_ürün_kontrolü")}</p>
      </div>

      {/* SEO Ayarları */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Search className="mr-2" size={20} />
            SEO Ayarları
          </h3>
          <button onClick={autoGenerateSeo} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">{t("common.otomatik_oluştur")}</button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("common.seo_başlığı")}</label>
            <input type="text" maxLength={60} value={formData.seoTitle} onChange={e => updateFormData('seoTitle', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder={t("common.örn_zarif_şifon_bluz_zara_kadın_giyim")} />
            <div className="mt-1 text-sm text-gray-500">
              {formData.seoTitle.length}/60 karakter
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("common.seo_açıklaması")}</label>
            <textarea maxLength={160} value={formData.seoDescription} onChange={e => updateFormData('seoDescription', e.target.value)} rows={3} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder={t("common.zarif_şifon_bluz_ürününü_zara_markasından_uygun_fiyatlarla_satın_alın")} />
            <div className="mt-1 text-sm text-gray-500">
              {formData.seoDescription.length}/160 karakter
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Anahtar Kelimeler
            </label>
            <input type="text" onKeyPress={handleKeywordKeyPress} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" placeholder={t("common.anahtar_kelime_yazıp_enter_a_basın")} />
            
            {formData.seoKeywords.length > 0 && <div className="mt-3">
                <div className="flex flex-wrap gap-2">
                  {formData.seoKeywords.map((keyword, index) => <span key={index} className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm flex items-center">
                      {keyword}
                      <button onClick={() => handleKeywordRemove(keyword)} className="ml-2 text-blue-500 hover:text-blue-700">
                        ×
                      </button>
                    </span>)}
                </div>
              </div>}
          </div>
        </div>
      </div>

      {/* SEO Sonuç Bildirimi */}
      {showSeoResult && seoScore !== null && <div className={`rounded-lg p-4 border ${seoScore >= 70 ? 'bg-green-50 border-green-200' : 'bg-yellow-50 border-yellow-200'}`}>
          <div className="flex items-center justify-between mb-3">
            <h4 className={`font-medium ${seoScore >= 70 ? 'text-green-800' : 'text-yellow-800'}`}>
              {seoScore >= 70 ? t("common.mükemmel_seo") : t("common.seo_i_yileştirilebilir")}
            </h4>
            <div className={`px-3 py-1 rounded-full text-sm font-bold ${seoScore >= 70 ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
              Puan: {seoScore}/100
            </div>
          </div>
          
          {seoSuggestions.length > 0 && <div>
              <h5 className={`font-medium mb-2 ${seoScore >= 70 ? 'text-green-700' : 'text-yellow-700'}`}>{t("common.i_yileştirme_önerileri")}</h5>
              <ul className={`text-sm space-y-1 ${seoScore >= 70 ? 'text-green-600' : 'text-yellow-600'}`}>
                {seoSuggestions.map((suggestion, index) => <li key={index}>• {suggestion}</li>)}
              </ul>
            </div>}
          
          <button onClick={() => setShowSeoResult(false)} className="mt-3 text-sm text-gray-500 hover:text-gray-700">
            Kapat ×
          </button>
        </div>}

      {/* Varyant Carousel Önizlemesi */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <Eye className="mr-2" size={20} />{t("common.varyant_önizlemesi")}</h3>
        
        {variants.length > 0 ? <div className="space-y-6">
            {/* Varyant Navigasyon Header */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button onClick={prevVariant} disabled={variants.length <= 1} className={`p-2 rounded-full ${variants.length <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}>
                  <ChevronLeft size={20} />
                </button>
                
                <div className="text-center">
                  <h4 className="font-bold text-xl text-gray-900">
                    {currentVariant?.size} - {currentVariant?.color}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Varyant {selectedVariantIndex + 1} / {variants.length}
                  </p>
                </div>
                
                <button onClick={nextVariant} disabled={variants.length <= 1} className={`p-2 rounded-full ${variants.length <= 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-blue-100 text-blue-600 hover:bg-blue-200'}`}>
                  <ChevronRight size={20} />
                </button>
              </div>
              
              {/* Varyant Indicator Dots */}
              {variants.length > 1 && <div className="flex space-x-2">
                  {variants.map((_, index) => <button key={index} onClick={() => goToVariant(index)} className={`w-3 h-3 rounded-full transition-colors ${index === selectedVariantIndex ? 'bg-blue-600' : 'bg-gray-300 hover:bg-gray-400'}`} />)}
                </div>}
            </div>
            
            {/* Ana Varyant Kartı */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Sol: Ürün Kartı (Varyanta Özel) */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-medium text-gray-800 mb-3">{t("common.ürün_kartı_görünümü")}</h4>
                <div className="bg-white rounded-lg shadow-sm overflow-hidden max-w-sm">
                  {/* Varyanta özel fotoğraf */}
                  {(() => {
                const variantImage = getVariantImage(currentVariant);
                return variantImage ? <img src={URL.createObjectURL(variantImage)} alt={`${formData.name} - ${currentVariant?.size} ${currentVariant?.color}`} className="w-full h-48 object-cover" /> : formData.images[0] ? <img src={URL.createObjectURL(formData.images[0])} alt={formData.name} className="w-full h-48 object-cover" /> : <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <span className="text-gray-500">{t("common.fotoğraf_yok")}</span>
                      </div>;
              })()}
                  
                  <div className="p-4">
                    <h5 className="font-medium text-gray-900 mb-2">
                      {formData.name || t("common.ürün_adı")} - {currentVariant?.size}
                    </h5>
                    
                    {/* Renk göstergesi */}
                    {(() => {
                  const colorInfo = getVariantColorInfo(currentVariant);
                  return colorInfo && <div className="flex items-center mb-2">
                          <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-2" style={{
                      backgroundColor: colorInfo.hex
                    }} />
                          <span className="text-sm text-gray-600">{colorInfo.name}</span>
                        </div>;
                })()}
                    
                    {/* Fiyat bilgileri */}
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-lg font-bold text-pink-600">
                        {currentVariant ? formatPrice(currentVariant.price) : '0 TL'}
                      </span>
                      {currentVariant && currentVariant.originalPrice > currentVariant.price && <span className="text-sm text-gray-500 line-through">
                          {formatPrice(currentVariant.originalPrice)}
                        </span>}
                    </div>
                    
                    {/* İndirim yüzdesi */}
                    {currentVariant && currentVariant.originalPrice > currentVariant.price && <div className="mb-2">
                        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
                          %{Math.round((currentVariant.originalPrice - currentVariant.price) / currentVariant.originalPrice * 100)} İndirim
                        </span>
                      </div>}
                    
                    {/* Stok durumu */}
                    <div className="mb-3">
                      <span className={`text-xs font-medium px-2 py-1 rounded ${currentVariant && currentVariant.stock > 5 ? 'bg-green-100 text-green-800' : currentVariant && currentVariant.stock > 0 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'}`}>
                        {currentVariant ? currentVariant.stock > 0 ? `${currentVariant.stock} adet stokta` : t("common.stokta_yok") : t("common.stok_bilgisi_yok")}
                      </span>
                    </div>
                    
                    <button className={`w-full py-2 rounded-md text-sm font-medium ${currentVariant && currentVariant.stock > 0 ? 'bg-pink-600 text-white hover:bg-pink-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`} disabled={!currentVariant || currentVariant.stock === 0}>
                      {currentVariant && currentVariant.stock > 0 ? 'Sepete Ekle' : 'Stokta Yok'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Sağ: Varyant Detayları */}
              <div>
                <h4 className="font-medium text-gray-800 mb-3">{t("common.varyant_detayları")}</h4>
                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="text-gray-600">Beden:</span>
                      <div className="font-medium text-gray-900">{currentVariant?.size || '-'}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Renk:</span>
                      <div className="font-medium text-gray-900">{currentVariant?.color || '-'}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">{t("common.satış_fiyatı")}</span>
                      <div className="font-medium text-green-600">
                        {currentVariant ? formatPrice(currentVariant.price) : '0 TL'}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Eski Fiyat:</span>
                      <div className="font-medium text-gray-900">
                        {currentVariant && currentVariant.originalPrice > currentVariant.price ? formatPrice(currentVariant.originalPrice) : 'Yok'}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Stok:</span>
                      <div className={`font-medium ${currentVariant && currentVariant.stock > 5 ? 'text-green-600' : currentVariant && currentVariant.stock > 0 ? 'text-orange-600' : 'text-red-600'}`}>
                        {currentVariant?.stock || 0} adet
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">SKU:</span>
                      <div className="font-medium text-gray-900">{currentVariant?.sku || 'Belirtilmedi'}</div>
                    </div>
                  </div>
                  
                  {/* Genel ürün bilgileri */}
                  <div className="border-t pt-4 mt-4">
                    <h5 className="font-medium text-gray-800 mb-3">Genel Bilgiler:</h5>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-600">Kategori:</span>
                        <div className="font-medium text-gray-900">
                          {getCategoryById(formData.mainCategory)?.name || t("common.seçilmedi")}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-600">Alt Kategori:</span>
                        <div className="font-medium text-gray-900">
                          {getCategoryById(formData.subCategory1)?.name || t("common.seçilmedi")}
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
                        <span className="text-gray-600">{t("common.kumaş")}</span>
                        <div className="font-medium text-gray-900">{formData.fabricType || 'Belirtilmedi'}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">{t("common.kalıp")}</span>
                        <div className="font-medium text-gray-900">{formData.fitType || 'Belirtilmedi'}</div>
                      </div>
                      <div>
                        <span className="text-gray-600">Toplam Varyant:</span>
                        <div className="font-medium text-gray-900">{variants.length} adet</div>
                      </div>
                      <div>
                        <span className="text-gray-600">{t("common.fotoğraf")}</span>
                        <div className="font-medium text-gray-900">
                          {getVariantImage(currentVariant) ? t("common.özel_atanmış") : t("common.genel_fotoğraf")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div> : <div className="text-center py-8">
            <div className="text-gray-400 mb-4">
              <Eye size={48} className="mx-auto" />
            </div>
            <h4 className="text-lg font-medium text-gray-900 mb-2">{t("common.henüz_varyant_yok")}</h4>
            <p className="text-gray-600">{t("common.önizleme_için_2_adımda_beden_ve_renk_seçimi_yapın")}</p>
          </div>}
      </div>

      {/* SEO Önizleme */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h4 className="font-medium text-gray-800 mb-3">{t("common.arama_motoru_önizlemesi")}</h4>
        <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
          <h5 className="text-blue-600 text-lg font-medium mb-1 line-clamp-1">
            {formData.seoTitle || formData.name || t("common.ürün_başlığı")}
          </h5>
          <p className="text-green-600 text-sm mb-2">
            https://magaza.com/urun/{slugify(formData.name) || 'urun-adi'}
          </p>
          <p className="text-gray-600 text-sm line-clamp-2">
            {formData.seoDescription || formData.description || t("common.ürün_açıklaması_burada_görünecek")}
          </p>
        </div>
      </div>

      {/* Form Tamamlanma Durumu */}
      <div className="bg-green-50 rounded-lg p-4 border border-green-200">
        <h4 className="font-medium text-green-800 mb-2">✅ Form Tamamlanma Durumu:</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className={`${formData.name ? 'text-green-700' : 'text-red-700'}`}>
            {formData.name ? '✓' : '✗'}{t("common.ürün_adı")}</div>
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
            {formData.images.length > 0 ? '✓' : '✗'}{t("common.fotoğraflar")}</div>
          <div className={`${formData.seoTitle ? 'text-green-700' : 'text-orange-700'}`}>
            {formData.seoTitle ? '✓' : '!'}{t("common.seo_başlık")}</div>
          <div className={`${formData.fabricType ? 'text-green-700' : 'text-orange-700'}`}>
            {formData.fabricType ? '✓' : '!'}{t("common.kumaş_türü")}</div>
        </div>
      </div>
    </div>;
}