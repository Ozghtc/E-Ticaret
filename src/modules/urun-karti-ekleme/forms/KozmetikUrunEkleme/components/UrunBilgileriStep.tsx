// 📝 Kozmetik Ürün Bilgileri - Adım 1
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Package, Tag, DollarSign, Warehouse } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { mainCategories, getSubCategories } from '../data/categories';
import CountrySelector from '../../shared-data/CountrySelector';
interface UrunBilgileriStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  updateMultipleFields: (updates: Partial<FormData>) => void;
}
function UrunBilgileriStep({
  formData,
  updateFormData,
  updateMultipleFields
}: UrunBilgileriStepProps) {
  const subCategories = getSubCategories(formData.mainCategory);
  const handleMainCategoryChange = (categoryId: string) => {
    updateMultipleFields({
      mainCategory: categoryId,
      subCategory1: '',
      // Alt kategoriyi sıfırla
      subCategory2: ''
    });
  };
  return <div className="space-y-8">
      {/* Kategori Seçimi */}
      <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
        <div className="flex items-center mb-4">
          <Package className="w-5 h-5 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">{t("common.kategori_seçimi")}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ana Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ana Kategori <span className="text-red-500">*</span>
            </label>
            <select value={formData.mainCategory} onChange={e => handleMainCategoryChange(e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" required>
              <option value="">Kategori seçin...</option>
              {mainCategories.map(category => <option key={category.id} value={category.id}>
                  {category.emoji} {category.name}
                </option>)}
            </select>
          </div>

          {/* Alt Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alt Kategori <span className="text-red-500">*</span>
            </label>
            <select value={formData.subCategory1} onChange={e => updateFormData('subCategory1', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent" disabled={!formData.mainCategory} required>
              <option value="">{t("common.alt_kategori_seçin")}</option>
              {subCategories.map(category => <option key={category.id} value={category.id}>
                  {category.emoji} {category.name}
                </option>)}
            </select>
          </div>
        </div>

        {/* Seçilen Kategori Özeti */}
        {formData.mainCategory && formData.subCategory1 && <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
            <p className="text-sm text-purple-800">
              <strong>{t("common.seçilen_kategori")}</strong> {' '}
              {mainCategories.find(c => c.id === formData.mainCategory)?.name} → {' '}
              {subCategories.find(c => c.id === formData.subCategory1)?.name}
            </p>
          </div>}
      </div>

      {/* Temel Ürün Bilgileri */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-center mb-4">
          <Tag className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">{t("common.temel_ürün_bilgileri")}</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("common.ürün_adı")}<span className="text-red-500">*</span>
            </label>
            <input type="text" value={formData.name} onChange={e => updateFormData('name', e.target.value)} placeholder={t("common.örn_nemlendirici_yüz_kremi")} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marka <span className="text-gray-400 text-xs">(Opsiyonel)</span>
            </label>
            <input type="text" value={formData.brand} onChange={e => updateFormData('brand', e.target.value)} placeholder={t("common.örn_l_or_al")} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model/Seri
            </label>
            <input type="text" value={formData.model} onChange={e => updateFormData('model', e.target.value)} placeholder={t("common.örn_hydra_genius")} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Barkod
            </label>
            <input type="text" value={formData.barcode} onChange={e => updateFormData('barcode', e.target.value)} placeholder={t("common.13_haneli_barkod_numarası")} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("common.menşei")}</label>
            <CountrySelector value={formData.origin} onChange={value => updateFormData('origin', value)} placeholder={t("common.menşei_seçin_veya_yazın_örn_tur_amer")} className="" />
          </div>
        </div>

        {/* Ürün Açıklaması */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ürün Açıklaması <span className="text-gray-400 text-xs">(Opsiyonel)</span>
          </label>
          <textarea value={formData.description} onChange={e => updateFormData('description', e.target.value)} placeholder={t("common.ürününüzün_detaylı_açıklamasını_yazın")} rows={4} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
        </div>
      </div>

      {/* Fiyat & Stok */}
      <div className="bg-green-50 p-6 rounded-xl border border-green-200">
        <div className="flex items-center mb-4">
          <DollarSign className="w-5 h-5 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Fiyat & Stok Bilgileri</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Satış Fiyatı {t('common.currencyTL')} <span className="text-red-500">*</span>
            </label>
            <input type="number" value={formData.price || ''} onChange={e => updateFormData('price', parseFloat(e.target.value) || 0)} placeholder="0.00" min="0" step="0.01" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" required />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Eski Fiyat {t('common.currencyTL')}
              <span className="text-red-500 text-xs block">{t("common.i_ndirim_göstermek_için_kullanın")}</span>
            </label>
            <input type="number" value={formData.originalPrice || ''} onChange={e => updateFormData('originalPrice', parseFloat(e.target.value) || 0)} placeholder="0.00" min="0" step="0.01" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Toplam Stok <span className="text-gray-400 text-xs">(Opsiyonel)</span>
            </label>
            <input type="number" value={formData.stock || ''} onChange={e => updateFormData('stock', parseInt(e.target.value) || 0)} placeholder="0" min="0" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
        </div>

        {/* Tedarikçi Bilgileri */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-white rounded-lg border border-green-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("common.alış_fatura_no")}</label>
            <input type="text" value={formData.invoiceNumber} onChange={e => updateFormData('invoiceNumber', e.target.value)} placeholder={t("common.fatura_numarası")} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              💰 Alış Fiyatı {t('common.currencyTL')}
            </label>
            <input type="number" value={formData.purchasePrice || ''} onChange={e => updateFormData('purchasePrice', parseFloat(e.target.value) || 0)} placeholder="0.00" min="0" step="0.01" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent" />
          </div>
        </div>

        {/* Vergi & Hazırlık */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("common.kdv_oranı")}</label>
            <select value={formData.vatRate} onChange={e => updateFormData('vatRate', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value="1">%1</option>
              <option value="10">%10</option>
              <option value="20">%20</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">{t("common.hazırlık_süresi")}</label>
            <select value={formData.preparationTime} onChange={e => updateFormData('preparationTime', e.target.value)} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent">
              <option value={t("common.aynı_gün")}>{t("common.aynı_gün")}</option>
              <option value={t("common.1_3_gün")}>{t("common.1_3_gün")}</option>
              <option value={t("common.3_7_gün")}>{t("common.3_7_gün")}</option>
              <option value="1-2 hafta">1-2 hafta</option>
            </select>
          </div>
        </div>
      </div>
    </div>;
}
export default UrunBilgileriStep;