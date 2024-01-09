/* eslint-disable simple-import-sort/imports */
import { yupResolver } from '@hookform/resolvers/yup';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DateRangePicker } from 'react-next-dates';
import tw from 'tailwind-styled-components';

import useLocale from '@/hooks/use-locale';
import { cn, formatDate, reFormatDate } from '@/lib/utils';

import Button from '@/components/button';
import Icon from '@/components/icon';
import Typography from '@/components/typography';
import Dropdown from './dropdown';

import useQueryString from '@/hooks/use-querystring';
import useSearchParamOrStore from '@/hooks/use-search-param-or-store';
import useReservationStore from '@/store/use-reservation-persist.store';
import useSelectedRoomtypeStore from '@/store/use-selected-roomtype.store';

import { CHECKIN, CHECKOUT } from '@/constants';
import { formatCurrency } from '@/lib/number';
import { selectRoomSchema } from '@/schemas';

interface Props {
  className?: string;
}
interface IForm {
  startDate: string;
  endDate: string;
  guests: string;
}

const Container = tw.div`
sticky bottom-0 top-5 ml-5 mt-5 box-border flex h-min w-full flex-col rounded border-[1px] border-solid border-neutral-50 bg-white p-5 drop-shadow-lg`;

export default function GuestFormComponent({ className }: Props) {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { setReservation } = useReservationStore();
  const { selectedRoom } = useSelectedRoomtypeStore();
  const { updateQueryString } = useQueryString();
  const { getCheckin, getCheckout } = useSearchParamOrStore();

  const today = dayjs();
  const checkin = formatDate(getCheckin());
  const [startDate, setStartDate] = useState<Date | null>(
    checkin ? new Date(checkin) : today.toDate(),
  );

  const tomorrow = today.add(1, 'day').toDate();
  const checkout = formatDate(getCheckout());
  const [endDate, setEndDate] = useState<Date | null>(
    checkout ? new Date(checkout) : tomorrow,
  );

  const {
    // register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: yupResolver(selectRoomSchema()),
  });

  const onSubmit: SubmitHandler<IForm> = useCallback((data) => {
    // eslint-disable-next-line no-console
    console.log(data);
  }, []);

  useEffect(() => {
    if (!startDate || !endDate) return;
    updateQueryString({
      [CHECKIN]: reFormatDate(startDate),
      [CHECKOUT]: reFormatDate(endDate),
    });
    setReservation({
      checkin: reFormatDate(startDate),
      checkout: reFormatDate(endDate),
    });
  }, [endDate, setReservation, startDate, updateQueryString]);

  return (
    <Container className={cn(className)}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Typography variant='sm' weight='semibold' className='mb-4'>
          {`${t('checkin')} - ${t('checkout')}`}
        </Typography>

        <DateRangePicker
          locale={locale}
          startDate={startDate}
          endDate={endDate}
          minLength={1}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          portalContainer={document.body}
        >
          {({ startDateInputProps, endDateInputProps }) => (
            <div className='flex flex-row gap-0'>
              <div className='relative'>
                <input
                  {...startDateInputProps}
                  placeholder='dd/mm/yyyy'
                  className={cn(
                    'form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm placeholder:text-neutral-300 focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200',
                    {
                      'border-warning-500 focus:border-warning-500 focus:ring-warning-300':
                        !startDate,
                    },
                  )}
                />
                <span
                  className={cn(
                    'absolute bottom-0 right-0 mb-[13px] mr-4 hidden',
                    {
                      block: !startDate,
                    },
                  )}
                >
                  <Icon
                    variant='exclamation'
                    width={12}
                    height={12}
                    color='#f79009'
                  />
                </span>
              </div>
              <div className='relative'>
                <input
                  {...endDateInputProps}
                  placeholder='dd/mm/yyyy'
                  className={cn(
                    'form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm leading-normal placeholder:text-sm placeholder:text-neutral-300 focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200',
                    {
                      'border-warning-500 focus:border-warning-500 focus:ring-warning-300':
                        !endDate,
                    },
                  )}
                />
                <span
                  className={cn(
                    'absolute bottom-0 right-0 mb-[13px] mr-4 hidden',
                    {
                      block: !endDate,
                    },
                  )}
                >
                  <Icon
                    variant='exclamation'
                    width={12}
                    height={12}
                    color='#f79009'
                  />
                </span>
              </div>
            </div>
          )}
        </DateRangePicker>

        <span className='text-warning-600'>
          {errors.startDate && errors.startDate.message}
        </span>

        <Typography variant='sm' weight='semibold' className='my-4'>
          {t('info.guest')}
        </Typography>

        <Dropdown />

        <hr />

        {selectedRoom.roomPrice && (
          <Typography variant='sm' weight='semibold' className='mb-4'>
            Desde {`${formatCurrency(Number(selectedRoom.roomPrice) ?? 0)}`} x
            noche
          </Typography>
        )}

        <Button
          type='link'
          href={`/room-type/${selectedRoom.id}`}
          scroll={true}
          className='mb-4 md:mb-0 md:w-full'
          disabled={!selectedRoom.roomPrice}
          withSearchParams={true}
        >
          {t('button.choose-room')}
        </Button>
      </form>
    </Container>
  );
}
