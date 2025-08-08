// 🌍 Ortak Ülke Listesi - Tüm Product Forms İçin
export interface Country {
  id: string;
  name: string;
  flag: string;
  region: string;
  popular?: boolean; // Popüler ülkeler üstte gösterilir
}
export const countries: Country[] = [
// Popüler Ülkeler (Üstte gösterilecek)
{
  id: 'turkiye',
  name: "Türkiye",
  flag: '🇹🇷',
  region: 'Asya',
  popular: true
}, {
  id: 'almanya',
  name: 'Almanya',
  flag: '🇩🇪',
  region: 'Avrupa',
  popular: true
}, {
  id: 'fransa',
  name: 'Fransa',
  flag: '🇫🇷',
  region: 'Avrupa',
  popular: true
}, {
  id: 'italya',
  name: "İtalya",
  flag: '🇮🇹',
  region: 'Avrupa',
  popular: true
}, {
  id: 'abd',
  name: "Amerika Birleşik Devletleri",
  flag: '🇺🇸',
  region: 'Amerika',
  popular: true
}, {
  id: 'guney-kore',
  name: "Güney Kore",
  flag: '🇰🇷',
  region: 'Asya',
  popular: true
}, {
  id: 'japonya',
  name: 'Japonya',
  flag: '🇯🇵',
  region: 'Asya',
  popular: true
}, {
  id: 'cin',
  name: "Çin",
  flag: '🇨🇳',
  region: 'Asya',
  popular: true
}, {
  id: 'ingiltere',
  name: "İngiltere",
  flag: '🇬🇧',
  region: 'Avrupa',
  popular: true
}, {
  id: 'ispanya',
  name: "İspanya",
  flag: '🇪🇸',
  region: 'Avrupa',
  popular: true
},
// Avrupa
{
  id: 'avusturya',
  name: 'Avusturya',
  flag: '🇦🇹',
  region: 'Avrupa'
}, {
  id: 'belcika',
  name: "Belçika",
  flag: '🇧🇪',
  region: 'Avrupa'
}, {
  id: 'hollanda',
  name: 'Hollanda',
  flag: '🇳🇱',
  region: 'Avrupa'
}, {
  id: 'isvicre',
  name: "İsviçre",
  flag: '🇨🇭',
  region: 'Avrupa'
}, {
  id: 'norveç',
  name: "Norveç",
  flag: '🇳🇴',
  region: 'Avrupa'
}, {
  id: 'isvec',
  name: "İsveç",
  flag: '🇸🇪',
  region: 'Avrupa'
}, {
  id: 'danimarka',
  name: 'Danimarka',
  flag: '🇩🇰',
  region: 'Avrupa'
}, {
  id: 'finlandiya',
  name: 'Finlandiya',
  flag: '🇫🇮',
  region: 'Avrupa'
}, {
  id: 'polonya',
  name: 'Polonya',
  flag: '🇵🇱',
  region: 'Avrupa'
}, {
  id: 'rusya',
  name: 'Rusya',
  flag: '🇷🇺',
  region: 'Avrupa'
}, {
  id: 'ukrayna',
  name: 'Ukrayna',
  flag: '🇺🇦',
  region: 'Avrupa'
}, {
  id: 'yunanistan',
  name: 'Yunanistan',
  flag: '🇬🇷',
  region: 'Avrupa'
}, {
  id: 'portekiz',
  name: 'Portekiz',
  flag: '🇵🇹',
  region: 'Avrupa'
}, {
  id: 'cek-cumhuriyeti',
  name: "Çek Cumhuriyeti",
  flag: '🇨🇿',
  region: 'Avrupa'
}, {
  id: 'macaristan',
  name: 'Macaristan',
  flag: '🇭🇺',
  region: 'Avrupa'
}, {
  id: 'romanya',
  name: 'Romanya',
  flag: '🇷🇴',
  region: 'Avrupa'
}, {
  id: 'bulgaristan',
  name: 'Bulgaristan',
  flag: '🇧🇬',
  region: 'Avrupa'
}, {
  id: 'hirvatistan',
  name: "Hırvatistan",
  flag: '🇭🇷',
  region: 'Avrupa'
},
// Asya
{
  id: 'hindistan',
  name: 'Hindistan',
  flag: '🇮🇳',
  region: 'Asya'
}, {
  id: 'banglades',
  name: "Bangladeş",
  flag: '🇧🇩',
  region: 'Asya'
}, {
  id: 'pakistan',
  name: 'Pakistan',
  flag: '🇵🇰',
  region: 'Asya'
}, {
  id: 'endonezya',
  name: 'Endonezya',
  flag: '🇮🇩',
  region: 'Asya'
}, {
  id: 'malezya',
  name: 'Malezya',
  flag: '🇲🇾',
  region: 'Asya'
}, {
  id: 'singapur',
  name: 'Singapur',
  flag: '🇸🇬',
  region: 'Asya'
}, {
  id: 'tayland',
  name: 'Tayland',
  flag: '🇹🇭',
  region: 'Asya'
}, {
  id: 'vietnam',
  name: 'Vietnam',
  flag: '🇻🇳',
  region: 'Asya'
}, {
  id: 'filipinler',
  name: 'Filipinler',
  flag: '🇵🇭',
  region: 'Asya'
}, {
  id: 'myanmar',
  name: 'Myanmar',
  flag: '🇲🇲',
  region: 'Asya'
}, {
  id: 'kamboçya',
  name: "Kamboçya",
  flag: '🇰🇭',
  region: 'Asya'
}, {
  id: 'laos',
  name: 'Laos',
  flag: '🇱🇦',
  region: 'Asya'
}, {
  id: 'sri-lanka',
  name: 'Sri Lanka',
  flag: '🇱🇰',
  region: 'Asya'
}, {
  id: 'nepal',
  name: 'Nepal',
  flag: '🇳🇵',
  region: 'Asya'
}, {
  id: 'bhutan',
  name: 'Bhutan',
  flag: '🇧🇹',
  region: 'Asya'
},
// Orta Doğu
{
  id: 'iran',
  name: "İran",
  flag: '🇮🇷',
  region: "Orta Doğu"
}, {
  id: 'irak',
  name: 'Irak',
  flag: '🇮🇶',
  region: "Orta Doğu"
}, {
  id: 'suudi-arabistan',
  name: 'Suudi Arabistan',
  flag: '🇸🇦',
  region: "Orta Doğu"
}, {
  id: 'bae',
  name: "Birleşik Arap Emirlikleri",
  flag: '🇦🇪',
  region: "Orta Doğu"
}, {
  id: 'katar',
  name: 'Katar',
  flag: '🇶🇦',
  region: "Orta Doğu"
}, {
  id: 'kuveyt',
  name: 'Kuveyt',
  flag: '🇰🇼',
  region: "Orta Doğu"
}, {
  id: 'bahreyn',
  name: 'Bahreyn',
  flag: '🇧🇭',
  region: "Orta Doğu"
}, {
  id: 'uman',
  name: 'Umman',
  flag: '🇴🇲',
  region: "Orta Doğu"
}, {
  id: 'yemen',
  name: 'Yemen',
  flag: '🇾🇪',
  region: "Orta Doğu"
}, {
  id: 'urdun',
  name: "Ürdün",
  flag: '🇯🇴',
  region: "Orta Doğu"
}, {
  id: 'suriye',
  name: 'Suriye',
  flag: '🇸🇾',
  region: "Orta Doğu"
}, {
  id: 'lubnan',
  name: "Lübnan",
  flag: '🇱🇧',
  region: "Orta Doğu"
}, {
  id: 'israil',
  name: "İsrail",
  flag: '🇮🇱',
  region: "Orta Doğu"
}, {
  id: 'filistin',
  name: 'Filistin',
  flag: '🇵🇸',
  region: "Orta Doğu"
},
// Afrika
{
  id: 'guney-afrika',
  name: "Güney Afrika",
  flag: '🇿🇦',
  region: 'Afrika'
}, {
  id: 'misir',
  name: "Mısır",
  flag: '🇪🇬',
  region: 'Afrika'
}, {
  id: 'nijerya',
  name: 'Nijerya',
  flag: '🇳🇬',
  region: 'Afrika'
}, {
  id: 'kenya',
  name: 'Kenya',
  flag: '🇰🇪',
  region: 'Afrika'
}, {
  id: 'gana',
  name: 'Gana',
  flag: '🇬🇭',
  region: 'Afrika'
}, {
  id: 'etiyopya',
  name: 'Etiyopya',
  flag: '🇪🇹',
  region: 'Afrika'
}, {
  id: 'fas',
  name: 'Fas',
  flag: '🇲🇦',
  region: 'Afrika'
}, {
  id: 'tunus',
  name: 'Tunus',
  flag: '🇹🇳',
  region: 'Afrika'
}, {
  id: 'cezayir',
  name: 'Cezayir',
  flag: '🇩🇿',
  region: 'Afrika'
}, {
  id: 'libya',
  name: 'Libya',
  flag: '🇱🇾',
  region: 'Afrika'
},
// Amerika
{
  id: 'kanada',
  name: 'Kanada',
  flag: '🇨🇦',
  region: 'Amerika'
}, {
  id: 'meksika',
  name: 'Meksika',
  flag: '🇲🇽',
  region: 'Amerika'
}, {
  id: 'brezilya',
  name: 'Brezilya',
  flag: '🇧🇷',
  region: 'Amerika'
}, {
  id: 'arjantin',
  name: 'Arjantin',
  flag: '🇦🇷',
  region: 'Amerika'
}, {
  id: 'kolombiya',
  name: 'Kolombiya',
  flag: '🇨🇴',
  region: 'Amerika'
}, {
  id: 'peru',
  name: 'Peru',
  flag: '🇵🇪',
  region: 'Amerika'
}, {
  id: 'sili',
  name: "Şili",
  flag: '🇨🇱',
  region: 'Amerika'
}, {
  id: 'ekvador',
  name: 'Ekvador',
  flag: '🇪🇨',
  region: 'Amerika'
}, {
  id: 'venezuela',
  name: 'Venezuela',
  flag: '🇻🇪',
  region: 'Amerika'
}, {
  id: 'uruguay',
  name: 'Uruguay',
  flag: '🇺🇾',
  region: 'Amerika'
},
// Okyanusya
{
  id: 'avustralya',
  name: 'Avustralya',
  flag: '🇦🇺',
  region: 'Okyanusya'
}, {
  id: 'yeni-zelanda',
  name: 'Yeni Zelanda',
  flag: '🇳🇿',
  region: 'Okyanusya'
}, {
  id: 'fiji',
  name: 'Fiji',
  flag: '🇫🇯',
  region: 'Okyanusya'
}, {
  id: 'papua-yeni-gine',
  name: 'Papua Yeni Gine',
  flag: '🇵🇬',
  region: 'Okyanusya'
},
// Özel
{
  id: 'diger',
  name: 'Diğer',
  flag: '🌍',
  region: 'Diğer'
}];

// Utility functions
export const getPopularCountries = (): Country[] => {
  return countries.filter(country => country.popular);
};
export const getCountriesByRegion = (region: string): Country[] => {
  return countries.filter(country => country.region === region);
};
export const getCountryById = (id: string): Country | undefined => {
  return countries.find(country => country.id === id);
};
export const getCountryByName = (name: string): Country | undefined => {
  return countries.find(country => country.name === name);
};
export const getAllRegions = (): string[] => {
  return Array.from(new Set(countries.map(country => country.region)));
};

// Arama fonksiyonu
export const searchCountries = (query: string): Country[] => {
  const lowercaseQuery = query.toLowerCase();
  return countries.filter(country => country.name.toLowerCase().includes(lowercaseQuery) || country.id.toLowerCase().includes(lowercaseQuery));
};