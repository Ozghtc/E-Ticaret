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
  eskiFiyat?: number;
  donem: 'aylık' | 'yıllık';
  populer: boolean;
  kampanya?: string;
  renk: string;
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
    eskiFiyat: 0,
    donem: 'aylık' as const,
    populer: false,
    kampanya: '',
    renk: 'blue'
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
        id: 'advantage-paket',
        adi: 'Advantage',
        fiyat: 2499,
        eskiFiyat: 3490,
        donem: 'aylık',
        populer: false,
        kampanya: 'Yıllık alımlarda 58.166₺ yerine 34.900₺',
        renk: 'green',
        createdAt: now,
        ozellikler: [
          { id: '1', baslik: '%0 Ertesi Gün Sanal Pos Oranı', aciklama: '', dahil: true },
          { id: '2', baslik: 'Ücretsiz E-Ticaret Eğitimleri', aciklama: '', dahil: true },
          { id: '3', baslik: '7/24 Canlı Destek', aciklama: '', dahil: true },
          { id: '4', baslik: '20.000₺ Kargo Bakiyesi Hediye!', aciklama: '', dahil: true },
          { id: '5', baslik: 'Ultra Güvenlik ve Hız', aciklama: '', dahil: true },
          { id: '6', baslik: 'Sınırsız Web Alanı ve Ürün', aciklama: '', dahil: true }
        ]
      },
      {
        id: 'premier-paket',
        adi: 'Premier',
        fiyat: 3499,
        eskiFiyat: 4990,
        donem: 'aylık',
        populer: true,
        kampanya: 'Advantage pakete ek olarak',
        renk: 'blue',
        createdAt: now,
        ozellikler: [
          { id: '1', baslik: '30.000₺ Kargo Bakiyesi Hediye!', aciklama: '', dahil: true },
          { id: '2', baslik: '2 Kargo Entegrasyonu', aciklama: '', dahil: true },
          { id: '3', baslik: 'Otomatik Sepet Hatırlatma', aciklama: '', dahil: true },
          { id: '4', baslik: 'Güvenilir Logo Sistemi', aciklama: '', dahil: true },
          { id: '5', baslik: 'Ticaret Entegrasyonları', aciklama: '', dahil: true },
          { id: '6', baslik: 'Google Araçları Entegrasyonu', aciklama: '', dahil: true }
        ]
      },
      {
        id: 'advance-paket',
        adi: 'Advance',
        fiyat: 5499,
        eskiFiyat: 7490,
        donem: 'aylık',
        populer: false,
        kampanya: 'Premier pakete ek olarak',
        renk: 'purple',
        createdAt: now,
        ozellikler: [
          { id: '1', baslik: '3 Yurt İçi Pazaryeri Entegrasyonu', aciklama: '', dahil: true },
          { id: '2', baslik: 'Ticimax AI (Yapay Zeka Özellikleri) Hediye', aciklama: '', dahil: true },
          { id: '3', baslik: 'İleri Seviye Çapraz Satış', aciklama: '', dahil: true },
          { id: '4', baslik: '100.000₺ Faizsiz Kredi', aciklama: '', dahil: true },
          { id: '5', baslik: 'İndirimli Kargo Gönderimi', aciklama: '', dahil: true },
          { id: '6', baslik: '100.000₺ Faizsiz Kredi', aciklama: '', dahil: true }
        ]
      },
      {
        id: 'advance-plus-paket',
        adi: 'Advance Plus',
        fiyat: 6499,
        eskiFiyat: 8990,
        donem: 'aylık',
        populer: false,
        kampanya: 'Advance pakete ek olarak',
        renk: 'orange',
        createdAt: now,
        ozellikler: [
          { id: '1', baslik: '5 Yurt İçi Pazaryeri Entegrasyonu', aciklama: '', dahil: true },
          { id: '2', baslik: 'E-İhracat Modülü', aciklama: '', dahil: true },
          { id: '3', baslik: 'IOS & Android Mobil Uygulama', aciklama: '', dahil: true },
          { id: '4', baslik: '100.000₺ Faizsiz Kredi & Destek', aciklama: '', dahil: true },
          { id: '5', baslik: 'Gelişmiş Kargo Entegrasyonu', aciklama: '', dahil: true },
          { id: '6', baslik: 'Premium Özellikler', aciklama: '', dahil: true }
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
        eskiFiyat: formData.eskiFiyat || undefined,
        donem: formData.donem,
        populer: formData.populer,
        kampanya: formData.kampanya || undefined,
        renk: formData.renk,
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
      setFormData({ adi: '', fiyat: 0, eskiFiyat: 0, donem: 'aylık', populer: false, kampanya: '', renk: 'blue' });
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
      eskiFiyat: paket.eskiFiyat || 0,
      donem: paket.donem,
      populer: paket.populer,
      kampanya: paket.kampanya || '',
      renk: paket.renk
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
    setFormData({ adi: '', fiyat: 0, eskiFiyat: 0, donem: 'aylık', populer: false, kampanya: '', renk: 'blue' });
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
                    placeholder="Örn: Advantage, Premier, Advance"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Güncel Fiyat (₺) *
                  </label>
                  <input
                    type="number"
                    value={formData.fiyat}
                    onChange={(e) => setFormData({ ...formData, fiyat: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    placeholder="2499"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Eski Fiyat (₺) <span className="text-gray-500">- İndirim gösterimi için</span>
                  </label>
                  <input
                    type="number"
                    value={formData.eskiFiyat}
                    onChange={(e) => setFormData({ ...formData, eskiFiyat: Number(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    placeholder="3490"
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

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kampanya Metni
                  </label>
                  <input
                    type="text"
                    value={formData.kampanya}
                    onChange={(e) => setFormData({ ...formData, kampanya: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                    placeholder="Temel pakete ek olarak"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Paket Rengi
                  </label>
                  <select
                    value={formData.renk}
                    onChange={(e) => setFormData({ ...formData, renk: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                  >
                    <option value="blue">Mavi</option>
                    <option value="green">Yeşil</option>
                    <option value="purple">Mor</option>
                    <option value="orange">Turuncu</option>
                    <option value="red">Kırmızı</option>
                    <option value="indigo">İndigo</option>
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
          /* Paket Listesi - TiciMax Tarzı Profesyonel Tasarım */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {paketler.length === 0 ? (
              <div className="col-span-full text-center py-16">
                <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">Henüz paket yok</h3>
                <p className="text-gray-500 mb-6">İlk profesyonel paketinizi oluşturmak için butona tıklayın</p>
                <button
                  onClick={() => setShowForm(true)}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-xl inline-flex items-center space-x-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                >
                  <Plus size={24} />
                  <span>İlk Paketi Oluştur</span>
                </button>
              </div>
            ) : (
              paketler.map((paket, index) => {
                const colorClasses = {
                  blue: 'from-blue-500 to-blue-600 border-blue-200',
                  green: 'from-green-500 to-green-600 border-green-200', 
                  purple: 'from-purple-500 to-purple-600 border-purple-200',
                  orange: 'from-orange-500 to-orange-600 border-orange-200',
                  red: 'from-red-500 to-red-600 border-red-200',
                  indigo: 'from-indigo-500 to-indigo-600 border-indigo-200'
                };
                
                const borderColor = colorClasses[paket.renk as keyof typeof colorClasses] || colorClasses.blue;
                const indirimYuzdesi = paket.eskiFiyat ? Math.round((1 - paket.fiyat / paket.eskiFiyat) * 100) : 0;
                
                return (
                  <div 
                    key={paket.id} 
                    className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 ${borderColor.split(' ')[2]} overflow-hidden`}
                  >
                    {/* Popüler Badge */}
                    {paket.populer && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                        <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                          <div className="flex items-center space-x-1">
                            <Star size={14} fill="white" />
                            <span>Popüler</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Kampanya Metni */}
                    {paket.kampanya && (
                      <div className="bg-gradient-to-r from-emerald-50 to-blue-50 px-4 py-3 text-center">
                        <p className="text-sm font-semibold text-emerald-700">{paket.kampanya}</p>
                      </div>
                    )}

                    <div className="p-8">
                      {/* Paket Başlığı */}
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{paket.adi}</h3>
                        
                        {/* Fiyat Alanı */}
                        <div className="space-y-2">
                          {/* İndirim Yüzdesi */}
                          {indirimYuzdesi > 0 && (
                            <div className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                              %{indirimYuzdesi} İndirim
                            </div>
                          )}
                          
                          <div className="flex items-center justify-center space-x-2">
                            <div className="text-4xl font-bold text-gray-900">₺{paket.fiyat.toLocaleString()}</div>
                            <div className="text-gray-500">
                              <div className="text-sm">/{paket.donem}</div>
                              <div className="text-xs">+KDV</div>
                            </div>
                          </div>
                          
                          {/* Eski Fiyat */}
                          {paket.eskiFiyat && (
                            <div className="text-center">
                              <span className="text-lg text-gray-400 line-through">₺{paket.eskiFiyat.toLocaleString()}</span>
                              <div className="text-xs text-gray-500 mt-1">Yıllık alımlarda daha avantajlı</div>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Özellikler */}
                      <div className="space-y-4 mb-8">
                        {paket.ozellikler.map((ozellik) => (
                          <div key={ozellik.id} className="flex items-start space-x-3">
                            <div className="flex-shrink-0">
                              <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              </div>
                            </div>
                            <div className="flex-1">
                              <p className="text-sm font-medium text-gray-900 leading-relaxed">{ozellik.baslik}</p>
                              {ozellik.aciklama && (
                                <p className="text-xs text-gray-500 mt-1">{ozellik.aciklama}</p>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-3">
                        <button className={`w-full bg-gradient-to-r ${borderColor.split(' ')[0]} ${borderColor.split(' ')[1]} text-white px-6 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105`}>
                          Ücretsiz Dene
                        </button>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handlePaketEdit(paket)}
                            className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all hover:shadow-md font-medium"
                          >
                            <Edit size={18} />
                            <span>Düzenle</span>
                          </button>
                          <button
                            onClick={() => handlePaketSil(paket.id)}
                            className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-3 rounded-lg transition-all hover:shadow-md"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Gradient Bottom Border */}
                    <div className={`h-2 bg-gradient-to-r ${borderColor.split(' ')[0]} ${borderColor.split(' ')[1]}`}></div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PaketTanimlama;