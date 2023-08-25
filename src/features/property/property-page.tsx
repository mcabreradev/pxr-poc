'use client';

/* eslint-disable simple-import-sort/imports */
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import Button from '@/components/button';
import Carousel from '@/components/carousel';
import Icon from '@/components/icon';
import Image from '@/components/image';
import Sticky from '@/components/sticky';
import Swiper from '@/components/swiper';
import Typography from '@/components/typography';
import usePropertyQuery from '@/hooks/use-property.query';
import logger from '@/lib/logger';

import Footer from './property-footer';
import RoomSwiper from './property-room-swiper';

import usePropertyStore from '@/store/use-property.store';
import data from './property.data.json';

const Section = tw.div`
  px-4 text-black
`;

const Row = tw.div`
  flex flex-row items-center
`;

const PropertyPage = memo(function HotelPage() {
  const { t, i18n } = useTranslation();
  const { propertyId } = usePropertyStore();
  const { isLoading, isError, data: property } = usePropertyQuery(propertyId);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error</span>;
  }

  logger(property);

  return (
    <main data-id-test='test-componet' title={property}>
      <Carousel>
        {data.images.map((image) => (
          <Image
            key={`img-${image}`}
            alt='...'
            src={image}
            width={980}
            height={551}
            className='h-full w-full object-cover'
          />
        ))}
      </Carousel>

      <Section className='pt-3'>
        <Typography variant='h1'>{property.name}</Typography>
        <div className='flex flex-row items-center text-[14px]'>
          <Icon variant='star' width='16px' />
          <p className='p-1'>{property.reviewRatingScore}</p>•
          <p className='pl-1 underline hover:cursor-pointer'>{`${
            property.reviewRatingCount
          } ${property.reviewRatingCount > 1 ? 'reseñas' : 'reseña'}`}</p>
        </div>

        <div className='py-1 underline'>{`${property.street}, ${property.state}, ${property.countryName}`}</div>

        <div className='flex flex-row items-center py-2 underline'>
          <span className='pr-1'>Contacto</span>
          {Object.entries(data?.contact).map(([key, value]) => (
            <a key={`contacto-${key}-${value}`} className='px-1' href={value}>
              <Icon variant={key} width='18px' color='gray' />
            </a>
          ))}
        </div>
      </Section>

      <hr />

      <Section>
        <p className='my-2 text-2sm'>{property.description[i18n.language]}</p>
      </Section>

      <Section className='pt-4'>
        <Typography variant='h2' weight='normal'>
          {t('Nuestro hotel ofrece')}
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
        <Button className='w-full font-semibold' variant='secondary'>
          Ver todos los servicios
        </Button>
      </Section>

      <hr className='mb-9 mt-6' />

      <Section className='p-4 py-0'>
        <Typography variant='h2' weight='normal'>
          Reserva con Nosotros
        </Typography>
        <div className='flex flex-col items-start py-4 pl-2 text-base leading-[50px]'>
          <Row>
            <Icon variant='emoticon-cool' width={24} />
            <div className='pl-[5px]'>Mejor tarifa garantizada</div>
          </Row>
          <Row>
            <Icon variant='check-decagram' width={24} />
            <div className='pl-[5px]'>Reserva directo sin intermediarios</div>
          </Row>
          <Row>
            <Icon variant='percent' width={24} />
            <div className='pl-[5px]'>Ofertas y beneficios exclusivos</div>
          </Row>
        </div>
      </Section>

      <hr />

      <Section className='p-4 pb-0 pr-0 pt-2'>
        <Typography variant='h2' weight='normal'>
          ¿Dónde quieres dormir?
        </Typography>
        <RoomSwiper />
      </Section>

      <hr />

      <Section className='p-4 pb-0 pr-0 pt-2'>
        <div className='flex flex-row items-center'>
          <Typography variant='h2' weight='normal'>
            Reseñas
          </Typography>
          <Icon variant='star' width='22px' className='ml-2' />
          <Typography className='p-1' variant='h2' weight='medium'>
            {property.reviewRatingScore}
          </Typography>
        </div>

        <Swiper>
          {property.reviews.map((review) => (
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

      <Section className='p-4 pb-0 pt-2'>
        <Typography variant='h2' weight='normal'>
          Nuestra ubicación exacta
        </Typography>
        <div className='flex justify-start space-x-2 pt-3'>
          <Icon variant='marker' className='mt-1' />
          <Typography variant='sm' weight='light'>
            {`${property.street}, ${property.state}, ${property.countryName}`}
          </Typography>
        </div>

        <div>
          {/* <iframe src={data.map.url} className='mt-3 h-[300px] w-full' /> */}
          <iframe
            title='Mapa de ubicaci\xF3n del alojamiento'
            loading='lazy'
            className='mt-3 h-[300px] w-full'
            src={data.map.url}
            width='100%'
            height='300'
            style={{ border: '0' }}
            allowFullScreen
            aria-hidden='false'
            tabIndex={0}
          ></iframe>
        </div>
      </Section>

      <hr />

      <Section className='p-4 pb-0 pt-2'>
        <Typography variant='h2' weight='normal'>
          Sitios de interés cercanos
        </Typography>
        <div className='flex justify-start space-x-3 pb-5 pt-3'>
          <Icon variant='camera' width={24} />
          <Typography variant='base' className='underline'>
            Actividades
          </Typography>
        </div>
        {property.topSights.map((activity) => (
          <div
            key={`$attractions-${activity.googlePlaceId}`}
            className='flex justify-between py-2'
          >
            <Typography>{activity.name}</Typography>
            <Typography weight='light'>{activity.distance}</Typography>
          </div>
        ))}
        <Button className='my-4 w-full font-semibold' variant='secondary'>
          Mostrar todos los sitios
        </Button>
      </Section>

      <hr />

      <Section className='p-4 pb-6 pt-2'>
        <Typography variant='h2' weight='normal'>
          Reglas del hotel
        </Typography>

        <div className='my-4'>
          {data.rules.map((rule, key) => (
            <div key={`$rules-${key}`} className='flex justify-between py-2'>
              <Typography>{rule.name}</Typography>
              <Typography weight='light'>{rule.description}</Typography>
            </div>
          ))}
        </div>

        <Typography weight='semibold' className='underline'>
          Mostrar más
        </Typography>
      </Section>

      <Sticky>
        <div className='flex h-full w-full flex-row items-center justify-around bg-white-100 px-2 py-5'>
          <div className='flex flex-col'>
            <Typography variant='sm' weight='semibold'>
              {' '}
              Desde $100.00 x noche
            </Typography>
            <Typography variant='sm' weight='normal' className='underline'>
              {' '}
              Desde $100.00 x noche
            </Typography>
          </div>
          <div>
            <Button>Escoger habitación</Button>
          </div>
        </div>
      </Sticky>
      <Footer />
    </main>
  );
});

export default PropertyPage;
