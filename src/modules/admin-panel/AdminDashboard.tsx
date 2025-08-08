import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

// Hooks
import { useAdminState } from './hooks/useAdminState';
import { useLayoutManager } from './hooks/useLayoutManager';
import { useStatusManager } from './hooks/useStatusManager';

// Components
import AdminHeader from './components/AdminHeader';
import LayoutControls from './components/LayoutControls';
import GroupedLayout from './components/GroupedLayout';
import CardLayout from './components/CardLayout';
import StatusPanel from './components/StatusPanel';

// Data
import { adminCards } from './data/adminCards';

function AdminDashboard() {
  const navigate = useNavigate();
  const { t } = useTranslation('admin');

  // Custom hooks
  const {
    useGroupedLayout,
    expandedGroups,
    toggleLayoutMode,
    toggleGroup
  } = useAdminState();

  const {
    layoutMode,
    currentLayout,
    cardPositions,
    loadLayout,
    autoAlign,
    saveCurrentLayout,
    resetLayout,
    handleDragStop
  } = useLayoutManager();

  const {
    moduleStatuses,
    openDropdowns,
    selectedModule,
    clickedPosition,
    setSelectedModule,
    setClickedPosition,
    toggleDropdown,
    updateModuleStatus,
    updateModuleStatusFromPanel,
    handleStatusIndicatorClick,
    getStatusIcon,
    getStatusText,
    getStatusEmoji
  } = useStatusManager();

  // Check authentication on mount
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }

    // Close dropdowns when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        // Clear all dropdowns - implemented in useStatusManager
      }
      // Status panel'i sadece panel dışına tıklandığında kapat
      if (!target.closest('.status-panel-container') && !target.closest('.status-settings-button')) {
        setSelectedModule('');
        setClickedPosition(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate, setSelectedModule, setClickedPosition]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-cyan-100" style={{
      backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(120, 219, 226, 0.3) 0%, transparent 50%),
        linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)
      `,
      backdropFilter: 'blur(10px)'
    }}>
      {/* Top Header */}
      <AdminHeader />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section - Glassmorphism */}
        <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-3xl p-8 mb-10 shadow-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                {t('dashboard.welcome')} <span className="text-blue-700 drop-shadow-md">{t('dashboard.title')}</span>
              </h1>
              <p className="text-gray-700 text-lg font-medium">
                🚀 {t('dashboard.subtitle')}
              </p>
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <span className="bg-green-100/80 text-green-700 px-3 py-1 rounded-full backdrop-blur-sm">
                  ✅ {t('dashboard.systemActive')}
                </span>
                <span className="bg-blue-100/80 text-blue-700 px-3 py-1 rounded-full backdrop-blur-sm">
                  📊 {t('dashboard.modulesCount', { count: 16 })}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Controls */}
        <LayoutControls
          layoutMode={layoutMode}
          useGroupedLayout={useGroupedLayout}
          currentLayout={currentLayout}
          toggleLayoutMode={toggleLayoutMode}
          loadLayout={loadLayout}
          autoAlign={autoAlign}
          saveCurrentLayout={saveCurrentLayout}
          resetLayout={resetLayout}
        />

        {/* Action Cards Container */}
        <div className={layoutMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8' : 'relative min-h-screen mb-8'}>
          {/* Grid Overlay - Sadece Free Mode'da göster */}
          {layoutMode === 'free' && (
            <div 
              className="absolute inset-0 pointer-events-none opacity-20 z-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)
                `,
                backgroundSize: '20px 20px'
              }}
            />
          )}
          
          {useGroupedLayout ? (
            <GroupedLayout
              expandedGroups={expandedGroups}
              moduleStatuses={moduleStatuses}
              toggleGroup={toggleGroup}
              handleStatusIndicatorClick={handleStatusIndicatorClick}
              getStatusIcon={getStatusIcon}
              getStatusText={getStatusText}
              getStatusEmoji={getStatusEmoji}
            />
          ) : (
            <CardLayout
              adminCards={adminCards}
              layoutMode={layoutMode}
              cardPositions={cardPositions}
              moduleStatuses={moduleStatuses}
              openDropdowns={openDropdowns}
              handleDragStop={handleDragStop}
              handleStatusIndicatorClick={handleStatusIndicatorClick}
              toggleDropdown={toggleDropdown}
              updateModuleStatus={updateModuleStatus}
              getStatusIcon={getStatusIcon}
              getStatusText={getStatusText}
              getStatusEmoji={getStatusEmoji}
            />
          )}
        </div>

        {/* Bottom Section with HZM Partnership - Glassmorphism */}
        <div className="text-center">
          <div className="inline-block backdrop-blur-md bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-600/90 hover:to-purple-600/90 text-white px-8 py-4 rounded-full cursor-pointer transition-all duration-300 shadow-2xl border border-white/30 transform hover:scale-105">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">🚀 {t('dashboard.hzmPartnership')}</span>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Status Panel */}
        <StatusPanel
          selectedModule={selectedModule}
          clickedPosition={clickedPosition}
          updateModuleStatusFromPanel={updateModuleStatusFromPanel}
          setSelectedModule={setSelectedModule}
          setClickedPosition={setClickedPosition}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;
