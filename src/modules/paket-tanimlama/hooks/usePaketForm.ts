// Paket Tanımlama Modülü - Form Yönetimi Hook
import { useState } from 'react';
import { Paket, PaketFormData, PaketOzellik, YeniOzellik } from '../types';

const initialFormData: PaketFormData = {
  adi: '',
  fiyat: 0,
  eskiFiyat: 0,
  donem: 'aylık',
  populer: false,
  kampanya: '',
  renk: 'blue',
  kategori: 'eticaret',
  smsMiktari: 0,
  smsOzellikler: []
};

const initialYeniOzellik: YeniOzellik = { 
  baslik: '', 
  aciklama: '', 
  dahil: true 
};

export const usePaketForm = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingPaket, setEditingPaket] = useState<Paket | null>(null);
  const [formData, setFormData] = useState<PaketFormData>(initialFormData);
  const [ozellikler, setOzellikler] = useState<PaketOzellik[]>([]);
  const [yeniOzellik, setYeniOzellik] = useState<YeniOzellik>(initialYeniOzellik);

  // Form'u aç/kapat
  const openForm = () => setShowForm(true);
  const closeForm = () => {
    setShowForm(false);
    setEditingPaket(null);
    setFormData(initialFormData);
    setOzellikler([]);
  };

  // Paket düzenleme modunda formu aç
  const handlePaketEdit = (paket: Paket) => {
    setEditingPaket(paket);
    setFormData({
      adi: paket.adi,
      fiyat: paket.fiyat,
      eskiFiyat: paket.eskiFiyat || 0,
      donem: paket.donem,
      populer: paket.populer,
      kampanya: paket.kampanya || '',
      renk: paket.renk,
      kategori: paket.kategori,
      smsMiktari: paket.smsMiktari || 0,
      smsOzellikler: paket.smsOzellikler || []
    });
    setOzellikler(paket.ozellikler);
    setShowForm(true);
  };

  // Yeni özellik ekle
  const handleOzellikEkle = () => {
    if (yeniOzellik.baslik.trim()) {
      const yeniId = Date.now().toString();
      const yeniPaketOzellik: PaketOzellik = {
        id: yeniId,
        baslik: yeniOzellik.baslik.trim(),
        aciklama: yeniOzellik.aciklama.trim(),
        dahil: yeniOzellik.dahil
      };
      
      setOzellikler([...ozellikler, yeniPaketOzellik]);
      setYeniOzellik(initialYeniOzellik);
      console.log('Yeni özellik eklendi:', yeniPaketOzellik);
    }
  };

  // Özellik sil
  const handleOzellikSil = (id: string) => {
    setOzellikler(ozellikler.filter(o => o.id !== id));
    console.log('Özellik silindi:', id);
  };

  // Form verilerinden Paket objesi oluştur
  const createPaketFromForm = (): Paket => {
    const paketId = editingPaket?.id || `paket-${Date.now()}`;
    
    return {
      id: paketId,
      adi: formData.adi,
      fiyat: formData.fiyat,
      eskiFiyat: formData.eskiFiyat || undefined,
      donem: formData.donem,
      populer: formData.populer,
      kampanya: formData.kampanya || undefined,
      renk: formData.renk,
      kategori: formData.kategori,
      ozellikler: ozellikler,
      createdAt: editingPaket?.createdAt || new Date().toISOString(),
      smsMiktari: formData.smsMiktari || undefined,
      smsOzellikler: formData.smsOzellikler || undefined
    };
  };

  // Form validasyonu
  const validateForm = (): boolean => {
    if (!formData.adi.trim()) {
      alert('Paket adı zorunludur!');
      return false;
    }
    
    if (formData.fiyat <= 0) {
      alert('Geçerli bir fiyat giriniz!');
      return false;
    }
    
    if (ozellikler.length === 0) {
      alert('En az bir özellik eklemelisiniz!');
      return false;
    }
    
    return true;
  };

  return {
    // State
    showForm,
    editingPaket,
    formData,
    ozellikler,
    yeniOzellik,
    
    // Actions
    setFormData,
    setOzellikler,
    setYeniOzellik,
    openForm,
    closeForm,
    handlePaketEdit,
    handleOzellikEkle,
    handleOzellikSil,
    createPaketFromForm,
    validateForm
  };
};