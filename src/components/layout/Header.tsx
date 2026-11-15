import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher';
import { SectionNav, type SectionId } from '@/components/layout/SectionNav';
import { useLanguage } from '@/i18n/LanguageContext';

interface HeaderProps {
  activeSection: SectionId;
  onSectionSelect: (section: SectionId) => void;
}

export function Header({ activeSection, onSectionSelect }: HeaderProps) {
  const { t } = useLanguage();

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/85 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <img
              src="/assets/images/1793667103213.jpg"
              alt={t('appName')}
              className="h-12 w-12 shrink-0 rounded-full object-cover ring-2 ring-emerald-500/50 shadow-lg shadow-emerald-500/20 sm:h-14 sm:w-14"
            />
            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold leading-tight text-white sm:text-xl">{t('appName')}</h1>
              <p className="hidden truncate text-xs text-zinc-400 md:block">{t('tagline')}</p>
            </div>
          </div>
          <LanguageSwitcher />
        </div>
        <div className="pb-3">
          <SectionNav active={activeSection} onSelect={onSectionSelect} />
        </div>
      </div>
    </header>
  );
}
