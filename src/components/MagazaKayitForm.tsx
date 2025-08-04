import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  User, 
  Store, 
  MapPin, 
  CreditCard,
  Check,
  ChevronRight,
  Globe,
  Link
} from 'lucide-react';
import IlSelector from './IlSelector';

function MagazaKayitForm() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Kişisel Bilgiler
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Mağaza Bilgileri
    storeName: '',
    storeCategory: '',
    storeDescription: '',
    
    // Domain Bilgileri
    domainName: '',
    domainType: 'subdomain', // 'subdomain' veya 'custom'
    customDomain: '',
    socialMedia: {
      instagram: '',
      facebook: '',
      twitter: ''
    },
    
    // Adres Bilgileri
    address: '',
    cityId: 0, // İl ID'si
    cityName: '', // İl adı
    district: '', // İlçe adı (şimdilik text, sonra dropdown olacak)
    postalCode: '',
    
    // Paket Seçimi
    selectedPackage: ''
  });

  const steps = [
    { id: 1, title: 'Kişisel Bilgiler', icon: User },
    { id: 2, title: 'Mağaza Bilgileri', icon: Store },
    { id: 3, title: 'Domain Bilgileri', icon: Globe },
    { id: 4, title: 'Adres Bilgileri', icon: MapPin },
    { id: 5, title: 'Paket Seçimi', icon: CreditCard }
  ];

  const packages = [
    {
      id: 'basic',
      name: 'Temel Paket',
      price: '99',
      features: ['100 Ürün', 'Temel Tema', 'E-posta Desteği'],
      color: 'bg-blue-500'
    },
    {
      id: 'pro',
      name: 'Profesyonel Paket',
      price: '199',
      features: ['500 Ürün', 'Premium Temalar', 'Öncelikli Destek', 'Analitik'],
      color: 'bg-purple-500',
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Kurumsal Paket',
      price: '399',
      features: ['Sınırsız Ürün', 'Özel Tema', '7/24 Destek', 'API Erişimi'],
      color: 'bg-green-500'
    }
  ];

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith('socialMedia.')) {
      const socialField = field.split('.')[1];
      setFormData(prev => ({
        ...prev,
        socialMedia: {
          ...prev.socialMedia,
          [socialField]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  // İl değişimi için özel handler
  const handleIlChange = (ilId: number, ilName: string) => {
    setFormData(prev => ({
      ...prev,
      cityId: ilId,
      cityName: ilName,
      district: '' // İl değiştiğinde ilçeyi sıfırla
    }));
  };

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    alert('🎉 Mağazanız başarıyla açıldı! Domain ve tüm ayarlar aktifleştirildi. Mağaza panelinize yönlendiriliyorsunuz...');
    navigate('/admin/magaza-yonetimi');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-8 h-8 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Kişisel Bilgileriniz</h2>
              <p className="text-gray-600">Mağaza sahibi olarak bilgilerinizi girin</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ad</label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Adınızı girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Soyad</label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Soyadınızı girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">E-posta</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="E-posta adresinizi girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Telefon</label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Telefon numaranızı girin"
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Store className="w-8 h-8 text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Mağaza Bilgileri</h2>
              <p className="text-gray-600">Mağazanız hakkında bilgi verin</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mağaza Adı</label>
                <input
                  type="text"
                  value={formData.storeName}
                  onChange={(e) => handleInputChange('storeName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Mağaza adınızı girin"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Kategori</label>
                <select
                  value={formData.storeCategory}
                  onChange={(e) => handleInputChange('storeCategory', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="">Kategori seçin</option>
                  <option value="tekstil-moda">👗 Tekstil & Moda</option>
                  <option value="teknoloji">💻 Teknoloji</option>
                  <option value="gida-icecek">🍎 Gıda & İçecek</option>
                  <option value="kozmetik-bakim">💄 Kozmetik & Bakım</option>
                  <option value="mobilya-dekorasyon">🏠 Mobilya & Dekorasyon</option>
                  <option value="ev-yasam">🏡 Ev & Yaşam</option>
                  <option value="oyun-konsol">🎮 Oyun & Konsol</option>
                  <option value="anne-bebek">👶 Anne & Bebek</option>
                  <option value="otomotiv">🚗 Otomotiv</option>
                  <option value="seyahat-outdoor">✈️ Seyahat & Outdoor</option>
                  <option value="spor-saglik">⚽ Spor & Sağlık</option>
                  <option value="kirtasiye-ofis">📚 Kırtasiye & Ofis</option>
                  <option value="evcil-hayvan">🐾 Evcil Hayvan</option>
                  <option value="taki-aksesuar">💎 Takı & Aksesuar</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mağaza Açıklaması</label>
                <textarea
                  value={formData.storeDescription}
                  onChange={(e) => handleInputChange('storeDescription', e.target.value)}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  placeholder="Mağazanızı kısaca tanıtın"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-cyan-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-cyan-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Domain & Online Varlık</h2>
              <p className="text-gray-600">Mağazanızın web adresi ve sosyal medya bilgilerini girin</p>
            </div>

            <div className="space-y-6">
              {/* Domain Seçimi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Domain Türü</label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.domainType === 'subdomain' 
                        ? 'border-cyan-500 bg-cyan-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleInputChange('domainType', 'subdomain')}
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-4 h-4 rounded-full border-2 border-cyan-500 mr-3 flex items-center justify-center">
                        {formData.domainType === 'subdomain' && (
                          <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900">Ücretsiz Alt Domain</h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">magaza-adınız.altintassoft.com</p>
                    <div className="mt-2 ml-7">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">ÜCRETSİZ</span>
                    </div>
                  </div>

                  <div
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.domainType === 'custom' 
                        ? 'border-cyan-500 bg-cyan-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleInputChange('domainType', 'custom')}
                  >
                    <div className="flex items-center mb-2">
                      <div className="w-4 h-4 rounded-full border-2 border-cyan-500 mr-3 flex items-center justify-center">
                        {formData.domainType === 'custom' && (
                          <div className="w-2 h-2 rounded-full bg-cyan-500"></div>
                        )}
                      </div>
                      <h3 className="font-semibold text-gray-900">Özel Domain</h3>
                    </div>
                    <p className="text-sm text-gray-600 ml-7">www.kendi-domain.com</p>
                    <div className="mt-2 ml-7">
                      <span className="bg-orange-100 text-orange-800 text-xs px-2 py-1 rounded-full">+50₺/AY</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alt Domain Adı */}
              {formData.domainType === 'subdomain' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Alt Domain Adı</label>
                  <div className="flex items-center">
                    <input
                      type="text"
                      value={formData.domainName}
                      onChange={(e) => handleInputChange('domainName', e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="magaza-adınız"
                    />
                    <div className="bg-gray-100 px-4 py-3 border border-l-0 border-gray-300 rounded-r-lg text-gray-600">
                      .altintassoft.com
                    </div>
                  </div>
                  <p className="text-sm text-gray-500 mt-1">Sadece küçük harf, rakam ve tire (-) kullanabilirsiniz</p>
                </div>
              )}

              {/* Özel Domain */}
              {formData.domainType === 'custom' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Özel Domain Adı</label>
                  <input
                    type="text"
                    value={formData.customDomain}
                    onChange={(e) => handleInputChange('customDomain', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                    placeholder="www.kendi-domain.com"
                  />
                  <p className="text-sm text-gray-500 mt-1">Domain'inizi başka firmadan satın almalısınız</p>
                </div>
              )}

              {/* Sosyal Medya */}
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <Link className="w-5 h-5 mr-2" />
                  Sosyal Medya Hesapları (Opsiyonel)
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">📷 Instagram</label>
                    <input
                      type="text"
                      value={formData.socialMedia.instagram}
                      onChange={(e) => handleInputChange('socialMedia.instagram', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="@kullanici_adi"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">👥 Facebook</label>
                    <input
                      type="text"
                      value={formData.socialMedia.facebook}
                      onChange={(e) => handleInputChange('socialMedia.facebook', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="facebook.com/sayfa-adi"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">🐦 Twitter</label>
                    <input
                      type="text"
                      value={formData.socialMedia.twitter}
                      onChange={(e) => handleInputChange('socialMedia.twitter', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500"
                      placeholder="@kullanici_adi"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Adres Bilgileri</h2>
              <p className="text-gray-600">İşletme adresinizi girin</p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Adres</label>
                <textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Tam adresinizi girin"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İl <span className="text-sm text-gray-500">(81 il)</span>
                  </label>
                  <IlSelector
                    value={formData.cityId || undefined}
                    onChange={handleIlChange}
                    placeholder="İl ara ve seç... (örn: İstanbul, Ankara)"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    İlçe {formData.cityName && <span className="text-sm text-gray-500">({formData.cityName} ilçeleri)</span>}
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    disabled={!formData.cityId}
                    className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
                      !formData.cityId ? 'bg-gray-100 cursor-not-allowed' : ''
                    }`}
                    placeholder={formData.cityId ? "İlçe adını yazın" : "Önce il seçiniz"}
                  />
                  {!formData.cityId && (
                    <p className="text-sm text-gray-400 mt-1">
                      ⚠️ İlçe seçimi için önce il seçmelisiniz
                    </p>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Posta Kodu</label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="Posta kodu"
                />
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <div className="bg-orange-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="w-8 h-8 text-orange-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Paket Seçimi</h2>
              <p className="text-gray-600">İhtiyacınıza uygun paketi seçin</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative border-2 rounded-xl p-6 cursor-pointer transition-all ${
                    formData.selectedPackage === pkg.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleInputChange('selectedPackage', pkg.id)}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                        Popüler
                      </span>
                    </div>
                  )}
                  
                  <div className="text-center">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-gray-900">₺{pkg.price}</span>
                      <span className="text-gray-600">/ay</span>
                    </div>
                    
                    <ul className="space-y-2 mb-6">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-600">
                          <Check size={16} className="text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    
                    {formData.selectedPackage === pkg.id && (
                      <div className="text-blue-600 font-medium">Seçildi ✓</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => navigate('/admin/magaza-acilis-paneli')}
                className="flex items-center text-white hover:text-blue-200 mr-6"
              >
                <ArrowLeft size={20} className="mr-2" />
                Ana Sayfaya Dön
              </button>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-bold text-white">Altıntassoft</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.id ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > step.id ? (
                    <Check size={20} />
                  ) : (
                    <span className="font-medium">{step.id}</span>
                  )}
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.id ? 'text-blue-600' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-4 ${
                    currentStep > step.id ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
            <button
              onClick={handlePrev}
              disabled={currentStep === 1}
              className={`px-6 py-3 rounded-lg font-medium ${
                currentStep === 1
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Geri
            </button>

            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 flex items-center"
              >
                İleri
                <ChevronRight size={20} className="ml-2" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 flex items-center"
              >
                🚀 Mağazayı Aç
                <Check size={20} className="ml-2" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MagazaKayitForm;