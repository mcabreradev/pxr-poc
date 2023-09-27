import { useRouter } from 'next/router';

import useHydration from '@/hooks/use-hydration';

import Layout from '@/components/layout';

import RoomTypeComponent from '@/features/room-type/room-type';

export default function Page() {
  const router = useRouter();
  const roomTypeId = router.query.roomtype;
  const { isHydrated } = useHydration();

  if (!isHydrated || !roomTypeId) {
    return null;
  }

  return (
    <Layout>
      <RoomTypeComponent roomTypeId={roomTypeId as string} />
    </Layout>
  );
}
