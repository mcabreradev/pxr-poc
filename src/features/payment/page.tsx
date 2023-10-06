import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import useFetchProperty from '@/hooks/use-property.query';
import useRoomTypeQuery from '@/hooks/use-roomtype.query';

import BackButton from '@/components/common/back-button';
import Footer from '@/components/common/footer';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

import { URL } from '@/constant';
import StripePayment from '@/features/payment/strype-payment';

import SkeletonComponent from './skeleton';

type Props = {
  roomtype: string;
  action?: string;
};

const Container = tw.div`
`;

const Wrapper = tw.div`
`;

const HR = tw.div`
  hr border-t-[10px] border-neutral-60
`;

export default function PaymentFeature({ roomtype, action }: Props) {
  const { t, i18n } = useTranslation();
  const { isError, isLoading, data: property } = useFetchProperty();
  const {
    isError: roomError,
    isLoading: roomLoading,
    data: room,
  } = useRoomTypeQuery(roomtype);

  const actionPayment = !action;
  const actionSuccess = action === URL.SUCCESS;
  const actionError = action === URL.ERROR;

  if (isLoading || roomLoading) {
    return <SkeletonComponent />;
  }

  if (isError || roomError) {
    return <span>Error</span>;
  }

  return (
    <Container data-testid='test-element'>
      <BackButton href={`/room-type/${roomtype}`}>
        {t('title.room-confirm-reserve')}
      </BackButton>
      <section>
        <div className='flex h-auto w-full flex-row items-center border-t-[0.5px] border-solid border-gray-200 p-4'>
          <Image
            src='/images/hotel/room-1.webp'
            className='relative h-[75px] w-auto rounded'
            width={1}
            height={1}
            alt='room'
          />
          <div className='pl-3'>
            <Typography
              variant='base'
              weight='semibold'
              className='text-neutral-400'
            >
              {property.name}
            </Typography>

            <Typography
              variant='xs'
              weight='normal'
              className='text-neutral-400'
            >
              {`${property.street}`}
            </Typography>

            <div className='flex flex-row items-center text-[12px] text-neutral-500'>
              <Icon variant='star' width='16px' />
              <p>{property.reviewRatingScore}</p>
              <p className='pl-1 text-neutral-400'>{`(${property.reviewRatingCount})`}</p>
            </div>
          </div>
        </div>
      </section>
      <HR />
      <Wrapper>
        <section className='px-4'>
          <Typography variant='h2' weight='normal'>
            {t('title.my-trip')}
          </Typography>
          <div className='flex flex-wrap justify-between py-2'>
            <div>
              <Typography
                variant='sm'
                weight='semibold'
                className='text-neutral-400'
              >
                {t('date.plural')}
              </Typography>
              <Typography variant='sm' className='text-neutral-500'>
                07 may 2023 - 11 may 2023
              </Typography>
            </div>
          </div>
          <div className='flex flex-wrap justify-between py-2'>
            <div>
              <Typography
                variant='sm'
                weight='semibold'
                className='text-neutral-400'
              >
                {t('guest.plural')}
              </Typography>
              <Typography variant='sm' className='text-neutral-500'>
                2 {t('guest.adult.plural')}
              </Typography>
            </div>
          </div>
        </section>

        <HR />

        <section className='px-4'>
          <Typography variant='h2' weight='normal'>
            {t('title.price-details')}
          </Typography>
          <div className='flex flex-wrap justify-between py-3'>
            <div>
              <Typography
                variant='sm'
                weight='semibold'
                className='text-neutral-500'
              >
                {room.name[i18n.language]}
              </Typography>
              <Typography variant='sm' className='text-neutral-500'>
                4 {t('night.plural')}
              </Typography>
              <Typography variant='sm' className='text-neutral-500'>
                {t('info.non-refundable')}
              </Typography>
            </div>

            <Typography variant='sm' className='text-neutral-500'>
              $ 400.00
            </Typography>
          </div>

          <div className='flex flex-wrap justify-between pb-0 pt-4'>
            <div>
              <Typography
                variant='sm'
                weight='semibold'
                className='text-neutral-400'
              >
                {t('info.taxes')}
              </Typography>
            </div>
          </div>

          <div className='flex flex-wrap justify-between py-1'>
            <Typography variant='xs' className='w-3/4 text-neutral-500'>
              {t('info.taxes-description')}
            </Typography>

            <Typography variant='sm' className='text-neutral-500'>
              +$ 50.00
            </Typography>
          </div>

          <div className='flex flex-wrap justify-between py-3'>
            <Typography variant='sm' className='font-semibold text-neutral-500'>
              Total (USD)
            </Typography>

            <Typography variant='sm' className='font-semibold text-neutral-500'>
              $ 450.00
            </Typography>
          </div>
        </section>

        <HR />

        {actionPayment && <StripePayment />}
        {actionSuccess && <StripePayment />}
        {actionError && <StripePayment />}
      </Wrapper>
      <Footer />
    </Container>
  );
}