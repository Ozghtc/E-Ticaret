// 🌍 Country Selector - Hem dropdown hem arama özellikli
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Search, X } from 'lucide-react';
import { countries, getPopularCountries, searchCountries } from './countries';
import { useTranslation } from "react-i18next";
interface CountrySelectorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  required?: boolean;
}
function CountrySelector({
  value,
  onChange,
  placeholder = t("common.menşei_seçin_veya_yazın"),
  className = "",
  required = false
}: CountrySelectorProps) {
  const {
    t
  } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Arama sonuçları
  const filteredCountries = searchTerm.trim() ? searchCountries(searchTerm) : [...getPopularCountries(), ...countries.filter(c => !c.popular && c.id !== 'diger')];

  // Input değeri - seçili ülke adı veya arama terimi
  const displayValue = value || searchTerm;

  // Dropdown dışına tıklandığında kapat
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen && (e.key === 'ArrowDown' || e.key === 'ArrowUp' || e.key === 'Enter')) {
      setIsOpen(true);
      return;
    }
    if (!isOpen) return;
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => prev < filteredCountries.length - 1 ? prev + 1 : 0);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : filteredCountries.length - 1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && filteredCountries[highlightedIndex]) {
          handleSelect(filteredCountries[highlightedIndex].name);
        }
        break;
      case 'Escape':
        setIsOpen(false);
        setSearchTerm('');
        setHighlightedIndex(-1);
        inputRef.current?.blur();
        break;
    }
  };

  // Ülke seçimi
  const handleSelect = (countryName: string) => {
    onChange(countryName);
    setSearchTerm('');
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.blur();
  };

  // Input değişimi
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    setIsOpen(true);
    setHighlightedIndex(-1);

    // Eğer input temizlenirse value'yu da temizle
    if (!newValue.trim()) {
      onChange('');
    }
  };

  // Temizle butonu
  const handleClear = () => {
    onChange('');
    setSearchTerm('');
    setIsOpen(false);
    setHighlightedIndex(-1);
    inputRef.current?.focus();
  };

  // Dropdown toggle
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      inputRef.current?.focus();
    }
  };
  return <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Input Field */}
      <div className="relative">
        <input ref={inputRef} type="text" value={displayValue} onChange={handleInputChange} onKeyDown={handleKeyDown} onFocus={() => setIsOpen(true)} placeholder={placeholder} className={`w-full p-3 pr-20 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${isOpen ? 'ring-2 ring-blue-500 border-transparent' : ''}`} required={required} autoComplete="off" />
        
        {/* Right Side Icons */}
        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
          {/* Search Icon */}
          {searchTerm && <Search size={16} className="text-gray-400" />}
          
          {/* Clear Button */}
          {(value || searchTerm) && <button type="button" onClick={handleClear} className="text-gray-400 hover:text-gray-600 p-1" tabIndex={-1}>
              <X size={16} />
            </button>}
          
          {/* Dropdown Arrow */}
          <button type="button" onClick={toggleDropdown} className={`text-gray-400 hover:text-gray-600 p-1 transition-transform ${isOpen ? 'rotate-180' : ''}`} tabIndex={-1}>
            <ChevronDown size={16} />
          </button>
        </div>
      </div>

      {/* Dropdown */}
      {isOpen && <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {/* Arama sonucu yok */}
          {filteredCountries.length === 0 && <div className="p-3 text-gray-500 text-center">
              <Search size={16} className="mx-auto mb-2" />
              "{searchTerm}{t("common.için_sonuç_bulunamadı")}</div>}

          {/* Popüler Ülkeler */}
          {!searchTerm && <>
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b">{t("common.popüler_ülkeler")}</div>
              {getPopularCountries().map((country, index) => <button key={country.id} type="button" onClick={() => handleSelect(country.name)} className={`w-full text-left px-3 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none ${highlightedIndex === index ? 'bg-blue-50' : ''}`}>
                  <span className="mr-2">{country.flag}</span>
                  {country.name}
                </button>)}
              
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b border-t">{t("common.tüm_ülkeler")}</div>
            </>}

          {/* Arama Sonuçları veya Tüm Ülkeler */}
          {(searchTerm ? filteredCountries : countries.filter(c => !c.popular && c.id !== 'diger')).map((country, index) => {
        const actualIndex = searchTerm ? index : index + getPopularCountries().length;
        return <button key={country.id} type="button" onClick={() => handleSelect(country.name)} className={`w-full text-left px-3 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none ${highlightedIndex === actualIndex ? 'bg-blue-50' : ''}`}>
                  <span className="mr-2">{country.flag}</span>
                  <span>
                    {searchTerm ?
            // Arama terimini highlight et
            country.name.split(new RegExp(`(${searchTerm})`, 'gi')).map((part, i) => part.toLowerCase() === searchTerm.toLowerCase() ? <mark key={i} className="bg-yellow-200">{part}</mark> : part) : country.name}
                  </span>
                  {country.region && <span className="text-xs text-gray-400 ml-2">({country.region})</span>}
                </button>;
      })}

          {/* Diğer seçeneği */}
          {!searchTerm && <>
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 bg-gray-50 border-b border-t">{t("common.diğer")}</div>
              <button type="button" onClick={() => handleSelect('Diğer')} className={`w-full text-left px-3 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none ${highlightedIndex === filteredCountries.length - 1 ? 'bg-blue-50' : ''}`}>
                <span className="mr-2">🌍</span>
                Diğer
              </button>
            </>}
        </div>}
    </div>;
}
export default CountrySelector;