import React, { useState, useEffect } from 'react';
import { ArrowLeft, Plus, Edit, Trash2, Package, Star, CheckCircle, Save } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface PaketOzellik {
  id: string;
  baslik: string;
  aciklama: string;
  dahil: boolean;
}

interface Paket {
  id: string;
  adi: string;
  fiyat: number;
  donem: 'aylık' | 'yıllık';
  populer: boolean;
  ozellikler: PaketOzellik[];
  createdAt: string;
}

const PaketTanimlama: React.FC = () => {
  const navigate = useNavigate();
  const [paketler, setPaketler] = useState<Paket[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingPaket, setEditingPaket] = useState<Paket | null>(null);

  // Form state
  const [formData, setFormData] = useState({
    adi: '',
    fiyat: 0,
    donem: 'aylık' as const,
    populer: false
  });
  
  const [ozellikler, setOzellikler] = useState<PaketOzellik[]>([]);
  const [yeniOzellik, setYeniOzellik] = useState({ baslik: '', aciklama: '', dahil: true });

  useEffect(() => {
    loadPaketler();
  }, []);

  const loadPaketler = async () => {
    try {
      setLoading(true);
      console.log('Paketler yükleniyor...');
      
      // TODO: HZM API'den paketleri çek
      // Şimdilik localStorage'dan yüklüyoruz
      const storedPaketler = localStorage.getItem('sistemPaketleri');
      console.log('LocalStorage veri:', storedPaketler);
      
      if (storedPaketler && storedPaketler !== '[]') {
        const parsedPakets = JSON.parse(storedPaketler);
        console.log('Mevcut paketler bulundu:', parsedPakets.length);
        setPaketler(parsedPakets);
      } else {
        // Varsayılan profesyonel paketleri oluştur
        console.log('Varsayılan paketler oluşturuluyor...');
        const defaultPaketler = await createDefaultPackages();
        console.log('Oluşturulan paketler:', defaultPaketler.length);
        setPaketler(defaultPaketler);
        localStorage.setItem('sistemPaketleri', JSON.stringify(defaultPaketler));
        console.log('Paketler localStorage\'a kaydedildi');
      }
    } catch (error) {
      console.error('Paketler yüklenirken hata:', error);
      // Hata durumunda da varsayılan paketleri yükle
      const defaultPaketler = await createDefaultPackages();
      setPaketler(defaultPaketler);
    } finally {
      setLoading(false);
    }
  };

  const createDefaultPackages = async (): Promise<Paket[]> => {
    const now = new Date().toISOString();
    
    console.log('createDefaultPackages çalışıyor...');
    
    return [
      {
        id: 'temel-paket',
        adi: 'Temel Paket',
        fiyat: 99,
        donem: 'aylık',
        populer: false,
        createdAt: now,
        ozellikler: [
          { id: '1', baslik: '100 Ürün', aciklama: 'Ürün ekleme limiti', dahil: true },
          { id: '2', baslik: 'Temel Tema', aciklama: 'Hazır tema seçenekleri', dahil: true },
          { id: '3', baslik: 'E-posta Desteği', aciklama: 'Email ile müşteri desteği', dahil: true },
          { id: '4', baslik: 'SSL Güvenlik', aciklama: 'Güvenli bağlantı', dahil: true },
          { id: '5', baslik: 'Mobil Uyumlu', aciklama: 'Responsive tasarım', dahil: true },
          { id: '6', baslik: 'Temel SEO', aciklama: 'Arama motoru optimizasyonu', dahil: true }
        ]
      },
      {
        id: 'profesyonel-paket',
        adi: 'Profesyonel Paket',
        fiyat: 199,
        donem: 'aylık',
        populer: true,
        createdAt: now,
        ozellikler: [
          { id: '1', baslik: '500 Ürün', aciklama: 'Genişletilmiş ürün limiti', dahil: true },
          { id: '2', baslik: 'Premium Temalar', aciklama: 'Özel tasarım seçenekleri', dahil: true },
          { id: '3', baslik: 'Öncelikli Destek', aciklama: '24 saat içinde yanıt', dahil: true },
          { id: '4', baslik: 'Analitik', aciklama: 'Detaylı satış raporları', dahil: true },
          { id: '5', baslik: 'WhatsApp Entegrasyonu', aciklama: 'Müşteri iletişimi', dahil: true },
          { id: '6', baslik: 'Gelişmiş SEO', aciklama: 'Meta tag yönetimi', dahil: true },
          { id: '7', baslik: 'Kargo Entegrasyonu', aciklama: 'Otomatik kargo hesaplama', dahil: true },
          { id: '8', baslik: 'SMS Bildirimleri', aciklama: 'Sipariş durumu SMS', dahil: true }
        ]
      },
      {
        id: 'kurumsal-paket',
        adi: 'Kurumsal Paket',
        fiyat: 399,
        donem: 'aylık',
        populer: false,
        createdAt: now,
        ozellikler: [
          { id: '1', baslik: 'Sınırsız Ürün', aciklama: 'Ürün sayısı limiti yok', dahil: true },
          { id: '2', baslik: 'Özel Tema', aciklama: 'Size özel tasarım', dahil: true },
          { id: '3', baslik: '7/24 Destek', aciklama: 'Kesintisiz teknik destek', dahil: true },
          { id: '4', baslik: 'API Erişimi', aciklama: 'Özel entegrasyonlar', dahil: true },
          { id: '5', baslik: 'Çoklu Dil Desteği', aciklama: 'Uluslararası satış', dahil: true },
          { id: '6', baslik: 'Gelişmiş Raporlama', aciklama: 'İş zekası raporları', dahil: true },
          { id: '7', baslik: 'E-Fatura Entegrasyonu', aciklama: 'Yasal uyumluluk', dahil: true },
          { id: '8', baslik: 'Pazaryeri Entegrasyonu', aciklama: 'Trendyol, Hepsiburada', dahil: true },
          { id: '9', baslik: 'Muhasebe Entegrasyonu', aciklama: 'Logo, Nebim bağlantısı', dahil: true },
          { id: '10', baslik: 'Özel Eğitim', aciklama: 'Birebir kullanım eğitimi', dahil: true }
        ]
      }
    ];
  };

  const handleOzellikEkle = () => {
    if (yeniOzellik.baslik.trim()) {
      const yeniId = Date.now().toString();
      setOzellikler([
        ...ozellikler,
        {
          id: yeniId,
          baslik: yeniOzellik.baslik,
          aciklama: yeniOzellik.aciklama,
          dahil: yeniOzellik.dahil
        }
      ]);
      setYeniOzellik({ baslik: '', aciklama: '', dahil: true });
    }
  };

  const handleOzellikSil = (id: string) => {
    setOzellikler(ozellikler.filter(oz => oz.id !== id));
  };

  const handlePaketKaydet = async () => {
    try {
      const paketId = editingPaket?.id || Date.now().toString();
      const yeniPaket: Paket = {
        id: paketId,
        adi: formData.adi,
        fiyat: formData.fiyat,
        donem: formData.donem,
        populer: formData.populer,
        ozellikler: ozellikler,
        createdAt: editingPaket?.createdAt || new Date().toISOString()
      };

      let updatedPaketler;
      if (editingPaket) {
        updatedPaketler = paketler.map(p => p.id === paketId ? yeniPaket : p);
      } else {
        updatedPaketler = [...paketler, yeniPaket];
      }

      setPaketler(updatedPaketler);
      localStorage.setItem('sistemPaketleri', JSON.stringify(updatedPaketler));

      // TODO: HZM API'ye kaydet
      
      // Form'u temizle
      setFormData({ adi: '', fiyat: 0, donem: 'aylık', populer: false });
      setOzellikler([]);
      setEditingPaket(null);
      setShowForm(false);
    } catch (error) {
      console.error('Paket kaydedilirken hata:', error);
    }
  };

  const handlePaketEdit = (paket: Paket) => {
    setEditingPaket(paket);
    setFormData({
      adi: paket.adi,
      fiyat: paket.fiyat,
      donem: paket.donem,
      populer: paket.populer
    });
    setOzellikler(paket.ozellikler);
    setShowForm(true);
  };

  const handlePaketSil = async (id: string) => {
    if (window.confirm('Bu paketi silmek istediğinizden emin misiniz?')) {
      const updatedPaketler = paketler.filter(p => p.id !== id);
      setPaketler(updatedPaketler);
      localStorage.setItem('sistemPaketleri', JSON.stringify(updatedPaketler));
      // TODO: HZM API'den sil
    }
  };

  const handleFormKapat = () => {
    setShowForm(false);
    setEditingPaket(null);
    setFormData({ adi: '', fiyat: 0, donem: 'aylık', populer: false });
    setOzellikler([]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/admin')}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center space-x-3">
                <Package className="w-8 h-8 text-rose-500" />
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">Paket Tanımlama</h1>
                  <p className="text-sm text-gray-500">Sistem özellikleri ve fiyatlandırma</p>
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => {
                  localStorage.removeItem('sistemPaketleri');
                  console.log('LocalStorage temizlendi, sayfa yenileniyor...');
                  window.location.reload();
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                title="Varsayılan paketleri yeniden yükle"
              >
                <span>🔄 Sıfırla</span>
              </button>
              <button
                onClick={() => setShowForm(true)}
                className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Plus size={20} />
                <span>Yeni Paket</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
          </div>
        ) : showForm ? (
          /* Form Modal */
          <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingPaket ? 'Paket Düzenle' : 'Yeni Paket Oluştur'}
              </h2>
              <button
                onClick={handleFormKapat}
                className="text-gray-400 hover:text-gray-600"
              >
                ✕
              </button>
            </div>

            {/* Form */}
            <div className="space-y-6">
              {/* Temel Bilgiler */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paket Adı *
                  </label>
                  <input
                    type="text"
                    value={formData.adi}
                    onChange={(e) => setFormData({ ...formData, adi: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    placeholder="Örn: Temel Paket, Premium Paket"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Fiyat (₺) *
                  </label>
                  <input
                    type="number"
                    value={formData.fiyat}
                    onChange={(e) => setFormData({ ...formData, fiyat: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    placeholder="99"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Dönem
                  </label>
                  <select
                    value={formData.donem}
                    onChange={(e) => setFormData({ ...formData, donem: e.target.value as 'aylık' | 'yıllık' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                  >
                    <option value="aylık">Aylık</option>
                    <option value="yıllık">Yıllık</option>
                  </select>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="populer"
                    checked={formData.populer}
                    onChange={(e) => setFormData({ ...formData, populer: e.target.checked })}
                    className="mr-2"
                  />
                  <label htmlFor="populer" className="text-sm text-gray-700">
                    Popüler paket olarak işaretle
                  </label>
                </div>
              </div>

              {/* Özellik Ekleme */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Paket Özellikleri</h3>
                
                <div className="bg-gray-50 p-4 rounded-lg mb-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Özellik Başlığı
                      </label>
                      <input
                        type="text"
                        value={yeniOzellik.baslik}
                        onChange={(e) => setYeniOzellik({ ...yeniOzellik, baslik: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-sm"
                        placeholder="Örn: 100 Ürün"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Açıklama
                      </label>
                      <input
                        type="text"
                        value={yeniOzellik.aciklama}
                        onChange={(e) => setYeniOzellik({ ...yeniOzellik, aciklama: e.target.value })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500 text-sm"
                        placeholder="Detaylı açıklama"
                      />
                    </div>

                    <div className="flex items-end">
                      <button
                        onClick={handleOzellikEkle}
                        className="bg-rose-500 hover:bg-rose-600 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                      >
                        <Plus size={16} />
                        <span>Ekle</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Özellik Listesi */}
                {ozellikler.length > 0 && (
                  <div className="space-y-2">
                    {ozellikler.map((ozellik) => (
                      <div key={ozellik.id} className="flex items-center justify-between bg-white p-3 rounded-lg border">
                        <div className="flex items-center space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <div>
                            <span className="font-medium text-gray-900">{ozellik.baslik}</span>
                            {ozellik.aciklama && (
                              <p className="text-sm text-gray-500">{ozellik.aciklama}</p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={() => handleOzellikSil(ozellik.id)}
                          className="text-red-500 hover:text-red-700 p-1"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  onClick={handleFormKapat}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  İptal
                </button>
                <button
                  onClick={handlePaketKaydet}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
                >
                  <Save size={16} />
                  <span>{editingPaket ? 'Güncelle' : 'Kaydet'}</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Paket Listesi */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paketler.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Henüz paket yok</h3>
                <p className="text-gray-500 mb-4">İlk paketinizi oluşturmak için butona tıklayın</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-3 rounded-lg inline-flex items-center space-x-2"
                >
                  <Plus size={20} />
                  <span>İlk Paketi Oluştur</span>
                </button>
              </div>
            ) : (
              paketler.map((paket) => (
                <div key={paket.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">{paket.adi}</h3>
                      {paket.populer && (
                        <div className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                          <Star size={12} className="mr-1" />
                          Popüler
                        </div>
                      )}
                    </div>
                    
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-gray-900">₺{paket.fiyat}</div>
                      <div className="text-gray-500">/{paket.donem}</div>
                    </div>

                    <div className="space-y-3 mb-6">
                      {paket.ozellikler.map((ozellik) => (
                        <div key={ozellik.id} className="flex items-start space-x-2">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <span className="text-sm font-medium text-gray-900">{ozellik.baslik}</span>
                            {ozellik.aciklama && (
                              <p className="text-xs text-gray-500">{ozellik.aciklama}</p>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handlePaketEdit(paket)}
                        className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors"
                      >
                        <Edit size={16} />
                        <span>Düzenle</span>
                      </button>
                      <button
                        onClick={() => handlePaketSil(paket.id)}
                        className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaketTanimlama;