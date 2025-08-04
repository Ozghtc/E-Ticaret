import React from 'react';
import { Product } from '../../types/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import { categoryUIConfig } from '../../config/categoryUIConfig';

interface UrbanStreetTemplateProps {
  products: Product[];
  category: string;
}

export default function UrbanStreetTemplate({ products, category }: UrbanStreetTemplateProps) {
  const uiConfig = categoryUIConfig[category] || categoryUIConfig.tekstil;

  return (
    <div className="min-h-screen bg-black">
      {/* Urban Header */}
      <header className="bg-black border-b-2 border-red-500">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">🏙️ URBAN STREET</h1>
            <p className="text-red-400 text-lg font-bold">STREETWEAR CULTURE</p>
          </div>
        </div>
      </header>

      {/* Urban Hero */}
      <section className="py-16 bg-gradient-to-r from-red-900 to-black">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-white mb-6 transform -skew-x-12">
            STREET STYLE
          </h2>
          <p className="text-xl text-red-200 mb-8">
            Sokakların ritmi, gençliğin enerjisi
          </p>
          <button className="bg-red-600 text-white px-8 py-4 font-bold text-lg hover:bg-red-700 transition-colors transform hover:scale-105">
            KOLEKSIYONU GÖR
          </button>
        </div>
      </section>

      {/* Products - Urban Layout */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              category={category}
              theme="urban-street"
            />
          ))}
        </div>
      </section>
    </div>
  );
}