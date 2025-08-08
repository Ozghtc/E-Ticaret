const fs = require('fs');
const path = require('path');
const glob = require('glob');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generate = require('@babel/generator').default;

// Türkçe metinleri i18n key'lerine dönüştür
function transformFile(filePath, translations) {
  const content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  try {
    const ast = parser.parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript']
    });
    
    // useTranslation hook'u eklenmiş mi kontrol et
    let hasUseTranslation = false;
    let hasReactImport = false;
    
    traverse(ast, {
      ImportDeclaration(path) {
        if (path.node.source.value === 'react-i18next') {
          hasUseTranslation = true;
        }
        if (path.node.source.value === 'react') {
          hasReactImport = true;
        }
      }
    });
    
    // Türkçe metinleri değiştir
    traverse(ast, {
      StringLiteral(path) {
        const value = path.node.value;
        const translationKey = translations[value];
        
        if (translationKey && !path.isDescendant(path.findParent(p => p.isImportDeclaration()))) {
          // JSX attribute içinde mi kontrol et
          if (path.parentPath.isJSXAttribute()) {
            // {t('key')} formatına dönüştür
            const callExpression = t.callExpression(
              t.identifier('t'),
              [t.stringLiteral(translationKey)]
            );
            path.replaceWith(t.jsxExpressionContainer(callExpression));
            modified = true;
          } else {
            // Normal string literal
            const callExpression = t.callExpression(
              t.identifier('t'),
              [t.stringLiteral(translationKey)]
            );
            path.replaceWith(callExpression);
            modified = true;
          }
        }
      },
      JSXText(path) {
        const value = path.node.value.trim();
        const translationKey = translations[value];
        
        if (translationKey && value.length > 0) {
          const callExpression = t.callExpression(
            t.identifier('t'),
            [t.stringLiteral(translationKey)]
          );
          path.replaceWith(t.jsxExpressionContainer(callExpression));
          modified = true;
        }
      }
    });
    
    // Eğer değişiklik yapıldıysa ve useTranslation yoksa, ekle
    if (modified && !hasUseTranslation) {
      // Import ekle
      const importDeclaration = t.importDeclaration(
        [t.importSpecifier(t.identifier('useTranslation'), t.identifier('useTranslation'))],
        t.stringLiteral('react-i18next')
      );
      
      // Import'u dosyanın başına ekle
      ast.program.body.unshift(importDeclaration);
      
      // Component içinde useTranslation hook'u ekle
      traverse(ast, {
        FunctionDeclaration(path) {
          if (path.node.id && /^[A-Z]/.test(path.node.id.name)) {
            addUseTranslationHook(path);
          }
        },
        VariableDeclarator(path) {
          if (path.node.id && path.node.id.type === 'Identifier' && 
              /^[A-Z]/.test(path.node.id.name) &&
              (path.node.init?.type === 'ArrowFunctionExpression' ||
               path.node.init?.type === 'FunctionExpression')) {
            addUseTranslationHook(path.get('init'));
          }
        }
      });
    }
    
    if (modified) {
      const { code } = generate(ast, { 
        retainLines: true,
        compact: false
      });
      return code;
    }
  } catch (error) {
    console.error(`Error transforming ${filePath}:`, error.message);
  }
  
  return null;
}

function addUseTranslationHook(path) {
  const body = path.node.body.body;
  if (!body) return;
  
  // const { t } = useTranslation(); ekle
  const useTranslationCall = t.variableDeclaration('const', [
    t.variableDeclarator(
      t.objectPattern([
        t.objectProperty(t.identifier('t'), t.identifier('t'), false, true)
      ]),
      t.callExpression(t.identifier('useTranslation'), [])
    )
  ]);
  
  // İlk satıra ekle
  body.unshift(useTranslationCall);
}

// Para birimi dönüşümleri için özel fonksiyon
function transformPriceFormats(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  
  try {
    const ast = parser.parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript']
    });
    
    // formatPrice fonksiyonlarını bul ve değiştir
    traverse(ast, {
      CallExpression(path) {
        if (path.node.callee.type === 'MemberExpression' &&
            path.node.callee.object.type === 'Identifier' &&
            path.node.callee.object.name === 'Intl' &&
            path.node.callee.property.name === 'NumberFormat') {
          
          // Currency: 'TRY' olan yerleri dinamik yap
          const options = path.node.arguments[1];
          if (options && options.type === 'ObjectExpression') {
            const currencyProp = options.properties.find(
              prop => prop.key.name === 'currency' && prop.value.value === 'TRY'
            );
            
            if (currencyProp) {
              // Import formatPrice ekle
              const importDeclaration = t.importDeclaration(
                [t.importSpecifier(t.identifier('formatPrice'), t.identifier('formatPrice'))],
                t.stringLiteral('../utils/formatPrice')
              );
              
              // Dosya başına ekle
              ast.program.body.unshift(importDeclaration);
              modified = true;
            }
          }
        }
      }
    });
    
    if (modified) {
      const { code } = generate(ast, { 
        retainLines: true,
        compact: false
      });
      return code;
    }
  } catch (error) {
    console.error(`Error transforming prices in ${filePath}:`, error.message);
  }
  
  return null;
}

// Ana dönüştürme fonksiyonu
function transformAll() {
  // Önce extraction sonuçlarını oku
  const resultsPath = path.join(__dirname, 'extraction-results.json');
  const results = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));
  
  // Basit bir çeviri map'i oluştur
  const translationMap = {};
  Object.entries(results.translations.tr).forEach(([key, value]) => {
    translationMap[value] = key;
  });
  
  const srcPath = path.join(__dirname, '..', '..');
  const files = glob.sync('src/**/*.{tsx,ts}', { cwd: srcPath });
  
  let transformedCount = 0;
  const transformedFiles = [];
  
  files.forEach(file => {
    const filePath = path.join(srcPath, file);
    
    // i18n klasörünü atla
    if (filePath.includes('src/i18n')) return;
    
    // Metin dönüşümü
    const transformedCode = transformFile(filePath, translationMap);
    if (transformedCode) {
      fs.writeFileSync(filePath, transformedCode);
      transformedCount++;
      transformedFiles.push(file);
    }
    
    // Para birimi dönüşümü
    const priceTransformed = transformPriceFormats(filePath);
    if (priceTransformed) {
      fs.writeFileSync(filePath, priceTransformed);
    }
  });
  
  console.log(`✅ Transformation complete!`);
  console.log(`📝 Files transformed: ${transformedCount}`);
  console.log(`📁 Transformed files:`);
  transformedFiles.slice(0, 10).forEach(file => {
    console.log(`   - ${file}`);
  });
  if (transformedFiles.length > 10) {
    console.log(`   ... and ${transformedFiles.length - 10} more`);
  }
}

// Programı çalıştır
if (require.main === module) {
  transformAll();
}

module.exports = { transformFile, transformPriceFormats, transformAll };
