import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Palette, Check, Eye } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { THEMES, getAvailableThemes } from '../../config/themes';

function TemaSistemi() {
  const navigate = useNavigate();
  const { selectedTheme, setSelectedTheme } = useTheme();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('adminLoggedIn');
    if (!isLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleThemeSelect = (themeId: string) => {
    setSelectedTheme(themeId);
    alert(`${THEMES.find(t => t.id === themeId)?.name} teması seçildi!`);
  };

  const availableThemes = getAvailableThemes();

  // Group themes by category
  const groupedThemes = availableThemes.reduce((acc, theme) => {
    const category = theme.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(theme);
    return acc;
  }, {} as Record<string, typeof availableThemes>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link to="/admin" className="flex items-center text-white hover:text-pink-200 mr-6">
                <ArrowLeft size={20} className="mr-2" />
                Geri Dön
              </Link>
              <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
                <span className="font-bold text-white">Altıntassoft</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="bg-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Palette className="w-10 h-10 text-pink-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Tema Seçimi
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Mağazanız için uygun temayı seçin
          </p>
          <p className="text-sm text-gray-500">
            Aktif Tema: <span className="font-medium text-pink-600">{THEMES.find(t => t.id === selectedTheme)?.name}</span>
          </p>
        </div>

        {/* Grouped Themes */}
        <div className="space-y-8 mb-8">
          {Object.entries(groupedThemes).map(([category, themes]) => (
            <div key={category}>
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <span className="mr-2">{themes[0].emoji}</span>
                {category}
                <span className="ml-2 text-sm font-normal text-gray-500">({themes.length} tema)</span>
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {themes.map((theme) => (
                  <div key={theme.id} className={`bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    selectedTheme === theme.id ? 'ring-2 ring-pink-500' : ''
                  }`}>
                    {/* Theme Preview */}
                    <div className="relative h-32 overflow-hidden">
                      <img 
                        src={theme.preview} 
                        alt={theme.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Selected Badge */}
                      {selectedTheme === theme.id && (
                        <div className="absolute top-2 right-2">
                          <span className="bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                            ✓ Seçili
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Theme Info */}
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{theme.name}</h3>
                      <p className="text-gray-600 text-sm mb-3">{theme.description}</p>
                      
                      {/* Features */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-1">
                          {theme.features.slice(0, 3).map((feature, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      {/* Action Buttons */}
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleThemeSelect(theme.id)}
                          className={`flex-1 py-2 px-4 rounded-lg transition-colors text-sm font-medium ${
                            selectedTheme === theme.id 
                              ? 'bg-green-600 text-white' 
                              : 'bg-pink-600 text-white hover:bg-pink-700'
                          }`}
                        >
                          {selectedTheme === theme.id ? '✓ Seçili' : 'Seç'}
                        </button>
                        <button 
                          onClick={() => {
                            // Set theme and navigate to unified demo
                            setSelectedTheme(theme.id);
                            navigate('/unified-demo');
                          }}
                          className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm"
                        >
                          <Eye size={14} className="inline mr-1" />
                          Demo
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Theme Selector */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Hızlı Tema Değiştir</h3>
          <div className="flex flex-wrap gap-2">
            {availableThemes.map((theme) => (
              <button
                key={theme.id}
                onClick={() => handleThemeSelect(theme.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedTheme === theme.id
                    ? 'bg-pink-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {theme.emoji} {theme.name}
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="bg-pink-50 border border-pink-200 rounded-lg p-6 text-center">
          <h3 className="font-semibold text-pink-800 mb-2">
            ✅ Tek Kaynak Tema Sistemi Aktif
          </h3>
          <p className="text-pink-700 text-sm">
            Tüm tema ayarları <code>src/config/themes.ts</code> dosyasından yönetiliyor.
          </p>
        </div>
      </div>
    </div>
  );
}

export default TemaSistemi;