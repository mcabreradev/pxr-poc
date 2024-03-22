/* eslint-disable simple-import-sort/imports */
import { yupResolver } from '@hookform/resolvers/yup';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DateRangePicker } from 'react-next-dates';
import tw from 'tailwind-styled-components';

import useLocale from '@/hooks/use-locale';
import { formatDateToString, formatStringToDate } from '@/lib/time';
import { cn } from '@/lib/utils';

import Icon from '@/components/icon';
import Typography from '@/components/typography';

import useQueryString from '@/hooks/use-querystring';
import useReservationStore from '@/store/use-reservation.store';

import { CHECKIN, CHECKOUT } from '@/constants';
import { useSearchParamOrStore } from '@/hooks';
import useHydration from '@/hooks/use-hydration';
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
sticky bottom-0 box-border flex h-min w-full flex-col bg-white`;

export default function EditGuestsComponent({ className }: Props) {
  const { t } = useTranslation();
  const { locale } = useLocale();
  const { setReservation } = useReservationStore();
  const { updateQueryString } = useQueryString();
  const { getCheckin, getCheckout } = useSearchParamOrStore();

  const checkin = formatStringToDate(getCheckin());
  const [startDate, setStartDate] = useState<Date | null>(
    checkin ? new Date(checkin) : new Date(),
  );

  const checkout = formatStringToDate(getCheckout());
  const [endDate, setEndDate] = useState<Date | null>(
    checkout ? new Date(checkout) : null,
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
    if (!startDate) return;
    updateQueryString({
      [CHECKIN]: formatDateToString(startDate),
    });
    setReservation({
      checkin: formatDateToString(startDate),
    });
  }, [setReservation, startDate, updateQueryString]);

  useEffect(() => {
    if (!endDate) return;
    updateQueryString({
      [CHECKOUT]: formatDateToString(endDate),
    });
    setReservation({ checkout: formatDateToString(endDate) });
  }, [endDate, setReservation, updateQueryString]);

  const { isHydrated } = useHydration();
  if (!isHydrated) {
    return null;
  }

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
            <div className='flex flex-row gap-1'>
              <div className='relative grow'>
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
              <div className='relative grow'>
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
      </form>
    </Container>
  );
}
