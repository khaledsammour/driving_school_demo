"use client";
import { createContext, useContext, useState } from "react";
import { IntlProvider } from "react-intl";

// Import translations
import en from "@/app/locales/en/translation.json";
import ar from "@/app/locales/ar/translation.json";

const messages = {
  en,
  ar,
};

// Create a context for language switching
export const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export default function ProviderLang({ children }) {
  // State to manage current locale
  const [locale, setLocale] = useState('en');

  // Function to switch languages
  const switchLanguage = (language) => {
    setLocale(language);
  };

  return (
    <LanguageContext.Provider value={{ switchLanguage }}>
      <IntlProvider locale={locale} messages={messages[locale]}>
        {children}
      </IntlProvider>
    </LanguageContext.Provider>
  );
}
