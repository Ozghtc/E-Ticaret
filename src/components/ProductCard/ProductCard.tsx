import React from 'react';
import { Heart, Star, ShoppingCart, Eye, Zap, Truck, Shield, Award, Leaf } from 'lucide-react';
import { Product } from '../../context/ThemeContext';
import { categoryConfigs, CategoryConfig } from './categoryConfigs';
import { getThemeCardConfig, getThemeById } from '../../config/themes';

interface ProductCardProps {
  product: Product;
  category?: string;
  theme?: string;
  onAddToCart?: (product: Product) => void;
  onToggleWishlist?: (product: Product) => void;
  onQuickView?: (product: Product) => void;
  className?: string;
}

export default function ProductCard({ 
  product, 
  category = 'general',
  theme = 'default',
  onAddToCart, 
  onToggleWishlist,
  onQuickView,
  className = ''
}: ProductCardProps) {
  const categoryConfig: CategoryConfig = categoryConfigs[category] || categoryConfigs.general;
  const themeData = getThemeById(theme);
  const themeConfig = getThemeCardConfig(theme);
  
  // Fallback to default if theme not found
  if (!themeConfig) {
    console.warn(`Theme config not found for: ${theme}`);
    return <div>Theme not found</div>;
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getLayoutClass = () => {
    switch (themeConfig.layout) {
      case 'grid-2': return 'col-span-2';
      case 'grid-3': return 'col-span-1';
      case 'grid-4': return 'col-span-1';
      case 'side-by-side': return 'flex flex-row';
      default: return 'col-span-1';
    }
  };

  const getHoverEffectClass = () => {
    switch (themeConfig.hoverEffect) {
      case 'zoom': return 'group-hover:scale-105';
      case 'slide': return 'group-hover:translate-y-[-4px]';
      case 'fade': return 'group-hover:opacity-80';
      case 'glow': return 'group-hover:shadow-lg';
      default: return '';
    }
  };

  const cardStyle = {
    backgroundColor: themeConfig.colors.background,
    color: themeConfig.colors.text,
    fontFamily: themeConfig.font,
    borderRadius: themeConfig.borderRadius,
    boxShadow: themeConfig.shadow,
    border: themeConfig.colors.border ? `1px solid ${themeConfig.colors.border}` : 'none'
  };

  const getThemeSpecificClasses = () => {
    switch (theme) {
      case 'luxury-style':
        return 'border-2 border-yellow-500 bg-gradient-to-br from-gray-900 to-black';
      case 'urban-street':
        return 'border-2 border-red-500 bg-black transform hover:rotate-1';
      case 'kids-wear':
        return 'border-4 border-yellow-300 bg-gradient-to-br from-yellow-50 to-pink-50 rounded-2xl';
      case 'outlet-zone':
        return 'border-2 border-red-300 bg-red-50 relative overflow-hidden';
      case 'eco-textile':
        return 'border border-green-300 bg-green-50';
      case 'retro-vintage':
        return 'border border-amber-300 bg-amber-50 sepia';
      case 'hijab-fashion':
        return 'border border-purple-300 bg-purple-50';
      case 'boutique-chic':
        return 'border border-pink-200 bg-pink-50 rounded-xl';
      case 'minimal-wear':
        return 'border border-gray-200 bg-white shadow-none';
      default:
        return '';
    }
  };

  return (
    <div 
      className={`product-card ${getLayoutClass()} ${className} ${themeConfig.cardClass} ${getThemeSpecificClasses()} group transition-all duration-300`}
      style={cardStyle}
    >
      {/* Product Image Container */}
      <div className="relative overflow-hidden" style={{ borderRadius: themeConfig.borderRadius }}>
        <img
          src={product.image}
          alt={product.name}
          className={`w-full object-cover transition-transform duration-300 ${getHoverEffectClass()}`}
          style={{ height: categoryConfig.imageHeight }}
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {/* Theme Specific Badges */}
          {theme === 'luxury-style' && (
            <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-2 py-1 rounded text-xs font-bold">
              💎 LUXURY
            </span>
          )}
          
          {theme === 'urban-street' && (
            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold transform -rotate-2">
              🔥 STREET
            </span>
          )}
          
          {theme === 'kids-wear' && (
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold animate-pulse">
              👶 KIDS
            </span>
          )}
          
          {theme === 'outlet-zone' && (
            <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold animate-bounce">
              🔖 OUTLET
            </span>
          )}
          
          {theme === 'eco-textile' && (
            <span className="bg-green-600 text-white px-2 py-1 rounded text-xs font-medium">
              🌿 ECO
            </span>
          )}

          {/* Discount Badge */}
          {product.discount && product.discount > 0 && categoryConfig.showDiscount && (
            <span 
              className="px-2 py-1 rounded text-xs font-medium text-white"
              style={{ backgroundColor: themeConfig.colors.accent }}
            >
              %{product.discount} İndirim
            </span>
          )}
          
          {/* New Badge */}
          {product.isNew && categoryConfig.showNewBadge && (
            <span className="bg-green-500 text-white px-2 py-1 rounded text-xs font-medium">
              YENİ
            </span>
          )}
          
          {/* Category Specific Badges */}
          {category === 'organic-market' && product.organic && (
            <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs flex items-center">
              <Leaf size={10} className="mr-1" />
              Organik
            </div>
          )}
          
          {category === 'mega-store' && product.isBestseller && (
            <span className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-medium">
              🏆 Çok Satan
            </span>
          )}
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2">
          {/* Rating */}
          {categoryConfig.showRating && (
            <div className="bg-white bg-opacity-90 px-2 py-1 rounded-full flex items-center space-x-1">
              <Star size={12} className="text-yellow-500 fill-current" />
              <span className="text-xs font-medium text-gray-800">{product.rating}</span>
            </div>
          )}
          
          {/* Wishlist */}
          {categoryConfig.showWishlist && (
            <button 
              onClick={() => onToggleWishlist?.(product)}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              <Heart size={16} className="text-gray-400 hover:text-red-500" />
            </button>
          )}
        </div>

        {/* Hover Overlay */}
        {themeConfig.showQuickActions && (
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
            <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 flex space-x-2">
              {categoryConfig.showQuickView && (
                <button 
                  onClick={() => onQuickView?.(product)}
                  className="bg-white text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center space-x-1"
                >
                  <Eye size={14} />
                  <span className="text-sm">Hızlı Bak</span>
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-4 flex-1">
        {/* Brand */}
        {categoryConfig.showBrand && product.brand && (
          <div className="text-xs text-gray-500 mb-1">{product.brand}</div>
        )}
        
        {/* Product Name */}
        <h3 className="font-medium mb-2 line-clamp-2" style={{ 
          color: themeConfig.colors.text,
          fontSize: themeConfig.fontSize.title,
          fontFamily: theme === 'retro-vintage' ? 'Playfair Display, serif' : 
                     theme === 'kids-wear' ? 'Comic Neue, cursive' :
                     theme === 'urban-street' ? 'Oswald, sans-serif' :
                     theme === 'luxury-style' ? 'Playfair Display, serif' : 'inherit'
        }}>
          {product.name}
        </h3>
        
        {/* Rating & Reviews */}
        {categoryConfig.showRating && (
          <div className="flex items-center mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={12}
                  className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
          </div>
        )}

        {/* Category Specific Content */}
        {category === 'tekstil' && categoryConfig.showVariants && (
          <div className="mb-3">
            {/* Sizes */}
            {product.sizes && (
              <div className="flex items-center space-x-1 mb-1">
                <span className="text-xs text-gray-500">Beden:</span>
                {product.sizes.slice(0, 4).map((size) => (
                  <span key={size} className="text-xs bg-gray-100 px-2 py-1 rounded">{size}</span>
                ))}
              </div>
            )}
            {/* Colors */}
            {product.colors && (
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-500">Renk:</span>
                <span className="text-xs text-gray-600">{product.colors.slice(0, 2).join(', ')}</span>
              </div>
            )}
          </div>
        )}

        {category === 'tech-hub' && categoryConfig.showSpecs && product.specs && (
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {product.specs.slice(0, 2).map((spec, index) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {spec}
                </span>
              ))}
            </div>
          </div>
        )}

        {category === 'organic-market' && (
          <div className="mb-3">
            {product.local && (
              <div className="flex items-center text-xs text-blue-600 mb-1">
                <Award size={12} className="mr-1" />
                <span>Yerel Üretici</span>
              </div>
            )}
            {product.certifications && (
              <div className="text-xs text-green-600">
                {product.certifications.slice(0, 1).join(', ')}
              </div>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span 
              className="text-lg font-bold"
              style={{ color: themeConfig.colors.price }}
            >
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="text-sm text-gray-500 line-through ml-2">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Features */}
        {categoryConfig.showFeatures && (
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3 text-xs">
              {product.freeShipping && (
                <div className="flex items-center text-green-600">
                  <Truck size={12} className="mr-1" />
                  <span>Ücretsiz Kargo</span>
                </div>
              )}
              {product.fastDelivery && (
                <div className="flex items-center text-blue-600">
                  <Zap size={12} className="mr-1" />
                  <span>Hızlı Teslimat</span>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Add to Cart Button */}
        <button 
          onClick={() => onAddToCart?.(product)}
          className={`w-full py-2 rounded-md font-medium transition-all duration-300 ${themeConfig.buttonClass} ${
            theme === 'kids-wear' ? 'transform hover:scale-105 animate-pulse' :
            theme === 'luxury-style' ? 'font-bold tracking-wide' :
            theme === 'urban-street' ? 'font-bold uppercase' :
            theme === 'outlet-zone' ? 'animate-pulse font-bold' : ''
          }`}
          style={{ 
            backgroundColor: themeConfig.colors.button,
            color: themeConfig.colors.buttonText 
          }}
        >
          <div className="flex items-center justify-center space-x-2">
            <ShoppingCart size={16} />
            <span>
              {theme === 'luxury-style' ? 'SATIN AL' :
               theme === 'urban-street' ? 'KAPAT' :
               theme === 'kids-wear' ? 'Sepete At!' :
               theme === 'outlet-zone' ? 'HEMEN AL!' :
               theme === 'eco-textile' ? 'Doğal Seçim' :
               'Sepete Ekle'}
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}