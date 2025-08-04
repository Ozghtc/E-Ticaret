import React from 'react';
import { Product } from '../../types/database';
import ProductCard from '../../components/ProductCard/ProductCard';
import { categoryUIConfig } from '../../config/categoryUIConfig';

interface FashionStoreTemplateProps {
  products: Product[];
  category: string;
}

export default function FashionStoreTemplate({ products, category }: FashionStoreTemplateProps) {
  const uiConfig = categoryUIConfig[category] || categoryUIConfig.tekstil;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Fashion Store Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-black text-white py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>🚚 Ücretsiz Kargo - 500 TL Üzeri</span>
              <span>✨ Yeni Koleksiyon</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>📞 0212 123 45 67</span>
              <span>📧 info@fashionstore.com</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="text-3xl font-bold text-pink-600">Fashion Store</div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-pink-600 relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <button className="p-2 text-gray-600 hover:text-pink-600 relative">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-pink-600">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Hesabım</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center justify-center space-x-12 py-4">
              <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Yeni Gelenler</a>
              <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Kadın</a>
              <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Erkek</a>
              <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Ayakkabı</a>
              <a href="#" className="text-gray-700 hover:text-pink-600 transition-colors font-medium">Aksesuar</a>
              <a href="#" className="text-pink-600 font-semibold">🔥 İndirim</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-pink-100 to-purple-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Yeni Sezon Koleksiyonu</h1>
          <p className="text-xl text-gray-600 mb-8">Tarzınızı yansıtan özel parçalar</p>
          <button className="bg-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-pink-700 transition-colors text-lg">
            Koleksiyonu Keşfet
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.414A1 1 0 013 6.707V4z" />
                </svg>
                Filtreler
              </h3>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Kategoriler</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="radio" name="category" className="text-pink-600 focus:ring-pink-500" />
                    <span className="ml-2 text-sm text-gray-600">Tüm Ürünler ({products.length})</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="category" className="text-pink-600 focus:ring-pink-500" />
                    <span className="ml-2 text-sm text-gray-600">Yeni Gelenler (8)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="category" className="text-pink-600 focus:ring-pink-500" />
                    <span className="ml-2 text-sm text-gray-600">Kadın Giyim (12)</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="category" className="text-pink-600 focus:ring-pink-500" />
                    <span className="ml-2 text-sm text-gray-600">Erkek Giyim (6)</span>
                  </label>
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Beden</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <button key={size} className="border border-gray-300 py-2 text-sm hover:border-pink-500 hover:text-pink-600 transition-colors rounded">
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Renk</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Siyah', color: 'bg-black' },
                    { name: 'Beyaz', color: 'bg-white border' },
                    { name: 'Mavi', color: 'bg-blue-500' },
                    { name: 'Kırmızı', color: 'bg-red-500' },
                    { name: 'Pembe', color: 'bg-pink-500' }
                  ].map((color) => (
                    <button key={color.name} className={`w-8 h-8 rounded-full ${color.color} hover:scale-110 transition-transform`} title={color.name}></button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Fiyat Aralığı</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="text-pink-600 focus:ring-pink-500" />
                    <span className="ml-2 text-sm text-gray-600">0 - 500 TL</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="text-pink-600 focus:ring-pink-500" />
                    <span className="ml-2 text-sm text-gray-600">500 - 1000 TL</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="text-pink-600 focus:ring-pink-500" />
                    <span className="ml-2 text-sm text-gray-600">1000+ TL</span>
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
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">{products.length} ürün bulundu</span>
                  <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                    <option>Önerilen</option>
                    <option>En Düşük Fiyat</option>
                    <option>En Yüksek Fiyat</option>
                    <option>En Yeni</option>
                    <option>En Popüler</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 rounded bg-pink-100 text-pink-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded text-gray-400">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isNew && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
                        YENİ
                      </div>
                    )}
                    {product.discount && product.discount > 0 && (
                      <div className={`absolute ${product.isNew ? 'top-12 left-3' : 'top-3 left-3'} bg-pink-500 text-white px-2 py-1 rounded text-sm font-medium`}>
                        %{product.discount} İndirim
                      </div>
                    )}
                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                      <svg className="w-4 h-4 text-gray-400 hover:text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>
                    
                    {/* Quick View on Hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <button className="bg-white text-gray-800 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-100">
                        Hızlı Görüntüle
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                        {product.originalPrice && product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Size Options */}
                    {product.sizes && (
                      <div className="mb-3">
                        <div className="flex items-center space-x-1">
                          <span className="text-xs text-gray-500">Beden:</span>
                          {product.sizes.slice(0, 4).map((size) => (
                            <span key={size} className="text-xs bg-gray-100 px-2 py-1 rounded">{size}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    <button className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition-colors font-medium">
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ücretsiz Kargo</h3>
              <p className="text-gray-600 text-sm">500 TL üzeri siparişlerde</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Güvenli Alışveriş</h3>
              <p className="text-gray-600 text-sm">SSL sertifikalı ödeme</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Kolay İade</h3>
              <p className="text-gray-600 text-sm">30 gün içinde ücretsiz</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Müşteri Hizmetleri</h3>
              <p className="text-gray-600 text-sm">7/24 canlı destek</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-pink-600 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Yeni Koleksiyonlardan Haberdar Olun
          </h2>
          <p className="text-pink-100 mb-8">
            İlk sizin öğrenmek istediğiniz kampanya ve yenilikleri e-posta ile alın
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none"
            />
            <button className="bg-black text-white px-6 py-3 rounded-r-lg hover:bg-gray-800 transition-colors">
              Abone Ol
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-pink-400">Fashion Store</h3>
              <p className="text-gray-400 mb-4">
                Tarzınızı yansıtan özel parçalar ile gardırobunuzu tamamlayın.
              </p>
              <div className="flex space-x-4">
                <div className="w-6 h-6 bg-pink-600 rounded"></div>
                <div className="w-6 h-6 bg-blue-600 rounded"></div>
                <div className="w-6 h-6 bg-purple-600 rounded"></div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kategoriler</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Kadın Giyim</a></li>
                <li><a href="#" className="hover:text-white">Erkek Giyim</a></li>
                <li><a href="#" className="hover:text-white">Ayakkabı</a></li>
                <li><a href="#" className="hover:text-white">Aksesuar</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Müşteri Hizmetleri</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">İletişim</a></li>
                <li><a href="#" className="hover:text-white">Kargo & Teslimat</a></li>
                <li><a href="#" className="hover:text-white">İade & Değişim</a></li>
                <li><a href="#" className="hover:text-white">Beden Rehberi</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📍 İstanbul, Türkiye</li>
                <li>📞 0212 123 45 67</li>
                <li>📧 info@fashionstore.com</li>
                <li>🕒 Pazartesi - Cumartesi: 09:00 - 18:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Fashion Store - Tüm hakları saklıdır. Bu demo Altıntassoft tarafından oluşturulmuştur.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}