// 🎯 TEK KAYNAK: Tüm tema bilgileri burada
export interface ThemeDefinition {
  // Basic Info
  id: string;
  name: string;
  category: string;
  emoji: string;
  description: string;
  available: boolean;
  
  // Visual
  preview: string;
  color: string;
  
  // Features
  features: string[];
  
  // ProductCard Config
  cardConfig: {
    layout: 'grid-2' | 'grid-3' | 'grid-4' | 'side-by-side' | 'list';
    cardClass: string;
    borderRadius: string;
    shadow: string;
    font: string;
    fontSize: {
      title: string;
      price: string;
      description: string;
    };
    colors: {
      background: string;
      text: string;
      price: string;
      accent: string;
      button: string;
      buttonText: string;
      border: string;
    };
    hoverEffect: 'zoom' | 'slide' | 'fade' | 'glow' | 'none';
    showQuickActions: boolean;
    buttonClass: string;
    padding: string;
    margin: string;
  };
}

export const THEMES: ThemeDefinition[] = [
  // ✅ AKTİF TEMALAR
  {
    id: 'fashion-store',
    name: "Fashion Store",
    category: "👕 Tekstil",
    emoji: "👕",
    description: "Moda ve giyim mağazaları için",
    available: true,
    preview: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "bg-pink-100",
    features: ["Lookbook", "Size Guide", "Wishlist"],
    cardConfig: {
      layout: 'grid-4',
      cardClass: 'bg-white rounded-lg shadow-sm hover:shadow-lg overflow-hidden',
      borderRadius: '0.5rem',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      font: 'Inter, sans-serif',
      fontSize: {
        title: '1rem',
        price: '1.125rem',
        description: '0.875rem'
      },
      colors: {
        background: '#ffffff',
        text: '#1f2937',
        price: '#f97316',
        accent: '#f97316',
        button: '#f97316',
        buttonText: '#ffffff',
        border: '#e5e7eb'
      },
      hoverEffect: 'zoom',
      showQuickActions: true,
      buttonClass: 'hover:bg-pink-700 transition-colors',
      padding: '1rem',
      margin: '0.5rem'
    }
  },
  {
    id: 'tech-hub',
    name: "Tech Hub",
    category: "💻 Teknoloji",
    emoji: "💻",
    description: "Teknoloji ürünleri için modern tema",
    available: true,
    preview: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "bg-blue-100",
    features: ["Product Compare", "Reviews", "Specs Table"],
    cardConfig: {
      layout: 'grid-3',
      cardClass: 'bg-gray-800 rounded-lg shadow-lg hover:shadow-xl overflow-hidden',
      borderRadius: '0.5rem',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
      font: 'Inter, sans-serif',
      fontSize: {
        title: '1rem',
        price: '1.125rem',
        description: '0.875rem'
      },
      colors: {
        background: '#1f2937',
        text: '#ffffff',
        price: '#60a5fa',
        accent: '#3b82f6',
        button: '#3b82f6',
        buttonText: '#ffffff',
        border: '#374151'
      },
      hoverEffect: 'glow',
      showQuickActions: true,
      buttonClass: 'hover:bg-blue-700 transition-colors',
      padding: '1rem',
      margin: '0.5rem'
    }
  },
  {
    id: 'organic-market',
    name: "Organic Market",
    category: "🍪 Gıda",
    emoji: "🍪",
    description: "Organik ve doğal ürünler için",
    available: true,
    preview: "https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "bg-green-100",
    features: ["Organic Certificates", "Farm Info", "Health Benefits"],
    cardConfig: {
      layout: 'grid-3',
      cardClass: 'bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden border border-green-200',
      borderRadius: '0.5rem',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      font: 'Inter, sans-serif',
      fontSize: {
        title: '1rem',
        price: '1.125rem',
        description: '0.875rem'
      },
      colors: {
        background: '#ffffff',
        text: '#166534',
        price: '#059669',
        accent: '#059669',
        button: '#059669',
        buttonText: '#ffffff',
        border: '#bbf7d0'
      },
      hoverEffect: 'glow',
      showQuickActions: true,
      buttonClass: 'hover:bg-green-700 transition-colors',
      padding: '1rem',
      margin: '0.5rem'
    }
  },
  {
    id: 'modern-minimal',
    name: "Modern Minimal",
    category: "🛋️ Mobilya",
    emoji: "🛋️",
    description: "Temiz ve minimal tasarım",
    available: true,
    preview: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "bg-gray-100",
    features: ["Responsive", "SEO Optimized", "Fast Loading"],
    cardConfig: {
      layout: 'grid-3',
      cardClass: 'bg-white shadow-sm hover:shadow-md overflow-hidden',
      borderRadius: '0.125rem',
      shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      font: 'Inter, sans-serif',
      fontSize: {
        title: '0.875rem',
        price: '1rem',
        description: '0.75rem'
      },
      colors: {
        background: '#ffffff',
        text: '#6b7280',
        price: '#111827',
        accent: '#10b981',
        button: '#f3f4f6',
        buttonText: '#111827',
        border: '#e5e7eb'
      },
      hoverEffect: 'none',
      showQuickActions: false,
      buttonClass: 'hover:bg-gray-200 transition-colors border border-gray-300',
      padding: '0.75rem',
      margin: '0.25rem'
    }
  },
  {
    id: 'mega-store',
    name: "Mega Store",
    category: "🏪 Genel",
    emoji: "🏪",
    description: "Çok kategorili büyük mağazalar için",
    available: true,
    preview: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "bg-purple-100",
    features: ["Multi Category", "Advanced Search", "Bulk Operations"],
    cardConfig: {
      layout: 'grid-3',
      cardClass: 'bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden',
      borderRadius: '0.5rem',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      font: 'Inter, sans-serif',
      fontSize: {
        title: '1rem',
        price: '1.125rem',
        description: '0.875rem'
      },
      colors: {
        background: '#ffffff',
        text: '#374151',
        price: '#dc2626',
        accent: '#dc2626',
        button: '#dc2626',
        buttonText: '#ffffff',
        border: '#e5e7eb'
      },
      hoverEffect: 'zoom',
      showQuickActions: true,
      buttonClass: 'hover:bg-red-700 transition-colors',
      padding: '1rem',
      margin: '0.5rem'
    }
  },

  // 🔄 GELİŞTİRİLECEK TEMALAR
  {
    id: 'boutique-chic',
    name: "Boutique Chic",
    category: "👕 Tekstil",
    emoji: "👗",
    description: "Kadın butikleri, zarif giyim",
    available: true,
    preview: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "bg-pink-50",
    features: ["Zarif Tasarım", "Pastel Renkler", "Yumuşak Kenarlar"],
    cardConfig: {
      layout: 'grid-2',
      cardClass: 'bg-white rounded-xl shadow-sm hover:shadow-md overflow-hidden',
      borderRadius: '0.75rem',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      font: 'Inter, sans-serif',
      fontSize: {
        title: '1.125rem',
        price: '1.25rem',
        description: '0.875rem'
      },
      colors: {
        background: '#ffffff',
        text: '#374151',
        price: '#f3e8ff',
        accent: '#f3e8ff',
        button: '#f3e8ff',
        buttonText: '#7c3aed',
        border: '#e5e7eb'
      },
      hoverEffect: 'slide',
      showQuickActions: true,
      buttonClass: 'hover:bg-purple-100 transition-colors',
      padding: '1.5rem',
      margin: '0.75rem'
    }
  },
  {
    id: 'luxury-style',
    name: "Luxury Style",
    category: "👕 Tekstil",
    emoji: "💎",
    description: "Lüks markalar, pahalı ürün satıcıları",
    available: true,
    preview: "https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "bg-yellow-100",
    features: ["Premium Tasarım", "Gold Detaylar", "Yüksek Kontrast"],
    cardConfig: {
      layout: 'grid-3',
      cardClass: 'bg-gray-900 rounded-lg shadow-xl hover:shadow-2xl overflow-hidden border border-yellow-500',
      borderRadius: '0.5rem',
      shadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)',
      font: 'Playfair Display, serif',
      fontSize: {
        title: '1.25rem',
        price: '1.5rem',
        description: '1rem'
      },
      colors: {
        background: '#111827',
        text: '#f9fafb',
        price: '#fbbf24',
        accent: '#fbbf24',
        button: '#fbbf24',
        buttonText: '#111827',
        border: '#fbbf24'
      },
      hoverEffect: 'glow',
      showQuickActions: true,
      buttonClass: 'hover:bg-yellow-500 transition-all duration-300 font-semibold',
      padding: '2rem',
      margin: '1rem'
    }
  },
  {
    id: 'urban-street',
    name: "Urban Street",
    category: "👕 Tekstil",
    emoji: "🏙️",
    description: "Genç kitle, streetwear modası",
    available: true,
    preview: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "bg-gray-100",
    features: ["Dinamik Tasarım", "Neon Detaylar", "Kalın Fontlar"],
    cardConfig: {
      layout: 'grid-3',
      cardClass: 'bg-black rounded-lg shadow-lg hover:shadow-xl overflow-hidden border border-red-500',
      borderRadius: '0.25rem',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.2)',
      font: 'Oswald, sans-serif',
      fontSize: {
        title: '1.125rem',
        price: '1.25rem',
        description: '0.875rem'
      },
      colors: {
        background: '#000000',
        text: '#ffffff',
        price: '#ef4444',
        accent: '#3b82f6',
        button: '#ef4444',
        buttonText: '#ffffff',
        border: '#ef4444'
      },
      hoverEffect: 'zoom',
      showQuickActions: true,
      buttonClass: 'hover:bg-red-600 transition-colors font-bold',
      padding: '1rem',
      margin: '0.5rem'
    }
  },
  {
    id: 'minimal-wear',
    name: "Minimal Wear",
    category: "👕 Tekstil",
    emoji: "🧼",
    description: "Minimal tasarım seven müşteriler",
    available: true,
    preview: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "bg-green-50",
    features: ["Sade Tasarım", "Boşluklu Yerleşim", "Düz Çizgiler"],
    cardConfig: {
      layout: 'grid-4',
      cardClass: 'bg-white shadow-sm overflow-hidden',
      borderRadius: '0.125rem',
      shadow: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
      font: 'Inter, sans-serif',
      fontSize: {
        title: '0.875rem',
        price: '1rem',
        description: '0.75rem'
      },
      colors: {
        background: '#ffffff',
        text: '#6b7280',
        price: '#111827',
        accent: '#10b981',
        button: '#f3f4f6',
        buttonText: '#111827',
        border: '#e5e7eb'
      },
      hoverEffect: 'none',
      showQuickActions: false,
      buttonClass: 'hover:bg-gray-200 transition-colors border border-gray-300',
      padding: '0.75rem',
      margin: '0.25rem'
    }
  },
  {
    id: 'retro-vintage',
    name: "Retro Vintage",
    category: "👕 Tekstil",
    emoji: "🎞️",
    description: "Vintage ürün mağazaları",
    available: true,
    preview: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "bg-amber-100",
    features: ["Retro Fontlar", "Film Efekti", "Dekoratif Detaylar"],
    cardConfig: {
      layout: 'grid-3',
      cardClass: 'bg-amber-50 rounded-lg shadow-md hover:shadow-lg overflow-hidden border border-amber-200',
      borderRadius: '0.5rem',
      shadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      font: 'Playfair Display, serif',
      fontSize: {
        title: '1.125rem',
        price: '1.25rem',
        description: '0.875rem'
      },
      colors: {
        background: '#fffbeb',
        text: '#92400e',
        price: '#dc2626',
        accent: '#f59e0b',
        button: '#f59e0b',
        buttonText: '#ffffff',
        border: '#fbbf24'
      },
      hoverEffect: 'fade',
      showQuickActions: true,
      buttonClass: 'hover:bg-amber-600 transition-colors',
      padding: '1.25rem',
      margin: '0.75rem'
    }
  },
  {
    id: 'hijab-fashion',
    name: "Hijab Fashion",
    category: "👕 Tekstil",
    emoji: "🧕",
    description: "Tesettür giyim mağazaları",
    available: true,
    preview: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "bg-purple-100",
    features: ["Simetrik Tasarım", "Renk Seçenekleri", "Yumuşak Çizgiler"],
    cardConfig: {
      layout: 'grid-3',
      cardClass: 'bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden',
      borderRadius: '0.5rem',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      font: 'Inter, sans-serif',
      fontSize: {
        title: '1rem',
        price: '1.125rem',
        description: '0.875rem'
      },
      colors: {
        background: '#ffffff',
        text: '#374151',
        price: '#7c3aed',
        accent: '#7c3aed',
        button: '#7c3aed',
        buttonText: '#ffffff',
        border: '#e5e7eb'
      },
      hoverEffect: 'zoom',
      showQuickActions: true,
      buttonClass: 'hover:bg-purple-700 transition-colors',
      padding: '1rem',
      margin: '0.5rem'
    }
  },
  {
    id: 'kids-wear',
    name: "Kids Wear",
    category: "👕 Tekstil",
    emoji: "👶",
    description: "Anne-babalar, çocuk giyim satıcıları",
    available: true,
    preview: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "bg-yellow-100",
    features: ["Renkli Kenarlıklar", "Yaş Rozeti", "Animasyonlu Butonlar"],
    cardConfig: {
      layout: 'grid-2',
      cardClass: 'bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border-4 border-yellow-300',
      borderRadius: '1rem',
      shadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      font: 'Comic Neue, cursive',
      fontSize: {
        title: '1.125rem',
        price: '1.25rem',
        description: '0.875rem'
      },
      colors: {
        background: '#ffffff',
        text: '#1f2937',
        price: '#f59e0b',
        accent: '#10b981',
        button: '#3b82f6',
        buttonText: '#ffffff',
        border: '#fbbf24'
      },
      hoverEffect: 'zoom',
      showQuickActions: true,
      buttonClass: 'hover:bg-blue-600 transition-all duration-300 transform hover:scale-105',
      padding: '1.5rem',
      margin: '1rem'
    }
  },
  {
    id: 'outlet-zone',
    name: "Outlet Zone",
    category: "👕 Tekstil",
    emoji: "🔖",
    description: "İndirimli ürün satışı yapan mağazalar",
    available: true,
    preview: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "bg-red-100",
    features: ["Kampanya Odaklı", "% Etiketi", "Yoğun Görsel"],
    cardConfig: {
      layout: 'grid-4',
      cardClass: 'bg-red-50 rounded-lg shadow-md hover:shadow-lg overflow-hidden border-2 border-red-300',
      borderRadius: '0.5rem',
      shadow: '0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      font: 'Inter, sans-serif',
      fontSize: {
        title: '0.875rem',
        price: '1.25rem',
        description: '0.75rem'
      },
      colors: {
        background: '#fef2f2',
        text: '#1f2937',
        price: '#dc2626',
        accent: '#dc2626',
        button: '#dc2626',
        buttonText: '#ffffff',
        border: '#fca5a5'
      },
      hoverEffect: 'glow',
      showQuickActions: true,
      buttonClass: 'hover:bg-red-700 transition-colors font-bold',
      padding: '0.75rem',
      margin: '0.25rem'
    }
  },
  {
    id: 'eco-textile',
    name: "Eco Textile",
    category: "👕 Tekstil",
    emoji: "🌿",
    description: "Organik kumaş, çevre dostu ürün mağazaları",
    available: true,
    preview: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg?auto=compress&cs=tinysrgb&w=400",
    color: "bg-green-100",
    features: ["Organik İkonlar", "Sertifika Rozeti", "Doğa Dostu"],
    cardConfig: {
      layout: 'grid-3',
      cardClass: 'bg-white rounded-lg shadow-sm hover:shadow-md overflow-hidden border border-green-200',
      borderRadius: '0.5rem',
      shadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
      font: 'Inter, sans-serif',
      fontSize: {
        title: '1rem',
        price: '1.125rem',
        description: '0.875rem'
      },
      colors: {
        background: '#ffffff',
        text: '#166534',
        price: '#059669',
        accent: '#059669',
        button: '#059669',
        buttonText: '#ffffff',
        border: '#bbf7d0'
      },
      hoverEffect: 'slide',
      showQuickActions: true,
      buttonClass: 'hover:bg-green-700 transition-colors',
      padding: '1rem',
      margin: '0.5rem'
    }
  }
  // ... diğer temalar
];

// 🎯 HELPER FUNCTIONS
export const getThemeById = (id: string): ThemeDefinition | undefined => {
  return THEMES.find(theme => theme.id === id);
};

export const getAvailableThemes = (): ThemeDefinition[] => {
  return THEMES.filter(theme => theme.available);
};

export const getThemesByCategory = (category: string): ThemeDefinition[] => {
  return THEMES.filter(theme => theme.category === category);
};

export const getThemeCardConfig = (themeId: string) => {
  const theme = getThemeById(themeId);
  return theme?.cardConfig;
};