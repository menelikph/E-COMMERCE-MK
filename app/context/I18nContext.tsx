"use client";

import { createContext, useState, useContext } from "react";
import { Locale, messages } from "@/app/i18n";

interface I18nContextType {
  locale: Locale;
  messages: Record<string, string>;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextType | null>(null);

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");

  return (
    <I18nContext.Provider
      value={{
        locale,
        messages: messages[locale],
        setLocale,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used inside I18nProvider");
  return ctx;
}
