import React from 'react';
import { FileText, Download, Calendar, TrendingUp } from 'lucide-react';

export default function SeoReports() {
  const reports = [
    {
      title: 'Aylık SEO Raporu',
      date: '2025-01-15',
      type: 'PDF',
      size: '2.4 MB',
      status: 'Hazır'
    },
    {
      title: 'Anahtar Kelime Performansı',
      date: '2025-01-10', 
      type: 'Excel',
      size: '1.8 MB',
      status: 'Hazır'
    },
    {
      title: 'Rakip Analiz Raporu',
      date: '2025-01-05',
      type: 'PDF', 
      size: '3.1 MB',
      status: 'Hazır'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900 flex items-center">
          <FileText className="mr-2" size={24} />
          SEO Raporları
        </h2>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
          <Calendar className="mr-2" size={16} />
          Yeni Rapor Oluştur
        </button>
      </div>

      <div className="space-y-4">
        {reports.map((report, index) => (
          <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <FileText className="text-blue-600" size={20} />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{report.title}</h3>
                <p className="text-sm text-gray-600">
                  {report.date} • {report.type} • {report.size}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                {report.status}
              </span>
              <button className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg transition-colors">
                <Download size={16} className="text-gray-600" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* SEO Trend Grafik Placeholder */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h3 className="font-semibold text-gray-900 mb-4 flex items-center">
          <TrendingUp className="mr-2" size={20} />
          SEO Performans Trendi
        </h3>
        <div className="h-32 bg-white rounded border border-gray-200 flex items-center justify-center">
          <p className="text-gray-500">Grafik burada gösterilecek</p>
        </div>
      </div>
    </div>
  );
}