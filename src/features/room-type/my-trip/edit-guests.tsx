/* eslint-disable simple-import-sort/imports */
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import useQueryString from '@/hooks/use-querystring';
import { cn, ps } from '@/lib/utils';

import useReservationQueryStore from '@/store/use-reservation-persist.store';

import Icon from '@/components/icon';
import Typography from '@/components/typography';

import Button from '@/components/button';
import {
  TOTAL_ADULTS,
  TOTAL_ADULTS_DEFAULT,
  TOTAL_CHILDRENS,
  TOTAL_CHILDRENS_DEFAULT,
  TOTAL_INFANTS,
  TOTAL_INFANTS_DEFAULT,
} from '@/constants';
import useSearchParamOrStore from '@/hooks/use-search-param-or-store';
import useSelectedRoomtypeStore from '@/store/use-selected-roomtype.store';

interface Props {
  className?: string;
  onClose?: () => void;
}

const Container = tw.div`
flex items-center justify-center
`;

export default function EditGuestsComponent({ className, onClose }: Props) {
  const { t } = useTranslation();
  const { updateQueryString } = useQueryString();
  const { setReservation } = useReservationQueryStore();
  const {
    selectedRoom,
    selectedRoom: { minCapacity, maxCapacity, childCapacity },
  } = useSelectedRoomtypeStore();

  const [adults, setAdults] = useState(TOTAL_ADULTS_DEFAULT);
  const [childrens, setChildrens] = useState(TOTAL_CHILDRENS_DEFAULT);
  const [infants, setInfants] = useState(TOTAL_INFANTS_DEFAULT);

  const { getAdults, getChildrens, getInfants } = useSearchParamOrStore();

  useEffect(() => {
    setAdults(getAdults() || minCapacity || TOTAL_ADULTS_DEFAULT);
    setChildrens(getChildrens() || TOTAL_CHILDRENS_DEFAULT);
    setInfants(getInfants() || TOTAL_INFANTS_DEFAULT);
  }, [getAdults, getChildrens, getInfants, minCapacity, selectedRoom]);

  const totalGuests = adults + childrens + infants;
  const isMaxCapacityReached = totalGuests >= (maxCapacity ?? 0);
  const adultsBlockedCondition = isMaxCapacityReached;
  const childrensBlockedCondition = !childCapacity && isMaxCapacityReached;
  const infantsBlockedCondition = !childCapacity && isMaxCapacityReached;

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
                  color={adultsBlockedCondition ? '#d5d3d3' : '#797979'}
                  className={cn(
                    adultsBlockedCondition
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer',
                  )}
                  onClick={() => {
                    if (adultsBlockedCondition) return;
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
                    setInfants(childrens - 1);
                    updateQueryString({ [TOTAL_CHILDRENS]: childrens - 1 });
                    setReservation({ childrens: childrens - 1 });
                  }}
                />
                <Typography variant='sm2' className='w-6 text-center'>
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
                  color={infantsBlockedCondition ? '#d5d3d3' : '#797979'}
                  className={cn(
                    infantsBlockedCondition
                      ? 'cursor-not-allowed'
                      : 'cursor-pointer',
                  )}
                  onClick={() => {
                    if (infantsBlockedCondition) return;
                    setInfants(infants + 1);
                    updateQueryString({ [TOTAL_INFANTS]: infants + 1 });
                    setReservation({ infants: infants + 1 });
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

            <div className='flex place-content-end px-1 py-1'>
              <Button
                className={cn('font-medium')}
                variant='text'
                type='button'
                onClick={onClose}
              >
                {t('button.close')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
