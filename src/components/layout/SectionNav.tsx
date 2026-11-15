import { CalendarDays, Clapperboard, Tv, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';
import type { TranslationKey } from '@/i18n/translations';

export type SectionId = 'live' | 'schedule' | 'highlights';

interface SectionDefinition {
  id: SectionId;
  labelKey: TranslationKey;
  icon: LucideIcon;
}

export const SECTIONS: SectionDefinition[] = [
  { id: 'live', labelKey: 'navLive', icon: Tv },
  { id: 'schedule', labelKey: 'navSchedule', icon: CalendarDays },
  { id: 'highlights', labelKey: 'navHighlights', icon: Clapperboard },
];

interface SectionNavProps {
  active: SectionId;
  onSelect: (section: SectionId) => void;
}

export function SectionNav({ active, onSelect }: SectionNavProps) {
  const { t } = useLanguage();

  return (
    <nav aria-label={t('appName')} className="-mx-4 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
      <ul className="flex gap-2">
        {SECTIONS.map(({ id, labelKey, icon: Icon }) => {
          const isActive = id === active;
          return (
            <li key={id}>
              <button
                type="button"
                onClick={() => onSelect(id)}
                aria-current={isActive ? 'page' : undefined}
                className={`group relative inline-flex items-center gap-2 whitespace-nowrap rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/40'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-100'
                }`}
              >
                <Icon
                  className={`h-4 w-4 transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-emerald-400' : ''}`}
                  aria-hidden="true"
                />
                <span>{t(labelKey)}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
