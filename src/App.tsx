import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AdminLogin from './components/AdminLogin';
import UnifiedDemo from './components/UnifiedDemo';
import WhatsAppButton from './components/WhatsAppButton';

// Import modules
import AdminDashboard from './modules/admin-panel/AdminDashboard';
import Platform from './modules/platform/Platform';
import KullaniciYonetimi from './modules/kullanici-yonetimi/KullaniciYonetimi';
import MagazaPaneli from './modules/magaza-paneli/MagazaPaneli';
import MagazaAcilisPaneli from './modules/magaza-acilis-paneli/MagazaAcilisPaneli';
import SonKullaniciSitesi from './modules/son-kullanici-sitesi/SonKullaniciSitesi';
import TemaSistemi from './modules/tema-sistemi/TemaSistemi';
import Yetkilendirme from './modules/yetkilendirme/Yetkilendirme';
import Raporlar from './modules/raporlar/Raporlar';
import SistemTanimlamalari from './modules/sistem-tanimlamalari/SistemTanimlamalari';
import UrunEkleme from './modules/urun-ekleme/UrunEkleme';
import YeniUrunEkleme from './modules/urun-karti-ekleme/YeniUrunEkleme';
import SEO from './modules/seo/SEO';
import MegaStoreDemo from './components/MegaStoreDemo';
import FashionStoreDemo from './components/FashionStoreDemo';
import ModernMinimalDemo from './modules/platform/ModernMinimalDemo';
import TechHubDemo from './modules/platform/TechHubDemo';
import OrganicMarketDemo from './modules/platform/OrganicMarketDemo';
import MagazaKayitForm from './components/MagazaKayitForm';
import TekstilUrunForm from './modules/urun-karti-ekleme/forms/TekstilUrunEkleme/TekstilUrunForm';
import TeknolojUrunForm from './modules/urun-karti-ekleme/forms/TeknolojUrunForm';
import GidaUrunForm from './modules/urun-karti-ekleme/forms/GidaUrunForm';
import KozmetikUrunForm from './modules/urun-karti-ekleme/forms/KozmetikUrunForm';
import MobilyaUrunForm from './modules/urun-karti-ekleme/forms/MobilyaUrunForm';
import OyunUrunForm from './modules/urun-karti-ekleme/forms/OyunUrunForm';
import AnneBebekUrunForm from './modules/urun-karti-ekleme/forms/AnneBebekUrunForm';
import OtomotivUrunForm from './modules/urun-karti-ekleme/forms/OtomotivUrunForm';
import SeyahatUrunForm from './modules/urun-karti-ekleme/forms/SeyahatUrunForm';
import SporUrunForm from './modules/urun-karti-ekleme/forms/SporUrunForm';
import KirtasiyeUrunForm from './modules/urun-karti-ekleme/forms/KirtasiyeUrunForm';
import HayvanUrunForm from './modules/urun-karti-ekleme/forms/HayvanUrunForm';
import TakiUrunForm from './modules/urun-karti-ekleme/forms/TakiUrunForm';
import EvYasamUrunForm from './modules/urun-karti-ekleme/forms/EvYasamUrunForm';

// Import Tekstil Moda modules
import TekstilModa from './modules/tekstil-moda/TekstilModa';
import UrunListesi from './modules/tekstil-moda/UrunListesi';
import EnvironmentTest from './components/EnvironmentTest';

// Import Mağaza sub-modules
import UrunYonetimi from './modules/magaza-paneli/modules/UrunYonetimi';
import Siparislerim from './modules/magaza-paneli/modules/Siparislerim';
import Faturalarim from './modules/magaza-paneli/modules/Faturalarim';
import MagazaBilgilerim from './modules/magaza-paneli/modules/MagazaBilgilerim';
import DestekBildirimler from './modules/magaza-paneli/modules/DestekBildirimler';
import MagazaListesi from './modules/magaza-listesi/MagazaListesi';
import PaketTanimlama from './modules/paket-tanimlama/PaketTanimlama';

function App() {
  return (
    <Router>
      <WhatsAppButton 
        phoneNumber="905555555555"
        message="Merhaba! E-ticaret sistemimiz hakkında bilgi almak ister misiniz?"
        theme="default"
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/platform" element={<Platform />} />
        <Route path="/admin/kullanici-yonetimi" element={<KullaniciYonetimi />} />
        <Route path="/admin/magaza-yonetimi" element={<MagazaPaneli />} />
        <Route path="/admin/magaza-acilis-paneli" element={<MagazaAcilisPaneli />} />
        <Route path="/admin/magaza-listesi" element={<MagazaListesi />} />
        <Route path="/admin/son-kullanici-sitesi" element={<SonKullaniciSitesi />} />
        <Route path="/admin/tema-sistemi" element={<TemaSistemi />} />
        <Route path="/admin/yetkilendirme" element={<Yetkilendirme />} />
        <Route path="/admin/raporlar" element={<Raporlar />} />
        <Route path="/admin/sistem-tanimlamalari" element={<SistemTanimlamalari />} />
        <Route path="/admin/urun-ekleme" element={<UrunEkleme />} />
        <Route path="/admin/urun-ekleme-yeni" element={<YeniUrunEkleme />} />
        <Route path="/admin/seo" element={<SEO />} />
        <Route path="/admin/paket-tanimlama" element={<PaketTanimlama />} />
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
        <Route path="/magaza-basvuru" element={<MagazaAcilisPaneli />} />
        <Route path="/admin/tekstil-moda" element={<TekstilModa />} />
        <Route path="/admin/tekstil-moda/urun-listesi" element={<UrunListesi />} />
        <Route path="/demo/mega-store" element={<MegaStoreDemo />} />
        <Route path="/demo/fashion-store" element={<FashionStoreDemo />} />
        <Route path="/demo/modern-minimal" element={<ModernMinimalDemo />} />
        <Route path="/demo/tech-hub" element={<TechHubDemo />} />
        <Route path="/demo/organic-market" element={<OrganicMarketDemo />} />
        <Route path="/magaza-kayit-form" element={<MagazaKayitForm />} />
        <Route path="/unified-demo" element={<UnifiedDemo />} />
        <Route path="/environment-test" element={<EnvironmentTest />} />
        
        {/* Mağaza sub-modules */}
        <Route path="/admin/urun-yonetimi" element={<UrunYonetimi />} />
        <Route path="/admin/siparislerim" element={<Siparislerim />} />
        <Route path="/admin/faturalarim" element={<Faturalarim />} />
        <Route path="/admin/magaza-bilgilerim" element={<MagazaBilgilerim />} />
        <Route path="/admin/destek-bildirimler" element={<DestekBildirimler />} />
        
        <Route path="/admin/*" element={<Navigate to="/admin" replace />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;