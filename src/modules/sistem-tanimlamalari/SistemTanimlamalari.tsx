import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Settings, Plus, Edit, Trash2, Save, X, Tag, Ruler, Palette as PaletteIcon, Package, Truck, CreditCard } from 'lucide-react';
import { useTranslation } from "react-i18next";
function SistemTanimlamalari() {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('kategoriler');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [newItem, setNewItem] = useState({
    name: '',
    description: '',
    color: '#3B82F6'
  });
  const [showSubcategoryModal, setShowSubcategoryModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [newSubcategory, setNewSubcategory] = useState({
    name: '',
    description: ''
  });
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Sample data - in real app this would come from database
  const [kategoriler, setKategoriler] = useState([{
    id: 1,
    name: '👕 Tekstil',
    description: t("common.giyim_ayakkabı_ve_aksesuar_ürünleri"),
    active: true,
    parentId: null,
    subcategories: [{
      id: 11,
      name: 'Giyim',
      description: t("common.kadın_erkek_ve_çocuk_giyim_ürünleri"),
      active: true,
      parentId: 1,
      subcategories: [{
        id: 111,
        name: t("common.kadın_giyim"),
        description: t("common.kadın_kıyafetleri"),
        active: true,
        parentId: 11
      }, {
        id: 112,
        name: 'Erkek Giyim',
        description: t("common.erkek_kıyafetleri"),
        active: true,
        parentId: 11
      }, {
        id: 113,
        name: t("common.çocuk_giyim"),
        description: t("common.çocuk_kıyafetleri"),
        active: true,
        parentId: 11
      }, {
        id: 114,
        name: t("common.i_ç_giyim"),
        description: t("common.i_ç_çamaşırı_ve_pijama"),
        active: true,
        parentId: 11
      }, {
        id: 115,
        name: t("common.eşofman"),
        description: t("common.spor_ve_günlük_eşofmanlar"),
        active: true,
        parentId: 11
      }]
    }, {
      id: 12,
      name: t("common.ayakkabı"),
      description: t("common.tüm_ayakkabı_çeşitleri"),
      active: true,
      parentId: 1,
      subcategories: [{
        id: 121,
        name: t("common.spor_ayakkabı"),
        description: t("common.koşu_ve_antrenman_ayakkabıları"),
        active: true,
        parentId: 12
      }, {
        id: 122,
        name: 'Sandalet',
        description: t("common.yazlık_sandalet_modelleri"),
        active: true,
        parentId: 12
      }, {
        id: 123,
        name: 'Bot',
        description: t("common.kışlık_bot_çeşitleri"),
        active: true,
        parentId: 12
      }, {
        id: 124,
        name: t("common.topuklu_ayakkabı"),
        description: t("common.kadın_topuklu_ayakkabıları"),
        active: true,
        parentId: 12
      }]
    }, {
      id: 13,
      name: 'Aksesuar',
      description: t("common.çanta_şapka_ve_diğer_aksesuarlar"),
      active: true,
      parentId: 1,
      subcategories: [{
        id: 131,
        name: t("common.çanta"),
        description: t("common.el_çantası_sırt_çantası_çeşitleri"),
        active: true,
        parentId: 13
      }, {
        id: 132,
        name: t("common.şapka"),
        description: t("common.bere_şapka_kasket_modelleri"),
        active: true,
        parentId: 13
      }, {
        id: 133,
        name: 'Kemer',
        description: t("common.kadın_ve_erkek_kemerleri"),
        active: true,
        parentId: 13
      }, {
        id: 134,
        name: t("common.gözlük"),
        description: t("common.güneş_gözlüğü_ve_optik_çerçeveler"),
        active: true,
        parentId: 13
      }]
    }]
  }, {
    id: 2,
    name: '💻 Teknoloji',
    description: t("common.bilgisayar_telefon_ve_teknoloji_ürünleri"),
    active: true,
    parentId: null,
    subcategories: [{
      id: 21,
      name: 'Bilgisayar',
      description: t("common.laptop_masaüstü_ve_mini_pc"),
      active: true,
      parentId: 2,
      subcategories: [{
        id: 211,
        name: 'Laptop',
        description: t("common.dizüstü_bilgisayarlar"),
        active: true,
        parentId: 21
      }, {
        id: 212,
        name: t("common.masaüstü"),
        description: t("common.masaüstü_bilgisayarlar"),
        active: true,
        parentId: 21
      }, {
        id: 213,
        name: 'Mini PC',
        description: 'Kompakt bilgisayarlar',
        active: true,
        parentId: 21
      }]
    }, {
      id: 22,
      name: 'Telefon',
      description: t("common.akıllı_telefon_ve_akıllı_saat"),
      active: true,
      parentId: 2,
      subcategories: [{
        id: 221,
        name: t("common.akıllı_telefon"),
        description: 'Smartphone modelleri',
        active: true,
        parentId: 22
      }, {
        id: 222,
        name: t("common.akıllı_saat"),
        description: t("common.smartwatch_çeşitleri"),
        active: true,
        parentId: 22
      }]
    }, {
      id: 23,
      name: 'Aksesuar',
      description: t("common.teknoloji_aksesuarları"),
      active: true,
      parentId: 2,
      subcategories: [{
        id: 231,
        name: t("common.kulaklık"),
        description: t("common.kablolu_ve_kablosuz_kulaklıklar"),
        active: true,
        parentId: 23
      }, {
        id: 232,
        name: 'Klavye',
        description: t("common.mekanik_ve_membran_klavyeler"),
        active: true,
        parentId: 23
      }, {
        id: 233,
        name: 'Powerbank',
        description: t("common.taşınabilir_şarj_cihazları"),
        active: true,
        parentId: 23
      }]
    }, {
      id: 24,
      name: t("common.tv_görüntü"),
      description: t("common.televizyon_ve_görüntü_cihazları"),
      active: true,
      parentId: 2,
      subcategories: [{
        id: 241,
        name: 'Smart TV',
        description: t("common.akıllı_televizyonlar"),
        active: true,
        parentId: 24
      }, {
        id: 242,
        name: t("common.projektör"),
        description: t("common.ev_ve_ofis_projektörleri"),
        active: true,
        parentId: 24
      }]
    }, {
      id: 25,
      name: t("common.akıllı_ev"),
      description: t("common.akıllı_ev_ürünleri"),
      active: true,
      parentId: 2,
      subcategories: [{
        id: 251,
        name: t("common.robot_süpürge"),
        description: t("common.otomatik_temizlik_robotları"),
        active: true,
        parentId: 25
      }, {
        id: 252,
        name: t("common.akıllı_priz"),
        description: t("common.uzaktan_kontrollü_prizler"),
        active: true,
        parentId: 25
      }]
    }]
  }, {
    id: 3,
    name: '🍪 Gıda',
    description: t("common.kuru_gıda_içecek_ve_atıştırmalık_ürünleri"),
    active: true,
    parentId: null,
    subcategories: [{
      id: 31,
      name: t("common.kuru_gıda"),
      description: t("common.bakliyat_pirinç_ve_tahıl_ürünleri"),
      active: true,
      parentId: 3,
      subcategories: [{
        id: 311,
        name: 'Bakliyat',
        description: 'Fasulye, nohut, mercimek',
        active: true,
        parentId: 31
      }, {
        id: 312,
        name: t("common.pirinç"),
        description: t("common.çeşitli_pirinç_türleri"),
        active: true,
        parentId: 31
      }, {
        id: 313,
        name: 'Bulgur',
        description: t("common.farklı_bulgur_çeşitleri"),
        active: true,
        parentId: 31
      }]
    }, {
      id: 32,
      name: t("common.i_çecek"),
      description: t("common.su_meyve_suyu_ve_süt_ürünleri"),
      active: true,
      parentId: 3,
      subcategories: [{
        id: 321,
        name: 'Su',
        description: t("common.i_çme_suyu_çeşitleri"),
        active: true,
        parentId: 32
      }, {
        id: 322,
        name: 'Meyve Suyu',
        description: t("common.doğal_ve_konsantre_meyve_suları"),
        active: true,
        parentId: 32
      }, {
        id: 323,
        name: t("common.süt"),
        description: t("common.tam_yağlı_yarım_yağlı_süt"),
        active: true,
        parentId: 32
      }]
    }, {
      id: 33,
      name: t("common.atıştırmalık"),
      description: t("common.cips_kuruyemiş_ve_bisküvi"),
      active: true,
      parentId: 3,
      subcategories: [{
        id: 331,
        name: 'Cips',
        description: t("common.patates_cipsi_çeşitleri"),
        active: true,
        parentId: 33
      }, {
        id: 332,
        name: t("common.kuruyemiş"),
        description: t("common.fındık_fıstık_badem"),
        active: true,
        parentId: 33
      }, {
        id: 333,
        name: t("common.bisküvi"),
        description: t("common.çikolatalı_sade_bisküviler"),
        active: true,
        parentId: 33
      }]
    }]
  }, {
    id: 4,
    name: '🧴 Kozmetik',
    description: t("common.cilt_bakımı_saç_bakımı_ve_makyaj_ürünleri"),
    active: true,
    parentId: null,
    subcategories: [{
      id: 41,
      name: t("common.cilt_bakımı"),
      description: t("common.krem_serum_ve_temizleyici_ürünler"),
      active: true,
      parentId: 4,
      subcategories: [{
        id: 411,
        name: 'Krem',
        description: t("common.nemlendirici_ve_anti_aging_kremler"),
        active: true,
        parentId: 41
      }, {
        id: 412,
        name: 'Serum',
        description: t("common.yoğunlaştırılmış_bakım_serumları"),
        active: true,
        parentId: 41
      }, {
        id: 413,
        name: 'Temizleyici',
        description: t("common.yüz_temizleme_ürünleri"),
        active: true,
        parentId: 41
      }]
    }, {
      id: 42,
      name: t("common.saç_bakımı"),
      description: t("common.şampuan_ve_saç_maskesi_ürünleri"),
      active: true,
      parentId: 4,
      subcategories: [{
        id: 421,
        name: t("common.şampuan"),
        description: t("common.farklı_saç_tipleri_için_şampuan"),
        active: true,
        parentId: 42
      }, {
        id: 422,
        name: 'Maske',
        description: t("common.besleyici_saç_maskeleri"),
        active: true,
        parentId: 42
      }]
    }, {
      id: 43,
      name: 'Makyaj',
      description: t("common.ruj_fondöten_ve_maskara_ürünleri"),
      active: true,
      parentId: 4,
      subcategories: [{
        id: 431,
        name: 'Ruj',
        description: t("common.mat_ve_parlak_ruj_çeşitleri"),
        active: true,
        parentId: 43
      }, {
        id: 432,
        name: t("common.fondöten"),
        description: t("common.farklı_ton_fondöten_ürünleri"),
        active: true,
        parentId: 43
      }, {
        id: 433,
        name: 'Maskara',
        description: t("common.uzatıcı_ve_kalınlaştırıcı_maskara"),
        active: true,
        parentId: 43
      }]
    }]
  }, {
    id: 5,
    name: '📚 Kırtasiye',
    description: t("common.yazı_gereçleri_defter_ve_sanat_malzemeleri"),
    active: true,
    parentId: null,
    subcategories: [{
      id: 51,
      name: t("common.yazı_gereçleri"),
      description: t("common.kalem_silgi_ve_fosforlu_kalem"),
      active: true,
      parentId: 5,
      subcategories: [{
        id: 511,
        name: 'Kalem',
        description: t("common.tükenmez_kurşun_kalem_çeşitleri"),
        active: true,
        parentId: 51
      }, {
        id: 512,
        name: 'Silgi',
        description: t("common.farklı_boyut_silgiler"),
        active: true,
        parentId: 51
      }, {
        id: 513,
        name: 'Fosforlu Kalem',
        description: t("common.renkli_işaretleme_kalemleri"),
        active: true,
        parentId: 51
      }]
    }, {
      id: 52,
      name: t("common.defter_kağıt"),
      description: t("common.spiralli_defter_ve_çizgili_kağıt"),
      active: true,
      parentId: 5,
      subcategories: [{
        id: 521,
        name: 'Spiralli Defter',
        description: t("common.farklı_sayfa_sayılı_defterler"),
        active: true,
        parentId: 52
      }, {
        id: 522,
        name: t("common.çizgili_kağıt"),
        description: t("common.a4_çizgili_kağıt_paketleri"),
        active: true,
        parentId: 52
      }]
    }, {
      id: 53,
      name: 'Sanat Malzemeleri',
      description: t("common.boya_fırça_ve_resim_defteri"),
      active: true,
      parentId: 5,
      subcategories: [{
        id: 531,
        name: 'Boya',
        description: t("common.sulu_boya_pastel_boya_çeşitleri"),
        active: true,
        parentId: 53
      }, {
        id: 532,
        name: t("common.fırça"),
        description: t("common.resim_fırçası_setleri"),
        active: true,
        parentId: 53
      }, {
        id: 533,
        name: 'Resim Defteri',
        description: t("common.çizim_ve_boyama_defterleri"),
        active: true,
        parentId: 53
      }]
    }]
  }, {
    id: 6,
    name: '🛋️ Mobilya',
    description: t("common.oturma_odası_yatak_odası_ve_çocuk_odası_mobilyaları"),
    active: true,
    parentId: null,
    subcategories: [{
      id: 61,
      name: t("common.oturma_odası"),
      description: t("common.koltuk_ve_tv_ünitesi"),
      active: true,
      parentId: 6,
      subcategories: [{
        id: 611,
        name: 'Koltuk',
        description: t("common.tekli_ikili_üçlü_koltuk_takımları"),
        active: true,
        parentId: 61
      }, {
        id: 612,
        name: t("common.tv_ünitesi"),
        description: t("common.modern_tv_sehpaları"),
        active: true,
        parentId: 61
      }]
    }, {
      id: 62,
      name: t("common.yatak_odası"),
      description: t("common.karyola_komodin_ve_dolap"),
      active: true,
      parentId: 6,
      subcategories: [{
        id: 621,
        name: 'Karyola',
        description: t("common.tek_ve_çift_kişilik_yataklar"),
        active: true,
        parentId: 62
      }, {
        id: 622,
        name: 'Komodin',
        description: t("common.yatak_yanı_komodin_modelleri"),
        active: true,
        parentId: 62
      }, {
        id: 623,
        name: 'Dolap',
        description: t("common.gardırop_ve_giyinme_odası"),
        active: true,
        parentId: 62
      }]
    }, {
      id: 63,
      name: t("common.çocuk_odası"),
      description: t("common.çalışma_masası_ve_ranza"),
      active: true,
      parentId: 6,
      subcategories: [{
        id: 631,
        name: t("common.çalışma_masası"),
        description: t("common.çocuk_ders_masaları"),
        active: true,
        parentId: 63
      }, {
        id: 632,
        name: 'Ranza',
        description: t("common.i_ki_katlı_çocuk_yatakları"),
        active: true,
        parentId: 63
      }]
    }]
  }, {
    id: 7,
    name: '🎮 Oyun & Konsol',
    description: t("common.konsollar_oyunlar_ve_aksesuarlar"),
    active: true,
    parentId: null,
    subcategories: [{
      id: 71,
      name: 'Konsollar',
      description: t("common.playstation_xbox_ve_nintendo"),
      active: true,
      parentId: 7,
      subcategories: [{
        id: 711,
        name: 'PlayStation',
        description: t("common.sony_playstation_konsolları"),
        active: true,
        parentId: 71
      }, {
        id: 712,
        name: 'Xbox',
        description: t("common.microsoft_xbox_konsolları"),
        active: true,
        parentId: 71
      }, {
        id: 713,
        name: 'Nintendo',
        description: t("common.nintendo_switch_ve_aksesuarları"),
        active: true,
        parentId: 71
      }]
    }, {
      id: 72,
      name: 'Oyunlar',
      description: t("common.dijital_kod_ve_fiziksel_cd"),
      active: true,
      parentId: 7,
      subcategories: [{
        id: 721,
        name: 'Dijital Kod',
        description: t("common.online_oyun_kodları"),
        active: true,
        parentId: 72
      }, {
        id: 722,
        name: 'Fiziksel CD',
        description: t("common.oyun_cd_ve_dvd_leri"),
        active: true,
        parentId: 72
      }]
    }, {
      id: 73,
      name: 'Aksesuarlar',
      description: t("common.kumanda_ve_headset"),
      active: true,
      parentId: 7,
      subcategories: [{
        id: 731,
        name: 'Kumanda',
        description: t("common.oyun_kumandaları"),
        active: true,
        parentId: 73
      }, {
        id: 732,
        name: 'Headset',
        description: t("common.gaming_kulaklıkları"),
        active: true,
        parentId: 73
      }]
    }]
  }, {
    id: 8,
    name: '🏠 Ev & Yaşam',
    description: t("common.ev_tekstili_dekorasyon_ve_mutfak_ürünleri"),
    active: true,
    parentId: null,
    subcategories: [{
      id: 81,
      name: 'Ev Tekstili',
      description: t("common.nevresim_yastık_ve_perde"),
      active: true,
      parentId: 8,
      subcategories: [{
        id: 811,
        name: 'Nevresim',
        description: t("common.çift_ve_tek_kişilik_nevresim_takımları"),
        active: true,
        parentId: 81
      }, {
        id: 812,
        name: t("common.yastık"),
        description: t("common.uyku_ve_dekoratif_yastıklar"),
        active: true,
        parentId: 81
      }, {
        id: 813,
        name: 'Perde',
        description: t("common.salon_ve_yatak_odası_perdeleri"),
        active: true,
        parentId: 81
      }]
    }, {
      id: 82,
      name: 'Dekorasyon',
      description: t("common.mum_tablo_ve_çerçeve"),
      active: true,
      parentId: 8,
      subcategories: [{
        id: 821,
        name: 'Mum',
        description: t("common.kokulu_ve_dekoratif_mumlar"),
        active: true,
        parentId: 82
      }, {
        id: 822,
        name: 'Tablo',
        description: t("common.duvar_tabloları_ve_posterler"),
        active: true,
        parentId: 82
      }, {
        id: 823,
        name: t("common.çerçeve"),
        description: t("common.fotoğraf_ve_tablo_çerçeveleri"),
        active: true,
        parentId: 82
      }]
    }, {
      id: 83,
      name: 'Mutfak',
      description: t("common.tencere_tabak_ve_bardak"),
      active: true,
      parentId: 8,
      subcategories: [{
        id: 831,
        name: 'Tencere',
        description: t("common.çelik_ve_granit_tencere_setleri"),
        active: true,
        parentId: 83
      }, {
        id: 832,
        name: 'Tabak',
        description: t("common.yemek_ve_servis_tabakları"),
        active: true,
        parentId: 83
      }, {
        id: 833,
        name: 'Bardak',
        description: t("common.su_çay_ve_kahve_bardakları"),
        active: true,
        parentId: 83
      }]
    }]
  }, {
    id: 9,
    name: '🍼 Anne & Bebek',
    description: t("common.bebek_giyim_bakım_ürünleri_ve_beslenme"),
    active: true,
    parentId: null,
    subcategories: [{
      id: 91,
      name: 'Bebek Giyim',
      description: t("common.zıbın_ve_tulum"),
      active: true,
      parentId: 9,
      subcategories: [{
        id: 911,
        name: t("common.zıbın"),
        description: t("common.yenidoğan_zıbın_setleri"),
        active: true,
        parentId: 91
      }, {
        id: 912,
        name: 'Tulum',
        description: 'Bebek tulum modelleri',
        active: true,
        parentId: 91
      }]
    }, {
      id: 92,
      name: t("common.bakım_ürünleri"),
      description: t("common.islak_mendil_ve_krem"),
      active: true,
      parentId: 9,
      subcategories: [{
        id: 921,
        name: 'Islak Mendil',
        description: 'Bebek temizlik mendilleri',
        active: true,
        parentId: 92
      }, {
        id: 922,
        name: 'Krem',
        description: t("common.bebek_bakım_kremleri"),
        active: true,
        parentId: 92
      }]
    }, {
      id: 93,
      name: 'Beslenme',
      description: t("common.mama_biberon_ve_emzik"),
      active: true,
      parentId: 9,
      subcategories: [{
        id: 931,
        name: 'Mama',
        description: t("common.bebek_maması_çeşitleri"),
        active: true,
        parentId: 93
      }, {
        id: 932,
        name: 'Biberon',
        description: t("common.cam_ve_plastik_biberonlar"),
        active: true,
        parentId: 93
      }, {
        id: 933,
        name: 'Emzik',
        description: 'Ortodontik emzik modelleri',
        active: true,
        parentId: 93
      }]
    }]
  }, {
    id: 10,
    name: '🚗 Otomotiv & Aksesuar',
    description: t("common.araç_aksesuarları_parçalar_ve_temizlik_ürünleri"),
    active: true,
    parentId: null,
    subcategories: [{
      id: 101,
      name: t("common.araç_aksesuarları"),
      description: t("common.koltuk_kılıfı_ve_cam_filmi"),
      active: true,
      parentId: 10,
      subcategories: [{
        id: 1011,
        name: t("common.koltuk_kılıfı"),
        description: t("common.deri_ve_kumaş_koltuk_kılıfları"),
        active: true,
        parentId: 101
      }, {
        id: 1012,
        name: 'Cam Filmi',
        description: t("common.güneş_koruyucu_cam_filmleri"),
        active: true,
        parentId: 101
      }]
    }, {
      id: 102,
      name: t("common.parçalar"),
      description: t("common.akü_ampul_ve_fren_diski"),
      active: true,
      parentId: 10,
      subcategories: [{
        id: 1021,
        name: t("common.akü"),
        description: t("common.araç_aküsü_çeşitleri"),
        active: true,
        parentId: 102
      }, {
        id: 1022,
        name: 'Ampul',
        description: t("common.far_ve_sinyal_ampulleri"),
        active: true,
        parentId: 102
      }, {
        id: 1023,
        name: 'Fren Diski',
        description: t("common.ön_ve_arka_fren_diskleri"),
        active: true,
        parentId: 102
      }]
    }, {
      id: 103,
      name: t("common.temizlik_bakım"),
      description: t("common.şampuan_ve_cilalama_spreyi"),
      active: true,
      parentId: 10,
      subcategories: [{
        id: 1031,
        name: t("common.şampuan"),
        description: t("common.araç_yıkama_şampuanları"),
        active: true,
        parentId: 103
      }, {
        id: 1032,
        name: 'Cilalama Spreyi',
        description: t("common.araç_cilalama_ürünleri"),
        active: true,
        parentId: 103
      }]
    }]
  }, {
    id: 11,
    name: '🧳 Seyahat & Outdoor',
    description: t("common.valiz_kamp_malzemeleri_ve_seyahat_aksesuarları"),
    active: true,
    parentId: null,
    subcategories: [{
      id: 111,
      name: 'Valiz',
      description: t("common.kabin_boy_orta_boy_ve_büyük_boy"),
      active: true,
      parentId: 11,
      subcategories: [{
        id: 1111,
        name: 'Kabin Boy',
        description: t("common.uçak_kabini_için_valiz"),
        active: true,
        parentId: 111
      }, {
        id: 1112,
        name: 'Orta Boy',
        description: 'Orta mesafe seyahat valizleri',
        active: true,
        parentId: 111
      }, {
        id: 1113,
        name: t("common.büyük_boy"),
        description: 'Uzun seyahat valizleri',
        active: true,
        parentId: 111
      }]
    }, {
      id: 112,
      name: 'Kamp Malzemeleri',
      description: t("common.çadır_mat_ve_kamp_ocağı"),
      active: true,
      parentId: 11,
      subcategories: [{
        id: 1121,
        name: t("common.çadır"),
        description: t("common.farklı_kişi_kapasiteli_çadırlar"),
        active: true,
        parentId: 112
      }, {
        id: 1122,
        name: 'Mat',
        description: t("common.uyku_matı_ve_yoga_matı"),
        active: true,
        parentId: 112
      }, {
        id: 1123,
        name: t("common.kamp_ocağı"),
        description: t("common.portatif_kamp_ocakları"),
        active: true,
        parentId: 112
      }]
    }, {
      id: 113,
      name: t("common.seyahat_aksesuarları"),
      description: t("common.seyahat_yastığı_ve_organizer"),
      active: true,
      parentId: 11,
      subcategories: [{
        id: 1131,
        name: t("common.seyahat_yastığı"),
        description: t("common.boyun_destekli_yastıklar"),
        active: true,
        parentId: 113
      }, {
        id: 1132,
        name: 'Organizer',
        description: t("common.valiz_düzenleyici_çantalar"),
        active: true,
        parentId: 113
      }]
    }]
  }, {
    id: 12,
    name: '🧘 Spor & Sağlık',
    description: t("common.spor_giyim_fitness_ekipmanı_ve_sağlık_ürünleri"),
    active: true,
    parentId: null,
    subcategories: [{
      id: 121,
      name: 'Spor Giyim',
      description: t("common.tayt_atlet_ve_spor_ayakkabı"),
      active: true,
      parentId: 12,
      subcategories: [{
        id: 1211,
        name: 'Tayt',
        description: t("common.kadın_ve_erkek_spor_taytları"),
        active: true,
        parentId: 121
      }, {
        id: 1212,
        name: 'Atlet',
        description: 'Spor atletleri',
        active: true,
        parentId: 121
      }, {
        id: 1213,
        name: t("common.spor_ayakkabı"),
        description: t("common.koşu_ve_antrenman_ayakkabıları"),
        active: true,
        parentId: 121
      }]
    }, {
      id: 122,
      name: t("common.fitness_ekipmanı"),
      description: t("common.dambıl_yoga_matı_ve_barfiks"),
      active: true,
      parentId: 12,
      subcategories: [{
        id: 1221,
        name: t("common.dambıl"),
        description: t("common.ayarlanabilir_dambıl_setleri"),
        active: true,
        parentId: 122
      }, {
        id: 1222,
        name: t("common.yoga_matı"),
        description: t("common.anti_slip_yoga_matları"),
        active: true,
        parentId: 122
      }, {
        id: 1223,
        name: 'Barfiks',
        description: t("common.kapı_barfiks_çubukları"),
        active: true,
        parentId: 122
      }]
    }, {
      id: 123,
      name: t("common.sağlık_ürünleri"),
      description: t("common.termometre_ve_tansiyon_aleti"),
      active: true,
      parentId: 12,
      subcategories: [{
        id: 1231,
        name: 'Termometre',
        description: t("common.dijital_termometre_çeşitleri"),
        active: true,
        parentId: 123
      }, {
        id: 1232,
        name: 'Tansiyon Aleti',
        description: t("common.dijital_tansiyon_ölçüm_cihazları"),
        active: true,
        parentId: 123
      }]
    }]
  }, {
    id: 13,
    name: '🐶 Evcil Hayvan Ürünleri',
    description: t("common.mama_oyuncak_ve_bakım_ürünleri"),
    active: true,
    parentId: null,
    subcategories: [{
      id: 131,
      name: 'Mama',
      description: t("common.kedi_maması_ve_köpek_maması"),
      active: true,
      parentId: 13,
      subcategories: [{
        id: 1311,
        name: t("common.kedi_maması"),
        description: t("common.yavru_ve_yetişkin_kedi_maması"),
        active: true,
        parentId: 131
      }, {
        id: 1312,
        name: t("common.köpek_maması"),
        description: t("common.küçük_ve_büyük_ırk_köpek_maması"),
        active: true,
        parentId: 131
      }]
    }, {
      id: 132,
      name: 'Oyuncak',
      description: t("common.top_ve_diş_kaşıyıcı"),
      active: true,
      parentId: 13,
      subcategories: [{
        id: 1321,
        name: 'Top',
        description: t("common.evcil_hayvan_oyun_topları"),
        active: true,
        parentId: 132
      }, {
        id: 1322,
        name: t("common.diş_kaşıyıcı"),
        description: t("common.köpek_diş_kaşıma_oyuncakları"),
        active: true,
        parentId: 132
      }]
    }, {
      id: 133,
      name: t("common.bakım_ürünleri"),
      description: t("common.tıraş_makinesi_ve_tüy_fırçası"),
      active: true,
      parentId: 13,
      subcategories: [{
        id: 1331,
        name: t("common.tıraş_makinesi"),
        description: t("common.evcil_hayvan_tıraş_makineleri"),
        active: true,
        parentId: 133
      }, {
        id: 1332,
        name: t("common.tüy_fırçası"),
        description: t("common.tüy_bakım_fırçaları"),
        active: true,
        parentId: 133
      }]
    }]
  }, {
    id: 14,
    name: '💍 Takı & Aksesuar',
    description: t("common.takı_gözlük_ve_saat_ürünleri"),
    active: true,
    parentId: null,
    subcategories: [{
      id: 141,
      name: t("common.takı"),
      description: t("common.kolye_küpe_ve_bileklik"),
      active: true,
      parentId: 14,
      subcategories: [{
        id: 1411,
        name: 'Kolye',
        description: t("common.altın_gümüş_ve_çelik_kolyeler"),
        active: true,
        parentId: 141
      }, {
        id: 1412,
        name: t("common.küpe"),
        description: t("common.sallantılı_ve_sade_küpe_modelleri"),
        active: true,
        parentId: 141
      }, {
        id: 1413,
        name: 'Bileklik',
        description: t("common.zincir_ve_charm_bileklikler"),
        active: true,
        parentId: 141
      }]
    }, {
      id: 142,
      name: t("common.gözlük"),
      description: t("common.güneş_gözlüğü_ve_numara_gözlüğü"),
      active: true,
      parentId: 14,
      subcategories: [{
        id: 1421,
        name: t("common.güneş_gözlüğü"),
        description: t("common.uv_korumalı_güneş_gözlükleri"),
        active: true,
        parentId: 142
      }, {
        id: 1422,
        name: t("common.numara_gözlüğü"),
        description: t("common.optik_çerçeve_modelleri"),
        active: true,
        parentId: 142
      }]
    }, {
      id: 143,
      name: 'Saat',
      description: t("common.akıllı_saat_ve_klasik_saat"),
      active: true,
      parentId: 14,
      subcategories: [{
        id: 1431,
        name: t("common.akıllı_saat"),
        description: t("common.fitness_ve_smartwatch_modelleri"),
        active: true,
        parentId: 143
      }, {
        id: 1432,
        name: 'Klasik Saat',
        description: t("common.analog_ve_dijital_saat_çeşitleri"),
        active: true,
        parentId: 143
      }]
    }]
  }]);
  const [bedenler, setBedenler] = useState([{
    id: 1,
    name: 'XS',
    description: 'Extra Small',
    category: 'Giyim',
    active: true
  }, {
    id: 2,
    name: 'S',
    description: 'Small',
    category: 'Giyim',
    active: true
  }, {
    id: 3,
    name: 'M',
    description: 'Medium',
    category: 'Giyim',
    active: true
  }, {
    id: 4,
    name: 'L',
    description: 'Large',
    category: 'Giyim',
    active: true
  }, {
    id: 5,
    name: 'XL',
    description: 'Extra Large',
    category: 'Giyim',
    active: true
  }, {
    id: 6,
    name: '36',
    description: '36 Numara',
    category: t("common.ayakkabı"),
    active: true
  }, {
    id: 7,
    name: '37',
    description: '37 Numara',
    category: t("common.ayakkabı"),
    active: true
  }, {
    id: 8,
    name: '38',
    description: '38 Numara',
    category: t("common.ayakkabı"),
    active: true
  }, {
    id: 9,
    name: '39',
    description: '39 Numara',
    category: t("common.ayakkabı"),
    active: true
  }, {
    id: 10,
    name: '40',
    description: '40 Numara',
    category: t("common.ayakkabı"),
    active: true
  }]);
  const [renkler, setRenkler] = useState([{
    id: 1,
    name: 'Siyah',
    description: 'Siyah renk',
    color: '#000000',
    active: true
  }, {
    id: 2,
    name: 'Beyaz',
    description: 'Beyaz renk',
    color: '#FFFFFF',
    active: true
  }, {
    id: 3,
    name: t("common.kırmızı"),
    description: t("common.kırmızı_renk"),
    color: '#EF4444',
    active: true
  }, {
    id: 4,
    name: 'Mavi',
    description: 'Mavi renk',
    color: '#3B82F6',
    active: true
  }, {
    id: 5,
    name: t("common.yeşil"),
    description: t("common.yeşil_renk"),
    color: '#10B981',
    active: true
  }, {
    id: 6,
    name: t("common.sarı"),
    description: t("common.sarı_renk"),
    color: '#F59E0B',
    active: true
  }, {
    id: 7,
    name: 'Pembe',
    description: 'Pembe renk',
    color: '#EC4899',
    active: true
  }, {
    id: 8,
    name: 'Gri',
    description: 'Gri renk',
    color: '#6B7280',
    active: true
  }]);
  const [markalar, setMarkalar] = useState([
  // Tekstil Markaları
  {
    id: 1,
    name: 'LC Waikiki',
    description: t("common.uygun_fiyatlı_moda_markası"),
    category: 'Tekstil',
    active: true
  }, {
    id: 2,
    name: 'Zara',
    description: t("common.fast_fashion_markası"),
    category: 'Tekstil',
    active: true
  }, {
    id: 3,
    name: 'Mavi',
    description: t("common.denim_ve_casual_giyim"),
    category: 'Tekstil',
    active: true
  },
  // Teknoloji Markaları
  {
    id: 4,
    name: 'Apple',
    description: t("common.premium_teknoloji_markası"),
    category: 'Teknoloji',
    active: true
  }, {
    id: 5,
    name: 'Samsung',
    description: t("common.elektronik_ve_teknoloji"),
    category: 'Teknoloji',
    active: true
  }, {
    id: 6,
    name: 'Lenovo',
    description: t("common.bilgisayar_ve_laptop_markası"),
    category: 'Teknoloji',
    active: true
  }, {
    id: 7,
    name: 'Xiaomi',
    description: t("common.akıllı_telefon_ve_teknoloji"),
    category: 'Teknoloji',
    active: true
  },
  // Gıda Markaları
  {
    id: 8,
    name: t("common.ülker"),
    description: t("common.gıda_ve_atıştırmalık_markası"),
    category: t("common.gıda"),
    active: true
  }, {
    id: 9,
    name: 'Torku',
    description: t("common.bisküvi_ve_şekerleme"),
    category: t("common.gıda"),
    active: true
  }, {
    id: 10,
    name: 'Eti',
    description: t("common.gıda_ürünleri_markası"),
    category: t("common.gıda"),
    active: true
  },
  // Kozmetik Markaları
  {
    id: 11,
    name: 'L\'Oréal',
    description: t("common.uluslararası_kozmetik_markası"),
    category: 'Kozmetik',
    active: true
  }, {
    id: 12,
    name: 'Nivea',
    description: t("common.cilt_bakım_ürünleri"),
    category: 'Kozmetik',
    active: true
  }, {
    id: 13,
    name: 'Golden Rose',
    description: t("common.makyaj_ürünleri_markası"),
    category: 'Kozmetik',
    active: true
  },
  // Kırtasiye Markaları
  {
    id: 14,
    name: 'Faber-Castell',
    description: t("common.yazı_gereçleri_markası"),
    category: t("common.kırtasiye"),
    active: true
  }, {
    id: 15,
    name: 'Stabilo',
    description: t("common.kalem_ve_işaretleme_ürünleri"),
    category: t("common.kırtasiye"),
    active: true
  }, {
    id: 16,
    name: 'Deli',
    description: t("common.ofis_ve_kırtasiye_malzemeleri"),
    category: t("common.kırtasiye"),
    active: true
  },
  // Mobilya Markaları
  {
    id: 17,
    name: 'IKEA',
    description: t("common.i_sveç_mobilya_markası"),
    category: 'Mobilya',
    active: true
  }, {
    id: 18,
    name: 'Bellona',
    description: t("common.türk_mobilya_markası"),
    category: 'Mobilya',
    active: true
  }, {
    id: 19,
    name: t("common.doğtaş"),
    description: t("common.mobilya_ve_dekorasyon"),
    category: 'Mobilya',
    active: true
  },
  // Oyun & Konsol Markaları
  {
    id: 20,
    name: 'Sony',
    description: t("common.playstation_ve_elektronik"),
    category: 'Oyun & Konsol',
    active: true
  }, {
    id: 21,
    name: 'Microsoft',
    description: t("common.xbox_ve_yazılım"),
    category: 'Oyun & Konsol',
    active: true
  }, {
    id: 22,
    name: 'Logitech',
    description: t("common.gaming_aksesuarları"),
    category: 'Oyun & Konsol',
    active: true
  },
  // Ev & Yaşam Markaları
  {
    id: 23,
    name: t("common.taç"),
    description: t("common.ev_tekstili_markası"),
    category: 'Ev & Yaşam',
    active: true
  }, {
    id: 24,
    name: 'Karaca',
    description: t("common.ev_eşyaları_ve_mutfak"),
    category: 'Ev & Yaşam',
    active: true
  }, {
    id: 25,
    name: t("common.paşabahçe"),
    description: t("common.cam_ve_mutfak_ürünleri"),
    category: 'Ev & Yaşam',
    active: true
  },
  // Anne & Bebek Markaları
  {
    id: 26,
    name: 'Baby Turco',
    description: t("common.bebek_bakım_ürünleri"),
    category: 'Anne & Bebek',
    active: true
  }, {
    id: 27,
    name: 'Philips Avent',
    description: t("common.bebek_beslenme_ürünleri"),
    category: 'Anne & Bebek',
    active: true
  }, {
    id: 28,
    name: 'Molfix',
    description: t("common.bebek_bezi_markası"),
    category: 'Anne & Bebek',
    active: true
  },
  // Otomotiv Markaları
  {
    id: 29,
    name: 'Bosch',
    description: t("common.otomotiv_parçaları"),
    category: 'Otomotiv & Aksesuar',
    active: true
  }, {
    id: 30,
    name: 'Castrol',
    description: t("common.motor_yağı_markası"),
    category: 'Otomotiv & Aksesuar',
    active: true
  }, {
    id: 31,
    name: 'Meguiar\'s',
    description: t("common.araç_bakım_ürünleri"),
    category: 'Otomotiv & Aksesuar',
    active: true
  },
  // Seyahat & Outdoor Markaları
  {
    id: 32,
    name: 'Samsonite',
    description: t("common.valiz_ve_seyahat_çantası"),
    category: 'Seyahat & Outdoor',
    active: true
  }, {
    id: 33,
    name: 'Decathlon',
    description: t("common.spor_ve_outdoor_ürünleri"),
    category: 'Seyahat & Outdoor',
    active: true
  }, {
    id: 34,
    name: 'Quechua',
    description: t("common.kamp_ve_doğa_sporları"),
    category: 'Seyahat & Outdoor',
    active: true
  },
  // Spor & Sağlık Markaları
  {
    id: 35,
    name: 'Nike',
    description: t("common.spor_giyim_ve_ayakkabı"),
    category: 'Spor & Sağlık',
    active: true
  }, {
    id: 36,
    name: 'Adidas',
    description: 'Spor malzemeleri',
    category: 'Spor & Sağlık',
    active: true
  }, {
    id: 37,
    name: 'Voit',
    description: t("common.fitness_ekipmanları"),
    category: 'Spor & Sağlık',
    active: true
  },
  // Evcil Hayvan Markaları
  {
    id: 38,
    name: 'Pro Plan',
    description: t("common.premium_pet_food_markası"),
    category: t("common.evcil_hayvan_ürünleri"),
    active: true
  }, {
    id: 39,
    name: 'Reflex',
    description: t("common.kedi_ve_köpek_maması"),
    category: t("common.evcil_hayvan_ürünleri"),
    active: true
  }, {
    id: 40,
    name: 'Royal Canin',
    description: t("common.veteriner_hekim_önerisi"),
    category: t("common.evcil_hayvan_ürünleri"),
    active: true
  },
  // Takı & Aksesuar Markaları
  {
    id: 41,
    name: 'Swatch',
    description: t("common.i_sviçre_saat_markası"),
    category: 'Takı & Aksesuar',
    active: true
  }, {
    id: 42,
    name: 'Fossil',
    description: t("common.saat_ve_aksesuar"),
    category: 'Takı & Aksesuar',
    active: true
  }, {
    id: 43,
    name: 'Daniel Klein',
    description: t("common.klasik_saat_markası"),
    category: 'Takı & Aksesuar',
    active: true
  }]);
  const [kargolar, setKargolar] = useState([{
    id: 1,
    name: 'Aras Kargo',
    description: 'Hızlı teslimat',
    price: 15,
    active: true
  }, {
    id: 2,
    name: 'MNG Kargo',
    description: t("common.güvenilir_teslimat"),
    price: 12,
    active: true
  }, {
    id: 3,
    name: 'PTT Kargo',
    description: 'Ekonomik teslimat',
    price: 10,
    active: true
  }, {
    id: 4,
    name: t("common.yurtiçi_kargo"),
    description: t("common.yaygın_ağ"),
    price: 14,
    active: true
  }]);
  const [odemeler, setOdemeler] = useState([{
    id: 1,
    name: t("common.kredi_kartı"),
    description: 'Visa, Mastercard, Troy',
    active: true
  }, {
    id: 2,
    name: t("common.banka_kartı"),
    description: 'Debit kartlar',
    active: true
  }, {
    id: 3,
    name: 'Havale/EFT',
    description: 'Banka havalesi',
    active: true
  }, {
    id: 4,
    name: t("common.kapıda_ödeme"),
    description: t("common.nakit_ödeme"),
    active: true
  }, {
    id: 5,
    name: 'Taksit',
    description: '2-12 ay taksit',
    active: true
  }]);
  const tabs = [{
    id: 'kategoriler',
    name: 'Kategoriler',
    icon: Tag,
    data: kategoriler,
    setData: setKategoriler
  }, {
    id: 'bedenler',
    name: 'Bedenler',
    icon: Ruler,
    data: bedenler,
    setData: setBedenler
  }, {
    id: 'renkler',
    name: 'Renkler',
    icon: PaletteIcon,
    data: renkler,
    setData: setRenkler
  }, {
    id: 'markalar',
    name: 'Markalar',
    icon: Package,
    data: markalar,
    setData: setMarkalar
  }, {
    id: 'kargolar',
    name: 'Kargo',
    icon: Truck,
    data: kargolar,
    setData: setKargolar
  }, {
    id: 'odemeler',
    name: t("common.ödeme"),
    icon: CreditCard,
    data: odemeler,
    setData: setOdemeler
  }];
  const getCurrentData = () => {
    const currentTab = tabs.find(tab => tab.id === activeTab);
    return currentTab ? currentTab.data : [];
  };
  const getCurrentSetData = () => {
    const currentTab = tabs.find(tab => tab.id === activeTab);
    return currentTab ? currentTab.setData : () => {};
  };
  const handleAdd = () => {
    if (!newItem.name.trim()) return;
    const currentData = getCurrentData();
    const setCurrentData = getCurrentSetData();
    const newId = Math.max(...currentData.map(item => item.id), 0) + 1;
    const itemToAdd = {
      id: newId,
      name: newItem.name,
      description: newItem.description,
      active: true,
      ...(activeTab === 'kategoriler' && {
        parentId: null,
        subcategories: []
      }),
      ...(activeTab === 'renkler' && {
        color: newItem.color
      }),
      ...(activeTab === 'bedenler' && {
        category: 'Giyim'
      }),
      ...(activeTab === 'kargolar' && {
        price: 15
      })
    };
    setCurrentData([...currentData, itemToAdd]);
    setNewItem({
      name: '',
      description: '',
      color: '#3B82F6'
    });
    setShowAddModal(false);
  };
  const handleEdit = item => {
    setEditingItem({
      ...item
    });
  };
  const handleSaveEdit = () => {
    if (!editingItem.name.trim()) return;
    const currentData = getCurrentData();
    const setCurrentData = getCurrentSetData();
    const updatedData = currentData.map(item => item.id === editingItem.id ? editingItem : item);
    setCurrentData(updatedData);
    setEditingItem(null);
  };
  const handleDelete = id => {
    if (confirm(t("common.bu_öğeyi_silmek_istediğinizden_emin_misiniz"))) {
      const currentData = getCurrentData();
      const setCurrentData = getCurrentSetData();
      const updatedData = currentData.filter(item => item.id !== id);
      setCurrentData(updatedData);
    }
  };
  const toggleActive = id => {
    const currentData = getCurrentData();
    const setCurrentData = getCurrentSetData();
    const updatedData = currentData.map(item => item.id === id ? {
      ...item,
      active: !item.active
    } : item);
    setCurrentData(updatedData);
  };
  const handleManageSubcategories = category => {
    setSelectedCategory(category);
    setShowSubcategoryModal(true);
  };
  const handleAddSubcategory = () => {
    if (!newSubcategory.name.trim() || !selectedCategory) return;
    const newId = Math.max(...kategoriler.flatMap(cat => cat.subcategories?.map(sub => sub.id) || []), 0) + 1;
    const subcategoryToAdd = {
      id: newId,
      name: newSubcategory.name,
      description: newSubcategory.description,
      active: true,
      parentId: selectedCategory.id
    };
    const updatedKategoriler = kategoriler.map(cat => cat.id === selectedCategory.id ? {
      ...cat,
      subcategories: [...(cat.subcategories || []), subcategoryToAdd]
    } : cat);
    setKategoriler(updatedKategoriler);
    setNewSubcategory({
      name: '',
      description: ''
    });
  };
  const handleDeleteSubcategory = subcategoryId => {
    if (!confirm(t("common.bu_alt_kategoriyi_silmek_istediğinizden_emin_misiniz"))) return;
    const updatedKategoriler = kategoriler.map(cat => cat.id === selectedCategory.id ? {
      ...cat,
      subcategories: cat.subcategories?.filter(sub => sub.id !== subcategoryId) || []
    } : cat);
    setKategoriler(updatedKategoriler);
  };
  const toggleSubcategoryActive = subcategoryId => {
    const updatedKategoriler = kategoriler.map(cat => cat.id === selectedCategory.id ? {
      ...cat,
      subcategories: cat.subcategories?.map(sub => sub.id === subcategoryId ? {
        ...sub,
        active: !sub.active
      } : sub) || []
    } : cat);
    setKategoriler(updatedKategoriler);
  };
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-teal-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin" className="flex items-center text-white hover:text-teal-200 mr-6">
                <ArrowLeft size={20} className="mr-2" />
                Geri Dön
              </Link>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-bold text-white">{t("common.altıntassoft")}</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="bg-teal-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Settings className="w-10 h-10 text-teal-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{t("common.sistem_tanımlamaları")}</h1>
          <p className="text-gray-600 text-lg">{t("common.kategoriler_bedenler_renkler_ve_diğer_sistem_ayarları")}</p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-lg mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map(tab => <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`py-4 px-2 border-b-2 font-medium text-sm flex items-center space-x-2 ${activeTab === tab.id ? 'border-teal-500 text-teal-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>
                  <tab.icon size={16} />
                  <span>{tab.name}</span>
                  <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                    {getCurrentData().length}
                  </span>
                </button>)}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {tabs.find(tab => tab.id === activeTab)?.name}{t("common.yönetimi")}</h2>
              <button onClick={() => setShowAddModal(true)} className="bg-teal-600 text-white px-4 py-2 rounded-lg hover:bg-teal-700 transition-colors flex items-center space-x-2">
                <Plus size={16} />
                <span>Yeni Ekle</span>
              </button>
            </div>

            {/* Items List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {getCurrentData().map(item => <div key={item.id} className={`border rounded-lg p-4 ${item.active ? 'bg-white' : 'bg-gray-50'} ${activeTab === 'kategoriler' && item.subcategories ? 'border-l-4 border-l-teal-500' : ''}`}>
                  {editingItem && editingItem.id === item.id ?
              // Edit Mode
              <div className="space-y-3">
                      <input type="text" value={editingItem.name} onChange={e => setEditingItem({
                  ...editingItem,
                  name: e.target.value
                })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500" />
                      <textarea value={editingItem.description} onChange={e => setEditingItem({
                  ...editingItem,
                  description: e.target.value
                })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500" rows={2} />
                      {activeTab === 'renkler' && <input type="color" value={editingItem.color} onChange={e => setEditingItem({
                  ...editingItem,
                  color: e.target.value
                })} className="w-full h-10 border border-gray-300 rounded-md" />}
                      <div className="flex space-x-2">
                        <button onClick={handleSaveEdit} className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 flex items-center space-x-1">
                          <Save size={14} />
                          <span>Kaydet</span>
                        </button>
                        <button onClick={() => setEditingItem(null)} className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700 flex items-center space-x-1">
                          <X size={14} />
                          <span>{t("common.i_ptal")}</span>
                        </button>
                      </div>
                    </div> :
              // View Mode
              <div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900 flex items-center space-x-2">
                          {activeTab === 'renkler' && <div className="w-4 h-4 rounded-full border border-gray-300" style={{
                      backgroundColor: item.color
                    }} />}
                          <span>{item.name}</span>
                        </h3>
                        <div className="flex items-center space-x-1">
                          <button onClick={() => toggleActive(item.id)} className={`px-2 py-1 rounded text-xs font-medium ${item.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {item.active ? 'Aktif' : 'Pasif'}
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                      {activeTab === 'bedenler' && item.category && <p className="text-xs text-gray-500 mb-3">Kategori: {item.category}</p>}
                      {activeTab === 'kargolar' && item.price && <p className="text-xs text-gray-500 mb-3">Fiyat: {item.price} TL</p>}
                      {activeTab === 'kategoriler' && item.subcategories && <div className="mb-3">
                          <p className="text-xs text-gray-500 mb-2">Alt Kategoriler ({item.subcategories.length}):</p>
                          <div className="flex flex-wrap gap-1">
                            {item.subcategories.slice(0, 3).map(sub => <span key={sub.id} className="text-xs bg-teal-100 text-teal-800 px-2 py-1 rounded-full">
                                {sub.name}
                              </span>)}
                            {item.subcategories.length > 3 && <span className="text-xs text-gray-500">+{item.subcategories.length - 3} daha</span>}
                          </div>
                        </div>}
                      <div className="flex space-x-2">
                        <button onClick={() => handleEdit(item)} className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center space-x-1">
                          <Edit size={14} />
                          <span>{t("common.düzenle")}</span>
                        </button>
                        <button onClick={() => handleDelete(item.id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 flex items-center space-x-1">
                          <Trash2 size={14} />
                          <span>Sil</span>
                        </button>
                        {activeTab === 'kategoriler' && item.subcategories && <button onClick={() => handleManageSubcategories(item)} className="bg-teal-600 text-white px-3 py-1 rounded text-sm hover:bg-teal-700 flex items-center space-x-1">
                            <Tag size={14} />
                            <span>Alt Kat.</span>
                          </button>}
                      </div>
                    </div>}
                </div>)}
            </div>
          </div>
        </div>

        {/* Development Info */}
        <div className="bg-teal-50 border border-teal-200 rounded-lg p-6">
          <h3 className="font-semibold text-teal-800 mb-2">{t("common.geliştirme_durumu")}</h3>
          <div className="text-sm text-teal-700 space-y-2">
            <p>{t("common.temel_crud_işlemleri_ekleme_düzenleme_silme")}</p>
            <p>{t("common.aktif_pasif_durumu_yönetimi")}</p>
            <p>{t("common.6_farklı_tanımlama_kategorisi")}</p>
            <p>{t("common.hiyerarşik_kategori_yapısı_ana_alt_kategoriler")}</p>
            <p>{t("common.alt_kategori_görüntüleme_ve_sayaçları")}</p>
            <p>{t("common.database_entegrasyonu_yapılacak")}</p>
            <p>{t("common.alt_kategori_yönetim_modalı")}</p>
            <p>{t("common.toplu_işlemler_eklenecek")}</p>
            <p>{t("common.i_çe_dışa_aktarma_özelliği")}</p>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      {showAddModal && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">
                Yeni {tabs.find(tab => tab.id === activeTab)?.name} Ekle
              </h3>
              <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600">
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                <input type="text" value={newItem.name} onChange={e => setNewItem({
              ...newItem,
              name: e.target.value
            })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500" placeholder="Ad girin" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t("common.açıklama")}</label>
                <textarea value={newItem.description} onChange={e => setNewItem({
              ...newItem,
              description: e.target.value
            })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500" rows={3} placeholder={t("common.açıklama_girin")} />
              </div>
              
              {activeTab === 'renkler' && <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Renk</label>
                  <input type="color" value={newItem.color} onChange={e => setNewItem({
              ...newItem,
              color: e.target.value
            })} className="w-full h-10 border border-gray-300 rounded-md" />
                </div>}
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button onClick={handleAdd} className="flex-1 bg-teal-600 text-white py-2 rounded-md hover:bg-teal-700 transition-colors">
                Ekle
              </button>
              <button onClick={() => setShowAddModal(false)} className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400 transition-colors">{t("common.i_ptal")}</button>
            </div>
          </div>
        </div>}

      {/* Subcategory Management Modal */}
      {showSubcategoryModal && selectedCategory && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-xl font-semibold">
                {selectedCategory.name} - Alt Kategoriler
              </h3>
              <button onClick={() => {
            setShowSubcategoryModal(false);
            setSelectedCategory(null);
            setNewSubcategory({
              name: '',
              description: ''
            });
          }} className="text-gray-400 hover:text-gray-600">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6 max-h-96 overflow-y-auto">
              {/* Add New Subcategory */}
              <div className="bg-gray-50 rounded-lg p-4 mb-6">
                <h4 className="font-medium text-gray-900 mb-4">Yeni Alt Kategori Ekle</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad</label>
                    <input type="text" value={newSubcategory.name} onChange={e => setNewSubcategory({
                  ...newSubcategory,
                  name: e.target.value
                })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500" placeholder={t("common.alt_kategori_adı")} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">{t("common.açıklama")}</label>
                    <input type="text" value={newSubcategory.description} onChange={e => setNewSubcategory({
                  ...newSubcategory,
                  description: e.target.value
                })} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500" placeholder={t("common.açıklama")} />
                  </div>
                </div>
                <button onClick={handleAddSubcategory} className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors flex items-center space-x-2">
                  <Plus size={16} />
                  <span>Alt Kategori Ekle</span>
                </button>
              </div>

              {/* Existing Subcategories */}
              <div>
                <h4 className="font-medium text-gray-900 mb-4">
                  Mevcut Alt Kategoriler ({selectedCategory.subcategories?.length || 0})
                </h4>
                {selectedCategory.subcategories && selectedCategory.subcategories.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {selectedCategory.subcategories.map(subcategory => <div key={subcategory.id} className={`border rounded-lg p-4 ${subcategory.active ? 'bg-white' : 'bg-gray-50'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium text-gray-900">{subcategory.name}</h5>
                          <button onClick={() => toggleSubcategoryActive(subcategory.id)} className={`px-2 py-1 rounded text-xs font-medium ${subcategory.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                            {subcategory.active ? 'Aktif' : 'Pasif'}
                          </button>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{subcategory.description}</p>
                        <div className="flex space-x-2">
                          <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700 flex items-center space-x-1">
                            <Edit size={12} />
                            <span>{t("common.düzenle")}</span>
                          </button>
                          <button onClick={() => handleDeleteSubcategory(subcategory.id)} className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 flex items-center space-x-1">
                            <Trash2 size={12} />
                            <span>Sil</span>
                          </button>
                        </div>
                      </div>)}
                  </div> : <div className="text-center py-8 text-gray-500">
                    <Tag size={48} className="mx-auto mb-4 text-gray-300" />
                    <p>{t("common.henüz_alt_kategori_eklenmemiş")}</p>
                  </div>}
              </div>
            </div>
            
            <div className="p-6 border-t border-gray-200 flex justify-end">
              <button onClick={() => {
            setShowSubcategoryModal(false);
            setSelectedCategory(null);
            setNewSubcategory({
              name: '',
              description: ''
            });
          }} className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors">
                Kapat
              </button>
            </div>
          </div>
        </div>}
    </div>;
}
export default SistemTanimlamalari;