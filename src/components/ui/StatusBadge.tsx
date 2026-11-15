interface StatusBadgeProps {
  tone: 'live' | 'upcoming' | 'finished' | 'idle';
  label: string;
}

const TONE_CLASSES: Record<StatusBadgeProps['tone'], string> = {
  live: 'bg-red-500/15 text-red-300 ring-red-500/40',
  upcoming: 'bg-amber-500/15 text-amber-300 ring-amber-500/40',
  finished: 'bg-zinc-700/50 text-zinc-200 ring-zinc-500/40',
  idle: 'bg-zinc-800 text-zinc-400 ring-zinc-700',
};

export function StatusBadge({ tone, label }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide ring-1 ring-inset ${TONE_CLASSES[tone]}`}
    >
      {tone === 'live' && (
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
        </span>
      )}
      {label}
    </span>
  );
}
