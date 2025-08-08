import { useState, useCallback } from 'react';
import { useTranslation } from "react-i18next";
export interface SeoData {
  title: string;
  description: string;
  keywords: string[];
  url: string;
  content: string;
}
export interface SeoScore {
  overall: number;
  titleScore: number;
  descriptionScore: number;
  keywordScore: number;
  contentScore: number;
  suggestions: string[];
}
export function useSeoAnalysis() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [seoScore, setSeoScore] = useState<SeoScore | null>(null);
  const analyzeSeo = useCallback(async (data: SeoData): Promise<SeoScore> => {
    setIsAnalyzing(true);

    // Simulated SEO analysis
    await new Promise(resolve => setTimeout(resolve, 2000));
    const score: SeoScore = {
      overall: calculateOverallScore(data),
      titleScore: analyzeTitleScore(data.title),
      descriptionScore: analyzeDescriptionScore(data.description),
      keywordScore: analyzeKeywordScore(data.keywords, data.content),
      contentScore: analyzeContentScore(data.content),
      suggestions: generateSuggestions(data)
    };
    setSeoScore(score);
    setIsAnalyzing(false);
    return score;
  }, []);
  const generateSeoContent = useCallback((productName: string, category: string, brand?: string) => {
    const title = `${productName}${brand ? ` - ${brand}` : ''} | ${category} | Online Satış`;
    const description = `${productName} ürününü${brand ? ` ${brand} markasından` : ''} uygun fiyatlarla satın alın. Hızlı kargo, güvenli ödeme, kolay iade.`;
    return {
      title,
      description
    };
  }, []);
  return {
    isAnalyzing,
    seoScore,
    analyzeSeo,
    generateSeoContent
  };
}

// Helper functions
function calculateOverallScore(data: SeoData): number {
  const titleScore = analyzeTitleScore(data.title);
  const descriptionScore = analyzeDescriptionScore(data.description);
  const keywordScore = analyzeKeywordScore(data.keywords, data.content);
  const contentScore = analyzeContentScore(data.content);
  return Math.round((titleScore + descriptionScore + keywordScore + contentScore) / 4);
}
function analyzeTitleScore(title: string): number {
  if (!title) return 0;
  if (title.length < 30) return 40;
  if (title.length > 60) return 60;
  return 90;
}
function analyzeDescriptionScore(description: string): number {
  if (!description) return 0;
  if (description.length < 120) return 50;
  if (description.length > 160) return 70;
  return 95;
}
function analyzeKeywordScore(keywords: string[], content: string): number {
  if (keywords.length === 0) return 0;
  if (keywords.length < 3) return 60;
  if (keywords.length > 10) return 70;
  return 85;
}
function analyzeContentScore(content: string): number {
  if (!content) return 0;
  if (content.length < 100) return 40;
  if (content.length < 300) return 70;
  return 90;
}
function generateSuggestions(data: SeoData): string[] {
  const suggestions: string[] = [];
  if (data.title.length < 30) {
    suggestions.push(t("common.başlığı_daha_açıklayıcı_hale_getirin_30_60_karakter"));
  }
  if (data.description.length < 120) {
    suggestions.push(t("common.meta_açıklamayı_genişletin_120_160_karakter"));
  }
  if (data.keywords.length < 3) {
    suggestions.push('Daha fazla anahtar kelime ekleyin');
  }
  return suggestions;
}