// Paket Tanımlama Modülü - Paket Kart Bileşeni
import React from 'react';
import { Edit, Trash2, Star, CheckCircle } from 'lucide-react';
import { PaketCardProps } from '../types';

const PaketCard: React.FC<PaketCardProps> = ({ paket, onEdit, onDelete }) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-600 border-blue-200',
    green: 'from-green-500 to-green-600 border-green-200',
    purple: 'from-purple-500 to-purple-600 border-purple-200',
    orange: 'from-orange-500 to-orange-600 border-orange-200',
    red: 'from-red-500 to-red-600 border-red-200',
    indigo: 'from-indigo-500 to-indigo-600 border-indigo-200'
  };

  const borderColor = colorClasses[paket.renk as keyof typeof colorClasses] || colorClasses.blue;
  const indirimYuzdesi = paket.eskiFiyat ? Math.round((1 - paket.fiyat / paket.eskiFiyat) * 100) : 0;

  return (
    <div 
      className={`relative bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-2 ${borderColor.split(' ')[2]} overflow-hidden`}
    >
      {/* Popüler Badge */}
      {paket.populer && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-gradient-to-r from-orange-400 to-orange-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
            <div className="flex items-center space-x-1">
              <Star size={14} fill="white" />
              <span>Popüler</span>
            </div>
          </div>
        </div>
      )}

      {/* Kampanya Metni */}
      {paket.kampanya && (
        <div className="bg-gradient-to-r from-emerald-50 to-blue-50 px-4 py-3 text-center">
          <p className="text-sm font-semibold text-emerald-700">{paket.kampanya}</p>
        </div>
      )}

      <div className="p-10">
        {/* Paket Başlığı */}
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">{paket.adi}</h3>
          
          {/* Fiyat Alanı */}
          <div className="space-y-2">
            {/* İndirim Yüzdesi */}
            {indirimYuzdesi > 0 && (
              <div className="inline-block bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                %{indirimYuzdesi} İndirim
              </div>
            )}
            
            <div className="flex items-center justify-center space-x-2">
              {paket.fiyat === 0 ? (
                <div className="text-2xl font-bold text-purple-600 bg-purple-100 px-4 py-2 rounded-lg">
                  Fiyat Teklifi Al
                </div>
              ) : (
                <>
                  <div className="text-4xl font-bold text-gray-900">₺{paket.fiyat.toLocaleString()}</div>
                  <div className="text-gray-500">
                    <div className="text-sm">/{paket.donem}</div>
                    <div className="text-xs">+KDV</div>
                  </div>
                </>
              )}
            </div>
            
            {/* Eski Fiyat */}
            {paket.eskiFiyat && (
              <div className="text-center">
                <span className="text-lg text-gray-400 line-through">₺{paket.eskiFiyat.toLocaleString()}</span>
                <div className="text-xs text-gray-500 mt-1">Yıllık alımlarda daha avantajlı</div>
              </div>
            )}

            {/* SMS Miktarı - Sadece SMS paketleri için */}
            {paket.kategori === 'sms' && paket.smsMiktari && (
              <div className="text-center mt-4">
                <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-lg font-semibold">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">📱</span>
                    <span className="text-lg font-bold">{paket.smsMiktari.toLocaleString()} SMS</span>
                  </div>
                  <div className="text-xs text-green-600 mt-1">Aylık gönderim hakkı</div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  SMS başına: ~₺{(paket.fiyat / paket.smsMiktari).toFixed(3)}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Özellikler */}
        <div className="space-y-4 mb-8">
          {paket.ozellikler.map((ozellik) => (
            <div key={ozellik.id} className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 leading-relaxed">{ozellik.baslik}</p>
                {ozellik.aciklama && (
                  <p className="text-xs text-gray-500 mt-1">{ozellik.aciklama}</p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className={`w-full bg-gradient-to-r ${borderColor.split(' ')[0]} ${borderColor.split(' ')[1]} text-white px-6 py-4 rounded-xl font-semibold text-lg hover:shadow-lg transition-all transform hover:scale-105`}>
            Ücretsiz Dene
          </button>
          
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(paket)}
              className="flex-1 bg-gray-50 hover:bg-gray-100 text-gray-700 px-4 py-3 rounded-lg flex items-center justify-center space-x-2 transition-all hover:shadow-md font-medium"
            >
              <Edit size={18} />
              <span>Düzenle</span>
            </button>
            <button
              onClick={() => onDelete(paket.id)}
              className="bg-red-50 hover:bg-red-100 text-red-700 px-4 py-3 rounded-lg transition-all hover:shadow-md"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Gradient Bottom Border */}
      <div className={`h-2 bg-gradient-to-r ${borderColor.split(' ')[0]} ${borderColor.split(' ')[1]}`}></div>
    </div>
  );
};

export default PaketCard;