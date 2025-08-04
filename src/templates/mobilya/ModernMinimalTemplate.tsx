import React from 'react';
import { Product } from '../../types/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import { categoryUIConfig } from '../../config/categoryUIConfig';

interface ModernMinimalTemplateProps {
  products: Product[];
  category: string;
}

export default function ModernMinimalTemplate({ products, category }: ModernMinimalTemplateProps) {
  const uiConfig = categoryUIConfig[category] || categoryUIConfig.mobilya;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-light text-gray-900">Minimal Store</div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  className="w-full px-4 py-2 border border-gray-200 rounded-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-6">
              <button className="text-gray-600 hover:text-gray-800">
                Favoriler
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                Sepet
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                Hesap
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-t border-gray-100">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center justify-center space-x-12 py-4">
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors text-sm uppercase tracking-wide">Ev</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors text-sm uppercase tracking-wide">Ofis</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors text-sm uppercase tracking-wide">Dekorasyon</a>
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors text-sm uppercase tracking-wide">Aydınlatma</a>
              <a href="#" className="text-gray-900 font-medium text-sm uppercase tracking-wide">İndirim</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-light text-gray-900 mb-6">Minimal Tasarım</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Sadelik ve işlevselliği bir araya getiren özel koleksiyon
          </p>
          <button className="bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors text-sm uppercase tracking-wide">
            Koleksiyonu Keşfet
          </button>
        </div>
      </section>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="flex gap-12">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white p-6">
              <h3 className="font-medium text-gray-900 mb-6 text-sm uppercase tracking-wide">
                Filtreler
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3 text-sm">Kategori</h4>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      Mobilya
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      Aydınlatma
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      Dekorasyon
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3 text-sm">Fiyat</h4>
                  <div className="space-y-2">
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      0 - 200 TL
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      200 - 500 TL
                    </label>
                    <label className="flex items-center text-sm">
                      <input type="checkbox" className="mr-2" />
                      500+ TL
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="bg-white p-4 mb-8">
              <div className="flex items-center justify-between">
                <span className="text-gray-600 text-sm">{products.length} ürün</span>
                <select className="border border-gray-200 px-3 py-1 text-sm">
                  <option>Önerilen</option>
                  <option>En Düşük Fiyat</option>
                  <option>En Yüksek Fiyat</option>
                </select>
              </div>
            </div>

            <div className={`grid gap-8 ${
              uiConfig.cardLayout === 'grid-4' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4' :
              uiConfig.cardLayout === 'grid-3' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' :
              uiConfig.cardLayout === 'grid-2' ? 'grid-cols-1 md:grid-cols-2' :
              'grid-cols-1'
            }`}>
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  category={category}
                  theme="modern-minimal"
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}