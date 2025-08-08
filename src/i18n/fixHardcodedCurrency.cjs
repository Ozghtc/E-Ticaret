const fs = require('fs');
const path = require('path');
const glob = require('glob');

// Düzeltilecek dosyalar listesi
const filesToFix = [
  'src/templates/tekstil/BoutiqueChicTemplate.tsx',
  'src/components/ProductCard/ProductCard.tsx',
  'src/components/MegaStoreDemo.tsx',
  'src/components/FashionStoreDemo.tsx',
  'src/templates/tekstil/FashionStoreTemplate.tsx',
  'src/modules/tekstil-moda/UrunListesi.tsx',
  'src/modules/platform/OrganicMarketDemo.tsx',
  'src/modules/platform/ModernMinimalDemo.tsx',
  'src/modules/platform/TechHubDemo.tsx'
];

// Her dosya için currency: 'TRY' değerlerini dinamik yap
function fixHardcodedCurrency() {
  const srcPath = path.join(__dirname, '..', '..');
  let fixedCount = 0;
  
  filesToFix.forEach(file => {
    const filePath = path.join(srcPath, file);
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      const originalContent = content;
      
      // currency: 'TRY' değerlerini bul ve değiştir
      if (content.includes("currency: 'TRY'")) {
        // formatPrice import kontrolü
        const hasFormatPriceImport = content.includes('formatPrice') && content.includes('from');
        
        if (!hasFormatPriceImport) {
          // Import ekle
          const importPath = getRelativeImportPath(file);
          const importStatement = `import { formatPrice } from '${importPath}';\n`;
          
          // İlk import'tan sonra ekle
          const firstImportIndex = content.indexOf('import');
          const firstImportEndIndex = content.indexOf('\n', firstImportIndex);
          
          if (firstImportIndex !== -1) {
            content = content.slice(0, firstImportEndIndex + 1) + 
                     importStatement + 
                     content.slice(firstImportEndIndex + 1);
          } else {
            content = importStatement + content;
          }
        }
        
        // Intl.NumberFormat kullanımlarını formatPrice ile değiştir
        const intlRegex = /new\s+Intl\.NumberFormat\(['"]tr-TR['"],\s*{\s*style:\s*['"]currency['"],\s*currency:\s*['"]TRY['"].*?\}\)\.format\(([^)]+)\)/g;
        content = content.replace(intlRegex, 'formatPrice($1)');
        
        // Basit currency: 'TRY' kullanımlarını değiştir
        content = content.replace(/currency:\s*['"]TRY['"]/g, "currency: localStorage.getItem('currency') || 'TRY'");
        
        if (content !== originalContent) {
          fs.writeFileSync(filePath, content);
          console.log(`✅ Fixed: ${file}`);
          fixedCount++;
        }
      }
    } catch (error) {
      console.error(`❌ Error fixing ${file}:`, error.message);
    }
  });
  
  console.log(`\n📊 Total files fixed: ${fixedCount}/${filesToFix.length}`);
}

// Relative import path hesapla
function getRelativeImportPath(filePath) {
  const depth = filePath.split('/').length - 2; // src/ hariç
  let relativePath = '';
  
  for (let i = 0; i < depth; i++) {
    relativePath += '../';
  }
  
  return relativePath + 'utils/formatPrice';
}

// TL sembollerini i18n key'lerine dönüştür
function fixHardcodedTLSymbols() {
  const srcPath = path.join(__dirname, '..', '..');
  const files = glob.sync('src/**/*.{tsx,ts}', { cwd: srcPath });
  
  const tlPatterns = [
    { regex: /(\d+)\s*TL\s*üzeri/g, key: 'common.aboveAmount', replacement: (match, amount) => `{t('common.aboveAmount', { amount: ${amount} })}` },
    { regex: /₺\s*(\d+(?:\.\d+)?)/g, key: 'common.priceFormat', replacement: (match, amount) => `{formatPrice(${amount})}` },
    { regex: /\(TL\)/g, key: 'common.currencyTL', replacement: () => `{t('common.currencyTL')}` }
  ];
  
  let totalReplacements = 0;
  
  files.forEach(file => {
    const filePath = path.join(srcPath, file);
    
    try {
      let content = fs.readFileSync(filePath, 'utf8');
      let modified = false;
      
      tlPatterns.forEach(pattern => {
        if (pattern.regex.test(content)) {
          content = content.replace(pattern.regex, pattern.replacement);
          modified = true;
          totalReplacements++;
        }
      });
      
      if (modified) {
        // useTranslation hook ekle
        if (!content.includes('useTranslation')) {
          const importIndex = content.indexOf('import');
          const importEndIndex = content.indexOf('\n', importIndex);
          content = content.slice(0, importEndIndex + 1) + 
                   "import { useTranslation } from 'react-i18next';\n" + 
                   content.slice(importEndIndex + 1);
        }
        
        fs.writeFileSync(filePath, content);
        console.log(`✅ Fixed TL symbols in: ${file}`);
      }
    } catch (error) {
      // Skip files with errors
    }
  });
  
  console.log(`\n📊 Total TL symbol replacements: ${totalReplacements}`);
}

// Ana fonksiyon
function runAllFixes() {
  console.log('🔧 Starting currency fixes...\n');
  
  console.log('1️⃣ Fixing hardcoded currency values...');
  fixHardcodedCurrency();
  
  console.log('\n2️⃣ Fixing TL symbols...');
  fixHardcodedTLSymbols();
  
  console.log('\n✅ All fixes completed!');
}

// Programı çalıştır
if (require.main === module) {
  runAllFixes();
}

module.exports = { fixHardcodedCurrency, fixHardcodedTLSymbols, runAllFixes };
