import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Draggable from 'react-draggable';
import { 
  Shield, 
  LogOut, 
  Bell,
  Globe,
  ShoppingBag,
  UserCheck,
  Calendar,
  Monitor,
  Palette,
  Key,
  PlusCircle,
  BarChart3,
  Settings,
  Package,
  Search
} from 'lucide-react';

function AdminDashboard() {
  const navigate = useNavigate();
  const [dragDisabled, setDragDisabled] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/');
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    }) + ' | ' + now.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Admin Panel Butonları
  const adminCards = [
    {
      id: 'magaza-paneli',
      title: 'Mağaza Paneli',
      description: 'Ürün ekleme, sipariş takibi, tema seçimi',
      link: '/admin/magaza-yonetimi',
      icon: ShoppingBag,
      color: 'from-blue-500/80 to-blue-600/80',
      hoverColor: 'hover:from-blue-600/90 hover:to-blue-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'platform',
      title: 'Altyapı / Platform',
      description: 'Sipariş akışı, log tutma, trafik ve sistem raporları',
      link: '/admin/platform',
      icon: Globe,
      color: 'from-green-500/80 to-green-600/80',
      hoverColor: 'hover:from-green-600/90 hover:to-green-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'magaza-acilis',
      title: 'Mağaza Açılış Paneli',
      description: 'Yeni mağaza başvuruları, onay süreçleri',
      link: '/admin/magaza-acilis-paneli',
      icon: PlusCircle,
      color: 'from-cyan-500/80 to-cyan-600/80',
      hoverColor: 'hover:from-cyan-600/90 hover:to-cyan-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'kullanici-yonetimi',
      title: 'Kullanıcı Yönetimi',
      description: 'Giriş yapma, yetki seviyesi belirleme',
      link: '/admin/kullanici-yonetimi',
      icon: UserCheck,
      color: 'from-purple-500/80 to-purple-600/80',
      hoverColor: 'hover:from-purple-600/90 hover:to-purple-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'son-kullanici',
      title: 'Son Kullanıcı Sitesi',
      description: 'Ürünleri görür, sepete ekler, satın alır',
      link: '/admin/son-kullanici-sitesi',
      icon: Monitor,
      color: 'from-orange-500/80 to-orange-600/80',
      hoverColor: 'hover:from-orange-600/90 hover:to-orange-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'tema-sistemi',
      title: 'Tema Sistemi',
      description: 'Mağaza vitrinlerinin görünümünü özelleştirir (7-8 tema)',
      link: '/admin/tema-sistemi',
      icon: Palette,
      color: 'from-pink-500/80 to-pink-600/80',
      hoverColor: 'hover:from-pink-600/90 hover:to-pink-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'yetkilendirme',
      title: 'Yetkilendirme',
      description: 'Rol ve yetki yönetimi, güvenlik ayarları',
      link: '/admin/yetkilendirme',
      icon: Key,
      color: 'from-indigo-500/80 to-indigo-600/80',
      hoverColor: 'hover:from-indigo-600/90 hover:to-indigo-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'raporlar',
      title: 'Raporlar',
      description: 'Satış, kullanıcı ve sistem raporları',
      link: '/admin/raporlar',
      icon: BarChart3,
      color: 'from-emerald-500/80 to-emerald-600/80',
      hoverColor: 'hover:from-emerald-600/90 hover:to-emerald-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'sistem-tanimlamalari',
      title: 'Sistem Tanımlamaları',
      description: 'Kategoriler, bedenler, renkler, markalar',
      link: '/admin/sistem-tanimlamalari',
      icon: Settings,
      color: 'from-teal-500/80 to-teal-600/80',
      hoverColor: 'hover:from-teal-600/90 hover:to-teal-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'urun-ekleme',
      title: 'Ürün Ekleme',
      description: 'Kategori bazlı profesyonel ürün ekleme sistemi',
      link: '/admin/urun-ekleme-yeni',
      icon: Package,
      color: 'from-amber-500/80 to-amber-600/80',
      hoverColor: 'hover:from-amber-600/90 hover:to-amber-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'seo',
      title: 'SEO',
      description: 'Arama motoru optimizasyonu ve analiz araçları',
      link: '/admin/seo',
      icon: Search,
      color: 'from-red-500/80 to-red-600/80',
      hoverColor: 'hover:from-red-600/90 hover:to-red-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'paket-tanimlama',
      title: 'Paket Tanımlama',
      description: 'Sistem özellikleri yazarak fiyat belirleme ve paket oluşturma',
      link: '/admin/paket-tanimlama',
      icon: Package,
      color: 'from-rose-500/80 to-rose-600/80',
      hoverColor: 'hover:from-rose-600/90 hover:to-rose-700/90',
      iconColor: 'text-white'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-cyan-100" style={{
      backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(120, 219, 226, 0.3) 0%, transparent 50%),
        linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)
      `,
      backdropFilter: 'blur(10px)'
    }}>
      {/* Top Header */}
      <header className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo */}
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-bold text-white">Altıntassoft</span>
              </div>
            </div>

            {/* Right side - User info and actions */}
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 px-3 py-1 rounded-full text-sm">
                <Calendar className="inline w-4 h-4 mr-1" />
                {getCurrentDate()}
              </div>
              
              <button className="p-2 hover:bg-blue-500 rounded-full transition-colors">
                <Bell size={20} />
              </button>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-medium">ÖZGÜR ALTINTAŞ</p>
                  <p className="text-blue-200 text-sm">Admin</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-blue-500 rounded-full transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section - Glassmorphism */}
        <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-3xl p-8 mb-10 shadow-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                Hoş Geldiniz <span className="text-blue-700 drop-shadow-md">Admin Paneli</span>
              </h1>
              <p className="text-gray-700 text-lg font-medium">
                🚀 Modern E-Ticaret Yönetim Sistemi
              </p>
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <span className="bg-green-100/80 text-green-700 px-3 py-1 rounded-full backdrop-blur-sm">
                  ✅ Sistem Aktif
                </span>
                <span className="bg-blue-100/80 text-blue-700 px-3 py-1 rounded-full backdrop-blur-sm">
                  📊 16+ Modül
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Drag & Drop Info */}
        <div className="mb-6 text-center">
          <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
            <span className="text-blue-700 font-medium">💡 İpucu:</span>
            <span className="text-gray-700">Butonları sürükleyerek istediğiniz yere taşıyabilirsiniz!</span>
          </div>
        </div>

        {/* Draggable Action Cards - Glassmorphism */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {adminCards.map((card) => {
            const IconComponent = card.icon;
            return (
              <Draggable key={card.id} disabled={dragDisabled}>
                <div className="cursor-move">
                  <Link
                    to={card.link}
                    className={`block backdrop-blur-lg bg-gradient-to-br ${card.color} ${card.hoverColor} 
                              border border-white/30 text-white rounded-3xl p-6 cursor-pointer 
                              transition-all duration-500 transform hover:scale-110 hover:rotate-1
                              shadow-2xl hover:shadow-3xl group relative overflow-hidden`}
                    onMouseEnter={() => setDragDisabled(true)}
                    onMouseLeave={() => setDragDisabled(false)}
                  >
                    {/* Floating Particles Effect */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex items-center mb-4">
                        <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm mr-4 group-hover:bg-white/30 transition-all duration-300">
                          <IconComponent className="w-8 h-8 text-white drop-shadow-lg" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg mb-1 text-white drop-shadow-md group-hover:text-white/90 transition-colors">
                            {card.title}
                          </h3>
                        </div>
                      </div>
                      <p className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-colors">
                        {card.description}
                      </p>
                    </div>

                    {/* Glassmorphism border effect */}
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </div>
              </Draggable>
            );
          })}
        </div>

        {/* Bottom Section with HZM Partnership - Glassmorphism */}
        <div className="text-center">
          <div className="inline-block backdrop-blur-md bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-600/90 hover:to-purple-600/90 text-white px-8 py-4 rounded-full cursor-pointer transition-all duration-300 shadow-2xl border border-white/30 transform hover:scale-105">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">🚀 HZM İşbirliği ile</span>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;