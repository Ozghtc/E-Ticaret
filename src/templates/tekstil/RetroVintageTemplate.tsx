import React from 'react';
import { Product } from '../../types/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import { categoryUIConfig } from '../../config/categoryUIConfig';
import { useTranslation } from "react-i18next";
interface RetroVintageTemplateProps {
  products: Product[];
  category: string;
}
export default function RetroVintageTemplate({
  products,
  category
}: RetroVintageTemplateProps) {
  const {
    t
  } = useTranslation();
  const uiConfig = categoryUIConfig[category] || categoryUIConfig.tekstil;
  return <div className="min-h-screen bg-amber-50">
      {/* Retro Header */}
      <header className="bg-amber-100 border-b-4 border-amber-300">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-serif text-amber-900 mb-2">🎞️ Retro Vintage</h1>
            <p className="text-amber-700 text-lg italic">Classic Collection</p>
          </div>
        </div>
      </header>

      {/* Retro Hero */}
      <section className="py-20 bg-gradient-to-r from-amber-200 to-orange-200">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-serif text-amber-900 mb-6">
            Vintage Charm
          </h2>
          <p className="text-xl text-amber-800 mb-8 leading-relaxed">{t("common.geçmişin_zarafeti_bugünün_konforu")}</p>
          <button className="bg-amber-600 text-white px-8 py-4 font-serif text-lg hover:bg-amber-700 transition-colors">
            Vintage Koleksiyonu
          </button>
        </div>
      </section>

      {/* Products - Retro Layout */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => <ProductCard key={product.id} product={product} category={category} theme="retro-vintage" />)}
        </div>
      </section>
    </div>;
}