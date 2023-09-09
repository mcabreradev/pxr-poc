import { useRouter } from 'next/router';

import Layout from '@/components/layout';

import RoomTypeComponent from '@/features/room-type/room-type';

export default function Page() {
  const router = useRouter();
  const roomTypeId = router.query.id;
  return (
    <Layout>
      <RoomTypeComponent roomTypeId={roomTypeId as string} />
    </Layout>
  );
}
