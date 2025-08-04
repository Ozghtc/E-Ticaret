// 📏 Beden Sistemleri
export interface SizeOption {
  value: string;
  label: string;
  description?: string;
}

export interface SizeSystem {
  id: string;
  name: string;
  emoji: string;
  description: string;
  sizes: SizeOption[];
}

export const sizeSystems: Record<string, SizeSystem> = {
  letter: {
    id: 'letter',
    name: 'Harf Sistemi',
    emoji: '🔤',
    description: 'Tişört, gömlek, ceket için standart harf bedenleri',
    sizes: [
      { value: 'XS', label: 'XS', description: 'Extra Small' },
      { value: 'S', label: 'S', description: 'Small' },
      { value: 'M', label: 'M', description: 'Medium' },
      { value: 'L', label: 'L', description: 'Large' },
      { value: 'XL', label: 'XL', description: 'Extra Large' },
      { value: 'XXL', label: 'XXL', description: '2X Large' },
      { value: 'XXXL', label: 'XXXL', description: '3X Large' }
    ]
  },
  number: {
    id: 'number',
    name: 'Sayı Sistemi',
    emoji: '🔢',
    description: 'Pantolon, etek için sayısal beden sistemi',
    sizes: [
      { value: '34', label: '34', description: 'Beden 34' },
      { value: '36', label: '36', description: 'Beden 36' },
      { value: '38', label: '38', description: 'Beden 38' },
      { value: '40', label: '40', description: 'Beden 40' },
      { value: '42', label: '42', description: 'Beden 42' },
      { value: '44', label: '44', description: 'Beden 44' },
      { value: '46', label: '46', description: 'Beden 46' },
      { value: '48', label: '48', description: 'Beden 48' },
      { value: '50', label: '50', description: 'Beden 50' }
    ]
  },
  shoe: {
    id: 'shoe',
    name: 'Ayakkabı Numarası',
    emoji: '👠',
    description: 'Ayakkabı için numara sistemi',
    sizes: [
      { value: '36', label: '36', description: '36 Numara' },
      { value: '37', label: '37', description: '37 Numara' },
      { value: '38', label: '38', description: '38 Numara' },
      { value: '39', label: '39', description: '39 Numara' },
      { value: '40', label: '40', description: '40 Numara' },
      { value: '41', label: '41', description: '41 Numara' },
      { value: '42', label: '42', description: '42 Numara' },
      { value: '43', label: '43', description: '43 Numara' },
      { value: '44', label: '44', description: '44 Numara' },
      { value: '45', label: '45', description: '45 Numara' }
    ]
  },
  underwear: {
    id: 'underwear',
    name: 'İç Giyim Bedeni',
    emoji: '🩲',
    description: 'Sütyen ve iç giyim için özel beden sistemi',
    sizes: [
      { value: '70A', label: '70A', description: '70 A Kupa' },
      { value: '70B', label: '70B', description: '70 B Kupa' },
      { value: '70C', label: '70C', description: '70 C Kupa' },
      { value: '75A', label: '75A', description: '75 A Kupa' },
      { value: '75B', label: '75B', description: '75 B Kupa' },
      { value: '75C', label: '75C', description: '75 C Kupa' },
      { value: '80A', label: '80A', description: '80 A Kupa' },
      { value: '80B', label: '80B', description: '80 B Kupa' },
      { value: '80C', label: '80C', description: '80 C Kupa' },
      { value: '85A', label: '85A', description: '85 A Kupa' },
      { value: '85B', label: '85B', description: '85 B Kupa' },
      { value: '85C', label: '85C', description: '85 C Kupa' },
      { value: '90A', label: '90A', description: '90 A Kupa' },
      { value: '90B', label: '90B', description: '90 B Kupa' },
      { value: '90C', label: '90C', description: '90 C Kupa' },
      { value: '90D', label: '90D', description: '90 D Kupa' }
    ]
  },
  length: {
    id: 'length',
    name: 'Uzunluk (cm)',
    emoji: '📏',
    description: 'Kemer, atkı için uzunluk ölçüsü',
    sizes: [
      { value: '75', label: '75 cm', description: '75 santimetre' },
      { value: '80', label: '80 cm', description: '80 santimetre' },
      { value: '85', label: '85 cm', description: '85 santimetre' },
      { value: '90', label: '90 cm', description: '90 santimetre' },
      { value: '95', label: '95 cm', description: '95 santimetre' },
      { value: '100', label: '100 cm', description: '100 santimetre' },
      { value: '105', label: '105 cm', description: '105 santimetre' },
      { value: '110', label: '110 cm', description: '110 santimetre' }
    ]
  },
  onesize: {
    id: 'onesize',
    name: 'Tek Beden',
    emoji: '⭕',
    description: 'Çanta, takı, şapka için tek beden',
    sizes: [
      { value: 'onesize', label: 'Tek Beden', description: 'Standart beden' }
    ]
  }
};

export const getSizeSystem = (systemId: string): SizeSystem | undefined => {
  return sizeSystems[systemId];
};