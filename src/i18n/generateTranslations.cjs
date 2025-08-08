const fs = require('fs');
const path = require('path');

// Extraction sonuçlarını yükle
const resultsPath = path.join(__dirname, 'extraction-results.json');
const extractionResults = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

// Otomatik çeviri haritası (genişletilebilir)
const autoTranslations = {
  // Genel
  'Merhaba': { en: 'Hello', ar: 'مرحبا' },
  'Hoş Geldiniz': { en: 'Welcome', ar: 'مرحبا' },
  'Giriş': { en: 'Login', ar: 'تسجيل الدخول' },
  'Çıkış': { en: 'Logout', ar: 'تسجيل الخروج' },
  'Kaydet': { en: 'Save', ar: 'حفظ' },
  'İptal': { en: 'Cancel', ar: 'إلغاء' },
  'Sil': { en: 'Delete', ar: 'حذف' },
  'Düzenle': { en: 'Edit', ar: 'تعديل' },
  'Güncelle': { en: 'Update', ar: 'تحديث' },
  'Ekle': { en: 'Add', ar: 'إضافة' },
  'Ara': { en: 'Search', ar: 'بحث' },
  'Filtre': { en: 'Filter', ar: 'تصفية' },
  'Seç': { en: 'Select', ar: 'اختر' },
  'Tümü': { en: 'All', ar: 'الكل' },
  'Yeni': { en: 'New', ar: 'جديد' },
  'Eski': { en: 'Old', ar: 'قديم' },
  
  // E-ticaret
  'Sepet': { en: 'Cart', ar: 'السلة' },
  'Sepete Ekle': { en: 'Add to Cart', ar: 'أضف إلى السلة' },
  'Ürün': { en: 'Product', ar: 'منتج' },
  'Ürünler': { en: 'Products', ar: 'منتجات' },
  'Fiyat': { en: 'Price', ar: 'السعر' },
  'İndirim': { en: 'Discount', ar: 'خصم' },
  'Stok': { en: 'Stock', ar: 'المخزون' },
  'Kategori': { en: 'Category', ar: 'الفئة' },
  'Marka': { en: 'Brand', ar: 'العلامة التجارية' },
  'Renk': { en: 'Color', ar: 'اللون' },
  'Beden': { en: 'Size', ar: 'المقاس' },
  'Adet': { en: 'Quantity', ar: 'الكمية' },
  
  // Kullanıcı
  'Hesabım': { en: 'My Account', ar: 'حسابي' },
  'Profil': { en: 'Profile', ar: 'الملف الشخصي' },
  'Siparişlerim': { en: 'My Orders', ar: 'طلباتي' },
  'Adreslerim': { en: 'My Addresses', ar: 'عناويني' },
  'Favorilerim': { en: 'My Favorites', ar: 'المفضلة' },
  
  // Durum
  'Aktif': { en: 'Active', ar: 'نشط' },
  'Pasif': { en: 'Inactive', ar: 'غير نشط' },
  'Beklemede': { en: 'Pending', ar: 'قيد الانتظار' },
  'Onaylandı': { en: 'Approved', ar: 'موافق عليه' },
  'Reddedildi': { en: 'Rejected', ar: 'مرفوض' },
  'Tamamlandı': { en: 'Completed', ar: 'مكتمل' },
  'İptal Edildi': { en: 'Cancelled', ar: 'ملغى' },
  
  // Kategoriler
  'Kadın': { en: 'Women', ar: 'نساء' },
  'Erkek': { en: 'Men', ar: 'رجال' },
  'Çocuk': { en: 'Kids', ar: 'أطفال' },
  'Ayakkabı': { en: 'Shoes', ar: 'أحذية' },
  'Çanta': { en: 'Bags', ar: 'حقائب' },
  'Aksesuar': { en: 'Accessories', ar: 'إكسسوارات' },
  
  // Sayılar ve para
  'üzeri': { en: 'above', ar: 'أكثر من' },
  'altı': { en: 'below', ar: 'أقل من' },
  'Ücretsiz': { en: 'Free', ar: 'مجاني' },
  'Ücretsiz Kargo': { en: 'Free Shipping', ar: 'شحن مجاني' },
  'Kargo': { en: 'Shipping', ar: 'الشحن' },
  'Toplam': { en: 'Total', ar: 'المجموع' },
  'Tutar': { en: 'Amount', ar: 'المبلغ' }
};

// Çeviri üretme fonksiyonu
function generateTranslations() {
  const translations = extractionResults.translations;
  const trTexts = Object.entries(translations.tr);
  
  let translatedCount = 0;
  let missingCount = 0;
  
  // Her Türkçe metin için çeviri üret
  trTexts.forEach(([key, trText]) => {
    // Zaten çevrilmiş mi kontrol et
    if (translations.en[key] === trText || translations.ar[key] === trText) {
      // Otomatik çeviri dene
      let translated = false;
      
      // Tam eşleşme
      if (autoTranslations[trText]) {
        translations.en[key] = autoTranslations[trText].en;
        translations.ar[key] = autoTranslations[trText].ar;
        translatedCount++;
        translated = true;
      } else {
        // Parçalı eşleşme dene
        for (const [turkishWord, translation] of Object.entries(autoTranslations)) {
          if (trText.includes(turkishWord)) {
            // Basit kelime değiştirme
            translations.en[key] = trText.replace(turkishWord, translation.en);
            translations.ar[key] = trText.replace(turkishWord, translation.ar);
            translatedCount++;
            translated = true;
            break;
          }
        }
      }
      
      if (!translated) {
        missingCount++;
      }
    }
  });
  
  // JSON dosyalarını güncelle
  const namespaces = ['common', 'admin', 'products', 'errors'];
  const languages = ['tr', 'en', 'ar'];
  
  namespaces.forEach(namespace => {
    languages.forEach(lang => {
      const filePath = path.join(__dirname, '..', 'locales', lang, `${namespace}.json`);
      const existingData = fs.existsSync(filePath) ? JSON.parse(fs.readFileSync(filePath, 'utf8')) : {};
      
      // Yeni çevirileri ekle
      Object.entries(translations[lang]).forEach(([key, value]) => {
        if (key.startsWith(`${namespace}.`)) {
          const shortKey = key.replace(`${namespace}.`, '');
          // Nested key'leri düzgün yerleştir
          const keyParts = shortKey.split('.');
          let target = existingData;
          
          for (let i = 0; i < keyParts.length - 1; i++) {
            if (!target[keyParts[i]]) {
              target[keyParts[i]] = {};
            }
            target = target[keyParts[i]];
          }
          
          target[keyParts[keyParts.length - 1]] = value;
        }
      });
      
      // Dosyayı güncelle
      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
    });
  });
  
  console.log(`\n✅ Translation generation complete!`);
  console.log(`📊 Stats:`);
  console.log(`   Auto-translated: ${translatedCount}`);
  console.log(`   Still missing: ${missingCount}`);
  console.log(`   Total texts: ${trTexts.length}`);
  
  // common.json'a özel eklemeler
  addCommonTranslations();
}

// Common çeviriler ekle
function addCommonTranslations() {
  const languages = {
    tr: {
      aboveAmount: '{{amount}} TL üzeri',
      currencyTL: '(TL)',
      priceFormat: '{{amount}} TL'
    },
    en: {
      aboveAmount: 'Above {{amount}}',
      currencyTL: '(Currency)',
      priceFormat: '{{amount}}'
    },
    ar: {
      aboveAmount: 'أكثر من {{amount}}',
      currencyTL: '(العملة)',
      priceFormat: '{{amount}}'
    }
  };
  
  Object.entries(languages).forEach(([lang, translations]) => {
    const filePath = path.join(__dirname, '..', 'locales', lang, 'common.json');
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    
    Object.assign(data, translations);
    
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  });
  
  console.log('\n✅ Added common currency translations');
}

// Programı çalıştır
if (require.main === module) {
  console.log('🌐 Generating translations...');
  generateTranslations();
}

module.exports = { generateTranslations };
