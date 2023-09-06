import Layout from '@/components/layout';
import Seo from '@/components/seo';

import PropertyPage from '@/features/property/property-page';

export default function HomePage() {
  return (
    <Layout>
      <Seo
        templateTitle='Property'
        description='The best Ecomm of the world!'
      />
      <PropertyPage />
    </Layout>
  );
}
