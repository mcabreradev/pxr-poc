import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import BackButton from '@/components/common/back-button';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

import SummaryRow from '@/features/summary/summaryRow';

type Props = {
  className?: string;
};

const Container = tw.div`
`;

export default function SummaryFeature({ className }: Props) {
  const { t } = useTranslation();
  return (
    <Container
      className={cn('sm:absolute-container md:relative', className)}
      data-testid='test-element'
    >
      <BackButton href='/'>{t('title.summary')}</BackButton>
      <div className='mb-16'>
        <div className='layout'>
          <div className='w-full bg-[url("/images/hotel/image318.png")] bg-cover'>
            <Typography
              variant='h1'
              weight='medium'
              className='mx-6 my-2 pb-12 pt-3 text-white'
            >
              {t('summary.stay')} Terrazas de La Posta
            </Typography>
          </div>
          <div className='mb-2 flex w-full flex-row divide-x px-2'>
            <div className='basis-1/2 px-4 py-2'>
              <Typography variant='sm' weight='bold'>
                {t('checkin')}
              </Typography>
              <Typography variant='sm' weight='normal'>
                Lunes, 07 may 2023
              </Typography>
              <Typography variant='sm' weight='normal'>
                03:00pm
              </Typography>
            </div>
            <div className='basis-1/2 px-5 py-2'>
              <Typography variant='sm' weight='bold'>
                {t('checkout')}
              </Typography>
              <Typography variant='sm' weight='normal'>
                Viernes, 11 may 2023
              </Typography>
              <Typography variant='sm' weight='normal'>
                11:00am
              </Typography>
            </div>
          </div>
          <div className='mx-6 border-b'></div>
          <SummaryRow
            leftMainText={t('summary.address')}
            leftSecondaryText='Pje Santa Rosa de Lima s/n, Purmamarca, Argentina'
            rightMainText={t('summary.directions')}
            rightMainTag='a'
          />
          <SummaryRow
            leftMainText={t('summary.guests')}
            leftSecondaryText='2'
            rightMainText={t('summary.fill-data')}
            rightMainTag='a'
          />
          <SummaryRow
            leftMainText={t('summary.cost')}
            rightMainText='$ 470.00 USD'
            className='mb-6'
          />
          <SummaryRow
            leftMainText={t('summary.reservation-code')}
            rightMainText='SFFE3553'
            className='mb-5'
          />
          <div className='mx-6 border-b'></div>
          <div className='mx-6 my-5 flex flex-row'>
            <Typography variant='sm' tag='a' className='text-black'>
              {t('summary.contact')}
            </Typography>
            <Icon
              variant='internet'
              color='#757575'
              height='17px'
              width='17px'
              className='ml-1 mt-1'
            />
            <Icon
              variant='email'
              color='#757575'
              height='20px'
              width='20px'
              className='ml-1 mt-0.5'
            />
            <Icon
              variant='phone'
              color='#757575'
              height='20px'
              width='20px'
              className='ml-1 mt-0.5'
            />
            <Icon
              variant='whatsapp'
              color='#757575'
              height='20px'
              width='20px'
              className='ml-1 mt-0.5'
            />
          </div>
          <div className='mx-6 border-b'></div>
          <div className='mx-6 my-5 flex flex-row'>
            <Typography variant='sm' tag='a' className='text-black'>
              {t('summary.hotel-information')}
            </Typography>
          </div>
          <div className='border-b-8 border-b-gray-50'></div>
        </div>
      </div>
    </Container>
  );
}
