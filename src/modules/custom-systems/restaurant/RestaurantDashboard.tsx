// 🍽️ RESTORAN YÖNETİM SİSTEMİ DASHBOARD
// Tamamen e-ticaretten farklı, restoran odaklı admin paneli

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Calendar, Menu, ChefHat, Users, Monitor, DollarSign, Package, Star, Clock, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
interface RestaurantDashboardProps {
  magazaId: string;
  config: any;
}
export default function RestaurantDashboard({
  magazaId,
  config
}: RestaurantDashboardProps) {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  // Restoran özel state'leri - hiç ürün yok!
  const [reservations] = useState([{
    id: 1,
    table: 'Masa 3',
    customer: t("common.ahmet_yılmaz"),
    time: '19:00',
    guests: 4,
    status: 'confirmed'
  }, {
    id: 2,
    table: 'Masa 7',
    customer: 'Zeynep Kaya',
    time: '20:30',
    guests: 2,
    status: 'pending'
  }, {
    id: 3,
    table: 'Masa 12',
    customer: t("common.mehmet_öz"),
    time: '21:00',
    guests: 6,
    status: 'confirmed'
  }]);
  const [tables] = useState([{
    id: 1,
    number: 1,
    capacity: 4,
    status: 'occupied',
    waiter: 'Ali'
  }, {
    id: 2,
    number: 2,
    capacity: 2,
    status: 'available',
    waiter: null
  }, {
    id: 3,
    number: 3,
    capacity: 6,
    status: 'reserved',
    waiter: t("common.ayşe")
  }, {
    id: 4,
    number: 4,
    capacity: 4,
    status: 'cleaning',
    waiter: null
  }]);
  const [orders] = useState([{
    id: 1,
    table: 3,
    items: ['Adana Kebap', 'Ayran'],
    status: 'preparing',
    time: '18:45'
  }, {
    id: 2,
    table: 7,
    items: ['Pizza Margherita', 'Kola'],
    status: 'ready',
    time: '19:10'
  }, {
    id: 3,
    table: 1,
    items: [t("common.tavuk_şiş"), 'Salata'],
    status: 'served',
    time: '18:30'
  }]);
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Restoran özel modüller - hiç e-ticaret modülü yok!
  const restaurantModules = [{
    id: 'masa-rezervasyon',
    title: t("common.masa_rezervasyonları"),
    description: t("common.bugün_15_rezervasyon_3_bekliyor"),
    icon: Calendar,
    color: 'bg-orange-500 hover:bg-orange-600',
    path: '/restoran/rezervasyonlar',
    count: reservations.length,
    pending: reservations.filter(r => r.status === 'pending').length
  }, {
    id: 'menu-yonetimi',
    title: t("common.menü_yönetimi"),
    description: t("common.45_yemek_12_içecek_aktif"),
    icon: Menu,
    color: 'bg-red-500 hover:bg-red-600',
    path: '/restoran/menu',
    count: 57,
    pending: 3 // Onay bekleyen yeni yemekler
  }, {
    id: 'mutfak-siparisler',
    title: t("common.mutfak_siparişleri_canlı"),
    description: t("common.6_sipariş_hazırlanıyor"),
    icon: ChefHat,
    color: 'bg-yellow-500 hover:bg-yellow-600',
    path: '/restoran/mutfak',
    count: orders.filter(o => o.status === 'preparing').length,
    ready: orders.filter(o => o.status === 'ready').length
  }, {
    id: 'masa-durumu',
    title: 'Masa Durumu',
    description: t("common.16_masa_8_dolu_5_boş_3_rezerve"),
    icon: Monitor,
    color: 'bg-green-500 hover:bg-green-600',
    path: '/restoran/masa-durumu',
    occupied: tables.filter(t => t.status === 'occupied').length,
    available: tables.filter(t => t.status === 'available').length
  }, {
    id: 'garson-yonetimi',
    title: t("common.garson_yönetimi"),
    description: '8 garson vardiyada, 2 mola',
    icon: Users,
    color: 'bg-blue-500 hover:bg-blue-600',
    path: '/restoran/garsonlar',
    active: 8,
    break: 2
  }, {
    id: 'kasa-z-raporu',
    title: 'Kasa & Z Raporu',
    description: 'Bugün: {formatPrice(3)},450 | Bu ay: {formatPrice(89)},200',
    icon: DollarSign,
    color: 'bg-purple-500 hover:bg-purple-600',
    path: '/restoran/kasa',
    daily: 3450,
    monthly: 89200
  }, {
    id: 'stok-malzeme',
    title: 'Stok & Malzeme',
    description: t("common.23_malzeme_az_5_malzeme_tükendi"),
    icon: Package,
    color: 'bg-gray-600 hover:bg-gray-700',
    path: '/restoran/stok',
    low: 23,
    empty: 5
  }, {
    id: 'musteri-yorumlari',
    title: t("common.müşteri_yorumları"),
    description: '4.7★ ortalama (127 yorum)',
    icon: Star,
    color: 'bg-pink-500 hover:bg-pink-600',
    path: '/restoran/yorumlar',
    rating: 4.7,
    reviews: 127
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'available':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'reserved':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'cleaning':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case 'occupied':
        return 'Dolu';
      case 'available':
        return t("common.boş");
      case 'reserved':
        return 'Rezerve';
      case 'cleaning':
        return 'Temizlik';
      default:
        return status;
    }
  };
  return <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 restaurant-theme">
      {/* 🍽️ RESTORAN ÖZELLEŞTİRİLMİŞ HEADER */}
      <header className="bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center">
              <ChefHat className="w-8 h-8 mr-3" />
              <div>
                <h1 className="text-2xl font-bold">{config?.customDashboard?.brandName || t("common.restoran_yönetimi")}</h1>
                <p className="text-orange-200 text-sm">
                  {currentTime.toLocaleDateString('tr-TR')} | {currentTime.toLocaleTimeString('tr-TR')}
                </p>
              </div>
            </div>
            
            {/* Canlı istatistikler */}
            <div className="flex items-center space-x-6">
              <div className="text-center">
                <p className="text-sm text-orange-200">{t("common.bugünkü_satış")}</p>
                <p className="text-xl font-bold">{formatPrice(3)},450</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-orange-200">Aktif Masa</p>
                <p className="text-xl font-bold">{tables.filter(t => t.status === 'occupied').length}/16</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-orange-200">{t("common.bekleyen_sipariş")}</p>
                <p className="text-xl font-bold">{orders.filter(o => o.status === 'preparing').length}</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 🎯 HIZLI ÖZET KARTLARI */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t("common.bugün_kazanç")}</p>
                <p className="text-2xl font-bold text-green-600">{formatPrice(3)},450</p>
              </div>
              <TrendingUp className="w-10 h-10 text-green-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Toplam Rezervasyon</p>
                <p className="text-2xl font-bold text-blue-600">{reservations.length}</p>
              </div>
              <Calendar className="w-10 h-10 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t("common.hazırlanan_sipariş")}</p>
                <p className="text-2xl font-bold text-yellow-600">{orders.filter(o => o.status === 'preparing').length}</p>
              </div>
              <ChefHat className="w-10 h-10 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-red-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t("common.müşteri_memnuniyeti")}</p>
                <p className="text-2xl font-bold text-red-600">4.7★</p>
              </div>
              <Star className="w-10 h-10 text-red-500" />
            </div>
          </div>
        </div>

        {/* 📋 RESTORAN MODÜL KARTLARI - HİÇ E-TİCARET MODÜLÜ YOK! */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {restaurantModules.map(module => <button key={module.id} onClick={() => navigate(module.path)} className={`${module.color} text-white rounded-xl p-6 text-left transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl`}>
              <div className="flex items-start justify-between mb-4">
                <module.icon className="w-8 h-8 flex-shrink-0" />
                <div className="text-right">
                  {module.count && <span className="bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs font-bold">
                      {module.count}
                    </span>}
                </div>
              </div>
              
              <h3 className="font-bold text-lg mb-2">{module.title}</h3>
              <p className="text-white text-opacity-90 text-sm leading-relaxed">
                {module.description}
              </p>
              
              {/* Modül özel badge'leri */}
              <div className="mt-3 flex flex-wrap gap-1">
                {module.pending && <span className="bg-yellow-500 px-2 py-1 rounded-full text-xs font-bold">
                    {module.pending} bekliyor
                  </span>}
                {module.ready && <span className="bg-green-500 px-2 py-1 rounded-full text-xs font-bold">
                    {module.ready}{t("common.hazır")}</span>}
                {module.low && <span className="bg-orange-500 px-2 py-1 rounded-full text-xs font-bold">
                    {module.low} az
                  </span>}
              </div>
            </button>)}
        </div>

        {/* 🏓 CANLI MASA DURUMU - E-ticaret sistemi hiç yok! */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Monitor className="w-6 h-6 mr-2 text-orange-600" />{t("common.canlı_masa_durumu")}</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {tables.map(table => <div key={table.id} className={`p-4 rounded-lg border-2 text-center ${getStatusColor(table.status)}`}>
                <p className="font-bold text-lg">Masa {table.number}</p>
                <p className="text-sm">{getStatusText(table.status)}</p>
                <p className="text-xs mt-1">{table.capacity}{t("common.kişilik")}</p>
                {table.waiter && <p className="text-xs mt-1 font-semibold">Garson: {table.waiter}</p>}
              </div>)}
          </div>
        </div>

        {/* 📋 SON RezervasyonLAR */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <Calendar className="w-6 h-6 mr-2 text-orange-600" />{t("common.bugünün_rezervasyonları")}</h2>
          
          <div className="space-y-3">
            {reservations.map(reservation => <div key={reservation.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${reservation.status === 'confirmed' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                  <div>
                    <p className="font-semibold">{reservation.customer}</p>
                    <p className="text-sm text-gray-600">{reservation.table} • {reservation.guests}{t("common.kişi")}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className="font-bold text-orange-600">{reservation.time}</p>
                  <p className="text-sm text-gray-500 capitalize">{reservation.status}</p>
                </div>
              </div>)}
          </div>
        </div>
      </div>
    </div>;
}