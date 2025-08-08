import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ShoppingCart, User, Heart, Star, Filter, Grid3X3, List, Truck, Shield, RotateCcw, Phone, Leaf, Award } from 'lucide-react';
import { useTranslation } from "react-i18next";
function OrganicMarketDemo() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const products = [{
    id: 1,
    name: t("common.organik_zeytinyağı_500ml"),
    price: 89,
    originalPrice: 109,
    image: "https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=300",
    rating: 4.9,
    reviews: 127,
    discount: 18,
    organic: true,
    local: true
  }, {
    id: 2,
    name: t("common.doğal_bal_250g"),
    price: 65,
    originalPrice: 79,
    image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4.8,
    reviews: 89,
    discount: 18,
    organic: true,
    local: false
  }, {
    id: 3,
    name: t("common.organik_tam_buğday_unu_1kg"),
    price: 25,
    originalPrice: 32,
    image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4.7,
    reviews: 156,
    discount: 22,
    organic: true,
    local: true
  }, {
    id: 4,
    name: t("common.çiftlik_yumurtası_15_li"),
    price: 45,
    originalPrice: 55,
    image: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4.9,
    reviews: 234,
    discount: 18,
    organic: false,
    local: true
  }];
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: localStorage.getItem('currency') || 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };
  return <div className="min-h-screen bg-green-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-green-600 text-white py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>{t("common.100_doğal_ürünler")}</span>
              <span>🚚 Aynı Gün Teslimat</span>
              <span>{t("common.organik_sertifikalı")}</span>
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
            {/* Back Button & Logo */}
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/admin/tema-sistemi')} className="flex items-center text-gray-600 hover:text-green-600 transition-colors">
                <ArrowLeft size={20} className="mr-2" />{t("common.tema_seçimine_dön")}</button>
              <div className="flex items-center space-x-2">
                <Leaf className="text-green-600" size={28} />
                <div className="text-2xl font-bold text-green-600">Organic Market</div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input type="text" placeholder={t("common.organik_ürün_ara")} className="w-full px-4 py-3 pr-12 border border-green-200 rounded-full focus:ring-2 focus:ring-green-500 focus:border-green-500" />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-green-600 text-white p-2 rounded-full hover:bg-green-700">
                  <Search size={16} />
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-green-600 relative">
                <Heart size={24} />
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">3</span>
              </button>
              <button className="p-2 text-gray-600 hover:text-green-600 relative">
                <ShoppingCart size={24} />
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">2</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-green-600">
                <User size={24} />
                <span>{t("common.hesabım")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="border-t border-green-100">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center justify-center space-x-8 py-3">
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Meyve & Sebze</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t("common.süt_ürünleri")}</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">Et & Tavuk</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t("common.tahıllar")}</a>
              <a href="#" className="text-gray-700 hover:text-green-600 transition-colors font-medium">{t("common.i_çecekler")}</a>
              <a href="#" className="text-green-600 font-semibold">🌿 Organik</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-100 to-green-200 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold text-green-800 mb-4">{t("common.doğanın_en_taze_ürünleri")}</h1>
          <p className="text-xl text-green-700 mb-8">{t("common.organik_sertifikalı_çiftlikten_sofraya_taze_ürünler")}</p>
          <button className="bg-green-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-green-700 transition-colors">{t("common.organik_ürünleri_keşfet")}</button>
        </div>
      </section>

      {/* Products Section */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter size={16} className="mr-2" />
                Filtreler
              </h3>
              
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
                      <span className="text-sm text-gray-600">{t("common.süt_ürünleri_23")}</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="text-green-600 focus:ring-green-500 mr-2" />
                      <span className="text-sm text-gray-600">{t("common.tahıllar_18")}</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">{t("common.özellikler")}</h4>
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
                      <span className="text-sm text-gray-600">{t("common.yerel_üretici")}</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="text-green-600 focus:ring-green-500 mr-2" />
                      <span className="text-sm text-gray-600">Glutensiz</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-3">Fiyat</h4>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input type="checkbox" className="text-green-600 focus:ring-green-500 mr-2" />
                      <span className="text-sm text-gray-600">0 - 50 TL</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="text-green-600 focus:ring-green-500 mr-2" />
                      <span className="text-sm text-gray-600">50 - 100 TL</span>
                    </label>
                    <label className="flex items-center">
                      <input type="checkbox" className="text-green-600 focus:ring-green-500 mr-2" />
                      <span className="text-sm text-gray-600">100+ TL</span>
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
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">{products.length}{t("common.ürün_bulundu")}</span>
                  <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                    <option>{t("common.önerilen")}</option>
                    <option>{t("common.en_düşük_fiyat")}</option>
                    <option>{t("common.en_yüksek_fiyat")}</option>
                    <option>En Taze</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setViewMode('grid')} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-green-100 text-green-600' : 'text-gray-400'}`}>
                    <Grid3X3 size={16} />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-2 rounded ${viewMode === 'list' ? 'bg-green-100 text-green-600' : 'text-gray-400'}`}>
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map(product => <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow overflow-hidden group">
                  <div className="relative">
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                    {product.discount > 0 && <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
                        %{product.discount} İndirim
                      </div>}
                    <div className="absolute top-2 right-2 flex flex-col space-y-1">
                      {product.organic && <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center">
                          <Leaf size={10} className="mr-1" />
                          Organik
                        </div>}
                      {product.local && <div className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs">
                          Yerel
                        </div>}
                    </div>
                    <button className="absolute bottom-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                      <Heart size={16} className="text-gray-400 hover:text-green-500" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
                      </div>
                      <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                        {product.originalPrice > product.price && <span className="text-sm text-gray-500 line-through ml-2">
                            {formatPrice(product.originalPrice)}
                          </span>}
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2 text-xs text-green-600">
                        <Truck size={12} />
                        <span>{t("common.aynı_gün_teslimat")}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-blue-600">
                        <Award size={12} />
                        <span>{t("common.sertifikalı")}</span>
                      </div>
                    </div>

                    <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-colors font-medium">
                      Sepete Ekle
                    </button>
                  </div>
                </div>)}
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
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">%100 Organik</h3>
              <p className="text-gray-600 text-sm">{t("common.sertifikalı_organik_ürünler")}</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{t("common.aynı_gün_teslimat")}</h3>
              <p className="text-gray-600 text-sm">{t("common.taze_ürünler_kapınızda")}</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Kalite Garantisi</h3>
              <p className="text-gray-600 text-sm">Memnun kalmazsan iade</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Uzman Destek</h3>
              <p className="text-gray-600 text-sm">Beslenme danışmanlığı</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Leaf className="text-green-400" size={24} />
                <h3 className="text-xl font-bold">Organic Market</h3>
              </div>
              <p className="text-green-200 mb-4">{t("common.doğanın_en_taze_ve_sağlıklı_ürünlerini_sofralarınıza_getiriyoruz")}</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kategoriler</h4>
              <ul className="space-y-2 text-green-200">
                <li><a href="#" className="hover:text-white">Meyve & Sebze</a></li>
                <li><a href="#" className="hover:text-white">{t("common.süt_ürünleri")}</a></li>
                <li><a href="#" className="hover:text-white">Et & Tavuk</a></li>
                <li><a href="#" className="hover:text-white">{t("common.tahıllar")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Hizmetler</h4>
              <ul className="space-y-2 text-green-200">
                <li><a href="#" className="hover:text-white">{t("common.aynı_gün_teslimat")}</a></li>
                <li><a href="#" className="hover:text-white">Organik Sertifika</a></li>
                <li><a href="#" className="hover:text-white">{t("common.beslenme_danışmanlığı")}</a></li>
                <li><a href="#" className="hover:text-white">{t("common.çiftlik_turu")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">{t("common.i_letişim")}</h4>
              <ul className="space-y-2 text-green-200">
                <li>{t("common.i_stanbul_türkiye")}</li>
                <li>📞 0212 555 0123</li>
                <li>📧 info@organicmarket.com</li>
                <li>{t("common.7_24_açık")}</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-green-700 mt-8 pt-8 text-center">
            <p className="text-green-200">{t("common.2025_organic_market_bu_demo_altıntassoft_tarafından_oluşturulmuştur")}</p>
          </div>
        </div>
      </footer>
    </div>;
}
export default OrganicMarketDemo;