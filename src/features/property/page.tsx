/* eslint-disable simple-import-sort/imports */
'use client';

import { motion } from 'framer-motion';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import {
  useCheckinCheckoutHook,
  useIntersectionObserver,
  useQueryString,
} from '@/hooks';

import { Gallery, Icon, Image, Sticky, Swiper, Typography } from '@/components';

import {
  useGlobalStore,
  useReservationRequestStore,
  useReservationStore,
} from '@/store';

import HotelRules from '@/features/common/hotel-rules';

import {
  useAvailabilityQuery,
  usePropertyQuery,
  useRatesPlanQuery,
} from '@/queries';

import GuestsDatepickerDrawer from '@/features/common/guest-datepicker';
import PropertyAmenities from './amenities';
import data from './data.json';
import GuestForm from './guest-form';
import MapComponent from './map';
import RoomSelection from './room-selection';
import Skeleton from './skeleton';
import StickyGuestForm from './sticky-guest-form';
import PropertyTopSights from './topsights';

const Section = tw.div`
  px-4 text-black
  md:px-0
`;

const Row = tw.div`
  flex flex-row items-center
`;

const PropertyPage = memo(function HotelPage() {
  const [isIntersected, setIntersected] = useState<boolean>(true);
  const { t, i18n } = useTranslation();
  const { isLoading, isError, data: property } = usePropertyQuery();
  const { removeBlacklistParam } = useQueryString();
  const { resetReservation } = useReservationStore();
  const { resetReservationRequest } = useReservationRequestStore();
  const { resetGlobalStore } = useGlobalStore();
  const { checkin, checkout } = useCheckinCheckoutHook();
  const { refetch: fetchAvailability } = useAvailabilityQuery({
    checkin,
    checkout,
  });

  // Fetch rates plan
  const { refetch: fetchRatesPlan } = useRatesPlanQuery({
    checkin,
    checkout,
  });

  // Fetch availability and rates plan when checkin and checkout are set
  useEffect(() => {
    if (checkin && checkout) {
      fetchAvailability();
      fetchRatesPlan();
    }
  }, [checkin, checkout, fetchAvailability, fetchRatesPlan]);

  // Remove the action and extra query params
  useEffect(() => {
    removeBlacklistParam(['action', 'extra', 'plan']);
    resetReservation();
    resetGlobalStore();
    resetReservationRequest();
  }, [
    removeBlacklistParam,
    resetGlobalStore,
    resetReservation,
    resetReservationRequest,
  ]);

  const { ref: roomSelectedRef, entry } = useIntersectionObserver({
    threshold: 0.5,
    root: null,
    rootMargin: '100px 0px 0px 100px',
  });

  // Show sticky guest form when the room selection is not visible
  useEffect(() => {
    if (entry && 'isIntersecting' in entry) {
      setIntersected(!entry.isIntersecting);
    }
  }, [entry, setIntersected]);

  if (isLoading) {
    return <Skeleton />;
  }

  if (isError) {
    return <span>Error</span>;
  }

  // console.log(property);

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      data-id-test='test-componet'
      className='layout'
    >
      <Gallery photos={property?.photos} />

      <div className='relative flex'>
        <div className='w-full md:w-8/12'>
          <Section className='pt-3'>
            <Typography variant='h1'>{property?.name}</Typography>
            <div className='flex flex-row items-center text-[14px]'>
              <Icon variant='star' width='16px' />
              <p className='p-1'>{property?.reviewRatingScore}</p>•
              <p className='pl-1 underline hover:cursor-pointer'>{`${
                property?.reviewRatingCount
              } ${property?.reviewRatingCount > 1 ? 'reseñas' : 'reseña'}`}</p>
            </div>

            <div className='py-1 underline'>{`${property?.street}, ${property?.state}, ${property?.countryName}`}</div>

            <div className='flex flex-row items-center py-2 underline'>
              <span className='pr-1'>{t('title.contact')}</span>
              {Object.entries(data?.contact).map(([key, value]) => (
                <a
                  key={`contacto-${key}-${value}`}
                  className='px-1'
                  href={value}
                >
                  <Icon variant={key} width='18px' color='gray' />
                </a>
              ))}
            </div>
          </Section>
          <hr />
          <Section id='summary'>
            <p className='my-2 text-2sm'>
              {property?.description
                ? property?.description[i18n.language]
                : t('description')}
            </p>
          </Section>

          <Section className='pt-4'>
            <Typography variant='h2' weight='normal'>
              {t('title.hotel-amemnities')}
            </Typography>
            <div className='grid grid-cols-2 gap-2 py-4 md:grid-cols-3'>
              {data.services.slice(0, 8).map((service) => (
                <div
                  key={`service-${service.icon}`}
                  className='flex flex-row items-center py-[5px]'
                >
                  <Icon variant={service.icon} width='14' color='#949494' />
                  <p className='pl-[5px] text-2sm'>{service.name}</p>
                </div>
              ))}
            </div>
            <PropertyAmenities amenities={data?.services} className='pt-6' />
          </Section>

          <hr className='mb-9 mt-6' />

          <Section className='p-4 py-0'>
            <Typography variant='h2' weight='normal'>
              {t('title.book-with-us')}
            </Typography>
            <div className='flex flex-col items-start py-4 pl-2 text-base leading-[50px]'>
              <Row>
                <Icon variant='emoticon-cool' width={24} />
                <div className='pl-[5px]'>{t('info.better-rate')}</div>
              </Row>
              <Row>
                <Icon variant='check-decagram' width={24} />
                <div className='pl-[5px]'>{t('info.direct-booking')}</div>
              </Row>
              <Row>
                <Icon variant='percent' width={24} />
                <div className='pl-[5px]'>{t('info.offers-beneficts')}</div>
              </Row>
            </div>
          </Section>

          <hr />

          <Section
            ref={roomSelectedRef}
            className='p-4 pb-0 pr-0 pt-2 md:flex md:flex-col md:items-center'
            id='rooms'
          >
            <Typography variant='h2' weight='normal' className='md:self-start'>
              {t('title.wanna-sleep')}
            </Typography>
            <RoomSelection />
          </Section>
        </div>

        <div className='hidden md:flex md:w-4/12'>
          <GuestForm showButton={isIntersected} />
        </div>
      </div>
      <hr />
      <Section className='p-4 pb-0 pr-0 pt-2' id='reviews'>
        <div className='flex flex-row items-center'>
          <Typography variant='h2' weight='normal'>
            {t('title.reviews')}
          </Typography>
          <Icon variant='star' width='22px' className='ml-2' />
          <Typography className='p-1' variant='h2' weight='medium'>
            {property?.reviewRatingScore}
          </Typography>
        </div>
      </Section>
      <Section>
        <Swiper>
          {property?.reviews.map((review) => (
            <div
              key={`reviews-${review.reviewId}-box`}
              className='box-border flex h-auto w-[271px] flex-col space-y-4 border-[1px] border-solid border-gray-50 bg-white p-3'
            >
              <div className='flex space-x-2'>
                {review.authorPhotoURL ? (
                  <Image
                    alt={review.authorName}
                    src={review.authorPhotoURL}
                    width={45}
                    height={45}
                    className='h-10 w-10 rounded-full'
                  />
                ) : (
                  <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-600'>
                    <span className='text-xs font-medium leading-none text-white'>
                      {review.authorName}
                    </span>
                  </span>
                )}
                <div className='flex flex-col'>
                  <Typography variant='sm2'>{review.authorName}</Typography>
                  <Typography variant='sm2' weight='light'>
                    {review.rating}
                  </Typography>
                  <Typography variant='sm2' weight='light'>
                    {review.relativeTime}
                  </Typography>
                </div>
              </div>
              <Typography variant='xs2'>{review.text}</Typography>
            </div>
          ))}
        </Swiper>
      </Section>
      <hr />

      <MapComponent property={property} url={data.map.url} id='location' />

      <hr />
      <Section className='p-4 pb-0 pt-2' id='topsites'>
        <Typography variant='h2' weight='normal'>
          {t('title.attractions')}
        </Typography>

        <div className='md:grid md:grid-cols-3 md:gap-16'>
          <div className='md:max-w-[300px]'>
            <div className='mt-5 flex justify-start space-x-3 pb-5 pt-3'>
              <Icon variant='camera' width={24} />
              <Typography variant='base' className='underline'>
                {t('title.activities')}
              </Typography>
            </div>

            {property?.topSights.slice(0, 4).map((activity, i) => (
              <div
                key={`$attractions-${activity.googlePlaceId}`}
                className='flex justify-between py-2'
              >
                <Typography>{activity.name}</Typography>
                <Typography weight='light'>
                  {activity.distance || (i + 1) * 100 + ' m'}
                </Typography>
              </div>
            ))}
          </div>

          <div className='hidden md:block md:max-w-[300px]'>
            <div className='mt-5 flex justify-start space-x-3 pb-5 pt-3'>
              <Icon variant='restaurant' width={24} />
              <Typography variant='base' className='underline'>
                {t('Restaurantes')}
              </Typography>
            </div>

            {property?.topSights.slice(0, 4).map((activity, i) => (
              <div
                key={`$attractions-${activity.googlePlaceId}`}
                className='flex justify-between py-2'
              >
                <Typography>{activity.name}</Typography>
                <Typography weight='light'>
                  {activity.distance || (i + 1) * 100 + ' m'}
                </Typography>
              </div>
            ))}
          </div>

          <div className='hidden md:block md:max-w-[300px]'>
            <div className='mt-5 flex justify-start space-x-3 pb-5 pt-3'>
              <Icon variant='museum' width={24} />
              <Typography variant='base' className='underline'>
                {t('Museos')}
              </Typography>
            </div>

            {property?.topSights.slice(0, 4).map((activity, i) => (
              <div
                key={`$attractions-${activity.googlePlaceId}`}
                className='flex justify-between py-2'
              >
                <Typography>{activity.name}</Typography>
                <Typography weight='light'>
                  {activity.distance || (i + 1) * 100 + ' m'}
                </Typography>
              </div>
            ))}
          </div>
        </div>

        <PropertyTopSights topSights={property?.topSights} className='pt-6' />
      </Section>

      <hr />

      <HotelRules rules={data.rules} classname=' md:w-1/3' />

      <Sticky className='md:sticky md:hidden' show={isIntersected}>
        <StickyGuestForm />
      </Sticky>

      <GuestsDatepickerDrawer />
    </motion.main>
  );
});

export default PropertyPage;
