import React from 'react';
import { Product } from '../../types/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import { categoryUIConfig } from '../../config/categoryUIConfig';

interface LuxuryStyleTemplateProps {
  products: Product[];
  category: string;
}

export default function LuxuryStyleTemplate({ products, category }: LuxuryStyleTemplateProps) {
  const uiConfig = categoryUIConfig[category] || categoryUIConfig.tekstil;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black">
      {/* Luxury Header */}
      <header className="bg-black/80 backdrop-blur-sm border-b border-yellow-500/30">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-5xl font-serif text-yellow-400 mb-2">💎 LUXURY STYLE</h1>
            <p className="text-yellow-200 text-lg tracking-wide">PREMIUM COLLECTION</p>
          </div>
        </div>
      </header>

      {/* Luxury Hero */}
      <section className="py-20 bg-gradient-to-r from-yellow-900/20 to-yellow-800/20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-6xl font-serif text-white mb-6">
            EXCLUSIVE LUXURY
          </h2>
          <p className="text-2xl text-yellow-200 mb-8 leading-relaxed">
            Premium kalite, eşsiz tasarım, sınırlı koleksiyon
          </p>
          <button className="bg-yellow-500 text-black px-12 py-4 font-bold text-lg tracking-wide hover:bg-yellow-400 transition-colors">
            KOLEKSIYONU KEŞFET
          </button>
        </div>
      </section>

      {/* Products - Luxury Layout */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              category={category}
              theme="luxury-style"
            />
          ))}
        </div>
      </section>
    </div>
  );
}