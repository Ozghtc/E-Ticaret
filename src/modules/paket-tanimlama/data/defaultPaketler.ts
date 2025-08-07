// Paket Tanımlama Modülü - Default Paket Verileri
import { Paket } from '../types';

export const createDefaultPackages = async (): Promise<Paket[]> => {
  const now = new Date().toISOString();
  
  console.log('createDefaultPackages çalışıyor...');
  
  return [
    // E-TİCARET PAKETLERİ
    {
      id: 'advantage-paket',
      adi: 'Advantage',
      fiyat: 2499,
      eskiFiyat: 3490,
      donem: 'aylık',
      populer: false,
      kampanya: 'Yıllık alımlarda 58.166₺ yerine 34.900₺',
      renk: 'green',
      kategori: 'eticaret' as const,
      createdAt: now,
      ozellikler: [
        { id: '1', baslik: '%0 Ertesi Gün Sanal Pos Oranı', aciklama: '', dahil: true },
        { id: '2', baslik: 'Ücretsiz E-Ticaret Eğitimleri', aciklama: '', dahil: true },
        { id: '3', baslik: '7/24 Canlı Destek', aciklama: '', dahil: true },
        { id: '4', baslik: '20.000₺ Kargo Bakiyesi Hediye!', aciklama: '', dahil: true },
        { id: '5', baslik: 'Ultra Güvenlik ve Hız', aciklama: '', dahil: true },
        { id: '6', baslik: 'Sınırsız Web Alanı ve Ürün', aciklama: '', dahil: true }
      ]
    },
    {
      id: 'premier-paket',
      adi: 'Premier',
      fiyat: 3499,
      eskiFiyat: 4990,
      donem: 'aylık',
      populer: true,
      kampanya: 'Advantage pakete ek olarak',
      renk: 'blue',
      kategori: 'eticaret' as const,
      createdAt: now,
      ozellikler: [
        { id: '1', baslik: '30.000₺ Kargo Bakiyesi Hediye!', aciklama: '', dahil: true },
        { id: '2', baslik: '2 Kargo Entegrasyonu', aciklama: '', dahil: true },
        { id: '3', baslik: 'Otomatik Sepet Hatırlatma', aciklama: '', dahil: true },
        { id: '4', baslik: 'Güvenilir Logo Sistemi', aciklama: '', dahil: true },
        { id: '5', baslik: 'Ticaret Entegrasyonları', aciklama: '', dahil: true },
        { id: '6', baslik: 'Google Araçları Entegrasyonu', aciklama: '', dahil: true }
      ]
    },
    {
      id: 'advance-paket',
      adi: 'Advance',
      fiyat: 5499,
      eskiFiyat: 7490,
      donem: 'aylık',
      populer: false,
      kampanya: 'Premier pakete ek olarak',
      renk: 'purple',
      kategori: 'eticaret' as const,
      createdAt: now,
      ozellikler: [
        { id: '1', baslik: '3 Yurt İçi Pazaryeri Entegrasyonu', aciklama: '', dahil: true },
        { id: '2', baslik: 'AI Destekli Ürün Açıklaması', aciklama: '', dahil: true },
        { id: '3', baslik: 'İleri Seviye Çapraz Satış', aciklama: '', dahil: true },
        { id: '4', baslik: '100.000₺ Faizsiz Kredi', aciklama: '', dahil: true },
        { id: '5', baslik: 'İndirimli Kargo Gönderimi', aciklama: '', dahil: true },
        { id: '6', baslik: 'Pazaryeri Otomasyonu', aciklama: '', dahil: true }
      ]
    },
    {
      id: 'advance-plus-paket',
      adi: 'Advance Plus',
      fiyat: 6499,
      eskiFiyat: 8990,
      donem: 'aylık',
      populer: false,
      kampanya: 'Advance pakete ek olarak',
      renk: 'orange',
      kategori: 'eticaret' as const,
      createdAt: now,
      ozellikler: [
        { id: '1', baslik: '5 Yurt İçi Pazaryeri Entegrasyonu', aciklama: '', dahil: true },
        { id: '2', baslik: 'E-İhracat Modülü', aciklama: '', dahil: true },
        { id: '3', baslik: 'IOS & Android Mobil Uygulama', aciklama: '', dahil: true },
        { id: '4', baslik: '100.000₺ Faizsiz Kredi & Destek', aciklama: '', dahil: true },
        { id: '5', baslik: 'Gelişmiş Kargo Entegrasyonu', aciklama: '', dahil: true },
        { id: '6', baslik: 'Premium Özellikler', aciklama: '', dahil: true }
      ]
    },

    // PREMIUM PAKETLERİ
    {
      id: 'prestige-premium',
      adi: 'Prestige',
      fiyat: 139000,
      eskiFiyat: 463333,
      donem: 'yıllık',
      populer: false,
      kampanya: '%70 İndirim - Responsive Özel Tasarım Hediye!',
      renk: 'indigo',
      kategori: 'premium' as const,
      createdAt: now,
      ozellikler: [
        { id: '1', baslik: 'Responsive Özel Tasarım Hediye!', aciklama: '', dahil: true },
        { id: '2', baslik: 'Nova Özel Tasarım', aciklama: '', dahil: true },
        { id: '3', baslik: 'Gelişmiş E-ihracat Özellikleri', aciklama: '', dahil: true },
        { id: '4', baslik: 'IOS&Android Mobil Uygulama', aciklama: '', dahil: true },
        { id: '5', baslik: 'Yapay Zeka Destekli Pazarlama Otomasyonu', aciklama: '', dahil: true },
        { id: '6', baslik: 'Sınırsız Yurt Dışı Pazaryeri Entegrasyonu', aciklama: '', dahil: true },
        { id: '7', baslik: 'Sınırsız Yurt İçi Pazaryeri Entegrasyonu', aciklama: '', dahil: true },
        { id: '8', baslik: '100.000₺ Kargo Bakiyesi Hediye!', aciklama: '', dahil: true }
      ]
    },
    {
      id: 'royal-premium',
      adi: 'Royal',
      fiyat: 599000,
      eskiFiyat: 799000,
      donem: 'yıllık',
      populer: true,
      kampanya: 'Yeni - Prestige pakete ek olarak',
      renk: 'blue',
      kategori: 'premium' as const,
      createdAt: now,
      ozellikler: [
        { id: '1', baslik: 'Markanıza Özel Tasarım Çözümleri', aciklama: '', dahil: true },
        { id: '2', baslik: 'Ücretsiz ERP Entegrasyonu', aciklama: '', dahil: true },
        { id: '3', baslik: 'Native Mobil Uygulama', aciklama: '', dahil: true },
        { id: '4', baslik: 'Öncelikli Destek Hizmeti', aciklama: '', dahil: true },
        { id: '5', baslik: 'Mağazadan Teslimat', aciklama: '', dahil: true },
        { id: '6', baslik: 'Mağazada Ödeme', aciklama: '', dahil: true },
        { id: '7', baslik: 'Gelişmiş Arama Sistemi', aciklama: '', dahil: true },
        { id: '8', baslik: '3 Ay V.I.P Hizmet', aciklama: '', dahil: true },
        { id: '9', baslik: 'Tüm Premium Modülleri', aciklama: '', dahil: true },
        { id: '10', baslik: 'Özel Native Premium Mobil Uygulama', aciklama: '', dahil: true }
      ]
    },
    {
      id: 'exclusive-premium',
      adi: 'Exclusive',
      fiyat: 0,
      donem: 'yıllık',
      populer: false,
      kampanya: 'Royal pakete ek olarak',
      renk: 'purple',
      kategori: 'premium' as const,
      createdAt: now,
      ozellikler: [
        { id: '1', baslik: '3 Ay V.I.P Hizmet', aciklama: '', dahil: true },
        { id: '2', baslik: 'Tüm Premium Modülleri', aciklama: '', dahil: true },
        { id: '3', baslik: 'Depo Yönetim Sistemi', aciklama: '', dahil: true },
        { id: '4', baslik: 'Konsinye Ürün Satışı', aciklama: '', dahil: true },
        { id: '5', baslik: 'Canlı Yayın Özelliği', aciklama: '', dahil: true },
        { id: '6', baslik: 'Omni Channel Modülü', aciklama: '', dahil: true },
        { id: '7', baslik: 'Tedarikçi Modülü', aciklama: '', dahil: true },
        { id: '8', baslik: 'Ürün Grubu & Özelleştirme', aciklama: '', dahil: true }
      ]
    },

    // SMS PAKETLERİ
    {
      id: 'sms-starter-paket',
      adi: 'SMS Starter',
      fiyat: 150,
      eskiFiyat: 200,
      donem: 'aylık',
      populer: false,
      kampanya: 'Müşterilerinize kolayca ulaşın!',
      renk: 'green',
      kategori: 'sms' as const,
      smsMiktari: 1000,
      createdAt: now,
      ozellikler: [
        { id: '1', baslik: '1.000 SMS Kredisi', aciklama: 'Aylık 1.000 adet SMS gönderim hakkı', dahil: true },
        { id: '2', baslik: 'Kampanya SMS\'leri', aciklama: 'Müşterilerinize özel kampanyalar', dahil: true },
        { id: '3', baslik: 'Kargo Durum Bildirimleri', aciklama: 'Otomatik kargo takip SMS\'leri', dahil: true },
        { id: '4', baslik: 'Toplu Gönderim', aciklama: 'Excel ile toplu numara yükleme', dahil: true },
        { id: '5', baslik: 'Gönderim Raporları', aciklama: 'Detaylı SMS istatistikleri', dahil: true },
        { id: '6', baslik: '7/24 Destek', aciklama: 'Teknik destek hizmeti', dahil: true }
      ]
    },
    {
      id: 'sms-professional-paket',
      adi: 'SMS Professional',
      fiyat: 600,
      eskiFiyat: 800,
      donem: 'aylık',
      populer: true,
      kampanya: 'En popüler seçim!',
      renk: 'blue',
      kategori: 'sms' as const,
      smsMiktari: 5000,
      createdAt: now,
      ozellikler: [
        { id: '1', baslik: '5.000 SMS Kredisi', aciklama: 'Aylık 5.000 adet SMS gönderim hakkı', dahil: true },
        { id: '2', baslik: 'SMS Templates', aciklama: 'Hazır mesaj şablonları', dahil: true },
        { id: '3', baslik: 'Zamanlı Gönderim', aciklama: 'İleri tarihli SMS planlama', dahil: true },
        { id: '4', baslik: 'Otomatik Tetikleyiciler', aciklama: 'Sipariş durumuna göre otomatik SMS', dahil: true },
        { id: '5', baslik: 'Müşteri Segmentasyonu', aciklama: 'Hedefli SMS gönderimi', dahil: true },
        { id: '6', baslik: 'API Entegrasyonu', aciklama: 'Kendi sisteminizle entegre', dahil: true },
        { id: '7', baslik: 'Gelişmiş Raporlama', aciklama: 'Detaylı analiz ve istatistikler', dahil: true }
      ]
    },
    {
      id: 'sms-enterprise-paket',
      adi: 'SMS Enterprise',
      fiyat: 1000,
      eskiFiyat: 1500,
      donem: 'aylık',
      populer: false,
      kampanya: 'Büyük işletmeler için!',
      renk: 'purple',
      kategori: 'sms' as const,
      smsMiktari: 10000,
      createdAt: now,
      ozellikler: [
        { id: '1', baslik: '10.000 SMS Kredisi', aciklama: 'Aylık 10.000 adet SMS gönderim hakkı', dahil: true },
        { id: '2', baslik: 'Kişiselleştirilmiş Gönderici Adı', aciklama: 'Marka adınızla SMS gönderimi', dahil: true },
        { id: '3', baslik: 'A/B Testing', aciklama: 'Mesaj performansını test edin', dahil: true },
        { id: '4', baslik: 'Müşteri Geri Kazanma', aciklama: 'İade ve sepet terk otomasyonu', dahil: true },
        { id: '5', baslik: 'CRM Entegrasyonu', aciklama: 'Müşteri veritabanı senkronizasyonu', dahil: true },
        { id: '6', baslik: 'Premium Destek', aciklama: 'Öncelikli teknik destek', dahil: true },
        { id: '7', baslik: 'Özel Çözümler', aciklama: 'İhtiyaçlarınıza özel geliştirme', dahil: true },
        { id: '8', baslik: 'Bulk SMS Fırsatları', aciklama: 'Büyük hacim için özel fiyatlar', dahil: true }
      ]
    }
  ];
};