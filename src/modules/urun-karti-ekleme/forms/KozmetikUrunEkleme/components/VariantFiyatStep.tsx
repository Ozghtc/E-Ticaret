// 💄 Kozmetik Özellikleri - Adım 2
import React from 'react';
import { Heart, Palette, Droplets, Shield, Sparkles, User } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { skinTypes, contentFeatures, specialFeatures, finishTypes, coverageTypes, volumeOptions, spfValues, ageGroups, genderOptions } from '../data/specs';
import { colors, getColorsByCategory } from '../data/colors';
import { hasShadesField, hasVolumeField, hasSPFField, hasCoverageField, getShadeCategory } from '../utils/helpers';

interface VariantFiyatStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

function VariantFiyatStep({ formData, updateFormData }: VariantFiyatStepProps) {
  const categoryRequiresShades = hasShadesField(formData.subCategory1);
  const categoryRequiresVolume = hasVolumeField(formData.subCategory1);
  const categoryRequiresSPF = hasSPFField(formData.subCategory1);
  const categoryRequiresCoverage = hasCoverageField(formData.subCategory1);
  
  const shadeCategory = getShadeCategory(formData.subCategory1);
  const availableColors = getColorsByCategory(shadeCategory);

  const handleSkinTypeToggle = (skinTypeId: string) => {
    const currentSkinTypes = formData.skinTypes || [];
    const updated = currentSkinTypes.includes(skinTypeId)
      ? currentSkinTypes.filter(id => id !== skinTypeId)
      : [...currentSkinTypes, skinTypeId];
    updateFormData('skinTypes', updated);
  };

  const handleContentFeatureToggle = (featureId: string) => {
    const currentFeatures = formData.contentFeatures || [];
    const updated = currentFeatures.includes(featureId)
      ? currentFeatures.filter(id => id !== featureId)
      : [...currentFeatures, featureId];
    updateFormData('contentFeatures', updated);
  };

  const handleSpecialFeatureToggle = (featureId: string) => {
    const currentFeatures = formData.specialFeatures || [];
    const updated = currentFeatures.includes(featureId)
      ? currentFeatures.filter(id => id !== featureId)
      : [...currentFeatures, featureId];
    updateFormData('specialFeatures', updated);
  };

  const handleShadeToggle = (shadeId: string) => {
    const currentShades = formData.selectedShades || [];
    const updated = currentShades.includes(shadeId)
      ? currentShades.filter(id => id !== shadeId)
      : [...currentShades, shadeId];
    updateFormData('selectedShades', updated);
    
    // Renk seçenekleri varsa hasShades'i true yap
    if (updated.length > 0) {
      updateFormData('hasShades', true);
      updateFormData('shadeCategory', shadeCategory);
    } else {
      updateFormData('hasShades', false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Cilt Tipi & Kullanıcı Bilgileri */}
      <div className="bg-pink-50 p-6 rounded-xl border border-pink-200">
        <div className="flex items-center mb-4">
          <User className="w-5 h-5 text-pink-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Hedef Kullanıcı</h3>
        </div>

        {/* Cilt Tipi */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Uygun Cilt Tipleri * (Çoklu seçim yapabilirsiniz)
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {skinTypes.map(skinType => (
              <button
                key={skinType.id}
                type="button"
                onClick={() => handleSkinTypeToggle(skinType.id)}
                className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                  formData.skinTypes?.includes(skinType.id)
                    ? 'bg-pink-500 text-white border-pink-500 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-pink-300'
                }`}
              >
                <span className="block text-lg mb-1">{skinType.emoji}</span>
                {skinType.name}
              </button>
            ))}
          </div>
        </div>

        {/* Yaş Grubu & Cinsiyet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Yaş Grubu
            </label>
            <select
              value={formData.ageGroup}
              onChange={(e) => updateFormData('ageGroup', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="">Yaş grubu seçin...</option>
              {ageGroups.map(group => (
                <option key={group.id} value={group.id}>
                  {group.emoji} {group.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Cinsiyet *
            </label>
            <select
              value={formData.gender}
              onChange={(e) => updateFormData('gender', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              required
            >
              <option value="">Cinsiyet seçin...</option>
              {genderOptions.map(option => (
                <option key={option.id} value={option.id}>
                  {option.emoji} {option.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Renk/Ton Seçimi (Sadece gerekli kategoriler için) */}
      {categoryRequiresShades && (
        <div className="bg-purple-50 p-6 rounded-xl border border-purple-200">
          <div className="flex items-center mb-4">
            <Palette className="w-5 h-5 text-purple-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Renk/Ton Seçimi *</h3>
          </div>
          
          <p className="text-sm text-gray-600 mb-4">
            Bu ürün için mevcut renk seçeneklerini belirleyin:
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {availableColors.map(color => (
              <button
                key={color.id}
                type="button"
                onClick={() => handleShadeToggle(color.id)}
                className={`p-3 rounded-lg border text-xs font-medium transition-all ${
                  formData.selectedShades?.includes(color.id)
                    ? 'bg-purple-500 text-white border-purple-500 shadow-md'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-purple-300'
                }`}
              >
                <div 
                  className="w-8 h-8 rounded-full mx-auto mb-2 border-2 border-white shadow-sm"
                  style={{ backgroundColor: color.hex }}
                />
                <span className="block text-center">{color.emoji}</span>
                <span className="block text-center mt-1">{color.name}</span>
              </button>
            ))}
          </div>
          
          {formData.selectedShades && formData.selectedShades.length > 0 && (
            <div className="mt-4 p-3 bg-white rounded-lg border border-purple-200">
              <p className="text-sm text-purple-800">
                <strong>Seçilen Renkler ({formData.selectedShades.length}):</strong> {' '}
                {formData.selectedShades.map(shadeId => {
                  const shade = colors.find(c => c.id === shadeId);
                  return shade ? `${shade.emoji} ${shade.name}` : shadeId;
                }).join(', ')}
              </p>
            </div>
          )}
        </div>
      )}

      {/* Fiziksel Özellikler */}
      <div className="bg-blue-50 p-6 rounded-xl border border-blue-200">
        <div className="flex items-center mb-4">
          <Droplets className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Fiziksel Özellikler</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Hacim/Ağırlık */}
          {categoryRequiresVolume && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hacim/Ağırlık *
              </label>
              <select
                value={formData.volume}
                onChange={(e) => updateFormData('volume', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">Seçin...</option>
                {volumeOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.emoji} {option.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* SPF Değeri */}
          {categoryRequiresSPF && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SPF Değeri *
              </label>
              <select
                value={formData.spfValue}
                onChange={(e) => updateFormData('spfValue', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="">SPF seçin...</option>
                {spfValues.map(spf => (
                  <option key={spf.id} value={spf.id}>
                    {spf.emoji} {spf.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Finish Tipi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Finish Tipi
            </label>
            <select
              value={formData.finishType}
              onChange={(e) => updateFormData('finishType', e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Seçin...</option>
              {finishTypes.map(type => (
                <option key={type.id} value={type.id}>
                  {type.emoji} {type.name}
                </option>
              ))}
            </select>
          </div>

          {/* Coverage Tipi */}
          {categoryRequiresCoverage && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Coverage Tipi
              </label>
              <select
                value={formData.coverageType}
                onChange={(e) => updateFormData('coverageType', e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Seçin...</option>
                {coverageTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.emoji} {type.name}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>
      </div>

      {/* İçerik Özellikleri */}
      <div className="bg-green-50 p-6 rounded-xl border border-green-200">
        <div className="flex items-center mb-4">
          <Shield className="w-5 h-5 text-green-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">İçerik Özellikleri</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {contentFeatures.map(feature => (
            <button
              key={feature.id}
              type="button"
              onClick={() => handleContentFeatureToggle(feature.id)}
              className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                formData.contentFeatures?.includes(feature.id)
                  ? 'bg-green-500 text-white border-green-500 shadow-md'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-green-300'
              }`}
            >
              <span className="block text-lg mb-1">{feature.emoji}</span>
              {feature.name}
            </button>
          ))}
        </div>
      </div>

      {/* Özel Özellikler */}
      <div className="bg-orange-50 p-6 rounded-xl border border-orange-200">
        <div className="flex items-center mb-4">
          <Sparkles className="w-5 h-5 text-orange-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Özel Özellikler</h3>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {specialFeatures.map(feature => (
            <button
              key={feature.id}
              type="button"
              onClick={() => handleSpecialFeatureToggle(feature.id)}
              className={`p-3 rounded-lg border text-sm font-medium transition-all ${
                formData.specialFeatures?.includes(feature.id)
                  ? 'bg-orange-500 text-white border-orange-500 shadow-md'
                  : 'bg-white text-gray-700 border-gray-300 hover:border-orange-300'
              }`}
            >
              <span className="block text-lg mb-1">{feature.emoji}</span>
              {feature.name}
            </button>
          ))}
        </div>
      </div>

      {/* Kullanım Bilgileri */}
      <div className="bg-yellow-50 p-6 rounded-xl border border-yellow-200">
        <div className="flex items-center mb-4">
          <Heart className="w-5 h-5 text-yellow-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Kullanım Bilgileri</h3>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kullanım Talimatları *
            </label>
            <textarea
              value={formData.usageInstructions}
              onChange={(e) => updateFormData('usageInstructions', e.target.value)}
              placeholder="Ürünün nasıl kullanılacağını detaylı olarak açıklayın..."
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              İçerik Listesi (INCI)
            </label>
            <textarea
              value={formData.ingredients}
              onChange={(e) => updateFormData('ingredients', e.target.value)}
              placeholder="Aqua, Glycerin, Dimethicone, ..."
              rows={3}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Uyarılar
            </label>
            <textarea
              value={formData.warnings}
              onChange={(e) => updateFormData('warnings', e.target.value)}
              placeholder="Özel uyarılar varsa yazın (örn: göze temas ettirmeyin)..."
              rows={2}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VariantFiyatStep;