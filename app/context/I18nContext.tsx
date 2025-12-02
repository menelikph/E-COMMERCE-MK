'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';

// Imports the translation files directly from the local directory.
// Assuming 'en' and 'es' JSON files contain the translation objects.
import en from '../i18n/translations/en.json';
import es from '../i18n/translations/es.json';

// --- Type Definitions ---

// Type for the language code.
type Locale = 'en' | 'es'; 

// Defines the structure for the translation object (key-value mapping).
// Using 'any' for now to easily handle nested structures from JSON.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Translation = Record<string, any>;

// Defines the shape of the i18n Context API.
interface I18nContextType {
  // Function to translate a key. Handles nested keys like 'section.key'.
  t: (key: string) => string;
  // The currently active language code.
  locale: Locale;
  // Function to change the current language.
  setLocale: (newLocale: Locale) => void;
}

// A map linking language codes to their respective imported JSON data.
const translations: Record<Locale, Translation> = {
  en,
  es,
};

// The main React Context object, initialized to undefined.
const I18nContext = createContext<I18nContextType | undefined>(undefined);

// --- Provider Component ---

interface I18nProviderProps {
  children: ReactNode;
}

/**
 * I18nProvider component wraps the application to provide language context.
 * It manages the current locale state and exposes the 't' function.
 */
export function I18nProvider({ children }: I18nProviderProps) {
  // State hook to manage the active language, defaulting to 'en'.
  const [locale, setLocale] = useState<Locale>('en');

  /**
   * Translates a given key by traversing the nested translation object.
   * Uses dot notation to look up nested values (e.g., 'nav.home').
   * @param key The translation key string.
   * @returns The translated string, or the key itself if the translation is not found.
   */
  const t = (key: string): string => {
    // Get the current translation object based on the active locale.
    const currentTranslations = translations[locale];

    // Navigate through the object using the dot notation segments.
    const translation = key.split('.').reduce((obj, part) => {
      // If the object or part is missing, stop and return the original key.
      return obj && obj[part] !== undefined ? obj[part] : key; 
    }, currentTranslations);

    // Ensure the result is a string before returning; otherwise, return the key.
    return typeof translation === 'string' ? translation : key;
  };

  // The context value exposed to consumers.
  const contextValue: I18nContextType = {
    t,
    locale,
    setLocale,
  };

  return (
    <I18nContext.Provider value={contextValue}>
      {children}
    </I18nContext.Provider>
  );
}

// --- Custom Hook ---

/**
 * Custom hook to easily consume the i18n context throughout the application.
 * @returns The i18n context object (t, locale, setLocale).
 * @throws An error if used outside of the I18nProvider.
 */
export function useI18n(): I18nContextType {
  const ctx = useContext(I18nContext);
  // Ensures the hook is only used within the provider tree.
  if (ctx === undefined) {
    throw new Error('useI18n must be used inside I18nProvider');
  }
  return ctx;
}