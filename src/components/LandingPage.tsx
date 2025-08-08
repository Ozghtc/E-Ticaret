import React from 'react';
import { ShoppingCart, Zap, Palette, CreditCard, FileText, Menu, X, ChevronRight, Shield, Users, BarChart3 } from 'lucide-react';
import { useTranslation } from "react-i18next";
function LandingPage() {
  const {
    t
  } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  return <div className="min-h-screen bg-white relative">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-900">{t("common.altıntassoft")}</h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Ana Sayfa
                </a>
                <a href="#features" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">{t("common.özellikler")}</a>
                <a href="#packages" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Paketler
                </a>
                <a href="#support" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Destek
                </a>
                <a href="/admin/login" className="text-blue-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors">{t("common.giriş_yap")}</a>
                <a href="/magaza-basvuru" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">{t("common.mağaza_aç")}</a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-gray-700 hover:text-blue-600 inline-flex items-center justify-center p-2 rounded-md">
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Ana Sayfa
              </a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">{t("common.özellikler")}</a>
              <a href="#packages" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Paketler
              </a>
              <a href="#support" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Destek
              </a>
              <a href="/admin/login" className="text-blue-600 hover:text-blue-700 block px-3 py-2 text-base font-medium">{t("common.giriş_yap")}</a>
              <a href="/magaza-basvuru" className="bg-green-600 hover:bg-green-700 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors">{t("common.mağaza_aç")}</a>
            </div>
          </div>}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">{t("common.e_ticaret_yönetimini")}<span className="text-blue-600 block">{t("common.kolaylaştırın")}</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">{t("common.mağaza_açın_ürünlerinizi_yönetin_siparişlerinizi_takip_edin")}<br className="hidden sm:block" />
              Hepsi tek panelde!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="/admin/login" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center">
                <Shield className="mr-2" size={24} />{t("common.yönetici_girişi")}</a>
              <a href="/magaza-basvuru" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center">
                <ShoppingCart className="mr-2" size={24} />{t("common.mağaza_açın")}<ChevronRight className="ml-2" size={20} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-pulse" style={{
          animationDelay: '1s'
        }}></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-blue-300 rounded-full opacity-10 animate-pulse" style={{
          animationDelay: '2s'
        }}></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t("common.güçlü_özellikler")}</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">{t("common.modern_e_ticaret_çözümümüzle_işinizi_büyütün")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <Zap className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t("common.hızlı_panel")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("common.kullanıcı_dostu_arayüzle_saniyeler_içinde_ürün_ekleyin_ve_siparişlerinizi_yönetin")}</p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <Palette className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t("common.tema_seçimi")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("common.7_profesyonel_tema_arasından_seçim_yapın_ve_markanıza_uygun_vitrin_oluşturun")}</p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <CreditCard className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">{t("common.online_ödeme")}</h3>
              <p className="text-gray-600 leading-relaxed">{t("common.güvenli_ödeme_entegrasyonları_ile_müşterilerinizden_kolayca_tahsilat_yapın")}</p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors">
                <FileText className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Otomatik Fatura
              </h3>
              <p className="text-gray-600 leading-relaxed">{t("common.satışlarınız_için_otomatik_fatura_oluşturma_ve_muhasebe_entegrasyonu")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t("common.neden_altıntassoft")}</h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">{t("common.türkiye_nin_güvenilir_e_ticaret_platformu")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-blue-200" size={40} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">1000+</h3>
              <p className="text-blue-200">{t("common.aktif_mağaza")}</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <BarChart3 className="text-blue-200" size={40} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">99.9%</h3>
              <p className="text-blue-200">Uptime Garantisi</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="text-blue-200" size={40} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">7/24</h3>
              <p className="text-blue-200">Teknik Destek</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t("common.hemen_başlayın")}</h2>
          <p className="text-xl text-blue-100 mb-8">{t("common.e_ticaret_yolculuğunuza_bugün_başlayın_kurulum_ücretsiz")}</p>
          <a href="/magaza-basvuru" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg inline-flex items-center">
            <ShoppingCart className="mr-2" size={24} />{t("common.ücretsiz_mağaza_açın")}<ChevronRight className="ml-2" size={20} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">{t("common.altıntassoft")}</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">{t("common.türkiye_nin_güvenilir_e_ticaret_platformu_modern_teknoloji_ile_işinizi_büyütün")}</p>
              <p className="text-sm text-gray-500">{t("common.2025_altıntassoft_hzm_iş_birliği_ile")}</p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">{t("common.hızlı_linkler")}</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-blue-400 transition-colors">{t("common.özellikler")}</a></li>
                <li><a href="#packages" className="hover:text-blue-400 transition-colors">Paketler</a></li>
                <li><a href="#support" className="hover:text-blue-400 transition-colors">Destek</a></li>
                <li><a href="/admin/login" className="hover:text-blue-400 transition-colors">{t("common.giriş_yap")}</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Yasal</h4>
              <ul className="space-y-2">
                <li><a href="/iletisim" className="hover:text-blue-400 transition-colors">{t("common.i_letişim")}</a></li>
                <li><a href="/kvkk" className="hover:text-blue-400 transition-colors">KVKK</a></li>
                <li><a href="/kullanim-sartlari" className="hover:text-blue-400 transition-colors">{t("common.kullanım_şartları")}</a></li>
                <li><a href="/gizlilik" className="hover:text-blue-400 transition-colors">{t("common.gizlilik_politikası")}</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500">{t("common.tüm_hakları_saklıdır_bu_platform_hzm_teknoloji_iş_birliği_ile_geliştirilmiştir")}</p>
          </div>
        </div>
      </footer>
    </div>;
}
export default LandingPage;