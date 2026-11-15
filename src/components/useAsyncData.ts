import { useCallback, useEffect, useState } from 'react';

interface AsyncDataState<T> {
  data: T | null;
  failed: boolean;
  loading: boolean;
}

export function useAsyncData<T>(loader: () => Promise<T>) {
  const [state, setState] = useState<AsyncDataState<T>>({ data: null, failed: false, loading: true });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setState((prev) => ({ ...prev, failed: false, loading: true }));
    loader()
      .then((data) => {
        if (!cancelled) setState({ data, failed: false, loading: false });
      })
      .catch(() => {
        if (!cancelled) setState({ data: null, failed: true, loading: false });
      });
    return () => {
      cancelled = true;
    };
  }, [loader, attempt]);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  return { ...state, retry };
}
