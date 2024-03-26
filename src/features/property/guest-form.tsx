/* eslint-disable simple-import-sort/imports */
import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import {
  useIntersectionObserver,
  useSearchParamOrStore,
  useSubscribeToStore,
} from '@/hooks';
import { getFormatedMontsDays } from '@/lib/time';
import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Typography from '@/components/typography';

import { useDatepickerStore, useGlobalStore } from '@/store';

import Dropdown from './dropdown';

export default function GuestFormComponent({ showButton }) {
  const { t } = useTranslation();
  const { setGuestFormIntersecting } = useGlobalStore();
  const { checkinDate, checkoutDate } = useSearchParamOrStore();
  const [isIntersected, setIntersected] = useState<boolean | undefined>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { openDatepickerDrawer } = useDatepickerStore();

  const formatedDate = useMemo(
    () => getFormatedMontsDays(checkinDate, checkoutDate),
    [checkinDate, checkoutDate],
  );

  const { ref, entry } = useIntersectionObserver({
    threshold: 1,
    root: null,
    rootMargin: '160px',
  });

  useSubscribeToStore(useGlobalStore, ({ gallery }) => {
    setIntersected(gallery?.isIntersecting);
  });

  useEffect(() => {
    if (entry && 'isIntersecting' in entry) {
      setGuestFormIntersecting(entry.isIntersecting);
    }
  }, [entry, setGuestFormIntersecting]);

  const handleClick = useCallback(() => {
    const element = document.getElementById('rooms');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
    }
  }, []);

  return (
    <div
      className={cn(
        'sticky bottom-0 top-28 ml-5 mt-5 box-border flex h-min w-full flex-col rounded border-[1px] border-solid border-neutral-50 bg-white p-5 drop-shadow-lg',
      )}
      ref={ref}
    >
      {isIntersected}
      <Typography variant='sm' weight='semibold' className='mb-4'>
        {`${t('checkin')} - ${t('checkout')}`}
      </Typography>

      <input
        type='text'
        name='datepicker'
        value={formatedDate}
        onClick={openDatepickerDrawer}
        readOnly
        ref={inputRef}
        placeholder='dd/mm/yyyy'
        className={cn(
          'form-input block w-full appearance-none rounded border-[0.5px] border-neutral-60 px-4 py-2 text-sm lowercase leading-normal placeholder:text-sm placeholder:text-neutral-300 focus:border-neutral-200 focus:outline-none focus:ring-1 focus:ring-neutral-200',
        )}
      />

      <Typography variant='sm' weight='semibold' className='my-4'>
        {t('info.guest')}
      </Typography>

      <Dropdown />

      {/* {ratesPlan && (
        <Typography variant='sm' weight='semibold' className='mb-4'>
          Desde{' '}
          {`${formatCurrency(
            ratesPlan[0]?.amountBeforeTax ?? NaN, // change to rate or amountBeforeTax
            ratesPlan[0]?.currency ?? PROPERTY_CURRENCY,
          )}`}{' '}
          x noche
        </Typography>
      )} */}

      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            <hr />
            <Button
              type='button'
              className='mb-4 md:mb-0 md:w-full'
              onClick={handleClick}
            >
              {t('button.choose-room')}
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
