// 🎨 Varyant Yönetimi Hook
import { useState, useMemo, useCallback } from 'react';

export interface Variant {
  id: string;
  size: string;
  color: string;
  stock: number;
  price: number;
  originalPrice: number;
  sku: string;
}

export function useVariants() {
  const [variants, setVariants] = useState<Variant[]>([]);

  const generateVariants = useCallback((sizes: string[], colors: string[], basePrice: number) => {
    const newVariants: Variant[] = [];
    
    sizes.forEach(size => {
      colors.forEach(color => {
        const id = `${size}-${color}`;
        const existing = variants.find(v => v.id === id);
        
        newVariants.push({
          id,
          size,
          color,
          stock: existing?.stock || 0,
          price: existing?.price || basePrice,
          originalPrice: existing?.originalPrice || Math.round(basePrice * 1.25),
          sku: existing?.sku || `SKU-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`
        });
      });
    });
    
    setVariants(newVariants);
  }, [variants]);

  const updateVariant = useCallback((id: string, field: keyof Variant, value: any) => {
    setVariants(prev => prev.map(variant => 
      variant.id === id ? { ...variant, [field]: value } : variant
    ));
  }, []);

  const deleteVariant = useCallback((id: string) => {
    setVariants(prev => prev.filter(variant => variant.id !== id));
  }, []);

  const getTotalStock = useMemo(() => {
    return variants.reduce((total, variant) => total + variant.stock, 0);
  }, [variants]);

  const getVariantCount = useMemo(() => {
    return variants.length;
  }, [variants]);

  const clearVariants = useCallback(() => {
    setVariants([]);
  }, []);

  return {
    variants,
    generateVariants,
    updateVariant,
    deleteVariant,
    getTotalStock,
    getVariantCount,
    clearVariants
  };
}