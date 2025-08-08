import { Package } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import CategorySelection from './CategorySelection';
import BasicProductInfo from './BasicProductInfo';
import BasicProperties from './BasicProperties';
import TextileSpecifications from './TextileSpecifications';
import CategorySummary from './CategorySummary';
import { useTranslation } from "react-i18next";
interface UrunBilgileriStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
  updateMultipleFields: (updates: Partial<FormData>) => void;
}
export default function UrunBilgileriStep({
  formData,
  updateFormData,
  updateMultipleFields
}: UrunBilgileriStepProps) {
  const {
    t
  } = useTranslation();
  return <div className="space-y-8">
      {/* Step Title */}
      <div className="text-center">
        <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <Package className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Ürün Bilgileri</h2>
        <p className="text-gray-600">{t("common.kategori_temel_bilgiler_ve_özellikler")}</p>
      </div>

      {/* Modular Components */}
      <CategorySelection formData={formData} updateFormData={updateFormData} updateMultipleFields={updateMultipleFields} />

      <BasicProductInfo formData={formData} updateFormData={updateFormData} />

      <BasicProperties formData={formData} updateFormData={updateFormData} />

      <TextileSpecifications formData={formData} updateFormData={updateFormData} />

      <CategorySummary formData={formData} />
    </div>;
}