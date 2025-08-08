import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { ModuleStatusMap, ExpandedGroupsMap } from '../types/adminTypes';
import { groupedModules } from '../data/groupedModules';
import { adminCards } from '../data/adminCards';
import { useTranslation } from "react-i18next";
interface GroupedLayoutProps {
  expandedGroups: ExpandedGroupsMap;
  moduleStatuses: ModuleStatusMap;
  toggleGroup: (groupId: string) => void;
  handleStatusIndicatorClick: (cardId: string, event: React.MouseEvent) => void;
  getStatusIcon: (status: string) => React.ReactNode;
  getStatusText: (status: string) => string;
  getStatusEmoji: (status: string) => string;
}
const GroupedLayout: React.FC<GroupedLayoutProps> = ({
  expandedGroups,
  moduleStatuses,
  toggleGroup,
  handleStatusIndicatorClick,
  getStatusIcon,
  getStatusText,
  getStatusEmoji
}) => {
  const {
    t
  } = useTranslation();
  return <div className="space-y-6">
      {Object.entries(groupedModules).map(([groupId, group]) => {
      const GroupIcon = group.icon;
      return <div key={groupId} className="group-row">
            {/* Yatay Satır Yapısı */}
            <div className="backdrop-blur-md bg-white/10 border border-white/30 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300">
              <div className="flex items-center justify-between flex-wrap lg:flex-nowrap gap-4">
                {/* Sol: Grup İsmi + İkon */}
                <div className="flex items-center space-x-3 lg:space-x-4 min-w-0 flex-shrink-0">
                  <div className={`p-2 lg:p-3 bg-gradient-to-br ${group.color} rounded-xl shadow-lg`}>
                    <GroupIcon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-1">
                      {group.title}
                    </h3>
                    <p className="text-white/70 text-xs lg:text-sm hidden sm:block">
                      {group.modules.length}{t("common.modül")}</p>
                  </div>
                </div>

                {/* Orta: Modül Butonları */}
                <div className="flex-1 mx-6 min-w-0 lg:mx-6 md:mx-4 sm:mx-2">
                  <div className="flex items-center space-x-2 overflow-x-auto pb-2">
                    {group.modules.map(moduleId => {
                  const card = adminCards.find(c => c.id === moduleId);
                  if (!card) return null;
                  return <Link key={moduleId} to={card.link} className="flex-shrink-0 group relative">
                          <div className="px-3 lg:px-4 py-2 bg-white/20 hover:bg-white/30 border border-white/30 rounded-lg text-white text-xs lg:text-sm font-medium transition-all duration-200 hover:scale-105 hover:shadow-lg backdrop-blur-sm min-w-max">
                            <div className="flex items-center space-x-2">
                              <span className="truncate max-w-24 lg:max-w-none">{card.title}</span>
                              {/* Status Emoji */}
                              <span className="text-xs flex-shrink-0">
                                {getStatusEmoji(moduleStatuses[moduleId] || 'none')}
                              </span>
                            </div>
                          </div>
                          
                          {/* Hover Tooltip - Hidden on mobile */}
                          <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-gray-900/95 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10 hidden lg:block">
                            {card.description}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900/95"></div>
                          </div>
                        </Link>;
                })}
                  </div>
                </div>

                {/* Sağ: Açılır/Kapanır Ok */}
                <div className="flex-shrink-0">
                  <button onClick={() => toggleGroup(groupId)} className="p-2 lg:p-3 bg-white/20 hover:bg-white/30 border border-white/30 rounded-xl transition-all duration-200 group touch-manipulation" title={expandedGroups[groupId] ? t("common.detayları_gizle") : t("common.detayları_göster")}>
                    <ChevronDown className={`w-4 h-4 lg:w-5 lg:h-5 text-white transition-transform duration-300 ${expandedGroups[groupId] ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Açılır İçerik - Alt Detaylar */}
              {expandedGroups[groupId] && <div className="mt-6 pt-6 border-t border-white/20">
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
                    {group.modules.map(moduleId => {
                const card = adminCards.find(c => c.id === moduleId);
                if (!card) return null;
                const IconComponent = card.icon;
                return <Link key={moduleId} to={card.link} className="group relative">
                          <div className="backdrop-blur-lg bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-xl p-3 lg:p-4 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                            <div className="flex items-start space-x-2 lg:space-x-3">
                              <div className={`p-2 bg-gradient-to-br ${card.color} rounded-lg flex-shrink-0`}>
                                <IconComponent className="w-4 h-4 lg:w-5 lg:h-5 text-white" />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-semibold text-white mb-1 truncate text-sm lg:text-base">
                                  {card.title}
                                </h4>
                                <p className="text-white/70 text-xs leading-relaxed line-clamp-2">
                                  {card.description}
                                </p>
                                
                                {/* Status Badge */}
                                <div className="mt-2 flex items-center space-x-2">
                                  {getStatusIcon(moduleStatuses[moduleId])}
                                  <span className="text-white/60 text-xs">
                                    {getStatusText(moduleStatuses[moduleId])}
                                  </span>
                                </div>
                              </div>
                              
                              {/* Status Click Area */}
                              <button onClick={e => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleStatusIndicatorClick(moduleId, e);
                      }} className="flex-shrink-0 w-7 h-7 lg:w-8 lg:h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center border border-white/30 transition-all duration-200 hover:scale-110 touch-manipulation" title={t("common.durum_değiştir")}>
                                <span className="text-xs lg:text-sm">
                                  {getStatusEmoji(moduleStatuses[moduleId] || 'none')}
                                </span>
                              </button>
                            </div>
                          </div>
                        </Link>;
              })}
                  </div>
                </div>}
            </div>
          </div>;
    })}
    </div>;
};
export default GroupedLayout;