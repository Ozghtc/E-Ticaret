import React from 'react';
import { Product } from '../../types/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import { categoryUIConfig } from '../../config/categoryUIConfig';
import { useTranslation } from "react-i18next";
interface EcoTextileTemplateProps {
  products: Product[];
  category: string;
}
export default function EcoTextileTemplate({
  products,
  category
}: EcoTextileTemplateProps) {
  const {
    t
  } = useTranslation();
  const uiConfig = categoryUIConfig[category] || categoryUIConfig.tekstil;
  return <div className="min-h-screen bg-green-50">
      {/* Eco Header */}
      <header className="bg-white shadow-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl font-medium text-green-800 mb-2">🌿 Eco Textile</h1>
            <p className="text-green-600 text-lg">{t("common.sürdürülebilir_moda")}</p>
          </div>
        </div>
      </header>

      {/* Eco Hero */}
      <section className="py-20 bg-gradient-to-r from-green-100 to-emerald-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-medium text-green-900 mb-6">{t("common.doğa_dostu_moda")}</h2>
          <p className="text-xl text-green-700 mb-8 leading-relaxed">{t("common.organik_kumaşlar_çevre_dostu_üretim")}</p>
          <button className="bg-green-600 text-white px-8 py-4 font-medium text-lg hover:bg-green-700 transition-colors rounded-lg">
            Organik Koleksiyon
          </button>
        </div>
      </section>

      {/* Products - Eco Layout */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map(product => <ProductCard key={product.id} product={product} category={category} theme="eco-textile" />)}
        </div>
      </section>
    </div>;
}