import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search, MapPin } from 'lucide-react';
import { TURKIYE_ILLERI, getPopulerIller, searchIller, type Il } from '../data/il-ilce';

interface IlSelectorProps {
  value?: number;
  onChange: (ilId: number, ilName: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const IlSelector: React.FC<IlSelectorProps> = ({
  value,
  onChange,
  placeholder = "İl ara ve seç...",
  disabled = false
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [selectedIl, setSelectedIl] = useState<Il | null>(null);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Seçili ili bul
  useEffect(() => {
    if (value) {
      const il = TURKIYE_ILLERI.find(il => il.id === value);
      if (il) {
        setSelectedIl(il);
        setSearchTerm(il.name);
      }
    } else {
      setSelectedIl(null);
      setSearchTerm('');
    }
  }, [value]);

  // Filtrelenmiş iller
  const filteredIller = searchTerm.length > 0 ? searchIller(searchTerm) : [];
  const popularIller = getPopulerIller();

  // Input değişikliği
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    setShowDropdown(true);
    setHighlightedIndex(-1);

    // Eğer tam eşleşme varsa otomatik seç
    if (term.length > 2) {
      const exactMatch = TURKIYE_ILLERI.find(
        il => il.name.toLowerCase() === term.toLowerCase()
      );
      if (exactMatch) {
        setSelectedIl(exactMatch);
        onChange(exactMatch.id, exactMatch.name);
      }
    }
  };

  // İl seçimi
  const handleSelectIl = (il: Il) => {
    setSelectedIl(il);
    setSearchTerm(il.name);
    setShowDropdown(false);
    setHighlightedIndex(-1);
    onChange(il.id, il.name);
    inputRef.current?.blur();
  };

  // Keyboard navigasyonu
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showDropdown) {
      if (e.key === 'ArrowDown' || e.key === 'Enter') {
        setShowDropdown(true);
        return;
      }
    }

    const allIller = searchTerm.length > 0 ? filteredIller : [...popularIller, ...TURKIYE_ILLERI];

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < allIller.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev > 0 ? prev - 1 : allIller.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0) {
          handleSelectIl(allIller[highlightedIndex]);
        }
        break;
      case 'Escape':
        setShowDropdown(false);
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Click outside detection
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative">
      {/* Input Field */}
      <div className="relative">
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowDropdown(true)}
          disabled={disabled}
          className={`w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 ${
            disabled ? 'bg-gray-100 cursor-not-allowed' : ''
          }`}
          placeholder={placeholder}
          autoComplete="off"
        />
        
        {/* Icons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {searchTerm && (
            <Search size={16} className="text-gray-400" />
          )}
          <ChevronDown 
            size={16} 
            className={`text-gray-400 transition-transform ${showDropdown ? 'rotate-180' : ''}`}
          />
        </div>
      </div>

      {/* Selected Il Confirmation */}
      {selectedIl && !showDropdown && (
        <div className="mt-2 flex items-center text-sm text-green-600">
          <MapPin size={14} className="mr-1" />
          <span>✓ {selectedIl.name} ({selectedIl.plateCode}) - {selectedIl.region}</span>
        </div>
      )}

      {/* Dropdown */}
      {showDropdown && (
        <div
          ref={dropdownRef}
          className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-64 overflow-y-auto"
        >
          {searchTerm.length > 0 ? (
            /* Arama Sonuçları */
            <>
              {filteredIller.length > 0 ? (
                <>
                  <div className="px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50 border-b">
                    🔍 Arama Sonuçları ({filteredIller.length})
                  </div>
                  {filteredIller.map((il, index) => (
                    <div
                      key={il.id}
                      className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                        index === highlightedIndex ? 'bg-green-50 text-green-700' : ''
                      }`}
                      onClick={() => handleSelectIl(il)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="font-medium">{il.name}</span>
                          <span className="ml-2 text-sm text-gray-500">({il.plateCode})</span>
                        </div>
                        <span className="text-xs text-gray-400">{il.region}</span>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <div className="px-4 py-3 text-center text-gray-500">
                  <Search size={20} className="mx-auto mb-2 text-gray-300" />
                  <p>"{searchTerm}" için sonuç bulunamadı</p>
                  <p className="text-xs mt-1">Türkiye'deki 81 il arasından arayın</p>
                </div>
              )}
            </>
          ) : (
            /* Popüler + Tüm İller */
            <>
              {/* Popüler İller */}
              <div className="px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50 border-b">
                🏙️ Popüler İller
              </div>
              {popularIller.map((il, index) => (
                <div
                  key={il.id}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                    index === highlightedIndex ? 'bg-green-50 text-green-700' : ''
                  }`}
                  onClick={() => handleSelectIl(il)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{il.name}</span>
                      <span className="ml-2 text-sm text-gray-500">({il.plateCode})</span>
                    </div>
                    <span className="text-xs text-gray-400">{il.region}</span>
                  </div>
                </div>
              ))}

              {/* Ayırıcı */}
              <div className="px-3 py-2 text-xs font-medium text-gray-500 bg-gray-50 border-b border-t">
                🇹🇷 Tüm İller (A-Z) - {TURKIYE_ILLERI.length} il
              </div>

              {/* Tüm İller */}
              {TURKIYE_ILLERI.map((il, index) => (
                <div
                  key={il.id}
                  className={`px-4 py-3 cursor-pointer hover:bg-gray-50 ${
                    index + popularIller.length === highlightedIndex ? 'bg-green-50 text-green-700' : ''
                  }`}
                  onClick={() => handleSelectIl(il)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-medium">{il.name}</span>
                      <span className="ml-2 text-sm text-gray-500">({il.plateCode})</span>
                    </div>
                    <span className="text-xs text-gray-400">{il.region}</span>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default IlSelector;