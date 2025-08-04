import React from 'react';
import { Product } from '../../types/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import { categoryUIConfig } from '../../config/categoryUIConfig';
import { Leaf } from 'lucide-react';

interface OrganicMarketTemplateProps {
  products: Product[];
  category: string;
}

export default function OrganicMarketTemplate({ products, category }: OrganicMarketTemplateProps) {
  const uiConfig = categoryUIConfig[category] || categoryUIConfig.gida;

  return (
    <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-green-600 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>🌱 %100 Doğal Ürünler</span>
              <span>🚚 Aynı Gün Teslimat</span>
              <span>🏆 Organik Sertifikalı</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>📞 0212 555 0123</span>
              <span>📧 info@organicmarket.com</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Leaf className="text-green-600" size={28} />
              <div className="text-2xl font-bold text-green-600">Organic Market</div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Organik ürün ara..."
                  className="w-full px-4 py-3 pr-12 border border-green-200 rounded-full focus:ring-2 focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-green-600">
                Favoriler
              </button>
              <button className="p-2 text-gray-600 hover:text-green-600">
                Sepet
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="border-t border-green-100">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center justify-center space-x-8 py-3">
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Meyve & Sebze</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Süt Ürünleri</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Et & Tavuk</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Tahıllar</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">İçecekler</a>
              <a href="#" className="text-green-600 font-semibold">🌿 Organik</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-100 to-green-200 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-4">Doğanın En Taze Ürünleri</h1>
          <p className="text-xl text-green-700 mb-8">Organik sertifikalı, çiftlikten sofraya taze ürünler</p>
          <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors">
            Organik Ürünleri Keşfet
          </button>
        </div>
      </section>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Filtreler</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Kategori</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="text-green-600 focus:ring-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Meyve & Sebze (45)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="text-green-600 focus:ring-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Süt Ürünleri (23)</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="text-green-600 focus:ring-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Tahıllar (18)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Özellikler</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="text-green-600 focus:ring-green-500 mr-2" />
                      <span className="text-sm text-gray-600 flex items-center">
                        <Leaf size={12} className="mr-1 text-green-500" />
                        Organik
                      </span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="text-green-600 focus:ring-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Yerel Üretici</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="text-green-600 focus:ring-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Glutensiz</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{products.length} ürün bulundu</span>
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option>Önerilen</option>
                  <option>En Düşük Fiyat</option>
                  <option>En Yüksek Fiyat</option>
                  <option>En Taze</option>
                </select>
              </div>
            </div>

            <div className={`grid gap-6 ${
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
                  theme="organic-market"
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}