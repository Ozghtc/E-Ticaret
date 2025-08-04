@@ .. @@
     updateFormData('seoTitle', seoResult.title);
     updateFormData('seoDescription', seoResult.description);
     updateFormData('seoKeywords', seoResult.keywords);
+    
+    // SEO sonuçlarını state'e kaydet
+    setSeoScore(seoResult.score);
+    setSeoSuggestions(seoResult.suggestions);
+    setShowSeoResult(true);
   };