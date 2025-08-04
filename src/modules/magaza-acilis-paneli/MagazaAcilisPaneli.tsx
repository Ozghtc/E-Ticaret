import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, PlusCircle, Store, Eye, Sparkles, ShoppingBag } from 'lucide-react';

function MagazaAcilisPaneli() {
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
      <header className="bg-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin" className="flex items-center text-white hover:text-cyan-200 mr-6">
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
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="bg-cyan-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <PlusCircle className="w-10 h-10 text-cyan-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Mağaza Açılış Paneli
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Mağaza işlemlerinizi buradan yönetebilirsiniz.
          </p>
          
          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-6 text-left max-w-2xl mx-auto mb-8">
            <h3 className="font-semibold text-cyan-800 mb-3 flex items-center">
              <Sparkles className="w-5 h-5 mr-2" />
              Mağaza Yönetim Seçenekleri:
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-cyan-700">
              <div>
                <h4 className="font-medium mb-2">🆕 Yeni Mağaza:</h4>
                <ul className="space-y-1">
                  <li>• Mağaza başvuru formu</li>
                  <li>• Belge yükleme</li>
                  <li>• Onay süreci takibi</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">📋 Mevcut Mağazalar:</h4>
                <ul className="space-y-1">
                  <li>• Mağaza listesi görüntüleme</li>
                  <li>• Durum kontrolü</li>
                  <li>• Detay bilgileri</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            {/* Mağaza Açılış Form Butonu */}
            <button
              onClick={() => navigate('/magaza-kayit-form')}
              className="group bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 min-w-[280px]"
            >
              <div className="bg-white bg-opacity-20 p-2 rounded-full group-hover:bg-opacity-30 transition-all">
                <Store size={24} />
              </div>
              <div className="text-left">
                <div className="font-bold">🏪 Mağaza Açılış Formu</div>
                <div className="text-sm text-emerald-100">Yeni mağaza başvurusu yap</div>
              </div>
            </button>

            {/* Mağazaları Göster Butonu */}
            <button
              onClick={() => navigate('/admin/magaza-listesi')}
              className="group bg-gradient-to-r from-purple-500 to-indigo-600 hover:from-purple-600 hover:to-indigo-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center space-x-3 min-w-[280px]"
            >
              <div className="bg-white bg-opacity-20 p-2 rounded-full group-hover:bg-opacity-30 transition-all">
                <Eye size={24} />
              </div>
              <div className="text-left">
                <div className="font-bold">👀 Mağazaları Göster</div>
                <div className="text-sm text-purple-100">Mevcut mağazaları listele</div>
              </div>
            </button>
          </div>

          {/* Quick Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-lg border border-blue-200">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500 p-2 rounded-full">
                  <ShoppingBag size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-sm text-blue-600 font-medium">Aktif Mağazalar</div>
                  <div className="text-2xl font-bold text-blue-800">12</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
              <div className="flex items-center space-x-3">
                <div className="bg-green-500 p-2 rounded-full">
                  <PlusCircle size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-sm text-green-600 font-medium">Yeni Başvurular</div>
                  <div className="text-2xl font-bold text-green-800">3</div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-50 to-amber-50 p-4 rounded-lg border border-orange-200">
              <div className="flex items-center space-x-3">
                <div className="bg-orange-500 p-2 rounded-full">
                  <Sparkles size={20} className="text-white" />
                </div>
                <div>
                  <div className="text-sm text-orange-600 font-medium">Onay Bekleyen</div>
                  <div className="text-2xl font-bold text-orange-800">5</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MagazaAcilisPaneli;