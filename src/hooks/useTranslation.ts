import { useState, useEffect } from 'react';
import enMessages from '../../messages/en.json';
import frMessages from '../../messages/fr.json';

export type Locale = 'en' | 'fr';

const messages = {
  en: enMessages,
  fr: frMessages,
};

export function useTranslation(initialLocale: Locale = 'fr') {
  const [locale, setLocale] = useState<Locale>(initialLocale);

  useEffect(() => {
    const stored = localStorage.getItem('locale') as Locale;
    if (stored && (stored === 'en' || stored === 'fr')) {
      setLocale(stored);
    }
  }, []);

  const changeLocale = (newLocale: Locale) => {
    setLocale(newLocale);
    localStorage.setItem('locale', newLocale);
  };

  const t = (key: string, params?: Record<string, string | number>): string => {
    const keys = key.split('.');
    let value: any = messages[locale];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    if (typeof value !== 'string') return key;
    
    if (params) {
      return Object.entries(params).reduce((acc, [key, val]) => {
        return acc.replace(`{${key}}`, String(val));
      }, value);
    }
    
    return value;
  };

  return { t, locale, changeLocale };
}
