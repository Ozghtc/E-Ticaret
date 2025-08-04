import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, TrendingUp, Users, ShoppingBag, DollarSign, Calendar, Download, Filter } from 'lucide-react';

function Raporlar() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin" className="flex items-center text-white hover:text-emerald-200 mr-6">
                <ArrowLeft size={20} className="mr-2" />
                Geri Dön
              </Link>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-bold text-white">Altıntassoft</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Title */}
        <div className="mb-8">
          <div className="bg-emerald-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <BarChart3 className="w-10 h-10 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 text-center mb-4">
            Raporlar ve Analitik
          </h1>
          <p className="text-gray-600 text-lg text-center">
            Sistem performansı, satış verileri ve kullanıcı istatistikleri
          </p>
        </div>

        {/* Quick Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <ShoppingBag className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Mağaza</p>
                <p className="text-2xl font-bold text-gray-900">1,247</p>
                <p className="text-sm text-green-600">+12% bu ay</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <Users className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Aktif Kullanıcı</p>
                <p className="text-2xl font-bold text-gray-900">8,542</p>
                <p className="text-sm text-green-600">+8% bu ay</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <DollarSign className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Aylık Gelir</p>
                <p className="text-2xl font-bold text-gray-900">₺284,650</p>
                <p className="text-sm text-green-600">+15% bu ay</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-orange-500">
            <div className="flex items-center">
              <div className="bg-orange-100 p-3 rounded-full">
                <TrendingUp className="w-6 h-6 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Günlük Sipariş</p>
                <p className="text-2xl font-bold text-gray-900">1,856</p>
                <p className="text-sm text-green-600">+5% bugün</p>
              </div>
            </div>
          </div>
        </div>

        {/* Report Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Sales Reports */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <DollarSign className="w-6 h-6 text-green-600 mr-2" />
                Satış Raporları
              </h2>
              <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                İndir
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Günlük Satış Raporu</span>
                <span className="text-green-600 font-bold">₺12,450</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Haftalık Satış Raporu</span>
                <span className="text-green-600 font-bold">₺89,320</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Aylık Satış Raporu</span>
                <span className="text-green-600 font-bold">₺284,650</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Yıllık Satış Raporu</span>
                <span className="text-green-600 font-bold">₺3,247,890</span>
              </div>
            </div>
          </div>

          {/* User Analytics */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center">
                <Users className="w-6 h-6 text-blue-600 mr-2" />
                Kullanıcı Analitikleri
              </h2>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                <Filter className="w-4 h-4 mr-2" />
                Filtrele
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Yeni Kayıtlar (Bu Ay)</span>
                <span className="text-blue-600 font-bold">1,247</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Aktif Kullanıcılar</span>
                <span className="text-blue-600 font-bold">8,542</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Mağaza Sahipleri</span>
                <span className="text-blue-600 font-bold">1,247</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Son 30 Gün Aktivite</span>
                <span className="text-blue-600 font-bold">%87</span>
              </div>
            </div>
          </div>
        </div>

        {/* System Reports */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900 flex items-center">
              <BarChart3 className="w-6 h-6 text-purple-600 mr-2" />
              Sistem Raporları
            </h2>
            <div className="flex space-x-2">
              <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                Tarih Seç
              </button>
              <button className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors flex items-center">
                <Download className="w-4 h-4 mr-2" />
                Dışa Aktar
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Performans</h3>
              <p className="text-2xl font-bold text-purple-600">99.8%</p>
              <p className="text-sm text-gray-600">Uptime</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="bg-green-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Trafik</h3>
              <p className="text-2xl font-bold text-green-600">2.4M</p>
              <p className="text-sm text-gray-600">Aylık Ziyaret</p>
            </div>
            
            <div className="text-center p-4 bg-gray-50 rounded-lg">
              <div className="bg-orange-100 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                <ShoppingBag className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">İşlemler</h3>
              <p className="text-2xl font-bold text-orange-600">45.2K</p>
              <p className="text-sm text-gray-600">Aylık Sipariş</p>
            </div>
          </div>
        </div>

        {/* Development Notice */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-center">
          <h3 className="font-semibold text-emerald-800 mb-2">Modül Geliştirme Durumu:</h3>
          <p className="text-sm text-emerald-700 mb-4">
            Raporlar modülü temel yapısı hazır. Database bağlantısı sonrası gerçek verilerle doldurulacak.
          </p>
          <div className="bg-emerald-100 rounded-lg p-4 text-left max-w-2xl mx-auto">
            <h4 className="font-semibold text-emerald-800 mb-2">Gelecek Özellikler:</h4>
            <ul className="text-sm text-emerald-700 space-y-1">
              <li>• Gerçek zamanlı dashboard grafikleri</li>
              <li>• Excel/PDF rapor dışa aktarma</li>
              <li>• Tarih aralığı filtreleme</li>
              <li>• Mağaza bazlı detaylı raporlar</li>
              <li>• Otomatik rapor e-posta gönderimi</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Raporlar;