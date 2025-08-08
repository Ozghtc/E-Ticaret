// Paket Tanımlama Modülü - Default Paket Verileri
import { Paket } from '../types';
import { useTranslation } from "react-i18next";
export const createDefaultPackages = async (): Promise<Paket[]> => {
  const now = new Date().toISOString();
  console.log(t("common.createdefaultpackages_çalışıyor"));
  return [
  // E-TİCARET PAKETLERİ
  {
    id: 'advantage-paket',
    adi: 'Advantage',
    fiyat: 2499,
    eskiFiyat: 3490,
    donem: 'aylık',
    populer: false,
    kampanya: t("common.yıllık_alımlarda_58_166_yerine_34_900"),
    renk: 'green',
    kategori: 'eticaret' as const,
    createdAt: now,
    ozellikler: [{
      id: '1',
      baslik: t("common.0_ertesi_gün_sanal_pos_oranı"),
      aciklama: '',
      dahil: true
    }, {
      id: '2',
      baslik: t("common.ücretsiz_e_ticaret_eğitimleri"),
      aciklama: '',
      dahil: true
    }, {
      id: '3',
      baslik: t("common.7_24_canlı_destek"),
      aciklama: '',
      dahil: true
    }, {
      id: '4',
      baslik: '20.000₺ Kargo Bakiyesi Hediye!',
      aciklama: '',
      dahil: true
    }, {
      id: '5',
      baslik: t("common.ultra_güvenlik_ve_hız"),
      aciklama: '',
      dahil: true
    }, {
      id: '6',
      baslik: t("common.sınırsız_web_alanı_ve_ürün"),
      aciklama: '',
      dahil: true
    }]
  }, {
    id: 'premier-paket',
    adi: 'Premier',
    fiyat: 3499,
    eskiFiyat: 4990,
    donem: 'aylık',
    populer: true,
    kampanya: t("common.advantage_pakete_ek_olarak"),
    renk: 'blue',
    kategori: 'eticaret' as const,
    createdAt: now,
    ozellikler: [{
      id: '1',
      baslik: '30.000₺ Kargo Bakiyesi Hediye!',
      aciklama: '',
      dahil: true
    }, {
      id: '2',
      baslik: '2 Kargo Entegrasyonu',
      aciklama: '',
      dahil: true
    }, {
      id: '3',
      baslik: t("common.otomatik_sepet_hatırlatma"),
      aciklama: '',
      dahil: true
    }, {
      id: '4',
      baslik: t("common.güvenilir_logo_sistemi"),
      aciklama: '',
      dahil: true
    }, {
      id: '5',
      baslik: t("common.ticaret_entegrasyonları"),
      aciklama: '',
      dahil: true
    }, {
      id: '6',
      baslik: t("common.google_araçları_entegrasyonu"),
      aciklama: '',
      dahil: true
    }]
  }, {
    id: 'advance-paket',
    adi: 'Advance',
    fiyat: 5499,
    eskiFiyat: 7490,
    donem: 'aylık',
    populer: false,
    kampanya: t("common.premier_pakete_ek_olarak"),
    renk: 'purple',
    kategori: 'eticaret' as const,
    createdAt: now,
    ozellikler: [{
      id: '1',
      baslik: t("common.3_yurt_i_çi_pazaryeri_entegrasyonu"),
      aciklama: '',
      dahil: true
    }, {
      id: '2',
      baslik: t("common.ai_destekli_ürün_açıklaması"),
      aciklama: '',
      dahil: true
    }, {
      id: '3',
      baslik: t("common.i_leri_seviye_çapraz_satış"),
      aciklama: '',
      dahil: true
    }, {
      id: '4',
      baslik: '100.000₺ Faizsiz Kredi',
      aciklama: '',
      dahil: true
    }, {
      id: '5',
      baslik: t("common.i_ndirimli_kargo_gönderimi"),
      aciklama: '',
      dahil: true
    }, {
      id: '6',
      baslik: 'Pazaryeri Otomasyonu',
      aciklama: '',
      dahil: true
    }]
  }, {
    id: 'advance-plus-paket',
    adi: 'Advance Plus',
    fiyat: 6499,
    eskiFiyat: 8990,
    donem: 'aylık',
    populer: false,
    kampanya: t("common.advance_pakete_ek_olarak"),
    renk: 'orange',
    kategori: 'eticaret' as const,
    createdAt: now,
    ozellikler: [{
      id: '1',
      baslik: t("common.5_yurt_i_çi_pazaryeri_entegrasyonu"),
      aciklama: '',
      dahil: true
    }, {
      id: '2',
      baslik: t("common.e_i_hracat_modülü"),
      aciklama: '',
      dahil: true
    }, {
      id: '3',
      baslik: 'IOS & Android Mobil Uygulama',
      aciklama: '',
      dahil: true
    }, {
      id: '4',
      baslik: '100.000₺ Faizsiz Kredi & Destek',
      aciklama: '',
      dahil: true
    }, {
      id: '5',
      baslik: t("common.gelişmiş_kargo_entegrasyonu"),
      aciklama: '',
      dahil: true
    }, {
      id: '6',
      baslik: t("common.premium_özellikler"),
      aciklama: '',
      dahil: true
    }]
  },
  // PREMIUM PAKETLERİ
  {
    id: 'prestige-premium',
    adi: 'Prestige',
    fiyat: 139000,
    eskiFiyat: 463333,
    donem: 'yıllık',
    populer: false,
    kampanya: t("common.70_i_ndirim_responsive_özel_tasarım_hediye"),
    renk: 'indigo',
    kategori: 'premium' as const,
    createdAt: now,
    ozellikler: [{
      id: '1',
      baslik: t("common.responsive_özel_tasarım_hediye"),
      aciklama: '',
      dahil: true
    }, {
      id: '2',
      baslik: t("common.nova_özel_tasarım"),
      aciklama: '',
      dahil: true
    }, {
      id: '3',
      baslik: t("common.gelişmiş_e_ihracat_özellikleri"),
      aciklama: '',
      dahil: true
    }, {
      id: '4',
      baslik: 'IOS&Android Mobil Uygulama',
      aciklama: '',
      dahil: true
    }, {
      id: '5',
      baslik: 'Yapay Zeka Destekli Pazarlama Otomasyonu',
      aciklama: '',
      dahil: true
    }, {
      id: '6',
      baslik: t("common.sınırsız_yurt_dışı_pazaryeri_entegrasyonu"),
      aciklama: '',
      dahil: true
    }, {
      id: '7',
      baslik: t("common.sınırsız_yurt_i_çi_pazaryeri_entegrasyonu"),
      aciklama: '',
      dahil: true
    }, {
      id: '8',
      baslik: '100.000₺ Kargo Bakiyesi Hediye!',
      aciklama: '',
      dahil: true
    }]
  }, {
    id: 'royal-premium',
    adi: 'Royal',
    fiyat: 599000,
    eskiFiyat: 799000,
    donem: 'yıllık',
    populer: true,
    kampanya: t("common.yeni_prestige_pakete_ek_olarak"),
    renk: 'blue',
    kategori: 'premium' as const,
    createdAt: now,
    ozellikler: [{
      id: '1',
      baslik: t("common.markanıza_özel_tasarım_çözümleri"),
      aciklama: '',
      dahil: true
    }, {
      id: '2',
      baslik: t("common.ücretsiz_erp_entegrasyonu"),
      aciklama: '',
      dahil: true
    }, {
      id: '3',
      baslik: 'Native Mobil Uygulama',
      aciklama: '',
      dahil: true
    }, {
      id: '4',
      baslik: t("common.öncelikli_destek_hizmeti"),
      aciklama: '',
      dahil: true
    }, {
      id: '5',
      baslik: t("common.mağazadan_teslimat"),
      aciklama: '',
      dahil: true
    }, {
      id: '6',
      baslik: t("common.mağazada_ödeme"),
      aciklama: '',
      dahil: true
    }, {
      id: '7',
      baslik: t("common.gelişmiş_arama_sistemi"),
      aciklama: '',
      dahil: true
    }, {
      id: '8',
      baslik: '3 Ay V.I.P Hizmet',
      aciklama: '',
      dahil: true
    }, {
      id: '9',
      baslik: t("common.tüm_premium_modülleri"),
      aciklama: '',
      dahil: true
    }, {
      id: '10',
      baslik: t("common.özel_native_premium_mobil_uygulama"),
      aciklama: '',
      dahil: true
    }]
  }, {
    id: 'exclusive-premium',
    adi: 'Exclusive',
    fiyat: 0,
    donem: 'yıllık',
    populer: false,
    kampanya: t("common.royal_pakete_ek_olarak"),
    renk: 'purple',
    kategori: 'premium' as const,
    createdAt: now,
    ozellikler: [{
      id: '1',
      baslik: '3 Ay V.I.P Hizmet',
      aciklama: '',
      dahil: true
    }, {
      id: '2',
      baslik: t("common.tüm_premium_modülleri"),
      aciklama: '',
      dahil: true
    }, {
      id: '3',
      baslik: t("common.depo_yönetim_sistemi"),
      aciklama: '',
      dahil: true
    }, {
      id: '4',
      baslik: t("common.konsinye_ürün_satışı"),
      aciklama: '',
      dahil: true
    }, {
      id: '5',
      baslik: t("common.canlı_yayın_özelliği"),
      aciklama: '',
      dahil: true
    }, {
      id: '6',
      baslik: t("common.omni_channel_modülü"),
      aciklama: '',
      dahil: true
    }, {
      id: '7',
      baslik: t("common.tedarikçi_modülü"),
      aciklama: '',
      dahil: true
    }, {
      id: '8',
      baslik: t("common.ürün_grubu_özelleştirme"),
      aciklama: '',
      dahil: true
    }]
  },
  // SMS PAKETLERİ
  {
    id: 'sms-starter-paket',
    adi: 'SMS Starter',
    fiyat: 150,
    eskiFiyat: 200,
    donem: 'adet' as const,
    populer: false,
    kampanya: t("common.müşterilerinize_kolayca_ulaşın"),
    renk: 'green',
    kategori: 'sms' as const,
    smsMiktari: 1000,
    smsGeçerlilikGunu: 30,
    smsTipi: 'standart' as const,
    createdAt: now,
    ozellikler: [{
      id: '1',
      baslik: '1.000 SMS Kredisi',
      aciklama: t("common.toplam_1_000_adet_sms_gönderim_hakkı"),
      dahil: true
    }, {
      id: '2',
      baslik: 'Kampanya SMS\'leri',
      aciklama: t("common.müşterilerinize_özel_kampanyalar"),
      dahil: true
    }, {
      id: '3',
      baslik: 'Kargo Durum Bildirimleri',
      aciklama: 'Otomatik kargo takip SMS\'leri',
      dahil: true
    }, {
      id: '4',
      baslik: t("common.toplu_gönderim"),
      aciklama: t("common.excel_ile_toplu_numara_yükleme"),
      dahil: true
    }, {
      id: '5',
      baslik: t("common.gönderim_raporları"),
      aciklama: t("common.detaylı_sms_istatistikleri"),
      dahil: true
    }, {
      id: '6',
      baslik: '7/24 Destek',
      aciklama: 'Teknik destek hizmeti',
      dahil: true
    }]
  }, {
    id: 'sms-professional-paket',
    adi: 'SMS Professional',
    fiyat: 600,
    eskiFiyat: 800,
    donem: 'adet' as const,
    populer: true,
    kampanya: t("common.en_popüler_seçim"),
    renk: 'blue',
    kategori: 'sms' as const,
    smsMiktari: 5000,
    smsGeçerlilikGunu: 60,
    smsTipi: 'toplu' as const,
    createdAt: now,
    ozellikler: [{
      id: '1',
      baslik: '5.000 SMS Kredisi',
      aciklama: t("common.toplam_5_000_adet_sms_gönderim_hakkı"),
      dahil: true
    }, {
      id: '2',
      baslik: 'SMS Templates',
      aciklama: t("common.hazır_mesaj_şablonları"),
      dahil: true
    }, {
      id: '3',
      baslik: t("common.zamanlı_gönderim"),
      aciklama: t("common.i_leri_tarihli_sms_planlama"),
      dahil: true
    }, {
      id: '4',
      baslik: 'Otomatik Tetikleyiciler',
      aciklama: t("common.sipariş_durumuna_göre_otomatik_sms"),
      dahil: true
    }, {
      id: '5',
      baslik: t("common.müşteri_segmentasyonu"),
      aciklama: t("common.hedefli_sms_gönderimi"),
      dahil: true
    }, {
      id: '6',
      baslik: 'API Entegrasyonu',
      aciklama: 'Kendi sisteminizle entegre',
      dahil: true
    }, {
      id: '7',
      baslik: t("common.gelişmiş_raporlama"),
      aciklama: t("common.detaylı_analiz_ve_istatistikler"),
      dahil: true
    }]
  }, {
    id: 'sms-enterprise-paket',
    adi: 'SMS Enterprise',
    fiyat: 1000,
    eskiFiyat: 1500,
    donem: 'adet' as const,
    populer: false,
    kampanya: t("common.büyük_işletmeler_için"),
    renk: 'purple',
    kategori: 'sms' as const,
    smsMiktari: 10000,
    smsGeçerlilikGunu: 90,
    smsTipi: 'otomatik' as const,
    createdAt: now,
    ozellikler: [{
      id: '1',
      baslik: '10.000 SMS Kredisi',
      aciklama: t("common.toplam_10_000_adet_sms_gönderim_hakkı"),
      dahil: true
    }, {
      id: '2',
      baslik: t("common.kişiselleştirilmiş_gönderici_adı"),
      aciklama: t("common.marka_adınızla_sms_gönderimi"),
      dahil: true
    }, {
      id: '3',
      baslik: 'A/B Testing',
      aciklama: t("common.mesaj_performansını_test_edin"),
      dahil: true
    }, {
      id: '4',
      baslik: t("common.müşteri_geri_kazanma"),
      aciklama: t("common.i_ade_ve_sepet_terk_otomasyonu"),
      dahil: true
    }, {
      id: '5',
      baslik: 'CRM Entegrasyonu',
      aciklama: t("common.müşteri_veritabanı_senkronizasyonu"),
      dahil: true
    }, {
      id: '6',
      baslik: 'Premium Destek',
      aciklama: t("common.öncelikli_teknik_destek"),
      dahil: true
    }, {
      id: '7',
      baslik: t("common.özel_çözümler"),
      aciklama: t("common.i_htiyaçlarınıza_özel_geliştirme"),
      dahil: true
    }, {
      id: '8',
      baslik: t("common.bulk_sms_fırsatları"),
      aciklama: t("common.büyük_hacim_için_özel_fiyatlar"),
      dahil: true
    }]
  }];
};