import { lazy, Suspense, type ComponentType } from 'react';
import { Header } from '@/components/layout/Header';
import type { SectionId } from '@/components/layout/SectionNav';
import { LiveChannels } from '@/components/sections/LiveChannels';
import { MatchHighlights } from '@/components/sections/MatchHighlights';
import { MatchSchedule } from '@/components/sections/MatchSchedule';
import { StatusMessage } from '@/components/ui/StatusMessage';
import { LanguageProvider } from '@/i18n/LanguageContext';
import { navigateTo, useRoute } from '@/hooks/useRoute';
import { SECTION_PATHS } from '@/lib/routes';

const WatchPage = lazy(() =>
  import('@/components/player/WatchPage').then((module) => ({ default: module.WatchPage }))
);

const SECTION_VIEWS: Record<SectionId, ComponentType> = {
  live: LiveChannels,
  schedule: MatchSchedule,
  highlights: MatchHighlights,
};

function AppShell() {
  const route = useRoute();
  const activeSection: SectionId = route.name === 'section' ? route.section : 'live';
  const ActiveView = SECTION_VIEWS[activeSection];
  const viewKey = route.name === 'watch' ? `watch-${route.slug}` : route.section;

  return (
    <div className="min-h-screen bg-zinc-950 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.14),transparent_55%)] font-sans text-zinc-100 antialiased">
      <Header
        activeSection={activeSection}
        onSectionSelect={(section) => navigateTo(SECTION_PATHS[section])}
      />
      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
        <div key={viewKey} className="animate-fade-in">
          {route.name === 'watch' ? (
            <Suspense fallback={<StatusMessage kind="loading" />}>
              <WatchPage slug={route.slug} />
            </Suspense>
          ) : (
            <ActiveView />
          )}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <AppShell />
    </LanguageProvider>
  );
}

export default App;
