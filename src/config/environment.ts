import { useTranslation } from "react-i18next";
// 🌍 Environment Configuration System
// Bu dosya tüm environment variable'ları yönetir ve validate eder

interface AppConfig {
  api: {
    url: string;
    timeout: number;
    retries: number;
  };
  app: {
    name: string;
    version: string;
    baseUrl: string;
    debug: boolean;
  };
  features: {
    analytics: boolean;
    chat: boolean;
    maintenance: boolean;
  };
  socket: {
    url: string;
  };
}

// 🔍 Environment Detection
const getEnvironment = (): 'development' | 'production' | 'unknown' => {
  const hostname = window.location.hostname;
  if (hostname.includes('netlify.app')) return 'production';
  if (hostname.includes('vercel.app')) return 'production';
  if (hostname === 'localhost') return 'development';
  return 'unknown';
};

// 🛡️ URL Validation (integrated into config)
const isProductionLocalhost = (url: string): boolean => {
  return import.meta.env.PROD && url.includes('localhost');
};

// 📋 Required Environment Variables (Optional for development)
const requiredEnvVars = ['VITE_API_URL', 'VITE_BASE_URL', 'VITE_APP_NAME'];

// ✅ Environment Variable Validation
const validateEnvironment = (): void => {
  const missingVars = requiredEnvVars.filter(varName => !import.meta.env[varName]);
  if (missingVars.length > 0) {
    console.warn('⚠️ Missing environment variables:', missingVars);
    console.warn('💡 Fallback values will be used');
    // Don't throw error, use fallback values instead
  }
};

// 🔧 Configuration Builder
const buildConfig = (): AppConfig => {
  // Environment validation
  validateEnvironment();
  const apiUrl = import.meta.env.VITE_API_URL || '/api';

  // Production'da localhost kontrolü
  if (isProductionLocalhost(apiUrl)) {
    console.error(t("common.production_ortamında_localhost_kullanılamaz"), apiUrl);
  }
  const config: AppConfig = {
    api: {
      url: apiUrl,
      timeout: parseInt(import.meta.env.VITE_TIMEOUT || '5000'),
      retries: parseInt(import.meta.env.VITE_RETRIES || '3')
    },
    app: {
      name: import.meta.env.VITE_APP_NAME || 'E-Ticaret Platform',
      version: import.meta.env.VITE_APP_VERSION || '1.0.0',
      baseUrl: import.meta.env.VITE_BASE_URL || window.location.origin,
      debug: import.meta.env.VITE_DEBUG === 'true' || import.meta.env.DEV
    },
    features: {
      analytics: import.meta.env.VITE_ENABLE_ANALYTICS === 'true',
      chat: import.meta.env.VITE_ENABLE_CHAT === 'true',
      maintenance: import.meta.env.VITE_MAINTENANCE_MODE === 'true'
    },
    socket: {
      url: import.meta.env.VITE_SOCKET_URL || '/ws'
    }
  };
  return config;
};

// 🚀 Export Configuration
export const ENV = getEnvironment();
export const config = buildConfig();

// 📊 Development Logging
if (config.app.debug) {
  console.log('🌍 Environment:', ENV);
  console.log('⚙️ Configuration:', config);
}

// 🔒 Production Safety Check
if (ENV === 'production' && config.app.debug) {
  console.warn(t("common.debug_mode_production_ortamında_aktif"));
}
export default config;