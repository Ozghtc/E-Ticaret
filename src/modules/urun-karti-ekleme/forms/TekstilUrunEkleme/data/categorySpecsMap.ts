// 🎯 Kategori-Spec Mapping Sistemi
// Her kategori için hangi spec'lerin gösterileceğini tanımlar

export interface CategorySpecsConfig {
  // Temel specs - hepsinde var
  fabricType: boolean;
  fitType: boolean;
  pattern: boolean;
  
  // Garment specific specs - kategoriye göre
  neckType: boolean;     // Yaka tipi - üst giyim için
  sleeveType: boolean;   // Kol tipi - kol olan kıyafetler için  
  closureType: boolean;  // Kapama tipi - kapanması olan kıyafetler için
  
  // Care instructions - hepsinde var
  careInstructions: boolean;
}

// 📋 Kategori bazında spec konfigürasyonu
export const CATEGORY_SPECS_MAP: Record<string, CategorySpecsConfig> = {
  // 👕 ÜST GİYİM - Kol ve yaka var
  'tisort': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: true,      // ✅ Bisiklet, V, polo yaka
    sleeveType: true,    // ✅ Kısa, uzun kol
    closureType: false,  // ❌ Genelde kapama yok
    careInstructions: true
  },
  
  'gomlek': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: true,      // ✅ Hakim, gömlek yaka
    sleeveType: true,    // ✅ Kısa, uzun kol
    closureType: true,   // ✅ Düğme
    careInstructions: true
  },
  
  'bluz': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: true,      // ✅ V, yuvarlak yaka
    sleeveType: true,    // ✅ Kısa, uzun, kolsuz
    closureType: false,  // ❌ Genelde kapama yok
    careInstructions: true
  },

  'tunik': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: true,      // ✅ V, yuvarlak, hakim yaka
    sleeveType: true,    // ✅ Kısa, uzun kol
    closureType: false,  // ❌ Genelde kapama yok
    careInstructions: true
  },

  'ferace': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: true,      // ✅ Kapüşon, dik yaka
    sleeveType: true,    // ✅ Uzun kol
    closureType: true,   // ✅ Fermuar, düğme
    careInstructions: true
  },

  'sal-esarp': {
    fabricType: true,
    fitType: false,      // ❌ Eşarpın kalıbı yok
    pattern: true,
    neckType: false,     // ❌ Yaka yok
    sleeveType: false,   // ❌ Kol yok
    closureType: false,  // ❌ Kapama yok
    careInstructions: true
  },

  'kap': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: true,      // ✅ Dik yaka, hakim yaka
    sleeveType: true,    // ✅ Uzun kol
    closureType: true,   // ✅ Düğme, fermuar
    careInstructions: true
  },

  'pardosu': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: true,      // ✅ İngiliz yaka, dik yaka
    sleeveType: true,    // ✅ Uzun kol
    closureType: true,   // ✅ Düğme
    careInstructions: true
  },
  
  'ceket': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: true,      // ✅ Hakim, şal yaka
    sleeveType: true,    // ✅ Uzun kol
    closureType: true,   // ✅ Düğme, fermuar
    careInstructions: true
  },
  
  'hirka': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: true,      // ✅ V, balıkçı yaka
    sleeveType: true,    // ✅ Uzun kol
    closureType: true,   // ✅ Düğme, fermuar
    careInstructions: true
  },
  
  'kazak': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: true,      // ✅ Balıkçı, V yaka
    sleeveType: true,    // ✅ Uzun kol
    closureType: false,  // ❌ Genelde kapama yok
    careInstructions: true
  },
  
  // 👗 ELBİSE - Kol ve yaka var
  'elbise': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: true,      // ✅ Straplez, V, yuvarlak
    sleeveType: true,    // ✅ Kolsuz, kısa, uzun
    closureType: true,   // ✅ Fermuar, düğme
    careInstructions: true
  },
  
  // 👖 ALT GİYİM - Yaka ve kol yok
  'pantolon': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: false,     // ❌ Pantolon da yaka olmaz
    sleeveType: false,   // ❌ Pantolon da kol olmaz
    closureType: true,   // ✅ Fermuar, düğme
    careInstructions: true
  },
  
  'etek': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: false,     // ❌ Etek te yaka olmaz
    sleeveType: false,   // ❌ Etek te kol olmaz
    closureType: true,   // ✅ Fermuar, düğme
    careInstructions: true
  },
  
  'sort': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: false,     // ❌ Şort ta yaka olmaz
    sleeveType: false,   // ❌ Şort ta kol olmaz
    closureType: true,   // ✅ Fermuar, düğme, lastik
    careInstructions: true
  },
  
  // 🏃 SPOR GİYİM
  'spor-tisort': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: true,      // ✅ Bisiklet yaka
    sleeveType: true,    // ✅ Kısa kol
    closureType: false,  // ❌ Genelde kapama yok
    careInstructions: true
  },
  
  'spor-pantolon': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: false,     // ❌ Yaka yok
    sleeveType: false,   // ❌ Kol yok
    closureType: true,   // ✅ Lastik, bağcık
    careInstructions: true
  },
  
  'sweatshirt': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: true,      // ✅ Kapüşon, bisiklet
    sleeveType: true,    // ✅ Uzun kol
    closureType: true,   // ✅ Fermuar (zip hoodie)
    careInstructions: true
  },
  
  // 🩲 İÇ GİYİM
  'atlet': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: true,      // ✅ Bisiklet, V yaka
    sleeveType: false,   // ❌ Kolsuz
    closureType: false,  // ❌ Kapama yok
    careInstructions: true
  },
  
  'sutyen': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: false,     // ❌ Yaka yok
    sleeveType: false,   // ❌ Kol yok
    closureType: true,   // ✅ Kopça
    careInstructions: true
  },
  
  'kulot': {
    fabricType: true,
    fitType: true,
    pattern: true,
    neckType: false,     // ❌ Yaka yok
    sleeveType: false,   // ❌ Kol yok
    closureType: false,  // ❌ Genelde lastik
    careInstructions: true
  }
};

// 🔍 Default config for unknown categories
export const DEFAULT_SPECS_CONFIG: CategorySpecsConfig = {
  fabricType: true,
  fitType: true,
  pattern: true,
  neckType: true,      // Safe default - göster
  sleeveType: true,    // Safe default - göster
  closureType: true,   // Safe default - göster
  careInstructions: true
};

// 📋 Helper function to get specs config for a category
export const getCategorySpecsConfig = (categoryId: string): CategorySpecsConfig => {
  return CATEGORY_SPECS_MAP[categoryId] || DEFAULT_SPECS_CONFIG;
};

// 📝 List of all spec field names for easy iteration
export const SPEC_FIELD_NAMES: (keyof CategorySpecsConfig)[] = [
  'fabricType',
  'fitType', 
  'pattern',
  'neckType',
  'sleeveType',
  'closureType',
  'careInstructions'
];