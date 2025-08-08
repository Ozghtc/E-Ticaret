import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Key } from 'lucide-react';
import { useTranslation } from "react-i18next";
function Yetkilendirme() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin" className="flex items-center text-white hover:text-indigo-200 mr-6">
                <ArrowLeft size={20} className="mr-2" />
                Geri Dön
              </Link>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-bold text-white">{t("common.altıntassoft")}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Key className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Yetkilendirme
          </h1>
          <p className="text-gray-600 text-lg mb-4">{t("common.bu_sayfa_henüz_geliştirilme_aşamasındadır")}</p>
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 text-left max-w-md mx-auto">
            <h3 className="font-semibold text-indigo-800 mb-2">{t("common.modül_açıklaması")}</h3>
            <p className="text-sm text-indigo-700">{t("common.admin_mağaza_kullanıcıları_giriş_yapma_yetki_seviyesi_belirleme")}</p>
          </div>
        </div>
      </div>
    </div>;
}
export default Yetkilendirme;