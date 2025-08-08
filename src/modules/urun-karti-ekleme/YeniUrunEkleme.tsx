import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Package, Palette, Cpu, Leaf, ShoppingBag, Smartphone, Home, Gamepad2, Baby, Car, Plane, Dumbbell, Heart, BookOpen, PawPrint, Gem, CheckCircle } from 'lucide-react';
import { useTranslation } from "react-i18next";
function YeniUrunEkleme() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);
  const categories = [{
    id: 'tekstil',
    name: 'Tekstil & Moda',
    icon: Palette,
    color: 'bg-pink-500 hover:bg-pink-600',
    description: t("common.giyim_ayakkabı_aksesuar"),
    emoji: '👕'
  }, {
    id: 'teknoloji',
    name: 'Teknoloji',
    icon: Cpu,
    color: 'bg-blue-500 hover:bg-blue-600',
    description: 'Elektronik, bilgisayar, telefon',
    emoji: '💻'
  }, {
    id: 'gida',
    name: 'Gıda & İçecek',
    icon: Leaf,
    color: 'bg-green-500 hover:bg-green-600',
    description: t("common.organik_ürünler_gıda"),
    emoji: '🍪'
  }, {
    id: 'kozmetik',
    name: 'Kozmetik & Bakım',
    icon: Heart,
    color: 'bg-purple-500 hover:bg-purple-600',
    description: t("common.güzellik_bakım_ürünleri"),
    emoji: '🧴'
  }, {
    id: 'mobilya',
    name: 'Mobilya & Dekorasyon',
    icon: Home,
    color: 'bg-orange-500 hover:bg-orange-600',
    description: t("common.ev_mobilyası_dekorasyon"),
    emoji: '🛋️'
  }, {
    id: 'ev-yasam',
    name: 'Ev & Yaşam',
    icon: Home,
    color: 'bg-slate-500 hover:bg-slate-600',
    description: t("common.ev_eşyaları_yaşam_ürünleri"),
    emoji: '🏠'
  }, {
    id: 'oyun',
    name: 'Oyun & Konsol',
    icon: Gamepad2,
    color: 'bg-indigo-500 hover:bg-indigo-600',
    description: t("common.video_oyunları_konsol"),
    emoji: '🎮'
  }, {
    id: 'anne-bebek',
    name: 'Anne & Bebek',
    icon: Baby,
    color: 'bg-yellow-500 hover:bg-yellow-600',
    description: t("common.bebek_ürünleri_oyuncak"),
    emoji: '🍼'
  }, {
    id: 'otomotiv',
    name: 'Otomotiv',
    icon: Car,
    color: 'bg-gray-500 hover:bg-gray-600',
    description: t("common.araç_aksesuarı_yedek_parça"),
    emoji: '🚗'
  }, {
    id: 'seyahat',
    name: 'Seyahat & Outdoor',
    icon: Plane,
    color: 'bg-cyan-500 hover:bg-cyan-600',
    description: 'Bavul, kamp malzemeleri',
    emoji: '🧳'
  }, {
    id: 'spor',
    name: 'Spor & Sağlık',
    icon: Dumbbell,
    color: 'bg-red-500 hover:bg-red-600',
    description: 'Fitness, spor malzemeleri',
    emoji: '🧘'
  }, {
    id: 'kirtasiye',
    name: 'Kırtasiye & Ofis',
    icon: BookOpen,
    color: 'bg-emerald-500 hover:bg-emerald-600',
    description: t("common.ofis_malzemeleri_kırtasiye"),
    emoji: '📚'
  }, {
    id: 'hayvan',
    name: 'Evcil Hayvan',
    icon: PawPrint,
    color: 'bg-lime-500 hover:bg-lime-600',
    description: t("common.pet_shop_hayvan_ürünleri"),
    emoji: '🐶'
  }, {
    id: 'taki',
    name: 'Takı & Aksesuar',
    icon: Gem,
    color: 'bg-rose-500 hover:bg-rose-600',
    description: t("common.mücevher_takı_saat"),
    emoji: '💍'
  }];
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Tekstil için özel modül, diğerleri için direkt form
    if (categoryId === 'tekstil') {
      navigate('/admin/tekstil-moda');
    } else {
      navigate(`/admin/urun-ekleme/${categoryId}`);
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin" className="flex items-center text-gray-600 hover:text-blue-600 mr-6 transition-colors">
                <ArrowLeft size={20} className="mr-2" />{t("common.admin_panel_e_dön")}</Link>
              <div className="bg-blue-100 px-4 py-2 rounded-full">
                <span className="font-bold text-blue-800">{t("common.altıntassoft")}</span>
              </div>
            </div>
            <div className="text-gray-600 text-sm">{t("common.profesyonel_ürün_ekleme_sistemi")}</div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{t("common.ürün_ekleme_sistemi")}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">{t("common.kategori_seçin_ve_o_kategoriye_özel_ürün_ekleme_formunu_kullanın_her_kategori_için_özelleştirilmiş_alanlar_ve_validasyonlar")}</p>
        </div>

        {/* Category Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map(category => {
          const CategoryIcon = category.icon;
          return <button key={category.id} onClick={() => handleCategorySelect(category.id)} className={`${category.color} text-white rounded-xl p-6 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl group relative`}>
                {/* Tamamlanma Tiki - Sadece tekstil ve kozmetik için */}
                {(category.id === 'tekstil' || category.id === 'kozmetik') && <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1.5 shadow-lg border-2 border-white z-10">
                    <CheckCircle size={20} className="text-white" />
                  </div>}
                
                <div className="text-center">
                  {/* Emoji & Icon */}
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-3xl mr-2">{category.emoji}</span>
                    <CategoryIcon size={32} className="text-white" />
                  </div>
                  
                  {/* Category Name */}
                  <h3 className="font-bold text-lg mb-2 group-hover:scale-105 transition-transform">
                    {category.name}
                    {/* Inline tik için ek gösterge */}
                    {(category.id === 'tekstil' || category.id === 'kozmetik') && <span className="ml-2 text-green-300">✅</span>}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white text-opacity-90 text-sm leading-relaxed">
                    {category.description}
                    {/* Tamamlandı mesajı */}
                    {(category.id === 'tekstil' || category.id === 'kozmetik') && <span className="block mt-1 text-green-200 font-medium text-xs">{t("common.modüler_sistem_hazır")}</span>}
                  </p>
                  
                  {/* Action Hint */}
                  <div className="mt-4 text-xs text-white text-opacity-75 font-medium">
                    {category.id === 'tekstil' || category.id === 'kozmetik' ? t("common.hazır_tıklayın") : t("common.tıklayın")}
                  </div>
                </div>
              </button>;
        })}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{t("common.kategori_bazlı_ürün_ekleme")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 text-left">
              <div className="bg-pink-50 rounded-lg p-4 border border-pink-200 relative">
                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 shadow-lg border-2 border-white">
                  <CheckCircle size={16} className="text-white" />
                </div>
                <h3 className="font-semibold text-pink-800 mb-2">👕 Tekstil & Moda ✅</h3>
                <ul className="text-sm text-pink-700 space-y-1">
                  <li>{t("common.beden_seçimi_xs_s_m_l_xl")}</li>
                  <li>• Renk seçenekleri</li>
                  <li>{t("common.kumaş_bilgileri")}</li>
                  <li>• Bakım talimatları</li>
                </ul>
                <div className="mt-2 text-xs text-green-600 font-medium">{t("common.4_adımlı_modüler_sistem")}</div>
              </div>
              
              <div className="bg-purple-50 rounded-lg p-4 border border-purple-200 relative">
                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1 shadow-lg border-2 border-white">
                  <CheckCircle size={16} className="text-white" />
                </div>
                <h3 className="font-semibold text-purple-800 mb-2">🧴 Kozmetik & Bakım ✅</h3>
                <ul className="text-sm text-purple-700 space-y-1">
                  <li>{t("common.cilt_tipi_uygunluğu")}</li>
                  <li>{t("common.renk_tonları_numaraları")}</li>
                  <li>• İçerik listesi (INCI)</li>
                  <li>{t("common.vegan_organik_sertifikası")}</li>
                </ul>
                <div className="mt-2 text-xs text-green-600 font-medium">{t("common.4_adımlı_akıllı_form")}</div>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">💻 Teknoloji</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>{t("common.teknik_özellikler")}</li>
                  <li>• Uyumluluk bilgileri</li>
                  <li>• Garanti süresi</li>
                  <li>• Performans grafikleri</li>
                </ul>
                <div className="mt-2 text-xs text-gray-500 font-medium">{t("common.geliştiriliyor")}</div>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">🍪 Gıda & İçecek</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>{t("common.organik_sertifikaları")}</li>
                  <li>{t("common.besin_değerleri")}</li>
                  <li>• Son kullanma tarihi</li>
                  <li>• Allerjen bilgileri</li>
                </ul>
                <div className="mt-2 text-xs text-gray-500 font-medium">{t("common.geliştiriliyor")}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Development Status */}
        <div className="mt-8 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-6 text-center">
          <h3 className="font-semibold text-green-800 mb-3">🚀 Geliştirme Durumu</h3>
          <div className="flex justify-center items-center space-x-6 mb-4">
            <div className="flex items-center space-x-2">
              <CheckCircle size={20} className="text-green-500" />
              <span className="text-green-700 font-medium">{t("common.2_kategori_hazır")}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 rounded-full border-2 border-orange-400 animate-spin"></div>
              <span className="text-orange-700 font-medium">{t("common.12_kategori_geliştiriliyor")}</span>
            </div>
          </div>
          <p className="text-gray-700 text-sm">
            <strong>✅ Tekstil & Moda</strong> ve <strong>✅ Kozmetik & Bakım</strong>{t("common.kategorileri_tam_modüler_sistemle_hazır_diğer_kategoriler_için_özel_formlar_geliştiriliyor")}</p>
          <div className="mt-3 bg-white rounded-lg p-3 border border-green-200">
            <div className="text-xs text-green-600 font-medium">{t("common.hazır_özellikler_4_step_forms_smart_country_selector_toast_notifications_professional_ui")}</div>
          </div>
        </div>
      </div>
    </div>;
}
export default YeniUrunEkleme;