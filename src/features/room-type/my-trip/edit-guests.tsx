/* eslint-disable simple-import-sort/imports */
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import useQueryString from '@/hooks/use-querystring';
import { cn, ps } from '@/lib/utils';

import useReservationStore from '@/store/use-reservation-persist.store';

import Icon from '@/components/icon';
import Typography from '@/components/typography';

import {
  TOTAL_ADULTS,
  TOTAL_ADULTS_DEFAULT,
  TOTAL_CHILDRENS,
  TOTAL_CHILDRENS_DEFAULT,
  TOTAL_INFANTS,
  TOTAL_INFANTS_DEFAULT,
} from '@/constants';

interface Props {
  className?: string;
}

const Container = tw.div`
flex items-center justify-center
`;

export default function EditGuestsComponent({ className }: Props) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const { updateQueryString } = useQueryString();
  const { setReservation } = useReservationStore();

  const [adults, setAdults] = useState(
    Number(searchParams.get(TOTAL_ADULTS)) || TOTAL_ADULTS_DEFAULT,
  );
  const [childrens, setChildrens] = useState(
    Number(searchParams.get(TOTAL_CHILDRENS)) || TOTAL_CHILDRENS_DEFAULT,
  );
  const [infants, setInfants] = useState(
    Number(searchParams.get(TOTAL_INFANTS)) || TOTAL_INFANTS_DEFAULT,
  );

  return (
    <Container className={cn(className)} data-testid='test-dropdown-element'>
      <div className={cn('inline-block w-full text-left')}>
        <div className='flex flex-col items-start pb-4'>
          <Typography variant='sm' weight='semibold' className='mb-4'>
            {t('info.guest')}
          </Typography>
          <Typography variant='sm2' className='text-left text-neutral-300'>
            {adults > 0 && `${adults} ${t('adult.' + ps(adults))}`}
            {childrens > 0 &&
              `, ${childrens} ${t('children.' + ps(childrens))}`}
            {infants > 0 && `, ${infants} ${t('infant.' + ps(infants))}`}
          </Typography>
        </div>

        <div>
          <div className='right-0 w-full origin-top-right bg-white text-black  outline-none'>
            <div className='flex items-center justify-between'>
              <div className='flex flex-col items-start'>
                <Typography variant='sm2'>{t('adult.plural')}</Typography>
                <Typography variant='sm2' className='text-neutral-300'>
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
                    setAdults(adults - 1);
                    updateQueryString({ [TOTAL_ADULTS]: adults - 1 });
                    setReservation({ adults: adults - 1 });
                  }}
                />
                <Typography variant='sm2' className='w-6 text-center'>
                  {adults}
                </Typography>
                <Icon
                  variant='plus'
                  width={20}
                  color={adults === 8 ? '#d5d3d3' : '#797979'}
                  className={cn(
                    adults === 8 ? 'cursor-not-allowed' : 'cursor-pointer',
                  )}
                  onClick={() => {
                    if (adults === 8) return;
                    setAdults(adults + 1);
                    updateQueryString({ [TOTAL_ADULTS]: adults + 1 });
                    setReservation({ adults: adults + 1 });
                  }}
                />
              </div>
            </div>
            <div className='flex items-center justify-between py-3'>
              <div className='flex flex-col items-start'>
                <Typography variant='sm2'>{t('children.plural')}</Typography>
                <Typography variant='sm2' className='text-neutral-300'>
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
                    setChildrens(childrens - 1);
                    updateQueryString({
                      [TOTAL_CHILDRENS]: childrens - 1,
                    });
                    setReservation({ childrens: childrens - 1 });
                  }}
                />
                <Typography variant='sm2' className='w-6 text-center'>
                  {childrens}
                </Typography>
                <Icon
                  variant='plus'
                  width={20}
                  color={childrens === 8 ? '#d5d3d3' : '#797979'}
                  className={cn(
                    childrens === 8 ? 'cursor-not-allowed' : 'cursor-pointer',
                  )}
                  onClick={() => {
                    if (childrens === 8) return;
                    setChildrens(childrens + 1);
                    updateQueryString({
                      [TOTAL_CHILDRENS]: childrens + 1,
                    });
                    setReservation({ childrens: childrens + 1 });
                  }}
                />
              </div>
            </div>
            <div className='flex items-center justify-between pb-3'>
              <div className='flex flex-col items-start'>
                <Typography variant='sm2'>{t('infant.plural')}</Typography>
                <Typography variant='sm2' className='text-neutral-300'>
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
                    setInfants(infants - 1);
                    updateQueryString({ [TOTAL_INFANTS]: infants - 1 });
                    setReservation({ infants: infants - 1 });
                  }}
                />
                <Typography variant='sm2' className='w-6 text-center'>
                  {infants}
                </Typography>
                <Icon
                  variant='plus'
                  width={20}
                  color={infants === 8 ? '#d5d3d3' : '#797979'}
                  className={cn(
                    infants === 8 ? 'cursor-not-allowed' : 'cursor-pointer',
                  )}
                  onClick={() => {
                    if (infants === 8) return;
                    setInfants(infants + 1);
                    updateQueryString({ [TOTAL_INFANTS]: infants + 1 });
                    setReservation({ infants: infants + 1 });
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
