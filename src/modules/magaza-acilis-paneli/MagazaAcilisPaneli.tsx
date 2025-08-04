import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, PlusCircle } from 'lucide-react';

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
          <p className="text-gray-600 text-lg mb-4">
            Bu sayfa henüz geliştirilme aşamasındadır.
          </p>
          <div className="bg-cyan-50 border border-cyan-200 rounded-lg p-4 text-left max-w-md mx-auto">
            <h3 className="font-semibold text-cyan-800 mb-2">Modül Açıklaması:</h3>
            <p className="text-sm text-cyan-700">
              Yeni mağaza başvuruları, onay süreçleri
            </p>
          </div>
            onClick={() => navigate('/magaza-kayit-form')}

          <button className="mt-6 bg-cyan-600 text-white px-6 py-3 rounded-lg hover:bg-cyan-700 transition-colors font-medium">
            Mağaza Kayıt Formu
          </button>
        </div>
      </div>
    </div>
  );
}

export default MagazaAcilisPaneli;