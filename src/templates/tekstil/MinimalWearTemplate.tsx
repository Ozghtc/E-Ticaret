import React from 'react';
import { Product } from '../../types/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import { categoryUIConfig } from '../../config/categoryUIConfig';

interface MinimalWearTemplateProps {
  products: Product[];
  category: string;
}

export default function MinimalWearTemplate({ products, category }: MinimalWearTemplateProps) {
  const uiConfig = categoryUIConfig[category] || categoryUIConfig.tekstil;

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-3xl font-light text-gray-900 mb-2">🧼 Minimal Wear</h1>
            <p className="text-gray-500 text-sm tracking-wide">LESS IS MORE</p>
          </div>
        </div>
      </header>

      {/* Minimal Hero */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-light text-gray-900 mb-6">
            Sadelik
          </h2>
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            Gereksiz detaylardan arınmış, saf tasarım
          </p>
          <button className="border border-gray-300 text-gray-700 px-6 py-3 hover:bg-gray-100 transition-colors">
            Koleksiyonu İncele
          </button>
        </div>
      </section>

      {/* Products - Minimal Layout */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              category={category}
              theme="minimal-wear"
            />
          ))}
        </div>
      </section>
    </div>
  );
}