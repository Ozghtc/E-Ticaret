import { useMemo } from 'react';
import { themeMap, ThemeKey } from '../config/themeMap';

export function useThemeTemplate(themeId: string) {
  const Template = useMemo(() => {
    if (themeId in themeMap) {
      return themeMap[themeId as ThemeKey];
    }
    // Fallback to default template
    return themeMap['fashion-store'];
  }, [themeId]);

  return Template;
}