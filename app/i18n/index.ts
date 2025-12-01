import en from "./translations/en.json";
import es from "./translations/es.json";

export const locales = ["en", "es"] as const;
export type Locale = (typeof locales)[number];

export const messages = {
  en,
  es,
};

export function getLocaleDisplayName(locale: Locale) {
  return locale === "en" ? "English" : "Español";
}
