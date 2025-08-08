// Paket Tanımlama Modülü - Ana Bileşen
import React from 'react';
import { Package, Plus } from 'lucide-react';

// Components
import { PaketForm, PaketCard, PaketTabs, PaketHeader } from './components';

// Hooks
import { usePaketler, usePaketForm } from './hooks';

// Utils
import { getTabBackgroundClass } from './utils';
import { useTranslation } from "react-i18next";
const PaketTanimlama: React.FC = () => {
  const {
    t
  } = useTranslation();
  // Custom hooks
  const {
    loading,
    activeTab,
    setActiveTab,
    handlePaketKaydet,
    handlePaketSil,
    resetToDefaultPackages,
    getFilteredPaketler
  } = usePaketler();
  const {
    showForm,
    editingPaket,
    formData,
    ozellikler,
    yeniOzellik,
    setFormData,
    setOzellikler,
    setYeniOzellik,
    openForm,
    closeForm,
    handlePaketEdit,
    createPaketFromForm,
    validateForm
  } = usePaketForm();

  // Form kaydetme işlemi
  const handleFormSave = () => {
    console.log('Form kaydediliyor...', {
      formData,
      ozellikler
    });

    // Validasyon kontrolü
    if (!validateForm()) {
      console.log(t("common.validasyon_başarısız"));
      return;
    }
    console.log(t("common.validasyon_başarılı_paket_oluşturuluyor"));
    const yeniPaket = createPaketFromForm();
    console.log(t("common.oluşturulan_paket"), yeniPaket);
    handlePaketKaydet(editingPaket, yeniPaket);
    closeForm();
    console.log(t("common.paket_başarıyla_kaydedildi_ve_form_kapatıldı"));
  };

  // Filtered paketler
  const filteredPaketler = getFilteredPaketler();
  if (loading) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-500"></div>
          <span className="text-lg text-gray-600">{t("common.paketler_yükleniyor")}</span>
        </div>
      </div>;
  }
  return <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <PaketHeader onNewPaket={openForm} onReset={resetToDefaultPackages} />

      {/* Tab Navigation */}
      <PaketTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Main Content */}
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 transition-all duration-500 ${getTabBackgroundClass(activeTab)}`}>
        {showForm ? (/* Form Modal */
      <PaketForm formData={formData} setFormData={setFormData} ozellikler={ozellikler} setOzellikler={setOzellikler} yeniOzellik={yeniOzellik} setYeniOzellik={setYeniOzellik} editingPaket={editingPaket} onSave={handleFormSave} onCancel={closeForm} />) : (/* Paket Listesi */
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPaketler.length === 0 ? <div className="col-span-full text-center py-16">
                <Package className="w-20 h-20 text-gray-300 mx-auto mb-6" />
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">{t("common.henüz_paket_yok")}</h3>
                <p className="text-gray-500 mb-6">{t("common.i_lk_profesyonel_paketinizi_oluşturmak_için_butona_tıklayın")}</p>
                <button onClick={openForm} className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-4 rounded-xl inline-flex items-center space-x-3 text-lg font-medium shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                  <Plus size={24} />
                  <span>{t("common.i_lk_paketi_oluştur")}</span>
                </button>
              </div> : filteredPaketler.map(paket => <PaketCard key={paket.id} paket={paket} onEdit={handlePaketEdit} onDelete={handlePaketSil} />)}
          </div>)}
      </div>
    </div>;
};
export default PaketTanimlama;