import React, { useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { ArrowLeft, Package } from 'lucide-react';
import { useTranslation } from "react-i18next";
function UrunYonetimi() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin/magaza-paneli" className="flex items-center text-white hover:text-blue-200 mr-6">
                <ArrowLeft size={20} className="mr-2" />{t("common.mağaza_paneli_ne_dön")}</Link>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-bold text-white">{t("common.altıntassoft")}</span>
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
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">{t("common.ürün_yönetimi")}</h1>
          <p className="text-gray-600 text-lg mb-8 text-center">{t("common.ürünlerinizi_ekleyin_düzenleyin_ve_stok_takibi_yapın")}</p>
          
          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <button onClick={() => navigate('/admin/urun-ekleme')} className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition-colors text-left">
              <div className="flex items-center mb-3">
                <Package className="w-6 h-6 mr-2" />
                <h3 className="font-semibold">{t("common.yeni_ürün_ekle")}</h3>
              </div>
              <p className="text-blue-100 text-sm">{t("common.temaya_uygun_ürün_ekleme_formu")}</p>
            </button>

            <button className="bg-green-600 text-white p-6 rounded-lg hover:bg-green-700 transition-colors text-left">
              <div className="flex items-center mb-3">
                <Package className="w-6 h-6 mr-2" />
                <h3 className="font-semibold">{t("common.ürün_listesi")}</h3>
              </div>
              <p className="text-green-100 text-sm">{t("common.mevcut_ürünleri_görüntüle")}</p>
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
            <h3 className="font-semibold text-blue-800 mb-3">{t("common.tema_spesifik_ürün_ekleme_sistemi")}</h3>
            <div className="text-sm text-blue-700 space-y-2">
              <p>✅ <strong>Fashion Store:</strong>{t("common.renk_beden_seçimi_model_bilgileri_bakım_talimatları")}</p>
              <p>✅ <strong>MegaStore:</strong>{t("common.kampanya_ayarları_toplu_indirim_flash_sale")}</p>
              <p>✅ <strong>TechHub:</strong>{t("common.teknik_özellikler_uyumluluk_performans_grafikleri")}</p>
              <p>✅ <strong>Organic Market:</strong>{t("common.sertifikalar_besin_değerleri_çiftlik_bilgileri")}</p>
              <p>✅ <strong>Modern Minimal:</strong> Sade form, temel bilgiler</p>
              <p className="mt-3 font-medium">{t("common.her_tema_kendi_özel_alanlarına_sahip_ürün_ekleme_deneyimi_sunar")}</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
export default UrunYonetimi;