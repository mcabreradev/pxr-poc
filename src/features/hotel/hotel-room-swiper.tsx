import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import Button from '@/components/button';
import Swiper from '@/components/swiper';
import Typography, {
  TextFontWeight,
  TextVariant,
} from '@/components/typography';

const Rooms = tw.div`
  box-border h-auto w-[271px] border-[1px] border-solid border-gray-50 bg-white shadow
`;
export default function RoomSwiper({ rooms }) {
  const { t } = useTranslation();

  return (
    <Swiper>
      {rooms.map((room, index) => (
        <Rooms key={`holtel-room-${index}`}>
          <Image
            alt={room.image.alt}
            src={room.image.url}
            width={271}
            height={235}
            className='w-full object-cover'
          />
          <div className='p-4'>
            <Typography
              variant={TextVariant.h3}
              weight={TextFontWeight.medium}
              className='pb-4'
            >
              {room.name}
            </Typography>
            <Typography className='pb-1'>{room.subtitle}</Typography>
            <Typography className='pb-4'>{room.desc}</Typography>
            <Typography
              weight={TextFontWeight.medium}
              className='pb-6 underline'
            >
              {room.date}
            </Typography>
            <Typography className='pb-5' variant={TextVariant.base}>
              {t('from')} <b>${room.price}/</b>
              {t('night.singular')}
            </Typography>
            <Button className='mb-4 w-full'>{t('button.reserve')}</Button>
          </div>
        </Rooms>
      ))}
    </Swiper>
  );
}
