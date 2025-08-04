import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  ShoppingBag, 
  Package, 
  ShoppingCart, 
  FileText, 
  Palette, 
  Store, 
  HelpCircle,
  Calendar,
  Bell
} from 'lucide-react';

function MagazaPaneli() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

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

  const menuItems = [
    {
      id: 'urun-yonetimi',
      title: 'Ürün Yönetimi',
      description: 'Ürün ekleme, düzenleme ve stok takibi',
      icon: Package,
      color: 'bg-blue-500 hover:bg-blue-600',
      path: '/admin/urun-yonetimi'
    },
    {
      id: 'siparislerim',
      title: 'Siparişlerim',
      description: 'Gelen siparişler ve sipariş takibi',
      icon: ShoppingCart,
      color: 'bg-green-500 hover:bg-green-600',
      path: '/admin/siparislerim'
    },
    {
      id: 'faturalarim',
      title: 'Faturalarım',
      description: 'Fatura oluşturma ve muhasebe işlemleri',
      icon: FileText,
      color: 'bg-purple-500 hover:bg-purple-600',
      path: '/admin/faturalarim'
    },
    {
      id: 'tema-ayarlari',
      title: 'Tema Ayarları',
      description: 'Mağaza görünümü ve tema özelleştirme',
      icon: Palette,
      color: 'bg-pink-500 hover:bg-pink-600',
      path: '/admin/tema-sistemi'
    },
    {
      id: 'magaza-bilgilerim',
      title: 'Mağaza Bilgilerim',
      description: 'Mağaza profili ve iletişim bilgileri',
      icon: Store,
      color: 'bg-orange-500 hover:bg-orange-600',
      path: '/admin/magaza-bilgilerim'
    },
    {
      id: 'destek-bildirimler',
      title: 'Destek & Bildirimler',
      description: 'Yardım merkezi ve sistem bildirimleri',
      icon: HelpCircle,
      color: 'bg-indigo-500 hover:bg-indigo-600',
      path: '/admin/destek-bildirimler'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo */}
            <div className="flex items-center">
              <Link to="/admin" className="flex items-center text-white hover:text-blue-200 mr-6">
                <ArrowLeft size={20} className="mr-2" />
                Geri Dön
              </Link>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-bold text-white">Altıntassoft</span>
              </div>
            </div>

            {/* Right side - User info and actions */}
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 px-3 py-1 rounded-full text-sm flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {getCurrentDate()}
              </div>
              
              <button className="p-2 hover:bg-blue-500 rounded-full transition-colors">
                <Bell size={20} />
              </button>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-medium">MAĞAZA SAHİBİ</p>
                  <p className="text-blue-200 text-sm">Mağaza Paneli</p>
                </div>
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
                Hoş Geldiniz <span className="text-blue-600">Mağaza Paneli</span>
              </h1>
              <p className="text-gray-600">
                Mağazanızı yönetmek için tüm araçlar burada
              </p>
            </div>
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center">
              <ShoppingBag className="w-8 h-8 text-blue-600" />
            </div>
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
              }}
              className={`${item.color} text-white rounded-lg p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg text-left block w-full`}
            >
              <div className="flex items-start mb-4">
                <item.icon className="w-8 h-8 mr-3 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-white text-opacity-90 text-sm">{item.description}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-blue-600 mb-2">24</div>
            <div className="text-gray-600 text-sm">Toplam Ürün</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-green-600 mb-2">12</div>
            <div className="text-gray-600 text-sm">Bekleyen Sipariş</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-purple-600 mb-2">₺2,450</div>
            <div className="text-gray-600 text-sm">Bu Ay Satış</div>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6 text-center">
            <div className="text-3xl font-bold text-orange-600 mb-2">4.8</div>
            <div className="text-gray-600 text-sm">Mağaza Puanı</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button className="bg-blue-50 hover:bg-blue-100 text-blue-700 p-4 rounded-lg transition-colors text-left">
              <Package className="w-6 h-6 mb-2" />
              <div className="font-medium">Yeni Ürün Ekle</div>
              <div className="text-sm text-blue-600">Hızlı ürün ekleme</div>
            </button>
            <button className="bg-green-50 hover:bg-green-100 text-green-700 p-4 rounded-lg transition-colors text-left">
              <ShoppingCart className="w-6 h-6 mb-2" />
              <div className="font-medium">Siparişleri Görüntüle</div>
              <div className="text-sm text-green-600">Bekleyen siparişler</div>
            </button>
            <button className="bg-purple-50 hover:bg-purple-100 text-purple-700 p-4 rounded-lg transition-colors text-left">
              <Palette className="w-6 h-6 mb-2" />
              <div className="font-medium">Tema Değiştir</div>
              <div className="text-sm text-purple-600">Mağaza görünümü</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MagazaPaneli;