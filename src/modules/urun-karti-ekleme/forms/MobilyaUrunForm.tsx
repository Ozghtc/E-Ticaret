import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Home, Upload, Image, Tag, Star } from 'lucide-react';

function MobilyaUrunForm() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header className="bg-orange-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin/urun-ekleme-yeni')}
                className="flex items-center text-white hover:text-orange-200 mr-6"
              >
                <ArrowLeft size={20} className="mr-2" />
                Kategori Seçimine Dön
              </button>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-bold text-white">Altıntassoft</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className="bg-orange-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Home className="w-10 h-10 text-orange-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            🛋️ Mobilya & Dekorasyon Ürünü Ekle
          </h1>
          <p className="text-gray-600 text-lg mb-8 text-center">
            Bu form henüz hazırlanıyor...
          </p>
          
          {/* Placeholder Content */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6">
            <h3 className="font-semibold text-orange-800 mb-4">🎯 Mobilya Özel Alanları:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-orange-700">
              <div>
                <h4 className="font-medium mb-2">Temel Bilgiler:</h4>
                <ul className="space-y-1">
                  <li>• Ürün adı ve açıklama</li>
                  <li>• Marka ve fiyat</li>
                  <li>• Stok adedi</li>
                  <li>• Ürün fotoğrafları</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">Mobilya Özel:</h4>
                <ul className="space-y-1">
                  <li>• Ölçü bilgileri (En/Boy/Yükseklik)</li>
                  <li>• Malzeme detayları</li>
                  <li>• Renk seçenekleri</li>
                  <li>• Montaj gerekliliği</li>
                  <li>• Ağırlık kapasitesi</li>
                  <li>• Garanti süresi</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MobilyaUrunForm;