import React from 'react';
import { useTheme, Product } from '../context/ThemeContext';
import DynamicThemeRenderer from './DynamicThemeRenderer';
import { useTranslation } from "react-i18next";
interface UnifiedProductListProps {
  category?: string;
  limit?: number;
  className?: string;
}
export default function UnifiedProductList({
  category,
  limit,
  className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
}: UnifiedProductListProps) {
  const {
    t
  } = useTranslation();
  const {
    products
  } = useTheme();

  // Filter products by category if specified
  let filteredProducts = products;
  if (category) {
    filteredProducts = products.filter(product => product.category === category);
  }

  // Limit products if specified
  if (limit) {
    filteredProducts = filteredProducts.slice(0, limit);
  }
  if (filteredProducts.length === 0) {
    return <div className="text-center py-12">
        <p className="text-gray-500">{t("common.bu_kategoride_henüz_ürün_bulunmuyor")}</p>
      </div>;
  }

  // Dinamik tema renderer kullan
  return <DynamicThemeRenderer products={filteredProducts} category={category || 'tekstil'} />;
}