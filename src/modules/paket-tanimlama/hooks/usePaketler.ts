// Paket Tanımlama Modülü - Paket Yönetimi Hook
import { useState, useEffect } from 'react';
import { Paket, PaketKategori } from '../types';
import { createDefaultPackages } from '../data/defaultPaketler';
import { useTranslation } from "react-i18next";
export const usePaketler = () => {
  const [paketler, setPaketler] = useState<Paket[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<PaketKategori>('eticaret');

  // Paketleri yükle
  const loadPaketler = async () => {
    try {
      setLoading(true);
      console.log(t("common.paketler_yükleniyor"));

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
        console.log(t("common.varsayılan_paketler_oluşturuluyor"));
        const defaultPaketler = await createDefaultPackages();
        console.log(t("common.oluşturulan_paketler"), defaultPaketler.length);
        setPaketler(defaultPaketler);
        localStorage.setItem('sistemPaketleri', JSON.stringify(defaultPaketler));
        console.log('Paketler localStorage\'a kaydedildi');
      }
    } catch (error) {
      console.error(t("common.paketler_yüklenirken_hata"), error);
      // Hata durumunda da varsayılan paketleri yükle
      const defaultPaketler = await createDefaultPackages();
      setPaketler(defaultPaketler);
    } finally {
      setLoading(false);
    }
  };

  // Paket kaydet (yeni veya güncelle)
  const handlePaketKaydet = (editingPaket: Paket | null, yeniPaket: Paket) => {
    if (editingPaket) {
      // Mevcut paketi güncelle
      const updatedPaketler = paketler.map(p => p.id === editingPaket.id ? yeniPaket : p);
      setPaketler(updatedPaketler);
      localStorage.setItem('sistemPaketleri', JSON.stringify(updatedPaketler));
      console.log(t("common.paket_güncellendi"), yeniPaket.adi);
    } else {
      // Yeni paket ekle
      const updatedPaketler = [...paketler, yeniPaket];
      setPaketler(updatedPaketler);
      localStorage.setItem('sistemPaketleri', JSON.stringify(updatedPaketler));
      console.log('Yeni paket eklendi:', yeniPaket.adi);
    }
  };

  // Paket sil
  const handlePaketSil = async (id: string) => {
    if (window.confirm(t("common.bu_paketi_silmek_istediğinizden_emin_misiniz"))) {
      const updatedPaketler = paketler.filter(p => p.id !== id);
      setPaketler(updatedPaketler);
      localStorage.setItem('sistemPaketleri', JSON.stringify(updatedPaketler));
      // TODO: HZM API'den sil
    }
  };

  // Varsayılan paketleri sıfırla
  const resetToDefaultPackages = async () => {
    localStorage.removeItem('sistemPaketleri');
    console.log('LocalStorage temizlendi, sayfa yenileniyor...');
    window.location.reload();
  };

  // Kategoriye göre paketleri filtrele
  const getFilteredPaketler = () => {
    return paketler.filter(p => p.kategori === activeTab);
  };

  // İlk yüklemede paketleri yükle
  useEffect(() => {
    loadPaketler();
  }, []);
  return {
    // State
    paketler,
    loading,
    activeTab,
    // Actions
    setActiveTab,
    loadPaketler,
    handlePaketKaydet,
    handlePaketSil,
    resetToDefaultPackages,
    getFilteredPaketler
  };
};