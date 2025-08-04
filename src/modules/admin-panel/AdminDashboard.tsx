import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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

  return (
    <div className="min-h-screen bg-gray-50">
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
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-cyan-100 to-blue-100 rounded-lg p-6 mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">
                Hoş Geldiniz <span className="text-blue-600">Admin Paneli</span>
              </h1>
              <p className="text-gray-600">
                Vardiyalı Nöbet Asistanı kontrol paneli
              </p>
            </div>
          </div>
        </div>

        {/* Main Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Mağaza Paneli */}
          <Link to="/admin/magaza-yonetimi" className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-4 sm:p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg block">
            <div className="flex items-center mb-4">
              <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-base sm:text-lg">Mağaza Paneli</h3>
                <p className="text-blue-100 text-xs sm:text-sm">Ürün ekleme, sipariş takibi, tema seçimi</p>
              </div>
            </div>
          </Link>

          {/* Platform */}
          <Link to="/admin/platform" className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-4 sm:p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg block">
            <div className="flex items-center mb-4">
              <Globe className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-base sm:text-lg">Altyapı / Platform</h3>
                <p className="text-green-100 text-xs sm:text-sm">Sipariş akışı, log tutma, trafik ve sistem raporları</p>
              </div>
            </div>
          </Link>

          {/* Mağaza Açılış Paneli */}
          <Link to="/admin/magaza-acilis-paneli" className="bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg p-4 sm:p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg block">
            <div className="flex items-center mb-4">
              <PlusCircle className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-base sm:text-lg">Mağaza Açılış Paneli</h3>
                <p className="text-cyan-100 text-xs sm:text-sm">Yeni mağaza başvuruları, onay süreçleri</p>
              </div>
            </div>
          </Link>

          {/* Kullanıcı Yönetimi */}
          <Link to="/admin/kullanici-yonetimi" className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-4 sm:p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg block">
            <div className="flex items-center mb-4">
              <UserCheck className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-base sm:text-lg">Kullanıcı Yönetimi</h3>
                <p className="text-purple-100 text-xs sm:text-sm">Giriş yapma, yetki seviyesi belirleme</p>
              </div>
            </div>
          </Link>

          {/* Son Kullanıcı Sitesi */}
          <Link to="/admin/son-kullanici-sitesi" className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg p-4 sm:p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg block">
            <div className="flex items-center mb-4">
              <Monitor className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-base sm:text-lg">Son Kullanıcı Sitesi</h3>
                <p className="text-orange-100 text-xs sm:text-sm">Ürünleri görür, sepete ekler, satın alır</p>
              </div>
            </div>
          </Link>
          {/* Tema Sistemi */}
          <Link to="/admin/tema-sistemi" className="bg-pink-500 hover:bg-pink-600 text-white rounded-lg p-4 sm:p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg block">
            <div className="flex items-center mb-4">
              <Palette className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-base sm:text-lg">Tema Sistemi</h3>
                <p className="text-pink-100 text-xs sm:text-sm">Mağaza vitrinlerinin görünümünü özelleştirir (7-8 tema)</p>
              </div>
            </div>
          </Link>

          {/* Yetkilendirme - İkinci */}
          <Link to="/admin/yetkilendirme" className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg p-4 sm:p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg block">
            <div className="flex items-center mb-4">
              <Key className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-base sm:text-lg">Yetkilendirme</h3>
                <p className="text-indigo-100 text-xs sm:text-sm">Rol ve yetki yönetimi, güvenlik ayarları</p>
              </div>
            </div>
          </Link>

          {/* Raporlar */}
          <Link to="/admin/raporlar" className="bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg p-4 sm:p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg block">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-base sm:text-lg">Raporlar</h3>
                <p className="text-emerald-100 text-xs sm:text-sm">Satış, kullanıcı ve sistem raporları</p>
              </div>
            </div>
          </Link>

          {/* Sistem Tanımlamaları */}
          <Link to="/admin/sistem-tanimlamalari" className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg p-4 sm:p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg block">
            <div className="flex items-center mb-4">
              <Settings className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-base sm:text-lg">Sistem Tanımlamaları</h3>
                <p className="text-teal-100 text-xs sm:text-sm">Kategoriler, bedenler, renkler, markalar</p>
              </div>
            </div>
          </Link>

          {/* Ürün Ekleme */}
          <Link to="/admin/urun-ekleme-yeni" className="bg-amber-500 hover:bg-amber-600 text-white rounded-lg p-4 sm:p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg block">
            <div className="flex items-center mb-4">
              <Package className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-base sm:text-lg">Ürün Ekleme</h3>
                <p className="text-amber-100 text-xs sm:text-sm">Kategori bazlı profesyonel ürün ekleme sistemi</p>
              </div>
            </div>
          </Link>

          {/* SEO */}
          <Link to="/admin/seo" className="bg-orange-500 hover:bg-orange-600 text-white rounded-lg p-4 sm:p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg block">
            <div className="flex items-center mb-4">
              <Search className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-base sm:text-lg">SEO</h3>
                <p className="text-orange-100 text-xs sm:text-sm">Arama motoru optimizasyonu ve analiz araçları</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Bottom Section with HZM Partnership */}
        <div className="text-center">
          <div className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full cursor-pointer transition-colors">
            hzm işbirliği ile
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;