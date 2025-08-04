import React, { useState } from 'react';
import { Target, Search, TrendingUp } from 'lucide-react';

export default function KeywordResearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [keywords, setKeywords] = useState([
    { keyword: 'kadın elbise', volume: 12000, difficulty: 'Orta', cpc: '2.50 TL' },
    { keyword: 'şık elbise', volume: 8500, difficulty: 'Kolay', cpc: '1.80 TL' },
    { keyword: 'günlük elbise', volume: 6200, difficulty: 'Kolay', cpc: '1.20 TL' },
    { keyword: 'parti elbisesi', volume: 4800, difficulty: 'Zor', cpc: '3.20 TL' }
  ]);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Target className="mr-2" size={24} />
          Anahtar Kelime Araştırması
        </h2>
      </div>

      {/* Arama Kutusu */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Anahtar kelime ara..."
            className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
          <button className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-md">
            <Search size={16} />
          </button>
        </div>
      </div>

      {/* Anahtar Kelime Tablosu */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-gray-50">
              <th className="text-left p-3 font-medium text-gray-700">Anahtar Kelime</th>
              <th className="text-left p-3 font-medium text-gray-700">Aylık Arama</th>
              <th className="text-left p-3 font-medium text-gray-700">Zorluk</th>
              <th className="text-left p-3 font-medium text-gray-700">CPC</th>
              <th className="text-left p-3 font-medium text-gray-700">Trend</th>
            </tr>
          </thead>
          <tbody>
            {keywords.map((item, index) => (
              <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                <td className="p-3 font-medium">{item.keyword}</td>
                <td className="p-3">{item.volume.toLocaleString()}</td>
                <td className="p-3">
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.difficulty === 'Kolay' ? 'bg-green-100 text-green-700' :
                    item.difficulty === 'Orta' ? 'bg-yellow-100 text-yellow-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {item.difficulty}
                  </span>
                </td>
                <td className="p-3">{item.cpc}</td>
                <td className="p-3">
                  <TrendingUp className="text-green-500" size={16} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}