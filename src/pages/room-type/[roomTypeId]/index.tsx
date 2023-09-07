import { useRouter } from 'next/router';

import Layout from '@/components/layout';
import Seo from '@/components/seo';

import RoomTypeComponent from '@/features/room-type/room-type';

export default function Page() {
  const router = useRouter();
  const roomTypeId = router.query.roomTypeId;
  return (
    <Layout>
      <Seo />
      <RoomTypeComponent roomTypeId={roomTypeId as string} />
    </Layout>
  );
}
