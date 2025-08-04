import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  ShoppingCart, 
  User, 
  Heart,
  Star,
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  Truck,
  Shield,
  RotateCcw,
  Phone
} from 'lucide-react';

function MegaStoreDemo() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'Tüm Kategoriler', count: 1247 },
    { id: 'elektronik', name: 'Elektronik', count: 324 },
    { id: 'moda', name: 'Moda & Giyim', count: 567 },
    { id: 'ev', name: 'Ev & Yaşam', count: 189 },
    { id: 'spor', name: 'Spor & Outdoor', count: 167 }
  ];

  const products = [
    {
      id: 1,
      name: "iPhone 15 Pro Max 256GB",
      price: 54999,
      originalPrice: 59999,
      image: "https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.8,
      reviews: 1247,
      discount: 8,
      freeShipping: true,
      fastDelivery: true
    },
    {
      id: 2,
      name: "Samsung Galaxy S24 Ultra",
      price: 49999,
      originalPrice: 54999,
      image: "https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.7,
      reviews: 892,
      discount: 9,
      freeShipping: true,
      fastDelivery: false
    },
    {
      id: 3,
      name: "MacBook Air M3 13\"",
      price: 42999,
      originalPrice: 47999,
      image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.9,
      reviews: 567,
      discount: 10,
      freeShipping: true,
      fastDelivery: true
    },
    {
      id: 4,
      name: "Nike Air Max 270",
      price: 2499,
      originalPrice: 2999,
      image: "https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.6,
      reviews: 1834,
      discount: 17,
      freeShipping: true,
      fastDelivery: true
    },
    {
      id: 5,
      name: "Sony WH-1000XM5 Kulaklık",
      price: 8999,
      originalPrice: 10999,
      image: "https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.8,
      reviews: 743,
      discount: 18,
      freeShipping: true,
      fastDelivery: false
    },
    {
      id: 6,
      name: "Dyson V15 Detect Süpürge",
      price: 15999,
      originalPrice: 18999,
      image: "https://images.pexels.com/photos/4239146/pexels-photo-4239146.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.7,
      reviews: 456,
      discount: 16,
      freeShipping: true,
      fastDelivery: true
    }
  ];

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
            {/* Back Button & Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/tema-sistemi')}
                className="flex items-center text-gray-600 hover:text-red-600 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Tema Seçimine Dön
              </button>
              <div className="text-2xl font-bold text-red-600">MegaStore</div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ürün, kategori veya marka ara..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-red-600 text-white p-2 rounded-md hover:bg-red-700">
                  <Search size={16} />
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-red-600 relative">
                <Heart size={24} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <button className="p-2 text-gray-600 hover:text-red-600 relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-600">
                <User size={24} />
                <span>Giriş Yap</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center space-x-8 py-3">
              <div className="flex items-center space-x-2 text-red-600 font-medium">
                <Grid3X3 size={16} />
                <span>Kategoriler</span>
                <ChevronDown size={16} />
              </div>
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
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter size={16} className="mr-2" />
                Filtreler
              </h3>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Kategoriler</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-red-600 focus:ring-red-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        {category.name} ({category.count})
                      </span>
                    </label>
                  ))}
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

              {/* Brand */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Marka</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="text-red-600 focus:ring-red-500" />
                    <span className="ml-2 text-sm text-gray-600">Apple</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="text-red-600 focus:ring-red-500" />
                    <span className="ml-2 text-sm text-gray-600">Samsung</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="text-red-600 focus:ring-red-500" />
                    <span className="ml-2 text-sm text-gray-600">Nike</span>
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
                  <span className="text-gray-600">1.247 ürün bulundu</span>
                  <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                    <option>Önerilen Sıralama</option>
                    <option>En Düşük Fiyat</option>
                    <option>En Yüksek Fiyat</option>
                    <option>En Çok Satan</option>
                    <option>En Yeni</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-red-100 text-red-600' : 'text-gray-400'}`}
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-red-100 text-red-600' : 'text-gray-400'}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-sm font-medium">
                        %{product.discount} İndirim
                      </div>
                    )}
                    <button className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                      <Heart size={16} className="text-gray-400 hover:text-red-500" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 text-xs text-green-600">
                        {product.freeShipping && (
                          <div className="flex items-center">
                            <Truck size={12} className="mr-1" />
                            <span>Ücretsiz Kargo</span>
                          </div>
                        )}
                        {product.fastDelivery && (
                          <div className="flex items-center">
                            <span>⚡ Hızlı Teslimat</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <button className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition-colors font-medium">
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
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ücretsiz Kargo</h3>
              <p className="text-gray-600 text-sm">150 TL üzeri siparişlerde</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Güvenli Ödeme</h3>
              <p className="text-gray-600 text-sm">256-bit SSL şifreleme</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Kolay İade</h3>
              <p className="text-gray-600 text-sm">15 gün içinde ücretsiz</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">7/24 Destek</h3>
              <p className="text-gray-600 text-sm">Canlı destek hattı</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">MegaStore</h3>
              <p className="text-gray-400 mb-4">
                Türkiye'nin en büyük online alışveriş platformu
              </p>
              <div className="flex space-x-4">
                <div className="w-8 h-8 bg-blue-600 rounded"></div>
                <div className="w-8 h-8 bg-pink-600 rounded"></div>
                <div className="w-8 h-8 bg-blue-400 rounded"></div>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kurumsal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Hakkımızda</a></li>
                <li><a href="#" className="hover:text-white">Kariyer</a></li>
                <li><a href="#" className="hover:text-white">Basın</a></li>
                <li><a href="#" className="hover:text-white">İletişim</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Yardım</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Sıkça Sorulanlar</a></li>
                <li><a href="#" className="hover:text-white">Kargo & Teslimat</a></li>
                <li><a href="#" className="hover:text-white">İade & Değişim</a></li>
                <li><a href="#" className="hover:text-white">Güvenlik</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hesabım</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Giriş Yap</a></li>
                <li><a href="#" className="hover:text-white">Siparişlerim</a></li>
                <li><a href="#" className="hover:text-white">Favorilerim</a></li>
                <li><a href="#" className="hover:text-white">Adres Defterim</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 MegaStore - Tüm hakları saklıdır. Bu demo Altıntassoft tarafından oluşturulmuştur.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default MegaStoreDemo;