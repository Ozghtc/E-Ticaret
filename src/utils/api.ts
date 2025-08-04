// 🌐 API Utility Functions
// Environment-safe API çağrıları için utility fonksiyonlar

import { config } from '../config/environment';

// 🔧 API Configuration with fallback
const getApiConfig = () => {
  try {
    return config.api;
  } catch (error) {
    console.warn('Config loading failed, using fallbacks');
    return {
      url: '/api',
      timeout: 5000,
      retries: 3
    };
  }
};

const api = getApiConfig();

// 🛡️ Safe Fetch Wrapper
export const safeFetch = async (
  endpoint: string,
  options: RequestInit = {}
): Promise<Response> => {
  // ✅ Relative path kullanımı - otomatik current domain
  const url = endpoint.startsWith('/') 
    ? endpoint 
    : `${api.url}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;

  // ⏰ AbortController for timeout
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), api.timeout);

  const fetchOptions: RequestInit = {
    signal: controller.signal,
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, fetchOptions);
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return response;
  } catch (error) {
    clearTimeout(timeoutId);
    
    // Safe debug logging
    try {
      if (config.app.debug) {
        console.error('🔴 API Fetch Error:', {
          url,
          error: error instanceof Error ? error.message : error,
        });
      }
    } catch {
      console.error('🔴 API Fetch Error:', url);
    }
    throw error;
  }
};

// 📊 GET Request with Retry
export const apiGet = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  let lastError: Error | null = null;

  for (let attempt = 1; attempt <= api.retries; attempt++) {
    try {
      const response = await safeFetch(endpoint, {
        ...options,
        method: 'GET',
      });
      
      return await response.json();
    } catch (error) {
      lastError = error as Error;
      
      if (attempt < api.retries) {
        const delay = Math.pow(2, attempt) * 1000; // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
        
        try {
          if (config.app.debug) {
            console.warn(`🔄 API Retry ${attempt}/${api.retries} after ${delay}ms`);
          }
        } catch {
          console.warn(`🔄 API Retry ${attempt}/${api.retries}`);
        }
      }
    }
  }

  throw lastError;
};

// 📝 POST Request
export const apiPost = async <T>(
  endpoint: string,
  data: any,
  options: RequestInit = {}
): Promise<T> => {
  const response = await safeFetch(endpoint, {
    ...options,
    method: 'POST',
    body: JSON.stringify(data),
  });

  return await response.json();
};

// ✏️ PUT Request
export const apiPut = async <T>(
  endpoint: string,
  data: any,
  options: RequestInit = {}
): Promise<T> => {
  const response = await safeFetch(endpoint, {
    ...options,
    method: 'PUT',
    body: JSON.stringify(data),
  });

  return await response.json();
};

// 🗑️ DELETE Request
export const apiDelete = async <T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> => {
  const response = await safeFetch(endpoint, {
    ...options,
    method: 'DELETE',
  });

  return await response.json();
};

// 🔗 Build Full URL (for special cases)
export const buildApiUrl = (endpoint: string): string => {
  if (endpoint.startsWith('http')) {
    return endpoint; // Already full URL
  }
  
  return `${api.url}${endpoint.startsWith('/') ? '' : '/'}${endpoint}`;
};

// 📊 Health Check
export const healthCheck = async (): Promise<boolean> => {
  try {
    await safeFetch('/health', { method: 'GET' });
    return true;
  } catch {
    return false;
  }
};

export default {
  get: apiGet,
  post: apiPost,
  put: apiPut,
  delete: apiDelete,
  buildUrl: buildApiUrl,
  healthCheck,
}; 