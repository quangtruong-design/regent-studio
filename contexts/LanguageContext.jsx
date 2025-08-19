"use client";

import { createContext, useContext, useState, useEffect } from 'react';
import { getTranslation } from '../lib/i18n';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [locale, setLocale] = useState('en');
  const [isLoading, setIsLoading] = useState(true);

  // Initialize language from localStorage or default
  useEffect(() => {
    const savedLocale = localStorage.getItem('regent-locale');
    if (savedLocale && ['en', 'vi'].includes(savedLocale)) {
      setLocale(savedLocale);
    }
    setIsLoading(false);
  }, []);

  // Log locale changes
  useEffect(() => {
    console.log('🔍 Language Context: Locale changed to:', locale);
  }, [locale]);

  // Save language preference
  const changeLanguage = (newLocale) => {
    if (['en', 'vi'].includes(newLocale)) {
      console.log('Changing language from', locale, 'to', newLocale);
      
      setLocale(newLocale);
      localStorage.setItem('regent-locale', newLocale);
      
      // Update document language
      document.documentElement.lang = newLocale;
      
      console.log('Language changed successfully to:', newLocale);
    }
  };

  // Get translation helper
  const t = (key) => {
    const translation = getTranslation(locale, key);
    // Only log in development
    if (process.env.NODE_ENV === 'development') {
      console.log(`Translation [${locale}]: ${key} = ${translation}`);
    }
    return translation;
  };

  // Get current language info
  const currentLanguage = {
    code: locale,
    name: locale === 'en' ? 'English' : 'Tiếng Việt',
    flag: locale === 'en' ? '🇺🇸' : '🇻🇳',
  };

  const value = {
    locale,
    changeLanguage,
    t,
    currentLanguage,
    isLoading,
    isEnglish: locale === 'en',
    isVietnamese: locale === 'vi',
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
