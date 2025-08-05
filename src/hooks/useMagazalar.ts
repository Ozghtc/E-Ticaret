// 🎣 useMagazalar Hook - HZM API Integration
// State management for store operations with API fallback

import { useState, useEffect, useCallback } from 'react';
import { apiService, type MagazaData } from '../services/apiService';

interface UseMagazalarReturn {
  // Data
  magazalar: MagazaData[];
  loading: boolean;
  error: string | null;
  
  // Actions
  loadMagazalar: () => Promise<void>;
  createMagaza: (data: Omit<MagazaData, 'id' | 'createdAt' | 'updatedAt'>) => Promise<MagazaData>;
  updateMagaza: (id: string, data: Partial<MagazaData>) => Promise<MagazaData>;
  updateMagazaStatus: (id: string, status: MagazaData['status']) => Promise<MagazaData>;
  deleteMagaza: (id: string) => Promise<void>;
  
  // Utilities
  retry: () => Promise<void>;
  isOnline: boolean;
}

export const useMagazalar = (): UseMagazalarReturn => {
  // 📊 State
  const [magazalar, setMagazalar] = useState<MagazaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  // 🌐 Online/Offline Detection  
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      console.log('🌐 Bağlantı restored - syncing data...');
      loadMagazalar();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      console.log('📴 Offline mode - using localStorage backup');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // 📋 Load All Magazalar
  const loadMagazalar = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('🔄 Loading magazalar...');
      const data = await apiService.getMagazalar();
      
      setMagazalar(data);
      console.log(`✅ Loaded ${data.length} magazalar from API`);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Bilinmeyen hata';
      console.error('❌ Load mağazalar failed:', errorMessage);
      setError(`Mağazalar yüklenemedi: ${errorMessage}`);
      
      // Fallback: Try localStorage
      try {
        const backup = localStorage.getItem('magazaListesi_api_backup') || 
                      localStorage.getItem('magazaListesi');
        if (backup) {
          const backupData: MagazaData[] = JSON.parse(backup);
          setMagazalar(backupData);
          console.log('📦 Loaded from localStorage backup:', backupData.length);
          setError(`⚠️ Offline mode: ${backupData.length} mağaza localStorage'dan yüklendi`);
        }
      } catch (backupError) {
        console.error('💥 Backup loading failed:', backupError);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // ➕ Create Magaza
  const createMagaza = useCallback(async (data: Omit<MagazaData, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setLoading(true);
      setError(null);
      
      console.log('➕ Creating magaza:', data.storeName);
      const newMagaza = await apiService.createMagaza(data);
      
      setMagazalar(prev => [...prev, newMagaza]);
      console.log('✅ Magaza created:', newMagaza.id);
      
      return newMagaza;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Mağaza oluşturulamadı';
      console.error('❌ Create magaza failed:', errorMessage);
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // 🔄 Update Magaza
  const updateMagaza = useCallback(async (id: string, data: Partial<MagazaData>) => {
    try {
      setError(null);
      
      console.log('🔄 Updating magaza:', id);
      const updatedMagaza = await apiService.updateMagaza(id, data);
      
      setMagazalar(prev => 
        prev.map(m => m.id === id ? updatedMagaza : m)
      );
      console.log('✅ Magaza updated:', id);
      
      return updatedMagaza;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Mağaza güncellenemedi';
      console.error('❌ Update magaza failed:', errorMessage);
      setError(errorMessage);
      throw err;
    }
  }, []);

  // 📊 Update Magaza Status (Convenience method)
  const updateMagazaStatus = useCallback(async (id: string, status: MagazaData['status']) => {
    try {
      console.log(`📊 Updating magaza status: ${id} → ${status}`);
      const updatedMagaza = await updateMagaza(id, { status });
      
      // Show success message based on status
      const statusMessages = {
        pending: '⏳ Mağaza onay bekleme durumuna alındı',
        approved: '✅ Mağaza onaylandı',
        rejected: '❌ Mağaza reddedildi',
        active: '🚀 Mağaza aktifleştirildi'
      };
      
      console.log(statusMessages[status]);
      return updatedMagaza;
    } catch (err) {
      console.error('❌ Status update failed:', err);
      throw err;
    }
  }, [updateMagaza]);

  // 🗑️ Delete Magaza
  const deleteMagaza = useCallback(async (id: string) => {
    try {
      setError(null);
      
      console.log('🗑️ Deleting magaza:', id);
      await apiService.deleteMagaza(id);
      
      setMagazalar(prev => prev.filter(m => m.id !== id));
      console.log('✅ Magaza deleted:', id);
      
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Mağaza silinemedi';
      console.error('❌ Delete magaza failed:', errorMessage);
      setError(errorMessage);
      throw err;
    }
  }, []);

  // 🔄 Retry Failed Operation
  const retry = useCallback(async () => {
    console.log('🔄 Retrying operation...');
    await loadMagazalar();
  }, [loadMagazalar]);

  // 🚀 Initial Load
  useEffect(() => {
    loadMagazalar();
  }, [loadMagazalar]);

  // 🔄 Auto-sync when coming back online
  useEffect(() => {
    if (isOnline && error) {
      console.log('🌐 Auto-retrying after coming online...');
      setTimeout(() => {
        retry();
      }, 1000);
    }
  }, [isOnline, error, retry]);

  return {
    // Data
    magazalar,
    loading,
    error,
    
    // Actions
    loadMagazalar,
    createMagaza,
    updateMagaza,
    updateMagazaStatus,
    deleteMagaza,
    
    // Utilities
    retry,
    isOnline
  };
};

// 🎯 Hook with Search & Filter (Extended version)
interface UseMagazalarWithFiltersOptions {
  searchTerm?: string;
  statusFilter?: MagazaData['status'] | 'all';
  categoryFilter?: string;
}

export const useMagazalarWithFilters = (options: UseMagazalarWithFiltersOptions = {}) => {
  const magazaHook = useMagazalar();
  const { searchTerm = '', statusFilter = 'all', categoryFilter = 'all' } = options;

  const filteredMagazalar = magazaHook.magazalar.filter(magaza => {
    // Search filter
    const matchesSearch = !searchTerm || 
      magaza.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      magaza.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      magaza.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      magaza.cityName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      magaza.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Status filter
    const matchesStatus = statusFilter === 'all' || magaza.status === statusFilter;
    
    // Category filter
    const matchesCategory = categoryFilter === 'all' || magaza.storeCategory === categoryFilter;
    
    return matchesSearch && matchesStatus && matchesCategory;
  });

  // Statistics
  const stats = {
    total: magazaHook.magazalar.length,
    filtered: filteredMagazalar.length,
    active: magazaHook.magazalar.filter(m => m.status === 'active').length,
    pending: magazaHook.magazalar.filter(m => m.status === 'pending').length,
    approved: magazaHook.magazalar.filter(m => m.status === 'approved').length,
    rejected: magazaHook.magazalar.filter(m => m.status === 'rejected').length
  };

  return {
    ...magazaHook,
    filteredMagazalar,
    stats
  };
};

// 📊 Export for component usage
export default useMagazalar;