/* eslint-disable simple-import-sort/imports */
import { AnimatePresence, motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

import { cn } from '@/lib/utils';

import Button from '@/components/button';
import Typography from '@/components/typography';
import DatepickerDesktop from './datepicker/desktop-datepicker';
import Dropdown from './dropdown';

import { useIntersectionObserver, useSubscribeToStore } from '@/hooks';
import { useGlobalStore } from '@/store';
import { useCallback, useEffect, useState } from 'react';

export default function GuestFormComponent({ showButton }) {
  const { t } = useTranslation();
  const { setGuestFormIntersecting } = useGlobalStore();

  const [isIntersected, setIntersected] = useState<boolean | undefined>(false);

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

      <DatepickerDesktop />

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
