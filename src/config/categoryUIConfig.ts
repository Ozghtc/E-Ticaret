// 🎨 KATEGORİ BAZLI UI AYARLARI
export interface CategoryUIConfig {
  showSizes: boolean;
  showColors: boolean;
  showSpecs: boolean;
  showNutrition: boolean;
  showCertifications: boolean;
  showWarranty: boolean;
  showBrand: boolean;
  showRating: boolean;
  showReviews: boolean;
  showDiscount: boolean;
  showWishlist: boolean;
  imageAspectRatio: string;
  cardLayout: 'grid-2' | 'grid-3' | 'grid-4' | 'list';
  filterFields: string[];
  sortOptions: string[];
}

export const categoryUIConfig: Record<string, CategoryUIConfig> = {
  // 👕 TEKSTİL KATEGORİSİ
  tekstil: {
    showSizes: true,
    showColors: true,
    showSpecs: false,
    showNutrition: false,
    showCertifications: false,
    showWarranty: false,
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showWishlist: true,
    imageAspectRatio: '4/5', // Dikey
    cardLayout: 'grid-4',
    filterFields: ['brand', 'size', 'color', 'price', 'rating'],
    sortOptions: ['price-asc', 'price-desc', 'rating', 'newest', 'popular']
  },

  // 💻 TEKNOLOJİ KATEGORİSİ
  teknoloji: {
    showSizes: false,
    showColors: false,
    showSpecs: true,
    showNutrition: false,
    showCertifications: false,
    showWarranty: true,
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showWishlist: true,
    imageAspectRatio: '16/9', // Yatay
    cardLayout: 'grid-3',
    filterFields: ['brand', 'specs', 'price', 'rating', 'warranty'],
    sortOptions: ['price-asc', 'price-desc', 'rating', 'newest', 'performance']
  },

  // 🍪 GIDA KATEGORİSİ
  gida: {
    showSizes: false,
    showColors: false,
    showSpecs: false,
    showNutrition: true,
    showCertifications: true,
    showWarranty: false,
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showWishlist: false,
    imageAspectRatio: '1/1', // Kare
    cardLayout: 'grid-4',
    filterFields: ['brand', 'organic', 'price', 'rating', 'expiry'],
    sortOptions: ['price-asc', 'price-desc', 'rating', 'newest', 'expiry']
  },

  // 🧴 KOZMETİK KATEGORİSİ
  kozmetik: {
    showSizes: true,
    showColors: true,
    showSpecs: false,
    showNutrition: false,
    showCertifications: true,
    showWarranty: false,
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showWishlist: true,
    imageAspectRatio: '3/4',
    cardLayout: 'grid-3',
    filterFields: ['brand', 'skinType', 'color', 'price', 'rating'],
    sortOptions: ['price-asc', 'price-desc', 'rating', 'newest', 'popular']
  },

  // 🛋️ MOBİLYA KATEGORİSİ
  mobilya: {
    showSizes: true,
    showColors: true,
    showSpecs: true,
    showNutrition: false,
    showCertifications: false,
    showWarranty: true,
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showWishlist: true,
    imageAspectRatio: '4/3',
    cardLayout: 'grid-2',
    filterFields: ['brand', 'material', 'size', 'color', 'price', 'rating'],
    sortOptions: ['price-asc', 'price-desc', 'rating', 'newest', 'size']
  }
};