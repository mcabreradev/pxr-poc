import useHydration from '@/hooks/use-hydration';

import Layout from '@/components/layout';

import DetailsComponent from '@/features/guest-details/details';

export default function Page() {
  const { isHydrated } = useHydration();

  if (!isHydrated) {
    return null;
  }
  return (
    <Layout>
      <DetailsComponent />
    </Layout>
  );
}
