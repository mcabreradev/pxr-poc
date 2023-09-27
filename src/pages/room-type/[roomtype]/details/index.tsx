'use client';

import { useRouter } from 'next/router';

import Layout from '@/components/layout';

import DetailsComponent from '@/features/guest-details/details';

export default function Page() {
  const router = useRouter();
  const { show, roomtype } = router.query;

  return (
    <Layout>
      <DetailsComponent roomTypeId={roomtype as string} show={show as string} />
    </Layout>
  );
}
