/* eslint-disable simple-import-sort/imports */
import { useTranslation } from 'react-i18next';

import { useClickAway } from '@/hooks';
import { cn, ps } from '@/lib/utils';

import { Icon, Typography } from '@/components';
import { SetStateAction } from 'react';

type GuestsComponentProps = {
  adults: number;
  childrens: number;
  infants: number;
  setShowHandler: (value: string | null) => void;
  setAdults: (value: SetStateAction<number>) => void;
  setChildrens: (value: SetStateAction<number>) => void;
  setInfants: (value: SetStateAction<number>) => void;
  adultsBlockedCondition: boolean;
  childrensBlockedCondition: boolean;
  infantsBlockedCondition: boolean;
  maxCapacity: number | undefined;
};

export default function GuestsDataComponent({
  adults,
  childrens,
  infants,
  setShowHandler,
  setAdults,
  setChildrens,
  setInfants,
  adultsBlockedCondition,
  childrensBlockedCondition,
  infantsBlockedCondition,
  maxCapacity,
}: GuestsComponentProps) {
  const { t } = useTranslation();
  const refView = useClickAway(() => {
    setShowHandler(null);
  });

  return (
    <div className='rounded-[24px] border-solid border-white bg-white drop-shadow'>
      <div className='m-2 my-4 flex-none pl-4 pt-5 '>
        <Typography variant='h1'>Cuantos viajan contigo?</Typography>

        <Typography variant='sm2' className='text-left text-neutral-300'>
          {adults > 0 && `${adults} ${t('adult.' + ps(adults))}`}
          {childrens > 0 && `, ${childrens} ${t('children.' + ps(childrens))}`}
          {infants > 0 && `, ${infants} ${t('infant.' + ps(infants))}`}
        </Typography>
      </div>
      <div
        ref={refView}
        className='right-0 w-full origin-top-right rounded-[24px] border-solid  border-white bg-white p-6 text-black outline-none drop-shadow-xl'
      >
        <div className='flex items-center justify-between'>
          <div className='flex flex-col items-start'>
            <Typography variant='sm'>{t('adult.plural')}</Typography>
            <Typography variant='sm' className='text-neutral-300'>
              {t('info.13years-or-more')}
            </Typography>
          </div>
          <div className='flex flex-row items-center justify-between'>
            <Icon
              variant='minus'
              width={20}
              color={adults === 1 ? '#d5d3d3' : '#797979'}
              className={cn(
                adults === 1 ? 'cursor-not-allowed' : 'cursor-pointer',
              )}
              onClick={() => {
                if (adults === 1) return;
                setAdults((pre) => pre - 1);
              }}
            />
            <Typography variant='sm' className='w-6 text-center'>
              {adults}
            </Typography>
            <Icon
              variant='plus'
              width={20}
              color={adultsBlockedCondition ? '#d5d3d3' : '#797979'}
              className={cn(
                adultsBlockedCondition
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer',
              )}
              onClick={() => {
                if (adultsBlockedCondition) return;
                setAdults((pre) => pre + 1);
              }}
            />
          </div>
        </div>
        <div className='flex items-center justify-between py-3'>
          <div className='flex flex-col items-start'>
            <Typography variant='sm'>{t('children.plural')}</Typography>
            <Typography variant='sm' className='text-neutral-300'>
              {t('info.2to12')}
            </Typography>
          </div>
          <div className='flex flex-row items-center justify-between'>
            <Icon
              variant='minus'
              width={20}
              color={childrens === 0 ? '#d5d3d3' : '#797979'}
              className={cn(
                childrens === 0 ? 'cursor-not-allowed' : 'cursor-pointer',
              )}
              onClick={() => {
                if (childrens === 0) return;
                setChildrens((pre) => pre - 1);
              }}
            />
            <Typography variant='sm' className='w-6 text-center'>
              {childrens}
            </Typography>
            <Icon
              variant='plus'
              width={20}
              color={childrensBlockedCondition ? '#d5d3d3' : '#797979'}
              className={cn(
                childrensBlockedCondition
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer',
              )}
              onClick={() => {
                if (childrensBlockedCondition) return;
                setChildrens((pre) => pre + 1);
              }}
            />
          </div>
        </div>
        <div className='flex items-center justify-between pb-3'>
          <div className='flex flex-col items-start'>
            <Typography variant='sm'>{t('infant.plural')}</Typography>
            <Typography variant='sm' className='text-neutral-300'>
              {t('info.under-2')}
            </Typography>
          </div>
          <div className='flex flex-row items-center justify-between'>
            <Icon
              variant='minus'
              width={20}
              color={infants === 0 ? '#d5d3d3' : '#797979'}
              className={cn(
                infants === 0 ? 'cursor-not-allowed' : 'cursor-pointer',
              )}
              onClick={() => {
                if (infants === 0) return;
                setInfants((pre) => pre - 1);
              }}
            />
            <Typography variant='sm' className='w-6 text-center'>
              {infants}
            </Typography>
            <Icon
              variant='plus'
              width={20}
              color={infantsBlockedCondition ? '#d5d3d3' : '#797979'}
              className={cn(
                infantsBlockedCondition
                  ? 'cursor-not-allowed'
                  : 'cursor-pointer',
              )}
              onClick={() => {
                if (infantsBlockedCondition) return;
                setInfants((pre) => pre + 1);
              }}
            />
          </div>
        </div>
        <Typography
          variant='xs2'
          className='flex items-start py-2 text-neutral-500'
        >
          {t('info.guest-room-max-allowed', { maxCapacity })}
        </Typography>
      </div>
    </div>
  );
}
