import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Gamepad2, Upload, Image, Tag, Star } from 'lucide-react';
import { useTranslation } from "react-i18next";
function OyunUrunForm() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  return <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button onClick={() => navigate('/admin/urun-ekleme-yeni')} className="flex items-center text-white hover:text-indigo-200 mr-6">
                <ArrowLeft size={20} className="mr-2" />{t("common.kategori_seçimine_dön")}</button>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-bold text-white">{t("common.altıntassoft")}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="bg-indigo-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Gamepad2 className="w-10 h-10 text-indigo-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">{t("common.oyun_konsol_ürünü_ekle")}</h1>
          <p className="text-gray-600 text-lg mb-8 text-center">{t("common.bu_form_henüz_hazırlanıyor")}</p>
          
          {/* Placeholder Content */}
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-6">
            <h3 className="font-semibold text-indigo-800 mb-4">{t("common.oyun_özel_alanları")}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-indigo-700">
              <div>
                <h4 className="font-medium mb-2">Temel Bilgiler:</h4>
                <ul className="space-y-1">
                  <li>{t("common.oyun_adı_ve_açıklama")}</li>
                  <li>{t("common.geliştirici_yayıncı")}</li>
                  <li>{t("common.fiyat_ve_stok")}</li>
                  <li>{t("common.oyun_kapak_fotoğrafı")}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">{t("common.oyun_özel")}</h4>
                <ul className="space-y-1">
                  <li>{t("common.platform_uyumluluğu_ps5_xbox_pc")}</li>
                  <li>{t("common.oyun_türü_aksiyon_rpg_spor")}</li>
                  <li>{t("common.yaş_sınırı_pegi_esrb")}</li>
                  <li>{t("common.multiplayer_desteği")}</li>
                  <li>• Sistem gereksinimleri</li>
                  <li>{t("common.dlc_ek_içerik")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
export default OyunUrunForm;