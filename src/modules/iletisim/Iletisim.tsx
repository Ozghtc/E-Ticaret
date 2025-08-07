import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  MessageCircle, 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Users, 
  Settings, 
  ArrowLeft,
  MessageSquare,
  Smartphone,
  Globe,
  FileText,
  Bell,
  Zap,
  Shield,
  Palette,
  Database,
  BarChart3,
  Edit3,
  Save,
  Trash2,
  Plus,
  Check,
  X,
  AlertCircle,
  Info
} from 'lucide-react';

function Iletisim() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [showSettings, setShowSettings] = useState(false);

  // WhatsApp Ayarları State
  const [whatsappSettings, setWhatsappSettings] = useState({
    enabled: true,
    phoneNumber: '905555555555',
    welcomeMessage: 'Merhaba! Size nasıl yardımcı olabilirim?',
    autoReply: true,
    autoReplyMessage: 'Mesajınız alındı. En kısa sürede size dönüş yapacağız.',
    businessHours: {
      enabled: true,
      start: '09:00',
      end: '18:00',
      timezone: 'Europe/Istanbul'
    }
  });

  // E-posta Ayarları State
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.gmail.com',
    smtpPort: 587,
    username: 'info@example.com',
    password: '',
    fromName: 'E-ticaret Destek',
    autoReply: true,
    signature: 'Saygılarımızla,\nE-ticaret Destek Ekibi'
  });

  // SMS Ayarları State
  const [smsSettings, setSmsSettings] = useState({
    provider: 'netgsm',
    username: '',
    password: '',
    sender: 'ETICARET',
    enabled: true,
    balance: 1000,
    costPerSms: 0.05
  });

  // Mesaj Şablonları State
  const [messageTemplates, setMessageTemplates] = useState([
    {
      id: 1,
      name: 'Sipariş Onayı',
      type: 'email',
      subject: 'Siparişiniz Alındı',
      content: 'Sayın {müşteri_adı},\n\nSiparişiniz başarıyla alındı. Sipariş numaranız: {sipariş_no}\n\nTeşekkürler.'
    },
    {
      id: 2,
      name: 'Kargo Takip',
      type: 'sms',
      content: 'Siparişiniz kargoya verildi. Takip numarası: {kargo_no}'
    },
    {
      id: 3,
      name: 'WhatsApp Hoşgeldin',
      type: 'whatsapp',
      content: 'Merhaba {müşteri_adı}! Size nasıl yardımcı olabilirim?'
    }
  ]);

  const handleSaveSettings = (type: string) => {
    // Burada API'ye kaydetme işlemi yapılacak
    console.log(`${type} ayarları kaydedildi`);
  };

  const tabs = [
    { id: 'overview', name: 'Genel Bakış', icon: BarChart3 },
    { id: 'whatsapp', name: 'WhatsApp Ayarları', icon: MessageSquare },
    { id: 'email', name: 'E-posta Ayarları', icon: Mail },
    { id: 'sms', name: 'SMS Ayarları', icon: Smartphone },
    { id: 'templates', name: 'Mesaj Şablonları', icon: FileText },
    { id: 'notifications', name: 'Bildirim Ayarları', icon: Bell },
    { id: 'integrations', name: 'Entegrasyonlar', icon: Globe }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                title="Geri Dön"
              >
                <ArrowLeft className="w-6 h-6 text-gray-600" />
              </button>
              <div className="p-3 bg-blue-100 rounded-xl">
                <MessageCircle className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">İletişim Yönetimi</h1>
                <p className="text-gray-600 mt-1">Müşteri iletişimi ve destek sistemi</p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              title="Ayarlar"
            >
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Toplam Mesaj</p>
                <p className="text-2xl font-bold text-gray-900">1,234</p>
              </div>
              <div className="p-3 bg-blue-100 rounded-xl">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Bekleyen</p>
                <p className="text-2xl font-bold text-orange-600">23</p>
              </div>
              <div className="p-3 bg-orange-100 rounded-xl">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Çözülen</p>
                <p className="text-2xl font-bold text-green-600">1,211</p>
              </div>
              <div className="p-3 bg-green-100 rounded-xl">
                <Users className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Ortalama Yanıt</p>
                <p className="text-2xl font-bold text-purple-600">2.3s</p>
              </div>
              <div className="p-3 bg-purple-100 rounded-xl">
                <Settings className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6" aria-label="Tabs">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 transition-colors ${
                      activeTab === tab.id
                        ? 'border-blue-500 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.name}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-green-500 rounded-lg">
                        <MessageSquare className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-green-800">WhatsApp</h3>
                    </div>
                    <p className="text-green-700 text-sm mb-3">Aktif - 24/7 Destek</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-green-600">Son 24 saat: 45 mesaj</span>
                      <button className="text-green-600 hover:text-green-700 text-sm font-medium">
                        Ayarlar →
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-blue-800">E-posta</h3>
                    </div>
                    <p className="text-blue-700 text-sm mb-3">Aktif - SMTP Yapılandırıldı</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-600">Son 24 saat: 12 e-posta</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                        Ayarlar →
                      </button>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-xl border border-purple-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-2 bg-purple-500 rounded-lg">
                        <Smartphone className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="font-semibold text-purple-800">SMS</h3>
                    </div>
                    <p className="text-purple-700 text-sm mb-3">Aktif - 1000 SMS Kredisi</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-purple-600">Son 24 saat: 8 SMS</span>
                      <button className="text-purple-600 hover:text-purple-700 text-sm font-medium">
                        Ayarlar →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Hızlı İşlemler</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-center">
                      <MessageSquare className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-700">WhatsApp Test</span>
                    </button>
                    <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-center">
                      <Mail className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-700">E-posta Test</span>
                    </button>
                    <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-center">
                      <Smartphone className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-700">SMS Test</span>
                    </button>
                    <button className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300 transition-colors text-center">
                      <FileText className="w-6 h-6 text-orange-600 mx-auto mb-2" />
                      <span className="text-sm font-medium text-gray-700">Şablon Ekle</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'whatsapp' && (
              <div className="space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <MessageSquare className="w-6 h-6 text-green-600" />
                    <h3 className="font-semibold text-green-800">WhatsApp Ayarları</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Telefon Numarası
                      </label>
                      <input
                        type="text"
                        value={whatsappSettings.phoneNumber}
                        onChange={(e) => setWhatsappSettings({...whatsappSettings, phoneNumber: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="905555555555"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Hoşgeldin Mesajı
                      </label>
                      <input
                        type="text"
                        value={whatsappSettings.welcomeMessage}
                        onChange={(e) => setWhatsappSettings({...whatsappSettings, welcomeMessage: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                        placeholder="Merhaba! Size nasıl yardımcı olabilirim?"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={whatsappSettings.autoReply}
                        onChange={(e) => setWhatsappSettings({...whatsappSettings, autoReply: e.target.checked})}
                        className="rounded text-green-600 focus:ring-green-500"
                      />
                      <span className="text-sm font-medium text-gray-700">Otomatik Yanıt Aktif</span>
                    </label>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => handleSaveSettings('whatsapp')}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Kaydet</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'email' && (
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Mail className="w-6 h-6 text-blue-600" />
                    <h3 className="font-semibold text-blue-800">E-posta Ayarları</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Sunucu
                      </label>
                      <input
                        type="text"
                        value={emailSettings.smtpServer}
                        onChange={(e) => setEmailSettings({...emailSettings, smtpServer: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="smtp.gmail.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMTP Port
                      </label>
                      <input
                        type="number"
                        value={emailSettings.smtpPort}
                        onChange={(e) => setEmailSettings({...emailSettings, smtpPort: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="587"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        E-posta Adresi
                      </label>
                      <input
                        type="email"
                        value={emailSettings.username}
                        onChange={(e) => setEmailSettings({...emailSettings, username: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="info@example.com"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Şifre
                      </label>
                      <input
                        type="password"
                        value={emailSettings.password}
                        onChange={(e) => setEmailSettings({...emailSettings, password: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => handleSaveSettings('email')}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Kaydet</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'sms' && (
              <div className="space-y-6">
                <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Smartphone className="w-6 h-6 text-purple-600" />
                    <h3 className="font-semibold text-purple-800">SMS Ayarları</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        SMS Sağlayıcısı
                      </label>
                      <select
                        value={smsSettings.provider}
                        onChange={(e) => setSmsSettings({...smsSettings, provider: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      >
                        <option value="netgsm">NetGSM</option>
                        <option value="twilio">Twilio</option>
                        <option value="africastalking">Africa's Talking</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Gönderici Adı
                      </label>
                      <input
                        type="text"
                        value={smsSettings.sender}
                        onChange={(e) => setSmsSettings({...smsSettings, sender: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="ETICARET"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Kullanıcı Adı
                      </label>
                      <input
                        type="text"
                        value={smsSettings.username}
                        onChange={(e) => setSmsSettings({...smsSettings, username: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="Kullanıcı adı"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Şifre
                      </label>
                      <input
                        type="password"
                        value={smsSettings.password}
                        onChange={(e) => setSmsSettings({...smsSettings, password: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="mt-6 bg-white p-4 rounded-lg border border-purple-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-700">SMS Kredisi</p>
                        <p className="text-2xl font-bold text-purple-600">{smsSettings.balance} SMS</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">SMS Başına</p>
                        <p className="text-lg font-semibold text-purple-600">{smsSettings.costPerSms} TL</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <button
                      onClick={() => handleSaveSettings('sms')}
                      className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
                    >
                      <Save className="w-4 h-4" />
                      <span>Kaydet</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'templates' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-gray-900">Mesaj Şablonları</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Plus className="w-4 h-4" />
                    <span>Yeni Şablon</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {messageTemplates.map((template) => (
                    <div key={template.id} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          {template.type === 'whatsapp' && <MessageSquare className="w-5 h-5 text-green-600" />}
                          {template.type === 'email' && <Mail className="w-5 h-5 text-blue-600" />}
                          {template.type === 'sms' && <Smartphone className="w-5 h-5 text-purple-600" />}
                          <span className="text-sm font-medium text-gray-700">{template.type.toUpperCase()}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="p-1 hover:bg-gray-100 rounded transition-colors">
                            <Edit3 className="w-4 h-4 text-gray-600" />
                          </button>
                          <button className="p-1 hover:bg-red-100 rounded transition-colors">
                            <Trash2 className="w-4 h-4 text-red-600" />
                          </button>
                        </div>
                      </div>
                      
                      <h4 className="font-semibold text-gray-900 mb-2">{template.name}</h4>
                      {template.subject && (
                        <p className="text-sm text-gray-600 mb-2">Konu: {template.subject}</p>
                      )}
                      <p className="text-sm text-gray-700 line-clamp-3">{template.content}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'notifications' && (
              <div className="space-y-6">
                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Bell className="w-6 h-6 text-yellow-600" />
                    <h3 className="font-semibold text-yellow-800">Bildirim Ayarları</h3>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-yellow-200">
                      <div>
                        <h4 className="font-medium text-gray-900">Yeni Mesaj Bildirimi</h4>
                        <p className="text-sm text-gray-600">WhatsApp, e-posta veya SMS'ten gelen yeni mesajlar</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-yellow-200">
                      <div>
                        <h4 className="font-medium text-gray-900">SMS Kredisi Uyarısı</h4>
                        <p className="text-sm text-gray-600">SMS kredisi %20'nin altına düştüğünde</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-yellow-200">
                      <div>
                        <h4 className="font-medium text-gray-900">E-posta Hatası Bildirimi</h4>
                        <p className="text-sm text-gray-600">SMTP bağlantı sorunları</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" defaultChecked />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'integrations' && (
              <div className="space-y-6">
                <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Globe className="w-6 h-6 text-indigo-600" />
                    <h3 className="font-semibold text-indigo-800">Entegrasyonlar</h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-medium text-gray-900">WhatsApp Business API</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Bağlı - Mesaj gönderimi aktif</p>
                      <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                        Ayarlar →
                      </button>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-medium text-gray-900">Gmail SMTP</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Bağlı - E-posta gönderimi aktif</p>
                      <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                        Ayarlar →
                      </button>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-indigo-200">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-medium text-gray-900">NetGSM SMS</h4>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Bağlı - SMS gönderimi aktif</p>
                      <button className="text-indigo-600 hover:text-indigo-700 text-sm font-medium">
                        Ayarlar →
                      </button>
                    </div>

                    <div className="bg-white p-4 rounded-lg border border-gray-200 opacity-50">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center">
                          <X className="w-4 h-4 text-white" />
                        </div>
                        <h4 className="font-medium text-gray-500">Slack Entegrasyonu</h4>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">Bağlı değil</p>
                      <button className="text-gray-500 text-sm font-medium">
                        Bağla →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Iletisim;
