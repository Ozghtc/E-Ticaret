import React, { useRef, useEffect, useState } from 'react';
import { Palette, Ruler, Upload, Camera, DollarSign, Package } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { useSizeSystem } from '../hooks/useSizeSystem';
import { useVariants } from '../hooks/useVariants';
import { colors, getColorsByCategory, colorCategories } from '../data/colors';
import { vatRates, preparationTimes } from '../data/specs';
import { formatPrice, validateImageFile } from '../utils/helpers';

interface VaryantFiyatStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

export default function VaryantFiyatStep({ formData, updateFormData }: VaryantFiyatStepProps) {
  const { sizeSystem } = useSizeSystem(formData.subCategory1);
  const { variants, generateVariants, updateVariant, getTotalStock } = useVariants();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showAllColors, setShowAllColors] = useState(false);

  // Generate variants when sizes/colors change
  useEffect(() => {
    if (formData.selectedSizes.length > 0 && formData.selectedColors.length > 0) {
      generateVariants(formData.selectedSizes, formData.selectedColors, formData.price, formData.originalPrice);
    }
  }, [formData.selectedSizes, formData.selectedColors, formData.price, formData.originalPrice]);

  const handleSizeToggle = (size: string) => {
    const currentSizes = formData.selectedSizes;
    const newSizes = currentSizes.includes(size)
      ? currentSizes.filter(s => s !== size)
      : [...currentSizes, size];
    updateFormData('selectedSizes', newSizes);
  };

  const handleColorToggle = (colorId: string) => {
    const currentColors = formData.selectedColors;
    const newColors = currentColors.includes(colorId)
      ? currentColors.filter(c => c !== colorId)
      : [...currentColors, colorId];
    updateFormData('selectedColors', newColors);
  };

  const getColorById = (colorId: string) => {
    return colors.find(color => color.id === colorId);
  };

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
      updateFormData('images', newImages.slice(0, 10)); // Max 10 images
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
    updateFormData('images', newImages);
  };

  const discount = formData.originalPrice > 0 ? 
    Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100) : 0;

  return (
    <div className="space-y-8">
      {/* Step Title */}
      <div className="text-center">
        <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Palette className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Varyantlar & Fiyat</h2>
        <p className="text-gray-600">Beden, renk, görsel ve fiyat bilgileri</p>
      </div>

      {/* Beden Seçimi */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 flex items-center">
            <Ruler className="mr-2" size={20} />
            Beden Seçimi
          </h3>
          {sizeSystem && (
            <div className="bg-blue-100 px-3 py-1 rounded-full">
              <span className="text-sm font-medium text-blue-800">
                {sizeSystem.emoji} {sizeSystem.name}
              </span>
            </div>
          )}
        </div>

        {!formData.subCategory1 ? (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-yellow-800 text-sm">
              Beden seçimi için önce kategori seçmelisiniz
            </p>
          </div>
        ) : !sizeSystem ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800 text-sm">
              Bu kategori için beden sistemi bulunamadı
            </p>
          </div>
        ) : (
          <>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <p className="text-blue-800 text-sm">
                <strong>{sizeSystem.name}:</strong> {sizeSystem.description}
              </p>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-7 gap-3">
              {sizeSystem.sizes.map((size) => (
                <button
                  key={size.value}
                  onClick={() => handleSizeToggle(size.value)}
                  className={`p-3 rounded-lg border-2 transition-all text-center ${
                    formData.selectedSizes.includes(size.value)
                      ? 'border-pink-500 bg-pink-50 text-pink-700 relative'
                      : 'border-gray-200 hover:border-pink-300 text-gray-700'
                  }`}
                >
                  {formData.selectedSizes.includes(size.value) && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      ⭐
                    </div>
                  )}
                  <div className="font-medium">{size.label}</div>
                  {size.description && (
                    <div className="text-xs text-gray-500 mt-1">{size.description}</div>
                  )}
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Renk Seçimi */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Palette className="mr-2" size={20} />
          Renk Seçimi
        </h3>

        {/* Kompakt Renk Seçimi - İlk 16 Renk */}
        <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mb-4">
          {colors.slice(0, 16).map((color) => (
            <button
              key={color.id}
              onClick={() => handleColorToggle(color.id)}
              className={`relative p-3 rounded-lg border-2 transition-all hover:scale-110 hover:shadow-lg group ${
                formData.selectedColors.includes(color.id)
                  ? 'border-pink-500 bg-pink-50 shadow-lg ring-2 ring-pink-200'
                  : 'border-gray-200 hover:border-pink-300 hover:shadow-md'
              }`}
            >
              {formData.selectedColors.includes(color.id) && (
                <div className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md">
                  ✓
                </div>
              )}
              <div className="text-center">
                <div className="text-lg mb-1">{color.emoji}</div>
                <div 
                  className="w-8 h-8 rounded-full mx-auto mb-2 border-2 border-gray-300 shadow-sm group-hover:shadow-md transition-shadow"
                  style={{ backgroundColor: color.hex }}
                ></div>
                <div className="text-xs font-medium text-gray-700 leading-tight">{color.name}</div>
              </div>
            </button>
          ))}
        </div>
        
        {/* Genişletilebilir Renk Alanı */}
        {showAllColors && (
          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-2 mb-4 border-t border-gray-200 pt-4">
            {colors.slice(16).map((color) => (
              <button
                key={color.id}
                onClick={() => handleColorToggle(color.id)}
                className={`relative p-3 rounded-lg border-2 transition-all hover:scale-110 hover:shadow-lg group ${
                  formData.selectedColors.includes(color.id)
                    ? 'border-pink-500 bg-pink-50 shadow-lg ring-2 ring-pink-200'
                    : 'border-gray-200 hover:border-pink-300 hover:shadow-md'
                }`}
              >
                {formData.selectedColors.includes(color.id) && (
                  <div className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs shadow-md">
                    ✓
                  </div>
                )}
                <div className="text-center">
                  <div className="text-lg mb-1">{color.emoji}</div>
                  <div 
                    className="w-8 h-8 rounded-full mx-auto mb-2 border-2 border-gray-300 shadow-sm group-hover:shadow-md transition-shadow"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <div className="text-xs font-medium text-gray-700 leading-tight">{color.name}</div>
                </div>
              </button>
            ))}
          </div>
        )}
        
        {/* Daha Fazla Renk Butonu - Çalışır Halde */}
        <div className="text-center">
          <button 
            onClick={() => setShowAllColors(!showAllColors)}
            className="text-pink-600 hover:text-pink-700 text-sm font-medium bg-pink-50 hover:bg-pink-100 px-4 py-2 rounded-lg border border-pink-200 transition-all"
          >
            {showAllColors ? (
              <>
                ↑ Daha Az Renk Göster
              </>
            ) : (
              <>
                + Daha Fazla Renk Göster ({colors.length - 16} renk daha)
              </>
            )}
          </button>
        </div>
        
        {/* Seçilen Renkler Özeti */}
        {formData.selectedColors.length > 0 && (
          <div className="mt-4 bg-pink-50 rounded-lg p-3 border border-pink-200">
            <h4 className="text-sm font-medium text-pink-800 mb-2">
              Seçilen Renkler ({formData.selectedColors.length}):
            </h4>
            <div className="flex flex-wrap gap-2">
              {formData.selectedColors.map((colorId) => {
                const color = getColorById(colorId);
                return color ? (
                  <span key={colorId} className="bg-white border border-pink-300 px-2 py-1 rounded-full text-xs flex items-center">
                    <span className="mr-1">{color.emoji}</span>
                    <div 
                      className="w-3 h-3 rounded-full mr-1 border border-gray-300"
                      style={{ backgroundColor: color.hex }}
                    ></div>
                    {color.name}
                    <button
                      onClick={() => handleColorToggle(colorId)}
                      className="ml-1 text-pink-600 hover:text-pink-800"
                    >
                      ×
                    </button>
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}
      </div>

      {/* Ürün Görselleri */}
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

      {/* Fiyat & Stok */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
          <DollarSign className="mr-2" size={20} />
          Fiyat & Stok Bilgileri
        </h3>
        
        {/* Ana Fiyat Bilgileri - Düzgün Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Satış Fiyatı (TL) *
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price || ''}
              onChange={(e) => {
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
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="0.00"
            />
            <p className="text-xs text-gray-500 mt-1">Ana satış fiyatınız</p>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Eski Fiyat (TL) <span className="text-gray-400">(İndirim için)</span>
            </label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={formData.originalPrice || ''}
              onChange={(e) => updateFormData('originalPrice', parseFloat(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Otomatik doldurulur"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.originalPrice > formData.price && formData.price > 0 
                ? `%${Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)} indirim` 
                : 'İndirim göstermek için kullanın'
              }
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Toplam Stok Adedi *
            </label>
            <input
              type="number"
              required
              min="0"
              value={formData.stock || ''}
              onChange={(e) => updateFormData('stock', parseInt(e.target.value) || 0)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              placeholder="Kaç adet stokta"
            />
            <p className="text-xs text-gray-500 mt-1">Toplam stok miktarı</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              KDV Dahil Fiyat (TL)
            </label>
            <input
              type="number"
              disabled
              value={formData.price > 0 ? (formData.price * (formData.vatRate === '%8' ? 1.08 : 1.20)).toFixed(2) : ''}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
              placeholder="Otomatik hesaplanır"
            />
            <p className="text-xs text-gray-500 mt-1">
              {formData.vatRate} KDV dahil fiyat
            </p>
          </div>
        </div>

        {/* KDV ve Hazırlık Süresi - Düzgün Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {vatRates.emoji} {vatRates.name}
            </label>
            <select
              value={formData.vatRate}
              onChange={(e) => {
                updateFormData('vatRate', e.target.value);
                // KDV dahil fiyat otomatik güncellenecek
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {vatRates.options.map((rate) => (
                <option key={rate} value={rate}>{rate}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Vergi oranı seçimi</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {preparationTimes.emoji} {preparationTimes.name}
            </label>
            <select
              value={formData.preparationTime}
              onChange={(e) => updateFormData('preparationTime', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
            >
              {preparationTimes.options.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            <p className="text-xs text-gray-500 mt-1">Ürün hazırlama süresi</p>
          </div>
        </div>

        {/* Tedarikçi Bilgileri - Ayrı Mavi Kutucuk */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
            🏢 Tedarikçi Bilgileri
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                📄 Alış Fatura No
              </label>
              <input
                type="text"
                value={formData.invoiceNumber}
                onChange={(e) => updateFormData('invoiceNumber', e.target.value)}
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                placeholder="Örn: FT-2025-001"
              />
              <p className="text-xs text-blue-600 mt-1">Tedarikçi fatura numarası</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-blue-700 mb-2">
                💰 Alış Fiyatı (TL)
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={formData.purchasePrice || ''}
                onChange={(e) => updateFormData('purchasePrice', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-3 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                placeholder="0.00"
              />
              <p className="text-xs text-blue-600 mt-1">Tedarikçiden aldığınız fiyat</p>
            </div>
          </div>
        </div>

        {/* Fiyat Özeti */}
        {formData.price > 0 && (
          <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-6 border border-green-200">
            <h4 className="font-medium text-green-800 mb-3">Fiyat Özeti:</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 text-sm">
              {formData.purchasePrice > 0 && (
                <div>
                  <span className="text-blue-600">Alış Fiyatı:</span>
                  <div className="font-bold text-blue-900">{formatPrice(formData.purchasePrice)}</div>
                </div>
              )}
              <div>
                <span className="text-green-600">Satış Fiyatı:</span>
                <div className="font-bold text-green-900 text-lg">{formatPrice(formData.price)}</div>
              </div>
              {formData.originalPrice > 0 && (
                <>
                  <div>
                    <span className="text-green-600">Eski Fiyat:</span>
                    <div className="font-medium text-gray-600 line-through">{formatPrice(formData.originalPrice)}</div>
                  </div>
                  <div>
                    <span className="text-green-600">İndirim:</span>
                    <div className="font-bold text-red-600">%{Math.round(((formData.originalPrice - formData.price) / formData.originalPrice) * 100)}</div>
                  </div>
                </>
              )}
              <div>
                <span className="text-green-600">KDV Dahil:</span>
                <div className="font-medium text-green-900">
                  {formatPrice(formData.price * (formData.vatRate === '%8' ? 1.08 : 1.20))}
                </div>
              </div>
              <div>
                <span className="text-green-600">Kar Marjı:</span>
                <div className="font-medium text-blue-600">
                  {formData.purchasePrice > 0 && formData.price > formData.purchasePrice
                    ? `${formatPrice(formData.price - formData.purchasePrice)}` 
                    : formData.originalPrice > formData.price 
                    ? `${formatPrice(formData.originalPrice - formData.price)}` 
                    : 'Hesaplanmadı'
                  }
                </div>
              </div>
            </div>
            
            {/* Fiyat Bilgilendirme */}
            <div className="mt-4 p-3 bg-blue-100 rounded-lg">
              <h5 className="font-medium text-blue-800 mb-2">💡 Fiyat Bilgilendirme:</h5>
              <div className="text-xs text-blue-700 space-y-1">
                <p>• <strong>Alış Fiyatı:</strong> Tedarikçiden aldığınız maliyet fiyatı</p>
                <p>• <strong>Satış Fiyatı:</strong> Müşterinin ödeyeceği ana fiyat</p>
                <p>• <strong>Eski Fiyat:</strong> İndirim göstermek için (opsiyonel)</p>
                <p>• <strong>KDV Dahil:</strong> Vergi dahil toplam fiyat</p>
                <p>• <strong>Kar Marjı:</strong> Satış fiyatı - Alış fiyatı farkı (gerçek kar)</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Varyant Özeti - Sadece Özet */}
      {formData.selectedSizes.length > 0 && formData.selectedColors.length > 0 && (
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
      )}

      {/* Varyant Detay Tablosu */}
      {formData.selectedSizes.length > 0 && formData.selectedColors.length > 0 && (
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
                  <th className="text-left p-3 font-medium text-gray-700">Fiyat (TL)</th>
                  <th className="text-left p-3 font-medium text-gray-700">Eski Fiyat (TL)</th>
                  <th className="text-left p-3 font-medium text-gray-700">KDV Dahil (TL)</th>
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
                      const variantId = `${size}-${colorId}`;
                      updateVariant(variantId, 'price', price);
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
                    const variantId = `${size}-${colorId}`;
                    const variant = variants.find(v => v.id === variantId);
                    const currentPrice = variant?.price || formData.price;
                    const newOriginalPrice = Math.round(currentPrice * 1.25);
                    updateVariant(variantId, 'originalPrice', newOriginalPrice);
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
                    const variantId = `${size}-${colorId}`;
                    updateVariant(variantId, 'stock', stockPerVariant);
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
                    const variantId = `${size}-${colorId}`;
                    const color = getColorById(colorId);
                    const newSku = `${formData.name.substring(0,3).toUpperCase()}-${size}-${color?.name.substring(0,3).toUpperCase()}-${Date.now().toString().slice(-4)}`;
                    updateVariant(variantId, 'sku', newSku);
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
      )}
    </div>
  );
}