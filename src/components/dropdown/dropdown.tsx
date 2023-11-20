import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn, ps } from '@/lib/utils';

import Button from '@/components/button';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

interface Props {
  className?: string;
}

const Container = tw.div`
flex items-center justify-center
`;

export default function DropdownComponent({ className }: Props) {
  const [open, setOpen] = useState(false);
  const [adult, setAdult] = useState(2);
  const [children, setChildren] = useState(0);
  const [baby, setBaby] = useState(0);
  const { t } = useTranslation();

  const handleDropDown = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <Container className={cn(className)} data-testid='test-dropdown-element'>
      <div className=' dropdown relative inline-block w-full text-left'>
        <Button
          className='py-[8px] md:w-full'
          variant='secondary'
          type='button'
          onClick={handleDropDown}
        >
          <div className='flex items-center justify-between'>
            <div className='flex flex-col items-start'>
              <Typography variant='sm2'>{t('info.guest')}</Typography>
              <Typography variant='sm2' className='text-neutral-300'>
                {adult > 0 && `${adult} ${t('adult.' + ps(adult))}`}
                {children > 0 &&
                  `, ${children} ${t('children.' + ps(children))}`}
                {baby > 0 && `, ${baby} ${t('baby.' + ps(baby))}`}
              </Typography>
            </div>
            <Icon
              variant={open ? 'arrow-down' : 'arrow-up'}
              width={24}
              color='#797979'
            />
          </div>
        </Button>

        <div
          className={cn(
            'dropdown-menu origin-top-right transition-all duration-300',
            {
              'scale-95 opacity-0': !open,
            },
          )}
        >
          <div className='absolute right-0 w-full origin-top-right rounded-b-md border-[1px] border-solid border-neutral-60 bg-white text-black shadow-lg outline-none'>
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
                  color='#797979'
                  className='cursor-pointer'
                  onClick={() => {
                    if (adult === 1) return;
                    setAdult(adult - 1);
                  }}
                />
                <Typography variant='sm2' className='w-6 text-center'>
                  {adult}
                </Typography>
                <Icon
                  variant='plus'
                  width={20}
                  color='#797979'
                  className='cursor-pointer'
                  onClick={() => {
                    if (adult === 8) return;
                    setAdult(adult + 1);
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
                  color='#797979'
                  className='cursor-pointer'
                  onClick={() => {
                    if (children === 0) return;
                    setChildren(children - 1);
                  }}
                />
                <Typography variant='sm2' className='w-6 text-center'>
                  {children}
                </Typography>
                <Icon
                  variant='plus'
                  width={20}
                  color='#797979'
                  className='cursor-pointer'
                  onClick={() => {
                    if (children === 8) return;
                    setChildren(children + 1);
                  }}
                />
              </div>
            </div>
            <div className='flex items-center justify-between px-6 py-3'>
              <div className='flex flex-col items-start'>
                <Typography variant='sm2'>{t('baby.plural')}</Typography>
                <Typography variant='sm2' className='text-neutral-300'>
                  {t('info.under-2')}
                </Typography>
              </div>
              <div className='flex flex-row items-center justify-between'>
                <Icon
                  variant='minus'
                  width={20}
                  color='#797979'
                  className='cursor-pointer'
                  onClick={() => {
                    if (baby === 0) return;
                    setBaby(baby - 1);
                  }}
                />
                <Typography variant='sm2' className='w-6 text-center'>
                  {baby}
                </Typography>
                <Icon
                  variant='plus'
                  width={20}
                  color='#797979'
                  className='cursor-pointer'
                  onClick={() => {
                    if (baby === 8) return;
                    setBaby(baby + 1);
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
