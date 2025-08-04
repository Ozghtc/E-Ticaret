// 📝 Kozmetik Ürün Bilgileri - Adım 1
import React from 'react';
import { Package, Tag, DollarSign, Warehouse } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { mainCategories, getSubCategories } from '../data/categories';

interface UrunBilgileriStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  updateMultipleFields: (updates: Partial<FormData>) => void;
}

function UrunBilgileriStep({ formData, updateFormData, updateMultipleFields }: UrunBilgileriStepProps) {
  const subCategories = getSubCategories(formData.mainCategory);

  const handleMainCategoryChange = (categoryId: string) => {
    updateMultipleFields({
      mainCategory: categoryId,
      subCategory1: '', // Alt kategoriyi sıfırla
      subCategory2: ''
    });
  };

  return (
    <div className="space-y-8">
      {/* Kategori Seçimi */}
      <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
        <div className="flex items-center mb-4">
          <Package className="w-5 h-5 text-purple-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Kategori Seçimi</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ana Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ana Kategori *
            </label>
            <select
              value={formData.mainCategory}
              onChange={(e) => handleMainCategoryChange(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            >
              <option value="">Kategori seçin...</option>
              {mainCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.emoji} {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Alt Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Alt Kategori *
            </label>
            <select
              value={formData.subCategory1}
              onChange={(e) => updateFormData('subCategory1', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              disabled={!formData.mainCategory}
              required
            >
              <option value="">Alt kategori seçin...</option>
              {subCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.emoji} {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Seçilen Kategori Özeti */}
        {formData.mainCategory && formData.subCategory1 && (
          <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
            <p className="text-sm text-purple-800">
              <strong>Seçilen Kategori:</strong> {' '}
              {mainCategories.find(c => c.id === formData.mainCategory)?.name} → {' '}
              {subCategories.find(c => c.id === formData.subCategory1)?.name}
            </p>
          </div>
        )}
      </div>

      {/* Temel Ürün Bilgileri */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-center mb-4">
          <Tag className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Temel Ürün Bilgileri</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ürün Adı *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              placeholder="Örn: Nemlendirici Yüz Kremi"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marka *
            </label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => updateFormData('brand', e.target.value)}
              placeholder="Örn: L'Oréal"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model/Seri
            </label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => updateFormData('model', e.target.value)}
              placeholder="Örn: Hydra Genius"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Barkod
            </label>
            <input
              type="text"
              value={formData.barcode}
              onChange={(e) => updateFormData('barcode', e.target.value)}
              placeholder="13 haneli barkod numarası"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Menşei
            </label>
            <select
              value={formData.origin}
              onChange={(e) => updateFormData('origin', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="Türkiye">🇹🇷 Türkiye</option>
              <option value="Fransa">🇫🇷 Fransa</option>
              <option value="İtalya">🇮🇹 İtalya</option>
              <option value="Almanya">🇩🇪 Almanya</option>
              <option value="ABD">🇺🇸 ABD</option>
              <option value="Güney Kore">🇰🇷 Güney Kore</option>
              <option value="Japonya">🇯🇵 Japonya</option>
              <option value="Diğer">🌍 Diğer</option>
            </select>
          </div>
        </div>

        {/* Ürün Açıklaması */}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ürün Açıklaması *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            placeholder="Ürününüzün detaylı açıklamasını yazın..."
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
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
              Satış Fiyatı (TL) *
            </label>
            <input
              type="number"
              value={formData.price || ''}
              onChange={(e) => updateFormData('price', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Eski Fiyat (TL)
              <span className="text-red-500 text-xs block">İndirim göstermek için kullanın</span>
            </label>
            <input
              type="number"
              value={formData.originalPrice || ''}
              onChange={(e) => updateFormData('originalPrice', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Toplam Stok *
            </label>
            <input
              type="number"
              value={formData.stock || ''}
              onChange={(e) => updateFormData('stock', parseInt(e.target.value) || 0)}
              placeholder="0"
              min="0"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Tedarikçi Bilgileri */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 p-4 bg-white rounded-lg border border-green-200">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              🏢 Alış Fatura No
            </label>
            <input
              type="text"
              value={formData.invoiceNumber}
              onChange={(e) => updateFormData('invoiceNumber', e.target.value)}
              placeholder="Fatura numarası"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              💰 Alış Fiyatı (TL)
            </label>
            <input
              type="number"
              value={formData.purchasePrice || ''}
              onChange={(e) => updateFormData('purchasePrice', parseFloat(e.target.value) || 0)}
              placeholder="0.00"
              min="0"
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Vergi & Hazırlık */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              KDV Oranı (%)
            </label>
            <select
              value={formData.vatRate}
              onChange={(e) => updateFormData('vatRate', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="1">%1</option>
              <option value="10">%10</option>
              <option value="20">%20</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Hazırlık Süresi
            </label>
            <select
              value={formData.preparationTime}
              onChange={(e) => updateFormData('preparationTime', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="Aynı gün">Aynı gün</option>
              <option value="1-3 gün">1-3 gün</option>
              <option value="3-7 gün">3-7 gün</option>
              <option value="1-2 hafta">1-2 hafta</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UrunBilgileriStep;