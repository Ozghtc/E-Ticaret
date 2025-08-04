import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  rating: number;
  reviews: number;
  discount?: number;
  category: string;
  brand?: string;
  stock: number;
  
  // Fashion specific
  sizes?: string[];
  colors?: string[];
  selectedSize?: string;
  selectedColor?: string;
  
  // Tech specific
  specs?: string[];
  warranty?: string;
  
  // Organic specific
  organic?: boolean;
  local?: boolean;
  certifications?: string[];
  
  // MegaStore specific
  freeShipping?: boolean;
  fastDelivery?: boolean;
  flashSale?: boolean;
  
  // General flags
  isNew?: boolean;
  isBestseller?: boolean;
}

interface ThemeContextType {
  selectedTheme: string;
  setSelectedTheme: (theme: string) => void;
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, updates: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  getProductsByCategory: (category?: string) => Product[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Sample unified product data
const sampleProducts: Product[] = [
  {
    id: '1',
    name: 'Vintage Denim Ceket',
    description: 'Klasik vintage tarzı denim ceket',
    price: 899,
    originalPrice: 1299,
    image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.9,
    reviews: 127,
    discount: 31,
    category: 'fashion',
    brand: 'Zara',
    stock: 25,
    sizes: ['S', 'M', 'L', 'XL'],
    colors: ['Mavi', 'Siyah'],
    isNew: true
  },
  {
    id: '2',
    name: 'Gaming Laptop RTX 4070',
    description: 'Yüksek performanslı gaming laptop',
    price: 45999,
    originalPrice: 52999,
    image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.8,
    reviews: 342,
    discount: 13,
    category: 'tech',
    brand: 'ASUS',
    stock: 8,
    specs: ['Intel i7', '16GB RAM', 'RTX 4070', '1TB SSD'],
    warranty: '2 yıl'
  },
  {
    id: '3',
    name: 'Organik Zeytinyağı 500ml',
    description: 'Soğuk sıkım organik zeytinyağı',
    price: 89,
    originalPrice: 109,
    image: 'https://images.pexels.com/photos/33783/olive-oil-salad-dressing-cooking-olive.jpg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.9,
    reviews: 127,
    discount: 18,
    category: 'organic',
    brand: 'Ekoloji',
    stock: 50,
    organic: true,
    local: true,
    certifications: ['AB Organik', 'USDA Organic']
  },
  {
    id: '4',
    name: 'iPhone 15 Pro Max 256GB',
    description: 'En yeni iPhone modeli',
    price: 54999,
    originalPrice: 59999,
    image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.8,
    reviews: 1247,
    discount: 8,
    category: 'mega-store',
    brand: 'Apple',
    stock: 15,
    freeShipping: true,
    fastDelivery: true,
    isBestseller: true
  },
  {
    id: '5',
    name: 'Minimalist Desk Lamp',
    description: 'Sade ve şık masa lambası',
    price: 299,
    originalPrice: 399,
    image: 'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=300',
    rating: 4.9,
    reviews: 127,
    discount: 25,
    category: 'minimal',
    brand: 'IKEA',
    stock: 30
  }
];

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [selectedTheme, setSelectedTheme] = useState('fashion-store');
  const [products, setProducts] = useState<Product[]>(sampleProducts);

  // Load theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
      setSelectedTheme(savedTheme);
    }
  }, []);

  // Save theme to localStorage
  useEffect(() => {
    localStorage.setItem('selectedTheme', selectedTheme);
  }, [selectedTheme]);

  const addProduct = (product: Product) => {
    setProducts(prev => [...prev, { ...product, id: Date.now().toString() }]);
  };

  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => prev.map(product => 
      product.id === id ? { ...product, ...updates } : product
    ));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  const getProductsByCategory = (category?: string) => {
    if (!category) return products;
    return products.filter(product => product.category === category);
  };

  const value: ThemeContextType = {
    selectedTheme,
    setSelectedTheme,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}