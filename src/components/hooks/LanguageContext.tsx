import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { DEFAULT_LANGUAGE, getLanguageOption, LANGUAGES, type LanguageCode, type LanguageOption } from '@/i18n/languages';
import { translations, type TranslationKey } from '@/i18n/translations';

const STORAGE_KEY = 'ali-kazem-live-language';

interface LanguageContextValue {
  language: LanguageCode;
  option: LanguageOption;
  setLanguage: (code: LanguageCode) => void;
  t: (key: TranslationKey) => string;
  localize: (english: string, arabic: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

function readStoredLanguage(): LanguageCode {
  const stored = localStorage.getItem(STORAGE_KEY);
  return LANGUAGES.some((option) => option.code === stored) ? (stored as LanguageCode) : DEFAULT_LANGUAGE;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<LanguageCode>(readStoredLanguage);
  const option = getLanguageOption(language);

  useEffect(() => {
    document.documentElement.lang = option.code;
    document.documentElement.dir = option.dir;
    document.title = translations[language].appName;
  }, [language, option]);

  const setLanguage = useCallback((code: LanguageCode) => {
    localStorage.setItem(STORAGE_KEY, code);
    setLanguageState(code);
  }, []);

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      option,
      setLanguage,
      t: (key) => translations[language][key],
      localize: (english, arabic) => (language === 'ar' ? arabic : english),
    }),
    [language, option, setLanguage]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used inside LanguageProvider');
  return context;
}
