import useHydration from '@/hooks/use-hydration';

import Layout from '@/components/layout';

import PropertyPage from '@/features/property/property-page';

export default function HomePage() {
  const { notHydrated } = useHydration();

  if (notHydrated) {
    return null;
  }

  return (
    <Layout>
      <PropertyPage />
    </Layout>
  );
}
