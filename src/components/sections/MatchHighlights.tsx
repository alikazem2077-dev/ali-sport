import { Clock3 } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatusMessage } from '@/components/ui/StatusMessage';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useLanguage } from '@/i18n/LanguageContext';
import { fetchHighlights } from '@/lib/football';
import { formatDuration, formatPublishedDate } from '@/lib/format';
import type { Highlight } from '@/lib/types';

export function MatchHighlights() {
  const { t, option } = useLanguage();
  const { data, failed, loading, retry } = useAsyncData(fetchHighlights);

  return (
    <section>
      <SectionHeading title={t('highlightsTitle')} subtitle={t('highlightsSubtitle')} />

      {loading && <StatusMessage kind="loading" />}
      {!loading && failed && <StatusMessage kind="error" message={t('loadError')} onRetry={retry} />}
      {!loading && !failed && data && data.length === 0 && (
        <StatusMessage kind="empty" message={t('emptyHighlights')} />
      )}

      {!loading && !failed && data && data.length > 0 && (
        <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {data.map((highlight) => (
            <li key={highlight.id}>
              <HighlightCard highlight={highlight} locale={option.locale} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

interface HighlightCardProps {
  highlight: Highlight;
  locale: string;
}

function HighlightCard({ highlight, locale }: HighlightCardProps) {
  const { localize } = useLanguage();
  const title = localize(highlight.title_en, highlight.title_ar);
  const competition = localize(highlight.competition_en, highlight.competition_ar);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10">
      <div className="relative aspect-video overflow-hidden bg-zinc-800">
        <img
          src={highlight.thumbnail_url}
          alt={title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
        <span className="absolute bottom-3 end-3 inline-flex items-center gap-1.5 rounded-lg bg-zinc-950/85 px-2.5 py-1 text-xs font-semibold tabular-nums text-white backdrop-blur">
          <Clock3 className="h-3.5 w-3.5 text-emerald-400" aria-hidden="true" />
          {formatDuration(highlight.duration_seconds, locale)}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <p className="text-xs font-semibold uppercase tracking-wider text-emerald-400">{competition}</p>
        <h3 className="text-base font-semibold leading-snug text-white">{title}</h3>
        <p className="mt-auto pt-3 text-xs text-zinc-500">{formatPublishedDate(highlight.published_at, locale)}</p>
      </div>
    </article>
  );
}
