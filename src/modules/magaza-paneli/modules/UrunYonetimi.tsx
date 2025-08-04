import React, { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';

function UrunYonetimi() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin/magaza-paneli" className="flex items-center text-white hover:text-blue-200 mr-6">
                <ArrowLeft size={20} className="mr-2" />
                Mağaza Paneli'ne Dön
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
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-10 h-10 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            Ürün Yönetimi
          </h1>
          <p className="text-gray-600 text-lg mb-8 text-center">
            Ürünlerinizi ekleyin, düzenleyin ve stok takibi yapın
          </p>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button
              onClick={() => navigate('/admin/urun-ekleme')}
              className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors text-left"
            >
              <div className="flex items-center mb-3">
                <Package className="w-6 h-6 mr-2" />
                <h3 className="font-semibold">Yeni Ürün Ekle</h3>
              </div>
              <p className="text-blue-100 text-sm">Temaya uygun ürün ekleme formu</p>
            </button>

            <button className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors text-left">
              <div className="flex items-center mb-3">
                <Package className="w-6 h-6 mr-2" />
                <h3 className="font-semibold">Ürün Listesi</h3>
              </div>
              <p className="text-green-100 text-sm">Mevcut ürünleri görüntüle</p>
            </button>

            <button className="bg-purple-600 text-white p-6 rounded-lg hover:bg-purple-700 transition-colors text-left">
              <div className="flex items-center mb-3">
                <Package className="w-6 h-6 mr-2" />
                <h3 className="font-semibold">Stok Takibi</h3>
              </div>
              <p className="text-purple-100 text-sm">Stok durumunu kontrol et</p>
            </button>
          </div>

          {/* Development Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-left">
            <h3 className="font-semibold text-blue-800 mb-3">🎯 Tema-Spesifik Ürün Ekleme Sistemi</h3>
            <div className="text-sm text-blue-700 space-y-2">
              <p>✅ <strong>Fashion Store:</strong> Renk/beden seçimi, model bilgileri, bakım talimatları</p>
              <p>✅ <strong>MegaStore:</strong> Kampanya ayarları, toplu indirim, flash sale</p>
              <p>✅ <strong>TechHub:</strong> Teknik özellikler, uyumluluk, performans grafikleri</p>
              <p>✅ <strong>Organic Market:</strong> Sertifikalar, besin değerleri, çiftlik bilgileri</p>
              <p>✅ <strong>Modern Minimal:</strong> Sade form, temel bilgiler</p>
              <p className="mt-3 font-medium">Her tema kendi özel alanlarına sahip ürün ekleme deneyimi sunar!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UrunYonetimi;