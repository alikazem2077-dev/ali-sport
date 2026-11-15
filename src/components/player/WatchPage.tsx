import { useCallback } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ChannelBadge } from '@/components/ui/ChannelBadge';
import { StatusBadge } from '@/components/ui/StatusBadge';
import { StatusMessage } from '@/components/ui/StatusMessage';
import { VideoPlayer } from '@/components/player/VideoPlayer';
import { useAsyncData } from '@/hooks/useAsyncData';
import { useLanguage } from '@/i18n/LanguageContext';
import { fetchChannelBySlug } from '@/lib/football';
import { SECTION_PATHS } from '@/lib/routes';

interface WatchPageProps {
  slug: string;
}

export function WatchPage({ slug }: WatchPageProps) {
  const { t, localize, option } = useLanguage();
  const loadChannel = useCallback(() => fetchChannelBySlug(slug), [slug]);
  const { data: channel, failed, loading, retry } = useAsyncData(loadChannel);

  return (
    <section className="space-y-8">
      <a
        href={`#${SECTION_PATHS.live}`}
        className="inline-flex items-center gap-2 rounded-lg text-sm font-medium text-zinc-400 transition-colors duration-200 hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
      >
        <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
        {t('backToChannels')}
      </a>

      {loading && <StatusMessage kind="loading" />}
      {!loading && failed && <StatusMessage kind="error" message={t('loadError')} onRetry={retry} />}
      {!loading && !failed && channel === null && <StatusMessage kind="empty" message={t('channelNotFound')} />}

      {!loading && !failed && channel && (
        <>
          <VideoPlayer
            key={channel.id}
            streamUrl={channel.stream_url}
            title={localize(channel.name_en, channel.name_ar)}
          />
          <div className="flex flex-col gap-5 rounded-2xl border border-white/10 bg-zinc-900/70 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-5">
              <ChannelBadge number={channel.sort_order} logoUrl={channel.logo_url} size="lg" />
              <div className="space-y-1">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  {t('channelLabel')} {channel.sort_order.toLocaleString(option.locale)}
                </p>
                <h2 className="text-2xl font-bold leading-tight text-white">
                  {localize(channel.name_en, channel.name_ar)}
                </h2>
              </div>
            </div>
            <StatusBadge tone={channel.is_live ? 'live' : 'idle'} label={channel.is_live ? t('onAir') : t('offAir')} />
          </div>
        </>
      )}
    </section>
  );
}
