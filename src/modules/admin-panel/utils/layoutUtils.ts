import { CardPositionsMap } from '../types/adminTypes';
import { adminCards } from '../data/adminCards';

// Toast notification utility
export const showToast = (message: string, emoji: string, color: string) => {
  const toast = document.createElement('div');
  toast.className = `fixed top-4 right-4 bg-${color}-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all transform`;
  toast.innerHTML = `<div class="flex items-center space-x-2"><span>${emoji}</span><span>${message}</span></div>`;
  document.body.appendChild(toast);
  setTimeout(() => {
    toast.classList.add('translate-x-full', 'opacity-0');
    setTimeout(() => document.body.removeChild(toast), 300);
  }, 2000);
};

// Manyetik snapping utility
export const snapToGrid = (x: number, y: number, threshold: number = 15) => {
  const GRID_SIZE = 20;
  const snappedX = Math.round(x / GRID_SIZE) * GRID_SIZE;
  const snappedY = Math.round(y / GRID_SIZE) * GRID_SIZE;
  
  // Eğer grid noktasına yeterince yakınsa yapıştır
  if (Math.abs(x - snappedX) <= threshold && Math.abs(y - snappedY) <= threshold) {
    return { x: snappedX, y: snappedY };
  }
  
  return { x, y };
};

// Default positions generator
export const generateDefaultPositions = (): CardPositionsMap => {
  const defaultPositions: CardPositionsMap = {};
  adminCards.forEach((card, index) => {
    const row = Math.floor(index / 4);
    const col = index % 4;
    defaultPositions[card.id] = { x: col * 320, y: row * 200 };
  });
  return defaultPositions;
};

// Auto align to perfect grid
export const generateAlignedPositions = (): CardPositionsMap => {
  const CARD_WIDTH = 320; // Kart genişliği + gap
  const CARD_HEIGHT = 200; // Kart yüksekliği + gap
  const START_X = 0; // Grid başlangıç X
  const START_Y = 0; // Grid başlangıç Y
  const COLS = 4; // 4 sütun
  
  const alignedPositions: CardPositionsMap = {};

  // Kartları 4x3 grid düzeninde yerleştir
  adminCards.forEach((card, index) => {
    const row = Math.floor(index / COLS); // Hangi satır
    const col = index % COLS; // Hangi sütun
    
    const gridX = START_X + (col * CARD_WIDTH);
    const gridY = START_Y + (row * CARD_HEIGHT);

    alignedPositions[card.id] = { x: gridX, y: gridY };
  });

  return alignedPositions;
};

// Date formatting utility
export const getCurrentDate = (): string => {
  const now = new Date();
  return now.toLocaleDateString('tr-TR', {
    day: '2-digit',
    month: '2-digit', 
    year: 'numeric'
  }) + ' | ' + now.toLocaleTimeString('tr-TR', {
    hour: '2-digit',
    minute: '2-digit'
  });
};
