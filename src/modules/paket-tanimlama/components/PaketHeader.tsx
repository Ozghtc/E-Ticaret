// Paket Tanımlama Modülü - Header Bileşeni
import React from 'react';
import { ArrowLeft, Plus, Package } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
interface PaketHeaderProps {
  onNewPaket: () => void;
  onReset: () => void;
}
const PaketHeader: React.FC<PaketHeaderProps> = ({
  onNewPaket,
  onReset
}) => {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  return <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <button onClick={() => navigate('/admin')} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center space-x-3">
              <Package className="w-8 h-8 text-rose-500" />
              <div>
                <h1 className="text-xl font-semibold text-gray-900">{t("common.paket_tanımlama")}</h1>
                <p className="text-sm text-gray-500">{t("common.sistem_özellikleri_ve_fiyatlandırma")}</p>
              </div>
            </div>
          </div>
          <div className="flex space-x-2">
            <button onClick={onReset} className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors" title={t("common.varsayılan_paketleri_yeniden_yükle")}>
              <span>🔄 Sıfırla</span>
            </button>
            <button onClick={onNewPaket} className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors">
              <Plus size={20} />
              <span>Yeni Paket</span>
            </button>
          </div>
        </div>
      </div>
    </header>;
};
export default PaketHeader;