"use client";

import { useState, useEffect } from 'react';
import { getTranslation } from '../lib/i18n';

export function useLanguage() {
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

  // Save language preference
  const changeLanguage = (newLocale) => {
    if (['en', 'vi'].includes(newLocale)) {
      setLocale(newLocale);
      localStorage.setItem('regent-locale', newLocale);
      
      // Update document language
      document.documentElement.lang = newLocale;
      
      // Trigger custom event for other components
      window.dispatchEvent(new CustomEvent('languageChanged', { detail: newLocale }));
    }
  };

  // Get translation helper
  const t = (key) => getTranslation(locale, key);

  // Get current language info
  const currentLanguage = {
    code: locale,
    name: locale === 'en' ? 'English' : 'Tiếng Việt',
    flag: locale === 'en' ? '🇺🇸' : '🇻🇳',
  };

  return {
    locale,
    changeLanguage,
    t,
    currentLanguage,
    isLoading,
    isEnglish: locale === 'en',
    isVietnamese: locale === 'vi',
  };
}
