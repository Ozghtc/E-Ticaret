import React from 'react';
import { 
  ShoppingCart, 
  Zap, 
  Palette, 
  CreditCard, 
  FileText,
  Menu,
  X,
  ChevronRight,
  Shield,
  Users,
  BarChart3
} from 'lucide-react';

function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-900">Altıntassoft</h1>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <a href="#" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Ana Sayfa
                </a>
                <a href="#features" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Özellikler
                </a>
                <a href="#packages" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Paketler
                </a>
                <a href="#support" className="text-gray-700 hover:text-blue-600 px-3 py-2 text-sm font-medium transition-colors">
                  Destek
                </a>
                <a href="/admin/login" className="text-blue-600 hover:text-blue-700 px-3 py-2 text-sm font-medium transition-colors">
                  Giriş Yap
                </a>
                <a href="/magaza-basvuru" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
                  Mağaza Aç
                </a>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-700 hover:text-blue-600 inline-flex items-center justify-center p-2 rounded-md"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-100">
              <a href="#" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Ana Sayfa
              </a>
              <a href="#features" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Özellikler
              </a>
              <a href="#packages" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Paketler
              </a>
              <a href="#support" className="text-gray-700 hover:text-blue-600 block px-3 py-2 text-base font-medium">
                Destek
              </a>
              <a href="/admin/login" className="text-blue-600 hover:text-blue-700 block px-3 py-2 text-base font-medium">
                Giriş Yap
              </a>
              <a href="/magaza-basvuru" className="bg-green-600 hover:bg-green-700 text-white block px-3 py-2 rounded-md text-base font-medium transition-colors">
                Mağaza Aç
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              E-Ticaret Yönetimini
              <span className="text-blue-600 block">Kolaylaştırın</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Mağaza açın, ürünlerinizi yönetin, siparişlerinizi takip edin. 
              <br className="hidden sm:block" />
              Hepsi tek panelde!
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/admin/login"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                <Shield className="mr-2" size={24} />
                Yönetici Girişi
              </a>
              <a
                href="/magaza-basvuru"
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center"
              >
                <ShoppingCart className="mr-2" size={24} />
                Mağaza Açın
                <ChevronRight className="ml-2" size={20} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-24 h-24 bg-green-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-blue-300 rounded-full opacity-10 animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Güçlü Özellikler
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Modern e-ticaret çözümümüzle işinizi büyütün
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-200 transition-colors">
                <Zap className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Hızlı Panel
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Kullanıcı dostu arayüzle saniyeler içinde ürün ekleyin ve siparişlerinizi yönetin.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="bg-purple-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-200 transition-colors">
                <Palette className="text-purple-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Tema Seçimi
              </h3>
              <p className="text-gray-600 leading-relaxed">
                7+ profesyonel tema arasından seçim yapın ve markanıza uygun vitrin oluşturun.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="bg-green-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-200 transition-colors">
                <CreditCard className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Online Ödeme
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Güvenli ödeme entegrasyonları ile müşterilerinizden kolayca tahsilat yapın.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow border border-gray-100 group">
              <div className="bg-orange-100 w-16 h-16 rounded-lg flex items-center justify-center mb-6 group-hover:bg-orange-200 transition-colors">
                <FileText className="text-orange-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Otomatik Fatura
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Satışlarınız için otomatik fatura oluşturma ve muhasebe entegrasyonu.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-blue-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Neden Altıntassoft?
            </h2>
            <p className="text-xl text-blue-200 max-w-2xl mx-auto">
              Türkiye'nin güvenilir e-ticaret platformu
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="text-blue-200" size={40} />
              </div>
              <h3 className="text-3xl font-bold text-white mb-2">1000+</h3>
              <p className="text-blue-200">Aktif Mağaza</p>
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Hemen Başlayın
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            E-ticaret yolculuğunuza bugün başlayın. Kurulum ücretsiz!
          </p>
          <a
            href="/magaza-basvuru"
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all transform hover:scale-105 shadow-lg inline-flex items-center"
          >
            <ShoppingCart className="mr-2" size={24} />
            Ücretsiz Mağaza Açın
            <ChevronRight className="ml-2" size={20} />
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">Altıntassoft</h3>
              <p className="text-gray-400 mb-4 leading-relaxed">
                Türkiye'nin güvenilir e-ticaret platformu. 
                Modern teknoloji ile işinizi büyütün.
              </p>
              <p className="text-sm text-gray-500">
                © 2025 Altıntassoft – HZM iş birliği ile
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Hızlı Linkler</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-blue-400 transition-colors">Özellikler</a></li>
                <li><a href="#packages" className="hover:text-blue-400 transition-colors">Paketler</a></li>
                <li><a href="#support" className="hover:text-blue-400 transition-colors">Destek</a></li>
                <li><a href="/admin/login" className="hover:text-blue-400 transition-colors">Giriş Yap</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Yasal</h4>
              <ul className="space-y-2">
                <li><a href="/iletisim" className="hover:text-blue-400 transition-colors">İletişim</a></li>
                <li><a href="/kvkk" className="hover:text-blue-400 transition-colors">KVKK</a></li>
                <li><a href="/kullanim-sartlari" className="hover:text-blue-400 transition-colors">Kullanım Şartları</a></li>
                <li><a href="/gizlilik" className="hover:text-blue-400 transition-colors">Gizlilik Politikası</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-500">
              Tüm hakları saklıdır. Bu platform HZM teknoloji iş birliği ile geliştirilmiştir.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;