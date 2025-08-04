import React from 'react';
import { Product } from '../../types/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import { categoryUIConfig } from '../../config/categoryUIConfig';

interface OutletZoneTemplateProps {
  products: Product[];
  category: string;
}

export default function OutletZoneTemplate({ products, category }: OutletZoneTemplateProps) {
  const uiConfig = categoryUIConfig[category] || categoryUIConfig.tekstil;

  return (
    <div className="min-h-screen bg-red-50">
      {/* Outlet Header */}
      <header className="bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-2 animate-pulse">🔖 OUTLET ZONE</h1>
            <p className="text-red-200 text-xl font-bold">MEGA İNDİRİMLER!</p>
          </div>
        </div>
      </header>

      {/* Outlet Hero */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-6xl font-bold mb-6 animate-bounce">
            %70'E VARAN İNDİRİM!
          </h2>
          <p className="text-2xl mb-8 font-bold">
            Sınırlı süre! Kaçırma!
          </p>
          <button className="bg-yellow-400 text-red-600 px-12 py-4 font-bold text-xl hover:bg-yellow-300 transition-colors animate-pulse">
            HEMEN AL!
          </button>
        </div>
      </section>

      {/* Products - Outlet Layout */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              category={category}
              theme="outlet-zone"
            />
          ))}
        </div>
      </section>
    </div>
  );
}