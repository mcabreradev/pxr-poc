/* eslint-disable simple-import-sort/imports */
'use client';

import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { useQueryString, useSearchParamOrStore } from '@/hooks';
import { cn } from '@/lib/utils';

import Button from '@/components/button';
import BackButton from '@/components/common/back-button';
import Gallery from '@/components/gallery';
import Icon from '@/components/icon';
import Modal from '@/components/modal';
import Typography from '@/components/typography';

import { useGlobalStore, useReservationRequestStore } from '@/store';

import HotelRules from '@/features/components/hotel-rules';

import { useRatesPlanQuery, useRoomTypeQuery } from '@/queries';

import data from './data.json';
import MyTrip from './my-trip/my-trip';
import Skeleton from './skeleton';

type Props = {
  roomTypeId: number;
  className?: string;
};

const Section = tw.div`
px-4 text-black md:px-0
`;

export default function RoomTypePage({ className, roomTypeId }: Props) {
  const { t, i18n } = useTranslation();
  const { isError, isLoading, data: room } = useRoomTypeQuery(roomTypeId);
  const { removeBlacklistParam, removeQueryStringParamAndUpdate } =
    useQueryString();
  const { resetStore } = useReservationRequestStore();
  const { resetGlobalStore } = useGlobalStore();
  const searchParams = useSearchParams();
  const [isModalOpen, setIsModalOpen] = useState(
    !!searchParams.get('unavailable'),
  );

  const { checkin, checkout } = useSearchParamOrStore();
  const { data: ratesPlan } = useRatesPlanQuery({
    checkin,
    checkout,
    roomTypeId,
  });

  const closeModalHandler = () => {
    setIsModalOpen(false);
    removeQueryStringParamAndUpdate('unavailable');
  };

  // Reset global store and remove blacklist params
  useEffect(() => {
    removeBlacklistParam(['']);
    resetStore();
    resetGlobalStore();
  }, [removeBlacklistParam, resetGlobalStore, resetStore]);

  if (isLoading) {
    return <Skeleton />;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className={cn('relative', className)}
      data-testid='test-element'
      datatype={room}
    >
      <BackButton href='/'>{t('title.room-details')}</BackButton>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModalHandler}
        size='md'
        footerClassName='p-2'
        headerClassName='p-6'
        header={
          <Typography variant='h2' weight='normal' className=''>
            {t('unavailable-modal.header')}
          </Typography>
        }
      >
        <Typography variant='base' weight='normal' className=''>
          {t('unavailable-modal.body')}
        </Typography>
      </Modal>

      <div className='layout'>
        <Gallery photos={data.images} />

        <div className='relative flex'>
          <div className='w-full md:w-8/12'>
            <Section className='pt-6 md:pt-3'>
              <Typography variant='h1'>{room.name[i18n.language]}</Typography>
              <Typography variant='sm'>{`Max ${room.maxCapacity} ${t(
                'person.plural',
              )} • ${room.description}`}</Typography>
            </Section>
            <hr />
            <Section>
              <Typography variant='h2' weight='normal'>
                {t('title.room-amemnities')}
              </Typography>
              <div className='flex flex-wrap justify-between py-4'>
                {data.services.map((service) => (
                  <div
                    key={`service-${service.icon}`}
                    className='flex w-1/2 flex-row py-[5px]'
                  >
                    <Icon variant={service.icon} width='18px' color='#949494' />
                    <p className='pl-[5px] text-2sm'>{service.name}</p>
                  </div>
                ))}
              </div>
              <Button className='font-semibold' variant='secondary'>
                {t('button.view-all-services')}
              </Button>
            </Section>
            <hr />
            <MyTrip roomTypeId={roomTypeId} className='md:hidden' />
            <hr className='md:hidden' />
            <Section>
              <div className='py-2'>
                <Typography variant='h2' weight='normal'>
                  {t('info.cancellation-policy')}
                </Typography>
                <div className='my-3' />
                <Typography variant='sm' className='text-neutral-500'>
                  {ratesPlan && ratesPlan.length > 0
                    ? ratesPlan[0].reservationPolicies[0].cancellationPolicy
                        .policyDescription
                    : t('info.non-refundabled')}
                </Typography>
              </div>
            </Section>
            <Section>
              <div className='py-5'>
                <Typography variant='h2' weight='normal'>
                  {t('info.taxes-details')}
                </Typography>
                <div className='my-3' />
                <Typography variant='sm' className='text-neutral-500'>
                  {t('info.taxes-description')}
                </Typography>
              </div>
            </Section>
            <Section>
              <div className='py-4 pb-7 md:w-96'>
                <HotelRules rules={data.rules} />
              </div>
            </Section>
          </div>

          <div className='relative mb-5 hidden md:flex md:w-4/12'>
            <MyTrip roomTypeId={roomTypeId} />
          </div>
        </div>
      </div>
    </motion.main>
  );
}
