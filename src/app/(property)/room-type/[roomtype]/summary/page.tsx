'use client';

import useHydration from '@/hooks/use-hydration';

import SummaryFeature from '@/features/summary/page';

export default function Page() {
  const { isHydrated } = useHydration();
  if (!isHydrated) return null;

  return <SummaryFeature />;
}
