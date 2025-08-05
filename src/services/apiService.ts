// 🚀 HZM API Service - E-Ticaret Mağaza Sistemi
// API Integration Layer for HZM Database

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://hzmbackendveritabani-production.up.railway.app/api/v1'
  : 'https://hzmbackendveritabani-production.up.railway.app/api/v1'; // Her iki durumda da production kullan

const API_CONFIG = {
  projectId: 23,
  apiKey: 'hzm_112807dc571043aa83a70df125d6aa53',
  headers: {
    'X-API-Key': 'hzm_112807dc571043aa83a70df125d6aa53',
    'X-User-Email': process.env.REACT_APP_HZM_USER_EMAIL || 'demo@altintassoft.com',
    'X-Project-Password': process.env.REACT_APP_HZM_PROJECT_PASSWORD || 'demo123456',
    'Content-Type': 'application/json'
  }
};

// 📊 Mağaza Veri Modeli
export interface MagazaData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  storeName: string;
  storeCategory: string;
  storeDescription: string;
  domainType: 'subdomain' | 'custom';
  domainName?: string;
  customDomain?: string;
  cityId: number;
  cityName: string;
  district: string;
  address: string;
  postalCode: string;
  selectedPackage: 'basic' | 'pro' | 'enterprise';
  status: 'pending' | 'approved' | 'rejected' | 'active';
  socialMedia: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
  createdAt: string;
  updatedAt?: string;
}

// 🛠️ API Utility Functions
class APIService {
  private tableId: string | null = null;

  // HTTP Request Wrapper
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...API_CONFIG.headers,
          ...options.headers
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`API Request failed: ${endpoint}`, error);
      throw error;
    }
  }

  // 🔧 Tablo ID'sini Al veya Oluştur
  private async ensureTable(): Promise<string> {
    if (this.tableId) return this.tableId;

    try {
      // Mevcut tabloları kontrol et
      const response = await this.request<any>(`/tables/project/${API_CONFIG.projectId}`);
      const magazaTable = response.data?.tables?.find((table: any) => table.name === 'magazalar');

      if (magazaTable) {
        this.tableId = magazaTable.id;
        return this.tableId;
      }

      // Tablo yoksa oluştur
      const createResponse = await this.request<any>(`/tables/project/${API_CONFIG.projectId}`, {
        method: 'POST',
        body: JSON.stringify({
          name: 'magazalar',
          description: 'E-ticaret mağaza bilgileri tablosu'
        })
      });

      this.tableId = createResponse.data?.table?.id;
      if (!this.tableId) {
        throw new Error('Tablo oluşturulamadı');
      }

      return this.tableId;
    } catch (error) {
      console.error('Tablo oluşturma hatası:', error);
      throw new Error('Veritabanı bağlantısı kurulamadı');
    }
  }

  // 🆔 Unique ID Oluştur
  async generateId(): Promise<string> {
    try {
      const response = await this.request<any>('/admin/generate-id?prefix=magaza&count=1');
      return response.data?.generated_ids?.[0] || this.fallbackId();
    } catch (error) {
      console.warn('API ID generation failed, using fallback:', error);
      return this.fallbackId();
    }
  }

  private fallbackId(): string {
    return `magaza_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // 📊 Tüm Mağazaları Getir
  async getMagazalar(): Promise<MagazaData[]> {
    try {
      const tableId = await this.ensureTable();
      const response = await this.request<any>(`/data/table/${tableId}`);
      
      const rows = response.data?.rows || [];
      return rows.map((row: any) => this.transformFromAPI(row));
    } catch (error) {
      console.error('Mağazalar getirilemedi:', error);
      // Fallback: localStorage'dan yükle
      const backup = this.getLocalStorageBackup();
      if (backup.length > 0) {
        console.warn('API hatası, localStorage backup kullanılıyor');
        return backup;
      }
      throw error;
    }
  }

  // ➕ Yeni Mağaza Oluştur
  async createMagaza(data: Omit<MagazaData, 'id' | 'createdAt' | 'updatedAt'>): Promise<MagazaData> {
    try {
      const tableId = await this.ensureTable();
      const id = await this.generateId();

      const apiData = this.transformToAPI({
        ...data,
        id,
        createdAt: new Date().toISOString()
      });

      const response = await this.request<any>(`/data/table/${tableId}/rows`, {
        method: 'POST',
        body: JSON.stringify(apiData)
      });

      const createdMagaza = this.transformFromAPI(response.data?.row || apiData);
      
      // Başarılı API kaydından sonra localStorage backup'ı güncelle
      this.updateLocalStorageBackup(createdMagaza, 'create');
      
      return createdMagaza;
    } catch (error) {
      console.error('Mağaza oluşturulamadı:', error);
      
      // Fallback: localStorage'a kaydet ve sync için işaretle
      const newMagaza: MagazaData = {
        ...data,
        id: this.fallbackId(),
        createdAt: new Date().toISOString(),
        status: 'pending'
      };
      
      this.saveForLaterSync(newMagaza);
      this.updateLocalStorageBackup(newMagaza, 'create');
      
      throw error;
    }
  }

  // 🔄 Mağaza Güncelle
  async updateMagaza(id: string, data: Partial<MagazaData>): Promise<MagazaData> {
    try {
      const tableId = await this.ensureTable();
      
      const apiData = this.transformToAPI({
        ...data,
        updatedAt: new Date().toISOString()
      });

      const response = await this.request<any>(`/data/table/${tableId}/rows/${id}`, {
        method: 'PUT',
        body: JSON.stringify(apiData)
      });

      const updatedMagaza = this.transformFromAPI(response.data?.row);
      
      // localStorage backup'ı güncelle
      this.updateLocalStorageBackup(updatedMagaza, 'update');
      
      return updatedMagaza;
    } catch (error) {
      console.error('Mağaza güncellenemedi:', error);
      throw error;
    }
  }

  // 🗑️ Mağaza Sil
  async deleteMagaza(id: string): Promise<void> {
    try {
      const tableId = await this.ensureTable();
      
      await this.request<any>(`/data/table/${tableId}/rows/${id}`, {
        method: 'DELETE'
      });

      // localStorage backup'tan da sil
      this.updateLocalStorageBackup({ id } as MagazaData, 'delete');
      
    } catch (error) {
      console.error('Mağaza silinemedi:', error);
      throw error;
    }
  }

  // 📊 Mağaza Durumu Güncelle (Convenience method)
  async updateMagazaStatus(id: string, status: MagazaData['status']): Promise<MagazaData> {
    return this.updateMagaza(id, { status });
  }

  // 🔄 API ↔ Frontend Data Transformation
  private transformToAPI(data: Partial<MagazaData>): any {
    return {
      id: data.id,
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      phone: data.phone,
      store_name: data.storeName,
      store_category: data.storeCategory,
      store_description: data.storeDescription,
      domain_type: data.domainType,
      domain_name: data.domainName,
      custom_domain: data.customDomain,
      city_id: data.cityId,
      city_name: data.cityName,
      district: data.district,
      address: data.address,
      postal_code: data.postalCode,
      selected_package: data.selectedPackage,
      status: data.status,
      instagram: data.socialMedia?.instagram,
      facebook: data.socialMedia?.facebook,
      twitter: data.socialMedia?.twitter,
      created_at: data.createdAt,
      updated_at: data.updatedAt
    };
  }

  private transformFromAPI(data: any): MagazaData {
    return {
      id: data.id,
      firstName: data.first_name || '',
      lastName: data.last_name || '',
      email: data.email || '',
      phone: data.phone || '',
      storeName: data.store_name || '',
      storeCategory: data.store_category || '',
      storeDescription: data.store_description || '',
      domainType: data.domain_type || 'subdomain',
      domainName: data.domain_name || '',
      customDomain: data.custom_domain || '',
      cityId: data.city_id || 0,
      cityName: data.city_name || '',
      district: data.district || '',
      address: data.address || '',
      postalCode: data.postal_code || '',
      selectedPackage: data.selected_package || 'basic',
      status: data.status || 'pending',
      socialMedia: {
        instagram: data.instagram || '',
        facebook: data.facebook || '',
        twitter: data.twitter || ''
      },
      createdAt: data.created_at || new Date().toISOString(),
      updatedAt: data.updated_at
    };
  }

  // 💾 LocalStorage Backup Management
  private getLocalStorageBackup(): MagazaData[] {
    try {
      const backup = localStorage.getItem('magazaListesi_api_backup') || 
                    localStorage.getItem('magazaListesi');
      return backup ? JSON.parse(backup) : [];
    } catch (error) {
      console.error('LocalStorage backup okuma hatası:', error);
      return [];
    }
  }

  private updateLocalStorageBackup(magaza: MagazaData, operation: 'create' | 'update' | 'delete') {
    try {
      const current = this.getLocalStorageBackup();
      
      let updated: MagazaData[];
      switch (operation) {
        case 'create':
          updated = [...current, magaza];
          break;
        case 'update':
          updated = current.map(m => m.id === magaza.id ? { ...m, ...magaza } : m);
          break;
        case 'delete':
          updated = current.filter(m => m.id !== magaza.id);
          break;
        default:
          updated = current;
      }
      
      localStorage.setItem('magazaListesi_api_backup', JSON.stringify(updated));
    } catch (error) {
      console.error('LocalStorage backup güncelleme hatası:', error);
    }
  }

  private saveForLaterSync(magaza: MagazaData) {
    try {
      const pending = localStorage.getItem('pending_sync_magazalar');
      const pendingList = pending ? JSON.parse(pending) : [];
      pendingList.push(magaza);
      localStorage.setItem('pending_sync_magazalar', JSON.stringify(pendingList));
    } catch (error) {
      console.error('Sync queue kaydetme hatası:', error);
    }
  }

  // 🔄 Offline Sync (Gelecek özellik)
  async syncPendingData(): Promise<void> {
    try {
      const pending = localStorage.getItem('pending_sync_magazalar');
      if (!pending) return;

      const pendingList: MagazaData[] = JSON.parse(pending);
      
      for (const magaza of pendingList) {
        try {
          await this.createMagaza(magaza);
        } catch (error) {
          console.error(`Sync hatası - Mağaza ID: ${magaza.id}`, error);
        }
      }
      
      localStorage.removeItem('pending_sync_magazalar');
    } catch (error) {
      console.error('Sync işlemi hatası:', error);
    }
  }

  // 📊 API Health Check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL.replace('/api/v1', '')}/health`);
      return response.ok;
    } catch (error) {
      console.error('Health check failed:', error);
      return false;
    }
  }
}

// 🌟 Singleton Instance
export const apiService = new APIService();

// 🎯 Export Types
export type { MagazaData };