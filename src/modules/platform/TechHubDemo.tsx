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
  Truck,
  Shield,
  RotateCcw,
  Phone,
  Zap,
  Cpu,
  Smartphone
} from 'lucide-react';

function TechHubDemo() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');

  const products = [
    {
      id: 1,
      name: "Gaming Laptop RTX 4070",
      price: 45999,
      originalPrice: 52999,
      image: "https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.8,
      reviews: 342,
      discount: 13,
      specs: ["Intel i7", "16GB RAM", "RTX 4070", "1TB SSD"]
    },
    {
      id: 2,
      name: "Wireless Gaming Mouse",
      price: 899,
      originalPrice: 1199,
      image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.9,
      reviews: 567,
      discount: 25,
      specs: ["25000 DPI", "Wireless", "RGB", "100h Battery"]
    },
    {
      id: 3,
      name: "4K Gaming Monitor 27\"",
      price: 8999,
      originalPrice: 10999,
      image: "https://images.pexels.com/photos/777001/pexels-photo-777001.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.7,
      reviews: 234,
      discount: 18,
      specs: ["4K UHD", "144Hz", "1ms", "HDR10"]
    },
    {
      id: 4,
      name: "Mechanical Keyboard",
      price: 1299,
      originalPrice: 1599,
      image: "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.8,
      reviews: 445,
      discount: 19,
      specs: ["Cherry MX", "RGB", "Wireless", "Hot-swap"]
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
    <div className="min-h-screen bg-gray-900">
      {/* Header */}
      <header className="bg-gray-800 shadow-lg sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button & Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/tema-sistemi')}
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Tema Seçimine Dön
              </button>
              <div className="text-2xl font-bold text-blue-400">TechHub</div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Teknoloji ürünleri ara..."
                  className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700">
                  <Search size={16} />
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-300 hover:text-blue-400 relative">
                <Heart size={24} />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
              </button>
              <button className="p-2 text-gray-300 hover:text-blue-400 relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">1</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-300 hover:text-blue-400">
                <User size={24} />
                <span>Giriş</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center space-x-8 py-3">
              <div className="flex items-center space-x-2 text-blue-400 font-medium">
                <Cpu size={16} />
                <span>Kategoriler</span>
              </div>
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
              <h3 className="font-semibold text-white mb-4 flex items-center">
                <Filter size={16} className="mr-2" />
                Filtreler
              </h3>
              
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

                <div>
                  <h4 className="font-medium text-gray-300 mb-3">Fiyat</h4>
                  <div className="space-y-2">
                    <label className="flex items-center text-gray-400">
                      <input type="checkbox" className="text-blue-600 focus:ring-blue-500 mr-2" />
                      <span className="text-sm">0 - 1.000 TL</span>
                    </label>
                    <label className="flex items-center text-gray-400">
                      <input type="checkbox" className="text-blue-600 focus:ring-blue-500 mr-2" />
                      <span className="text-sm">1.000 - 10.000 TL</span>
                    </label>
                    <label className="flex items-center text-gray-400">
                      <input type="checkbox" className="text-blue-600 focus:ring-blue-500 mr-2" />
                      <span className="text-sm">10.000+ TL</span>
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
                <div className="flex items-center space-x-4">
                  <span className="text-gray-300">{products.length} ürün bulundu</span>
                  <select className="bg-gray-700 border border-gray-600 text-white rounded-md px-3 py-1 text-sm">
                    <option>Önerilen Sıralama</option>
                    <option>En Düşük Fiyat</option>
                    <option>En Yüksek Fiyat</option>
                    <option>En Çok Satan</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-400'}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className="bg-gray-800 rounded-lg overflow-hidden hover:bg-gray-750 transition-colors group">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.discount > 0 && (
                      <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-sm font-medium">
                        %{product.discount} İndirim
                      </div>
                    )}
                    <button className="absolute top-2 right-2 p-2 bg-gray-900 bg-opacity-75 rounded-full hover:bg-opacity-100">
                      <Heart size={16} className="text-gray-300 hover:text-blue-400" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-white mb-2 line-clamp-2">{product.name}</h3>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={12}
                            className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-400 ml-1">({product.reviews})</span>
                    </div>

                    {/* Specs */}
                    <div className="mb-3">
                      <div className="flex flex-wrap gap-1">
                        {product.specs.slice(0, 2).map((spec, index) => (
                          <span key={index} className="text-xs bg-gray-700 text-gray-300 px-2 py-1 rounded">
                            {spec}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-lg font-bold text-white">{formatPrice(product.price)}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 text-xs text-green-400">
                        <Truck size={12} />
                        <span>Ücretsiz Kargo</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-blue-400">
                        <Zap size={12} />
                        <span>Hızlı Teslimat</span>
                      </div>
                    </div>

                    <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors font-medium">
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Ücretsiz Kargo</h3>
              <p className="text-gray-400 text-sm">500 TL üzeri siparişlerde</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Güvenli Ödeme</h3>
              <p className="text-gray-400 text-sm">256-bit SSL şifreleme</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Kolay İade</h3>
              <p className="text-gray-400 text-sm">15 gün içinde ücretsiz</p>
            </div>
            <div className="text-center">
              <div className="bg-gray-700 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-blue-400" />
              </div>
              <h3 className="font-semibold text-white mb-2">Teknik Destek</h3>
              <p className="text-gray-400 text-sm">7/24 uzman desteği</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              &copy; 2025 TechHub - Bu demo Altıntassoft tarafından oluşturulmuştur.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default TechHubDemo;