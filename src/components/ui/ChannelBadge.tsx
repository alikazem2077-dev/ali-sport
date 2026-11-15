const BANNER_URL = '/assets/images/1793666826046.jpg';
const BADGE_COUNT = 10;

interface ChannelBadgeProps {
  number: number;
  logoUrl: string | null;
  size?: 'md' | 'lg';
}

export function ChannelBadge({ number, logoUrl, size = 'md' }: ChannelBadgeProps) {
  const step = Math.min(Math.max(number - 1, 0), BADGE_COUNT - 1) / (BADGE_COUNT - 1);
  const backgroundStyle = logoUrl
    ? { backgroundImage: `url(${logoUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : { backgroundImage: `url(${BANNER_URL})`, backgroundSize: 'auto 420%', backgroundPosition: `${step * 100}% 50%` };

  return (
    <span
      aria-hidden="true"
      className={`relative block shrink-0 overflow-hidden rounded-xl bg-zinc-950 ring-1 ring-emerald-500/40 shadow-lg shadow-black/40 ${
        size === 'lg' ? 'h-24 w-44' : 'h-16 w-28'
      }`}
      style={backgroundStyle}
    >
      <span className="absolute bottom-1.5 end-1.5 flex h-6 min-w-6 items-center justify-center rounded-full bg-zinc-950/90 px-1.5 text-[11px] font-bold tabular-nums text-emerald-300 ring-1 ring-emerald-500/60">
        {number}
      </span>
    </span>
  );
}
