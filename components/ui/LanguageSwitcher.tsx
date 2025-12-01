"use client";

import { Select, SelectItem } from "@heroui/react";
import { useI18n } from "@/app/context/I18nContext";
import { locales, getLocaleDisplayName } from "@/app/i18n";
import { Languages } from "lucide-react";

export default function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <Select
      className="w-32 mt-5 text-gray-900 "
      selectedKeys={[locale]}
      onChange={(e) => setLocale(e.target.value as "es" | "en")}
      startContent={<Languages className="w-4 h-4 text-gray-900 " />}
    >
      {locales.map((lang) => (
        <SelectItem key={lang} className="text-gray-900">{getLocaleDisplayName(lang)}</SelectItem>
      ))}
    </Select>
  );
}
