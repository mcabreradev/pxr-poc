/* eslint-disable simple-import-sort/imports */
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import Button from '@/components/button';
import Carousel from '@/components/carousel';
import Icon from '@/components/icon';
import Image from '@/components/image';
import Swiper from '@/components/swiper';
import Typography, {
  TextFontWeight,
  TextVariant,
} from '@/components/typography';

import Footer from './hotel-footer';
import RoomSwiper from './hotel-room-swiper';
import data from './hotel.data.json';

const Section = tw.div`
  px-4 text-black
`;

const Row = tw.div`
  flex flex-row items-center
`;

type HotelPageProps = {
  hotel?: string;
};

export default function HotelPage({ hotel }: HotelPageProps) {
  const { t } = useTranslation();

  return (
    <div data-id-test='test-componet' title={hotel}>
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
        <Typography variant={TextVariant.h1}>{data.name}</Typography>
        <div className='flex flex-row items-center text-[14px]'>
          <Icon variant='star' width='16px' />
          <p className='p-1'>{data.rate}</p>•
          <p className='pl-1 underline hover:cursor-pointer'>{`${
            data.reviews.length
          } ${data.reviews.length > 1 ? 'reseñas' : 'reseña'}`}</p>
        </div>

        <div className='py-1 underline'>{data.address}</div>

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
        <p className='my-2 text-2sm'>{data.description}</p>
      </Section>

      <Section className='pt-4'>
        <Typography variant={TextVariant.h2} weight={TextFontWeight.normal}>
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
        <Typography variant={TextVariant.h2} weight={TextFontWeight.normal}>
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
        <Typography variant={TextVariant.h2} weight={TextFontWeight.normal}>
          ¿Dónde quieres dormir?
        </Typography>
        <RoomSwiper rooms={data.rooms} />
      </Section>

      <hr />

      <Section className='p-4 pb-0 pr-0 pt-2'>
        <div className='flex flex-row items-center'>
          <Typography variant={TextVariant.h2} weight={TextFontWeight.normal}>
            Reseñas
          </Typography>
          <Icon variant='star' width='22px' className='ml-2' />
          <Typography
            className='p-1'
            variant={TextVariant.h2}
            weight={TextFontWeight.medium}
          >
            {data.rate}
          </Typography>
        </div>

        <Swiper>
          {data.reviews.map((review, i) => (
            <div
              key={`reviews-${i}-box`}
              className='box-border flex h-auto w-[271px] flex-col space-y-4 border-[1px] border-solid border-gray-50 bg-white p-3'
            >
              <div className='flex space-x-2'>
                {review.avatar ? (
                  <Image
                    alt={review.name}
                    src={review.avatar}
                    width={45}
                    height={45}
                    className='h-10 w-10 rounded-full'
                  />
                ) : (
                  <span className='inline-flex h-10 w-10 items-center justify-center rounded-full bg-gray-600'>
                    <span className='text-xs font-medium leading-none text-white'>
                      AC
                    </span>
                  </span>
                )}
                <div className='flex flex-col'>
                  <Typography variant={TextVariant.sm2}>
                    {review.name}
                  </Typography>
                  <Typography
                    variant={TextVariant.sm2}
                    weight={TextFontWeight.light}
                  >
                    {review.rate}
                  </Typography>
                  <Typography
                    variant={TextVariant.sm2}
                    weight={TextFontWeight.light}
                  >
                    {review.date}
                  </Typography>
                </div>
              </div>
              <Typography variant={TextVariant.xs2}>
                {review.comment}
              </Typography>
            </div>
          ))}
        </Swiper>
      </Section>

      <hr />

      <Section className='p-4 pb-0 pt-2'>
        <Typography variant={TextVariant.h2} weight={TextFontWeight.normal}>
          Nuestra ubicación exacta
        </Typography>
        <div className='flex justify-start space-x-2 pt-3'>
          <Icon variant='marker' className='mt-1' />
          <Typography variant={TextVariant.sm} weight={TextFontWeight.light}>
            {data.address}
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
        <Typography variant={TextVariant.h2} weight={TextFontWeight.normal}>
          Sitios de interés cercanos
        </Typography>
        <div className='flex justify-start space-x-3 pb-5 pt-3'>
          <Icon variant='camera' width={24} />
          <Typography variant={TextVariant.base} className='underline'>
            Actividades
          </Typography>
        </div>
        {data.attractions.map((activity, key) => (
          <div
            key={`$attractions-${key}`}
            className='flex justify-between py-2'
          >
            <Typography>{activity.name}</Typography>
            <Typography weight={TextFontWeight.light}>
              {activity.distance}
            </Typography>
          </div>
        ))}
        <Button className='my-4 w-full font-semibold' variant='secondary'>
          Mostrar todos los sitios
        </Button>
      </Section>

      <hr />

      <Section className='p-4 pb-6 pt-2'>
        <Typography variant={TextVariant.h2} weight={TextFontWeight.normal}>
          Reglas del hotel
        </Typography>

        <div className='my-4'>
          {data.rules.map((rule, key) => (
            <div key={`$rules-${key}`} className='flex justify-between py-2'>
              <Typography>{rule.name}</Typography>
              <Typography weight={TextFontWeight.light}>
                {rule.description}
              </Typography>
            </div>
          ))}
        </div>

        <Typography weight={TextFontWeight.semibold} className='underline'>
          Mostrar más
        </Typography>
      </Section>

      <Footer />
    </div>
  );
}
