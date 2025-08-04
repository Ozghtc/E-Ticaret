export interface CategoryConfig {
  // Layout & Display
  imageHeight: string;
  layout: 'grid' | 'list' | 'card';
  
  // Content Visibility
  showBrand: boolean;
  showRating: boolean;
  showReviews: boolean;
  showDiscount: boolean;
  showNewBadge: boolean;
  showWishlist: boolean;
  showQuickView: boolean;
  showFeatures: boolean;
  
  // Category Specific
  showVariants: boolean; // sizes, colors for tekstil
  showSpecs: boolean; // tech specs for teknoloji
  showNutrition: boolean; // nutrition info for gida
  showCertifications: boolean; // organic certificates
  showWarranty: boolean; // warranty info for tech
  
  // Interaction
  hoverActions: string[];
  quickActions: string[];
}

export const categoryConfigs: Record<string, CategoryConfig> = {
  // 👕 Tekstil
  tekstil: {
    imageHeight: '16rem', // h-64
    layout: 'grid',
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showNewBadge: true,
    showWishlist: true,
    showQuickView: true,
    showFeatures: false,
    showVariants: true, // sizes, colors
    showSpecs: false,
    showNutrition: false,
    showCertifications: false,
    showWarranty: false,
    hoverActions: ['quickView', 'wishlist'],
    quickActions: ['addToCart', 'quickView']
  },

  // 💻 Teknoloji
  teknoloji: {
    imageHeight: '12rem', // h-48
    layout: 'grid',
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showNewBadge: false,
    showWishlist: true,
    showQuickView: true,
    showFeatures: true, // free shipping, fast delivery
    showVariants: false,
    showSpecs: true, // RAM, CPU, etc.
    showNutrition: false,
    showCertifications: false,
    showWarranty: true,
    hoverActions: ['compare', 'quickView'],
    quickActions: ['addToCart', 'compare']
  },

  // 🍪 Gıda
  gida: {
    imageHeight: '12rem', // h-48
    layout: 'grid',
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showNewBadge: true,
    showWishlist: false,
    showQuickView: false,
    showFeatures: true,
    showVariants: false,
    showSpecs: false,
    showNutrition: true, // calories, ingredients
    showCertifications: true, // organic, halal
    showWarranty: false,
    hoverActions: ['addToCart'],
    quickActions: ['addToCart']
  },

  // 🧴 Kozmetik
  kozmetik: {
    imageHeight: '14rem', // h-56
    layout: 'grid',
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showNewBadge: true,
    showWishlist: true,
    showQuickView: true,
    showFeatures: false,
    showVariants: true, // shades, sizes
    showSpecs: false,
    showNutrition: false,
    showCertifications: true, // cruelty-free, organic
    showWarranty: false,
    hoverActions: ['quickView', 'wishlist'],
    quickActions: ['addToCart', 'quickView']
  },

  // 📚 Kırtasiye
  kirtasiye: {
    imageHeight: '12rem', // h-48
    layout: 'grid',
    showBrand: true,
    showRating: true,
    showReviews: false,
    showDiscount: true,
    showNewBadge: false,
    showWishlist: false,
    showQuickView: false,
    showFeatures: true,
    showVariants: false,
    showSpecs: false,
    showNutrition: false,
    showCertifications: false,
    showWarranty: false,
    hoverActions: ['addToCart'],
    quickActions: ['addToCart']
  },

  // 🛋️ Mobilya
  mobilya: {
    imageHeight: '16rem', // h-64
    layout: 'grid',
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showNewBadge: true,
    showWishlist: true,
    showQuickView: true,
    showFeatures: true, // free delivery, assembly
    showVariants: true, // colors, sizes
    showSpecs: true, // dimensions, material
    showNutrition: false,
    showCertifications: false,
    showWarranty: true,
    hoverActions: ['quickView', 'wishlist'],
    quickActions: ['addToCart', 'quickView']
  },

  // 🎮 Oyun & Konsol
  oyun: {
    imageHeight: '12rem', // h-48
    layout: 'grid',
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showNewBadge: true,
    showWishlist: true,
    showQuickView: true,
    showFeatures: true,
    showVariants: false,
    showSpecs: true, // platform, genre
    showNutrition: false,
    showCertifications: false,
    showWarranty: true,
    hoverActions: ['quickView', 'wishlist'],
    quickActions: ['addToCart', 'quickView']
  },

  // 🏠 Ev & Yaşam
  ev: {
    imageHeight: '14rem', // h-56
    layout: 'grid',
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showNewBadge: true,
    showWishlist: true,
    showQuickView: true,
    showFeatures: true,
    showVariants: true, // colors, sizes
    showSpecs: false,
    showNutrition: false,
    showCertifications: false,
    showWarranty: false,
    hoverActions: ['quickView', 'wishlist'],
    quickActions: ['addToCart', 'quickView']
  },

  // 🍼 Anne & Bebek
  bebek: {
    imageHeight: '12rem', // h-48
    layout: 'grid',
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showNewBadge: true,
    showWishlist: false,
    showQuickView: true,
    showFeatures: true,
    showVariants: true, // ages, sizes
    showSpecs: false,
    showNutrition: false,
    showCertifications: true, // safety certificates
    showWarranty: false,
    hoverActions: ['quickView'],
    quickActions: ['addToCart', 'quickView']
  },

  // 🚗 Otomotiv
  otomotiv: {
    imageHeight: '12rem', // h-48
    layout: 'grid',
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showNewBadge: false,
    showWishlist: false,
    showQuickView: true,
    showFeatures: true,
    showVariants: false,
    showSpecs: true, // compatibility, specifications
    showNutrition: false,
    showCertifications: false,
    showWarranty: true,
    hoverActions: ['quickView'],
    quickActions: ['addToCart', 'quickView']
  },

  // 🧳 Seyahat
  seyahat: {
    imageHeight: '14rem', // h-56
    layout: 'grid',
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showNewBadge: true,
    showWishlist: true,
    showQuickView: true,
    showFeatures: true,
    showVariants: true, // sizes, colors
    showSpecs: true, // dimensions, weight
    showNutrition: false,
    showCertifications: false,
    showWarranty: true,
    hoverActions: ['quickView', 'wishlist'],
    quickActions: ['addToCart', 'quickView']
  },

  // 🧘 Spor & Sağlık
  spor: {
    imageHeight: '12rem', // h-48
    layout: 'grid',
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showNewBadge: true,
    showWishlist: true,
    showQuickView: true,
    showFeatures: true,
    showVariants: true, // sizes, colors
    showSpecs: false,
    showNutrition: false,
    showCertifications: false,
    showWarranty: false,
    hoverActions: ['quickView', 'wishlist'],
    quickActions: ['addToCart', 'quickView']
  },

  // 🐶 Evcil Hayvan
  hayvan: {
    imageHeight: '12rem', // h-48
    layout: 'grid',
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showNewBadge: true,
    showWishlist: false,
    showQuickView: false,
    showFeatures: true,
    showVariants: true, // sizes, flavors
    showSpecs: false,
    showNutrition: true, // ingredients, age suitability
    showCertifications: false,
    showWarranty: false,
    hoverActions: ['addToCart'],
    quickActions: ['addToCart']
  },

  // 💍 Takı & Aksesuar
  taki: {
    imageHeight: '14rem', // h-56
    layout: 'grid',
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showNewBadge: true,
    showWishlist: true,
    showQuickView: true,
    showFeatures: false,
    showVariants: true, // sizes, materials
    showSpecs: true, // material, dimensions
    showNutrition: false,
    showCertifications: true, // authenticity certificates
    showWarranty: true,
    hoverActions: ['quickView', 'wishlist'],
    quickActions: ['addToCart', 'quickView']
  },

  // Default/General
  general: {
    imageHeight: '12rem', // h-48
    layout: 'grid',
    showBrand: true,
    showRating: true,
    showReviews: true,
    showDiscount: true,
    showNewBadge: true,
    showWishlist: true,
    showQuickView: true,
    showFeatures: true,
    showVariants: false,
    showSpecs: false,
    showNutrition: false,
    showCertifications: false,
    showWarranty: false,
    hoverActions: ['quickView', 'wishlist'],
    quickActions: ['addToCart', 'quickView']
  }
};