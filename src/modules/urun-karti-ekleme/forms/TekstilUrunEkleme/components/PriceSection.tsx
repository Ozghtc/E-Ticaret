import React from 'react';
import { useTranslation } from 'react-i18next';
import { DollarSign } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { vatRates, preparationTimes } from '../data/specs';
import { formatPrice } from '../utils/helpers';
interface PriceSectionProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}
export default function PriceSection({
  formData,
  updateFormData
}: PriceSectionProps) {
  return <div className="bg-white rounded-lg p-6 border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
        <DollarSign className="mr-2" size={20} />
        Fiyat & Stok Bilgileri
      </h3>
      
      {/* Ana Fiyat Bilgileri - Yeşil Kutucuk */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-8">
        <h4 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
          💰 Fiyat Bilgileri
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Satış Fiyatı {t('common.currencyTL')} <span className="text-red-500">*</span>
            </label>
            <input type="number" required min="0" step="0.01" value={formData.price || ''} onChange={e => {
            const newPrice = parseFloat(e.target.value) || 0;
            updateFormData('price', newPrice);

            // Otomatik hesaplamalar
            if (newPrice > 0) {
              // Eski fiyat otomatik doldur (eğer boşsa)
              if (!formData.originalPrice || formData.originalPrice === 0) {
                const suggestedOriginalPrice = Math.round(newPrice * 1.25); // %25 daha yüksek
                updateFormData('originalPrice', suggestedOriginalPrice);
              }
            }
          }} className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white" placeholder="0.00" />
            <p className="text-xs text-green-600 mt-1">{t("common.ana_satış_fiyatınız")}</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Eski Fiyat {t('common.currencyTL')}
            </label>
            <input type="number" min="0" step="0.01" value={formData.originalPrice || ''} onChange={e => updateFormData('originalPrice', parseFloat(e.target.value) || 0)} className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white" placeholder="Otomatik doldurulur" />
            <p className="text-xs text-red-600 mt-1">
              {formData.originalPrice > formData.price && formData.price > 0 ? `%${Math.round((formData.originalPrice - formData.price) / formData.originalPrice * 100)} indirim` : t("common.i_ndirim_göstermek_için_kullanın")}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              Toplam Stok Adedi <span className="text-gray-400 text-xs">(Opsiyonel)</span>
            </label>
            <input type="number" min="0" value={formData.stock || ''} onChange={e => updateFormData('stock', parseInt(e.target.value) || 0)} className="w-full px-4 py-3 border border-green-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 bg-white" placeholder={t("common.kaç_adet_stokta")} />
            <p className="text-xs text-green-600 mt-1">{t("common.toplam_stok_miktarı")}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-green-700 mb-2">
              KDV Dahil Fiyat {t('common.currencyTL')}
            </label>
            <input type="number" disabled value={formData.price > 0 ? (formData.price * (formData.vatRate === '%8' ? 1.08 : 1.20)).toFixed(2) : ''} className="w-full px-4 py-3 border border-green-300 rounded-lg bg-green-100 text-green-700" placeholder={t("common.otomatik_hesaplanır")} />
            <p className="text-xs text-green-600 mt-1">
              {formData.vatRate} KDV dahil fiyat
            </p>
          </div>
        </div>
      </div>

      {/* KDV ve Hazırlık Süresi - Turuncu Kutucuk */}
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
        <h4 className="text-lg font-semibold text-orange-800 mb-4 flex items-center">{t("common.vergi_hazırlık_ayarları")}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-orange-700 mb-2">
              {vatRates.emoji} {vatRates.name}
            </label>
            <select value={formData.vatRate} onChange={e => {
            updateFormData('vatRate', e.target.value);
            // KDV dahil fiyat otomatik güncellenecek
          }} className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white">
              {vatRates.options.map(rate => <option key={rate} value={rate}>{rate}</option>)}
            </select>
            <p className="text-xs text-orange-600 mt-1">{t("common.vergi_oranı_seçimi")}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-orange-700 mb-2">
              {preparationTimes.emoji} {preparationTimes.name}
            </label>
            <select value={formData.preparationTime} onChange={e => updateFormData('preparationTime', e.target.value)} className="w-full px-4 py-3 border border-orange-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white">
              {preparationTimes.options.map(time => <option key={time} value={time}>{time}</option>)}
            </select>
            <p className="text-xs text-orange-600 mt-1">{t("common.ürün_hazırlama_süresi")}</p>
          </div>
        </div>
      </div>

      {/* Tedarikçi Bilgileri - Ayrı Mavi Kutucuk */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">{t("common.tedarikçi_bilgileri")}</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">
              📄 Alış Fatura No
            </label>
            <input type="text" value={formData.invoiceNumber} onChange={e => updateFormData('invoiceNumber', e.target.value)} className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white" placeholder={t("common.örn_ft_2025_001")} />
            <p className="text-xs text-blue-600 mt-1">{t("common.tedarikçi_fatura_numarası")}</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-blue-700 mb-2">
              💰 Alış Fiyatı {t('common.currencyTL')}
            </label>
            <input type="number" min="0" step="0.01" value={formData.purchasePrice || ''} onChange={e => updateFormData('purchasePrice', parseFloat(e.target.value) || 0)} className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white" placeholder="0.00" />
            <p className="text-xs text-blue-600 mt-1">{t("common.tedarikçiden_aldığınız_fiyat")}</p>
          </div>
        </div>
      </div>

      {/* Fiyat Özeti */}
      {formData.price > 0 && <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
          <h4 className="font-medium text-green-800 mb-3">{t("common.fiyat_özeti")}</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
            {formData.purchasePrice > 0 && <div>
                <span className="text-blue-600">{t("common.alış_fiyatı")}</span>
                <div className="font-bold text-blue-900">{formatPrice(formData.purchasePrice)}</div>
              </div>}
            <div>
              <span className="text-green-600">{t("common.satış_fiyatı")}</span>
              <div className="font-bold text-green-900 text-lg">{formatPrice(formData.price)}</div>
            </div>
            {formData.originalPrice > 0 && <>
                <div>
                  <span className="text-green-600">Eski Fiyat:</span>
                  <div className="font-medium text-gray-600 line-through">{formatPrice(formData.originalPrice)}</div>
                </div>
                <div>
                  <span className="text-green-600">İndirim:</span>
                  <div className="font-bold text-red-600">%{Math.round((formData.originalPrice - formData.price) / formData.originalPrice * 100)}</div>
                </div>
              </>}
            <div>
              <span className="text-green-600">KDV Dahil:</span>
              <div className="font-medium text-green-900">
                {formatPrice(formData.price * (formData.vatRate === '%8' ? 1.08 : 1.20))}
              </div>
            </div>
            <div>
              <span className="text-green-600">{t("common.kar_marjı")}</span>
              <div className="font-medium text-blue-600">
                {formData.purchasePrice > 0 && formData.price > formData.purchasePrice ? `${formatPrice(formData.price - formData.purchasePrice)}` : formData.originalPrice > formData.price ? `${formatPrice(formData.originalPrice - formData.price)}` : t("common.hesaplanmadı")}
              </div>
            </div>
          </div>
          
          {/* Fiyat Bilgilendirme */}
          <div className="mt-4 p-3 bg-blue-100 rounded-lg">
            <h5 className="font-medium text-blue-800 mb-2">💡 Fiyat Bilgilendirme:</h5>
            <div className="text-xs text-blue-700 space-y-1">
              <p>• <strong>{t("common.alış_fiyatı")}</strong>{t("common.tedarikçiden_aldığınız_maliyet_fiyatı")}</p>
              <p>• <strong>{t("common.satış_fiyatı")}</strong>{t("common.müşterinin_ödeyeceği_ana_fiyat")}</p>
              <p>• <strong>Eski Fiyat:</strong>{t("common.i_ndirim_göstermek_için_opsiyonel")}</p>
              <p>• <strong>KDV Dahil:</strong> Vergi dahil toplam fiyat</p>
              <p>• <strong>{t("common.kar_marjı")}</strong>{t("common.satış_fiyatı_alış_fiyatı_farkı_gerçek_kar")}</p>
            </div>
          </div>
        </div>}
    </div>;
}