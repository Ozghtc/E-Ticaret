const fs = require('fs');
const path = require('path');
const glob = require('glob');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generate = require('@babel/generator').default;

// Türkçe karakterler ve kelimeler için regex
const turkishRegex = /[çÇğĞıİöÖşŞüÜ]|(\b(ve|veya|ile|için|ama|ancak|fakat|çünkü|gibi|kadar|sonra|önce|hakkında|tarafından|olan|olarak|değil|var|yok|bu|şu|o|bir|iki|üç|dört|beş|altı|yedi|sekiz|dokuz|on|yüz|bin|milyon|milyar)\b)/;

// Çeviri haritası (Manuel olarak genişletilebilir)
const translationMap = {
  // Common
  'Hoş Geldiniz': { en: 'Welcome', ar: 'مرحبا' },
  'Kaydet': { en: 'Save', ar: 'حفظ' },
  'İptal': { en: 'Cancel', ar: 'إلغاء' },
  'Sil': { en: 'Delete', ar: 'حذف' },
  'Düzenle': { en: 'Edit', ar: 'تعديل' },
  'Güncelle': { en: 'Update', ar: 'تحديث' },
  'Ekle': { en: 'Add', ar: 'إضافة' },
  'Ara': { en: 'Search', ar: 'بحث' },
  'Filtrele': { en: 'Filter', ar: 'تصفية' },
  'Kapat': { en: 'Close', ar: 'إغلاق' },
  'Geri': { en: 'Back', ar: 'رجوع' },
  'İleri': { en: 'Next', ar: 'التالي' },
  'Önceki': { en: 'Previous', ar: 'السابق' },
  'Evet': { en: 'Yes', ar: 'نعم' },
  'Hayır': { en: 'No', ar: 'لا' },
  'Yükleniyor...': { en: 'Loading...', ar: 'جاري التحميل...' },
  'Hata': { en: 'Error', ar: 'خطأ' },
  'Başarılı': { en: 'Success', ar: 'نجاح' },
  'Uyarı': { en: 'Warning', ar: 'تحذير' },
  'Bilgi': { en: 'Info', ar: 'معلومات' },
  'Onayla': { en: 'Confirm', ar: 'تأكيد' },
  'Çıkış Yap': { en: 'Logout', ar: 'تسجيل خروج' },
  'Giriş Yap': { en: 'Login', ar: 'تسجيل دخول' },
  'Kayıt Ol': { en: 'Register', ar: 'تسجيل' },
  
  // Admin
  'Admin Paneli': { en: 'Admin Panel', ar: 'لوحة الإدارة' },
  'Modern E-Ticaret Yönetim Sistemi': { en: 'Modern E-Commerce Management System', ar: 'نظام إدارة التجارة الإلكترونية الحديث' },
  'Sistem Aktif': { en: 'System Active', ar: 'النظام نشط' },
  'Modül': { en: 'Module', ar: 'وحدة' },
  'modül': { en: 'module', ar: 'وحدة' },
  'HZM İşbirliği ile': { en: 'With HZM Partnership', ar: 'بالشراكة مع HZM' },
  
  // Layout
  'Yatay Satır': { en: 'Horizontal Row', ar: 'صف أفقي' },
  'Sayfa Düzeni': { en: 'Page Layout', ar: 'تخطيط الصفحة' },
  'Perfect Hizala': { en: 'Perfect Align', ar: 'محاذاة مثالية' },
  'Sıfırla': { en: 'Reset', ar: 'إعادة تعيين' },
  
  // Products
  'Ürün': { en: 'Product', ar: 'منتج' },
  'Ürün Adı': { en: 'Product Name', ar: 'اسم المنتج' },
  'Ürün Kodu': { en: 'Product Code', ar: 'رمز المنتج' },
  'Barkod': { en: 'Barcode', ar: 'الباركود' },
  'Açıklama': { en: 'Description', ar: 'الوصف' },
  'Kategori': { en: 'Category', ar: 'الفئة' },
  'Alt Kategori': { en: 'Subcategory', ar: 'الفئة الفرعية' },
  'Marka': { en: 'Brand', ar: 'العلامة التجارية' },
  'Fiyat': { en: 'Price', ar: 'السعر' },
  'İndirimli Fiyat': { en: 'Discounted Price', ar: 'السعر المخفض' },
  'Stok': { en: 'Stock', ar: 'المخزون' },
  'Renk': { en: 'Color', ar: 'اللون' },
  'Beden': { en: 'Size', ar: 'المقاس' },
  
  // Status
  'Aktif': { en: 'Active', ar: 'نشط' },
  'Pasif': { en: 'Inactive', ar: 'غير نشط' },
  'Beklemede': { en: 'Pending', ar: 'قيد الانتظار' },
  'Tamamlandı': { en: 'Completed', ar: 'مكتمل' },
  'İptal Edildi': { en: 'Cancelled', ar: 'ملغى' },
  'Onaylandı': { en: 'Approved', ar: 'موافق عليه' },
  'Reddedildi': { en: 'Rejected', ar: 'مرفوض' },
  
  // Messages
  'Başarıyla kaydedildi': { en: 'Successfully saved', ar: 'تم الحفظ بنجاح' },
  'Başarıyla silindi': { en: 'Successfully deleted', ar: 'تم الحذف بنجاح' },
  'Başarıyla güncellendi': { en: 'Successfully updated', ar: 'تم التحديث بنجاح' },
  'İşlem başarısız': { en: 'Operation failed', ar: 'فشلت العملية' },
  'Bu alan zorunludur': { en: 'This field is required', ar: 'هذا الحقل مطلوب' },
  'Geçersiz e-posta adresi': { en: 'Invalid email address', ar: 'عنوان بريد إلكتروني غير صالح' },
  'Geçersiz telefon numarası': { en: 'Invalid phone number', ar: 'رقم هاتف غير صالح' },
  'Silmek istediğinizden emin misiniz?': { en: 'Are you sure you want to delete?', ar: 'هل أنت متأكد أنك تريد الحذف؟' }
};

// Metin çıkarma fonksiyonu
function extractTexts(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const texts = new Set();
  
  try {
    const ast = parser.parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript']
    });
    
    traverse(ast, {
      StringLiteral(path) {
        const value = path.node.value;
        if (turkishRegex.test(value) && value.length > 2) {
          texts.add(value);
        }
      },
      TemplateLiteral(path) {
        const { quasis } = path.node;
        quasis.forEach(quasi => {
          const value = quasi.value.cooked;
          if (value && turkishRegex.test(value) && value.length > 2) {
            texts.add(value);
          }
        });
      },
      JSXText(path) {
        const value = path.node.value.trim();
        if (turkishRegex.test(value) && value.length > 2) {
          texts.add(value);
        }
      }
    });
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error.message);
  }
  
  return Array.from(texts);
}

// Çeviri key'i oluşturma
function generateTranslationKey(text, namespace) {
  // Basit bir key oluşturma stratejisi
  const cleanText = text
    .toLowerCase()
    .replace(/[^a-zğüşıöç0-9]/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
  
  return `${namespace}.${cleanText}`;
}

// Ana fonksiyon
function extractAndTranslateAll() {
  const srcPath = path.join(__dirname, '..', '..');
  const files = glob.sync('src/**/*.{tsx,ts,jsx,js}', { cwd: srcPath });
  
  const allTexts = new Map();
  const fileTexts = new Map();
  
  // Tüm dosyalardan metinleri çıkar
  files.forEach(file => {
    const filePath = path.join(srcPath, file);
    const texts = extractTexts(filePath);
    if (texts.length > 0) {
      fileTexts.set(file, texts);
      texts.forEach(text => {
        if (!allTexts.has(text)) {
          allTexts.set(text, {
            key: generateTranslationKey(text, 'common'),
            files: []
          });
        }
        allTexts.get(text).files.push(file);
      });
    }
  });
  
  // Çevirileri hazırla
  const translations = {
    tr: {},
    en: {},
    ar: {}
  };
  
  const missingTranslations = [];
  
  allTexts.forEach((data, text) => {
    const { key } = data;
    translations.tr[key] = text;
    
    if (translationMap[text]) {
      translations.en[key] = translationMap[text].en;
      translations.ar[key] = translationMap[text].ar;
    } else {
      // Basit otomatik çeviri (geliştirilmeli)
      translations.en[key] = text; // Placeholder
      translations.ar[key] = text; // Placeholder
      missingTranslations.push(text);
    }
  });
  
  // Sonuçları kaydet
  const outputPath = path.join(__dirname, 'extraction-results.json');
  fs.writeFileSync(outputPath, JSON.stringify({
    totalTexts: allTexts.size,
    translations,
    missingTranslations,
    fileTexts: Object.fromEntries(fileTexts)
  }, null, 2));
  
  console.log(`✅ Extraction complete!`);
  console.log(`📊 Total texts found: ${allTexts.size}`);
  console.log(`🔄 Texts with translations: ${allTexts.size - missingTranslations.length}`);
  console.log(`❓ Missing translations: ${missingTranslations.length}`);
  console.log(`📁 Results saved to: ${outputPath}`);
  
  if (missingTranslations.length > 0) {
    console.log('\n⚠️  Missing translations for:');
    missingTranslations.slice(0, 10).forEach(text => {
      console.log(`   - "${text}"`);
    });
    if (missingTranslations.length > 10) {
      console.log(`   ... and ${missingTranslations.length - 10} more`);
    }
  }
}

// Programı çalıştır
if (require.main === module) {
  extractAndTranslateAll();
}

module.exports = { extractTexts, generateTranslationKey, extractAndTranslateAll };
