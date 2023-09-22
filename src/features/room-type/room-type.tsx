/* eslint-disable simple-import-sort/imports */
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import useRoomTypeQuery from '@/hooks/use-roomtype.query';
import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Footer from '@/components/common/footer';
import Icon from '@/components/icon';
import Image from '@/components/image';
import Radio from '@/components/radio';
import Toggle from '@/components/toggle';
import Typography from '@/components/typography';

import BackButton from '@/components/common/back-button';
import Skeleton from './room-skeleton';
import data from './room-type.data.json';

type Props = {
  roomTypeId: string;
  className?: string;
};

const Container = tw.div`

`;

const Wrapper = tw.div`

`;

export default function RoomTypeComponent({ className, roomTypeId }: Props) {
  const { t, i18n } = useTranslation();

  const { isError, isLoading, data: room } = useRoomTypeQuery(roomTypeId);

  if (isLoading) {
    return <Skeleton />;
  }

  if (isError) {
    return <span>Error</span>;
  }

  return (
    <Container
      className={cn(className)}
      data-testid='test-element'
      datatype={room}
    >
      <BackButton href='/'>{t('title.room-details')}</BackButton>

      <section>
        <div className='relative min-h-[260px] w-full'>
          <Image
            src='/images/hotel/room-1.webp'
            className='z-0'
            alt='room'
            fill
          />
          <Typography
            variant='xs'
            weight='medium'
            className='z-20 flex h-[21px] w-[52px] items-center justify-center rounded bg-neutral-500 bg-opacity-60 text-center text-white'
          >
            1/26
          </Typography>
        </div>
      </section>

      <Wrapper className='px-4'>
        <section className='pt-6'>
          <Typography variant='h1'>
            {room.name[i18n.language] ?? room.name.es}
          </Typography>
          <Typography variant='sm'>{`Max ${room.maxCapacity} ${t(
            'person.plural',
          )} • ${room.description}`}</Typography>
        </section>

        <hr />

        <section>
          <Typography variant='h2' weight='normal'>
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
        </section>

        <hr />

        <section>
          <Typography variant='h2' weight='normal'>
            {t('title.my-trip')}
          </Typography>
          <div className='flex flex-wrap justify-between py-2'>
            <div>
              <Typography
                variant='sm'
                weight='semibold'
                className='text-neutral-400'
              >
                {t('date.plural')}
              </Typography>
              <Typography variant='sm' className='text-neutral-500'>
                07 may 2023 - 11 may 2023
              </Typography>
            </div>
            <Typography variant='sm' className='text-neutral-500 underline'>
              {t('title.edit')}
            </Typography>
          </div>
          <div className='flex flex-wrap justify-between py-2'>
            <div>
              <Typography
                variant='sm'
                weight='semibold'
                className='text-neutral-400'
              >
                {t('guest.plural')}
              </Typography>
              <Typography variant='sm' className='text-neutral-500'>
                2 {t('guest.adult.plural')}
              </Typography>
            </div>
            <Typography variant='sm' className='text-neutral-500 underline'>
              {t('title.edit')}
            </Typography>
          </div>
        </section>

        <hr />

        <section>
          <Typography variant='h2' weight='normal'>
            {t('title.price-details')}
          </Typography>
          <div className='flex flex-wrap justify-between py-3'>
            <Typography variant='sm' className='text-neutral-500'>
              $ 100.00 x 4 noches
            </Typography>

            <Typography variant='sm' className='text-neutral-500'>
              $ 400.00
            </Typography>
          </div>
          <div className='flex flex-wrap justify-between pb-0 pt-2'>
            <div>
              <Typography
                variant='sm'
                weight='semibold'
                className='text-neutral-400'
              >
                Políticas de cancelación
              </Typography>
            </div>
          </div>
          <div className='flex flex-wrap justify-between py-1'>
            <Radio label='No reembolsable' />
            <Typography variant='sm' className='text-neutral-500'>
              +$ 0.00
            </Typography>
          </div>
          <div className='flex flex-wrap justify-between py-1'>
            <Radio
              label='Reembolsable'
              subtitle='Cancelación gratuita antes de las 15:00 del 5 agosto'
            />
            <Typography variant='sm' className='text-neutral-500'>
              +$ 0.00
            </Typography>
          </div>

          <div className='flex flex-wrap justify-between pb-0 pt-2'>
            <div>
              <Typography
                variant='sm'
                weight='semibold'
                className='text-neutral-400'
              >
                Extras
              </Typography>
            </div>
          </div>

          <div className='flex flex-wrap justify-between py-1'>
            <Toggle label='Desayuno' />
            <Typography variant='sm' className='text-neutral-500'>
              +$ 10.00
            </Typography>
          </div>

          <div className='flex flex-wrap justify-between pb-0 pt-4'>
            <div>
              <Typography
                variant='sm'
                weight='semibold'
                className='text-neutral-400'
              >
                Impuestos
              </Typography>
            </div>
          </div>

          <div className='flex flex-wrap justify-between py-1'>
            <Typography variant='xs' className='w-3/4 text-neutral-500'>
              Los impuestos deben ser pagados a tu llegada al hotel
            </Typography>

            <Typography variant='sm' className='text-neutral-500'>
              +$ 50.00
            </Typography>
          </div>

          <div className='flex flex-wrap justify-between py-3'>
            <Typography variant='sm' className='font-semibold text-neutral-500'>
              Total (USD)
            </Typography>

            <Typography variant='sm' className='font-semibold text-neutral-500'>
              $ 450.00
            </Typography>
          </div>

          <div className='flex flex-wrap justify-between py-3'>
            <Button
              className='w-full font-semibold'
              variant='primary'
              type='link'
              href={`/room-type/${roomTypeId}/details?show=auth`}
              fullWidth
            >
              Proceder al pago
            </Button>
          </div>
        </section>

        <hr />

        <section>
          <div className='py-2'>
            <Typography variant='h2' weight='normal'>
              Políticas de cancelación
            </Typography>
            <div className='my-3' />
            <Typography variant='sm' className='text-neutral-500'>
              No reembolsable
            </Typography>
          </div>
        </section>

        <section>
          <div className='py-5'>
            <Typography variant='h2' weight='normal'>
              Detalles de los impuestos
            </Typography>
            <div className='my-3' />
            <Typography variant='sm' className='text-neutral-500'>
              Los impuestos deben ser pagados a tu llegada al hotel
            </Typography>
          </div>
        </section>

        <section>
          <div className='py-4 pb-7'>
            <Typography variant='h2' weight='normal'>
              Reglas del hotel
            </Typography>

            <div className='my-4'>
              {data.rules.map((rule, key) => (
                <div
                  key={`$rules-${key}`}
                  className='flex justify-between py-2'
                >
                  <Typography>{rule.name}</Typography>
                  <Typography weight='light'>{rule.description}</Typography>
                </div>
              ))}
            </div>

            <Typography weight='semibold' className='underline'>
              Mostrar más
            </Typography>
          </div>
        </section>
      </Wrapper>

      <Footer />
    </Container>
  );
}
