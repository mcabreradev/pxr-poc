import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import useRoomTypesQuery from '@/hooks/use-roomtypes.query';

import Button from '@/components/button';
import Image from '@/components/image';
import Swiper from '@/components/swiper';
import Typography from '@/components/typography';

const Rooms = tw.div`
  box-border h-auto w-[271px] border-[1px] border-solid border-gray-50 bg-white shadow
`;

export default function RoomSwiper() {
  const { t, i18n } = useTranslation();
  const { isLoading, isError, data: roomtypes } = useRoomTypesQuery();

  if (isLoading) {
    return 'loading';
  }

  if (isError) {
    return 'error';
  }

  return (
    <Swiper>
      {roomtypes.map((room, index) => (
        <Rooms key={`holtel-room-${index}`}>
          <Image
            alt='alt'
            src='/svg/placeholder.svg'
            width={271}
            height={235}
            className='w-full object-cover'
          />
          <div className='p-4'>
            <Typography variant='h3' weight='medium' className='pb-4'>
              {room.name[i18n.language]}
            </Typography>
            <Typography className='pb-1'>
              {`Max ${room.maxCapacity} ${t('person.plural')}`}
            </Typography>
            <Typography className='pb-4'>{room.description}</Typography>
            <Typography weight='medium' className='pb-6 underline'>
              {room.standardCapacity} {t('person.plural')}
            </Typography>
            <Typography className='pb-5' variant='base'>
              {t('from')} <b>${room.price}/</b>
              {t('night.singular')}
            </Typography>
            <Button type='link' href='/room-type' className='mb-4 w-full'>
              {t('button.reserve')}
            </Button>
          </div>
        </Rooms>
      ))}
    </Swiper>
  );
}
