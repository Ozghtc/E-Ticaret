// Paket Tanımlama Modülü - Type Definitions

export interface PaketOzellik {
  id: string;
  baslik: string;
  aciklama: string;
  dahil: boolean;
}

export interface Paket {
  id: string;
  adi: string;
  fiyat: number;
  eskiFiyat?: number;
  donem: 'aylık' | 'yıllık';
  populer: boolean;
  kampanya?: string;
  renk: string;
  kategori: 'eticaret' | 'premium' | 'sms';
  ozellikler: PaketOzellik[];
  createdAt: string;
  // SMS paketleri için ek alanlar
  smsMiktari?: number; // SMS adedi
  smsOzellikler?: string[]; // SMS özel özellikleri
}

export type PaketKategori = 'eticaret' | 'premium' | 'sms';

export type PaketDonem = 'aylık' | 'yıllık';

export interface PaketFormData {
  adi: string;
  fiyat: number;
  eskiFiyat: number;
  donem: PaketDonem;
  populer: boolean;
  kampanya: string;
  renk: string;
  kategori: PaketKategori;
  smsMiktari: number;
  smsOzellikler: string[];
}

export interface YeniOzellik {
  baslik: string;
  aciklama: string;
  dahil: boolean;
}

export interface PaketState {
  paketler: Paket[];
  loading: boolean;
  showForm: boolean;
  editingPaket: Paket | null;
  activeTab: PaketKategori;
}

export interface PaketFormProps {
  formData: PaketFormData;
  setFormData: (data: PaketFormData) => void;
  ozellikler: PaketOzellik[];
  setOzellikler: (ozellikler: PaketOzellik[]) => void;
  yeniOzellik: YeniOzellik;
  setYeniOzellik: (ozellik: YeniOzellik) => void;
  editingPaket: Paket | null;
  onSave: () => void;
  onCancel: () => void;
}

export interface PaketCardProps {
  paket: Paket;
  onEdit: (paket: Paket) => void;
  onDelete: (id: string) => void;
}

export interface PaketTabsProps {
  activeTab: PaketKategori;
  onTabChange: (tab: PaketKategori) => void;
}