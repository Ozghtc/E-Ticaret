// 👁️ Kozmetik Önizleme & Kaydet - Adım 4
import React from 'react';
import { Eye, Save, Search, Tag, Heart, Palette, Shield, Sparkles } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { formatPrice } from '../utils/helpers';
import { mainCategories, getSubCategories } from '../data/categories';
import { skinTypes, contentFeatures, specialFeatures, finishTypes, coverageTypes, volumeOptions, spfValues, ageGroups, genderOptions } from '../data/specs';
import { colors } from '../data/colors';
import { useTranslation } from "react-i18next";
interface OnizlemeKaydetStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}
function OnizlemeKaydetStep({
  formData,
  updateFormData
}: OnizlemeKaydetStepProps) {
  const {
    t
  } = useTranslation();
  // Helper functions
  const getMainCategoryName = () => {
    return mainCategories.find(c => c.id === formData.mainCategory)?.name || 'Bilinmeyen';
  };
  const getSubCategoryName = () => {
    const subCategories = getSubCategories(formData.mainCategory);
    return subCategories.find(c => c.id === formData.subCategory1)?.name || 'Bilinmeyen';
  };
  const getSkinTypeNames = () => {
    return formData.skinTypes?.map(id => skinTypes.find(s => s.id === id)?.name || id).join(', ') || t("common.belirtilmemiş");
  };
  const getContentFeatureNames = () => {
    return formData.contentFeatures?.map(id => contentFeatures.find(f => f.id === id)?.name || id).join(', ') || 'Yok';
  };
  const getSpecialFeatureNames = () => {
    return formData.specialFeatures?.map(id => specialFeatures.find(f => f.id === id)?.name || id).join(', ') || 'Yok';
  };
  const getSelectedShadeNames = () => {
    return formData.selectedShades?.map(id => colors.find(c => c.id === id)?.name || id).join(', ') || t("common.seçilmemiş");
  };
  const getVolumeText = () => {
    return volumeOptions.find(v => v.id === formData.volume)?.name || t("common.belirtilmemiş");
  };
  const getSPFText = () => {
    return spfValues.find(s => s.id === formData.spfValue)?.name || 'Yok';
  };
  const getFinishText = () => {
    return finishTypes.find(f => f.id === formData.finishType)?.name || t("common.belirtilmemiş");
  };
  const getCoverageText = () => {
    return coverageTypes.find(c => c.id === formData.coverageType)?.name || t("common.belirtilmemiş");
  };
  const getAgeGroupText = () => {
    return ageGroups.find(a => a.id === formData.ageGroup)?.name || t("common.tüm_yaşlar");
  };
  const getGenderText = () => {
    return genderOptions.find(g => g.id === formData.gender)?.name || t("common.belirtilmemiş");
  };
  const calculateDiscount = () => {
    if (formData.originalPrice && formData.originalPrice > formData.price) {
      return Math.round((formData.originalPrice - formData.price) / formData.originalPrice * 100);
    }
    return 0;
  };
  const mainImageUrl = formData.images && formData.images.length > 0 ? URL.createObjectURL(formData.images[0]) : t("common.https_via_placeholder_com_400x400_text_görsel_yok");
  return <div className="space-y-8">
      {/* Ürün Kartı Önizlemesi */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-lg">
        <div className="flex items-center mb-4">
          <Eye className="w-5 h-5 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">{t("common.ürün_kartı_önizlemesi")}</h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Sol - Görsel */}
          <div className="space-y-4">
            <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-200">
              <img src={mainImageUrl} alt={formData.name || 'Ürün'} className="w-full h-full object-cover" />
            </div>
            
            {/* Küçük Görseller */}
            {formData.images && formData.images.length > 1 && <div className="flex space-x-2 overflow-x-auto">
                {formData.images.slice(1, 5).map((image, index) => <div key={index} className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
                    <img src={URL.createObjectURL(image)} alt={`Görsel ${index + 2}`} className="w-full h-full object-cover" />
                  </div>)}
                {formData.images.length > 5 && <div className="flex-shrink-0 w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center border border-gray-300">
                    <span className="text-xs text-gray-600">+{formData.images.length - 5}</span>
                  </div>}
              </div>}
          </div>

          {/* Sağ - Bilgiler */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {formData.name || t("common.ürün_adı")}
              </h2>
              <p className="text-purple-600 font-medium">
                {formData.brand || t("common.marka_adı")}
              </p>
              <p className="text-sm text-gray-600">
                {getMainCategoryName()} → {getSubCategoryName()}
              </p>
            </div>

            {/* Fiyat */}
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-green-600">
                {formatPrice(formData.price || 0)}
              </span>
              {formData.originalPrice && formData.originalPrice > formData.price && <div className="flex items-center space-x-2">
                  <span className="text-lg text-gray-400 line-through">
                    {formatPrice(formData.originalPrice)}
                  </span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                    %{calculateDiscount()} İndirim
                  </span>
                </div>}
            </div>

            {/* Stok */}
            <div className="flex items-center space-x-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${formData.stock > 10 ? 'bg-green-100 text-green-800' : formData.stock > 0 ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>
                {formData.stock > 0 ? `${formData.stock} adet stokta` : t("common.stokta_yok")}
              </span>
            </div>

            {/* Özellikler */}
            <div className="space-y-3">
              {/* Cilt Tipi */}
              <div className="flex items-start space-x-2">
                <Heart className="w-4 h-4 text-pink-500 mt-1 flex-shrink-0" />
                <div>
                  <span className="font-medium">Uygun Cilt Tipi:</span>
                  <span className="ml-2 text-gray-600">{getSkinTypeNames()}</span>
                </div>
              </div>

              {/* Renk Seçenekleri */}
              {formData.hasShades && formData.selectedShades && formData.selectedShades.length > 0 && <div className="flex items-start space-x-2">
                  <Palette className="w-4 h-4 text-purple-500 mt-1 flex-shrink-0" />
                  <div>
                    <span className="font-medium">Renk Seçenekleri:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {formData.selectedShades.slice(0, 6).map(shadeId => {
                    const shade = colors.find(c => c.id === shadeId);
                    return shade ? <div key={shadeId} className="w-6 h-6 rounded-full border-2 border-white shadow-sm" style={{
                      backgroundColor: shade.hex
                    }} title={shade.name} /> : null;
                  })}
                      {formData.selectedShades.length > 6 && <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                          +{formData.selectedShades.length - 6}
                        </div>}
                    </div>
                  </div>
                </div>}

              {/* Hacim */}
              {formData.volume && <div className="flex items-center space-x-2">
                  <Tag className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Hacim:</span>
                  <span className="text-gray-600">{getVolumeText()}</span>
                </div>}
            </div>

            {/* Açıklama */}
            <div className="border-t pt-4">
              <p className="text-gray-700 text-sm">
                {formData.description || t("common.ürün_açıklaması")}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Detaylı Bilgiler */}
      <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("common.ürün_detayları")}</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Sol Kolon */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <Heart className="w-4 h-4 text-pink-500 mr-2" />{t("common.hedef_kullanıcı")}</h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>Cilt Tipi:</strong> {getSkinTypeNames()}</p>
                <p><strong>{t("common.yaş_grubu")}</strong> {getAgeGroupText()}</p>
                <p><strong>Cinsiyet:</strong> {getGenderText()}</p>
              </div>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <Palette className="w-4 h-4 text-purple-500 mr-2" />{t("common.fiziksel_özellikler")}</h4>
              <div className="text-sm text-gray-600 space-y-1">
                {formData.volume && <p><strong>Hacim:</strong> {getVolumeText()}</p>}
                {formData.spfValue && <p><strong>SPF:</strong> {getSPFText()}</p>}
                {formData.finishType && <p><strong>Finish:</strong> {getFinishText()}</p>}
                {formData.coverageType && <p><strong>Coverage:</strong> {getCoverageText()}</p>}
                {formData.hasShades && <p><strong>Renk Seçenekleri:</strong> {getSelectedShadeNames()}</p>}
              </div>
            </div>
          </div>

          {/* Sağ Kolon */}
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <Shield className="w-4 h-4 text-green-500 mr-2" />{t("common.i_çerik_özellikleri")}</h4>
              <p className="text-sm text-gray-600">{getContentFeatureNames()}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <Sparkles className="w-4 h-4 text-orange-500 mr-2" />{t("common.özel_özellikler")}</h4>
              <p className="text-sm text-gray-600">{getSpecialFeatureNames()}</p>
            </div>

            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h4 className="font-medium text-gray-900 mb-2">
                💰 Fiyat Bilgileri
              </h4>
              <div className="text-sm text-gray-600 space-y-1">
                <p><strong>{t("common.satış_fiyatı")}</strong> {formatPrice(formData.price || 0)}</p>
                {formData.originalPrice > 0 && <p><strong>Eski Fiyat:</strong> {formatPrice(formData.originalPrice)}</p>}
                <p><strong>Stok:</strong> {formData.stock} adet</p>
                <p><strong>KDV:</strong> %{formData.vatRate}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SEO Ayarları */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-center mb-4">
          <Search className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">{t("common.seo_ayarları_opsiyonel")}</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("common.seo_başlığı_önerilir_50_60_karakter")}</label>
            <input type="text" value={formData.seoTitle} onChange={e => updateFormData('seoTitle', e.target.value)} placeholder={`${formData.name} - ${formData.brand} | Kozmetik`} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" maxLength={60} />
            <p className="text-xs text-gray-500 mt-1">
              {formData.seoTitle.length}/60 karakter
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("common.seo_açıklaması_önerilir_120_160_karakter")}</label>
            <textarea value={formData.seoDescription} onChange={e => updateFormData('seoDescription', e.target.value)} placeholder={t("common.ürününüzün_kısa_ve_çekici_açıklaması")} rows={3} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" maxLength={160} />
            <p className="text-xs text-gray-500 mt-1">
              {formData.seoDescription.length}/160 karakter
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("common.anahtar_kelimeler_virgülle_ayırın")}</label>
            <input type="text" value={formData.seoKeywords?.join(', ') || ''} onChange={e => {
            const keywords = e.target.value.split(',').map(k => k.trim()).filter(k => k);
            updateFormData('seoKeywords', keywords);
          }} placeholder={t("common.kozmetik_bakım_güzellik_cilt_bakımı")} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>
        </div>
      </div>

      {/* Kullanım Bilgileri Özeti */}
      {formData.usageInstructions && <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t("common.kullanım_bilgileri")}</h3>
          <div className="space-y-3">
            <div>
              <h4 className="font-medium text-gray-900">{t("common.kullanım_talimatları")}</h4>
              <p className="text-sm text-gray-700 mt-1">{formData.usageInstructions}</p>
            </div>
            {formData.ingredients && <div>
                <h4 className="font-medium text-gray-900">{t("common.i_çerik_listesi")}</h4>
                <p className="text-sm text-gray-700 mt-1">{formData.ingredients}</p>
              </div>}
            {formData.warnings && <div>
                <h4 className="font-medium text-gray-900">{t("common.uyarılar")}</h4>
                <p className="text-sm text-red-600 mt-1">{formData.warnings}</p>
              </div>}
          </div>
        </div>}

      {/* Form Tamamlanma Durumu */}
      <div className="bg-green-50 p-6 rounded-xl border border-green-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          ✅ Form Tamamlanma Durumu
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>{t("common.ürün_bilgileri")}</span>
              <span className="text-green-600 font-medium">{t("common.tamamlandı")}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>{t("common.kozmetik_özellikleri")}</span>
              <span className="text-green-600 font-medium">{t("common.tamamlandı")}</span>
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span>{t("common.ürün_görselleri")}</span>
              <span className={formData.images && formData.images.length > 0 ? 'text-green-600 font-medium' : 'text-yellow-600'}>
                {formData.images && formData.images.length > 0 ? t("common.tamamlandı") : '⚠ Opsiyonel'}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>{t("common.seo_ayarları")}</span>
              <span className="text-yellow-600">⚠ Opsiyonel</span>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
export default OnizlemeKaydetStep;