// Paket Tanımlama Modülü - Paket Form Bileşeni
import React from 'react';
import { Plus, Save, CheckCircle, Trash2 } from 'lucide-react';
import { PaketFormProps } from '../types';

const PaketForm: React.FC<PaketFormProps> = ({
  formData,
  setFormData,
  ozellikler,
  setOzellikler,
  yeniOzellik,
  setYeniOzellik,
  editingPaket,
  onSave,
  onCancel
}) => {
  
  const handleOzellikEkle = () => {
    if (yeniOzellik.baslik.trim()) {
      const yeniId = Date.now().toString();
      const yeniPaketOzellik = {
        id: yeniId,
        baslik: yeniOzellik.baslik.trim(),
        aciklama: yeniOzellik.aciklama.trim(),
        dahil: yeniOzellik.dahil
      };
      
      setOzellikler([...ozellikler, yeniPaketOzellik]);
      setYeniOzellik({ baslik: '', aciklama: '', dahil: true });
      console.log('Yeni özellik eklendi:', yeniPaketOzellik);
    }
  };

  const handleOzellikSil = (id: string) => {
    setOzellikler(ozellikler.filter(o => o.id !== id));
    console.log('Özellik silindi:', id);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-900">
          {editingPaket ? 'Paket Düzenle' : 'Yeni Paket Oluştur'}
        </h2>
        <button
          onClick={onCancel}
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
              Paket Kategorisi *
            </label>
            <select
              value={formData.kategori}
              onChange={(e) => setFormData({ ...formData, kategori: e.target.value as 'eticaret' | 'premium' | 'sms' })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
            >
              <option value="eticaret">E-Ticaret Paketleri</option>
              <option value="premium">Premium Paketleri</option>
              <option value="sms">SMS Paketleri</option>
            </select>
          </div>

          {/* SMS Miktarı - Sadece SMS paketleri için göster */}
          {formData.kategori === 'sms' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                SMS Miktarı (Adet) *
              </label>
              <input
                type="number"
                value={formData.smsMiktari}
                onChange={(e) => setFormData({ ...formData, smsMiktari: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-rose-500 focus:border-rose-500"
                placeholder="1000"
              />
              <div className="mt-1 text-sm text-gray-500">
                Bu pakette aylık gönderebilecek SMS adedi
              </div>
            </div>
          )}

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
            onClick={onCancel}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            İptal
          </button>
          <button
            onClick={onSave}
            className="bg-rose-500 hover:bg-rose-600 text-white px-6 py-2 rounded-lg flex items-center space-x-2 transition-colors"
          >
            <Save size={16} />
            <span>{editingPaket ? 'Güncelle' : 'Kaydet'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaketForm;