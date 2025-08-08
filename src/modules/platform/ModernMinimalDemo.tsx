import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Search, ShoppingCart, User, Heart, Star, Filter, Grid3X3, List, Truck, Shield, RotateCcw, Phone } from 'lucide-react';
function ModernMinimalDemo() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const products = [{
    id: 1,
    name: "Minimalist Desk Lamp",
    price: 299,
    originalPrice: 399,
    image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4.9,
    reviews: 127,
    discount: 25
  }, {
    id: 2,
    name: "Clean Design Chair",
    price: 899,
    originalPrice: 1199,
    image: "https://images.pexels.com/photos/586763/pexels-photo-586763.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4.8,
    reviews: 89,
    discount: 25
  }, {
    id: 3,
    name: "Simple Storage Box",
    price: 149,
    originalPrice: 199,
    image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4.7,
    reviews: 156,
    discount: 25
  }, {
    id: 4,
    name: "Minimal Wall Clock",
    price: 199,
    originalPrice: 249,
    image: "https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=300",
    rating: 4.9,
    reviews: 234,
    discount: 20
  }];
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: localStorage.getItem('currency') || 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button & Logo */}
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/admin/tema-sistemi')} className="flex items-center text-gray-600 hover:text-gray-800 transition-colors">
                <ArrowLeft size={20} className="mr-2" />{t("common.tema_seçimine_dön")}</button>
              <div className="text-2xl font-light text-gray-900">Minimal Store</div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input type="text" placeholder={t("common.ürün_ara")} className="w-full px-4 py-2 border border-gray-200 rounded-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400" />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <Search size={18} />
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-6">
              <button className="text-gray-600 hover:text-gray-800 relative">
                <Heart size={20} />
              </button>
              <button className="text-gray-600 hover:text-gray-800 relative">
                <ShoppingCart size={20} />
                <span className="absolute -top-1 -right-1 bg-gray-800 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">1</span>
              </button>
              <button className="text-gray-600 hover:text-gray-800">
                <User size={20} />
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
              <a href="#" className="text-gray-700 hover:text-gray-900 transition-colors text-sm uppercase tracking-wide">{t("common.aydınlatma")}</a>
              <a href="#" className="text-gray-900 font-medium text-sm uppercase tracking-wide">İndirim</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-light text-gray-900 mb-6">{t("common.minimal_tasarım")}</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">{t("common.sadelik_ve_işlevselliği_bir_araya_getiren_özel_koleksiyon")}</p>
          <button className="bg-gray-900 text-white px-8 py-3 hover:bg-gray-800 transition-colors text-sm uppercase tracking-wide">{t("common.koleksiyonu_keşfet")}</button>
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
                      <input type="checkbox" className="mr-2" />{t("common.aydınlatma")}</label>
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
                <div className="flex items-center space-x-4">
                  <select className="border border-gray-200 px-3 py-1 text-sm">
                    <option>{t("common.önerilen")}</option>
                    <option>{t("common.en_düşük_fiyat")}</option>
                    <option>{t("common.en_yüksek_fiyat")}</option>
                  </select>
                  <div className="flex items-center space-x-2">
                    <button onClick={() => setViewMode('grid')} className={`p-1 ${viewMode === 'grid' ? 'text-gray-900' : 'text-gray-400'}`}>
                      <Grid3X3 size={16} />
                    </button>
                    <button onClick={() => setViewMode('list')} className={`p-1 ${viewMode === 'list' ? 'text-gray-900' : 'text-gray-400'}`}>
                      <List size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => <div key={product.id} className="bg-white group">
                  <div className="relative mb-4">
                    <img src={product.image} alt={product.name} className="w-full h-64 object-cover" />
                    {product.discount > 0 && <div className="absolute top-4 left-4 bg-gray-900 text-white px-2 py-1 text-xs">
                        %{product.discount} İndirim
                      </div>}
                    <button className="absolute top-4 right-4 p-2 bg-white hover:bg-gray-50">
                      <Heart size={16} className="text-gray-400" />
                    </button>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                    
                    <div className="flex items-center mb-3">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => <Star key={i} size={12} className={`${i < Math.floor(product.rating) ? 'text-gray-400 fill-current' : 'text-gray-200'}`} />)}
                      </div>
                      <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                    </div>

                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <span className="text-lg font-medium text-gray-900">{formatPrice(product.price)}</span>
                        {product.originalPrice > product.price && <span className="text-sm text-gray-500 line-through ml-2">
                            {formatPrice(product.originalPrice)}
                          </span>}
                      </div>
                    </div>

                    <button className="w-full bg-gray-900 text-white py-2 hover:bg-gray-800 transition-colors text-sm uppercase tracking-wide">
                      Sepete Ekle
                    </button>
                  </div>
                </div>)}
            </div>
          </main>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2 text-sm">Ücretsiz Kargo</h3>
              <p className="text-gray-600 text-sm">{t('common.aboveAmount', {
                amount: 200
              })}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2 text-sm">Güvenli Ödeme</h3>
              <p className="text-gray-600 text-sm">{t("common.ssl_korumalı")}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2 text-sm">{t("common.kolay_i_ade")}</h3>
              <p className="text-gray-600 text-sm">{t("common.30_gün_içinde")}</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-gray-600" />
              </div>
              <h3 className="font-medium text-gray-900 mb-2 text-sm">Destek</h3>
              <p className="text-gray-600 text-sm">{t("common.7_24_yardım")}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-100 mt-8 pt-8 text-center">
            <p className="text-gray-500 text-sm">{t("common.2025_minimal_store_bu_demo_altıntassoft_tarafından_oluşturulmuştur")}</p>
          </div>
        </div>
      </footer>
    </div>;
}
export default ModernMinimalDemo;