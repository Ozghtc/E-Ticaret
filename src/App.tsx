import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import WhatsAppButton from './components/WhatsAppButton';

// Loading Component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
      <p className="text-gray-600">Yükleniyor...</p>
    </div>
  </div>
);

// Lazy load all components
const LandingPage = lazy(() => import('./components/LandingPage'));
const AdminLogin = lazy(() => import('./components/AdminLogin'));
const UnifiedDemo = lazy(() => import('./components/UnifiedDemo'));

// Admin modules - lazy loaded
const AdminDashboard = lazy(() => import('./modules/admin-panel/AdminDashboard'));
const Platform = lazy(() => import('./modules/platform/Platform'));
const KullaniciYonetimi = lazy(() => import('./modules/kullanici-yonetimi/KullaniciYonetimi'));
const MagazaPaneli = lazy(() => import('./modules/magaza-paneli/MagazaPaneli'));
const MagazaAcilisPaneli = lazy(() => import('./modules/magaza-acilis-paneli/MagazaAcilisPaneli'));
const SonKullaniciSitesi = lazy(() => import('./modules/son-kullanici-sitesi/SonKullaniciSitesi'));
const TemaSistemi = lazy(() => import('./modules/tema-sistemi/TemaSistemi'));
const Yetkilendirme = lazy(() => import('./modules/yetkilendirme/Yetkilendirme'));
const Raporlar = lazy(() => import('./modules/raporlar/Raporlar'));
const SistemTanimlamalari = lazy(() => import('./modules/sistem-tanimlamalari/SistemTanimlamalari'));
const UrunEkleme = lazy(() => import('./modules/urun-ekleme/UrunEkleme'));
const YeniUrunEkleme = lazy(() => import('./modules/urun-karti-ekleme/YeniUrunEkleme'));
const SEO = lazy(() => import('./modules/seo/SEO'));
const PaketTanimlama = lazy(() => import('./modules/paket-tanimlama/PaketTanimlama'));
const Iletisim = lazy(() => import('./modules/iletisim/Iletisim'));
const RestaurantDashboard = lazy(() => import('./modules/custom-systems/restaurant/RestaurantDashboard'));
const MagazaListesi = lazy(() => import('./modules/magaza-listesi/MagazaListesi'));
const TekstilModa = lazy(() => import('./modules/tekstil-moda/TekstilModa'));
const UrunListesi = lazy(() => import('./modules/tekstil-moda/UrunListesi'));

// Demo components - lazy loaded
const MegaStoreDemo = lazy(() => import('./components/MegaStoreDemo'));
const FashionStoreDemo = lazy(() => import('./components/FashionStoreDemo'));
const ModernMinimalDemo = lazy(() => import('./modules/platform/ModernMinimalDemo'));
const TechHubDemo = lazy(() => import('./modules/platform/TechHubDemo'));
const OrganicMarketDemo = lazy(() => import('./modules/platform/OrganicMarketDemo'));
const MagazaKayitForm = lazy(() => import('./components/MagazaKayitForm'));
const EnvironmentTest = lazy(() => import('./components/EnvironmentTest'));

// Product forms - lazy loaded
const TekstilUrunForm = lazy(() => import('./modules/urun-karti-ekleme/forms/TekstilUrunEkleme/TekstilUrunForm'));
const TeknolojUrunForm = lazy(() => import('./modules/urun-karti-ekleme/forms/TeknolojUrunForm'));
const GidaUrunForm = lazy(() => import('./modules/urun-karti-ekleme/forms/GidaUrunForm'));
const KozmetikUrunForm = lazy(() => import('./modules/urun-karti-ekleme/forms/KozmetikUrunForm'));
const MobilyaUrunForm = lazy(() => import('./modules/urun-karti-ekleme/forms/MobilyaUrunForm'));
const OyunUrunForm = lazy(() => import('./modules/urun-karti-ekleme/forms/OyunUrunForm'));
const AnneBebekUrunForm = lazy(() => import('./modules/urun-karti-ekleme/forms/AnneBebekUrunForm'));
const OtomotivUrunForm = lazy(() => import('./modules/urun-karti-ekleme/forms/OtomotivUrunForm'));
const SeyahatUrunForm = lazy(() => import('./modules/urun-karti-ekleme/forms/SeyahatUrunForm'));
const SporUrunForm = lazy(() => import('./modules/urun-karti-ekleme/forms/SporUrunForm'));
const KirtasiyeUrunForm = lazy(() => import('./modules/urun-karti-ekleme/forms/KirtasiyeUrunForm'));
const HayvanUrunForm = lazy(() => import('./modules/urun-karti-ekleme/forms/HayvanUrunForm'));
const TakiUrunForm = lazy(() => import('./modules/urun-karti-ekleme/forms/TakiUrunForm'));
const EvYasamUrunForm = lazy(() => import('./modules/urun-karti-ekleme/forms/EvYasamUrunForm'));

// Magaza sub-modules - lazy loaded
const UrunYonetimi = lazy(() => import('./modules/magaza-paneli/modules/UrunYonetimi'));
const Siparislerim = lazy(() => import('./modules/magaza-paneli/modules/Siparislerim'));
const Faturalarim = lazy(() => import('./modules/magaza-paneli/modules/Faturalarim'));
const MagazaBilgilerim = lazy(() => import('./modules/magaza-paneli/modules/MagazaBilgilerim'));
const DestekBildirimler = lazy(() => import('./modules/magaza-paneli/modules/DestekBildirimler'));

function App() {
  const { t } = useTranslation();

  return (
    <Router>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Main routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          
          {/* Admin modules */}
          <Route path="/admin/platform" element={<Platform />} />
          <Route path="/admin/kullanici-yonetimi" element={<KullaniciYonetimi />} />
          <Route path="/admin/magaza-paneli" element={<MagazaPaneli />} />
          <Route path="/admin/magaza-acilis-paneli" element={<MagazaAcilisPaneli />} />
          <Route path="/admin/son-kullanici-sitesi" element={<SonKullaniciSitesi />} />
          <Route path="/admin/tema-sistemi" element={<TemaSistemi />} />
          <Route path="/admin/yetkilendirme" element={<Yetkilendirme />} />
          <Route path="/admin/raporlar" element={<Raporlar />} />
          <Route path="/admin/sistem-tanimlamalari" element={<SistemTanimlamalari />} />
          <Route path="/admin/urun-ekleme" element={<UrunEkleme />} />
          <Route path="/admin/yeni-urun-ekleme" element={<YeniUrunEkleme />} />
          <Route path="/admin/seo" element={<SEO />} />
          <Route path="/admin/paket-tanimlama" element={<PaketTanimlama />} />
          <Route path="/admin/iletisim" element={<Iletisim />} />
          <Route path="/admin/restaurant" element={<RestaurantDashboard />} />
          <Route path="/admin/magaza-listesi" element={<MagazaListesi />} />
          
          {/* Product forms */}
          <Route path="/admin/urun-ekleme/tekstil" element={<TekstilUrunForm />} />
          <Route path="/admin/urun-ekleme/teknoloji" element={<TeknolojUrunForm />} />
          <Route path="/admin/urun-ekleme/gida" element={<GidaUrunForm />} />
          <Route path="/admin/urun-ekleme/kozmetik" element={<KozmetikUrunForm />} />
          <Route path="/admin/urun-ekleme/mobilya" element={<MobilyaUrunForm />} />
          <Route path="/admin/urun-ekleme/oyun" element={<OyunUrunForm />} />
          <Route path="/admin/urun-ekleme/anne-bebek" element={<AnneBebekUrunForm />} />
          <Route path="/admin/urun-ekleme/otomotiv" element={<OtomotivUrunForm />} />
          <Route path="/admin/urun-ekleme/seyahat" element={<SeyahatUrunForm />} />
          <Route path="/admin/urun-ekleme/spor" element={<SporUrunForm />} />
          <Route path="/admin/urun-ekleme/kirtasiye" element={<KirtasiyeUrunForm />} />
          <Route path="/admin/urun-ekleme/hayvan" element={<HayvanUrunForm />} />
          <Route path="/admin/urun-ekleme/taki" element={<TakiUrunForm />} />
          <Route path="/admin/urun-ekleme/ev-yasam" element={<EvYasamUrunForm />} />
          
          {/* Other routes */}
          <Route path="/magaza-basvuru" element={<MagazaAcilisPaneli />} />
          <Route path="/admin/tekstil-moda" element={<TekstilModa />} />
          <Route path="/admin/tekstil-moda/urun-listesi" element={<UrunListesi />} />
          
          {/* Demo routes */}
          <Route path="/demo/mega-store" element={<MegaStoreDemo />} />
          <Route path="/demo/fashion-store" element={<FashionStoreDemo />} />
          <Route path="/demo/modern-minimal" element={<ModernMinimalDemo />} />
          <Route path="/demo/tech-hub" element={<TechHubDemo />} />
          <Route path="/demo/organic-market" element={<OrganicMarketDemo />} />
          
          {/* Forms and tests */}
          <Route path="/magaza-kayit-form" element={<MagazaKayitForm />} />
          <Route path="/unified-demo" element={<UnifiedDemo />} />
          <Route path="/environment-test" element={<EnvironmentTest />} />
          
          {/* Mağaza sub-modules */}
          <Route path="/admin/urun-yonetimi" element={<UrunYonetimi />} />
          <Route path="/admin/siparislerim" element={<Siparislerim />} />
          <Route path="/admin/faturalarim" element={<Faturalarim />} />
          <Route path="/admin/magaza-bilgilerim" element={<MagazaBilgilerim />} />
          <Route path="/admin/destek-bildirimler" element={<DestekBildirimler />} />
          
          {/* Redirects */}
          <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        </Routes>
      </Suspense>
      
      {/* WhatsApp Button - Always visible */}
      <WhatsAppButton />
    </Router>
  );
}

export default App;
