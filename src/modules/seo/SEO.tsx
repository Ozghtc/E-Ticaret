import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Search, TrendingUp, Target, BarChart3, Globe, Zap } from 'lucide-react';
import { useTranslation } from "react-i18next";
function SEO() {
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
      <header className="bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin" className="flex items-center text-white hover:text-orange-200 mr-6">
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
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("common.seo_yönetimi")}</h1>
          <p className="text-gray-600 text-lg">{t("common.arama_motoru_optimizasyonu_ve_analiz_araçları")}</p>
        </div>

        {/* SEO Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* SEO Analizi */}
          <div className="bg-blue-500 hover:bg-blue-600 text-white rounded-lg p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-8 h-8 mr-3" />
              <div>
                <h3 className="font-semibold text-lg">SEO Analizi</h3>
                <p className="text-blue-100 text-sm">{t("common.ürün_seo_performans_analizi")}</p>
              </div>
            </div>
          </div>

          {/* Anahtar Kelime Araştırması */}
          <div className="bg-green-500 hover:bg-green-600 text-white rounded-lg p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg">
            <div className="flex items-center mb-4">
              <Target className="w-8 h-8 mr-3" />
              <div>
                <h3 className="font-semibold text-lg">Anahtar Kelime</h3>
                <p className="text-green-100 text-sm">{t("common.kelime_araştırması_ve_önerileri")}</p>
              </div>
            </div>
          </div>

          {/* Rakip Analizi */}
          <div className="bg-purple-500 hover:bg-purple-600 text-white rounded-lg p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg">
            <div className="flex items-center mb-4">
              <TrendingUp className="w-8 h-8 mr-3" />
              <div>
                <h3 className="font-semibold text-lg">Rakip Analizi</h3>
                <p className="text-purple-100 text-sm">{t("common.rekabet_durumu_ve_fırsatlar")}</p>
              </div>
            </div>
          </div>

          {/* Site Haritası */}
          <div className="bg-indigo-500 hover:bg-indigo-600 text-white rounded-lg p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg">
            <div className="flex items-center mb-4">
              <Globe className="w-8 h-8 mr-3" />
              <div>
                <h3 className="font-semibold text-lg">{t("common.site_haritası")}</h3>
                <p className="text-indigo-100 text-sm">{t("common.xml_sitemap_yönetimi")}</p>
              </div>
            </div>
          </div>

          {/* Hız Optimizasyonu */}
          <div className="bg-red-500 hover:bg-red-600 text-white rounded-lg p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg">
            <div className="flex items-center mb-4">
              <Zap className="w-8 h-8 mr-3" />
              <div>
                <h3 className="font-semibold text-lg">{t("common.hız_optimizasyonu")}</h3>
                <p className="text-red-100 text-sm">{t("common.sayfa_hızı_ve_performans")}</p>
              </div>
            </div>
          </div>

          {/* SEO Raporları */}
          <div className="bg-teal-500 hover:bg-teal-600 text-white rounded-lg p-6 cursor-pointer transition-all transform hover:scale-105 shadow-lg">
            <div className="flex items-center mb-4">
              <BarChart3 className="w-8 h-8 mr-3" />
              <div>
                <h3 className="font-semibold text-lg">{t("common.seo_raporları")}</h3>
                <p className="text-teal-100 text-sm">{t("common.detaylı_seo_performans_raporları")}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Development Notice */}
        <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 text-center">
          <h3 className="font-semibold text-orange-800 mb-2">{t("common.seo_modülü_geliştirme_aşamasında")}</h3>
          <p className="text-orange-700 text-sm mb-4">{t("common.profesyonel_seo_araçları_ve_analiz_sistemleri_hazırlanıyor")}</p>
          <div className="bg-orange-100 rounded-lg p-4 text-left max-w-2xl mx-auto">
            <h4 className="font-semibold text-orange-800 mb-2">{t("common.gelecek_özellikler")}</h4>
            <ul className="text-sm text-orange-700 space-y-1">
              <li>{t("common.otomatik_seo_başlık_ve_açıklama_oluşturma")}</li>
              <li>{t("common.anahtar_kelime_yoğunluğu_analizi")}</li>
              <li>{t("common.rakip_seo_analizi_ve_karşılaştırma")}</li>
              <li>• Google Search Console entegrasyonu</li>
              <li>{t("common.seo_puanlama_ve_iyileştirme_önerileri")}</li>
              <li>{t("common.ürün_bazlı_seo_optimizasyonu")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>;
}
export default SEO;