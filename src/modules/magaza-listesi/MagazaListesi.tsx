import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Store, 
  Eye, 
  Edit, 
  Trash2, 
  Search, 
  Filter,
  Calendar,
  MapPin,
  Globe,
  Phone,
  Mail,
  User,
  Package,
  CheckCircle,
  Clock,
  XCircle,
  Plus
} from 'lucide-react';

interface MagazaData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  storeName: string;
  storeCategory: string;
  storeDescription: string;
  domainType: string;
  domainName?: string;
  customDomain?: string;
  socialMedia: {
    instagram: string;
    facebook: string;
    twitter: string;
  };
  cityId: number;
  cityName: string;
  district: string;
  address: string;
  postalCode: string;
  selectedPackage: string;
  createdAt: string;
  status: 'pending' | 'approved' | 'rejected' | 'active';
}

function MagazaListesi() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [magazalar, setMagazalar] = useState<MagazaData[]>([]);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
    
    // Mağaza verilerini localStorage'dan yükle
    loadMagazalar();
  }, [navigate]);

  const loadMagazalar = () => {
    const stored = localStorage.getItem('magazaListesi');
    if (stored) {
      try {
        const parsedData = JSON.parse(stored);
        setMagazalar(Array.isArray(parsedData) ? parsedData : []);
      } catch (error) {
        console.error('Mağaza verileri yüklenirken hata:', error);
        setMagazalar([]);
      }
    } else {
      setMagazalar([]);
    }
  };

  // Mağaza durumu güncelleme
  const updateMagazaStatus = (id: string, newStatus: MagazaData['status']) => {
    const updatedMagazalar = magazalar.map(magaza => 
      magaza.id === id ? { ...magaza, status: newStatus } : magaza
    );
    setMagazalar(updatedMagazalar);
    localStorage.setItem('magazaListesi', JSON.stringify(updatedMagazalar));
  };

  // Mağaza silme
  const deleteMagaza = (id: string) => {
    if (window.confirm('Bu mağazayı silmek istediğinizden emin misiniz?')) {
      const updatedMagazalar = magazalar.filter(magaza => magaza.id !== id);
      setMagazalar(updatedMagazalar);
      localStorage.setItem('magazaListesi', JSON.stringify(updatedMagazalar));
    }
  };

  // Filtreleme
  const filteredMagazalar = magazalar.filter(magaza => {
    const matchesSearch = 
      magaza.storeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      magaza.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      magaza.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      magaza.cityName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || magaza.status === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  // Paket renkleri
  const getPackageColor = (packageId: string) => {
    switch (packageId) {
      case 'basic': return 'bg-blue-100 text-blue-800';
      case 'pro': return 'bg-purple-100 text-purple-800';
      case 'enterprise': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPackageName = (packageId: string) => {
    switch (packageId) {
      case 'basic': return 'Temel';
      case 'pro': return 'Profesyonel';
      case 'enterprise': return 'Kurumsal';
      default: return packageId;
    }
  };

  // Durum renkleri
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'approved': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} />;
      case 'approved': return <CheckCircle size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'rejected': return <XCircle size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktif';
      case 'approved': return 'Onaylandı';
      case 'pending': return 'Bekliyor';
      case 'rejected': return 'Reddedildi';
      default: return status;
    }
  };

  // Domain URL oluşturma
  const getDomainUrl = (magaza: MagazaData) => {
    if (magaza.domainType === 'custom' && magaza.customDomain) {
      return magaza.customDomain;
    } else if (magaza.domainType === 'subdomain' && magaza.domainName) {
      return `${magaza.domainName}.altintassoft.com`;
    }
    return '-';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin" className="flex items-center text-white hover:text-purple-200 mr-6">
                <ArrowLeft size={20} className="mr-2" />
                Admin Panel'e Dön
              </Link>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-bold text-white">Altıntassoft</span>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium">Mağaza Yönetim Sistemi</p>
              <p className="text-purple-200 text-sm">Tüm mağazalar</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Header Section */}
          <div className="border-b border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center">
                <div className="bg-purple-100 w-12 h-12 rounded-full flex items-center justify-center mr-4">
                  <Store className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">Mağaza Listesi</h1>
                  <p className="text-gray-600">Sistemdeki tüm mağazaları görüntüleyin ve yönetin</p>
                </div>
              </div>
              <Link
                to="/admin/magaza-acilis-paneli"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 flex items-center"
              >
                <Plus size={20} className="mr-2" />
                Yeni Mağaza
              </Link>
            </div>

            {/* Search & Filter */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Mağaza adı, sahip adı veya şehir ile ara..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Filter size={20} className="text-gray-400" />
                <select
                  value={selectedFilter}
                  onChange={(e) => setSelectedFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="all">Tüm Durumlar</option>
                  <option value="active">Aktif</option>
                  <option value="approved">Onaylandı</option>
                  <option value="pending">Bekliyor</option>
                  <option value="rejected">Reddedildi</option>
                </select>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-green-700">
                  {magazalar.filter(m => m.status === 'active').length}
                </div>
                <div className="text-sm text-green-600">Aktif Mağaza</div>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-yellow-700">
                  {magazalar.filter(m => m.status === 'pending').length}
                </div>
                <div className="text-sm text-yellow-600">Onay Bekleyen</div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-blue-700">
                  {magazalar.filter(m => m.status === 'approved').length}
                </div>
                <div className="text-sm text-blue-600">Onaylandı</div>
              </div>
              <div className="bg-purple-50 p-4 rounded-lg">
                <div className="text-2xl font-bold text-purple-700">
                  {magazalar.length}
                </div>
                <div className="text-sm text-purple-600">Toplam Mağaza</div>
              </div>
            </div>
          </div>

          {/* Mağaza Listesi */}
          <div className="p-6">
            {filteredMagazalar.length === 0 ? (
              <div className="text-center py-12">
                <Store className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {magazalar.length === 0 ? 'Henüz mağaza bulunmuyor' : 'Arama kriterlerine uygun mağaza bulunamadı'}
                </h3>
                <p className="text-gray-500 mb-4">
                  {magazalar.length === 0 
                    ? 'İlk mağazanızı oluşturmak için "Yeni Mağaza" butonuna tıklayın.'
                    : 'Farklı arama terimleri deneyebilir veya filtreleri sıfırlayabilirsiniz.'
                  }
                </p>
                {magazalar.length === 0 && (
                  <Link
                    to="/admin/magaza-acilis-paneli"
                    className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
                  >
                    <Plus size={20} className="mr-2" />
                    İlk Mağazayı Oluştur
                  </Link>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredMagazalar.map((magaza) => (
                  <div key={magaza.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center mb-3">
                          <h3 className="text-lg font-semibold text-gray-900 mr-3">
                            {magaza.storeName}
                          </h3>
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(magaza.status)}`}>
                            {getStatusIcon(magaza.status)}
                            <span className="ml-1">{getStatusText(magaza.status)}</span>
                          </span>
                          <span className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPackageColor(magaza.selectedPackage)}`}>
                            <Package size={12} className="mr-1" />
                            {getPackageName(magaza.selectedPackage)}
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <User size={16} className="mr-2 text-gray-400" />
                            <span>{magaza.firstName} {magaza.lastName}</span>
                          </div>
                          <div className="flex items-center">
                            <Mail size={16} className="mr-2 text-gray-400" />
                            <span>{magaza.email}</span>
                          </div>
                          <div className="flex items-center">
                            <Phone size={16} className="mr-2 text-gray-400" />
                            <span>{magaza.phone}</span>
                          </div>
                          <div className="flex items-center">
                            <MapPin size={16} className="mr-2 text-gray-400" />
                            <span>{magaza.cityName} / {magaza.district}</span>
                          </div>
                          <div className="flex items-center">
                            <Globe size={16} className="mr-2 text-gray-400" />
                            <span className="text-blue-600">{getDomainUrl(magaza)}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar size={16} className="mr-2 text-gray-400" />
                            <span>{new Date(magaza.createdAt).toLocaleDateString('tr-TR')}</span>
                          </div>
                        </div>

                        {magaza.storeDescription && (
                          <p className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                            "{magaza.storeDescription}"
                          </p>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                          title="Detayları Görüntüle"
                        >
                          <Eye size={18} />
                        </button>
                        <button
                          className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          title="Düzenle"
                        >
                          <Edit size={18} />
                        </button>
                        
                        {/* Durum değiştirme butonları */}
                        {magaza.status === 'pending' && (
                          <>
                            <button
                              onClick={() => updateMagazaStatus(magaza.id, 'approved')}
                              className="px-3 py-1 bg-green-100 text-green-700 rounded-md hover:bg-green-200 text-xs"
                            >
                              Onayla
                            </button>
                            <button
                              onClick={() => updateMagazaStatus(magaza.id, 'rejected')}
                              className="px-3 py-1 bg-red-100 text-red-700 rounded-md hover:bg-red-200 text-xs"
                            >
                              Reddet
                            </button>
                          </>
                        )}
                        
                        {magaza.status === 'approved' && (
                          <button
                            onClick={() => updateMagazaStatus(magaza.id, 'active')}
                            className="px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 text-xs"
                          >
                            Aktifleştir
                          </button>
                        )}

                        <button
                          onClick={() => deleteMagaza(magaza.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          title="Sil"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MagazaListesi;