import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Package, List, Plus, Eye } from 'lucide-react';

function TekstilModa() {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin/urun-ekleme-yeni" className="flex items-center text-white hover:text-pink-200 mr-6">
                <ArrowLeft size={20} className="mr-2" />
                Kategori Seçimine Dön
              </Link>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-bold text-white">Altıntassoft</span>
              </div>
            </div>
            <div className="text-white text-sm">
              Tekstil & Moda Yönetim Paneli
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="bg-pink-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl">👕</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Tekstil & Moda Yönetimi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Giyim, ayakkabı ve aksesuar ürünlerinizi profesyonel şekilde yönetin
          </p>
        </div>

        {/* Two Main Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Ürün Ekleme Button */}
          <button
            onClick={() => navigate('/admin/urun-ekleme/tekstil')}
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-2xl p-8 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Plus className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Yeni Ürün Ekle</h3>
              <p className="text-pink-100 text-lg mb-6">
                Tekstil ürünü ekleme formunu açar
              </p>
              <div className="flex items-center justify-center space-x-2 text-pink-200">
                <Package size={16} />
                <span className="text-sm">Profesyonel Form</span>
              </div>
            </div>
          </button>

          {/* Ürün Listesi Button */}
          <button
            onClick={() => navigate('/admin/tekstil-moda/urun-listesi')}
            className="bg-purple-500 hover:bg-purple-600 text-white rounded-2xl p-8 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl group"
          >
            <div className="text-center">
              <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <List className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Eklenen Ürünleri Listele</h3>
              <p className="text-purple-100 text-lg mb-6">
                Mevcut tekstil ürünlerini görüntüler
              </p>
              <div className="flex items-center justify-center space-x-2 text-purple-200">
                <Eye size={16} />
                <span className="text-sm">Ürün Yönetimi</span>
              </div>
            </div>
          </button>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border border-pink-200">
            <div className="bg-pink-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Package className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Özel Alanlar</h3>
            <p className="text-gray-600 text-sm">
              Beden, renk, kumaş türü gibi tekstile özel alanlar
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-purple-200">
            <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <List className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Kolay Yönetim</h3>
            <p className="text-gray-600 text-sm">
              Eklenen ürünleri düzenle, sil, stok güncelle
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 border border-blue-200">
            <div className="bg-blue-100 w-12 h-12 rounded-full flex items-center justify-center mb-4">
              <Eye className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-gray-900 mb-2">Önizleme</h3>
            <p className="text-gray-600 text-sm">
              Ürünlerin mağazada nasıl görüneceğini kontrol et
            </p>
          </div>
        </div>

        {/* Development Status */}
        <div className="bg-pink-50 border border-pink-200 rounded-xl p-6 text-center">
          <h3 className="font-semibold text-pink-800 mb-2">🎯 Tekstil & Moda Modülü</h3>
          <p className="text-pink-700 text-sm mb-4">
            Tekstil kategorisine özel geliştirilmiş profesyonel ürün yönetim sistemi
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left max-w-4xl mx-auto">
            <div className="bg-pink-100 rounded-lg p-4">
              <h4 className="font-semibold text-pink-800 mb-2">✅ Ürün Ekleme Özellikleri:</h4>
              <ul className="text-sm text-pink-700 space-y-1">
                <li>• Beden seçimi (XS, S, M, L, XL)</li>
                <li>• Renk paleti (30+ renk seçeneği)</li>
                <li>• Kumaş türü ve kalıp bilgileri</li>
                <li>• Bakım talimatları</li>
                <li>• Varyant yönetimi</li>
                <li>• SEO optimizasyonu</li>
              </ul>
            </div>
            <div className="bg-purple-100 rounded-lg p-4">
              <h4 className="font-semibold text-purple-800 mb-2">✅ Ürün Listesi Özellikleri:</h4>
              <ul className="text-sm text-purple-700 space-y-1">
                <li>• Filtreleme ve arama</li>
                <li>• Toplu düzenleme</li>
                <li>• Stok takibi</li>
                <li>• Fiyat güncelleme</li>
                <li>• Görsel önizleme</li>
                <li>• Excel dışa aktarma</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TekstilModa;