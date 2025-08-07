// Paket Tanımlama Modülü - Paket Tabs Bileşeni
import React from 'react';
import { PaketTabsProps } from '../types';

const PaketTabs: React.FC<PaketTabsProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    {
      id: 'eticaret',
      label: '🛍️ E-Ticaret Sitesi Paketleri',
      colors: 'border-blue-500 text-blue-600 bg-blue-50'
    },
    {
      id: 'premium',
      label: '💎 Premium E-Ticaret Paketleri',
      colors: 'border-purple-500 text-purple-600 bg-purple-50'
    },
    {
      id: 'sms',
      label: '📱 SMS Paketleri',
      colors: 'border-green-500 text-green-600 bg-green-50'
    }
  ] as const;

  return (
    <div className="border-b border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id as any)}
              className={`py-4 px-6 border-b-2 font-medium text-lg transition-all duration-300 ${
                activeTab === tab.id
                  ? tab.colors
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaketTabs;