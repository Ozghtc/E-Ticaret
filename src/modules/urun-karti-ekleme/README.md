# 🎯 Ürün Kartı Ekleme Sistemi

Bu modül kategori bazlı profesyonel ürün ekleme sistemidir.

## 📁 Klasör Yapısı:
```
urun-karti-ekleme/
├── YeniUrunEkleme.tsx          # Ana kategori seçim sayfası
├── components/                 # Ortak bileşenler
├── forms/                     # Kategori özel formlar
│   ├── TekstilUrunForm.tsx    # 👕 Tekstil & Moda
│   ├── TeknolojUrunForm.tsx   # 💻 Teknoloji
│   ├── GidaUrunForm.tsx       # 🍪 Gıda & İçecek
│   ├── KozmetikUrunForm.tsx   # 🧴 Kozmetik & Bakım
│   ├── MobilyaUrunForm.tsx    # 🛋️ Mobilya & Dekorasyon
│   ├── OyunUrunForm.tsx       # 🎮 Oyun & Konsol
│   ├── AnneBebekUrunForm.tsx  # 🍼 Anne & Bebek
│   ├── OtomotivUrunForm.tsx   # 🚗 Otomotiv
│   ├── SeyahatUrunForm.tsx    # 🧳 Seyahat & Outdoor
│   ├── SporUrunForm.tsx       # 🧘 Spor & Sağlık
│   ├── KirtasiyeUrunForm.tsx  # 📚 Kırtasiye & Ofis
│   ├── HayvanUrunForm.tsx     # 🐶 Evcil Hayvan
│   └── TakiUrunForm.tsx       # 💍 Takı & Aksesuar
└── README.md
```

## 🎨 Özellikler:
- **Kategori Bazlı Tasarım** → Her kategori kendi temasında
- **Dinamik Form Alanları** → Kategoriye özel input'lar
- **Fotoğraf Yükleme** → Drag & drop destekli
- **Validasyon** → Kategori özel kurallar
- **Preview** → Ürün kartı önizlemesi

## 🚀 Kullanım:
1. Kategori seç
2. O kategoriye özel form aç
3. Ürün bilgilerini doldur
4. Fotoğraf yükle
5. Önizle ve kaydet

## 📝 Geliştirme Durumu:
- ✅ Ana kategori seçim sayfası
- ✅ Klasör yapısı oluşturuldu
- ✅ 3 temel form başlangıcı (Tekstil, Teknoloji, Gıda)
- 🔄 Diğer kategori formları hazırlanacak
- 🔄 Fotoğraf yükleme sistemi
- 🔄 Ürün kartı önizleme
- 🔄 Database entegrasyonu