import { useRouter } from 'next/router';

import useHydration from '@/hooks/use-hydration';

import Layout from '@/components/layout';

import DetailsComponent from '@/features/guest-details/details';

export default function Page() {
  const router = useRouter();
  const roomTypeId = router.query.id;

  const { notHydrated } = useHydration();

  if (notHydrated || !roomTypeId) {
    return null;
  }

  return (
    <Layout>
      <DetailsComponent roomTypeId={roomTypeId as string} />
    </Layout>
  );
}
