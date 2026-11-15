import { IraqFlag } from '@/components/IraqFlag';
import { useLanguage } from '@/i18n/LanguageContext';
import { LANGUAGES } from '@/i18n/languages';

export function LanguageSwitcher() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      role="group"
      aria-label={t('languageLabel')}
      className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-zinc-900/80 p-1"
    >
      {LANGUAGES.map((option) => {
        const active = option.code === language;
        return (
          <button
            key={option.code}
            type="button"
            onClick={() => setLanguage(option.code)}
            aria-pressed={active}
            aria-label={option.nativeName}
            title={option.nativeName}
            className={`inline-flex h-8 items-center gap-1.5 rounded-full px-3 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
              active
                ? 'bg-emerald-500 text-zinc-950 shadow-sm shadow-emerald-500/30'
                : 'text-zinc-300 hover:bg-white/5 hover:text-white'
            }`}
          >
            {option.code === 'ar' && <IraqFlag className="h-3.5 w-5 rounded-[2px] shadow-sm" />}
            <span>{option.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
