// 🔄 DİNAMİK MAĞAZA RENDERİNG SİSTEMİ
// Mağaza ID'sine göre tamamen farklı sistem yükler

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  getCustomSystem, 
  isCustomSystem, 
  getSystemType, 
  CustomSystemType 
} from '../config/customMagazaSystems';

// Default e-ticaret sistemi
import AdminDashboard from '../modules/admin-panel/AdminDashboard';

// Özel sistem dashboardları (lazy loading)
const RestaurantDashboard = React.lazy(() => import('../modules/custom-systems/restaurant/RestaurantDashboard'));
// TODO: Aşağıdaki dosyalar henüz oluşturulmadı
// const HealthcareDashboard = React.lazy(() => import('../modules/custom-systems/healthcare/HealthcareDashboard')); 
// const RealEstateDashboard = React.lazy(() => import('../modules/custom-systems/real-estate/RealEstateDashboard'));
// const WorkshopDashboard = React.lazy(() => import('../modules/custom-systems/workshop/WorkshopDashboard'));

interface DynamicMagazaRendererProps {
  magazaId: string;
}

export default function DynamicMagazaRenderer({ magazaId }: DynamicMagazaRendererProps) {
  const navigate = useNavigate();
  const [systemType, setSystemType] = useState<CustomSystemType>('default');
  const [customSystem, setCustomSystem] = useState<any>(null);

  useEffect(() => {
    // Mağaza ID'sine göre sistem türünü belirle
    const type = getSystemType(magazaId);
    setSystemType(type);
    
    if (isCustomSystem(magazaId)) {
      const system = getCustomSystem(magazaId);
      setCustomSystem(system);
      
      // Özel tema CSS'ini dinamik yükle
      if (system?.customCSS) {
        const style = document.createElement('style');
        style.innerHTML = system.customCSS;
        document.head.appendChild(style);
      }
    }
  }, [magazaId]);

  // 🎯 SİSTEM TÜRÜNE GÖRE DASHBOARD COMPONENT'İ SEÇ
  const renderDashboard = () => {
    const Fallback = <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
    </div>;

    switch (systemType) {
      case 'restaurant':
        return (
          <React.Suspense fallback={Fallback}>
            <RestaurantDashboard 
              magazaId={magazaId}
              config={customSystem}
            />
          </React.Suspense>
        );
        
      case 'healthcare':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Healthcare Dashboard</h2>
            <p className="text-gray-600">Bu modül henüz geliştirilmekte...</p>
          </div>
        );
        
      case 'real-estate':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Real Estate Dashboard</h2>
            <p className="text-gray-600">Bu modül henüz geliştirilmekte...</p>
          </div>
        );
        
      case 'workshop':
        return (
          <div className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Workshop Dashboard</h2>
            <p className="text-gray-600">Bu modül henüz geliştirilmekte...</p>
          </div>
        );
        
      default:
        // Standart e-ticaret sistemi
        return <AdminDashboard />;
    }
  };

  // 🎨 SİSTEME ÖZEL CSS CLASS'LARI EKLE
  useEffect(() => {
    const bodyClasses = document.body.className;
    
    // Eski sistem class'larını temizle
    document.body.className = bodyClasses
      .replace(/system-\w+/g, '')
      .replace(/theme-\w+/g, '')
      .trim();
    
    // Yeni sistem class'larını ekle
    document.body.classList.add(`system-${systemType}`);
    
    if (customSystem?.customDashboard?.colors) {
      const { primary, secondary, accent } = customSystem.customDashboard.colors;
      document.documentElement.style.setProperty('--color-primary', primary);
      document.documentElement.style.setProperty('--color-secondary', secondary);
      document.documentElement.style.setProperty('--color-accent', accent);
    }
    
    return () => {
      // Cleanup: class'ları temizle
      document.body.className = bodyClasses;
    };
  }, [systemType, customSystem]);

  return (
    <div className={`dynamic-magaza-system system-${systemType}`}>
      {renderDashboard()}
    </div>
  );
}

// 🔗 MAĞAZA ID HOOK'U - URL'den veya localStorage'dan magazine ID al
export const useMagazaId = (): string | null => {
  const [magazaId, setMagazaId] = useState<string | null>(null);

  useEffect(() => {
    // 1. URL'den magaza ID'sini al
    const urlParams = new URLSearchParams(window.location.search);
    const urlMagazaId = urlParams.get('magazaId');
    
    if (urlMagazaId) {
      setMagazaId(urlMagazaId);
      localStorage.setItem('currentMagazaId', urlMagazaId);
      return;
    }
    
    // 2. localStorage'dan al
    const storedMagazaId = localStorage.getItem('currentMagazaId');
    if (storedMagazaId) {
      setMagazaId(storedMagazaId);
      return;
    }
    
    // 3. Varsayılan (demo mağaza)
    setMagazaId('default-magaza');
  }, []);

  return magazaId;
};
