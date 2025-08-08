import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Bell, Calendar } from 'lucide-react';
import { getCurrentDate } from '../utils/layoutUtils';
import LanguageCurrencySelector from '../../../components/LanguageCurrencySelector';
import { useTranslation } from "react-i18next";
const AdminHeader: React.FC = () => {
  const {
    t
  } = useTranslation();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    navigate('/');
  };
  return <header className="bg-blue-600 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <div className="bg-white bg-opacity-20 px-4 py-2 rounded-full">
              <span className="font-bold text-white">{t("common.altıntassoft")}</span>
            </div>
          </div>

          {/* Right side - User info and actions */}
          <div className="flex items-center space-x-4">
            <LanguageCurrencySelector />
            
            <div className="bg-blue-500 px-3 py-1 rounded-full text-sm">
              <Calendar className="inline w-4 h-4 mr-1" />
              {getCurrentDate()}
            </div>
            
            <button className="p-2 hover:bg-blue-500 rounded-full transition-colors">
              <Bell size={20} />
            </button>

            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="font-medium">{t("common.özgür_altintaş")}</p>
                <p className="text-blue-200 text-sm">Admin</p>
              </div>
              <button onClick={handleLogout} className="p-2 hover:bg-blue-500 rounded-full transition-colors">
                <LogOut size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>;
};
export default AdminHeader;