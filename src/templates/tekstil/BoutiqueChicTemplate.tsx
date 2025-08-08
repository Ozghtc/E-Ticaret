import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useTheme, Product } from '../../context/ThemeContext';
import { Search, ShoppingBag, User, Heart, Star, Filter, Grid3X3, List, Truck, Shield, RotateCcw, Phone, Instagram, Facebook, Twitter, Sparkles, Crown, Gift } from 'lucide-react';
interface BoutiqueChicTemplateProps {
  products: Product[];
  category: string;
}
export default function BoutiqueChicTemplate({
  products,
  category
}: BoutiqueChicTemplateProps) {
  const {
    products: allProducts
  } = useTheme();
  const [viewMode, setViewMode] = useState('grid');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Filter only fashion products for Boutique Chic
  const fashionProducts = allProducts.filter(p => p.category === 'fashion');
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: localStorage.getItem('currency') || 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };
  const getProductTag = (product: Product) => {
    if (product.isNew) return {
      text: '#NewArrival',
      color: 'bg-pink-100 text-pink-700',
      icon: Sparkles
    };
    if (product.isBestseller) return {
      text: '#Boutique',
      color: 'bg-purple-100 text-purple-700',
      icon: Crown
    };
    if (product.discount && product.discount > 20) return {
      text: '#Handmade',
      color: 'bg-rose-100 text-rose-700',
      icon: Gift
    };
    return {
      text: '#Boutique',
      color: 'bg-purple-100 text-purple-700',
      icon: Crown
    };
  };
  return <div className="min-h-screen bg-gradient-to-br from-pink-50 via-rose-50 to-purple-50">
      {/* Elegant Header */}
      <header className="bg-white/90 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-pink-100">
        {/* Top Bar */}
        <div className="bg-gradient-to-r from-pink-200 to-purple-200 py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-6 text-purple-800">
              <span className="flex items-center">
                <Sparkles size={14} className="mr-1" />{t("common.özel_koleksiyon")}</span>
              <span className="flex items-center">
                <Truck size={14} className="mr-1" />{t("common.ücretsiz_kargo_300_tl_üzeri")}</span>
            </div>
            <div className="flex items-center space-x-4 text-purple-800">
              <span>📞 0212 345 67 89</span>
              <span>{t("common.sınırlı_sayı_ürünler")}</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center">
                <Crown className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-3xl font-serif text-purple-800">Boutique Chic</h1>
                <p className="text-sm text-purple-600 italic">{t("common.zarif_şık_koleksiyon")}</p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input type="text" placeholder={t("common.zarif_parçalar_ara")} className="w-full px-6 py-3 pr-12 border-2 border-pink-200 rounded-full focus:ring-2 focus:ring-purple-300 focus:border-purple-300 bg-white/80 backdrop-blur-sm" />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-pink-400 to-purple-500 text-white p-2 rounded-full hover:from-pink-500 hover:to-purple-600 transition-all">
                  <Search size={16} />
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-3 text-purple-600 hover:text-purple-800 relative transition-colors">
                <Heart size={24} />
                {wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlist.length}
                  </span>}
              </button>
              <button className="p-3 text-purple-600 hover:text-purple-800 relative transition-colors">
                <ShoppingBag size={24} />
                {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cart.length}
                  </span>}
              </button>
              <button className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 transition-colors">
                <User size={24} />
                <span className="font-medium">{t("common.hesabım")}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="border-t border-pink-100">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center justify-center space-x-12 py-4">
              <a href="#" className="text-purple-700 hover:text-purple-900 transition-colors font-medium flex items-center">
                <Sparkles size={16} className="mr-1" />
                Yeni Koleksiyon
              </a>
              <a href="#" className="text-purple-700 hover:text-purple-900 transition-colors font-medium">Elbiseler</a>
              <a href="#" className="text-purple-700 hover:text-purple-900 transition-colors font-medium">Bluzlar</a>
              <a href="#" className="text-purple-700 hover:text-purple-900 transition-colors font-medium">Etekler</a>
              <a href="#" className="text-purple-700 hover:text-purple-900 transition-colors font-medium">Aksesuarlar</a>
              <a href="#" className="text-pink-600 font-semibold flex items-center">
                <Crown size={16} className="mr-1" />{t("common.özel_tasarım")}</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Elegant Hero Section */}
      <section className="py-20 bg-gradient-to-r from-pink-100 via-purple-100 to-rose-100">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Crown className="text-purple-600 mr-3" size={32} />
            <h1 className="text-5xl font-serif text-purple-900">{t("common.zarafet_burada_başlar")}</h1>
            <Crown className="text-purple-600 ml-3" size={32} />
          </div>
          <p className="text-xl text-purple-700 mb-8 leading-relaxed max-w-3xl mx-auto">{t("common.her_parça_özenle_seçilmiş_kadının_güzelliğini_ortaya_çıkaran_özel_tasarımlar_el_yapımı_detaylar_ve_sınırlı_üretim_koleksiyonumuzla_tarzınızı_yansıtın")}</p>
          <div className="flex items-center justify-center space-x-4">
            <button className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-8 py-4 rounded-full font-medium hover:from-pink-500 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg">
              <Sparkles className="inline mr-2" size={20} />{t("common.koleksiyonu_keşfet")}</button>
            <button className="border-2 border-purple-300 text-purple-700 px-8 py-4 rounded-full font-medium hover:bg-purple-50 transition-all">{t("common.özel_tasarımlar")}</button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex gap-8">
          {/* Elegant Sidebar */}
          <aside className="w-80 flex-shrink-0">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-8 border border-pink-200">
              <h3 className="font-serif text-xl text-purple-900 mb-6 flex items-center">
                <Filter size={20} className="mr-3 text-purple-600" />
                Zarif Filtreler
              </h3>
              
              {/* Categories */}
              <div className="mb-8">
                <h4 className="font-medium text-purple-800 mb-4 text-lg">Koleksiyonlar</h4>
                <div className="space-y-3">
                  <label className="flex items-center group cursor-pointer">
                    <input type="radio" name="category" className="text-purple-600 focus:ring-purple-500 mr-3" />
                    <span className="text-purple-700 group-hover:text-purple-900 transition-colors">
                      Tüm Ürünler ({fashionProducts.length})
                    </span>
                  </label>
                  <label className="flex items-center group cursor-pointer">
                    <input type="radio" name="category" className="text-purple-600 focus:ring-purple-500 mr-3" />
                    <span className="text-purple-700 group-hover:text-purple-900 transition-colors flex items-center">
                      <Sparkles size={14} className="mr-1" />
                      Yeni Koleksiyon (8)
                    </span>
                  </label>
                  <label className="flex items-center group cursor-pointer">
                    <input type="radio" name="category" className="text-purple-600 focus:ring-purple-500 mr-3" />
                    <span className="text-purple-700 group-hover:text-purple-900 transition-colors flex items-center">
                      <Crown size={14} className="mr-1" />{t("common.özel_tasarım_5")}</span>
                  </label>
                  <label className="flex items-center group cursor-pointer">
                    <input type="radio" name="category" className="text-purple-600 focus:ring-purple-500 mr-3" />
                    <span className="text-purple-700 group-hover:text-purple-900 transition-colors flex items-center">
                      <Gift size={14} className="mr-1" />{t("common.el_yapımı_12")}</span>
                  </label>
                </div>
              </div>

              {/* Size Filter */}
              <div className="mb-8">
                <h4 className="font-medium text-purple-800 mb-4 text-lg">Beden</h4>
                <div className="grid grid-cols-3 gap-3">
                  {['XS', 'S', 'M', 'L', 'XL'].map(size => <button key={size} className="border-2 border-pink-200 py-3 text-sm font-medium text-purple-700 hover:border-purple-400 hover:bg-purple-50 transition-all rounded-lg">
                      {size}
                    </button>)}
                </div>
              </div>

              {/* Color Filter */}
              <div className="mb-8">
                <h4 className="font-medium text-purple-800 mb-4 text-lg">Renk Paleti</h4>
                <div className="flex flex-wrap gap-3">
                  {[{
                  name: 'Pudra',
                  color: 'bg-pink-200'
                }, {
                  name: 'Krem',
                  color: 'bg-yellow-100'
                }, {
                  name: 'Bej',
                  color: 'bg-amber-100'
                }, {
                  name: 'Lila',
                  color: 'bg-purple-200'
                }, {
                  name: 'Beyaz',
                  color: 'bg-white border-2 border-gray-200'
                }, {
                  name: 'Siyah',
                  color: 'bg-gray-800'
                }].map(color => <button key={color.name} className={`w-10 h-10 rounded-full ${color.color} hover:scale-110 transition-transform shadow-md hover:shadow-lg`} title={color.name}></button>)}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-8">
                <h4 className="font-medium text-purple-800 mb-4 text-lg">{t("common.fiyat_aralığı")}</h4>
                <div className="space-y-3">
                  <label className="flex items-center group cursor-pointer">
                    <input type="checkbox" className="text-purple-600 focus:ring-purple-500 mr-3" />
                    <span className="text-purple-700 group-hover:text-purple-900 transition-colors">200 - 500 TL</span>
                  </label>
                  <label className="flex items-center group cursor-pointer">
                    <input type="checkbox" className="text-purple-600 focus:ring-purple-500 mr-3" />
                    <span className="text-purple-700 group-hover:text-purple-900 transition-colors">500 - 1000 TL</span>
                  </label>
                  <label className="flex items-center group cursor-pointer">
                    <input type="checkbox" className="text-purple-600 focus:ring-purple-500 mr-3" />
                    <span className="text-purple-700 group-hover:text-purple-900 transition-colors">1000+ TL</span>
                  </label>
                </div>
              </div>

              {/* Special Offers */}
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 rounded-xl p-6 border border-pink-200">
                <h4 className="font-serif text-lg text-purple-900 mb-3 flex items-center">
                  <Gift className="mr-2" size={20} />{t("common.özel_fırsatlar")}</h4>
                <p className="text-sm text-purple-700 mb-4">{t("common.sınırlı_sayıda_el_yapımı_parçalar_için_özel_indirimler")}</p>
                <button className="w-full bg-gradient-to-r from-pink-400 to-purple-500 text-white py-2 rounded-lg font-medium hover:from-pink-500 hover:to-purple-600 transition-all">{t("common.fırsatları_gör")}</button>
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <main className="flex-1">
            {/* Elegant Toolbar */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 mb-8 border border-pink-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <span className="text-purple-800 font-medium" data-product-count>{fashionProducts.length + 6}{t("common.zarif_parça_bulundu")}</span>
                  <select className="border-2 border-pink-200 rounded-lg px-4 py-2 text-sm font-medium text-purple-700 focus:ring-2 focus:ring-purple-300 bg-white/80">
                    <option>{t("common.önerilen_sıralama")}</option>
                    <option>En Zarif</option>
                    <option>{t("common.en_düşük_fiyat")}</option>
                    <option>{t("common.en_yüksek_fiyat")}</option>
                    <option>Yeni Gelenler</option>
                    <option>{t("common.el_yapımı_önce")}</option>
                  </select>
                </div>
                <div className="flex items-center space-x-3">
                  <button onClick={() => setViewMode('grid')} className={`p-3 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-purple-100 text-purple-700 shadow-md' : 'text-purple-400 hover:text-purple-600'}`}>
                    <Grid3X3 size={18} />
                  </button>
                  <button onClick={() => setViewMode('list')} className={`p-3 rounded-lg transition-all ${viewMode === 'list' ? 'bg-purple-100 text-purple-700 shadow-md' : 'text-purple-400 hover:text-purple-600'}`}>
                    <List size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Boutique Products Grid */}
            <div className="grid grid-cols-1 gap-8">
              {fashionProducts.map(product => {
              const tag = getProductTag(product);
              const TagIcon = tag.icon;
              return <div key={product.id} className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 overflow-hidden border border-pink-200 group max-w-4xl">
                    <div className="flex h-80">
                      {/* Product Image - Sol */}
                      <div className="w-1/2 relative overflow-hidden">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        
                        {/* Elegant Badges */}
                        <div className="absolute top-4 left-4 flex flex-col space-y-2">
                          {product.discount && product.discount > 0 && <div className="bg-gradient-to-r from-pink-400 to-rose-500 text-white px-3 py-1 rounded-full text-xs font-medium shadow-lg">
                              %{product.discount} İndirim
                            </div>}
                          <div className={`${tag.color} px-3 py-1 rounded-full text-xs font-medium shadow-md flex items-center`}>
                            <TagIcon size={12} className="mr-1" />
                            {tag.text}
                          </div>
                        </div>

                        {/* Rating Badge */}
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1 shadow-md">
                          <Star size={12} className="text-yellow-500 fill-current" />
                          <span className="text-xs font-medium text-gray-800">{product.rating}</span>
                        </div>

                        {/* Wishlist Button */}
                        <button className="absolute bottom-4 right-4 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all group-hover:scale-110">
                          <Heart size={18} className="text-purple-400 hover:text-pink-500 transition-colors" />
                        </button>
                      </div>
                      
                      {/* Product Info - Sağ */}
                      <div className="w-1/2 p-6 flex flex-col justify-between">
                        <div>
                          {/* Brand */}
                          {product.brand && <div className="text-sm text-purple-500 mb-2 uppercase tracking-wide font-medium">
                              {product.brand}
                            </div>}
                          
                          {/* Product Name */}
                          <h3 className="text-xl font-serif text-purple-900 mb-3 leading-tight">
                            {product.name}
                          </h3>
                          
                          {/* Description */}
                          <p className="text-purple-600 text-sm mb-4 leading-relaxed line-clamp-2">
                            Zarif tasarım, kaliteli kumaş. El işçiliği detaylarla süslenmiş özel parça.
                          </p>
                          
                          {/* Rating & Reviews */}
                          <div className="flex items-center mb-4">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => <Star key={i} size={14} className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />)}
                            </div>
                            <span className="text-sm text-purple-500 ml-2">({product.reviews}{t("common.değerlendirme")}</span>
                          </div>

                          {/* Price */}
                          <div className="mb-6">
                            <div className="flex items-baseline space-x-2">
                              <span className="text-2xl font-bold text-purple-900">
                                {formatPrice(product.price)}
                              </span>
                              {product.originalPrice && product.originalPrice > product.price && <span className="text-lg text-gray-500 line-through">
                                  {formatPrice(product.originalPrice)}
                                </span>}
                            </div>
                            {product.originalPrice && product.originalPrice > product.price && <p className="text-xs text-pink-600 mt-1 italic">indirimli fiyat</p>}
                          </div>

                          {/* Sizes */}
                          {product.sizes && <div className="mb-6">
                              <p className="text-sm text-purple-600 mb-2 font-medium">Mevcut Bedenler:</p>
                              <div className="flex space-x-2">
                                {product.sizes.slice(0, 4).map(size => <span key={size} className="px-3 py-1 border border-purple-300 rounded text-sm text-purple-700 bg-purple-50">
                                    {size}
                                  </span>)}
                              </div>
                            </div>}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <button className="flex-1 bg-purple-100 text-purple-700 py-3 px-4 rounded-xl font-medium hover:bg-purple-200 transition-all border border-purple-200">
                            <Heart size={16} className="inline mr-2" />
                            Favorile
                          </button>
                          <button className="flex-1 bg-gradient-to-r from-pink-400 to-purple-500 text-white py-3 px-4 rounded-xl font-medium hover:from-pink-500 hover:to-purple-600 transition-all transform hover:scale-105 shadow-lg">
                            <ShoppingBag size={18} className="inline mr-2" />
                            Sepete Ekle
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>;
            })}
            </div>

            {/* Empty State */}
            {fashionProducts.length === 0 && <div className="text-center py-16">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-12 border border-pink-200">
                  <Crown size={48} className="mx-auto text-purple-300 mb-4" />
                  <h3 className="text-xl font-serif text-purple-800 mb-2">{t("common.henüz_ürün_bulunmuyor")}</h3>
                  <p className="text-purple-600">{t("common.fashion_kategorisinde_ürün_ekleyin")}</p>
                </div>
              </div>}
          </main>
        </div>
      </div>

      {/* Boutique Features */}
      <section className="bg-white/80 backdrop-blur-sm py-16 mt-16 border-t border-pink-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Truck className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-serif text-lg text-purple-900 mb-2">{t("common.özenli_kargo")}</h3>
              <p className="text-purple-600 text-sm">{t('common.aboveAmount', {
                amount: 300
              })} ücretsiz, özel ambalaj</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Shield className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-serif text-lg text-purple-900 mb-2">Kalite Garantisi</h3>
              <p className="text-purple-600 text-sm">{t("common.el_yapımı_kalite_sertifikası")}</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <RotateCcw className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-serif text-lg text-purple-900 mb-2">{t("common.kolay_değişim")}</h3>
              <p className="text-purple-600 text-sm">{t("common.30_gün_içinde_ücretsiz_değişim")}</p>
            </div>
            <div className="text-center">
              <div className="bg-gradient-to-br from-pink-100 to-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Crown className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-serif text-lg text-purple-900 mb-2">VIP Hizmet</h3>
              <p className="text-purple-600 text-sm">Kişisel stil danışmanlığı</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <Crown className="mx-auto text-white mb-4" size={32} />
          <h2 className="text-3xl font-serif text-white mb-4">{t("common.özel_koleksiyonlardan_i_lk_siz_haberdar_olun")}</h2>
          <p className="text-purple-100 mb-8 text-lg">{t("common.sınırlı_sayıda_üretilen_el_yapımı_parçalar_ve_özel_tasarımlar_için_e_bülten")}</p>
          <div className="flex max-w-md mx-auto">
            <input type="email" placeholder="E-posta adresiniz" className="flex-1 px-6 py-4 rounded-l-full focus:outline-none bg-white/90 backdrop-blur-sm" />
            <button className="bg-white text-purple-600 px-8 py-4 rounded-r-full hover:bg-gray-50 transition-colors font-medium">
              <Sparkles className="inline mr-2" size={16} />
              Abone Ol
            </button>
          </div>
        </div>
      </section>

      {/* Elegant Footer */}
      <footer className="bg-purple-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <Crown className="text-pink-400" size={28} />
                <h3 className="text-2xl font-serif">Boutique Chic</h3>
              </div>
              <p className="text-purple-200 mb-6 leading-relaxed">{t("common.kadının_zarafetini_ortaya_çıkaran_el_yapımı_detaylarla_süslenmiş_özel_tasarımlar")}</p>
              <div className="flex space-x-4">
                <Instagram className="w-6 h-6 text-purple-300 hover:text-pink-400 cursor-pointer transition-colors" />
                <Facebook className="w-6 h-6 text-purple-300 hover:text-pink-400 cursor-pointer transition-colors" />
                <Twitter className="w-6 h-6 text-purple-300 hover:text-pink-400 cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-6">Koleksiyonlar</h4>
              <ul className="space-y-3 text-purple-200">
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><Sparkles size={14} className="mr-2" />Yeni Koleksiyon</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><Crown size={14} className="mr-2" />{t("common.özel_tasarım")}</a></li>
                <li><a href="#" className="hover:text-white transition-colors flex items-center"><Gift size={14} className="mr-2" />{t("common.el_yapımı")}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Aksesuarlar</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-6">Hizmetlerimiz</h4>
              <ul className="space-y-3 text-purple-200">
                <li><a href="#" className="hover:text-white transition-colors">{t("common.kişisel_stil_danışmanlığı")}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t("common.özel_dikim")}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">{t("common.vip_müşteri_hizmetleri")}</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Beden Rehberi</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-6">{t("common.i_letişim")}</h4>
              <ul className="space-y-3 text-purple-200">
                <li className="flex items-center">
                  <span className="mr-2">📍</span>{t("common.nişantaşı_i_stanbul")}</li>
                <li className="flex items-center">
                  <span className="mr-2">📞</span>
                  0212 345 67 89
                </li>
                <li className="flex items-center">
                  <span className="mr-2">📧</span>
                  info@boutiquechic.com
                </li>
                <li className="flex items-center">
                  <span className="mr-2">🕒</span>
                  Pazartesi - Cumartesi: 10:00 - 19:00
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-purple-800 mt-12 pt-8 text-center">
            <p className="text-purple-300">{t("common.2025_boutique_chic_zarafet_ve_şıklığın_adresi_bu_demo_altıntassoft_tarafından_oluşturulmuştur")}</p>
          </div>
        </div>
      </footer>
    </div>;
}