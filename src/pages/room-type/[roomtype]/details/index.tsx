'use client';

import { useRouter } from 'next/router';

import Layout from '@/components/layout';

import DetailsComponent from '@/features/guest-details/details';

export default function Page() {
  const router = useRouter();
  const roomTypeId = router.query.roomtype;

  return (
    <Layout>
      <DetailsComponent roomTypeId={roomTypeId as string} />
    </Layout>
  );
}
