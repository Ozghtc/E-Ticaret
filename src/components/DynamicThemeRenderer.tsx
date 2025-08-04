import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useThemeTemplate } from '../hooks/useThemeTemplate';
import { Product } from '../types/database';

interface DynamicThemeRendererProps {
  products: Product[];
  category: string;
}

export default function DynamicThemeRenderer({ products, category }: DynamicThemeRendererProps) {
  const { selectedTheme } = useTheme();
  const Template = useThemeTemplate(selectedTheme);

  return <Template products={products} category={category} />;
}