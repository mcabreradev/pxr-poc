/* eslint-disable simple-import-sort/imports */
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import useQueryString from '@/hooks/use-querystring';
import { cn, ps } from '@/lib/utils';

import useSearchParamOrStore from '@/hooks/use-search-param-or-store';
import useReservationStore from '@/store/use-reservation-persist.store';

import Button from '@/components/button';
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

export default function DropdownComponent({ className }: Props) {
  const { t } = useTranslation();
  const { updateQueryString } = useQueryString();
  const { setReservation } = useReservationStore();
  const [open, setOpen] = useState(false);
  const { getAdults, getChildrens, getInfants } = useSearchParamOrStore();

  const [adults, setAdults] = useState(getAdults() || TOTAL_ADULTS_DEFAULT);
  const [childrens, setChildrens] = useState(
    getChildrens() || TOTAL_CHILDRENS_DEFAULT,
  );
  const [infants, setInfants] = useState(getInfants() || TOTAL_INFANTS_DEFAULT);

  const onClick = useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, []);

  const onMouseLeave = useCallback(() => {
    if (open) setOpen(!open);
  }, [open]);

  return (
    <Container className={cn(className)} data-testid='test-dropdown-element'>
      <div className={cn('dropdown relative inline-block w-full text-left')}>
        <Button
          className={cn('border-white py-[8px] md:w-full')}
          variant='secondary'
          type='button'
          onClick={onClick}
        >
          <div className='flex items-center justify-between'>
            <div className='flex flex-col items-start'>
              <Typography variant='sm2'>{t('info.guest')}</Typography>
              <Typography variant='sm2' className='text-left text-neutral-300'>
                {adults > 0 && `${adults} ${t('adult.' + ps(adults))}`}
                {childrens > 0 &&
                  `, ${childrens} ${t('children.' + ps(childrens))}`}
                {infants > 0 && `, ${infants} ${t('infant.' + ps(infants))}`}
              </Typography>
            </div>

            <Icon
              variant='arrow-up'
              width={24}
              color='#797979'
              className={cn('transform transition-transform duration-200', {
                'rotate-180': open,
                'rotate-0': !open,
              })}
            />
          </div>
        </Button>

        <div
          className={cn('origin-top-right transition-all duration-300', {
            'block scale-95 opacity-0': !open,
            hidden: !open,
          })}
          onBlur={onMouseLeave}
        >
          <div
            className={cn(
              'absolute right-0 w-full origin-top-right rounded-b-md  border-[1px] border-solid border-neutral-60 bg-white text-black shadow-lg outline-none',
            )}
          >
            <div className='flex items-center justify-between px-6 py-3'>
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
            <div className='flex items-center justify-between px-6 py-3'>
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
            <div className='flex items-center justify-between px-6 py-3'>
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
