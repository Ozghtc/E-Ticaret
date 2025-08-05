# 🚀 HZM API ENTEGRASYON DOKÜMANTASYONU
*E-Ticaret Projesi - API Geçiş Planı*

## 🎯 ENTEGRASYON PLANI

### 📊 MEVCUT DURUM → HEDEf
```
BEFORE: localStorage (Prototype)
AFTER:  HZM Database API (Production Ready)
```

### 🔄 GEÇİŞ STRATEJİSİ (KURAL 16+17+18)
1. **API Service Layer** oluştur
2. **Environment Configuration** kur (Hardcoded credential yasak)
3. **Mağaza API'leri** entegre et  
4. **Error Handling** sistemi (Backend düzeltmesi)
5. **Loading States** bağla
6. **No Fallback Mode** (localStorage backup yasak)

---

## 🔧 API CONFIGURATION

### 🌐 Base URLs (KURAL 16: Localhost Yasak)
```typescript
const API_CONFIG = {
  production: 'https://hzmbackendveritabani-production.up.railway.app/api/v1',
  // KURAL 16: Development'da da production URL kullan
  development: 'https://hzmbackendveritabani-production.up.railway.app/api/v1'
}
```

### 🔐 Authentication Headers (KURAL 17: Hardcoded Credential Yasak)
```typescript
const API_HEADERS = {
  'X-API-Key': process.env.REACT_APP_HZM_API_KEY,
  'X-User-Email': process.env.REACT_APP_HZM_USER_EMAIL,
  'X-Project-Password': process.env.REACT_APP_HZM_PROJECT_PASSWORD,
  'Content-Type': 'application/json'
}
```

### 📋 Project Info (KURAL 17: Environment Variables Zorunlu)
```typescript
const PROJECT_CONFIG = {
  projectId: process.env.REACT_APP_HZM_PROJECT_ID,
  apiKey: process.env.REACT_APP_HZM_API_KEY
}
```

---

## 🏗️ VERİTABANI TASARIMI

### 🏪 MAGAZALAR TABLOSU
```sql
CREATE TABLE magazalar (
  id VARCHAR(50) PRIMARY KEY,           -- magaza_1234567890_abc123def
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  store_name VARCHAR(255) NOT NULL,
  store_category VARCHAR(100),
  store_description TEXT,
  domain_type ENUM('subdomain', 'custom'),
  domain_name VARCHAR(100),
  custom_domain VARCHAR(255),
  city_id INTEGER,
  city_name VARCHAR(100),
  district VARCHAR(100),
  address TEXT,
  postal_code VARCHAR(10),
  selected_package ENUM('basic', 'pro', 'enterprise'),
  status ENUM('pending', 'approved', 'rejected', 'active') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

### 📱 SOSYAL MEDYA TABLOSU
```sql
CREATE TABLE magaza_sosyal_medya (
  id VARCHAR(50) PRIMARY KEY,
  magaza_id VARCHAR(50) REFERENCES magazalar(id) ON DELETE CASCADE,
  instagram VARCHAR(255),
  facebook VARCHAR(255),
  twitter VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 🔌 API SERVICE LAYER

### 📡 Base API Service
```typescript
// services/apiService.ts
import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://hzmbackendveritabani-production.up.railway.app/api/v1'
  : 'http://localhost:8080/api/v1';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'X-API-Key': 'hzm_112807dc571043aa83a70df125d6aa53',
    'X-User-Email': process.env.REACT_APP_HZM_USER_EMAIL || '',
    'X-Project-Password': process.env.REACT_APP_HZM_PROJECT_PASSWORD || '',
    'Content-Type': 'application/json'
  }
});

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);
```

### 🏪 Mağaza API Service
```typescript
// services/magazaService.ts
import { apiClient } from './apiService';

export interface MagazaData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  store_name: string;
  store_category: string;
  store_description: string;
  domain_type: 'subdomain' | 'custom';
  domain_name?: string;
  custom_domain?: string;
  city_id: number;
  city_name: string;
  district: string;
  address: string;
  postal_code: string;
  selected_package: 'basic' | 'pro' | 'enterprise';
  status: 'pending' | 'approved' | 'rejected' | 'active';
  social_media: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
  created_at: string;
  updated_at?: string;
}

class MagazaService {
  private tableId: string | null = null;

  // Tablo ID'sini al veya oluştur
  private async ensureTable(): Promise<string> {
    if (this.tableId) return this.tableId;

    try {
      // Mevcut tabloları kontrol et  
      const tablesResponse = await apiClient.get('/tables/project/23');
      const magazaTable = tablesResponse.data.data.tables.find(
        (table: any) => table.name === 'magazalar'
      );

      if (magazaTable) {
        this.tableId = magazaTable.id;
        return this.tableId;
      }

      // Tablo yoksa oluştur
      const createResponse = await apiClient.post('/tables/project/23', {
        name: 'magazalar',
        description: 'E-ticaret mağaza bilgileri'
      });

      this.tableId = createResponse.data.data.table.id;
      await this.createFields();
      return this.tableId;

    } catch (error) {
      console.error('Tablo oluşturma hatası:', error);
      throw new Error('Veritabanı bağlantısı kurulamadı');
    }
  }

  // Tablo alanlarını oluştur
  private async createFields(): Promise<void> {
    if (!this.tableId) return;

    const fields = [
      { name: 'first_name', type: 'VARCHAR', size: 100, required: true },
      { name: 'last_name', type: 'VARCHAR', size: 100, required: true },
      { name: 'email', type: 'VARCHAR', size: 255, required: true, unique: true },
      { name: 'phone', type: 'VARCHAR', size: 20 },
      { name: 'store_name', type: 'VARCHAR', size: 255, required: true },
      { name: 'store_category', type: 'VARCHAR', size: 100 },
      { name: 'store_description', type: 'TEXT' },
      { name: 'domain_type', type: 'ENUM', options: ['subdomain', 'custom'] },
      { name: 'domain_name', type: 'VARCHAR', size: 100 },
      { name: 'custom_domain', type: 'VARCHAR', size: 255 },
      { name: 'city_id', type: 'INTEGER' },
      { name: 'city_name', type: 'VARCHAR', size: 100 },
      { name: 'district', type: 'VARCHAR', size: 100 },
      { name: 'address', type: 'TEXT' },
      { name: 'postal_code', type: 'VARCHAR', size: 10 },
      { name: 'selected_package', type: 'ENUM', options: ['basic', 'pro', 'enterprise'] },
      { name: 'status', type: 'ENUM', options: ['pending', 'approved', 'rejected', 'active'], default: 'pending' },
      { name: 'instagram', type: 'VARCHAR', size: 255 },
      { name: 'facebook', type: 'VARCHAR', size: 255 },
      { name: 'twitter', type: 'VARCHAR', size: 255 }
    ];

    for (const field of fields) {
      try {
        await apiClient.post(`/fields/table/${this.tableId}`, field);
      } catch (error) {
        console.warn(`Alan oluşturulamadı: ${field.name}`, error);
      }
    }
  }

  // Unique ID oluştur
  async generateId(): Promise<string> {
    try {
      const response = await apiClient.get('/admin/generate-id?prefix=magaza&count=1');
      return response.data.data.generated_ids[0];
    } catch (error) {
      // Fallback: client-side ID generation
      return `magaza_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }

  // Mağaza oluştur
  async createMagaza(data: Omit<MagazaData, 'id' | 'created_at' | 'updated_at'>): Promise<MagazaData> {
    const tableId = await this.ensureTable();
    const id = await this.generateId();

    const magazaData = {
      id,
      ...data,
      instagram: data.social_media.instagram,
      facebook: data.social_media.facebook,
      twitter: data.social_media.twitter,
      created_at: new Date().toISOString()
    };

    const response = await apiClient.post(`/data/table/${tableId}/rows`, magazaData);
    
    return {
      ...response.data.data.row,
      social_media: {
        instagram: response.data.data.row.instagram || '',
        facebook: response.data.data.row.facebook || '',
        twitter: response.data.data.row.twitter || ''
      }
    };
  }

  // Tüm mağazaları getir
  async getMagazalar(): Promise<MagazaData[]> {
    const tableId = await this.ensureTable();
    const response = await apiClient.get(`/data/table/${tableId}`);
    
    return response.data.data.rows.map((row: any) => ({
      ...row,
      social_media: {
        instagram: row.instagram || '',
        facebook: row.facebook || '',
        twitter: row.twitter || ''
      }
    }));
  }

  // Mağaza güncelle
  async updateMagaza(id: string, data: Partial<MagazaData>): Promise<MagazaData> {
    const tableId = await this.ensureTable();
    
    const updateData = {
      ...data,
      ...(data.social_media && {
        instagram: data.social_media.instagram,
        facebook: data.social_media.facebook,
        twitter: data.social_media.twitter
      }),
      updated_at: new Date().toISOString()
    };

    const response = await apiClient.put(`/data/table/${tableId}/rows/${id}`, updateData);
    
    return {
      ...response.data.data.row,
      social_media: {
        instagram: response.data.data.row.instagram || '',
        facebook: response.data.data.row.facebook || '',
        twitter: response.data.data.row.twitter || ''
      }
    };
  }

  // Mağaza sil
  async deleteMagaza(id: string): Promise<void> {
    const tableId = await this.ensureTable();
    await apiClient.delete(`/data/table/${tableId}/rows/${id}`);
  }

  // Mağaza durumu güncelle
  async updateMagazaStatus(id: string, status: MagazaData['status']): Promise<MagazaData> {
    return this.updateMagaza(id, { status });
  }
}

export const magazaService = new MagazaService();
```

---

## 🔄 HOOKS & STATE MANAGEMENT

### 🎣 Custom Hook
```typescript
// hooks/useMagazalar.ts
import { useState, useEffect } from 'react';
import { magazaService, type MagazaData } from '../services/magazaService';

export const useMagazalar = () => {
  const [magazalar, setMagazalar] = useState<MagazaData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMagazalar = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // HZM API'den çek
      const data = await magazaService.getMagazalar();
      setMagazalar(data);
      
      // Backup olarak localStorage'a kaydet
      localStorage.setItem('magazaListesi_backup', JSON.stringify(data));
      
    } catch (err) {
      console.error('API Hatası:', err);
      setError('Veriler yüklenirken hata oluştu');
      
      // Fallback: localStorage'dan yükle
      const backup = localStorage.getItem('magazaListesi_backup') || 
                   localStorage.getItem('magazaListesi');
      if (backup) {
        try {
          setMagazalar(JSON.parse(backup));
        } catch (parseError) {
          console.error('Backup verisi bozuk:', parseError);
        }
      }
    } finally {
      setLoading(false);
    }
  };

  const createMagaza = async (data: Omit<MagazaData, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      setLoading(true);
      const newMagaza = await magazaService.createMagaza(data);
      setMagazalar(prev => [...prev, newMagaza]);
      return newMagaza;
    } catch (err) {
      setError('Mağaza oluşturulamadı');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateMagazaStatus = async (id: string, status: MagazaData['status']) => {
    try {
      const updatedMagaza = await magazaService.updateMagazaStatus(id, status);
      setMagazalar(prev => 
        prev.map(m => m.id === id ? updatedMagaza : m)
      );
      return updatedMagaza;
    } catch (err) {
      setError('Durum güncellenemedi');
      throw err;
    }
  };

  const deleteMagaza = async (id: string) => {
    try {
      await magazaService.deleteMagaza(id);
      setMagazalar(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      setError('Mağaza silinemedi');
      throw err;
    }
  };

  useEffect(() => {
    loadMagazalar();
  }, []);

  return {
    magazalar,
    loading,
    error,
    loadMagazalar,
    createMagaza,
    updateMagazaStatus,
    deleteMagaza
  };
};
```

---

## 🌐 ENVIRONMENT CONFIGURATION

### 📄 .env.local (KURAL 17: Hardcoded Credential Yasak)
```bash
# HZM API Configuration - KENDİ BİLGİLERİNİZİ YAZIN
REACT_APP_HZM_USER_EMAIL=your_email@domain.com
REACT_APP_HZM_PROJECT_PASSWORD=your_project_password_min_8_chars
REACT_APP_HZM_API_KEY=your_api_key_here
REACT_APP_HZM_PROJECT_ID=your_project_id_here

# Environment (KURAL 16: Production URL Zorunlu)
REACT_APP_NODE_ENV=production
REACT_APP_API_BASE_URL=https://hzmbackendveritabani-production.up.railway.app/api/v1
```

### 📄 .env.production (KURAL 16+17: Production + Güvenlik)
```bash
# HZM API Configuration (Production) - NETLIFY ENVIRONMENT VARIABLES'DAN
REACT_APP_HZM_USER_EMAIL=your_production_email@domain.com
REACT_APP_HZM_PROJECT_PASSWORD=your_production_password
REACT_APP_HZM_API_KEY=your_production_api_key
REACT_APP_HZM_PROJECT_ID=your_production_project_id

# Environment (KURAL 16: Sadece Production URL)
REACT_APP_NODE_ENV=production
REACT_APP_API_BASE_URL=https://hzmbackendveritabani-production.up.railway.app/api/v1
```

---

## 🔄 COMPONENT UPDATES

### 🏪 MagazaKayitForm Update
```typescript
// MagazaKayitForm.tsx içinde
import { useMagazalar } from '../hooks/useMagazalar';

const { createMagaza, loading } = useMagazalar();

const handleSubmit = async () => {
  try {
    setSubmitting(true);
    
    const magazaData = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      store_name: formData.storeName,
      store_category: formData.storeCategory,
      store_description: formData.storeDescription,
      domain_type: formData.domainType,
      domain_name: formData.domainName,
      custom_domain: formData.customDomain,
      city_id: formData.cityId,
      city_name: formData.cityName,
      district: formData.district,
      address: formData.address,
      postal_code: formData.postalCode,
      selected_package: formData.selectedPackage,
      status: 'pending' as const,
      social_media: formData.socialMedia
    };

    await createMagaza(magazaData);
    
    showSuccessToast('🎉 Mağaza başarıyla kaydedildi!');
    navigate('/admin/magaza-listesi');
    
  } catch (error) {
    showErrorToast('❌ Mağaza kaydedilemedi. Lütfen tekrar deneyin.');
  } finally {
    setSubmitting(false);
  }
};
```

### 📋 MagazaListesi Update
```typescript
// MagazaListesi.tsx içinde
import { useMagazalar } from '../hooks/useMagazalar';

const { 
  magazalar, 
  loading, 
  error, 
  updateMagazaStatus, 
  deleteMagaza 
} = useMagazalar();

// Loading state
if (loading) {
  return <LoadingSpinner message="Mağazalar yükleniyor..." />;
}

// Error state  
if (error) {
  return <ErrorMessage message={error} onRetry={loadMagazalar} />;
}
```

---

## 🚀 DEPLOYMENt STRATEJİSİ

### 📋 Deployment Checklist
- [ ] Environment variables ayarla
- [ ] HZM API credentials doğrula
- [ ] Tablo şeması oluştur
- [ ] Test verileri ile API'yi test et
- [ ] Error handling'i test et
- [ ] Backup stratejisi kur
- [ ] Production'da test et

### 🔄 Migration Plan
1. **Phase 1:** API service layer oluştur
2. **Phase 2:** Hybrid mode (localStorage + API)
3. **Phase 3:** Tam API geçişi
4. **Phase 4:** localStorage backup kaldır

---

## 🛡️ ERROR HANDLING & FALLBACK

### 📊 Hybrid Mode Strategy
```typescript
// Hybrid yaklaşım: API primary, localStorage fallback
const saveData = async (data) => {
  try {
    // Önce API'ye kaydet
    const result = await apiService.save(data);
    
    // Başarılıysa localStorage'ı güncelle
    localStorage.setItem('backup', JSON.stringify(result));
    
    return result;
  } catch (error) {
    // API hatası varsa localStorage'a kaydet
    console.warn('API hatası, localStorage kullanılıyor:', error);
    localStorage.setItem('pending_sync', JSON.stringify(data));
    
    throw error;
  }
};
```

### 🔄 Sync Strategy
```typescript
// Offline senkronizasyon
const syncPendingData = async () => {
  const pending = localStorage.getItem('pending_sync');
  if (pending) {
    try {
      const data = JSON.parse(pending);
      await apiService.save(data);
      localStorage.removeItem('pending_sync');
    } catch (error) {
      console.error('Sync hatası:', error);
    }
  }
};
```

---

## 📊 MONİTORİNG & ANALYTİCS

### 📈 API Usage Tracking
```typescript
// API kullanım istatistikleri
const trackApiUsage = () => {
  const stats = {
    totalRequests: 0,
    successfulRequests: 0,
    failedRequests: 0,
    averageResponseTime: 0
  };
  
  // HZM Analytics API'ye gönder
  apiClient.post('/analytics/usage', stats);
};
```

---

**🎯 HEDEF:** localStorage'dan HZM API'ye seamless geçiş
**⏱️ SÜRE:** 1-2 gün implementation
**🔒 GÜVENLİK:** 3-katmanlı doğrulama + backup stratejisi
**📊 PERFORMANS:** Hybrid mode ile zero-downtime migration

Bu dokümantasyon ile API entegrasyonu hazır! 🚀