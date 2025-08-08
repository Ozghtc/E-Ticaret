import React from 'react';
import { BarChart3, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { useTranslation } from "react-i18next";
interface SeoAnalysisProps {
  productData?: {
    title: string;
    description: string;
    keywords: string[];
    url: string;
  };
}
export default function SeoAnalysis({
  productData
}: SeoAnalysisProps) {
  const {
    t
  } = useTranslation();
  // SEO analiz mantığı burada olacak
  const seoScore = 75; // Örnek skor

  return <div className="bg-white rounded-lg shadow-lg p-6">
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
              <span className="font-medium">{t("common.başlık_uzunluğu")}</span>
            </div>
            <span className="text-green-600 font-bold">Uygun</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
            <div className="flex items-center">
              <AlertCircle className="text-yellow-500 mr-2" size={20} />
              <span className="font-medium">{t("common.meta_açıklama")}</span>
            </div>
            <span className="text-yellow-600 font-bold">{t("common.i_yileştirilebilir")}</span>
          </div>
          
          <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
            <div className="flex items-center">
              <CheckCircle className="text-green-500 mr-2" size={20} />
              <span className="font-medium">Anahtar Kelimeler</span>
            </div>
            <span className="text-green-600 font-bold">{t("common.i_yi")}</span>
          </div>
        </div>

        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-800 mb-2">{t("common.i_yileştirme_önerileri")}</h3>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>{t("common.meta_açıklamayı_150_160_karakter_yapın")}</li>
              <li>• Daha fazla uzun kuyruk anahtar kelime ekleyin</li>
              <li>{t("common.ürün_fotoğraflarına_alt_text_ekleyin")}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>;
}