// 🧪 Environment Test Component
// Bu bileşen environment sisteminin çalıştığını gösterir ve test eder

import React from 'react';
import { config, ENV } from '../config/environment';
import { Settings, Globe, Zap, Shield, CheckCircle, XCircle } from 'lucide-react';
import { useTranslation } from "react-i18next";
const EnvironmentTest: React.FC = () => {
  const {
    t
  } = useTranslation();
  // 🔍 Safe Config Access
  const safeConfig = React.useMemo(() => {
    try {
      return config;
    } catch (error) {
      console.warn('Config loading error, using defaults');
      return {
        api: {
          url: '/api',
          timeout: 5000,
          retries: 3
        },
        app: {
          name: 'E-Ticaret Platform',
          version: '1.0.0',
          baseUrl: '',
          debug: true
        },
        features: {
          analytics: false,
          chat: false,
          maintenance: false
        },
        socket: {
          url: '/ws'
        }
      };
    }
  }, []);
  const safeEnv = React.useMemo(() => {
    try {
      return ENV;
    } catch {
      return 'development';
    }
  }, []);

  // 🔍 Environment Checks
  const checks = [{
    label: 'Environment Detection',
    value: safeEnv,
    status: safeEnv !== 'unknown',
    icon: Globe
  }, {
    label: 'API URL',
    value: safeConfig.api.url,
    status: !!safeConfig.api.url && !safeConfig.api.url.includes('undefined'),
    icon: Zap
  }, {
    label: 'App Name',
    value: safeConfig.app.name,
    status: !!safeConfig.app.name,
    icon: Settings
  }, {
    label: 'Debug Mode',
    value: safeConfig.app.debug ? 'Enabled' : 'Disabled',
    status: true,
    icon: Shield
  }];
  const allPassed = checks.every(check => check.status);
  return <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Settings className="mr-3 text-blue-600" size={28} />
                Environment Configuration Test
              </h1>
              <p className="text-gray-600 mt-2">{t("common.localhost_koruma_sistemi_ve_environment_variables_test_paneli")}</p>
            </div>
            <div className={`px-4 py-2 rounded-full ${allPassed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
              {allPassed ? '✅ All Checks Passed' : '❌ Issues Found'}
            </div>
          </div>
        </div>

        {/* Environment Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {checks.map((check, index) => {
          const IconComponent = check.icon;
          return <div key={index} className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-center">
                    <IconComponent className="text-blue-600 mr-3" size={24} />
                    <div>
                      <h3 className="font-semibold text-gray-900">{check.label}</h3>
                      <p className="text-gray-600 text-sm mt-1">{check.value}</p>
                    </div>
                  </div>
                  <div className="ml-4">
                    {check.status ? <CheckCircle className="text-green-500" size={24} /> : <XCircle className="text-red-500" size={24} />}
                  </div>
                </div>
              </div>;
        })}
        </div>

        {/* Detailed Configuration */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🔧 Detailed Configuration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* API Config */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Zap className="mr-2 text-orange-500" size={20} />
                API Configuration
              </h3>
              <div className="space-y-2 text-sm">
                                 <div className="flex justify-between">
                   <span className="text-gray-600">URL:</span>
                   <span className="font-mono text-blue-600">{safeConfig.api.url}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-gray-600">Timeout:</span>
                   <span className="font-mono">{safeConfig.api.timeout}ms</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-gray-600">Retries:</span>
                   <span className="font-mono">{safeConfig.api.retries}</span>
                 </div>
              </div>
            </div>

            {/* App Config */}
            <div>
              <h3 className="font-semibold text-gray-800 mb-3 flex items-center">
                <Settings className="mr-2 text-blue-500" size={20} />
                App Configuration
              </h3>
              <div className="space-y-2 text-sm">
                                 <div className="flex justify-between">
                   <span className="text-gray-600">Name:</span>
                   <span className="font-mono">{safeConfig.app.name}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-gray-600">Version:</span>
                   <span className="font-mono">{safeConfig.app.version}</span>
                 </div>
                 <div className="flex justify-between">
                   <span className="text-gray-600">Debug:</span>
                   <span className={`font-mono ${safeConfig.app.debug ? 'text-orange-600' : 'text-green-600'}`}>
                     {safeConfig.app.debug ? 'ON' : 'OFF'}
                   </span>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Status */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🎯 Feature Flags
          </h2>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
             {Object.entries(safeConfig.features).map(([key, value]) => <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="capitalize text-gray-700">{key}</span>
                <span className={`px-2 py-1 rounded text-xs font-semibold ${value ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                  {value ? 'ON' : 'OFF'}
                </span>
              </div>)}
          </div>
        </div>

        {/* Environment Info */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            🌍 Environment Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Current Environment</h3>
                             <div className={`inline-flex px-3 py-1 rounded-full text-sm font-semibold ${safeEnv === 'development' ? 'bg-orange-100 text-orange-800' : safeEnv === 'production' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                 {safeEnv.toUpperCase()}
               </div>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-3">Location</h3>
              <div className="text-sm text-gray-600 font-mono">
                {window.location.hostname}:{window.location.port || '80'}
              </div>
            </div>
          </div>
        </div>

                 {/* Safety Notice */}
         {safeEnv === 'development' && <div className="mt-6 bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start">
              <Shield className="text-orange-600 mr-3 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-orange-800">{t("common.localhost_koruması_aktif")}</h3>
                <p className="text-orange-700 text-sm mt-1">{t("common.bu_sistem_localhost_bağlantılarını_kod_içine_gömmez_netlify_a_geçiş_sadece_environment_variables_ile_yapılabilir")}</p>
              </div>
            </div>
          </div>}

                 {safeEnv === 'production' && safeConfig.app.debug && <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <XCircle className="text-red-600 mr-3 mt-1" size={20} />
              <div>
                <h3 className="font-semibold text-red-800">{t("common.güvenlik_uyarısı")}</h3>
                <p className="text-red-700 text-sm mt-1">{t("common.production_ortamında_debug_mode_aktif_bu_güvenlik_riski_oluşturabilir")}</p>
              </div>
            </div>
          </div>}
      </div>
    </div>;
};
export default EnvironmentTest;