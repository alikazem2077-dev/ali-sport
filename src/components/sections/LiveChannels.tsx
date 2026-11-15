import { Play } from 'lucide-react';
import { ChannelBadge } from '@/components/ui/ChannelBadge';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StatusMessage } from '@/components/ui/StatusMessage';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useLanguage } from '@/i18n/LanguageContext';
import { fetchChannels } from '@/lib/football';
import { watchPath } from '@/lib/routes';
import type { Channel } from '@/lib/types';

export function LiveChannels() {
  const { t, localize, option } = useLanguage();
  const { data, failed, loading, retry } = useAsyncData(fetchChannels);

  return (
    <section>
      <SectionHeading title={t('liveChannelsTitle')} subtitle={t('liveChannelsSubtitle')} />

      {loading && <StatusMessage kind="loading" />}
      {!loading && failed && <StatusMessage kind="error" message={t('loadError')} onRetry={retry} />}
      {!loading && !failed && data && data.length === 0 && (
        <StatusMessage kind="empty" message={t('emptyChannels')} />
      )}

      {!loading && !failed && data && data.length > 0 && (
        <ul className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {data.map((channel) => (
            <li key={channel.id}>
              <ChannelCard
                channel={channel}
                name={localize(channel.name_en, channel.name_ar)}
                locale={option.locale}
              />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

interface ChannelCardProps {
  channel: Channel;
  name: string;
  locale: string;
}

function ChannelCard({ channel, name, locale }: ChannelCardProps) {
  const { t } = useLanguage();

  return (
    <a
      href={`#${watchPath(channel.slug)}`}
      aria-label={`${t('watchNow')}: ${name}`}
      className="group relative flex h-full flex-col gap-6 overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/70 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/40 hover:shadow-xl hover:shadow-emerald-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
    >
      <div className="flex items-start justify-between gap-4">
        <ChannelBadge number={channel.sort_order} logoUrl={channel.logo_url} />
        <StatusBadge tone={channel.is_live ? 'live' : 'idle'} label={channel.is_live ? t('onAir') : t('offAir')} />
      </div>
      <div className="space-y-1">
        <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
          {t('channelLabel')} {channel.sort_order.toLocaleString(locale)}
        </p>
        <h3 className="text-lg font-semibold leading-snug text-white">{name}</h3>
      </div>
      <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-emerald-300 transition-colors duration-200 group-hover:text-emerald-200">
        <Play className="h-4 w-4 fill-current" aria-hidden="true" />
        {t('watchNow')}
      </span>
    </a>
  );
}
