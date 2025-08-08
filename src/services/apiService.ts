import { useTranslation } from "react-i18next";
// 🚀 HZM API Service - E-Ticaret Mağaza Sistemi
// API Integration Layer for HZM Database

const API_BASE_URL = process.env.NODE_ENV === 'production' ? 'https://hzmbackendveritabani-production.up.railway.app/api/v1' : 'https://hzmbackendveritabani-production.up.railway.app/api/v1'; // Her iki durumda da production kullan

// 🔐 Environment Variables - Hardcoded credential yasak (KURAL 17)
const API_CONFIG = {
  projectId: process.env.REACT_APP_HZM_PROJECT_ID,
  apiKey: process.env.REACT_APP_HZM_API_KEY,
  headers: {
    'X-API-Key': process.env.REACT_APP_HZM_API_KEY,
    'X-User-Email': process.env.REACT_APP_HZM_USER_EMAIL,
    'X-Project-Password': process.env.REACT_APP_HZM_PROJECT_PASSWORD,
    'Content-Type': 'application/json'
  }
};

// 🚨 Environment Variables Validation (KURAL 17)
const requiredEnvVars = ['REACT_APP_HZM_API_KEY', 'REACT_APP_HZM_USER_EMAIL', 'REACT_APP_HZM_PROJECT_PASSWORD', 'REACT_APP_HZM_PROJECT_ID'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);
if (missingVars.length > 0) {
  console.error('❌ Missing environment variables:', missingVars);
  throw new Error(`Environment variables eksik: ${missingVars.join(', ')}`);
}

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
          description: t("common.e_ticaret_mağaza_bilgileri_tablosu")
        })
      });
      this.tableId = createResponse.data?.table?.id;
      if (!this.tableId) {
        throw new Error(t("common.tablo_oluşturulamadı"));
      }
      return this.tableId;
    } catch (error) {
      console.error(t("common.tablo_oluşturma_hatası"), error);
      throw new Error(t("common.veritabanı_bağlantısı_kurulamadı"));
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

  // 📊 Tüm Mağazaları Getir (KURAL 18: API Hatası = Backend Düzeltmesi)
  async getMagazalar(): Promise<MagazaData[]> {
    try {
      const tableId = await this.ensureTable();
      const response = await this.request<any>(`/data/table/${tableId}`);
      const rows = response.data?.rows || [];
      return rows.map((row: any) => this.transformFromAPI(row));
    } catch (error) {
      console.error(t("common.kri_ti_k_api_hatasi_backend_düzeltmesi_gerekli"));
      console.error('❌ SORUN:', error);
      console.error(t("common.backend_de_düzelti_lmesi_gereken_api_connection_authentication"));

      // KURAL 18: Frontend workaround yasak - Backend düzeltmesi bekle
      throw new Error(t("common.api_servisi_çalışmıyor_backend_düzeltmesi_gerekli"));
    }
  }

  // ➕ Yeni Mağaza Oluştur (KURAL 18: API Hatası = Backend Düzeltmesi)
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
      return this.transformFromAPI(response.data?.row || apiData);
    } catch (error) {
      console.error(t("common.kri_ti_k_api_hatasi_mağaza_oluşturulamadı"));
      console.error('❌ SORUN:', error);
      console.error(t("common.backend_de_düzelti_lmesi_gereken_create_operation_table_structure"));

      // KURAL 18: Frontend workaround yasak - Backend düzeltmesi bekle
      throw new Error(t("common.mağaza_oluşturulamadı_backend_düzeltmesi_gerekli"));
    }
  }

  // 🔄 Mağaza Güncelle (KURAL 18: API Hatası = Backend Düzeltmesi)
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
      return this.transformFromAPI(response.data?.row);
    } catch (error) {
      console.error(t("common.kri_ti_k_api_hatasi_mağaza_güncellenemedi"));
      console.error('❌ SORUN:', error);
      console.error(t("common.backend_de_düzelti_lmesi_gereken_update_operation"));

      // KURAL 18: Frontend workaround yasak - Backend düzeltmesi bekle
      throw new Error(t("common.mağaza_güncellenemedi_backend_düzeltmesi_gerekli"));
    }
  }

  // 🗑️ Mağaza Sil (KURAL 18: API Hatası = Backend Düzeltmesi)
  async deleteMagaza(id: string): Promise<void> {
    try {
      const tableId = await this.ensureTable();
      await this.request<any>(`/data/table/${tableId}/rows/${id}`, {
        method: 'DELETE'
      });
    } catch (error) {
      console.error(t("common.kri_ti_k_api_hatasi_mağaza_silinemedi"));
      console.error('❌ SORUN:', error);
      console.error(t("common.backend_de_düzelti_lmesi_gereken_delete_operation"));

      // KURAL 18: Frontend workaround yasak - Backend düzeltmesi bekle
      throw new Error(t("common.mağaza_silinemedi_backend_düzeltmesi_gerekli"));
    }
  }

  // 📊 Mağaza Durumu Güncelle (Convenience method)
  async updateMagazaStatus(id: string, status: MagazaData['status']): Promise<MagazaData> {
    return this.updateMagaza(id, {
      status
    });
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

  // 🚫 LocalStorage Backup Kaldırıldı (KURAL 18: API Hatası = Backend Düzeltmesi)
  // Frontend workaround/fallback mekanizmaları yasak
  // API hatası durumunda backend düzeltmesi beklenir

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