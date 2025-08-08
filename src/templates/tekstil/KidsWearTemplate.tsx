import React from 'react';
import { Product } from '../../types/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import { categoryUIConfig } from '../../config/categoryUIConfig';
import { useTranslation } from "react-i18next";
interface KidsWearTemplateProps {
  products: Product[];
  category: string;
}
export default function KidsWearTemplate({
  products,
  category
}: KidsWearTemplateProps) {
  const {
    t
  } = useTranslation();
  const uiConfig = categoryUIConfig[category] || categoryUIConfig.tekstil;
  return <div className="min-h-screen bg-gradient-to-br from-yellow-100 to-pink-100">
      {/* Kids Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b-4 border-yellow-300">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-bold text-blue-600 mb-2">👶 Kids Wear</h1>
            <p className="text-orange-500 text-xl font-bold">{t("common.renkli_dünya")}</p>
          </div>
        </div>
      </header>

      {/* Kids Hero */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-6xl font-bold text-green-600 mb-6 animate-bounce">{t("common.çocuklar_i_çin")}</h2>
          <p className="text-2xl text-blue-600 mb-8 leading-relaxed font-bold">{t("common.renkli_eğlenceli_konforlu_kıyafetler")}</p>
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-12 py-4 font-bold text-xl rounded-full hover:scale-110 transition-transform animate-pulse">
            Renkli Koleksiyon!
          </button>
        </div>
      </section>

      {/* Products - Kids Layout */}
      <section className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {products.map(product => <ProductCard key={product.id} product={product} category={category} theme="kids-wear" />)}
        </div>
      </section>
    </div>;
}