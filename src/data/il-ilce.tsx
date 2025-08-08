// 🇹🇷 Türkiye İl-İlçe Listesi - TSX Format
// Tüm 81 il ve ilçeleri için merkezi veri kaynağı

export interface Il {
  id: number;
  name: string;
  code: string;
  region: string;
  plateCode: string;
  population?: number;
  ilceler?: Ilce[];
}
export interface Ilce {
  id: number;
  name: string;
  ilId: number;
  type: 'merkez' | 'ilce' | 'belde';
  population?: number;
}

// 🏙️ Türkiye'nin 81 İli (Alfabetik Sırada)
export const TURKIYE_ILLERI: Il[] = [{
  id: 1,
  name: 'Adana',
  code: 'adana',
  region: 'Akdeniz',
  plateCode: '01'
}, {
  id: 2,
  name: "Adıyaman",
  code: 'adiyaman',
  region: "Güneydoğu Anadolu",
  plateCode: '02'
}, {
  id: 3,
  name: 'Afyonkarahisar',
  code: 'afyonkarahisar',
  region: 'Ege',
  plateCode: '03'
}, {
  id: 4,
  name: "Ağrı",
  code: 'agri',
  region: "Doğu Anadolu",
  plateCode: '04'
}, {
  id: 5,
  name: 'Aksaray',
  code: 'aksaray',
  region: "İç Anadolu",
  plateCode: '68'
}, {
  id: 6,
  name: 'Amasya',
  code: 'amasya',
  region: 'Karadeniz',
  plateCode: '05'
}, {
  id: 7,
  name: 'Ankara',
  code: 'ankara',
  region: "İç Anadolu",
  plateCode: '06'
}, {
  id: 8,
  name: 'Antalya',
  code: 'antalya',
  region: 'Akdeniz',
  plateCode: '07'
}, {
  id: 9,
  name: 'Ardahan',
  code: 'ardahan',
  region: "Doğu Anadolu",
  plateCode: '75'
}, {
  id: 10,
  name: 'Artvin',
  code: 'artvin',
  region: 'Karadeniz',
  plateCode: '08'
}, {
  id: 11,
  name: "aydın",
  code: 'aydin',
  region: 'Ege',
  plateCode: '09'
}, {
  id: 12,
  name: "balıkesir",
  code: 'balikesir',
  region: 'Marmara',
  plateCode: '10'
}, {
  id: 13,
  name: "bartın",
  code: 'bartin',
  region: 'Karadeniz',
  plateCode: '74'
}, {
  id: 14,
  name: 'Batman',
  code: 'batman',
  region: "Güneydoğu Anadolu",
  plateCode: '72'
}, {
  id: 15,
  name: 'Bayburt',
  code: 'bayburt',
  region: 'Karadeniz',
  plateCode: '69'
}, {
  id: 16,
  name: 'Bilecik',
  code: 'bilecik',
  region: 'Marmara',
  plateCode: '11'
}, {
  id: 17,
  name: "bingöl",
  code: 'bingol',
  region: "Doğu Anadolu",
  plateCode: '12'
}, {
  id: 18,
  name: 'Bitlis',
  code: 'bitlis',
  region: "Doğu Anadolu",
  plateCode: '13'
}, {
  id: 19,
  name: 'Bolu',
  code: 'bolu',
  region: 'Karadeniz',
  plateCode: '14'
}, {
  id: 20,
  name: 'Burdur',
  code: 'burdur',
  region: 'Akdeniz',
  plateCode: '15'
}, {
  id: 21,
  name: 'Bursa',
  code: 'bursa',
  region: 'Marmara',
  plateCode: '16'
}, {
  id: 22,
  name: "çanakkale",
  code: 'canakkale',
  region: 'Marmara',
  plateCode: '17'
}, {
  id: 23,
  name: "çankırı",
  code: 'cankiri',
  region: "İç Anadolu",
  plateCode: '18'
}, {
  id: 24,
  name: "çorum",
  code: 'corum',
  region: 'Karadeniz',
  plateCode: '19'
}, {
  id: 25,
  name: 'Denizli',
  code: 'denizli',
  region: 'Ege',
  plateCode: '20'
}, {
  id: 26,
  name: "Diyarbakır",
  code: 'diyarbakir',
  region: "Güneydoğu Anadolu",
  plateCode: '21'
}, {
  id: 27,
  name: "düzce",
  code: 'duzce',
  region: 'Karadeniz',
  plateCode: '81'
}, {
  id: 28,
  name: 'Edirne',
  code: 'edirne',
  region: 'Marmara',
  plateCode: '22'
}, {
  id: 29,
  name: "elazığ",
  code: 'elazig',
  region: "Doğu Anadolu",
  plateCode: '23'
}, {
  id: 30,
  name: 'Erzincan',
  code: 'erzincan',
  region: "Doğu Anadolu",
  plateCode: '24'
}, {
  id: 31,
  name: 'Erzurum',
  code: 'erzurum',
  region: "Doğu Anadolu",
  plateCode: '25'
}, {
  id: 32,
  name: "eskişehir",
  code: 'eskisehir',
  region: "İç Anadolu",
  plateCode: '26'
}, {
  id: 33,
  name: 'Gaziantep',
  code: 'gaziantep',
  region: "Güneydoğu Anadolu",
  plateCode: '27'
}, {
  id: 34,
  name: 'Giresun',
  code: 'giresun',
  region: 'Karadeniz',
  plateCode: '28'
}, {
  id: 35,
  name: "gümüşhane",
  code: 'gumushane',
  region: 'Karadeniz',
  plateCode: '29'
}, {
  id: 36,
  name: 'Hakkari',
  code: 'hakkari',
  region: "Doğu Anadolu",
  plateCode: '30'
}, {
  id: 37,
  name: 'Hatay',
  code: 'hatay',
  region: 'Akdeniz',
  plateCode: '31'
}, {
  id: 38,
  name: "iğdır",
  code: 'igdir',
  region: "Doğu Anadolu",
  plateCode: '76'
}, {
  id: 39,
  name: 'Isparta',
  code: 'isparta',
  region: 'Akdeniz',
  plateCode: '32'
}, {
  id: 40,
  name: "İstanbul",
  code: 'istanbul',
  region: 'Marmara',
  plateCode: '34'
}, {
  id: 41,
  name: "İzmir",
  code: 'izmir',
  region: 'Ege',
  plateCode: '35'
}, {
  id: 42,
  name: "kahramanmaraş",
  code: 'kahramanmaras',
  region: 'Akdeniz',
  plateCode: '46'
}, {
  id: 43,
  name: "karabük",
  code: 'karabuk',
  region: 'Karadeniz',
  plateCode: '78'
}, {
  id: 44,
  name: 'Karaman',
  code: 'karaman',
  region: "İç Anadolu",
  plateCode: '70'
}, {
  id: 45,
  name: 'Kars',
  code: 'kars',
  region: "Doğu Anadolu",
  plateCode: '36'
}, {
  id: 46,
  name: 'Kastamonu',
  code: 'kastamonu',
  region: 'Karadeniz',
  plateCode: '37'
}, {
  id: 47,
  name: 'Kayseri',
  code: 'kayseri',
  region: "İç Anadolu",
  plateCode: '38'
}, {
  id: 48,
  name: 'Kilis',
  code: 'kilis',
  region: "Güneydoğu Anadolu",
  plateCode: '79'
}, {
  id: 49,
  name: "kırıkkale",
  code: 'kirikkale',
  region: "İç Anadolu",
  plateCode: '71'
}, {
  id: 50,
  name: "kırklareli",
  code: 'kirklareli',
  region: 'Marmara',
  plateCode: '39'
}, {
  id: 51,
  name: "kırşehir",
  code: 'kirsehir',
  region: "İç Anadolu",
  plateCode: '40'
}, {
  id: 52,
  name: 'Kocaeli',
  code: 'kocaeli',
  region: 'Marmara',
  plateCode: '41'
}, {
  id: 53,
  name: 'Konya',
  code: 'konya',
  region: "İç Anadolu",
  plateCode: '42'
}, {
  id: 54,
  name: "kütahya",
  code: 'kutahya',
  region: 'Ege',
  plateCode: '43'
}, {
  id: 55,
  name: 'Malatya',
  code: 'malatya',
  region: "Doğu Anadolu",
  plateCode: '44'
}, {
  id: 56,
  name: 'Manisa',
  code: 'manisa',
  region: 'Ege',
  plateCode: '45'
}, {
  id: 57,
  name: 'Mardin',
  code: 'mardin',
  region: "Güneydoğu Anadolu",
  plateCode: '47'
}, {
  id: 58,
  name: 'Mersin',
  code: 'mersin',
  region: 'Akdeniz',
  plateCode: '33'
}, {
  id: 59,
  name: "muğla",
  code: 'mugla',
  region: 'Ege',
  plateCode: '48'
}, {
  id: 60,
  name: "muş",
  code: 'mus',
  region: "Doğu Anadolu",
  plateCode: '49'
}, {
  id: 61,
  name: "nevşehir",
  code: 'nevsehir',
  region: "İç Anadolu",
  plateCode: '50'
}, {
  id: 62,
  name: "niğde",
  code: 'nigde',
  region: "İç Anadolu",
  plateCode: '51'
}, {
  id: 63,
  name: 'Ordu',
  code: 'ordu',
  region: 'Karadeniz',
  plateCode: '52'
}, {
  id: 64,
  name: 'Osmaniye',
  code: 'osmaniye',
  region: 'Akdeniz',
  plateCode: '80'
}, {
  id: 65,
  name: 'Rize',
  code: 'rize',
  region: 'Karadeniz',
  plateCode: '53'
}, {
  id: 66,
  name: 'Sakarya',
  code: 'sakarya',
  region: 'Marmara',
  plateCode: '54'
}, {
  id: 67,
  name: 'Samsun',
  code: 'samsun',
  region: 'Karadeniz',
  plateCode: '55'
}, {
  id: 68,
  name: "şanlıurfa",
  code: 'sanliurfa',
  region: "Güneydoğu Anadolu",
  plateCode: '63'
}, {
  id: 69,
  name: 'Siirt',
  code: 'siirt',
  region: "Güneydoğu Anadolu",
  plateCode: '56'
}, {
  id: 70,
  name: 'Sinop',
  code: 'sinop',
  region: 'Karadeniz',
  plateCode: '57'
}, {
  id: 71,
  name: "şırnak",
  code: 'sirnak',
  region: "Güneydoğu Anadolu",
  plateCode: '73'
}, {
  id: 72,
  name: 'Sivas',
  code: 'sivas',
  region: "İç Anadolu",
  plateCode: '58'
}, {
  id: 73,
  name: "tekirdağ",
  code: 'tekirdag',
  region: 'Marmara',
  plateCode: '59'
}, {
  id: 74,
  name: 'Tokat',
  code: 'tokat',
  region: 'Karadeniz',
  plateCode: '60'
}, {
  id: 75,
  name: 'Trabzon',
  code: 'trabzon',
  region: 'Karadeniz',
  plateCode: '61'
}, {
  id: 76,
  name: 'Tunceli',
  code: 'tunceli',
  region: "Doğu Anadolu",
  plateCode: '62'
}, {
  id: 77,
  name: "uşak",
  code: 'usak',
  region: 'Ege',
  plateCode: '64'
}, {
  id: 78,
  name: 'Van',
  code: 'van',
  region: "Doğu Anadolu",
  plateCode: '65'
}, {
  id: 79,
  name: 'Yalova',
  code: 'yalova',
  region: 'Marmara',
  plateCode: '77'
}, {
  id: 80,
  name: 'Yozgat',
  code: 'yozgat',
  region: "İç Anadolu",
  plateCode: '66'
}, {
  id: 81,
  name: 'Zonguldak',
  code: 'zonguldak',
  region: 'Karadeniz',
  plateCode: '67'
}];

// 🏙️ Büyük Şehirler (Nüfus 1M+)
export const BUYUK_SEHIRLER = ["İstanbul", 'Ankara', "İzmir", 'Bursa', 'Antalya', 'Adana', 'Konya', 'Gaziantep', 'Kayseri', "Diyarbakır"];

// 🌍 Coğrafi Bölgeler
export const COGRAFI_BOLGELER = ['Marmara', 'Ege', 'Akdeniz', "İç Anadolu", 'Karadeniz', "Doğu Anadolu", "Güneydoğu Anadolu"];

// 🔍 Utility Functions
export const getIlById = (id: number): Il | undefined => {
  return TURKIYE_ILLERI.find(il => il.id === id);
};
export const getIlByName = (name: string): Il | undefined => {
  return TURKIYE_ILLERI.find(il => il.name.toLowerCase() === name.toLowerCase());
};
export const getIlByCode = (code: string): Il | undefined => {
  return TURKIYE_ILLERI.find(il => il.code === code);
};
export const getIllerByRegion = (region: string): Il[] => {
  return TURKIYE_ILLERI.filter(il => il.region === region);
};
export const getBuyukSehirler = (): Il[] => {
  return TURKIYE_ILLERI.filter(il => BUYUK_SEHIRLER.includes(il.name));
};
export const searchIller = (query: string): Il[] => {
  const searchTerm = query.toLowerCase();
  return TURKIYE_ILLERI.filter(il => il.name.toLowerCase().includes(searchTerm) || il.code.includes(searchTerm) || il.plateCode.includes(query));
};

// 📊 İstatistikler
export const getIlSayisi = (): number => TURKIYE_ILLERI.length;
export const getBolgeBazindaIlSayilari = (): {
  [key: string]: number;
} => {
  return COGRAFI_BOLGELER.reduce((acc, bolge) => {
    acc[bolge] = getIllerByRegion(bolge).length;
    return acc;
  }, {} as {
    [key: string]: number;
  });
};

// 🎯 En Popüler İller (E-ticaret için)
export const POPULER_ILLER = ["İstanbul", 'Ankara', "İzmir", 'Bursa', 'Antalya', 'Adana', 'Gaziantep', 'Konya', 'Kayseri', 'Mersin'];
export const getPopulerIller = (): Il[] => {
  return TURKIYE_ILLERI.filter(il => POPULER_ILLER.includes(il.name));
};

// 🚀 Export default olarak ana liste
export default TURKIYE_ILLERI;