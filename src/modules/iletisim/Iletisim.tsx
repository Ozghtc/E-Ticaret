import React from 'react';
import { MessageCircle, Mail, Phone, MapPin, Clock, Users, Settings } from 'lucide-react';

function Iletisim() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <MessageCircle className="w-8 h-8 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">İletişim Yönetimi</h1>
              <p className="text-gray-600 mt-1">Müşteri iletişimi ve destek sistemi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Mesaj</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bekleyen</p>
                <p className="text-2xl font-bold text-orange-600">23</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Çözülen</p>
                <p className="text-2xl font-bold text-green-600">1,211</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ortalama Yanıt</p>
                <p className="text-2xl font-bold text-purple-600">2.3s</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-8">
          <div className="text-center py-12">
            <div className="mb-6">
              <MessageCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-2">İletişim Modülü</h2>
              <p className="text-gray-600 max-w-md mx-auto">
                Bu modül geliştirme aşamasındadır. Müşteri iletişimi ve destek sistemi burada yönetilecek.
              </p>
            </div>

            {/* Feature Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">E-posta Yönetimi</h3>
                <p className="text-sm text-gray-600">Müşteri e-postalarını yönetin ve yanıtlayın</p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <Phone className="w-8 h-8 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Telefon Desteği</h3>
                <p className="text-sm text-gray-600">Telefon çağrılarını takip edin</p>
              </div>

              <div className="text-center p-6 bg-gray-50 rounded-xl">
                <MapPin className="w-8 h-8 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-2">Konum Hizmetleri</h3>
                <p className="text-sm text-gray-600">Mağaza konumları ve harita entegrasyonu</p>
              </div>
            </div>

            {/* Development Status */}
            <div className="mt-8 p-4 bg-blue-50 rounded-xl border border-blue-200">
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                <span className="text-blue-700 font-medium">Geliştirme Aşamasında</span>
              </div>
              <p className="text-blue-600 text-sm mt-2">
                Bu modül yakında kullanıma hazır olacak
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Iletisim;
