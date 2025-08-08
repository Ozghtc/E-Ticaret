import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Package, Upload, Image, Palette, Cpu, Leaf, ShoppingBag, Tag, Star } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
function UrunEkleme() {
  const navigate = useNavigate();
  const {
    addProduct
  } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('tekstil');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: '',
    brand: '',
    stock: 0,
    image: '',
    sizes: [],
    colors: [],
    specs: [],
    organic: false,
    local: false
  });
  const [imageFile, setImageFile] = useState(null);
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);
  const categories = [{
    id: 'tekstil',
    name: 'Tekstil & Moda',
    icon: Palette,
    color: 'bg-pink-500',
    description: t("common.giyim_ayakkabı_aksesuar")
  }, {
    id: 'teknoloji',
    name: 'Teknoloji',
    icon: Cpu,
    color: 'bg-blue-500',
    description: 'Elektronik, bilgisayar, telefon'
  }, {
    id: 'gida',
    name: 'Gıda & İçecek',
    icon: Leaf,
    color: 'bg-green-500',
    description: t("common.organik_ürünler_gıda")
  }];
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct = {
      ...formData,
      id: Date.now().toString(),
      rating: 4.5,
      reviews: 0,
      category: getCategoryForTheme(selectedCategory)
    };
    addProduct(newProduct);
    alert(t("common.ürün_başarıyla_eklendi"));

    // Reset form
    setFormData({
      name: '',
      description: '',
      price: 0,
      originalPrice: 0,
      category: '',
      brand: '',
      stock: 0,
      image: '',
      sizes: [],
      colors: [],
      specs: [],
      organic: false,
      local: false
    });
    setImageFile(null);
  };
  const getCategoryForTheme = (category: string) => {
    const categoryMap: {
      [key: string]: string;
    } = {
      'tekstil': 'fashion',
      'teknoloji': 'tech',
      'gida': 'organic'
    };
    return categoryMap[category] || 'fashion';
  };
  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      // For demo purposes, we'll use a placeholder URL
      handleInputChange('image', URL.createObjectURL(file));
    }
  };
  const getCategoryTheme = () => {
    switch (selectedCategory) {
      case 'tekstil':
        return {
          bgColor: 'bg-gradient-to-br from-pink-50 to-purple-50',
          headerColor: 'bg-pink-600',
          accentColor: 'text-pink-600',
          buttonColor: 'bg-pink-600 hover:bg-pink-700',
          borderColor: 'border-pink-300',
          icon: Palette
        };
      case 'teknoloji':
        return {
          bgColor: 'bg-gradient-to-br from-blue-50 to-indigo-50',
          headerColor: 'bg-blue-600',
          accentColor: 'text-blue-600',
          buttonColor: 'bg-blue-600 hover:bg-blue-700',
          borderColor: 'border-blue-300',
          icon: Cpu
        };
      case 'gida':
        return {
          bgColor: 'bg-gradient-to-br from-green-50 to-emerald-50',
          headerColor: 'bg-green-600',
          accentColor: 'text-green-600',
          buttonColor: 'bg-green-600 hover:bg-green-700',
          borderColor: 'border-green-300',
          icon: Leaf
        };
      default:
        return {
          bgColor: 'bg-gray-50',
          headerColor: 'bg-blue-600',
          accentColor: 'text-blue-600',
          buttonColor: 'bg-blue-600 hover:bg-blue-700',
          borderColor: 'border-blue-300',
          icon: Package
        };
    }
  };
  const theme = getCategoryTheme();
  const ThemeIcon = theme.icon;
  return <div className={`min-h-screen ${theme.bgColor}`}>
      {/* Header */}
      <header className={`${theme.headerColor} text-white`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin/magaza-paneli" className="flex items-center text-white hover:text-blue-200 mr-6">
                <ArrowLeft size={20} className="mr-2" />
                Geri Dön
              </Link>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-bold text-white">{t("common.altıntassoft")}</span>
              </div>
            </div>
            <div className="text-white text-sm">{t("common.profesyonel_ürün_ekleme_sistemi")}</div>
          </div>
        </div>
      </header>

      {/* Category Selection */}
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">{t("common.ürün_kategorisi_seçin")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {categories.map(category => {
            const CategoryIcon = category.icon;
            return <button key={category.id} onClick={() => setSelectedCategory(category.id)} className={`p-6 rounded-xl border-2 transition-all transform hover:scale-105 ${selectedCategory === category.id ? `${category.color} text-white shadow-lg` : 'border-gray-200 hover:border-gray-300 bg-white'}`}>
                  <CategoryIcon size={32} className={`mx-auto mb-3 ${selectedCategory === category.id ? 'text-white' : 'text-gray-600'}`} />
                  <h3 className={`font-semibold text-lg mb-2 ${selectedCategory === category.id ? 'text-white' : 'text-gray-900'}`}>
                    {category.name}
                  </h3>
                  <p className={`text-sm ${selectedCategory === category.id ? 'text-white text-opacity-90' : 'text-gray-600'}`}>
                    {category.description}
                  </p>
                </button>;
          })}
          </div>
        </div>
      </div>

      {/* Product Form */}
      <div className="max-w-6xl mx-auto px-4 pb-8">
        <div className="bg-white rounded-xl shadow-lg p-8">
          <div className={`${theme.headerColor.replace('bg-', 'bg-').replace('600', '100')} w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6`}>
            <ThemeIcon className={`w-10 h-10 ${theme.accentColor}`} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">
            {categories.find(c => c.id === selectedCategory)?.name}{t("common.ürünü_ekle")}</h1>
          <p className="text-gray-600 text-lg mb-8 text-center">{t("common.profesyonel_ürün_ekleme_formu")}</p>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload Section */}
            <div className={`border-2 border-dashed ${theme.borderColor} rounded-xl p-8 text-center`}>
              <div className="mb-4">
                <Upload className={`w-12 h-12 mx-auto ${theme.accentColor} mb-4`} />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{t("common.ürün_fotoğrafı_yükle")}</h3>
                <p className="text-gray-600 text-sm">{t("common.jpg_png_veya_webp_formatında_yükleyebilirsiniz")}</p>
              </div>
              
              <div className="flex items-center justify-center">
                <label className={`${theme.buttonColor} text-white px-6 py-3 rounded-lg cursor-pointer hover:shadow-lg transition-all flex items-center space-x-2`}>
                  <Image size={20} />
                  <span>{t("common.fotoğraf_yükle")}</span>
                  <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                </label>
              </div>
              
              {imageFile && <div className="mt-4">
                  <p className="text-sm text-green-600">{t("common.fotoğraf_yüklendi")}{imageFile.name}</p>
                </div>}
            </div>

            {/* Basic Product Info */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Tag className="mr-2" size={20} />
                Temel Bilgiler
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Ürün Adı *
                  </label>
                  <input type="text" required value={formData.name} onChange={e => handleInputChange('name', e.target.value)} className={`w-full px-4 py-3 border-2 ${theme.borderColor} rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500`} placeholder={selectedCategory === 'tekstil' ? t("common.örn_zarif_şifon_bluz") : selectedCategory === 'teknoloji' ? t("common.örn_gaming_laptop_rtx_4070") : t("common.örn_organik_zeytinyağı_500ml")} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marka
                  </label>
                  <input type="text" value={formData.brand} onChange={e => handleInputChange('brand', e.target.value)} className={`w-full px-4 py-3 border-2 ${theme.borderColor} rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500`} placeholder={selectedCategory === 'tekstil' ? t("common.örn_zara_h_m_mango") : selectedCategory === 'teknoloji' ? t("common.örn_apple_samsung_asus") : t("common.örn_tariş_komili_tat")} />
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ürün Açıklaması
                </label>
                <textarea value={formData.description} onChange={e => handleInputChange('description', e.target.value)} rows={4} className={`w-full px-4 py-3 border-2 ${theme.borderColor} rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500`} placeholder={selectedCategory === 'tekstil' ? 'Zarif tasarım, kaliteli kumaş. El işçiliği detaylarla süslenmiş özel parça.' : selectedCategory === 'teknoloji' ? t("common.yüksek_performanslı_son_teknoloji_özellikleri_gaming_ve_profesyonel_kullanım_için_ideal") : t("common.doğal_ve_organik_sağlıklı_beslenme_için_ideal_katkı_maddesi_içermez")} />
              </div>
            </div>

            {/* Price & Stock */}
            <div className="bg-gray-50 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Star className="mr-2" size={20} />
                Fiyat & Stok
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Satış Fiyatı {t('common.currencyTL')} *
                  </label>
                  <input type="number" required min="0" step="0.01" value={formData.price} onChange={e => handleInputChange('price', parseFloat(e.target.value) || 0)} className={`w-full px-4 py-3 border-2 ${theme.borderColor} rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500`} placeholder="0.00" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Eski Fiyat {t('common.currencyTL')}
                  </label>
                  <input type="number" min="0" step="0.01" value={formData.originalPrice} onChange={e => handleInputChange('originalPrice', parseFloat(e.target.value) || 0)} className={`w-full px-4 py-3 border-2 ${theme.borderColor} rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500`} placeholder={t("common.i_ndirim_varsa_eski_fiyat")} />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Stok Adedi *
                  </label>
                  <input type="number" required min="0" value={formData.stock} onChange={e => handleInputChange('stock', parseInt(e.target.value) || 0)} className={`w-full px-4 py-3 border-2 ${theme.borderColor} rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500`} placeholder={t("common.kaç_adet_stokta")} />
                </div>
              </div>
            </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ürün Adı *
                </label>
                <input type="text" required value={formData.name} onChange={e => handleInputChange('name', e.target.value)} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" placeholder={t("common.ürün_adını_girin")} />
              </div>
              
            {/* Category Specific Fields */}
            {selectedCategory === 'tekstil' && <div className="bg-pink-50 rounded-xl p-6 border border-pink-200">
                <h3 className="text-lg font-semibold text-pink-800 mb-4 flex items-center">
                  <Palette className="mr-2" size={20} />{t("common.tekstil_özel_alanları")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("common.bedenler_virgülle_ayırın")}</label>
                    <input type="text" placeholder="XS, S, M, L, XL" onChange={e => handleInputChange('sizes', e.target.value.split(',').map(s => s.trim()))} className="w-full px-4 py-3 border-2 border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("common.renkler_virgülle_ayırın")}</label>
                    <input type="text" placeholder="Siyah, Beyaz, Mavi, Pembe" onChange={e => handleInputChange('colors', e.target.value.split(',').map(s => s.trim()))} className="w-full px-4 py-3 border-2 border-pink-300 rounded-lg focus:ring-2 focus:ring-pink-500" />
                  </div>
                </div>
              </div>}

            {selectedCategory === 'teknoloji' && <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                  <Cpu className="mr-2" size={20} />{t("common.teknoloji_özel_alanları")}</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("common.teknik_özellikler_virgülle_ayırın")}</label>
                    <input type="text" placeholder="Intel i7, 16GB RAM, RTX 4070, 1TB SSD" onChange={e => handleInputChange('specs', e.target.value.split(',').map(s => s.trim()))} className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">{t("common.garanti_süresi")}</label>
                    <select onChange={e => handleInputChange('warranty', e.target.value)} className="w-full px-4 py-3 border-2 border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                      <option value="">{t("common.garanti_seçin")}</option>
                      <option value="1 yıl">{t("common.1_yıl")}</option>
                      <option value="2 yıl">{t("common.2_yıl")}</option>
                      <option value="3 yıl">{t("common.3_yıl")}</option>
                    </select>
                  </div>
                </div>
              </div>}

            {selectedCategory === 'gida' && <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                  <Leaf className="mr-2" size={20} />{t("common.gıda_özel_alanları")}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input type="checkbox" id="organic" checked={formData.organic} onChange={e => handleInputChange('organic', e.target.checked)} className="text-green-600 focus:ring-green-500 mr-3" />
                      <label htmlFor="organic" className="text-sm text-gray-700 font-medium">{t("common.organik_ürün")}</label>
                    </div>
                    <div className="flex items-center">
                      <input type="checkbox" id="local" checked={formData.local} onChange={e => handleInputChange('local', e.target.checked)} className="text-green-600 focus:ring-green-500 mr-3" />
                      <label htmlFor="local" className="text-sm text-gray-700 font-medium">{t("common.yerel_üretici")}</label>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Son Kullanma Tarihi
                    </label>
                    <input type="date" className="w-full px-4 py-3 border-2 border-green-300 rounded-lg focus:ring-2 focus:ring-green-500" />
                  </div>
                </div>
              </div>}

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-6">
              <button type="submit" className={`flex-1 ${theme.buttonColor} text-white py-4 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center space-x-2`}>
                <ShoppingBag size={20} />
                <span>{t("common.ürün_ekle")}</span>
              </button>
              <button type="button" onClick={() => navigate('/admin/magaza-paneli')} className="flex-1 bg-gray-300 text-gray-700 py-4 rounded-xl font-semibold hover:bg-gray-400 transition-all flex items-center justify-center space-x-2">
                <ArrowLeft size={20} />
                <span>{t("common.i_ptal")}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>;
}
export default UrunEkleme;