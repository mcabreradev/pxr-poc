import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import Button from '@/components/button';
import Swiper from '@/components/swiper';
import { Text, TextSm } from '@/components/text';

const Rooms = tw.div`
  box-border h-auto w-[271px] border-[1px] border-solid border-gray-200 bg-white shadow
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
            <Text className='pb-4 text-base font-medium'>{room.name}</Text>
            <TextSm className='pb-1'>{room.subtitle}</TextSm>
            <TextSm className='pb-4'>{room.desc}</TextSm>
            <TextSm className='pb-6 font-medium underline'>{room.date}</TextSm>
            <Text className='pb-5 text-base'>
              {t('from')} <b>${room.price}/</b>
              {t('night.singular')}
            </Text>
            <Button className='mb-4 w-full'>{t('button.reserve')}</Button>
          </div>
        </Rooms>
      ))}
    </Swiper>
  );
}
