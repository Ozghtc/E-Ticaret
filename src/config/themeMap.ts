// 🎯 TEMA → TEMPLATE EŞLEMESİ
// 👕 TEKSTİL TEMALARI
import FashionStoreTemplate from '../templates/tekstil/FashionStoreTemplate';
import BoutiqueChicTemplate from '../templates/tekstil/BoutiqueChicTemplate';
import LuxuryStyleTemplate from '../templates/tekstil/LuxuryStyleTemplate';
import UrbanStreetTemplate from '../templates/tekstil/UrbanStreetTemplate';
import MinimalWearTemplate from '../templates/tekstil/MinimalWearTemplate';
import RetroVintageTemplate from '../templates/tekstil/RetroVintageTemplate';
import HijabFashionTemplate from '../templates/tekstil/HijabFashionTemplate';
import KidsWearTemplate from '../templates/tekstil/KidsWearTemplate';
import OutletZoneTemplate from '../templates/tekstil/OutletZoneTemplate';
import EcoTextileTemplate from '../templates/tekstil/EcoTextileTemplate';

// 💻 TEKNOLOJİ TEMALARI
import TechHubTemplate from '../templates/teknoloji/TechHubTemplate';

// 🍪 GIDA TEMALARI
import OrganicMarketTemplate from '../templates/gida/OrganicMarketTemplate';

// 🛋️ MOBİLYA TEMALARI
import ModernMinimalTemplate from '../templates/mobilya/ModernMinimalTemplate';

// 🏠 EV & YAŞAM TEMALARI
import MegaStoreTemplate from '../templates/ev-yasam/MegaStoreTemplate';

export const themeMap = {
  // 👕 TEKSTİL TEMALARI
  "fashion-store": FashionStoreTemplate,
  "boutique-chic": BoutiqueChicTemplate,
  "luxury-style": LuxuryStyleTemplate,
  "urban-street": UrbanStreetTemplate,
  "minimal-wear": MinimalWearTemplate,
  "retro-vintage": RetroVintageTemplate,
  "hijab-fashion": HijabFashionTemplate,
  "kids-wear": KidsWearTemplate,
  "outlet-zone": OutletZoneTemplate,
  "eco-textile": EcoTextileTemplate,
  
  // 💻 TEKNOLOJİ TEMALARI
  "tech-hub": TechHubTemplate,
  
  // 🍪 GIDA TEMALARI
  "organic-market": OrganicMarketTemplate,
  
  // 🛋️ MOBİLYA TEMALARI
  "modern-minimal": ModernMinimalTemplate,
  
  // 🏠 EV & YAŞAM TEMALARI
  "mega-store": MegaStoreTemplate
};

export type ThemeKey = keyof typeof themeMap;