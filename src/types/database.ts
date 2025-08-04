// 🗄️ VERİTABANI TİP TANIMLARI

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category_id: string;
  brand_id: string;
  dynamic_fields: Record<string, any>; // Beden, renk, specs vs.
  rating: number;
  reviews: number;
  stock: number;
  discount?: number;
  created_at: Date;
  updated_at: Date;
}

export interface Category {
  id: string;
  name: string;
  parent_id: string | null;
  level: number; // 1, 2, 3
  slug: string;
  icon?: string;
  created_at: Date;
}

export interface Theme {
  id: string;
  name: string;
  category_id: string;
  component_name: string;
  preview_image: string;
  description: string;
  features: string[];
  available: boolean;
  created_at: Date;
}

export interface UserThemePreference {
  user_id: string;
  selected_themes: Record<string, string>; // { "tekstil": "fashion-store" }
  updated_at: Date;
}

export interface Brand {
  id: string;
  name: string;
  logo?: string;
  description?: string;
  website?: string;
  created_at: Date;
}

// Dynamic Fields için tip tanımları
export interface TextileFields {
  sizes?: string[];
  colors?: string[];
  material?: string;
  care_instructions?: string[];
  season?: string;
  gender?: 'men' | 'women' | 'unisex' | 'kids';
}

export interface TechFields {
  specs?: string[];
  warranty?: string;
  compatibility?: string[];
  power_consumption?: string;
  dimensions?: string;
  weight?: string;
}

export interface FoodFields {
  ingredients?: string[];
  nutrition_facts?: Record<string, string>;
  expiry_date?: Date;
  organic?: boolean;
  certifications?: string[];
  allergens?: string[];
}

export interface CosmeticFields {
  skin_type?: string[];
  shades?: string[];
  volume?: string;
  ingredients?: string[];
  cruelty_free?: boolean;
  vegan?: boolean;
}

export interface FurnitureFields {
  dimensions?: string;
  material?: string;
  colors?: string[];
  assembly_required?: boolean;
  weight_capacity?: string;
  warranty?: string;
}