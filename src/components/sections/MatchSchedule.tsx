import { useMemo } from 'react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatusMessage } from '@/components/ui/StatusMessage';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useLanguage } from '@/i18n/LanguageContext';
import type { TranslationKey } from '@/i18n/translations';
import { fetchMatches } from '@/lib/football';
import { dayKey, formatDayLabel, formatKickoffTime } from '@/lib/format';
import type { Match, MatchStatus } from '@/lib/types';

const STATUS_TONE: Record<MatchStatus, 'live' | 'upcoming' | 'finished'> = {
  live: 'live',
  upcoming: 'upcoming',
  finished: 'finished',
};

const STATUS_LABEL_KEY: Record<MatchStatus, TranslationKey> = {
  live: 'statusLive',
  upcoming: 'statusUpcoming',
  finished: 'statusFinished',
};

interface MatchDayGroup {
  key: string;
  kickoffAt: string;
  matches: Match[];
}

function groupMatchesByDay(matches: Match[]): MatchDayGroup[] {
  const groups: MatchDayGroup[] = [];
  for (const match of matches) {
    const key = dayKey(match.kickoff_at);
    const current = groups[groups.length - 1];
    if (current && current.key === key) {
      current.matches.push(match);
    } else {
      groups.push({ key, kickoffAt: match.kickoff_at, matches: [match] });
    }
  }
  return groups;
}

export function MatchSchedule() {
  const { t, option } = useLanguage();
  const { data, failed, loading, retry } = useAsyncData(fetchMatches);
  const groups = useMemo(() => groupMatchesByDay(data ?? []), [data]);

  return (
    <section>
      <SectionHeading title={t('scheduleTitle')} subtitle={t('scheduleSubtitle')} />

      {loading && <StatusMessage kind="loading" />}
      {!loading && failed && <StatusMessage kind="error" message={t('loadError')} onRetry={retry} />}
      {!loading && !failed && data && data.length === 0 && (
        <StatusMessage kind="empty" message={t('emptyMatches')} />
      )}

      {!loading && !failed && groups.length > 0 && (
        <div className="space-y-10">
          {groups.map((group) => (
            <div key={group.key} className="space-y-4">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-emerald-400">
                {formatDayLabel(group.kickoffAt, option.locale)}
              </h3>
              <ul className="space-y-3">
                {group.matches.map((match) => (
                  <li key={match.id}>
                    <MatchRow match={match} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

interface MatchRowProps {
  match: Match;
}

function MatchRow({ match }: MatchRowProps) {
  const { t, localize, option } = useLanguage();
  const hasScore = match.home_score !== null && match.away_score !== null && match.status !== 'upcoming';
  const channelName = match.channel ? localize(match.channel.name_en, match.channel.name_ar) : t('noChannelLabel');

  return (
    <article
      className={`rounded-2xl border bg-zinc-900/70 p-5 transition-all duration-300 hover:border-white/20 hover:bg-zinc-900 sm:p-6 ${
        match.status === 'live' ? 'border-red-500/30' : 'border-white/10'
      }`}
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <p className="truncate text-sm font-medium text-zinc-400">
          {localize(match.competition_en, match.competition_ar)}
        </p>
        <StatusBadge tone={STATUS_TONE[match.status]} label={t(STATUS_LABEL_KEY[match.status])} />
      </div>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 sm:gap-6">
        <p className="text-end text-base font-semibold text-white sm:text-lg">
          {localize(match.home_team_en, match.home_team_ar)}
        </p>
        <div className="min-w-[5.5rem] text-center">
          {hasScore ? (
            <p className="text-2xl font-bold tabular-nums text-white sm:text-3xl">
              {match.home_score} - {match.away_score}
            </p>
          ) : (
            <p className="text-sm font-semibold tabular-nums text-zinc-300 sm:text-base">
              {formatKickoffTime(match.kickoff_at, option.locale)}
            </p>
          )}
        </div>
        <p className="text-base font-semibold text-white sm:text-lg">
          {localize(match.away_team_en, match.away_team_ar)}
        </p>
      </div>

      <p className="mt-4 text-sm text-zinc-500">
        {t('channelLabel')}: <span className="text-zinc-300">{channelName}</span>
      </p>
    </article>
  );
}
