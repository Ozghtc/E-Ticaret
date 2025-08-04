import React from 'react';
import { BarChart3, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';

interface SeoAnalysisProps {
  productData?: {
    title: string;
    description: string;
    keywords: string[];
    url: string;
  };
}

export default function SeoAnalysis({ productData }: SeoAnalysisProps) {
  // SEO analiz mantığı burada olacak
  const seoScore = 75; // Örnek skor

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <BarChart3 className="mr-2" size={24} />
          SEO Analizi
        </h2>
        <div className="bg-blue-100 px-4 py-2 rounded-full">
          <span className="text-blue-800 font-bold">Skor: {seoScore}/100</span>
        </div>
      </div>

      {/* SEO Metrikleri */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={20} />
              <span className="font-medium">Başlık Uzunluğu</span>
            </div>
            <span className="text-green-600 font-bold">Uygun</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="text-yellow-500 mr-2" size={20} />
              <span className="font-medium">Meta Açıklama</span>
            </div>
            <span className="text-yellow-600 font-bold">İyileştirilebilir</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={20} />
              <span className="font-medium">Anahtar Kelimeler</span>
            </div>
            <span className="text-green-600 font-bold">İyi</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">İyileştirme Önerileri:</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Meta açıklamayı 150-160 karakter yapın</li>
              <li>• Daha fazla uzun kuyruk anahtar kelime ekleyin</li>
              <li>• Ürün fotoğraflarına alt text ekleyin</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}