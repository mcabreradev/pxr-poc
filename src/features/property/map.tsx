import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import { Icon, Typography } from '@/components';

import { PropertyType } from '@/types'; // Import the 'Property' type from the appropriate module

type Props = {
  id?: string;
  className?: string;
  property: PropertyType;
  url: string;
};

const Container = tw.div`
  px-4 text-black
  md:px-0
`;

export default function MapComponent({ id, className, property, url }: Props) {
  const { t } = useTranslation();
  return (
    <Container className={cn(className)} data-testid='test-map-element' id={id}>
      <Typography variant='h2' weight='normal'>
        {t('title.exact-location')}
      </Typography>
      <div className='flex justify-start space-x-2 pt-3'>
        <Icon variant='marker' className='mt-1' />
        <Typography variant='sm' weight='light'>
          {`${property?.street}, ${property?.state}, ${property?.countryName}`}
        </Typography>
      </div>

      <div>
        <iframe
          title={t('title.exact-location')}
          loading='lazy'
          className='mt-3 h-[300px] w-full'
          src={url}
          width='100%'
          height='300'
          style={{ border: '0' }}
          allowFullScreen
          aria-hidden='false'
          tabIndex={0}
        ></iframe>
      </div>
    </Container>
  );
}
