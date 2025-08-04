import React from 'react';
import { Package, Tag, Globe, Shirt, Scissors } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { mainCategories, getSubCategories, getCategoryById } from '../data/categories';
import { genders, ageGroups, seasons, fabricTypes, fitTypes, patterns, neckTypes, sleeveTypes, closureTypes, careInstructions } from '../data/specs';

interface UrunBilgileriStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  updateMultipleFields: (updates: Partial<FormData>) => void;
}

export default function UrunBilgileriStep({ formData, updateFormData, updateMultipleFields }: UrunBilgileriStepProps) {
  const subCategories1 = getSubCategories(formData.mainCategory);
  const subCategories2 = getSubCategories(formData.subCategory1);

  const handleMainCategoryChange = (categoryId: string) => {
    const category = getCategoryById(categoryId);
    updateMultipleFields({
      mainCategory: categoryId,
      subCategory1: '',
      subCategory2: '',
      gender: category?.genderAuto || formData.gender
    });
  };

  const handleSubCategory1Change = (categoryId: string) => {
    updateMultipleFields({
      subCategory1: categoryId,
      subCategory2: ''
    });
  };

  const handleCareInstructionToggle = (instruction: string) => {
    const current = formData.careInstructions;
    const updated = current.includes(instruction)
      ? current.filter(i => i !== instruction)
      : [...current, instruction];
    updateFormData('careInstructions', updated);
  };

  return (
    <div className="space-y-8">
      {/* Step Title */}
      <div className="text-center">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ürün Bilgileri</h2>
        <p className="text-gray-600">Kategori, temel bilgiler ve özellikler</p>
      </div>

      {/* Kategori Seçimi */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          📂 Kategori Seçimi
        </h3>
        
        {/* Ana Kategori */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-700 mb-3">Ana Kategori</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {mainCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => handleMainCategoryChange(category.id)}
                className={`p-3 rounded-lg border-2 transition-all text-left ${
                  formData.mainCategory === category.id
                    ? 'border-pink-500 bg-pink-50 relative'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                {formData.mainCategory === category.id && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    ⭐
                  </div>
                )}
                <div className="flex items-center space-x-2">
                  <span className="text-lg">{category.emoji}</span>
                  <span className="text-sm font-medium text-gray-900">{category.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Alt Kategori 1 */}
        {formData.mainCategory && subCategories1.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3">Alt Kategori</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {subCategories1.map((category) => (
                <button
                  key={category.id}
                  onClick={() => handleSubCategory1Change(category.id)}
                  className={`p-3 rounded-lg border transition-all text-left ${
                    formData.subCategory1 === category.id
                      ? 'border-pink-500 bg-pink-50 relative'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  {formData.subCategory1 === category.id && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                      ⭐
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{category.emoji}</span>
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Alt Kategori 2 */}
        {formData.subCategory1 && subCategories2.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-700 mb-3">Detay Kategori</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
              {subCategories2.map((category) => (
                <button
                  key={category.id}
                  onClick={() => updateFormData('subCategory2', category.id)}
                  className={`p-3 rounded-lg border transition-all text-left ${
                    formData.subCategory2 === category.id
                      ? 'border-pink-500 bg-pink-50 relative'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  {formData.subCategory2 === category.id && (
                    <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                      ⭐
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{category.emoji}</span>
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Temel Ürün Bilgileri */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Tag className="mr-2" size={20} />
          Temel Ürün Bilgileri
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Ürün Adı *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => updateFormData('name', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Örn: Zarif Şifon Bluz"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Marka (Opsiyonel)
            </label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => updateFormData('brand', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Örn: Zara, H&M, Mango"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Model Kodu (Opsiyonel)
            </label>
            <input
              type="text"
              value={formData.model}
              onChange={(e) => updateFormData('model', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Örn: ZR2024-BLZ-001"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Barkod (Opsiyonel)
            </label>
            <input
              type="text"
              value={formData.barcode}
              onChange={(e) => updateFormData('barcode', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Örn: 8690123456789"
            />
          </div>
        </div>

        <div className="mt-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Ürün Açıklaması *
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => updateFormData('description', e.target.value)}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            placeholder="Zarif tasarım, kaliteli kumaş. El işçiliği detaylarla süslenmiş özel parça..."
          />
        </div>
      </div>

      {/* Temel Özellikler */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Globe className="mr-2" size={20} />
          Temel Özellikler
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cinsiyet
            </label>
            <select
              value={formData.gender}
              onChange={(e) => updateFormData('gender', e.target.value)}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500 ${
                formData.gender ? 'relative' : ''
              }`}
            >
              <option value="">Cinsiyet seçin</option>
              {genders.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
            {formData.gender && (
              <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs transform translate-x-2 -translate-y-2">
                ⭐
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Yaş Grubu
            </label>
            <select
              value={formData.ageGroup}
              onChange={(e) => updateFormData('ageGroup', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Yaş grubu seçin</option>
              {ageGroups.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sezon
            </label>
            <select
              value={formData.season}
              onChange={(e) => updateFormData('season', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Sezon seçin</option>
              {seasons.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Menşei (Opsiyonel)
            </label>
            <input
              type="text"
              value={formData.origin}
              onChange={(e) => updateFormData('origin', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
              placeholder="Örn: Türkiye, İtalya, Çin"
            />
          </div>
        </div>
      </div>

      {/* Tekstil Özellikleri */}
      <div className="bg-white rounded-lg p-6 border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Shirt className="mr-2" size={20} />
          Tekstil Özellikleri
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {fabricTypes.emoji} {fabricTypes.name}
            </label>
            <select
              value={formData.fabricType}
              onChange={(e) => updateFormData('fabricType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Kumaş türü seçin</option>
              {fabricTypes.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {fitTypes.emoji} {fitTypes.name}
            </label>
            <select
              value={formData.fitType}
              onChange={(e) => updateFormData('fitType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Kalıp seçin</option>
              {fitTypes.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {patterns.emoji} {patterns.name}
            </label>
            <select
              value={formData.pattern}
              onChange={(e) => updateFormData('pattern', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Desen seçin</option>
              {patterns.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {neckTypes.emoji} {neckTypes.name}
            </label>
            <select
              value={formData.neckType}
              onChange={(e) => updateFormData('neckType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Yaka tipi seçin</option>
              {neckTypes.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {sleeveTypes.emoji} {sleeveTypes.name}
            </label>
            <select
              value={formData.sleeveType}
              onChange={(e) => updateFormData('sleeveType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Kol tipi seçin</option>
              {sleeveTypes.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {closureTypes.emoji} {closureTypes.name}
            </label>
            <select
              value={formData.closureType}
              onChange={(e) => updateFormData('closureType', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            >
              <option value="">Kapama tipi seçin</option>
              {closureTypes.options.map((option) => (
                <option key={option} value={option}>{option}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Bakım Talimatları */}
        <div>
          <h4 className="font-medium text-gray-700 mb-3">Bakım Talimatları</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {careInstructions.options.map((instruction) => (
              <button
                key={instruction}
                onClick={() => handleCareInstructionToggle(instruction)}
                className={`p-3 rounded-lg border transition-all text-left ${
                  formData.careInstructions.includes(instruction)
                    ? 'border-green-500 bg-green-50 text-green-700 relative'
                    : 'border-gray-200 hover:border-green-300 text-gray-700'
                }`}
              >
                {formData.careInstructions.includes(instruction) && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    ⭐
                  </div>
                )}
                <div className="text-sm font-medium">{instruction}</div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Seçilen Kategoriler Özeti */}
      {formData.mainCategory && (
        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <h4 className="font-medium text-blue-800 mb-2">Seçilen Kategoriler:</h4>
          <div className="flex flex-wrap gap-2">
            <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
              {getCategoryById(formData.mainCategory)?.name}
            </span>
            {formData.subCategory1 && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {getCategoryById(formData.subCategory1)?.name}
              </span>
            )}
            {formData.subCategory2 && (
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                {getCategoryById(formData.subCategory2)?.name}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}