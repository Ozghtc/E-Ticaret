import React from 'react';
import { Link } from 'react-router-dom';
import Draggable from 'react-draggable';
import { Layout, ChevronDown, CheckCircle, XCircle, Loader } from 'lucide-react';
import { AdminCard, CardPositionsMap, ModuleStatusMap, DropdownStateMap, LayoutMode, ModuleStatus } from '../types/adminTypes';
import { useTranslation } from "react-i18next";
interface CardLayoutProps {
  adminCards: AdminCard[];
  layoutMode: LayoutMode;
  cardPositions: CardPositionsMap;
  moduleStatuses: ModuleStatusMap;
  openDropdowns: DropdownStateMap;
  handleDragStop: (cardId: string, e: any, data: any) => void;
  handleStatusIndicatorClick: (cardId: string, event: React.MouseEvent) => void;
  toggleDropdown: (cardId: string) => void;
  updateModuleStatus: (cardId: string, status: ModuleStatus) => void;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusText: (status: string) => string;
  getStatusEmoji: (status: string) => string;
}
const CardLayout: React.FC<CardLayoutProps> = ({
  adminCards,
  layoutMode,
  cardPositions,
  moduleStatuses,
  openDropdowns,
  handleDragStop,
  handleStatusIndicatorClick,
  toggleDropdown,
  updateModuleStatus,
  getStatusIcon,
  getStatusText,
  getStatusEmoji
}) => {
  const {
    t
  } = useTranslation();
  return <>
      {adminCards.map(card => {
      const IconComponent = card.icon;
      const position = cardPositions[card.id] || {
        x: 0,
        y: 0
      };
      return <Draggable key={card.id} disabled={layoutMode === 'grid'} position={layoutMode === 'free' ? position : {
        x: 0,
        y: 0
      }} onStop={(e, data) => layoutMode === 'free' && handleDragStop(card.id, e, data)}>
            <div className={layoutMode === 'free' ? 'absolute cursor-move w-80 z-10' : 'cursor-default'} style={layoutMode === 'free' ? {
          width: '300px'
        } : {}}>
              <Link to={card.link} className={`block backdrop-blur-lg bg-gradient-to-br ${card.color} ${card.hoverColor} 
                          border border-white/30 text-white rounded-3xl p-6 
                          transition-all duration-500 transform hover:scale-110 hover:rotate-1
                          shadow-2xl hover:shadow-3xl group relative overflow-hidden
                          ${layoutMode === 'free' ? 'cursor-pointer' : 'cursor-pointer'}`} style={layoutMode === 'free' ? {
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
          } : {}} onClick={e => {
            if (layoutMode === 'free' && e.target !== e.currentTarget) {
              e.preventDefault();
            }
          }}>
                {/* Drag Handle - only visible in free mode */}
                {layoutMode === 'free' && <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="w-6 h-6 flex items-center justify-center bg-white/20 rounded-lg backdrop-blur-sm">
                      <Layout size={12} className="text-white" />
                    </div>
                  </div>}

                {/* Floating Particles Effect */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center mb-4">
                    <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm mr-4 group-hover:bg-white/30 transition-all duration-300">
                      <IconComponent className="w-8 h-8 text-white drop-shadow-lg" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-lg mb-1 text-white drop-shadow-md group-hover:text-white/90 transition-colors">
                        {card.title}
                      </h3>
                    </div>
                  </div>
                  <p className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-colors mb-4">
                    {card.description}
                  </p>

                  {/* Status Indicator - Sağ Alt Köşe */}
                  <div className="absolute bottom-2 right-2">
                    <div key={`${card.id}-${moduleStatuses[card.id] || 'none'}`} onClick={e => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleStatusIndicatorClick(card.id, e);
                }} className="w-8 h-8 bg-pink-400/90 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200 z-10">
                      <span className="text-sm">
                        {getStatusEmoji(moduleStatuses[card.id] || 'none')}
                      </span>
                    </div>
                  </div>

                  {/* Status Section - Hidden for new system */}
                  <div className="mt-4 pt-4 border-t border-white/20 hidden">
                    {/* Current Status Display */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        {getStatusIcon(moduleStatuses[card.id])}
                        <span className="text-white/80 text-sm font-medium">
                          {getStatusText(moduleStatuses[card.id])}
                        </span>
                      </div>
                    </div>

                    {/* Status Dropdown */}
                    <div className="relative dropdown-container">
                      <button onClick={e => {
                    e.preventDefault();
                    e.stopPropagation();
                    toggleDropdown(card.id);
                  }} className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20">
                        <span>{t("common.durum_değiştir")}</span>
                        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${openDropdowns[card.id] ? 'rotate-180' : ''}`} />
                      </button>

                      {/* Dropdown Menu */}
                      {openDropdowns[card.id] && <div className="absolute bottom-full left-0 right-0 mb-2 bg-white/95 backdrop-blur-md border border-white/30 rounded-lg shadow-xl overflow-hidden z-20">
                          <div className="py-1">
                            <button onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        updateModuleStatus(card.id, 'in-progress');
                      }} className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-blue-50 transition-colors">
                              <Loader className="w-4 h-4 animate-spin text-blue-600" />
                              <span className="text-gray-700">{t("common.yapım_aşamasında")}</span>
                            </button>
                            <button onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        updateModuleStatus(card.id, 'not-started');
                      }} className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-red-50 transition-colors">
                              <XCircle className="w-4 h-4 text-red-600" />
                              <span className="text-gray-700">{t("common.henüz_başlanmadı")}</span>
                            </button>
                            <button onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        updateModuleStatus(card.id, 'completed');
                      }} className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-green-50 transition-colors">
                              <CheckCircle className="w-4 h-4 text-green-600" />
                              <span className="text-gray-700">Hazır</span>
                            </button>
                          </div>
                        </div>}
                    </div>
                  </div>
                </div>

                {/* Glassmorphism border effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </div>
          </Draggable>;
    })}
    </>;
};
export default CardLayout;