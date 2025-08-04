import React from 'react';
import { Product } from '../../types/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import { categoryUIConfig } from '../../config/categoryUIConfig';

interface TechHubTemplateProps {
  products: Product[];
  category: string;
}

export default function TechHubTemplate({ products, category }: TechHubTemplateProps) {
  const uiConfig = categoryUIConfig[category] || categoryUIConfig.teknoloji;

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-blue-400">TechHub</div>
            
            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Teknoloji ürünleri ara..."
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-300 hover:text-blue-400">
                Favoriler
              </button>
              <button className="p-2 text-gray-300 hover:text-blue-400">
                Sepet
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center space-x-8 py-3">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Laptop</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">PC</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Gaming</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Telefon</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Aksesuar</a>
              <a href="#" className="text-blue-400 font-medium">⚡ Fırsatlar</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-purple-900 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Gaming Sezonunda Mega İndirimler!</h1>
          <p className="text-xl text-blue-200 mb-8">En son teknoloji ürünlerinde %50'ye varan indirimler</p>
          <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Fırsatları Keşfet
          </button>
        </div>
      </section>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-gray-800 rounded-lg p-6">
              <h3 className="font-semibold text-white mb-4">Filtreler</h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="font-medium text-gray-300 mb-3">Kategori</h4>
                  <div className="space-y-2">
                    <label className="flex items-center text-gray-400">
                      <input type="checkbox" className="text-blue-600 focus:ring-blue-500 mr-2" />
                      <span className="text-sm">Laptop (45)</span>
                    </label>
                    <label className="flex items-center text-gray-400">
                      <input type="checkbox" className="text-blue-600 focus:ring-blue-500 mr-2" />
                      <span className="text-sm">Gaming (32)</span>
                    </label>
                    <label className="flex items-center text-gray-400">
                      <input type="checkbox" className="text-blue-600 focus:ring-blue-500 mr-2" />
                      <span className="text-sm">Aksesuar (78)</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-300 mb-3">Marka</h4>
                  <div className="space-y-2">
                    <label className="flex items-center text-gray-400">
                      <input type="checkbox" className="text-blue-600 focus:ring-blue-500 mr-2" />
                      <span className="text-sm">ASUS</span>
                    </label>
                    <label className="flex items-center text-gray-400">
                      <input type="checkbox" className="text-blue-600 focus:ring-blue-500 mr-2" />
                      <span className="text-sm">MSI</span>
                    </label>
                    <label className="flex items-center text-gray-400">
                      <input type="checkbox" className="text-blue-600 focus:ring-blue-500 mr-2" />
                      <span className="text-sm">Razer</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <main className="flex-1">
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-300">{products.length} ürün bulundu</span>
                <select className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-1 text-sm">
                  <option>Önerilen Sıralama</option>
                  <option>En Düşük Fiyat</option>
                  <option>En Yüksek Fiyat</option>
                  <option>En Çok Satan</option>
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
                  theme="tech-hub"
                />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}