import React from 'react';
import { FormData } from '../hooks/useFormData';
import { mainCategories, getSubCategories, getCategoryById } from '../data/categories';

interface CategorySelectionProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  updateMultipleFields: (updates: Partial<FormData>) => void;
}

export default function CategorySelection({ formData, updateFormData, updateMultipleFields }: CategorySelectionProps) {
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

  return (
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
  );
}