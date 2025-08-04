import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Search, 
  ShoppingBag, 
  User, 
  Heart,
  Star,
  Filter,
  Grid3X3,
  List,
  ChevronDown,
  Truck,
  Shield,
  RotateCcw,
  Phone,
  Instagram,
  Facebook,
  Twitter,
  Plus,
  Minus,
  X,
  CreditCard,
  Lock
} from 'lucide-react';

function FashionStoreDemo() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeNavCategory, setActiveNavCategory] = useState('all');
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showProductModal, setShowProductModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [showCheckout, setShowCheckout] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const categories = [
    { id: 'all', name: 'Tüm Ürünler', count: 24 },
    { id: 'yeni-gelenler', name: 'Yeni Gelenler', count: 8 },
    { id: 'kadin', name: 'Kadın Giyim', count: 8 },
    { id: 'erkek', name: 'Erkek Giyim', count: 6 },
    { id: 'ayakkabi', name: 'Ayakkabı', count: 4 },
    { id: 'aksesuar', name: 'Aksesuar', count: 3 },
    { id: 'indirim', name: 'İndirimli Ürünler', count: 12 }
  ];

  const products = [
    // Yeni Gelenler
    {
      id: 1,
      name: "Vintage Denim Ceket",
      price: 899,
      originalPrice: 1299,
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.9,
      reviews: 127,
      discount: 31,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Mavi', 'Siyah'],
      category: 'yeni-gelenler',
      isNew: true
    },
    {
      id: 2,
      name: "Bohem Tarzı Elbise",
      price: 649,
      originalPrice: 899,
      image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.8,
      reviews: 89,
      discount: 28,
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Beyaz', 'Bej', 'Siyah'],
      category: 'kadin',
      isNew: true
    },
    // Kadın Giyim
    {
      id: 3,
      name: "Klasik Blazer Ceket",
      price: 1299,
      originalPrice: 1799,
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.7,
      reviews: 156,
      discount: 28,
      sizes: ['S', 'M', 'L'],
      colors: ['Siyah', 'Lacivert', 'Gri'],
      category: 'kadin'
    },
    {
      id: 4,
      name: "Şık Midi Etek",
      price: 449,
      originalPrice: 599,
      image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.6,
      reviews: 98,
      discount: 25,
      sizes: ['XS', 'S', 'M', 'L'],
      colors: ['Siyah', 'Lacivert', 'Bordo'],
      category: 'kadin'
    },
    {
      id: 5,
      name: "Kadın Triko Kazak",
      price: 349,
      originalPrice: 449,
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.8,
      reviews: 156,
      discount: 22,
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      colors: ['Bej', 'Siyah', 'Beyaz', 'Gri'],
      category: 'kadin'
    },
    {
      id: 6,
      name: "Yüksek Bel Mom Jean",
      price: 549,
      originalPrice: 749,
      image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.9,
      reviews: 234,
      discount: 27,
      sizes: ['26', '27', '28', '29', '30'],
      colors: ['Mavi', 'Siyah', 'Beyaz'],
      category: 'kadin'
    },
    // Erkek Giyim
    {
      id: 7,
      name: "Erkek Polo Tişört",
      price: 299,
      originalPrice: 399,
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.7,
      reviews: 145,
      discount: 25,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Lacivert', 'Siyah', 'Beyaz', 'Gri'],
      category: 'erkek'
    },
    {
      id: 8,
      name: "Erkek Chino Pantolon",
      price: 599,
      originalPrice: 799,
      image: "https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.8,
      reviews: 189,
      discount: 25,
      sizes: ['30', '32', '34', '36', '38'],
      colors: ['Bej', 'Lacivert', 'Siyah'],
      category: 'erkek'
    },
    {
      id: 9,
      name: "Erkek Sweatshirt",
      price: 449,
      originalPrice: 599,
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.6,
      reviews: 123,
      discount: 25,
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Gri', 'Siyah', 'Lacivert'],
      category: 'erkek'
    },
    // Ayakkabı
    {
      id: 10,
      name: "Şık Topuklu Ayakkabı",
      price: 799,
      originalPrice: 1099,
      image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.8,
      reviews: 167,
      discount: 27,
      sizes: ['36', '37', '38', '39', '40'],
      colors: ['Siyah', 'Nude', 'Kırmızı'],
      category: 'ayakkabi'
    },
    {
      id: 11,
      name: "Kadın Spor Ayakkabı",
      price: 649,
      originalPrice: 849,
      image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.9,
      reviews: 234,
      discount: 24,
      sizes: ['36', '37', '38', '39', '40'],
      colors: ['Beyaz', 'Siyah', 'Pembe'],
      category: 'ayakkabi'
    },
    {
      id: 12,
      name: "Erkek Deri Ayakkabı",
      price: 899,
      originalPrice: 1199,
      image: "https://images.pexels.com/photos/1464625/pexels-photo-1464625.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.7,
      reviews: 156,
      discount: 25,
      sizes: ['40', '41', '42', '43', '44'],
      colors: ['Siyah', 'Kahverengi'],
      category: 'ayakkabi'
    },
    // Aksesuar
    {
      id: 13,
      name: "Deri El Çantası",
      price: 1299,
      originalPrice: 1699,
      image: "https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.8,
      reviews: 89,
      discount: 24,
      sizes: ['Tek Beden'],
      colors: ['Siyah', 'Kahverengi', 'Bej'],
      category: 'aksesuar'
    },
    {
      id: 14,
      name: "Güneş Gözlüğü",
      price: 399,
      originalPrice: 549,
      image: "https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.6,
      reviews: 67,
      discount: 27,
      sizes: ['Tek Beden'],
      colors: ['Siyah', 'Kahverengi'],
      category: 'aksesuar'
    },
    {
      id: 15,
      name: "Deri Kemer",
      price: 249,
      originalPrice: 349,
      image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=300",
      rating: 4.7,
      reviews: 123,
      discount: 29,
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Siyah', 'Kahverengi'],
      category: 'aksesuar'
    }
  ];

  const getFilteredProducts = () => {
    if (activeNavCategory === 'all') return products;
    if (activeNavCategory === 'indirim') return products.filter(p => p.discount > 0);
    return products.filter(p => p.category === activeNavCategory || (activeNavCategory === 'yeni-gelenler' && p.isNew));
  };

  const filteredProducts = getFilteredProducts();

  const addToCart = (product, size = 'M', color = 'Siyah') => {
    const cartItem = {
      ...product,
      cartId: Date.now(),
      selectedSize: size,
      selectedColor: color,
      quantity: 1
    };
    setCart([...cart, cartItem]);
    setShowProductModal(false);
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const updateQuantity = (cartId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(cartId);
      return;
    }
    setCart(cart.map(item => 
      item.cartId === cartId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const toggleWishlist = (product) => {
    const isInWishlist = wishlist.some(item => item.id === product.id);
    if (isInWishlist) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-green-50 flex items-center justify-center">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
          <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
            <Shield className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Siparişiniz Alındı!</h2>
          <p className="text-gray-600 mb-6">
            Sipariş numaranız: <strong>#FS{Date.now().toString().slice(-6)}</strong>
          </p>
          <p className="text-gray-600 mb-6">
            Siparişiniz hazırlanıyor. Kargo takip bilgileri e-posta adresinize gönderilecektir.
          </p>
          <button
            onClick={() => {
              setOrderComplete(false);
              setCart([]);
              setShowCheckout(false);
            }}
            className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors"
          >
            Alışverişe Devam Et
          </button>
        </div>
      </div>
    );
  }

  if (showCheckout) {
    return <CheckoutPage 
      cart={cart} 
      onBack={() => setShowCheckout(false)}
      onComplete={() => setOrderComplete(true)}
      formatPrice={formatPrice}
      getTotalPrice={getTotalPrice}
    />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        {/* Top Bar */}
        <div className="bg-black text-white py-2">
          <div className="max-w-7xl mx-auto px-4 flex justify-between items-center text-sm">
            <div className="flex items-center space-x-4">
              <span>🚚 Ücretsiz Kargo - 500 TL Üzeri</span>
              <span>✨ Yeni Koleksiyon</span>
            </div>
            <div className="flex items-center space-x-4">
              <span>📞 0212 123 45 67</span>
              <span>📧 info@fashionstore.com</span>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button & Logo */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin/tema-sistemi')}
                className="flex items-center text-gray-600 hover:text-pink-600 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Tema Seçimine Dön
              </button>
              <div className="text-3xl font-bold text-pink-600">Fashion Store</div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl mx-8">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-pink-600 text-white p-2 rounded-full hover:bg-pink-700">
                  <Search size={16} />
                </button>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-600 hover:text-pink-600 relative">
                <Heart size={24} />
                {wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{wishlist.length}</span>}
              </button>
              <button onClick={() => setShowCart(true)} className="p-2 text-gray-600 hover:text-pink-600 relative">
                <ShoppingBag size={24} />
                {cart.length > 0 && <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">{getTotalItems()}</span>}
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-pink-600">
                <User size={24} />
                <span>Hesabım</span>
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="border-t border-gray-200">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex items-center justify-center space-x-12 py-4">
              <button 
                onClick={() => setActiveNavCategory('yeni-gelenler')}
                className={`transition-colors font-medium ${activeNavCategory === 'yeni-gelenler' ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'}`}
              >
                Yeni Gelenler
              </button>
              <button 
                onClick={() => setActiveNavCategory('kadin')}
                className={`transition-colors font-medium ${activeNavCategory === 'kadin' ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'}`}
              >
                Kadın
              </button>
              <button 
                onClick={() => setActiveNavCategory('erkek')}
                className={`transition-colors font-medium ${activeNavCategory === 'erkek' ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'}`}
              >
                Erkek
              </button>
              <button 
                onClick={() => setActiveNavCategory('ayakkabi')}
                className={`transition-colors font-medium ${activeNavCategory === 'ayakkabi' ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'}`}
              >
                Ayakkabı
              </button>
              <button 
                onClick={() => setActiveNavCategory('aksesuar')}
                className={`transition-colors font-medium ${activeNavCategory === 'aksesuar' ? 'text-pink-600' : 'text-gray-700 hover:text-pink-600'}`}
              >
                Aksesuar
              </button>
              <button 
                onClick={() => setActiveNavCategory('indirim')}
                className={`font-semibold ${activeNavCategory === 'indirim' ? 'text-pink-600' : 'text-pink-600 hover:text-pink-700'}`}
              >
                🔥 İndirim
              </button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-pink-100 to-purple-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">Yeni Sezon Koleksiyonu</h1>
          <p className="text-xl text-gray-600 mb-8">Tarzınızı yansıtan özel parçalar</p>
          <button className="bg-pink-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-pink-700 transition-colors text-lg">
            Koleksiyonu Keşfet
          </button>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <aside className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
                <Filter size={16} className="mr-2" />
                Filtreler
              </h3>
              
              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Kategoriler</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.id} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.id}
                        checked={selectedCategory === category.id}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="text-pink-600 focus:ring-pink-500"
                      />
                      <span className="ml-2 text-sm text-gray-600">
                        {category.name} ({category.count})
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Size */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Beden</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
                    <button key={size} className="border border-gray-300 py-2 text-sm hover:border-pink-500 hover:text-pink-600 transition-colors">
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Renk</h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    { name: 'Siyah', color: 'bg-black' },
                    { name: 'Beyaz', color: 'bg-white border' },
                    { name: 'Mavi', color: 'bg-blue-500' },
                    { name: 'Kırmızı', color: 'bg-red-500' },
                    { name: 'Pembe', color: 'bg-pink-500' }
                  ].map((color) => (
                    <button key={color.name} className={`w-8 h-8 rounded-full ${color.color} hover:scale-110 transition-transform`} title={color.name}></button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-medium text-gray-700 mb-3">Fiyat Aralığı</h4>
                <div className="space-y-2">
                  <label className="flex items-center">
                    <input type="checkbox" className="text-pink-600 focus:ring-pink-500" />
                    <span className="ml-2 text-sm text-gray-600">0 - 500 TL</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="text-pink-600 focus:ring-pink-500" />
                    <span className="ml-2 text-sm text-gray-600">500 - 1000 TL</span>
                  </label>
                  <label className="flex items-center">
                    <input type="checkbox" className="text-pink-600 focus:ring-pink-500" />
                    <span className="ml-2 text-sm text-gray-600">1000+ TL</span>
                  </label>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Section */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <span className="text-gray-600">{filteredProducts.length} ürün bulundu</span>
                  <select className="border border-gray-300 rounded-md px-3 py-1 text-sm">
                    <option>Önerilen</option>
                    <option>En Düşük Fiyat</option>
                    <option>En Yüksek Fiyat</option>
                    <option>En Yeni</option>
                    <option>En Popüler</option>
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-pink-100 text-pink-600' : 'text-gray-400'}`}
                  >
                    <Grid3X3 size={16} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-pink-100 text-pink-600' : 'text-gray-400'}`}
                  >
                    <List size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
              {filteredProducts.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-shadow overflow-hidden group">
                  <div className="relative">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {product.isNew && (
                      <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded text-sm font-medium">
                        YENİ
                      </div>
                    )}
                    {product.discount > 0 && (
                      <div className={`absolute ${product.isNew ? 'top-12 left-3' : 'top-3 left-3'} bg-pink-500 text-white px-2 py-1 rounded text-sm font-medium`}>
                        %{product.discount} İndirim
                      </div>
                    )}
                    <button className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50">
                      <Heart 
                        size={16} 
                        className={`${wishlist.some(item => item.id === product.id) ? 'text-pink-500 fill-current' : 'text-gray-400'} hover:text-pink-500`}
                        onClick={() => toggleWishlist(product)}
                      />
                    </button>
                    
                    {/* Quick View on Hover */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <button 
                        onClick={() => {
                          setSelectedProduct(product);
                          setSelectedSize(product.sizes[0]);
                          setSelectedColor(product.colors[0]);
                          setShowProductModal(true);
                        }}
                        className="bg-white text-gray-800 px-4 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-gray-100"
                      >
                        Hızlı Görüntüle
                      </button>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    
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

                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <span className="text-lg font-bold text-gray-900">{formatPrice(product.price)}</span>
                        {product.originalPrice > product.price && (
                          <span className="text-sm text-gray-500 line-through ml-2">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Size Options */}
                    <div className="mb-3">
                      <div className="flex items-center space-x-1">
                        <span className="text-xs text-gray-500">Beden:</span>
                        {product.sizes.slice(0, 4).map((size) => (
                          <span key={size} className="text-xs bg-gray-100 px-2 py-1 rounded">{size}</span>
                        ))}
                      </div>
                    </div>

                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-pink-600 text-white py-2 rounded-md hover:bg-pink-700 transition-colors font-medium"
                    >
                      Sepete Ekle
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        </div>
      </div>

      {/* Features Section */}
      <section className="bg-white py-12 mt-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-pink-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="w-8 h-8 text-pink-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Ücretsiz Kargo</h3>
              <p className="text-gray-600 text-sm">500 TL üzeri siparişlerde</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Güvenli Alışveriş</h3>
              <p className="text-gray-600 text-sm">SSL sertifikalı ödeme</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Kolay İade</h3>
              <p className="text-gray-600 text-sm">30 gün içinde ücretsiz</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Müşteri Hizmetleri</h3>
              <p className="text-gray-600 text-sm">7/24 canlı destek</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-pink-600 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Yeni Koleksiyonlardan Haberdar Olun
          </h2>
          <p className="text-pink-100 mb-8">
            İlk sizin öğrenmek istediğiniz kampanya ve yenilikleri e-posta ile alın
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="E-posta adresiniz"
              className="flex-1 px-4 py-3 rounded-l-lg focus:outline-none"
            />
            <button className="bg-black text-white px-6 py-3 rounded-r-lg hover:bg-gray-800 transition-colors">
              Abone Ol
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-pink-400">Fashion Store</h3>
              <p className="text-gray-400 mb-4">
                Tarzınızı yansıtan özel parçalar ile gardırobunuzu tamamlayın.
              </p>
              <div className="flex space-x-4">
                <Instagram className="w-6 h-6 text-gray-400 hover:text-pink-400 cursor-pointer" />
                <Facebook className="w-6 h-6 text-gray-400 hover:text-pink-400 cursor-pointer" />
                <Twitter className="w-6 h-6 text-gray-400 hover:text-pink-400 cursor-pointer" />
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Kategoriler</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Kadın Giyim</a></li>
                <li><a href="#" className="hover:text-white">Erkek Giyim</a></li>
                <li><a href="#" className="hover:text-white">Ayakkabı</a></li>
                <li><a href="#" className="hover:text-white">Aksesuar</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Müşteri Hizmetleri</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">İletişim</a></li>
                <li><a href="#" className="hover:text-white">Kargo & Teslimat</a></li>
                <li><a href="#" className="hover:text-white">İade & Değişim</a></li>
                <li><a href="#" className="hover:text-white">Beden Rehberi</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">İletişim</h4>
              <ul className="space-y-2 text-gray-400">
                <li>📍 İstanbul, Türkiye</li>
                <li>📞 0212 123 45 67</li>
                <li>📧 info@fashionstore.com</li>
                <li>🕒 Pazartesi - Cumartesi: 09:00 - 18:00</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Fashion Store - Tüm hakları saklıdır. Bu demo Altıntassoft tarafından oluşturulmuştur.</p>
          </div>
        </div>
      </footer>

      {/* Cart Modal */}
      {showCart && <CartModal 
        cart={cart}
        onClose={() => setShowCart(false)}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={() => {
          setShowCart(false);
          setShowCheckout(true);
        }}
        formatPrice={formatPrice}
        getTotalPrice={getTotalPrice}
      />}

      {/* Product Modal */}
      {showProductModal && selectedProduct && <ProductModal 
        product={selectedProduct}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        onSizeChange={setSelectedSize}
        onColorChange={setSelectedColor}
        onClose={() => setShowProductModal(false)}
        onAddToCart={() => addToCart(selectedProduct, selectedSize, selectedColor)}
        formatPrice={formatPrice}
      />}
    </div>
  );
}

// Cart Modal Component
function CartModal({ cart, onClose, onUpdateQuantity, onRemove, onCheckout, formatPrice, getTotalPrice }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Sepetim ({cart.length} ürün)</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 max-h-96 overflow-y-auto">
          {cart.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Sepetiniz boş</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <div key={item.cartId} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-500">Beden: {item.selectedSize} | Renk: {item.selectedColor}</p>
                    <p className="font-bold text-pink-600">{formatPrice(item.price)}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => onUpdateQuantity(item.cartId, item.quantity - 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Minus size={16} />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => onUpdateQuantity(item.cartId, item.quantity + 1)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Plus size={16} />
                    </button>
                  </div>
                  <button 
                    onClick={() => onRemove(item.cartId)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="p-6 border-t border-gray-200">
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold">Toplam:</span>
              <span className="text-xl font-bold text-pink-600">{formatPrice(getTotalPrice())}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium"
            >
              Ödemeye Geç
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// Product Modal Component
function ProductModal({ product, selectedSize, selectedColor, onSizeChange, onColorChange, onClose, onAddToCart, formatPrice }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden">
        <div className="flex">
          <div className="w-1/2">
            <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
          </div>
          <div className="w-1/2 p-6">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">{product.name}</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                <X size={20} />
              </button>
            </div>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">({product.reviews} değerlendirme)</span>
            </div>

            <div className="mb-6">
              <span className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</span>
              {product.originalPrice > product.price && (
                <span className="text-lg text-gray-500 line-through ml-2">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Beden Seçin:</h3>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => onSizeChange(size)}
                    className={`px-4 py-2 border rounded ${
                      selectedSize === size ? 'border-pink-500 bg-pink-50' : 'border-gray-300'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="font-medium mb-2">Renk Seçin:</h3>
              <div className="flex space-x-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => onColorChange(color)}
                    className={`px-4 py-2 border rounded ${
                      selectedColor === color ? 'border-pink-500 bg-pink-50' : 'border-gray-300'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <button 
              onClick={onAddToCart}
              className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium mb-4"
            >
              Sepete Ekle
            </button>

            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex items-center">
                <Truck size={16} className="mr-2" />
                <span>Ücretsiz kargo - 500 TL üzeri</span>
              </div>
              <div className="flex items-center">
                <RotateCcw size={16} className="mr-2" />
                <span>30 gün içinde ücretsiz iade</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Checkout Page Component
function CheckoutPage({ cart, onBack, onComplete, formatPrice, getTotalPrice }) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    postalCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handlePayment = () => {
    // Simulate payment processing
    setTimeout(() => {
      onComplete();
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <button onClick={onBack} className="flex items-center text-pink-600 hover:text-pink-700">
            <ArrowLeft size={20} className="mr-2" />
            Sepete Dön
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Checkout Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold mb-6">Ödeme Bilgileri</h2>
            
            {step === 1 && (
              <div className="space-y-4">
                <h3 className="text-lg font-medium">İletişim Bilgileri</h3>
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
                
                <h3 className="text-lg font-medium mt-6">Teslimat Adresi</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Ad"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                  <input
                    type="text"
                    placeholder="Soyad"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                <input
                  type="text"
                  placeholder="Adres"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Şehir"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                  <input
                    type="text"
                    placeholder="Posta Kodu"
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <button
                  onClick={() => setStep(2)}
                  className="w-full bg-pink-600 text-white py-3 rounded-lg hover:bg-pink-700 transition-colors font-medium mt-6"
                >
                  Ödeme Bilgilerine Geç
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div className="flex items-center mb-4">
                  <button onClick={() => setStep(1)} className="text-pink-600 hover:text-pink-700 mr-4">
                    <ArrowLeft size={20} />
                  </button>
                  <h3 className="text-lg font-medium">Kredi Kartı Bilgileri</h3>
                </div>
                
                <div className="flex items-center space-x-2 mb-4">
                  <CreditCard className="text-gray-400" size={20} />
                  <span className="text-sm text-gray-600">Güvenli ödeme</span>
                  <Lock className="text-green-500" size={16} />
                </div>
                
                <input
                  type="text"
                  placeholder="Kart üzerindeki isim"
                  value={formData.cardName}
                  onChange={(e) => handleInputChange('cardName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
                
                <input
                  type="text"
                  placeholder="Kart numarası (1234 5678 9012 3456)"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                />
                
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={formData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                  <input
                    type="text"
                    placeholder="CVV"
                    value={formData.cvv}
                    onChange={(e) => handleInputChange('cvv', e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500"
                  />
                </div>
                
                <button
                  onClick={handlePayment}
                  className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-medium mt-6 flex items-center justify-center"
                >
                  <Lock className="mr-2" size={16} />
                  Ödemeyi Tamamla ({formatPrice(getTotalPrice())})
                </button>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-bold mb-4">Sipariş Özeti</h3>
            <div className="space-y-4 mb-6">
              {cart.map((item) => (
                <div key={item.cartId} className="flex items-center space-x-3">
                  <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded" />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.selectedSize} | {item.selectedColor}</p>
                    <p className="text-xs text-gray-500">Adet: {item.quantity}</p>
                  </div>
                  <span className="font-medium">{formatPrice(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span>Ara Toplam:</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
              <div className="flex justify-between">
                <span>Kargo:</span>
                <span className="text-green-600">Ücretsiz</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Toplam:</span>
                <span>{formatPrice(getTotalPrice())}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FashionStoreDemo;