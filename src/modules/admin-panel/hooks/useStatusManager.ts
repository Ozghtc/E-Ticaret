import { useState, useEffect } from 'react';
import { UseStatusManagerReturn, ModuleStatusMap, DropdownStateMap, ModuleStatus, ClickPosition } from '../types/adminTypes';
import { getStatusIcon, getStatusText, getStatusEmoji, getStatusToastMessage } from '../utils/statusUtils';
import { showToast } from '../utils/layoutUtils';

export const useStatusManager = (): UseStatusManagerReturn => {
  const [moduleStatuses, setModuleStatuses] = useState<ModuleStatusMap>({});
  const [openDropdowns, setOpenDropdowns] = useState<DropdownStateMap>({});
  const [showStatusPanel, setShowStatusPanel] = useState<boolean>(false);
  const [selectedModule, setSelectedModule] = useState<string>('');
  const [clickedPosition, setClickedPosition] = useState<ClickPosition | null>(null);

  // Load saved module statuses from localStorage
  useEffect(() => {
    const savedStatuses = localStorage.getItem('moduleStatuses');
    if (savedStatuses) {
      setModuleStatuses(JSON.parse(savedStatuses));
    }
  }, []);

  // Toggle dropdown visibility
  const toggleDropdown = (cardId: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  // Update module status
  const updateModuleStatus = (cardId: string, status: ModuleStatus) => {
    console.log('🔄 updateModuleStatus çağrıldı:', cardId, status);
    
    const newStatuses = { ...moduleStatuses, [cardId]: status };
    console.log('📊 Yeni statuses:', newStatuses);
    
    setModuleStatuses(newStatuses);
    localStorage.setItem('moduleStatuses', JSON.stringify(newStatuses));
    
    // Force re-render için state'i zorla güncelle
    setTimeout(() => {
      setModuleStatuses(prev => ({ ...prev }));
    }, 100);

    // Show toast notification
    const message = getStatusToastMessage(status);
    showToast(message, '📝', 'blue');
  };

  // Update module status from panel
  const updateModuleStatusFromPanel = (status: ModuleStatus) => {
    console.log('🎯 updateModuleStatusFromPanel çağrıldı:', selectedModule, status);
    
    if (selectedModule) {
      console.log('✅ selectedModule mevcut, updateModuleStatus çağrılıyor');
      updateModuleStatus(selectedModule, status);
      setSelectedModule(''); // Modül seçimini temizle
      setShowStatusPanel(false); // Ana paneli de kapat
      setClickedPosition(null); // Pozisyonu temizle
    } else {
      console.log('❌ selectedModule yok!');
    }
  };

  // Handle status indicator click
  const handleStatusIndicatorClick = (cardId: string, event: React.MouseEvent) => {
    setSelectedModule(cardId);
    
    // Tıklanan pozisyonu kaydet
    const rect = event.currentTarget.getBoundingClientRect();
    setClickedPosition({
      x: rect.left - 280, // Panel genişliği kadar sola
      y: rect.top - 50    // Panel yüksekliği kadar yukarı
    });
  };

  return {
    moduleStatuses,
    openDropdowns,
    showStatusPanel,
    selectedModule,
    clickedPosition,
    setShowStatusPanel,
    setSelectedModule,
    setClickedPosition,
    toggleDropdown,
    updateModuleStatus,
    updateModuleStatusFromPanel,
    handleStatusIndicatorClick,
    getStatusIcon,
    getStatusText,
    getStatusEmoji
  };
};
