'use client';

import useHydration from '@/hooks/use-hydration';

import PropertyPage from '@/features/property/page';

export default function Page() {
  const { isHydrated } = useHydration();
  if (!isHydrated) {
    return null;
  }

  return (
    <>
      <PropertyPage />
    </>
  );
}
