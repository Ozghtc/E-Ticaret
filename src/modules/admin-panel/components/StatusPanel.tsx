import React from 'react';
import { ModuleStatus, ClickPosition } from '../types/adminTypes';
import { adminCards } from '../data/adminCards';
import { useTranslation } from "react-i18next";
interface StatusPanelProps {
  selectedModule: string;
  clickedPosition: ClickPosition | null;
  updateModuleStatusFromPanel: (status: ModuleStatus) => void;
  setSelectedModule: (module: string) => void;
  setClickedPosition: (position: ClickPosition | null) => void;
}
const StatusPanel: React.FC<StatusPanelProps> = ({
  selectedModule,
  clickedPosition,
  updateModuleStatusFromPanel,
  setSelectedModule,
  setClickedPosition
}) => {
  const {
    t
  } = useTranslation();
  if (!selectedModule || !clickedPosition) {
    return null;
  }
  const selectedCard = adminCards.find(card => card.id === selectedModule);
  return <div className="fixed bg-white/95 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl p-4 min-w-64 z-[10001]" style={{
    left: `${clickedPosition.x}px`,
    top: `${clickedPosition.y}px`
  }}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">
            {selectedCard?.title}
          </h3>
          <p className="text-sm text-gray-600">{t("common.durum_seçin")}</p>
        </div>
        <button onClick={() => {
        setSelectedModule('');
        setClickedPosition(null);
      }} className="text-gray-500 hover:text-gray-700 transition-colors" title={t("common.geri_dön")}>
          ←
        </button>
      </div>
      
      <div className="space-y-2">
        <button onClick={() => updateModuleStatusFromPanel('in-progress')} className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors">
          <span className="text-2xl">⚙️</span>
          <span className="text-sm font-medium text-gray-700">{t("common.yapım_aşamasında")}</span>
        </button>
        <button onClick={() => updateModuleStatusFromPanel('not-started')} className="w-full flex items-center space-x-3 p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors">
          <span className="text-2xl">❌</span>
          <span className="text-sm font-medium text-gray-700">{t("common.henüz_başlanmadı")}</span>
        </button>
        <button onClick={() => updateModuleStatusFromPanel('completed')} className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors">
          <span className="text-2xl">✅</span>
          <span className="text-sm font-medium text-gray-700">Hazır</span>
        </button>
      </div>
    </div>;
};
export default StatusPanel;