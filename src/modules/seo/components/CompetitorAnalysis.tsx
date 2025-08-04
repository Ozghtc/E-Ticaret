import React from 'react';
import { Users, ExternalLink, Star } from 'lucide-react';

export default function CompetitorAnalysis() {
  const competitors = [
    {
      name: 'Rakip Mağaza 1',
      domain: 'rakip1.com',
      seoScore: 85,
      keywords: 1250,
      backlinks: 3400,
      traffic: '125K/ay'
    },
    {
      name: 'Rakip Mağaza 2', 
      domain: 'rakip2.com',
      seoScore: 78,
      keywords: 980,
      backlinks: 2100,
      traffic: '89K/ay'
    },
    {
      name: 'Rakip Mağaza 3',
      domain: 'rakip3.com', 
      seoScore: 72,
      keywords: 750,
      backlinks: 1800,
      traffic: '67K/ay'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <Users className="mr-2" size={24} />
          Rakip Analizi
        </h2>
      </div>

      <div className="space-y-4">
        {competitors.map((competitor, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center">
                <h3 className="font-semibold text-gray-900">{competitor.name}</h3>
                <ExternalLink className="ml-2 text-gray-400" size={16} />
              </div>
              <div className="flex items-center">
                <Star className="text-yellow-400 mr-1" size={16} />
                <span className="font-bold text-gray-700">{competitor.seoScore}/100</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-600 mb-3">{competitor.domain}</p>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-500">Anahtar Kelime:</span>
                <div className="font-bold text-blue-600">{competitor.keywords}</div>
              </div>
              <div>
                <span className="text-gray-500">Backlink:</span>
                <div className="font-bold text-green-600">{competitor.backlinks}</div>
              </div>
              <div>
                <span className="text-gray-500">Trafik:</span>
                <div className="font-bold text-purple-600">{competitor.traffic}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}