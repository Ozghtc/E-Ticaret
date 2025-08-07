// SMS Paket Kartı - SMS paketleri için özelleştirilmiş kart
import React from 'react';
import { Edit, Trash2, Crown, MessageSquare, Clock, Zap } from 'lucide-react';
import { PaketCardProps } from '../types';

const SMSPaketCard: React.FC<PaketCardProps> = ({ paket, onEdit, onDelete }) => {
  const getColorClass = (renk: string) => {
    const colorMap: Record<string, string> = {
      blue: 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100',
      green: 'border-green-500 bg-gradient-to-br from-green-50 to-green-100',
      purple: 'border-purple-500 bg-gradient-to-br from-purple-50 to-purple-100',
      orange: 'border-orange-500 bg-gradient-to-br from-orange-50 to-orange-100',
      red: 'border-red-500 bg-gradient-to-br from-red-50 to-red-100',
      indigo: 'border-indigo-500 bg-gradient-to-br from-indigo-50 to-indigo-100'
    };
    return colorMap[renk] || colorMap.blue;
  };

  const getButtonColorClass = (renk: string) => {
    const buttonColorMap: Record<string, string> = {
      blue: 'bg-blue-500 hover:bg-blue-600',
      green: 'bg-green-500 hover:bg-green-600',
      purple: 'bg-purple-500 hover:bg-purple-600',
      orange: 'bg-orange-500 hover:bg-orange-600',
      red: 'bg-red-500 hover:bg-red-600',
      indigo: 'bg-indigo-500 hover:bg-indigo-600'
    };
    return buttonColorMap[renk] || buttonColorMap.blue;
  };

  const getSMSTypeIcon = (tip?: string) => {
    switch (tip) {
      case 'toplu':
        return <Zap className="w-4 h-4" />;
      case 'otomatik':
        return <Clock className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getSMSTypeText = (tip?: string) => {
    switch (tip) {
      case 'toplu':
        return 'Toplu SMS';
      case 'otomatik':
        return 'Otomatik SMS';
      default:
        return 'Standart SMS';
    }
  };

  const indirimYuzdesi = paket.eskiFiyat 
    ? Math.round(((paket.eskiFiyat - paket.fiyat) / paket.eskiFiyat) * 100)
    : 0;

  return (
    <div className={`relative rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border-2 ${getColorClass(paket.renk)} p-6`}>
      
      {/* Popüler Badge */}
      {paket.populer && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-4 py-1 rounded-full text-sm font-bold flex items-center space-x-1 shadow-lg">
            <Crown className="w-4 h-4" />
            <span>Popüler</span>
          </div>
        </div>
      )}

      {/* İndirim Badge */}
      {indirimYuzdesi > 0 && (
        <div className="absolute -top-2 -right-2">
          <div className="bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
            %{indirimYuzdesi} İndirim
          </div>
        </div>
      )}

      {/* Header */}
      <div className="text-center mb-6">
        <div className="flex items-center justify-center mb-2">
          <MessageSquare className="w-8 h-8 text-gray-600 mr-2" />
          <h3 className="text-2xl font-bold text-gray-800">{paket.adi}</h3>
        </div>

        {/* SMS Bilgileri */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <div className="flex items-center space-x-1 text-gray-600">
            {getSMSTypeIcon(paket.smsTipi)}
            <span className="text-sm font-medium">{getSMSTypeText(paket.smsTipi)}</span>
          </div>
          
          {paket.smsGeçerlilikGunu && (
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{paket.smsGeçerlilikGunu} gün</span>
            </div>
          )}
        </div>

        {/* SMS Miktarı */}
        {paket.smsMiktari && (
          <div className="bg-white bg-opacity-80 rounded-lg p-3 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-800">
                {paket.smsMiktari.toLocaleString()}
              </div>
              <div className="text-sm text-gray-600 font-medium">SMS Kredisi</div>
            </div>
          </div>
        )}

        {/* Fiyat */}
        <div className="mb-4">
          <div className="flex items-center justify-center space-x-2">
            {paket.eskiFiyat && (
              <span className="text-lg text-gray-500 line-through">
                {paket.eskiFiyat}₺
              </span>
            )}
            <span className="text-4xl font-bold text-gray-800">
              {paket.fiyat}₺
            </span>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            Tek Seferlik Ödeme
          </div>
        </div>

        {/* Kampanya */}
        {paket.kampanya && (
          <div className="bg-yellow-100 border border-yellow-300 rounded-lg p-2 mb-4">
            <p className="text-xs text-yellow-800 font-medium">{paket.kampanya}</p>
          </div>
        )}
      </div>

      {/* Özellikler */}
      <div className="space-y-3 mb-6">
        {paket.ozellikler.slice(0, 6).map((ozellik) => (
          <div key={ozellik.id} className="flex items-start space-x-2">
            <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs">✓</span>
            </div>
            <div className="flex-1">
              <span className="text-sm font-medium text-gray-800">
                {ozellik.baslik}
              </span>
              {ozellik.aciklama && (
                <p className="text-xs text-gray-600 mt-1">{ozellik.aciklama}</p>
              )}
            </div>
          </div>
        ))}
        
        {paket.ozellikler.length > 6 && (
          <div className="text-center">
            <span className="text-xs text-gray-500">
              +{paket.ozellikler.length - 6} özellik daha...
            </span>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-2">
        <button
          onClick={() => onEdit(paket)}
          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Edit className="w-4 h-4" />
          <span>Düzenle</span>
        </button>
        
        <button
          onClick={() => onDelete(paket.id)}
          className="flex-1 bg-red-100 hover:bg-red-200 text-red-700 px-4 py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
        >
          <Trash2 className="w-4 h-4" />
          <span>Sil</span>
        </button>
      </div>

      {/* Satın Al Butonu */}
      <button
        className={`w-full mt-3 ${getButtonColorClass(paket.renk)} text-white px-6 py-4 rounded-lg font-bold transition-colors shadow-lg hover:shadow-xl`}
      >
        SMS Paketini Satın Al
      </button>
    </div>
  );
};

export default SMSPaketCard;
