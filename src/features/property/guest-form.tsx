/* eslint-disable simple-import-sort/imports */
import { yupResolver } from '@hookform/resolvers/yup';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { DateRangePicker } from 'react-next-dates';
import tw from 'tailwind-styled-components';

import useLocale from '@/hooks/use-locale';
import { createQueryString } from '@/lib/url';
import { cn, formatDate, reFormatDate } from '@/lib/utils';

import Button from '@/components/button';
import Icon from '@/components/icon';
import Typography from '@/components/typography';
import Dropdown from './dropdown';

import { CHECKIN, CHECKOUT } from '@/constants';
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
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { t } = useTranslation();
  const { locale } = useLocale();

  const checkin = formatDate(searchParams.get(CHECKIN));
  const [startDate, setStartDate] = useState<Date | null>(
    checkin ? new Date(checkin) : new Date(),
  );

  const checkout = formatDate(searchParams.get(CHECKOUT));
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

  const updateQueryString = useCallback(
    (key: string, value: string) => {
      router.replace(
        `${pathname}?${createQueryString(searchParams, key, value.toString())}`,
        { scroll: false },
      );
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (!checkin) return;
    updateQueryString(CHECKIN, reFormatDate(startDate?.toString()) || '');
  }, [checkin, startDate, updateQueryString]);

  useEffect(() => {
    if (!startDate) return;
    updateQueryString(CHECKIN, reFormatDate(startDate?.toString()) || '');
  }, [startDate, updateQueryString]);

  useEffect(() => {
    if (!checkout) return;
    updateQueryString(CHECKOUT, reFormatDate(endDate?.toString()) || '');
  }, [checkout, endDate, updateQueryString]);

  useEffect(() => {
    if (!endDate) return;
    updateQueryString(CHECKOUT, reFormatDate(endDate?.toString()) || '');
  }, [endDate, updateQueryString]);

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

        <Typography variant='sm' weight='semibold' className='mb-4'>
          Desde $100.00 x noche
        </Typography>

        <Button
          type='button'
          scroll={true}
          className='mb-4 md:mb-0 md:w-full'
          onClick={() => null}
        >
          {t('button.choose-room')}
        </Button>
      </form>
    </Container>
  );
}
