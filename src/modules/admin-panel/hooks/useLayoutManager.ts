import { useState, useEffect } from 'react';
import { UseLayoutManagerReturn, LayoutMode, CardPositionsMap } from '../types/adminTypes';
import { showToast, snapToGrid, generateDefaultPositions, generateAlignedPositions } from '../utils/layoutUtils';
import { useTranslation } from "react-i18next";
export const useLayoutManager = (): UseLayoutManagerReturn => {
  const [layoutMode] = useState<LayoutMode>('grid');
  const [currentLayout, setCurrentLayout] = useState<number>(1);
  const [cardPositions, setCardPositions] = useState<CardPositionsMap>({});

  // Load saved layout and positions from localStorage
  useEffect(() => {
    const savedLayout = localStorage.getItem('adminLayout');
    const savedPositions = localStorage.getItem('adminCardPositions');
    if (savedLayout) {
      setCurrentLayout(parseInt(savedLayout));
    }
    if (savedPositions) {
      setCardPositions(JSON.parse(savedPositions));
    }
  }, []);

  // Save current layout to localStorage
  const saveCurrentLayout = () => {
    const layoutNumber = currentLayout;
    localStorage.setItem(`adminLayout_${layoutNumber}`, JSON.stringify(cardPositions));
    localStorage.setItem('adminLayout', layoutNumber.toString());
    showToast(`Düzen ${layoutNumber} kaydedildi!`, '✅', 'green');
  };

  // Load specific layout from localStorage
  const loadLayout = (layoutNumber: number) => {
    const savedLayout = localStorage.getItem(`adminLayout_${layoutNumber}`);
    if (savedLayout) {
      const positions = JSON.parse(savedLayout);
      setCardPositions(positions);
      setCurrentLayout(layoutNumber);
      localStorage.setItem('adminLayout', layoutNumber.toString());
      showToast(`Düzen ${layoutNumber} yüklendi!`, '🏗️', 'blue');
    } else {
      // Default positions for new layouts
      const defaultPositions = generateDefaultPositions();
      setCardPositions(defaultPositions);
      setCurrentLayout(layoutNumber);
    }
  };

  // Reset layout to default positions
  const resetLayout = () => {
    const defaultPositions = generateDefaultPositions();
    setCardPositions(defaultPositions);
  };

  // Auto align cards to perfect grid
  const autoAlign = () => {
    const alignedPositions = generateAlignedPositions();
    setCardPositions(alignedPositions);
    localStorage.setItem('adminCardPositions', JSON.stringify(alignedPositions));
    showToast(t("common.perfect_grid_düzeni_oluşturuldu"), '🎯', 'purple');
  };

  // Handle drag stop with magnetic snapping
  const handleDragStop = (cardId: string, _e: any, data: any) => {
    // Manyetik snapping uygula
    const snapped = snapToGrid(data.x, data.y);
    const newPositions = {
      ...cardPositions
    };
    newPositions[cardId] = snapped;
    setCardPositions(newPositions);
    localStorage.setItem('adminCardPositions', JSON.stringify(newPositions));
  };
  return {
    layoutMode,
    currentLayout,
    cardPositions,
    setCurrentLayout,
    setCardPositions,
    saveCurrentLayout,
    loadLayout,
    resetLayout,
    autoAlign,
    handleDragStop
  };
};