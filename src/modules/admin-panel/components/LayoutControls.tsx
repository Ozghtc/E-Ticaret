import React from 'react';
import { AlignJustify, Grid3X3, Save, RotateCcw } from 'lucide-react';
import { LayoutMode } from '../types/adminTypes';

interface LayoutControlsProps {
  layoutMode: LayoutMode;
  useGroupedLayout: boolean;
  currentLayout: number;
  toggleLayoutMode: () => void;
  loadLayout: (layout: number) => void;
  autoAlign: () => void;
  saveCurrentLayout: () => void;
  resetLayout: () => void;
}

const LayoutControls: React.FC<LayoutControlsProps> = ({
  layoutMode,
  useGroupedLayout,
  currentLayout,
  toggleLayoutMode,
  loadLayout,
  autoAlign,
  saveCurrentLayout,
  resetLayout
}) => {
  return (
    <div className="mb-8 flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0">
      {/* İpucu */}
      <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-md border border-white/20 px-4 py-2 rounded-full">
        <span className="text-blue-700 font-medium">💡 İpucu:</span>
        <span className="text-gray-700">
          {layoutMode === 'grid' 
            ? 'Sayfa Düzeni ile sürükleyerek taşıyabilirsiniz!' 
            : 'Dağınık yerleştirin, Perfect Hizala ile 4x3 grid yapın! 🎯'}
        </span>
      </div>

      {/* Layout Control Panel */}
      <div className="flex items-center space-x-3">
        {/* Layout Mode Toggle */}
        <button
          onClick={toggleLayoutMode}
          className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-300 border ${
            useGroupedLayout
              ? 'bg-green-500/80 hover:bg-green-600/90 text-white border-green-400/50 shadow-lg backdrop-blur-md'
              : 'bg-white/20 hover:bg-white/30 text-gray-700 border-white/30 backdrop-blur-md'
          }`}
        >
          <AlignJustify size={18} />
          <span>{useGroupedLayout ? 'Yatay Satır' : 'Sayfa Düzeni'}</span>
        </button>

        {/* Layout Presets */}
        {layoutMode === 'free' && (
          <div className="flex items-center space-x-2">
            {/* Düzen Seçimi */}
            <div className="flex space-x-1 bg-white/20 backdrop-blur-md border border-white/30 rounded-xl p-1">
              {[1, 2, 3].map((layout) => (
                <button
                  key={layout}
                  onClick={() => loadLayout(layout)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    currentLayout === layout
                      ? 'bg-blue-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-white/30'
                  }`}
                >
                  Düzen {layout}
                </button>
              ))}
            </div>

            {/* Action Buttons */}
            <button
              onClick={autoAlign}
              className="flex items-center space-x-1 bg-purple-500/80 hover:bg-purple-600/90 text-white px-3 py-2 rounded-xl backdrop-blur-md border border-purple-400/50 transition-all"
              title="Dağınık düzenden perfect 4x3 grid'e otomatik yerleştir - Kartların içeriği aynı kalır!"
            >
              <Grid3X3 size={16} />
              <span className="hidden sm:inline">Perfect Hizala</span>
            </button>

            <button
              onClick={saveCurrentLayout}
              className="flex items-center space-x-1 bg-green-500/80 hover:bg-green-600/90 text-white px-3 py-2 rounded-xl backdrop-blur-md border border-green-400/50 transition-all"
              title="Mevcut düzeni kaydet"
            >
              <Save size={16} />
              <span className="hidden sm:inline">Kaydet</span>
            </button>

            <button
              onClick={resetLayout}
              className="flex items-center space-x-1 bg-orange-500/80 hover:bg-orange-600/90 text-white px-3 py-2 rounded-xl backdrop-blur-md border border-orange-400/50 transition-all"
              title="Varsayılan düzene sıfırla"
            >
              <RotateCcw size={16} />
              <span className="hidden sm:inline">Sıfırla</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LayoutControls;
