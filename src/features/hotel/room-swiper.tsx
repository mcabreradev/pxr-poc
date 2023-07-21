import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import Button from '@/components/button';

const Container = tw.div`
  no-scrollbar flex overflow-x-scroll scroll-smooth py-5
`;
export default function RoomSwiper({ rooms }) {
  const { t } = useTranslation();

  return (
    <Container data-testid='test-element'>
      <div className='flex flex-nowrap gap-x-[30px]'>
        {rooms.map((room, index) => (
          <div
            key={`holtel-room-${index}`}
            className='box-border h-auto w-[271px] border-[1px] border-solid border-gray-200 bg-white shadow '
          >
            <Image
              alt={room.image.alt}
              src={room.image.url}
              width={271}
              height={235}
              className='w-full object-cover'
            />
            <div className='p-4'>
              <div className='pb-4 text-base font-medium'>{room.name}</div>
              <div className='pb-1 text-sm'>{room.subtitle}</div>
              <div className='pb-4 text-sm'>{room.desc}</div>
              <div className='pb-6 text-sm font-medium underline'>
                {room.date}
              </div>
              <div className='pb-5 text-base'>
                {t('from')} <b>${room.price}/</b>
                {t('night.singular')}
              </div>
              <Button className='mb-4 w-full'>{t('button.reserve')}</Button>
            </div>
          </div>
        ))}
      </div>
    </Container>
  );
}
