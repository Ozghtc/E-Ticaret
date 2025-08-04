import React from 'react';
import { Product } from '../types/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import { categoryUIConfig } from '../../config/categoryUIConfig';

interface MegaStoreTemplateProps {
  products: Product[];
  category: string;
}

export default function MegaStoreTemplate({ products, category }: MegaStoreTemplateProps) {
  const uiConfig = categoryUIConfig[category] || categoryUIConfig.tekstil;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-red-600 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>📞 444 0 123</span>
              <span>🚚 Ücretsiz Kargo</span>
              <span>⚡ Aynı Gün Teslimat</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>Satıcı Ol</span>
              <span>Yardım</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-red-600">MegaStore</div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ürün, kategori veya marka ara..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-red-600">
                Favoriler
              </button>
              <button className="p-2 text-gray-600 hover:text-red-600">
                Sepet
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600">
                <span>Giriş Yap</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center space-x-8 py-3">
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">Elektronik</a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">Moda</a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">Ev & Yaşam</a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">Spor</a>
              <a href="#" className="text-gray-700 hover:text-red-600 transition-colors">Kozmetik</a>
              <a href="#" className="text-red-600 font-medium">🔥 Fırsatlar</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-red-600 to-pink-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Mega İndirimler Başladı!</h1>
            <p className="text-xl mb-6">Tüm kategorilerde %70'e varan indirimler</p>
            <button className="bg-white text-red-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Fırsatları Keşfet
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Filtreler</h3>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Kategoriler</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="text-red-600 focus:ring-red-500" />
                    <span className="ml-2 text-sm text-gray-600">Elektronik (324)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="text-red-600 focus:ring-red-500" />
                    <span className="ml-2 text-sm text-gray-600">Moda & Giyim (567)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="text-red-600 focus:ring-red-500" />
                    <span className="ml-2 text-sm text-gray-600">Ev & Yaşam (189)</span>
                  </label>
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Fiyat Aralığı</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="text-red-600 focus:ring-red-500" />
                    <span className="ml-2 text-sm text-gray-600">0 - 1.000 TL</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="text-red-600 focus:ring-red-500" />
                    <span className="ml-2 text-sm text-gray-600">1.000 - 5.000 TL</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="text-red-600 focus:ring-red-500" />
                    <span className="ml-2 text-sm text-gray-600">5.000+ TL</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{products.length} ürün bulundu</span>
                <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                  <option>Önerilen Sıralama</option>
                  <option>En Düşük Fiyat</option>
                  <option>En Yüksek Fiyat</option>
                  <option>En Çok Satan</option>
                  <option>En Yeni</option>
                </select>
              </div>
            </div>

            {/* Products Grid */}
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
                  theme="mega-store"
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}