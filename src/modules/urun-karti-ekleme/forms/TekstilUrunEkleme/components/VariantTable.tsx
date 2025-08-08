import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Package, CheckCircle, X } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { colors } from '../data/colors';
interface VariantTableProps {
  formData: FormData;
  sizeSystem: any;
  variants: any[];
  updateVariant: (variantId: string, field: any, value: any) => void;
}
export default function VariantTable({
  formData,
  sizeSystem,
  variants,
  updateVariant
}: VariantTableProps) {
  const [toastMessage, setToastMessage] = useState('');
  const [showToast, setShowToast] = useState(false);
  const getColorById = (colorId: string) => {
    return colors.find(color => color.id === colorId);
  };

  // Toast notification sistemi
  const showToastNotification = (message: string) => {
    setToastMessage(message);
    setShowToast(true);
  };

  // Toast'ı otomatik kapat
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 3000); // 3 saniye sonra kaybol
      return () => clearTimeout(timer);
    }
  }, [showToast]);
  const closeToast = () => {
    setShowToast(false);
  };
  if (formData.selectedSizes.length === 0 || formData.selectedColors.length === 0) {
    return null;
  }
  return <div className="space-y-8">
      {/* Toast Notification */}
      {showToast && <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg flex items-center space-x-3 animate-pulse">
          <CheckCircle size={20} />
          <span className="font-medium">{toastMessage}</span>
          <button onClick={closeToast} className="ml-2 text-white hover:text-gray-200">
            <X size={16} />
          </button>
        </div>}
      
      {/* Varyant Özeti - Sadece Özet */}
      <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
        <h4 className="font-medium text-purple-800 mb-3">{t("common.varyant_özeti")}</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-purple-600">Bedenler:</span>
            <div className="font-bold text-purple-900">{formData.selectedSizes.length}</div>
          </div>
          <div>
            <span className="text-purple-600">Renkler:</span>
            <div className="font-bold text-purple-900">{formData.selectedColors.length}</div>
          </div>
          <div>
            <span className="text-purple-600">Toplam Varyant:</span>
            <div className="font-bold text-purple-900">{formData.selectedSizes.length * formData.selectedColors.length}</div>
          </div>
          <div>
            <span className="text-purple-600">Toplam Stok:</span>
            <div className="font-bold text-purple-900">{formData.stock} adet</div>
          </div>
        </div>

        {/* Seçilen Bedenler */}
        <div className="mt-4">
          <h5 className="font-medium text-purple-800 mb-2">{t("common.seçilen_bedenler")}</h5>
          <div className="flex flex-wrap gap-2">
            {formData.selectedSizes.map(size => <span key={size} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                {sizeSystem?.sizes.find(s => s.value === size)?.label || size}
              </span>)}
          </div>
        </div>

        {/* Seçilen Renkler */}
        <div className="mt-4">
          <h5 className="font-medium text-purple-800 mb-2">{t("common.seçilen_renkler")}</h5>
          <div className="flex flex-wrap gap-2">
            {formData.selectedColors.map(colorId => {
            const color = getColorById(colorId);
            return color ? <span key={colorId} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2 border border-gray-300" style={{
                backgroundColor: color.hex
              }}></div>
                  {color.name}
                </span> : null;
          })}
          </div>
        </div>
      </div>

      {/* Varyant Detay Tablosu */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Package className="mr-2" size={20} />
          Varyant Detayları
        </h3>
        <p className="text-gray-600 text-sm mb-4">{t("common.her_beden_renk_kombinasyonu_için_detaylı_fiyat_ve_stok_yönetimi")}</p>
        
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left p-3 font-medium text-gray-700">Beden</th>
                <th className="text-left p-3 font-medium text-gray-700">Renk</th>
                <th className="text-left p-3 font-medium text-gray-700">Stok</th>
                <th className="text-left p-3 font-medium text-gray-700">Fiyat {t('common.currencyTL')}</th>
                <th className="text-left p-3 font-medium text-gray-700">Eski Fiyat {t('common.currencyTL')}</th>
                <th className="text-left p-3 font-medium text-gray-700">KDV Dahil {t('common.currencyTL')}</th>
                <th className="text-left p-3 font-medium text-gray-700">SKU</th>
              </tr>
            </thead>
            <tbody>
              {formData.selectedSizes.map(size => formData.selectedColors.map(colorId => {
              const color = getColorById(colorId);
              const variantId = `${size}-${colorId}`;
              const variant = variants.find(v => v.id === variantId);
              const variantPrice = variant?.price || formData.price;
              const variantOriginalPrice = variant?.originalPrice || Math.round(formData.price * 1.25);
              const variantStock = variant?.stock || 0;
              const variantSku = variant?.sku || `SKU-${size}-${colorId.substring(0, 3).toUpperCase()}`;
              const kdvDahilPrice = variantPrice * (formData.vatRate === '%8' ? 1.08 : 1.20);
              const discountPercent = variantOriginalPrice > variantPrice ? Math.round((variantOriginalPrice - variantPrice) / variantOriginalPrice * 100) : 0;
              return <tr key={variantId} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="p-3">
                        <span className="font-medium">{sizeSystem?.sizes.find(s => s.value === size)?.label || size}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <div className="w-4 h-4 rounded-full mr-2 border border-gray-300" style={{
                      backgroundColor: color?.hex
                    }}></div>
                          <span>{color?.name}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <input type="number" min="0" value={variantStock} onChange={e => updateVariant(variantId, 'stock', parseInt(e.target.value) || 0)} className="w-20 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-pink-500" placeholder="0" />
                      </td>
                      <td className="p-3">
                        <input type="number" min="0" step="0.01" value={variantPrice} onChange={e => {
                    const newPrice = parseFloat(e.target.value) || 0;
                    updateVariant(variantId, 'price', newPrice);
                    // Eski fiyat otomatik güncelle (eğer değiştirilmemişse)
                    if (variantOriginalPrice === Math.round(variantPrice * 1.25) || variantOriginalPrice === 0) {
                      updateVariant(variantId, 'originalPrice', Math.round(newPrice * 1.25));
                    }
                  }} className="w-24 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-pink-500" placeholder="0.00" />
                        <div className="text-xs text-gray-500 mt-1">{t("common.ana_satış_fiyatı")}</div>
                      </td>
                      <td className="p-3">
                        <input type="number" min="0" step="0.01" value={variantOriginalPrice} onChange={e => updateVariant(variantId, 'originalPrice', parseFloat(e.target.value) || 0)} className="w-24 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-orange-500" placeholder="Otomatik" />
                        <div className="text-xs text-gray-500 mt-1">
                          {discountPercent > 0 ? `%${discountPercent} indirim` : t("common.i_ndirim_için")}
                        </div>
                      </td>
                      <td className="p-3">
                        <input type="number" disabled value={kdvDahilPrice.toFixed(2)} className="w-24 px-2 py-1 border border-gray-300 rounded text-center bg-gray-50 text-gray-600" placeholder="Otomatik" />
                        <div className="text-xs text-gray-500 mt-1">
                          {formData.vatRate} KDV dahil
                        </div>
                      </td>
                      <td className="p-3">
                        <input type="text" value={variantSku} onChange={e => updateVariant(variantId, 'sku', e.target.value)} className="w-32 px-2 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-pink-500" placeholder="SKU kodu" />
                        <div className="text-xs text-gray-500 mt-1">{t("common.ürün_kodu")}</div>
                      </td>
                    </tr>;
            }))}
            </tbody>
          </table>
        </div>
        
        {/* Toplu İşlemler */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button onClick={() => {
          const price = formData.price;
          if (price > 0) {
            formData.selectedSizes.forEach(size => {
              formData.selectedColors.forEach(colorId => {
                const color = getColorById(colorId);
                if (color) {
                  const variantId = `${size}-${color.name}`;
                  updateVariant(variantId, 'price', price);
                }
              });
            });
            showToastNotification(t("common.tüm_varyantlara_aynı_fiyat_uygulandı"));
          }
        }} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">{t("common.tüm_varyantlara_aynı_fiyat")}</button>
          <button onClick={() => {
          formData.selectedSizes.forEach(size => {
            formData.selectedColors.forEach(colorId => {
              const color = getColorById(colorId);
              if (color) {
                const variantId = `${size}-${color.name}`;
                const variant = variants.find(v => v.id === variantId);
                const currentPrice = variant?.price || formData.price;
                const newOriginalPrice = Math.round(currentPrice * 1.25);
                updateVariant(variantId, 'originalPrice', newOriginalPrice);
              }
            });
          });
          showToastNotification(t("common.eski_fiyatlar_otomatik_ayarlandı_25_fazla"));
        }} className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 text-sm">{t("common.eski_fiyatları_otomatik_ayarla")}</button>
          <button onClick={() => {
          // Stok kontrolü
          if (!formData.stock || formData.stock <= 0) {
            showToastNotification(t("common.önce_toplam_stok_adedini_girmeniz_gerekiyor"));
            return;
          }
          const totalVariants = formData.selectedSizes.length * formData.selectedColors.length;
          const stockPerVariant = Math.floor(formData.stock / totalVariants);
          if (stockPerVariant === 0) {
            showToastNotification(t("common.stok_miktarı_varyant_sayısından_az_olduğu_için_dağıtım_yapılamıyor"));
            return;
          }
          formData.selectedSizes.forEach(size => {
            formData.selectedColors.forEach(colorId => {
              const color = getColorById(colorId);
              if (color) {
                const variantId = `${size}-${color.name}`;
                updateVariant(variantId, 'stock', stockPerVariant);
              }
            });
          });
          showToastNotification(`📦 Stok eşit dağıtıldı! Her varyanta ${stockPerVariant} adet.`);
        }} className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm">{t("common.stokları_eşit_dağıt")}</button>
          <button onClick={() => {
          formData.selectedSizes.forEach(size => {
            formData.selectedColors.forEach(colorId => {
              const color = getColorById(colorId);
              if (color) {
                const variantId = `${size}-${color.name}`;
                const newSku = `${formData.name.substring(0, 3).toUpperCase()}-${size}-${color.name.substring(0, 3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
                updateVariant(variantId, 'sku', newSku);
              }
            });
          });
          showToastNotification(t("common.sku_kodları_otomatik_oluşturuldu"));
        }} className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm">{t("common.sku_otomatik_oluştur")}</button>
          <button onClick={() => {
          showToastNotification(t("common.seo_oluşturma_özelliği_4_adımda_önizleme_kaydet_bulunmaktadır"));
        }} className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm">{t("common.seo_oluşturma_ve_değerlendirme")}</button>
        </div>
        
        {/* Fiyat Bilgilendirme */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-3">💡 Varyant Fiyat Sistemi:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h5 className="font-medium mb-2">Otomatik Hesaplamalar:</h5>
              <ul className="space-y-1">
                <li>• <strong>Eski Fiyat:</strong>{t("common.satış_fiyatının_25_fazlası_değiştirilebilir")}</li>
                <li>• <strong>KDV Dahil:</strong>{t("common.seçilen_kdv_oranına_göre_otomatik")}</li>
                <li>• <strong>{t("common.i_ndirim")}</strong>{t("common.eski_fiyat_satış_fiyatı_eski_fiyat")}</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">{t("common.kullanım_i_puçları")}</h5>
              <ul className="space-y-1">
                <li>{t("common.satış_fiyatı_yazınca_eski_fiyat_otomatik_dolar")}</li>
                <li>{t("common.eski_fiyatı_manuel_değiştirebilirsiniz")}</li>
                <li>{t("common.kdv_dahil_fiyat_otomatik_hesaplanır")}</li>
                <li>{t("common.her_varyant_için_farklı_fiyat_belirleyebilirsiniz")}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>;
}