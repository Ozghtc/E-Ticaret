const fs = require('fs');
const path = require('path');
const glob = require('glob');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const t = require('@babel/types');
const generate = require('@babel/generator').default;

// Extraction sonuçlarını yükle
const resultsPath = path.join(__dirname, 'extraction-results.json');
const extractionResults = JSON.parse(fs.readFileSync(resultsPath, 'utf8'));

// Basit çeviri map'i oluştur
const translationMap = {};
Object.entries(extractionResults.translations.tr).forEach(([key, value]) => {
  translationMap[value] = key;
});

// Dosyayı dönüştür
function transformFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  let modified = false;
  let hasUseTranslation = false;
  let needsFormatPrice = false;
  
  try {
    const ast = parser.parse(content, {
      sourceType: 'module',
      plugins: ['jsx', 'typescript', 'decorators-legacy']
    });
    
    // Import kontrolü
    traverse(ast, {
      ImportDeclaration(path) {
        if (path.node.source.value === 'react-i18next') {
          hasUseTranslation = true;
        }
      }
    });
    
    // Türkçe metinleri değiştir
    traverse(ast, {
      StringLiteral(path) {
        const value = path.node.value;
        if (translationMap[value] && !path.isDescendant(path.findParent(p => p.isImportDeclaration()))) {
          const key = translationMap[value];
          
          // JSX attribute içinde mi?
          if (path.parentPath.isJSXAttribute()) {
            path.replaceWith(
              t.jsxExpressionContainer(
                t.callExpression(t.identifier('t'), [t.stringLiteral(key)])
              )
            );
          } else {
            path.replaceWith(
              t.callExpression(t.identifier('t'), [t.stringLiteral(key)])
            );
          }
          modified = true;
        }
      },
      JSXText(path) {
        const value = path.node.value.trim();
        if (translationMap[value] && value.length > 0) {
          const key = translationMap[value];
          path.replaceWith(
            t.jsxExpressionContainer(
              t.callExpression(t.identifier('t'), [t.stringLiteral(key)])
            )
          );
          modified = true;
        }
      }
    });
    
    // Eğer değişiklik yapıldıysa ve useTranslation yoksa ekle
    if (modified && !hasUseTranslation) {
      // Import ekle
      const importStatement = t.importDeclaration(
        [t.importSpecifier(t.identifier('useTranslation'), t.identifier('useTranslation'))],
        t.stringLiteral('react-i18next')
      );
      
      // İlk import'tan sonra ekle
      let insertIndex = 0;
      for (let i = 0; i < ast.program.body.length; i++) {
        if (ast.program.body[i].type === 'ImportDeclaration') {
          insertIndex = i + 1;
        } else {
          break;
        }
      }
      
      ast.program.body.splice(insertIndex, 0, importStatement);
      
      // Component içinde hook ekle
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
            const funcPath = path.get('init');
            if (funcPath.node.body.type === 'BlockStatement') {
              addUseTranslationHook(funcPath);
            }
          }
        }
      });
    }
    
    if (modified) {
      const { code } = generate(ast, { 
        retainLines: false,
        compact: false,
        jsescOption: { minimal: true }
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
  
  // Hook'un zaten var olup olmadığını kontrol et
  for (let stmt of body) {
    if (stmt.type === 'VariableDeclaration' && 
        stmt.declarations.some(d => 
          d.init?.callee?.name === 'useTranslation'
        )) {
      return;
    }
  }
  
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

// Ana dönüştürme fonksiyonu
function bulkTransform() {
  const srcPath = path.join(__dirname, '..', '..');
  const files = glob.sync('src/**/*.{tsx,ts}', { cwd: srcPath });
  
  let transformedCount = 0;
  const transformedFiles = [];
  const errors = [];
  
  // i18n klasörünü ve bazı dosyaları atla
  const skipPatterns = [
    'src/i18n/',
    'src/locales/',
    'src/utils/formatPrice',
    'src/context/LanguageCurrencyContext',
    '.backup.',
    '.test.',
    '.spec.'
  ];
  
  files.forEach(file => {
    const filePath = path.join(srcPath, file);
    
    // Atlanacak dosya mı?
    if (skipPatterns.some(pattern => filePath.includes(pattern))) {
      return;
    }
    
    const transformedCode = transformFile(filePath);
    if (transformedCode) {
      try {
        fs.writeFileSync(filePath, transformedCode);
        transformedCount++;
        transformedFiles.push(file);
      } catch (error) {
        errors.push({ file, error: error.message });
      }
    }
  });
  
  console.log(`\n✅ Transformation complete!`);
  console.log(`📝 Files transformed: ${transformedCount}`);
  console.log(`\n🎯 Transformed files:`);
  transformedFiles.slice(0, 20).forEach(file => {
    console.log(`   ✓ ${file}`);
  });
  if (transformedFiles.length > 20) {
    console.log(`   ... and ${transformedFiles.length - 20} more`);
  }
  
  if (errors.length > 0) {
    console.log(`\n⚠️  Errors occurred in ${errors.length} files:`);
    errors.slice(0, 5).forEach(({ file, error }) => {
      console.log(`   ✗ ${file}: ${error}`);
    });
  }
  
  // Çeviri istatistikleri
  const totalTexts = Object.keys(translationMap).length;
  console.log(`\n📊 Translation Stats:`);
  console.log(`   Total texts: ${totalTexts}`);
  console.log(`   Files processed: ${files.length}`);
  console.log(`   Files transformed: ${transformedCount}`);
}

// Programı çalıştır
if (require.main === module) {
  console.log('🔄 Starting bulk transformation...');
  console.log(`📁 Found ${Object.keys(translationMap).length} texts to transform\n`);
  bulkTransform();
}

module.exports = { transformFile, bulkTransform };
