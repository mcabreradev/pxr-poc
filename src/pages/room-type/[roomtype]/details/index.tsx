'client-only';

import { useRouter } from 'next/router';

import useHydration from '@/hooks/use-hydration';

import Layout from '@/components/layout';

import DetailsComponent from '@/features/guest-details/details';

export default function Page() {
  const router = useRouter();
  const roomTypeId = router.query.id;

  const { isHydrated } = useHydration();
  if (!isHydrated) {
    return null;
  }

  return (
    <Layout>
      <DetailsComponent roomTypeId={roomTypeId as string} />
    </Layout>
  );
}
