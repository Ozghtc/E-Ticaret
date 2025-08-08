import React from 'react';
import { useTranslation } from 'react-i18next';
import { Package } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { colors } from '../data/colors';

interface VariantTableProps {
  formData: FormData;
  sizeSystem: any;
  variants: any[];
  updateVariant: (variantId: string, field: any, value: any) => void;
}

export default function VariantTable({ formData, sizeSystem, variants, updateVariant }: VariantTableProps) {
  const getColorById = (colorId: string) => {
    return colors.find(color => color.id === colorId);
  };

  if (formData.selectedSizes.length === 0 || formData.selectedColors.length === 0) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Varyant Özeti - Sadece Özet */}
      <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
        <h4 className="font-medium text-purple-800 mb-3">Varyant Özeti:</h4>
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
          <h5 className="font-medium text-purple-800 mb-2">Seçilen Bedenler:</h5>
          <div className="flex flex-wrap gap-2">
            {formData.selectedSizes.map((size) => (
              <span key={size} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                {sizeSystem?.sizes.find(s => s.value === size)?.label || size}
              </span>
            ))}
          </div>
        </div>

        {/* Seçilen Renkler */}
        <div className="mt-4">
          <h5 className="font-medium text-purple-800 mb-2">Seçilen Renkler:</h5>
          <div className="flex flex-wrap gap-2">
            {formData.selectedColors.map((colorId) => {
              const color = getColorById(colorId);
              return color ? (
                <span key={colorId} className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2 border border-gray-300"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  {color.name}
                </span>
              ) : null;
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
        <p className="text-gray-600 text-sm mb-4">
          Her beden-renk kombinasyonu için detaylı fiyat ve stok yönetimi
        </p>
        
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
              {formData.selectedSizes.map((size) =>
                formData.selectedColors.map((colorId) => {
                  const color = getColorById(colorId);
                  const variantId = `${size}-${colorId}`;
                  const variant = variants.find(v => v.id === variantId);
                  const variantPrice = variant?.price || formData.price;
                  const variantOriginalPrice = variant?.originalPrice || Math.round(formData.price * 1.25);
                  const variantStock = variant?.stock || 0;
                  const variantSku = variant?.sku || `SKU-${size}-${colorId.substring(0,3).toUpperCase()}`;
                  
                  const kdvDahilPrice = variantPrice * (formData.vatRate === '%8' ? 1.08 : 1.20);
                  const discountPercent = variantOriginalPrice > variantPrice ? 
                    Math.round(((variantOriginalPrice - variantPrice) / variantOriginalPrice) * 100) : 0;
                  
                  return (
                    <tr key={variantId} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="p-3">
                        <span className="font-medium">{sizeSystem?.sizes.find(s => s.value === size)?.label || size}</span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center">
                          <div 
                            className="w-4 h-4 rounded-full mr-2 border border-gray-300"
                            style={{ backgroundColor: color?.hex }}
                          ></div>
                          <span>{color?.name}</span>
                        </div>
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          value={variantStock}
                          onChange={(e) => updateVariant(variantId, 'stock', parseInt(e.target.value) || 0)}
                          className="w-20 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-pink-500"
                          placeholder="0"
                        />
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={variantPrice}
                          onChange={(e) => {
                            const newPrice = parseFloat(e.target.value) || 0;
                            updateVariant(variantId, 'price', newPrice);
                            // Eski fiyat otomatik güncelle (eğer değiştirilmemişse)
                            if (variantOriginalPrice === Math.round(variantPrice * 1.25) || variantOriginalPrice === 0) {
                              updateVariant(variantId, 'originalPrice', Math.round(newPrice * 1.25));
                            }
                          }}
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-pink-500"
                          placeholder="0.00"
                        />
                        <div className="text-xs text-gray-500 mt-1">Ana satış fiyatı</div>
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={variantOriginalPrice}
                          onChange={(e) => updateVariant(variantId, 'originalPrice', parseFloat(e.target.value) || 0)}
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-center focus:ring-2 focus:ring-orange-500"
                          placeholder="Otomatik"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {discountPercent > 0 ? `%${discountPercent} indirim` : 'İndirim için'}
                        </div>
                      </td>
                      <td className="p-3">
                        <input
                          type="number"
                          disabled
                          value={kdvDahilPrice.toFixed(2)}
                          className="w-24 px-2 py-1 border border-gray-300 rounded text-center bg-gray-50 text-gray-600"
                          placeholder="Otomatik"
                        />
                        <div className="text-xs text-gray-500 mt-1">
                          {formData.vatRate} KDV dahil
                        </div>
                      </td>
                      <td className="p-3">
                        <input
                          type="text"
                          value={variantSku}
                          onChange={(e) => updateVariant(variantId, 'sku', e.target.value)}
                          className="w-32 px-2 py-1 border border-gray-300 rounded text-xs focus:ring-2 focus:ring-pink-500"
                          placeholder="SKU kodu"
                        />
                        <div className="text-xs text-gray-500 mt-1">Ürün kodu</div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
        
        {/* Toplu İşlemler */}
        <div className="mt-6 flex flex-wrap gap-3">
          <button 
            onClick={() => {
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
                alert('Tüm varyantlara aynı fiyat uygulandı!');
              }
            }}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm"
          >
            Tüm Varyantlara Aynı Fiyat
          </button>
          <button 
            onClick={() => {
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
              alert('Eski fiyatlar otomatik ayarlandı (%25 fazla)!');
            }}
            className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 text-sm"
          >
            Eski Fiyatları Otomatik Ayarla
          </button>
          <button 
            onClick={() => {
              const totalVariants = formData.selectedSizes.length * formData.selectedColors.length;
              const stockPerVariant = Math.floor(formData.stock / totalVariants);
              
              formData.selectedSizes.forEach(size => {
                formData.selectedColors.forEach(colorId => {
                  const color = getColorById(colorId);
                  if (color) {
                    const variantId = `${size}-${color.name}`;
                    updateVariant(variantId, 'stock', stockPerVariant);
                  }
                });
              });
              alert(`Stok eşit dağıtıldı! Her varyanta ${stockPerVariant} adet.`);
            }}
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 text-sm"
          >
            Stokları Eşit Dağıt
          </button>
          <button 
            onClick={() => {
              formData.selectedSizes.forEach(size => {
                formData.selectedColors.forEach(colorId => {
                  const color = getColorById(colorId);
                  if (color) {
                    const variantId = `${size}-${color.name}`;
                    const newSku = `${formData.name.substring(0,3).toUpperCase()}-${size}-${color.name.substring(0,3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
                    updateVariant(variantId, 'sku', newSku);
                  }
                });
              });
              alert('SKU kodları otomatik oluşturuldu!');
            }}
            className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 text-sm"
          >
            SKU Otomatik Oluştur
          </button>
          <button 
            onClick={() => {
              alert('SEO oluşturma özelliği 3. adımda (Önizleme & Kaydet) bulunmaktadır.');
            }}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 text-sm"
          >
            🔍 SEO Oluşturma ve Değerlendirme
          </button>
        </div>
        
        {/* Fiyat Bilgilendirme */}
        <div className="mt-6 bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-3">💡 Varyant Fiyat Sistemi:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <h5 className="font-medium mb-2">Otomatik Hesaplamalar:</h5>
              <ul className="space-y-1">
                <li>• <strong>Eski Fiyat:</strong> Satış fiyatının %25 fazlası (değiştirilebilir)</li>
                <li>• <strong>KDV Dahil:</strong> Seçilen KDV oranına göre otomatik</li>
                <li>• <strong>İndirim %:</strong> (Eski fiyat - Satış fiyatı) / Eski fiyat</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">Kullanım İpuçları:</h5>
              <ul className="space-y-1">
                <li>• Satış fiyatı yazınca eski fiyat otomatik dolar</li>
                <li>• Eski fiyatı manuel değiştirebilirsiniz</li>
                <li>• KDV dahil fiyat otomatik hesaplanır</li>
                <li>• Her varyant için farklı fiyat belirleyebilirsiniz</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}