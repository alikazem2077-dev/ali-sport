export type LanguageCode = 'ar' | 'en' | 'fr';

export interface LanguageOption {
  code: LanguageCode;
  shortLabel: string;
  nativeName: string;
  dir: 'rtl' | 'ltr';
  locale: string;
}

export const LANGUAGES: LanguageOption[] = [
  { code: 'ar', shortLabel: 'عربي', nativeName: 'العربية', dir: 'rtl', locale: 'ar-IQ' },
  { code: 'en', shortLabel: 'EN', nativeName: 'English', dir: 'ltr', locale: 'en-GB' },
  { code: 'fr', shortLabel: 'FR', nativeName: 'Français', dir: 'ltr', locale: 'fr-FR' },
];

export const DEFAULT_LANGUAGE: LanguageCode = 'ar';

export function getLanguageOption(code: LanguageCode): LanguageOption {
  return LANGUAGES.find((option) => option.code === code) ?? LANGUAGES[0];
}
