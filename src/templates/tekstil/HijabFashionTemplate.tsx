import React from 'react';
import { Product } from '../../types/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import { categoryUIConfig } from '../../config/categoryUIConfig';
import { useTranslation } from "react-i18next";
interface HijabFashionTemplateProps {
  products: Product[];
  category: string;
}
export default function HijabFashionTemplate({
  products,
  category
}: HijabFashionTemplateProps) {
  const {
    t
  } = useTranslation();
  const uiConfig = categoryUIConfig[category] || categoryUIConfig.tekstil;
  return <div className="min-h-screen bg-purple-50">
      {/* Hijab Fashion Header */}
      <header className="bg-white shadow-sm border-b border-purple-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-medium text-purple-800 mb-2">🧕 Hijab Fashion</h1>
            <p className="text-purple-600 text-lg">{t("common.zarif_tesettür_koleksiyonu")}</p>
          </div>
        </div>
      </header>

      {/* Hijab Hero */}
      <section className="py-20 bg-gradient-to-r from-purple-100 to-pink-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-medium text-purple-900 mb-6">{t("common.zarif_tesettür")}</h2>
          <p className="text-xl text-purple-700 mb-8 leading-relaxed">{t("common.modern_çizgiler_geleneksel_değerler")}</p>
          <button className="bg-purple-600 text-white px-8 py-4 font-medium text-lg hover:bg-purple-700 transition-colors rounded-lg">{t("common.koleksiyonu_i_ncele")}</button>
        </div>
      </section>

      {/* Products - Hijab Layout */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => <ProductCard key={product.id} product={product} category={category} theme="hijab-fashion" />)}
        </div>
      </section>
    </div>;
}