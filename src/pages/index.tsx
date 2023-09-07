import { useTranslation } from 'react-i18next';

import useFetchProperty from '@/hooks/use-property.query';

import Layout from '@/components/layout';
import Seo from '@/components/seo';

import PropertyPage from '@/features/property/property-page';

export default function HomePage() {
  const { data: property } = useFetchProperty();
  const { i18n } = useTranslation();

  return (
    <Layout>
      <Seo
        templateTitle={property?.name || ''}
        description={property?.description[i18n.language] || ''}
      />
      <PropertyPage />
    </Layout>
  );
}
