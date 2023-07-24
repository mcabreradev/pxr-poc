/* eslint-disable simple-import-sort/imports */
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import Button from '@/components/button';
import Carousel from '@/components/carousel';
import Icon from '@/components/icon';
import { Heading, Title } from '@/components/text';

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

      <Section>
        <Heading>{data.name}</Heading>
        <div className='flex flex-row items-center text-[14px]'>
          <Icon icon='star' width='16px' />
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
              <Icon icon={key} width='18px' color='gray' />
            </a>
          ))}
        </div>
      </Section>

      <hr />

      <Section>
        <p className='my-2 text-2sm'>{data.description}</p>
      </Section>

      <Section>
        <Title className='pt-5'>Nuestro hotel ofrece</Title>
        <div className='flex flex-wrap justify-between py-4'>
          {data.services.map((service) => (
            <div
              key={`service-${service.icon}`}
              className='flex w-1/2 flex-row py-[5px]'
            >
              <Icon icon={service.icon} width='18px' color='#949494' />
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
        <Title>Reserva con Nosotros</Title>
        <div className='flex flex-col items-start py-4 pl-2 text-base leading-[50px]'>
          <Row>
            <Icon icon='emoticon_cool' width={24} />
            <div className='pl-[5px]'>Mejor tarifa garantizada</div>
          </Row>
          <Row>
            <Icon icon='check-decagram' width={24} />
            <div className='pl-[5px]'>Reserva directo sin intermediarios</div>
          </Row>
          <Row>
            <Icon icon='percent' width={24} />
            <div className='pl-[5px]'>Ofertas y beneficios exclusivos</div>
          </Row>
        </div>
      </Section>

      <hr />

      <Section className='p-4 pr-0 pt-2'>
        <Title>¿Dónde quieres dormir?</Title>
        <RoomSwiper rooms={data.rooms} />
      </Section>

      <hr />

      <Footer />
    </div>
  );
}
