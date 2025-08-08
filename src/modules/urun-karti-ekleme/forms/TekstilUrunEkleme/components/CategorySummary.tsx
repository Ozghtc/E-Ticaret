import React from 'react';
import { FormData } from '../hooks/useFormData';
import { getCategoryById } from '../data/categories';
import { useTranslation } from "react-i18next";
interface CategorySummaryProps {
  formData: FormData;
}
export default function CategorySummary({
  formData
}: CategorySummaryProps) {
  const {
    t
  } = useTranslation();
  if (!formData.mainCategory) {
    return null;
  }
  return <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
      <h4 className="font-medium text-blue-800 mb-2">{t("common.seçilen_kategoriler")}</h4>
      <div className="flex flex-wrap gap-2">
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {getCategoryById(formData.mainCategory)?.name}
        </span>
        {formData.subCategory1 && <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {getCategoryById(formData.subCategory1)?.name}
          </span>}
        {formData.subCategory2 && <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {getCategoryById(formData.subCategory2)?.name}
          </span>}
      </div>
    </div>;
}