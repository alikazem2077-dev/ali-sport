import { useEffect, useRef, useState } from 'react';
import Hls from 'hls.js';
import { RadioTower } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface VideoPlayerProps {
  streamUrl: string | null;
  title: string;
}

export function VideoPlayer({ streamUrl, title }: VideoPlayerProps) {
  const { t } = useLanguage();
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playbackFailed, setPlaybackFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !streamUrl) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.ERROR, (_event, data) => {
        if (data.fatal) setPlaybackFailed(true);
      });
      return () => hls.destroy();
    }

    if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
      return;
    }

    setPlaybackFailed(true);
  }, [streamUrl]);

  return (
    <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/50">
      {streamUrl ? (
        <>
          <video ref={videoRef} controls playsInline aria-label={title} className="h-full w-full bg-black" />
          {playbackFailed && <PlayerMessage message={t('playbackError')} />}
        </>
      ) : (
        <PlayerMessage message={t('streamNotConnected')} />
      )}
    </div>
  );
}

function PlayerMessage({ message }: { message: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-zinc-950/95 px-6 text-center">
      <RadioTower className="h-10 w-10 text-emerald-400" aria-hidden="true" />
      <p className="max-w-md text-base leading-relaxed text-zinc-300">{message}</p>
    </div>
  );
}
