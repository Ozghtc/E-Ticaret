import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Draggable from 'react-draggable';
import { 
  LogOut, 
  Bell,
  Globe,
  ShoppingBag,
  UserCheck,
  Calendar,
  Monitor,
  Palette,
  Key,
  PlusCircle,
  BarChart3,
  Settings,
  Package,
  Search,
  Layout,
  Save,
  RotateCcw,
  AlignJustify,
  Grid3X3,
  MessageCircle,
  ChevronDown,
  CheckCircle,
  XCircle,
  Loader,
  ChevronRight,
  Users,
  Store,
  Wrench,
  CreditCard
} from 'lucide-react';

function AdminDashboard() {
  const navigate = useNavigate();
  const [layoutMode, setLayoutMode] = useState<'grid' | 'free'>('grid');
  const [currentLayout, setCurrentLayout] = useState(1);
  const [cardPositions, setCardPositions] = useState<{[key: string]: {x: number, y: number}}>({});
  
  // Durum takip sistemi state'leri
  const [moduleStatuses, setModuleStatuses] = useState<{[key: string]: 'in-progress' | 'not-started' | 'completed'}>({});
  const [openDropdowns, setOpenDropdowns] = useState<{[key: string]: boolean}>({});
  
  // Sağ alt köşe durum göstergesi state'leri
  const [showStatusPanel, setShowStatusPanel] = useState(false);
  const [selectedModule, setSelectedModule] = useState<string>('');

  // YENİ: Gruplandırma sistemi state'leri
  const [useGroupedLayout, setUseGroupedLayout] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<{[key: string]: boolean}>({});

  // YENİ: Gruplandırma yapısı
  const groupedModules = {
    'yonetim': {
      id: 'yonetim',
      title: 'YÖNETİM PANELİ',
      icon: Users,
      color: 'from-blue-500 to-blue-600',
      modules: ['kullanici-yonetimi', 'yetkilendirme', 'magaza-acilis', 'raporlar']
    },
    'magaza-urun': {
      id: 'magaza-urun',
      title: 'MAĞAZA & ÜRÜN YÖNETİMİ',
      icon: Store,
      color: 'from-green-500 to-green-600',
      modules: ['magaza-paneli', 'urun-ekleme', 'sistem-tanimlamalari', 'tema-sistemi', 'son-kullanici']
    },
    'teknik-altyapi': {
      id: 'teknik-altyapi',
      title: 'TEKNİK & ALTYAPI',
      icon: Wrench,
      color: 'from-purple-500 to-purple-600',
      modules: ['platform', 'seo', 'iletisim']
    },
    'abonelik-paketler': {
      id: 'abonelik-paketler',
      title: 'ABONELİK & PAKETLER',
      icon: CreditCard,
      color: 'from-orange-500 to-orange-600',
      modules: ['paket-tanimlama']
    }
  };

  // YENİ: Grup genişletme/daraltma fonksiyonu
  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => ({
      ...prev,
      [groupId]: !prev[groupId]
    }));
  };

  // YENİ: Gruplandırma modunu değiştirme
  const toggleLayoutMode = () => {
    setUseGroupedLayout(!useGroupedLayout);
  };

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }

    // Load saved layout
    const savedLayout = localStorage.getItem('adminLayout');
    const savedPositions = localStorage.getItem('adminCardPositions');
    if (savedLayout) {
      setCurrentLayout(parseInt(savedLayout));
    }
    if (savedPositions) {
      setCardPositions(JSON.parse(savedPositions));
    }

    // Load saved module statuses
    const savedStatuses = localStorage.getItem('moduleStatuses');
    if (savedStatuses) {
      setModuleStatuses(JSON.parse(savedStatuses));
    }

    // Close dropdowns when clicking outside
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-container')) {
        setOpenDropdowns({});
      }
      // Status panel'i sadece panel dışına tıklandığında kapat
      if (!target.closest('.status-panel-container') && !target.closest('.status-settings-button')) {
        setShowStatusPanel(false);
        setSelectedModule('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/');
  };

  // Layout Management Functions
  const saveCurrentLayout = () => {
    const layoutNumber = currentLayout;
    localStorage.setItem(`adminLayout_${layoutNumber}`, JSON.stringify(cardPositions));
    localStorage.setItem('adminLayout', layoutNumber.toString());
    
    // Show toast notification
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all transform';
    toast.innerHTML = `<div class="flex items-center space-x-2"><span>✅</span><span>Düzen ${layoutNumber} kaydedildi!</span></div>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  };

  const loadLayout = (layoutNumber: number) => {
    const savedLayout = localStorage.getItem(`adminLayout_${layoutNumber}`);
    if (savedLayout) {
      const positions = JSON.parse(savedLayout);
      setCardPositions(positions);
      setCurrentLayout(layoutNumber);
      localStorage.setItem('adminLayout', layoutNumber.toString());
      
      // Show toast notification
      const toast = document.createElement('div');
      toast.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all transform';
      toast.innerHTML = `<div class="flex items-center space-x-2"><span>🏗️</span><span>Düzen ${layoutNumber} yüklendi!</span></div>`;
      document.body.appendChild(toast);
      setTimeout(() => {
        toast.classList.add('translate-x-full', 'opacity-0');
        setTimeout(() => document.body.removeChild(toast), 300);
      }, 2000);
    } else {
      // Default positions for new layouts
      const defaultPositions: {[key: string]: {x: number, y: number}} = {};
      adminCards.forEach((card, index) => {
        const row = Math.floor(index / 4);
        const col = index % 4;
        defaultPositions[card.id] = { x: col * 320, y: row * 200 };
      });
      setCardPositions(defaultPositions);
      setCurrentLayout(layoutNumber);
    }
  };

  const resetLayout = () => {
    const defaultPositions: {[key: string]: {x: number, y: number}} = {};
    adminCards.forEach((card, index) => {
      const row = Math.floor(index / 4);
      const col = index % 4;
      defaultPositions[card.id] = { x: col * 320, y: row * 200 };
    });
    setCardPositions(defaultPositions);
  };

  // Perfect Grid Layout - Dağınık düzenden mükemmel 4x3 grid'e!
  const autoAlign = () => {
    const CARD_WIDTH = 320; // Kart genişliği + gap
    const CARD_HEIGHT = 200; // Kart yüksekliği + gap
    const START_X = 0; // Grid başlangıç X
    const START_Y = 0; // Grid başlangıç Y
    const COLS = 4; // 4 sütun
    
    const alignedPositions: {[key: string]: {x: number, y: number}} = {};

    // Kartları 4x3 grid düzeninde yerleştir
    adminCards.forEach((card, index) => {
      const row = Math.floor(index / COLS); // Hangi satır
      const col = index % COLS; // Hangi sütun
      
      const gridX = START_X + (col * CARD_WIDTH);
      const gridY = START_Y + (row * CARD_HEIGHT);

      alignedPositions[card.id] = { x: gridX, y: gridY };
    });

    // Perfect grid pozisyonlarını uygula
    setCardPositions(alignedPositions);
    localStorage.setItem('adminCardPositions', JSON.stringify(alignedPositions));

    // Success toast
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-purple-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all transform';
    toast.innerHTML = `<div class="flex items-center space-x-2"><span>🎯</span><span>Perfect grid düzeni oluşturuldu!</span></div>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  };

  // Manyetik hizalama - sürüklerken yakın grid noktalarına yapış
  const snapToGrid = (x: number, y: number, threshold: number = 15) => {
    const GRID_SIZE = 20;
    const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE;
    const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE;
    
    // Eğer grid noktasına yeterince yakınsa yapıştır
    if (Math.abs(x - snappedX) <= threshold && Math.abs(y - snappedY) <= threshold) {
      return { x: snappedX, y: snappedY };
    }
    
    return { x, y };
  };

  const handleDragStop = (cardId: string, e: any, data: any) => {
    // Manyetik snapping uygula
    const snapped = snapToGrid(data.x, data.y);
    
    const newPositions = { ...cardPositions };
    newPositions[cardId] = snapped;
    setCardPositions(newPositions);
    localStorage.setItem('adminCardPositions', JSON.stringify(newPositions));
  };

  const getCurrentDate = () => {
    const now = new Date();
    return now.toLocaleDateString('tr-TR', {
      day: '2-digit',
      month: '2-digit', 
      year: 'numeric'
    }) + ' | ' + now.toLocaleTimeString('tr-TR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Durum yönetimi fonksiyonları
  const toggleDropdown = (cardId: string) => {
    setOpenDropdowns(prev => ({
      ...prev,
      [cardId]: !prev[cardId]
    }));
  };

  const updateModuleStatus = (cardId: string, status: 'in-progress' | 'not-started' | 'completed') => {
    console.log('🔄 updateModuleStatus çağrıldı:', cardId, status);
    
    const newStatuses = { ...moduleStatuses, [cardId]: status };
    console.log('📊 Yeni statuses:', newStatuses);
    
    setModuleStatuses(newStatuses);
    localStorage.setItem('moduleStatuses', JSON.stringify(newStatuses));
    
    // Force re-render için state'i zorla güncelle
    setTimeout(() => {
      setModuleStatuses(prev => ({ ...prev }));
    }, 100);

    // Show toast notification
    const statusText = {
      'in-progress': 'Yapım Aşamasında',
      'not-started': 'Henüz Başlanmadı',
      'completed': 'Hazır'
    };
    
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all transform';
    toast.innerHTML = `<div class="flex items-center space-x-2"><span>📝</span><span>${statusText[status]} olarak işaretlendi!</span></div>`;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => document.body.removeChild(toast), 300);
    }, 2000);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'in-progress':
        return <Loader className="w-4 h-4 animate-spin text-blue-600" />;
      case 'not-started':
        return <XCircle className="w-4 h-4 text-red-600" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'in-progress':
        return 'Yapım Aşamasında';
      case 'not-started':
        return 'Henüz Başlanmadı';
      case 'completed':
        return 'Hazır';
      default:
        return 'Durum Seçin';
    }
  };

  // Sağ alt köşe durum göstergesi fonksiyonları
  const getOverallStatus = () => {
    const statuses = Object.values(moduleStatuses);
    if (statuses.length === 0) return 'none';
    
    const completed = statuses.filter(s => s === 'completed').length;
    const inProgress = statuses.filter(s => s === 'in-progress').length;
    const notStarted = statuses.filter(s => s === 'not-started').length;
    
    if (completed === statuses.length) return 'completed';
    if (inProgress > 0) return 'in-progress';
    if (notStarted === statuses.length) return 'not-started';
    return 'mixed';
  };

  const getStatusEmoji = (status: string) => {
    switch (status) {
      case 'in-progress':
        return '⚙️';
      case 'not-started':
        return '❌';
      case 'completed':
        return '✅';
      case 'mixed':
        return '🔄';
      default:
        return '⭕';
    }
  };

  const toggleStatusPanel = () => {
    setShowStatusPanel(!showStatusPanel);
  };

  const selectModuleForStatus = (moduleId: string) => {
    setSelectedModule(moduleId);
    // Panel açık kalacak, sadece içerik değişecek
  };

  const updateModuleStatusFromPanel = (status: 'in-progress' | 'not-started' | 'completed') => {
    console.log('🎯 updateModuleStatusFromPanel çağrıldı:', selectedModule, status);
    
    if (selectedModule) {
      console.log('✅ selectedModule mevcut, updateModuleStatus çağrılıyor');
      updateModuleStatus(selectedModule, status);
      setSelectedModule(''); // Modül seçimini temizle
      setShowStatusPanel(false); // Ana paneli de kapat
      setClickedPosition(null); // Pozisyonu temizle
    } else {
      console.log('❌ selectedModule yok!');
    }
  };

  // Yuvarlak durum göstergesine tıklama fonksiyonu
  const [clickedPosition, setClickedPosition] = useState<{ x: number; y: number } | null>(null);
  
  const handleStatusIndicatorClick = (cardId: string, _event: React.MouseEvent) => {
    setSelectedModule(cardId);
    
    // Tıklanan pozisyonu kaydet
    const rect = _event.currentTarget.getBoundingClientRect();
    setClickedPosition({
      x: rect.left - 280, // Panel genişliği kadar sola
      y: rect.top - 50    // Panel yüksekliği kadar yukarı
    });
  };

  // Admin Panel Butonları
  const adminCards = [
    {
      id: 'magaza-paneli',
      title: 'Mağaza Paneli',
      description: 'Ürün ekleme, sipariş takibi, tema seçimi',
      link: '/admin/magaza-yonetimi',
      icon: ShoppingBag,
      color: 'from-blue-500/80 to-blue-600/80',
      hoverColor: 'hover:from-blue-600/90 hover:to-blue-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'platform',
      title: 'Altyapı / Platform',
      description: 'Sipariş akışı, log tutma, trafik ve sistem raporları',
      link: '/admin/platform',
      icon: Globe,
      color: 'from-green-500/80 to-green-600/80',
      hoverColor: 'hover:from-green-600/90 hover:to-green-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'magaza-acilis',
      title: 'Mağaza Açılış Paneli',
      description: 'Yeni mağaza başvuruları, onay süreçleri',
      link: '/admin/magaza-acilis-paneli',
      icon: PlusCircle,
      color: 'from-cyan-500/80 to-cyan-600/80',
      hoverColor: 'hover:from-cyan-600/90 hover:to-cyan-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'kullanici-yonetimi',
      title: 'Kullanıcı Yönetimi',
      description: 'Giriş yapma, yetki seviyesi belirleme',
      link: '/admin/kullanici-yonetimi',
      icon: UserCheck,
      color: 'from-purple-500/80 to-purple-600/80',
      hoverColor: 'hover:from-purple-600/90 hover:to-purple-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'son-kullanici',
      title: 'Son Kullanıcı Sitesi',
      description: 'Ürünleri görür, sepete ekler, satın alır',
      link: '/admin/son-kullanici-sitesi',
      icon: Monitor,
      color: 'from-orange-500/80 to-orange-600/80',
      hoverColor: 'hover:from-orange-600/90 hover:to-orange-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'tema-sistemi',
      title: 'Tema Sistemi',
      description: 'Mağaza vitrinlerinin görünümünü özelleştirir (7-8 tema)',
      link: '/admin/tema-sistemi',
      icon: Palette,
      color: 'from-pink-500/80 to-pink-600/80',
      hoverColor: 'hover:from-pink-600/90 hover:to-pink-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'yetkilendirme',
      title: 'Yetkilendirme',
      description: 'Rol ve yetki yönetimi, güvenlik ayarları',
      link: '/admin/yetkilendirme',
      icon: Key,
      color: 'from-indigo-500/80 to-indigo-600/80',
      hoverColor: 'hover:from-indigo-600/90 hover:to-indigo-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'raporlar',
      title: 'Raporlar',
      description: 'Satış, kullanıcı ve sistem raporları',
      link: '/admin/raporlar',
      icon: BarChart3,
      color: 'from-emerald-500/80 to-emerald-600/80',
      hoverColor: 'hover:from-emerald-600/90 hover:to-emerald-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'sistem-tanimlamalari',
      title: 'Sistem Tanımlamaları',
      description: 'Kategoriler, bedenler, renkler, markalar',
      link: '/admin/sistem-tanimlamalari',
      icon: Settings,
      color: 'from-teal-500/80 to-teal-600/80',
      hoverColor: 'hover:from-teal-600/90 hover:to-teal-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'urun-ekleme',
      title: 'Ürün Ekleme',
      description: 'Kategori bazlı profesyonel ürün ekleme sistemi',
      link: '/admin/urun-ekleme-yeni',
      icon: Package,
      color: 'from-amber-500/80 to-amber-600/80',
      hoverColor: 'hover:from-amber-600/90 hover:to-amber-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'seo',
      title: 'SEO',
      description: 'Arama motoru optimizasyonu ve analiz araçları',
      link: '/admin/seo',
      icon: Search,
      color: 'from-red-500/80 to-red-600/80',
      hoverColor: 'hover:from-red-600/90 hover:to-red-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'paket-tanimlama',
      title: 'Paket Tanımlama',
      description: 'Sistem özellikleri yazarak fiyat belirleme ve paket oluşturma',
      link: '/admin/paket-tanimlama',
      icon: Package,
      color: 'from-rose-500/80 to-rose-600/80',
      hoverColor: 'hover:from-rose-600/90 hover:to-rose-700/90',
      iconColor: 'text-white'
    },
    {
      id: 'iletisim',
      title: 'İletişim',
      description: 'Müşteri iletişimi, destek sistemi ve mesaj yönetimi',
      link: '/admin/iletisim',
      icon: MessageCircle,
      color: 'from-violet-500/80 to-violet-600/80',
      hoverColor: 'hover:from-violet-600/90 hover:to-violet-700/90',
      iconColor: 'text-white'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-cyan-100" style={{
      backgroundImage: `
        radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 80% 20%, rgba(255, 107, 107, 0.3) 0%, transparent 50%),
        radial-gradient(circle at 40% 80%, rgba(120, 219, 226, 0.3) 0%, transparent 50%),
        linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)
      `,
      backdropFilter: 'blur(10px)'
    }}>
      {/* Top Header */}
      <header className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side - Logo */}
            <div className="flex items-center">
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-bold text-white">Altıntassoft</span>
              </div>
            </div>

            {/* Right side - User info and actions */}
            <div className="flex items-center space-x-4">
              <div className="bg-blue-500 px-3 py-1 rounded-full text-sm">
                <Calendar className="inline w-4 h-4 mr-1" />
                {getCurrentDate()}
              </div>
              
              <button className="p-2 hover:bg-blue-500 rounded-full transition-colors">
                <Bell size={20} />
              </button>

              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <p className="font-medium">ÖZGÜR ALTINTAŞ</p>
                  <p className="text-blue-200 text-sm">Admin</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 hover:bg-blue-500 rounded-full transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section - Glassmorphism */}
        <div className="backdrop-blur-md bg-white/20 border border-white/30 rounded-3xl p-8 mb-10 shadow-2xl">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-3">
                Hoş Geldiniz <span className="text-blue-700 drop-shadow-md">Admin Paneli</span>
              </h1>
              <p className="text-gray-700 text-lg font-medium">
                🚀 Modern E-Ticaret Yönetim Sistemi
              </p>
              <div className="mt-4 flex items-center space-x-4 text-sm">
                <span className="bg-green-100/80 text-green-700 px-3 py-1 rounded-full backdrop-blur-sm">
                  ✅ Sistem Aktif
                </span>
                <span className="bg-blue-100/80 text-blue-700 px-3 py-1 rounded-full backdrop-blur-sm">
                  📊 16+ Modül
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Layout Controls */}
        <div className="mb-8 flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
          {/* İpucu */}
          <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
            <span className="text-blue-700 font-medium">💡 İpucu:</span>
            <span className="text-gray-700">
              {layoutMode === 'grid' 
                ? 'Sayfa Düzeni ile sürükleyerek taşıyabilirsiniz!' 
                : 'Dağınık yerleştirin, Perfect Hizala ile 4x3 grid yapın! 🎯'}
            </span>
          </div>

          {/* Layout Control Panel */}
          <div className="flex items-center space-x-3">
            {/* Layout Mode Toggle */}
                          <button
                onClick={toggleLayoutMode}
                className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 border ${
                  useGroupedLayout
                    ? 'bg-green-500/80 hover:bg-green-600/90 text-white border-green-400/50 shadow-lg backdrop-blur-md'
                    : 'bg-white/20 hover:bg-white/30 text-gray-700 border-white/30 backdrop-blur-md'
                }`}
              >
                <AlignJustify size={18} />
                <span>{useGroupedLayout ? 'Gruplandırılmış' : 'Sayfa Düzeni'}</span>
              </button>



            {/* Layout Presets */}
            {layoutMode === 'free' && (
              <div className="flex items-center space-x-2">
                {/* Düzen Seçimi */}
                <div className="flex space-x-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-1">
                  {[1, 2, 3].map((layout) => (
                    <button
                      key={layout}
                      onClick={() => loadLayout(layout)}
                      className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                        currentLayout === layout
                          ? 'bg-blue-500 text-white shadow-lg'
                          : 'text-gray-700 hover:bg-white/30'
                      }`}
                    >
                      Düzen {layout}
                    </button>
                  ))}
                </div>

                {/* Action Buttons */}
                <button
                  onClick={autoAlign}
                  className="flex items-center space-x-1 bg-purple-500/80 hover:bg-purple-600/90 text-white px-3 py-2 rounded-xl backdrop-blur-md border border-purple-400/50 transition-all"
                  title="Dağınık düzenden perfect 4x3 grid'e otomatik yerleştir - Kartların içeriği aynı kalır!"
                >
                  <Grid3X3 size={16} />
                  <span className="hidden sm:inline">Perfect Hizala</span>
                </button>

                <button
                  onClick={saveCurrentLayout}
                  className="flex items-center space-x-1 bg-green-500/80 hover:bg-green-600/90 text-white px-3 py-2 rounded-xl backdrop-blur-md border border-green-400/50 transition-all"
                  title="Mevcut düzeni kaydet"
                >
                  <Save size={16} />
                  <span className="hidden sm:inline">Kaydet</span>
                </button>

                <button
                  onClick={resetLayout}
                  className="flex items-center space-x-1 bg-orange-500/80 hover:bg-orange-600/90 text-white px-3 py-2 rounded-xl backdrop-blur-md border border-orange-400/50 transition-all"
                  title="Varsayılan düzene sıfırla"
                >
                  <RotateCcw size={16} />
                  <span className="hidden sm:inline">Sıfırla</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Action Cards Container */}
        <div className={layoutMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8' : 'relative min-h-screen mb-8'}>
          {/* Grid Overlay - Sadece Free Mode'da göster */}
          {layoutMode === 'free' && (
            <div 
              className="absolute inset-0 pointer-events-none opacity-20 z-0"
              style={{
                backgroundImage: `
                  radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)
                `,
                backgroundSize: '20px 20px'
              }}
            />
          )}
          
          {useGroupedLayout ? (
            Object.entries(groupedModules).map(([groupId, group]) => (
              <div key={groupId} className="group">
                <div 
                  className="flex items-center justify-between bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20 mb-2"
                  onClick={() => toggleGroup(groupId)}
                >
                  <span>{group.title}</span>
                  <ChevronRight 
                    className={`w-4 h-4 transition-transform duration-200 ${expandedGroups[groupId] ? 'rotate-90' : ''}`} 
                  />
                </div>
                {expandedGroups[groupId] && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                                         {group.modules.map((moduleId) => {
                       const card = adminCards.find(c => c.id === moduleId);
                       if (!card) return null;
                       const IconComponent = card.icon;
                       const position = cardPositions[moduleId] || { x: 0, y: 0 };
                       return (
                         <Draggable
                           key={moduleId}
                           disabled={layoutMode === 'grid'}
                           position={layoutMode === 'free' ? position : { x: 0, y: 0 }}
                           onStop={(e, data) => layoutMode === 'free' && handleDragStop(moduleId, e, data)}
                         >
                           <div 
                             className={layoutMode === 'free' ? 'absolute cursor-move w-80 z-10' : 'cursor-default'}
                             style={layoutMode === 'free' ? { width: '300px' } : {}}
                           >
                             <Link
                               to={card.link}
                               className={`block backdrop-blur-lg bg-gradient-to-br ${card.color} ${card.hoverColor} 
                                 border border-white/30 text-white rounded-3xl p-6 
                                 transition-all duration-500 transform hover:scale-110 hover:rotate-1
                                 shadow-2xl hover:shadow-3xl group relative overflow-hidden
                                 ${layoutMode === 'free' ? 'cursor-pointer' : 'cursor-pointer'}`}
                               style={layoutMode === 'free' ? { 
                                 transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
                               } : {}}
                               onClick={(e) => {
                                 if (layoutMode === 'free' && e.target !== e.currentTarget) {
                                   e.preventDefault();
                                 }
                               }}
                             >
                               {/* Drag Handle - only visible in free mode */}
                               {layoutMode === 'free' && (
                                 <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
                                   <div className="w-6 h-6 flex items-center justify-center bg-white/20 rounded-lg backdrop-blur-sm">
                                     <Layout size={12} className="text-white" />
                                   </div>
                                 </div>
                               )}

                               {/* Floating Particles Effect */}
                               <div className="absolute inset-0 overflow-hidden pointer-events-none">
                                 <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                 <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                               </div>

                               {/* Content */}
                               <div className="relative z-10">
                                 <div className="flex items-center mb-4">
                                   <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm mr-4 group-hover:bg-white/30 transition-all duration-300">
                                     <IconComponent className="w-8 h-8 text-white drop-shadow-lg" />
                                   </div>
                                  <div className="flex-1">
                                    <h3 className="font-bold text-lg mb-1 text-white drop-shadow-md group-hover:text-white/90 transition-colors">
                                      {card.title}
                                    </h3>
                                  </div>
                                </div>
                                <p className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-colors mb-4">
                                  {card.description}
                                </p>

                                {/* Status Indicator - Sağ Alt Köşe */}
                                <div className="absolute bottom-2 right-2">
                                  <div 
                                    key={`${moduleId}-${moduleStatuses[moduleId] || 'none'}`}
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      handleStatusIndicatorClick(moduleId, e);
                                    }}
                                    className="w-8 h-8 bg-pink-400/90 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200 z-10"
                                  >
                                    <span className="text-sm">
                                      {getStatusEmoji(moduleStatuses[moduleId] || 'none')}
                                    </span>
                                  </div>
                                </div>

                                {/* Status Section - Hidden for new system */}
                                <div className="mt-4 pt-4 border-t border-white/20 hidden">
                                  {/* Current Status Display */}
                                  <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center space-x-2">
                                      {getStatusIcon(moduleStatuses[moduleId])}
                                      <span className="text-white/80 text-sm font-medium">
                                        {getStatusText(moduleStatuses[moduleId])}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Status Dropdown */}
                                  <div className="relative dropdown-container">
                                    <button
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        toggleDropdown(moduleId);
                                      }}
                                      className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20"
                                    >
                                      <span>Durum Değiştir</span>
                                      <ChevronDown 
                                        className={`w-4 h-4 transition-transform duration-200 ${openDropdowns[moduleId] ? 'rotate-180' : ''}`} 
                                      />
                                    </button>

                                    {/* Dropdown Menu */}
                                    {openDropdowns[moduleId] && (
                                      <div className="absolute bottom-full left-0 right-0 mb-2 bg-white/95 backdrop-blur-md border border-white/30 rounded-lg shadow-xl overflow-hidden z-20">
                                        <div className="py-1">
                                          <button
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              updateModuleStatus(moduleId, 'in-progress');
                                            }}
                                            className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-blue-50 transition-colors"
                                          >
                                            <Loader className="w-4 h-4 animate-spin text-blue-600" />
                                            <span className="text-gray-700">Yapım Aşamasında</span>
                                          </button>
                                          <button
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              updateModuleStatus(moduleId, 'not-started');
                                            }}
                                            className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-red-50 transition-colors"
                                          >
                                            <XCircle className="w-4 h-4 text-red-600" />
                                            <span className="text-gray-700">Henüz Başlanmadı</span>
                                          </button>
                                          <button
                                            onClick={(e) => {
                                              e.preventDefault();
                                              e.stopPropagation();
                                              updateModuleStatus(moduleId, 'completed');
                                            }}
                                            className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-green-50 transition-colors"
                                          >
                                            <CheckCircle className="w-4 h-4 text-green-600" />
                                            <span className="text-gray-700">Hazır</span>
                                          </button>
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>

                              {/* Glassmorphism border effect */}
                              <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </Link>
                          </div>
                        </Draggable>
                      );
                    })}
                  </div>
                )}
              </div>
            ))
          ) : (
            adminCards.map((card) => {
              const IconComponent = card.icon;
              const position = cardPositions[card.id] || { x: 0, y: 0 };
              
              return (
                <Draggable
                  key={card.id}
                  disabled={layoutMode === 'grid'}
                  position={layoutMode === 'free' ? position : { x: 0, y: 0 }}
                  onStop={(e, data) => layoutMode === 'free' && handleDragStop(card.id, e, data)}
                >
                  <div 
                    className={layoutMode === 'free' ? 'absolute cursor-move w-80 z-10' : 'cursor-default'}
                    style={layoutMode === 'free' ? { width: '300px' } : {}}
                  >
                    <Link
                      to={card.link}
                      className={`block backdrop-blur-lg bg-gradient-to-br ${card.color} ${card.hoverColor} 
                                border border-white/30 text-white rounded-3xl p-6 
                                transition-all duration-500 transform hover:scale-110 hover:rotate-1
                                shadow-2xl hover:shadow-3xl group relative overflow-hidden
                                ${layoutMode === 'free' ? 'cursor-pointer' : 'cursor-pointer'}`}
                      style={layoutMode === 'free' ? { 
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)' 
                      } : {}}
                      onClick={(e) => {
                        if (layoutMode === 'free' && e.target !== e.currentTarget) {
                          e.preventDefault();
                        }
                      }}
                    >
                      {/* Drag Handle - only visible in free mode */}
                      {layoutMode === 'free' && (
                        <div className="absolute top-2 right-2 opacity-50 group-hover:opacity-100 transition-opacity">
                          <div className="w-6 h-6 flex items-center justify-center bg-white/20 rounded-lg backdrop-blur-sm">
                            <Layout size={12} className="text-white" />
                          </div>
                        </div>
                      )}

                      {/* Floating Particles Effect */}
                      <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-4 -right-4 w-20 h-20 bg-white/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-white/5 rounded-full blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>

                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex items-center mb-4">
                          <div className="p-3 bg-white/20 rounded-2xl backdrop-blur-sm mr-4 group-hover:bg-white/30 transition-all duration-300">
                            <IconComponent className="w-8 h-8 text-white drop-shadow-lg" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg mb-1 text-white drop-shadow-md group-hover:text-white/90 transition-colors">
                              {card.title}
                            </h3>
                          </div>
                        </div>
                        <p className="text-white/90 text-sm leading-relaxed group-hover:text-white transition-colors mb-4">
                          {card.description}
                        </p>

                        {/* Status Indicator - Sağ Alt Köşe */}
                        <div className="absolute bottom-2 right-2">
                          <div 
                            key={`${card.id}-${moduleStatuses[card.id] || 'none'}`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleStatusIndicatorClick(card.id, e);
                            }}
                            className="w-8 h-8 bg-pink-400/90 backdrop-blur-sm rounded-full flex items-center justify-center border-2 border-white/50 shadow-lg cursor-pointer hover:scale-110 transition-transform duration-200 z-10"
                          >
                            <span className="text-sm">
                              {getStatusEmoji(moduleStatuses[card.id] || 'none')}
                            </span>
                          </div>
                        </div>

                        {/* Status Section - Hidden for new system */}
                        <div className="mt-4 pt-4 border-t border-white/20 hidden">
                          {/* Current Status Display */}
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center space-x-2">
                              {getStatusIcon(moduleStatuses[card.id])}
                              <span className="text-white/80 text-sm font-medium">
                                {getStatusText(moduleStatuses[card.id])}
                              </span>
                            </div>
                          </div>

                          {/* Status Dropdown */}
                          <div className="relative dropdown-container">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                toggleDropdown(card.id);
                              }}
                              className="w-full flex items-center justify-between bg-white/10 hover:bg-white/20 text-white text-sm px-3 py-2 rounded-lg transition-all duration-200 backdrop-blur-sm border border-white/20"
                            >
                              <span>Durum Değiştir</span>
                              <ChevronDown 
                                className={`w-4 h-4 transition-transform duration-200 ${openDropdowns[card.id] ? 'rotate-180' : ''}`} 
                              />
                            </button>

                            {/* Dropdown Menu */}
                            {openDropdowns[card.id] && (
                              <div className="absolute bottom-full left-0 right-0 mb-2 bg-white/95 backdrop-blur-md border border-white/30 rounded-lg shadow-xl overflow-hidden z-20">
                                <div className="py-1">
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      updateModuleStatus(card.id, 'in-progress');
                                    }}
                                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-blue-50 transition-colors"
                                  >
                                    <Loader className="w-4 h-4 animate-spin text-blue-600" />
                                    <span className="text-gray-700">Yapım Aşamasında</span>
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      updateModuleStatus(card.id, 'not-started');
                                    }}
                                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-red-50 transition-colors"
                                  >
                                    <XCircle className="w-4 h-4 text-red-600" />
                                    <span className="text-gray-700">Henüz Başlanmadı</span>
                                  </button>
                                  <button
                                    onClick={(e) => {
                                      e.preventDefault();
                                      e.stopPropagation();
                                      updateModuleStatus(card.id, 'completed');
                                    }}
                                    className="w-full flex items-center space-x-2 px-3 py-2 text-sm hover:bg-green-50 transition-colors"
                                  >
                                    <CheckCircle className="w-4 h-4 text-green-600" />
                                    <span className="text-gray-700">Hazır</span>
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Glassmorphism border effect */}
                      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </Link>
                  </div>
                </Draggable>
              );
            })
          )}
        </div>

        {/* Bottom Section with HZM Partnership - Glassmorphism */}
        <div className="text-center">
          <div className="inline-block backdrop-blur-md bg-gradient-to-r from-blue-500/80 to-purple-500/80 hover:from-blue-600/90 hover:to-purple-600/90 text-white px-8 py-4 rounded-full cursor-pointer transition-all duration-300 shadow-2xl border border-white/30 transform hover:scale-105">
            <div className="flex items-center space-x-2">
              <span className="font-semibold">🚀 HZM İşbirliği ile</span>
              <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Seçili Modül Durum Güncelleme Paneli - Dinamik Konum */}
        {selectedModule && clickedPosition && (
          <div 
            className="fixed bg-white/95 backdrop-blur-md border border-white/30 rounded-2xl shadow-2xl p-4 min-w-64 z-[10001]"
            style={{
              left: `${clickedPosition.x}px`,
              top: `${clickedPosition.y}px`
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {adminCards.find(card => card.id === selectedModule)?.title}
                </h3>
                <p className="text-sm text-gray-600">Durum seçin</p>
              </div>
              <button
                onClick={() => {
                  setSelectedModule('');
                  setClickedPosition(null);
                }}
                className="text-gray-500 hover:text-gray-700 transition-colors"
                title="Geri dön"
              >
                ←
              </button>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => updateModuleStatusFromPanel('in-progress')}
                className="w-full flex items-center space-x-3 p-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
              >
                <span className="text-2xl">⚙️</span>
                <span className="text-sm font-medium text-gray-700">Yapım Aşamasında</span>
              </button>
              <button
                onClick={() => updateModuleStatusFromPanel('not-started')}
                className="w-full flex items-center space-x-3 p-3 bg-red-50 hover:bg-red-100 rounded-lg transition-colors"
              >
                <span className="text-2xl">❌</span>
                <span className="text-sm font-medium text-gray-700">Henüz Başlanmadı</span>
              </button>
              <button
                onClick={() => updateModuleStatusFromPanel('completed')}
                className="w-full flex items-center space-x-3 p-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
              >
                <span className="text-2xl">✅</span>
                <span className="text-sm font-medium text-gray-700">Hazır</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;