import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Leaf, Upload, Image, Tag, Star } from 'lucide-react';
import { useTranslation } from "react-i18next";
function GidaUrunForm() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  return <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      {/* Header */}
      <header className="bg-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button onClick={() => navigate('/admin/urun-ekleme-yeni')} className="flex items-center text-white hover:text-green-200 mr-6">
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
          <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Leaf className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">{t("common.gıda_i_çecek_ürünü_ekle")}</h1>
          <p className="text-gray-600 text-lg mb-8 text-center">{t("common.bu_form_henüz_hazırlanıyor")}</p>
          
          {/* Placeholder Content */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <h3 className="font-semibold text-green-800 mb-4">🎯 Gıda Özel Alanları:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-700">
              <div>
                <h4 className="font-medium mb-2">Temel Bilgiler:</h4>
                <ul className="space-y-1">
                  <li>{t("common.ürün_adı_ve_açıklama")}</li>
                  <li>{t("common.marka_ve_üretici")}</li>
                  <li>{t("common.fiyat_ve_stok")}</li>
                  <li>{t("common.ürün_fotoğrafları")}</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">{t("common.gıda_özel")}</h4>
                <ul className="space-y-1">
                  <li>• İçerik listesi</li>
                  <li>{t("common.besin_değerleri")}</li>
                  <li>• Son kullanma tarihi</li>
                  <li>{t("common.organik_sertifikası")}</li>
                  <li>{t("common.allerjen_uyarıları")}</li>
                  <li>{t("common.saklama_koşulları")}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
}
export default GidaUrunForm;