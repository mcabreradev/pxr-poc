import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Icon from '@/components/icon';
import Image from '@/components/image';
import Typography, {
  TextFontWeight,
  TextVariant,
} from '@/components/typography';

import Footer from '@/features/hotel/hotel-footer';

import data from './room-type.data.json';

interface Props {
  params: { room: string };
  className?: string;
}

const Container = tw.div`

`;

export default function RoomTypeComponent({
  className,
  params: { room },
}: Props) {
  const { t } = useTranslation();

  return (
    <Container
      className={cn(className)}
      data-testid='test-element'
      datatype={room}
    >
      <Link href='/'>
        <div className='flex w-full max-w-3xl items-center rounded-md px-8 py-4 text-center'>
          <Icon
            variant='arrow-back'
            width='30'
            color='var(--tw-color-neutral-400)'
          />

          <div className='-ml-10 flex w-full items-center justify-center'>
            <Typography
              variant={TextVariant.base}
              weight={TextFontWeight.medium}
              className='mx-auto text-neutral-300'
            >
              {t('title.room-details')}
            </Typography>
          </div>
        </div>
      </Link>

      <section>
        <div className='relative min-h-[260px] w-full'>
          <Image
            src='/images/hotel/room-1.webp'
            className='z-0'
            alt='room'
            fill
          />
          <Typography
            variant={TextVariant.xs}
            weight={TextFontWeight.medium}
            className='z-20 flex h-[21px] w-[52px] items-center justify-center rounded bg-neutral-500 bg-opacity-60 text-center text-white'
          >
            1/26
          </Typography>
        </div>
      </section>

      <section>
        <div className='px-4 pt-6'>
          <Typography variant={TextVariant.h1}>{data.name}</Typography>
          <Typography
            variant={TextVariant.sm}
          >{`${data.subtitle} • ${data.desc}`}</Typography>
        </div>
      </section>

      <hr />

      <section>
        <div className='px-4 pt-0'>
          <Typography variant={TextVariant.h2} weight={TextFontWeight.normal}>
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
          <Button className='w-full font-semibold' variant='secondary'>
            {t('button.view-all-services')}
          </Button>
        </div>
      </section>

      <hr />

      <section>
        <div className='px-4 pt-0'>
          <Typography variant={TextVariant.h2} weight={TextFontWeight.normal}>
            {t('title.my-trip')}
          </Typography>
          <div className='flex flex-wrap justify-between py-2'>
            <div>
              <Typography
                variant={TextVariant.sm}
                weight={TextFontWeight.semibold}
                className='text-neutral-400'
              >
                {t('date.prural')}
              </Typography>
              <Typography variant={TextVariant.sm} className='text-neutral-500'>
                07 may 2023 - 11 may 2023
              </Typography>
            </div>
            <Typography
              variant={TextVariant.sm}
              className='text-neutral-500 underline'
            >
              {t('title.edit')}
            </Typography>
          </div>
          <div className='flex flex-wrap justify-between py-2'>
            <div>
              <Typography
                variant={TextVariant.sm}
                weight={TextFontWeight.semibold}
                className='text-neutral-400'
              >
                {t('guest.prural')}
              </Typography>
              <Typography variant={TextVariant.sm} className='text-neutral-500'>
                2 {t('guest.adult.prural')}
              </Typography>
            </div>
            <Typography
              variant={TextVariant.sm}
              className='text-neutral-500 underline'
            >
              {t('title.edit')}
            </Typography>
          </div>
        </div>
      </section>

      <Footer />
    </Container>
  );
}
