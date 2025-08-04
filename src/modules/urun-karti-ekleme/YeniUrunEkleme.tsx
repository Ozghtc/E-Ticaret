import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Package, Palette, Cpu, Leaf, ShoppingBag, Smartphone, Home, Gamepad2, Baby, Car, Plane, Dumbbell, Heart, BookOpen, PawPrint, Gem } from 'lucide-react';

function YeniUrunEkleme() {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const categories = [
    { 
      id: 'tekstil', 
      name: 'Tekstil & Moda', 
      icon: Palette, 
      color: 'bg-pink-500 hover:bg-pink-600',
      description: 'Giyim, ayakkabı, aksesuar',
      emoji: '👕'
    },
    { 
      id: 'teknoloji', 
      name: 'Teknoloji', 
      icon: Cpu, 
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'Elektronik, bilgisayar, telefon',
      emoji: '💻'
    },
    { 
      id: 'gida', 
      name: 'Gıda & İçecek', 
      icon: Leaf, 
      color: 'bg-green-500 hover:bg-green-600',
      description: 'Organik ürünler, gıda',
      emoji: '🍪'
    },
    { 
      id: 'kozmetik', 
      name: 'Kozmetik & Bakım', 
      icon: Heart, 
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'Güzellik, bakım ürünleri',
      emoji: '🧴'
    },
    { 
      id: 'mobilya', 
      name: 'Mobilya & Dekorasyon', 
      icon: Home, 
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'Ev mobilyası, dekorasyon',
      emoji: '🛋️'
    },
    { 
      id: 'ev-yasam', 
      name: 'Ev & Yaşam', 
      icon: Home, 
      color: 'bg-slate-500 hover:bg-slate-600',
      description: 'Ev eşyaları, yaşam ürünleri',
      emoji: '🏠'
    },
    { 
      id: 'oyun', 
      name: 'Oyun & Konsol', 
      icon: Gamepad2, 
      color: 'bg-indigo-500 hover:bg-indigo-600',
      description: 'Video oyunları, konsol',
      emoji: '🎮'
    },
    { 
      id: 'anne-bebek', 
      name: 'Anne & Bebek', 
      icon: Baby, 
      color: 'bg-yellow-500 hover:bg-yellow-600',
      description: 'Bebek ürünleri, oyuncak',
      emoji: '🍼'
    },
    { 
      id: 'otomotiv', 
      name: 'Otomotiv', 
      icon: Car, 
      color: 'bg-gray-500 hover:bg-gray-600',
      description: 'Araç aksesuarı, yedek parça',
      emoji: '🚗'
    },
    { 
      id: 'seyahat', 
      name: 'Seyahat & Outdoor', 
      icon: Plane, 
      color: 'bg-cyan-500 hover:bg-cyan-600',
      description: 'Bavul, kamp malzemeleri',
      emoji: '🧳'
    },
    { 
      id: 'spor', 
      name: 'Spor & Sağlık', 
      icon: Dumbbell, 
      color: 'bg-red-500 hover:bg-red-600',
      description: 'Fitness, spor malzemeleri',
      emoji: '🧘'
    },
    { 
      id: 'kirtasiye', 
      name: 'Kırtasiye & Ofis', 
      icon: BookOpen, 
      color: 'bg-emerald-500 hover:bg-emerald-600',
      description: 'Ofis malzemeleri, kırtasiye',
      emoji: '📚'
    },
    { 
      id: 'hayvan', 
      name: 'Evcil Hayvan', 
      icon: PawPrint, 
      color: 'bg-lime-500 hover:bg-lime-600',
      description: 'Pet shop, hayvan ürünleri',
      emoji: '🐶'
    },
    { 
      id: 'taki', 
      name: 'Takı & Aksesuar', 
      icon: Gem, 
      color: 'bg-rose-500 hover:bg-rose-600',
      description: 'Mücevher, takı, saat',
      emoji: '💍'
    }
  ];

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    // Tekstil için özel modül, diğerleri için direkt form
    if (categoryId === 'tekstil') {
      navigate('/admin/tekstil-moda');
    } else {
      navigate(`/admin/urun-ekleme/${categoryId}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin" className="flex items-center text-gray-600 hover:text-blue-600 mr-6 transition-colors">
                <ArrowLeft size={20} className="mr-2" />
                Admin Panel'e Dön
              </Link>
              <div className="bg-blue-100 px-4 py-2 rounded-full">
                <span className="font-bold text-blue-800">Altıntassoft</span>
              </div>
            </div>
            <div className="text-gray-600 text-sm">
              Profesyonel Ürün Ekleme Sistemi
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="bg-blue-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
            <Package className="w-12 h-12 text-blue-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Ürün Ekleme Sistemi
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Kategori seçin ve o kategoriye özel ürün ekleme formunu kullanın. 
            Her kategori için özelleştirilmiş alanlar ve validasyonlar.
          </p>
        </div>

        {/* Category Selection Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const CategoryIcon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => handleCategorySelect(category.id)}
                className={`${category.color} text-white rounded-xl p-6 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl group`}
              >
                <div className="text-center">
                  {/* Emoji & Icon */}
                  <div className="flex items-center justify-center mb-4">
                    <span className="text-3xl mr-2">{category.emoji}</span>
                    <CategoryIcon size={32} className="text-white" />
                  </div>
                  
                  {/* Category Name */}
                  <h3 className="font-bold text-lg mb-2 group-hover:scale-105 transition-transform">
                    {category.name}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-white text-opacity-90 text-sm leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Action Hint */}
                  <div className="mt-4 text-xs text-white text-opacity-75 font-medium">
                    Tıklayın →
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Info Section */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              🎯 Kategori Bazlı Ürün Ekleme
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
              <div className="bg-pink-50 rounded-lg p-4 border border-pink-200">
                <h3 className="font-semibold text-pink-800 mb-2">👕 Tekstil & Moda</h3>
                <ul className="text-sm text-pink-700 space-y-1">
                  <li>• Beden seçimi (XS, S, M, L, XL)</li>
                  <li>• Renk seçenekleri</li>
                  <li>• Kumaş bilgileri</li>
                  <li>• Bakım talimatları</li>
                </ul>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h3 className="font-semibold text-blue-800 mb-2">💻 Teknoloji</h3>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• Teknik özellikler</li>
                  <li>• Uyumluluk bilgileri</li>
                  <li>• Garanti süresi</li>
                  <li>• Performans grafikleri</li>
                </ul>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                <h3 className="font-semibold text-green-800 mb-2">🍪 Gıda & İçecek</h3>
                <ul className="text-sm text-green-700 space-y-1">
                  <li>• Organik sertifikaları</li>
                  <li>• Besin değerleri</li>
                  <li>• Son kullanma tarihi</li>
                  <li>• Allerjen bilgileri</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Development Status */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
          <h3 className="font-semibold text-blue-800 mb-2">🚀 Geliştirme Durumu</h3>
          <p className="text-blue-700 text-sm">
            Her kategori için özel ürün ekleme formları hazırlanıyor. 
            Kategori seçtiğinizde o kategoriye özel form açılacak.
          </p>
        </div>
      </div>
    </div>
  );
}

export default YeniUrunEkleme;