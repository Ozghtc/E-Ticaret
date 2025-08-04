// 📏 Dinamik Beden Sistemi Hook
import { useMemo } from 'react';
import { getSizeSystem, SizeSystem } from '../data/sizes';
import { getCategoryById } from '../data/categories';

export function useSizeSystem(subCategoryId: string) {
  const sizeSystem = useMemo(() => {
    if (!subCategoryId) return null;
    
    const category = getCategoryById(subCategoryId);
    if (!category) return null;
    
    return getSizeSystem(category.sizeSystem);
  }, [subCategoryId]);

  const isValidSize = (size: string): boolean => {
    if (!sizeSystem) return false;
    return sizeSystem.sizes.some(s => s.value === size);
  };

  const getSizeLabel = (size: string): string => {
    if (!sizeSystem) return size;
    const sizeOption = sizeSystem.sizes.find(s => s.value === size);
    return sizeOption?.label || size;
  };

  const getSizeDescription = (size: string): string => {
    if (!sizeSystem) return '';
    const sizeOption = sizeSystem.sizes.find(s => s.value === size);
    return sizeOption?.description || '';
  };

  return {
    sizeSystem,
    isValidSize,
    getSizeLabel,
    getSizeDescription
  };
}