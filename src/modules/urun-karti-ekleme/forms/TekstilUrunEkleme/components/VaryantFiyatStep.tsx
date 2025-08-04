import { useEffect } from 'react';
import { Palette } from 'lucide-react';
import { FormData } from '../hooks/useFormData';
import { useSizeSystem } from '../hooks/useSizeSystem';
import { useVariants } from '../hooks/useVariants';
import SizeSelection from './SizeSelection';
import ColorSelection from './ColorSelection';
import ImageUpload from './ImageUpload';
import PriceSection from './PriceSection';
import VariantTable from './VariantTable';

interface VaryantFiyatStepProps {
  formData: FormData;
  updateFormData: (field: keyof FormData, value: any) => void;
}

export default function VaryantFiyatStep({ formData, updateFormData }: VaryantFiyatStepProps) {
  const { sizeSystem } = useSizeSystem(formData.subCategory1);
  const { variants, generateVariants, updateVariant } = useVariants();

  // Generate variants when sizes/colors change
  useEffect(() => {
    if (formData.selectedSizes.length > 0 && formData.selectedColors.length > 0) {
      generateVariants(formData.selectedSizes, formData.selectedColors, formData.price);
    }
  }, [formData.selectedSizes, formData.selectedColors, formData.price]);

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

  const handleImagesUpdate = (images: File[]) => {
    updateFormData('images', images);
  };

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

      {/* Modular Components */}
      <SizeSelection 
        formData={formData}
        sizeSystem={sizeSystem}
        onSizeToggle={handleSizeToggle}
      />

      <ColorSelection 
        formData={formData}
        onColorToggle={handleColorToggle}
      />

      <ImageUpload 
        formData={formData}
        onImagesUpdate={handleImagesUpdate}
      />

      <PriceSection 
        formData={formData}
        updateFormData={updateFormData}
      />

      <VariantTable 
        formData={formData}
        sizeSystem={sizeSystem}
        variants={variants}
        updateVariant={updateVariant}
      />
    </div>
  );
}