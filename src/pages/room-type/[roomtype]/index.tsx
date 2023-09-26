'use client';

import useHydration from '@/hooks/use-hydration';

import Layout from '@/components/layout';

import RoomTypeComponent from '@/features/room-type/room-type';

export default function Page() {
  const { isHydrated } = useHydration();

  if (!isHydrated) {
    return null;
  }

  return (
    <Layout>
      <RoomTypeComponent />
    </Layout>
  );
}
