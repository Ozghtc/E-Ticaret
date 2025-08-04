// 🛠️ Kozmetik Form Yardımcı Fonksiyonları

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('tr-TR', {
    style: 'currency',
    currency: 'TRY',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(price);
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/ğ/g, 'g')
    .replace(/ü/g, 'u')
    .replace(/ş/g, 's')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ç/g, 'c')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function getStepTitle(step: number): string {
  switch (step) {
    case 1:
      return 'Ürün Bilgileri';
    case 2:
      return 'Kozmetik Özellikleri';
    case 3:
      return 'Ürün Görselleri';
    case 4:
      return 'Önizleme & Kaydet';
    default:
      return 'Bilinmeyen Adım';
  }
}

export function getStepIcon(step: number): string {
  switch (step) {
    case 1:
      return '📝';
    case 2:
      return '💄';
    case 3:
      return '📷';
    case 4:
      return '👁️';
    default:
      return '❓';
  }
}

// Kozmetik kategorisine göre özel alanları kontrol et
export function hasShadesField(categoryId: string): boolean {
  const shadesCategories = [
    'fondoten', 'ruj', 'rimmel', 'far', 'kapatici', 
    'pudra', 'allik', 'kas-kalemi', 'eyeliner', 
    'highlighter', 'oje'
  ];
  return shadesCategories.includes(categoryId);
}

export function hasVolumeField(categoryId: string): boolean {
  const volumeCategories = [
    'nemlendirici', 'temizleyici', 'maske', 'serum', 'tonik',
    'gunes-kremi', 'peeling', 'goz-kremi', 'fondoten', 'kapatici',
    'pudra', 'sampuan', 'sac-kremi', 'sac-maskesi', 'sac-yagi',
    'sac-spreyi', 'sac-serumu', 'kuru-sampuan', 'dus-jeli',
    'vucut-losyonu', 'deodorant', 'vucut-yagi', 'el-kremi',
    'vucut-spreyi', 'oje', 'base-coat', 'top-coat', 'tirnak-bakimi',
    'asetik-dis', 'kadin-parfum', 'erkek-parfum', 'unisex-parfum',
    'body-mist'
  ];
  return volumeCategories.includes(categoryId);
}

export function hasSPFField(categoryId: string): boolean {
  const spfCategories = ['gunes-kremi', 'fondoten', 'pudra'];
  return spfCategories.includes(categoryId);
}

export function hasCoverageField(categoryId: string): boolean {
  const coverageCategories = ['fondoten', 'kapatici'];
  return coverageCategories.includes(categoryId);
}

// Görsel dosya validasyonu
export function validateImageFile(file: File): { valid: boolean; error?: string } {
  const maxSize = 5 * 1024 * 1024; // 5MB
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Sadece JPG, PNG veya WebP formatında dosya yükleyebilirsiniz.'
    };
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'Dosya boyutu 5MB\'dan küçük olmalıdır.'
    };
  }

  return { valid: true };
}

// Cilt tipi emoji'si
export function getSkinTypeEmoji(skinType: string): string {
  const emojiMap: Record<string, string> = {
    'normal': '😊',
    'dry': '🏜️', 
    'oily': '💧',
    'combination': '⚖️',
    'sensitive': '🌸',
    'mature': '⏰',
    'acne-prone': '🎯',
    'all-skin': '✨'
  };
  return emojiMap[skinType] || '🧴';
}

// Renk kategorisi adı
export function getShadeCategory(categoryId: string): string {
  if (['fondoten', 'kapatici'].includes(categoryId)) {
    return 'skin-tone';
  }
  if (['ruj'].includes(categoryId)) {
    return 'lip-color';
  }
  if (['far', 'rimmel', 'eyeliner', 'kas-kalemi'].includes(categoryId)) {
    return 'eye-color';
  }
  if (['oje'].includes(categoryId)) {
    return 'nail-color';
  }
  return 'universal';
}