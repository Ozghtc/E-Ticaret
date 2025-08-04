import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  List, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Download,
  Plus,
  Package,
  Star,
  ShoppingBag
} from 'lucide-react';

function UrunListesi() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  // Demo ürün verileri
  const products = [
    {
      id: 1,
      name: 'Zarif Şifon Bluz',
      brand: 'Zara',
      category: 'Bluz',
      price: 299,
      stock: 25,
      status: 'Aktif',
      image: 'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=100',
      sizes: ['S', 'M', 'L'],
      colors: ['Beyaz', 'Siyah', 'Pembe'],
      rating: 4.8,
      sales: 156
    },
    {
      id: 2,
      name: 'Vintage Denim Ceket',
      brand: 'H&M',
      category: 'Ceket',
      price: 899,
      stock: 12,
      status: 'Aktif',
      image: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=100',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Mavi', 'Siyah'],
      rating: 4.9,
      sales: 89
    },
    {
      id: 3,
      name: 'Bohem Tarzı Elbise',
      brand: 'Mango',
      category: 'Elbise',
      price: 649,
      stock: 8,
      status: 'Stok Az',
      image: 'https://images.pexels.com/photos/1536619/pexels-photo-1536619.jpeg?auto=compress&cs=tinysrgb&w=100',
      sizes: ['XS', 'S', 'M'],
      colors: ['Beyaz', 'Bej'],
      rating: 4.7,
      sales: 234
    }
  ];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', {
      style: 'currency',
      currency: 'TRY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(price);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aktif': return 'bg-green-100 text-green-700';
      case 'Stok Az': return 'bg-yellow-100 text-yellow-700';
      case 'Pasif': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
                         product.status.toLowerCase() === selectedFilter.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      {/* Header */}
      <header className="bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin/tekstil-moda" className="flex items-center text-white hover:text-purple-200 mr-6">
                <ArrowLeft size={20} className="mr-2" />
                Tekstil Modülüne Dön
              </Link>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-bold text-white">Altıntassoft</span>
              </div>
            </div>
            <div className="text-white text-sm">
              Tekstil Ürün Listesi
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <List className="w-10 h-10 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            👕 Tekstil Ürün Listesi
          </h1>
          <p className="text-gray-600 text-lg">
            Eklenen tekstil ürünlerini görüntüle, düzenle ve yönet
          </p>
        </div>

        {/* Toolbar */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Left Side - Search & Filter */}
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Ürün ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 w-full sm:w-64"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>

              {/* Filter */}
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              >
                <option value="all">Tüm Durumlar</option>
                <option value="aktif">Aktif</option>
                <option value="stok az">Stok Az</option>
                <option value="pasif">Pasif</option>
              </select>
            </div>

            {/* Right Side - Actions */}
            <div className="flex space-x-3">
              <button
                onClick={() => navigate('/admin/urun-ekleme/tekstil')}
                className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors flex items-center space-x-2"
              >
                <Plus size={16} />
                <span>Yeni Ürün</span>
              </button>
              <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
                <Download size={16} />
                <span>Excel İndir</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-blue-500">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Ürün</p>
                <p className="text-2xl font-bold text-gray-900">{products.length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-green-500">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full">
                <ShoppingBag className="w-6 h-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Toplam Satış</p>
                <p className="text-2xl font-bold text-gray-900">{products.reduce((sum, p) => sum + p.sales, 0)}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-yellow-500">
            <div className="flex items-center">
              <div className="bg-yellow-100 p-3 rounded-full">
                <Package className="w-6 h-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Stok Azalan</p>
                <p className="text-2xl font-bold text-gray-900">{products.filter(p => p.stock < 15).length}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-purple-500">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ortalama Puan</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(products.reduce((sum, p) => sum + p.rating, 0) / products.length).toFixed(1)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              Ürün Listesi ({filteredProducts.length} ürün)
            </h3>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ürün</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Kategori</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fiyat</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stok</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Durum</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Puan</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">İşlemler</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-12 h-12 rounded-lg object-cover mr-4"
                        />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.brand}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-900">{product.category}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm font-medium text-gray-900">{formatPrice(product.price)}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`text-sm font-medium ${product.stock < 15 ? 'text-red-600' : 'text-gray-900'}`}>
                        {product.stock} adet
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(product.status)}`}>
                        {product.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <Star size={14} className="text-yellow-400 fill-current mr-1" />
                        <span className="text-sm text-gray-900">{product.rating}</span>
                        <span className="text-xs text-gray-500 ml-1">({product.sales})</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 p-1">
                          <Eye size={16} />
                        </button>
                        <button className="text-green-600 hover:text-green-900 p-1">
                          <Edit size={16} />
                        </button>
                        <button className="text-red-600 hover:text-red-900 p-1">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Empty State */}
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Ürün bulunamadı</h3>
              <p className="text-gray-500 mb-6">Arama kriterlerinize uygun ürün bulunmuyor</p>
              <button
                onClick={() => navigate('/admin/urun-ekleme/tekstil')}
                className="bg-pink-600 text-white px-6 py-3 rounded-lg hover:bg-pink-700 transition-colors flex items-center space-x-2 mx-auto"
              >
                <Plus size={16} />
                <span>İlk Ürünü Ekle</span>
              </button>
            </div>
          )}
        </div>

        {/* Bulk Actions */}
        <div className="bg-white rounded-xl shadow-lg p-6 mt-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Toplu İşlemler</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <button className="bg-blue-600 text-white px-4 py-3 rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Toplu Fiyat Güncelle
            </button>
            <button className="bg-green-600 text-white px-4 py-3 rounded-lg hover:bg-green-700 transition-colors text-sm">
              Stok Güncelle
            </button>
            <button className="bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors text-sm">
              Kategori Değiştir
            </button>
            <button className="bg-orange-600 text-white px-4 py-3 rounded-lg hover:bg-orange-700 transition-colors text-sm">
              SEO Güncelle
            </button>
          </div>
        </div>

        {/* Development Notice */}
        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6 text-center mt-8">
          <h3 className="font-semibold text-purple-800 mb-2">🎯 Tekstil Ürün Listesi Modülü</h3>
          <p className="text-purple-700 text-sm mb-4">
            Demo veriler gösteriliyor. Database bağlantısı sonrası gerçek ürünler listelenecek.
          </p>
          <div className="bg-purple-100 rounded-lg p-4 text-left max-w-2xl mx-auto">
            <h4 className="font-semibold text-purple-800 mb-2">Gelecek Özellikler:</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li>• Gerçek ürün veritabanı entegrasyonu</li>
              <li>• Gelişmiş filtreleme ve sıralama</li>
              <li>• Toplu düzenleme işlemleri</li>
              <li>• Ürün performans analizi</li>
              <li>• Stok uyarı sistemi</li>
              <li>• Excel/PDF dışa aktarma</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UrunListesi;