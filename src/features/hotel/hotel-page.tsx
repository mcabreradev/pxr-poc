import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import Carousel from '@/components/carousel';
import Icon from '@/components/icon';

import RoomSwiper from '@/features/hotel/room-swiper';

import data from './hotel.data.json';

const HorizontalLine = tw.div`
  box-border h-px w-full border-t-[1px] border-solid border-white-200
`;

const Footer = tw.footer`
  relative
  box-border
  flex
  h-[308px]
  w-full
  flex-col
  justify-around
  overflow-hidden
  border-t-[0.5px] border-solid border-gray-300
  bg-white-100
  p-4
  text-left text-sm text-black
`;

const Row = tw.div`
  flex flex-row items-center
`;

type HotelPageProps = {
  hotel?: string;
};

export default function HotelPage({ hotel }: HotelPageProps) {
  const { t, i18n } = useTranslation();

  const onClickHandler = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
    document.cookie = `i18next=${i18n.language}`;
  };

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

      <section className='p-4 text-black'>
        <span className='text-[24px]'>{data.name}</span>
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

        <HorizontalLine />

        <p className='my-2 text-2sm'>{data.description}</p>
      </section>

      <section className='p-4 pt-0'>
        <span className='text-[20px]'>Nuestro hotel ofrece</span>
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
        <HorizontalLine />
      </section>

      <section className='p-4 pt-0'>
        <div className='text-[20px]'>Reserva con Nosotros</div>
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
        <HorizontalLine />
      </section>

      <section className='p-4 pr-0 pt-2'>
        <div className='text-[20px]'>¿Dónde quieres dormir?</div>
        <RoomSwiper rooms={data.rooms} />
        <HorizontalLine />
      </section>

      <Footer data-testid='test-element'>
        <Row className='font-semibold'>
          <Row className='w-full'>
            <Icon icon='globe' width='18px' />
            <div
              className='hover:cursor-pointer'
              onClick={onClickHandler}
              data-testid='test-link'
            >
              {t('link.language')}
            </div>
          </Row>
          <span className='w-full'>$ USD</span>
        </Row>
        <Row>
          <Icon icon='open_in_new' width='18px' />
          <div className='pl-[5px]'>www.terrazasposta.com</div>
        </Row>
        <Row>
          <Icon icon='email' width='18px' />
          <div className='pl-[5px]'>kyamashita@terrazasposta.com</div>
        </Row>
        <Row>
          <Icon icon='phone' width='18px' />
          <div className='pl-[5px]'>+54 388 490-8053</div>
        </Row>
        <Row>
          <Icon icon='whatsapp' width='18px' />
          <div className='pl-[5px]'>Whatsapp</div>
        </Row>
        <Row>
          <Icon icon='facebook_round' width='18px' />
          <div className='pl-[5px]'></div>
          <Icon icon='instagram' width='18px' />
        </Row>
        <Row>{t('link.termsandconditions')}</Row>
        <Row>© {new Date().getFullYear()} Paxer LLC</Row>
      </Footer>
    </div>
  );
}
