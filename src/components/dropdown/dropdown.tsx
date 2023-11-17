import { useCallback, useState } from 'react';
import tw from 'tailwind-styled-components';

import { cn, p } from '@/lib/utils';

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
  const [adults, setAdults] = useState(0);
  const [childrens, setChildrens] = useState(0);
  const [babys, setBabys] = useState(0);

  const handleDropDown = useCallback(() => {
    setOpen(!open);
  }, [open]);

  return (
    <Container className={cn(className)} data-testid='test-dropdown-element'>
      <div className=' dropdown relative inline-block w-full text-left'>
        <Button
          className='md:w-full'
          variant='secondary'
          type='button'
          onClick={handleDropDown}
          onBlur={handleDropDown}
        >
          <div className='flex items-center justify-between'>
            <div className='flex flex-col items-start'>
              <Typography variant='sm2'>Huespedes</Typography>
              <Typography variant='sm2' className='text-neutral-300'>
                {adults > 0 && `${adults} ${p('adulto', adults)}`}
                {childrens > 0 && `, ${childrens} ${p('niño', childrens)}`}
                {babys > 0 && `, ${babys} ${p('bebé', babys)}`}
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
                <Typography variant='sm2'>adultos</Typography>
                <Typography variant='sm2' className='text-neutral-300'>
                  13 años o más
                </Typography>
              </div>
              <div className='flex flex-row items-center justify-between'>
                <Icon
                  variant='minus'
                  width={20}
                  color='#797979'
                  className='cursor-pointer'
                  onClick={() => {
                    if (adults === 0) return;
                    setAdults(adults - 1);
                  }}
                />
                <Typography variant='sm2' className='w-6 text-center'>
                  {adults}
                </Typography>
                <Icon
                  variant='plus'
                  width={20}
                  color='#797979'
                  className='cursor-pointer'
                  onClick={() => {
                    if (adults === 8) return;
                    setAdults(adults + 1);
                  }}
                />
              </div>
            </div>
            <div className='flex items-center justify-between px-6 py-3'>
              <div className='flex flex-col items-start'>
                <Typography variant='sm2'>niños</Typography>
                <Typography variant='sm2' className='text-neutral-300'>
                  2 a 12 años
                </Typography>
              </div>
              <div className='flex flex-row items-center justify-between'>
                <Icon
                  variant='minus'
                  width={20}
                  color='#797979'
                  className='cursor-pointer'
                  onClick={() => {
                    if (childrens === 0) return;
                    setChildrens(childrens - 1);
                  }}
                />
                <Typography variant='sm2' className='w-6 text-center'>
                  {childrens}
                </Typography>
                <Icon
                  variant='plus'
                  width={20}
                  color='#797979'
                  className='cursor-pointer'
                  onClick={() => {
                    if (childrens === 8) return;
                    setChildrens(childrens + 1);
                  }}
                />
              </div>
            </div>
            <div className='flex items-center justify-between px-6 py-3'>
              <div className='flex flex-col items-start'>
                <Typography variant='sm2'>bebes</Typography>
                <Typography variant='sm2' className='text-neutral-300'>
                  menos de 2 años
                </Typography>
              </div>
              <div className='flex flex-row items-center justify-between'>
                <Icon
                  variant='minus'
                  width={20}
                  color='#797979'
                  className='cursor-pointer'
                  onClick={() => {
                    if (babys === 0) return;
                    setBabys(babys - 1);
                  }}
                />
                <Typography variant='sm2' className='w-6 text-center'>
                  {babys}
                </Typography>
                <Icon
                  variant='plus'
                  width={20}
                  color='#797979'
                  className='cursor-pointer'
                  onClick={() => {
                    if (babys === 8) return;
                    setBabys(babys + 1);
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
