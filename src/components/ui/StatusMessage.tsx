import { Loader2, RotateCw } from 'lucide-react';
import { useLanguage } from '@/i18n/LanguageContext';

interface StatusMessageProps {
  kind: 'loading' | 'error' | 'empty';
  message?: string;
  onRetry?: () => void;
}

export function StatusMessage({ kind, message, onRetry }: StatusMessageProps) {
  const { t } = useLanguage();

  if (kind === 'loading') {
    return (
      <div role="status" className="flex items-center justify-center gap-3 py-16 text-zinc-400">
        <Loader2 className="h-5 w-5 animate-spin text-emerald-400" aria-hidden="true" />
        <span>{t('loading')}</span>
      </div>
    );
  }

  return (
    <div
      role={kind === 'error' ? 'alert' : 'status'}
      className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-white/10 bg-zinc-900/50 px-6 py-16 text-center"
    >
      <p className="text-zinc-300">{message}</p>
      {kind === 'error' && onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-semibold text-zinc-950 transition-colors duration-200 hover:bg-emerald-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
        >
          <RotateCw className="h-4 w-4" aria-hidden="true" />
          {t('retry')}
        </button>
      )}
    </div>
  );
}
