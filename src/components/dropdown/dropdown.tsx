import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

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
  return (
    <Container className={cn(className)} data-testid='test-element'>
      <div className=' dropdown relative inline-block w-full text-left'>
        <Button className='md:w-full' variant='secondary' type='button'>
          <div className='flex items-center justify-between'>
            <div className='flex flex-col items-start'>
              <Typography variant='sm2'>Huespedes</Typography>
              <Typography variant='sm2' className='text-neutral-300'>
                2 adultos, 3 niños, 1 bebé
              </Typography>
            </div>
            <Icon variant='arrow' width={24} color='#797979' />
          </div>
        </Button>

        <div className='dropdown-menu invisible origin-top-right -translate-y-2 scale-95 transform opacity-0 transition-all duration-300'>
          <div
            className='absolute right-0 w-full origin-top-right divide-y divide-gray-100 rounded-b-md border-[1px] border-solid border-neutral-60 bg-white text-black shadow-lg outline-none'
            aria-labelledby='headlessui-menu-button-1'
            id='headlessui-menu-items-117'
            role='menu'
          >
            <div className='px-4 py-3'>
              <p className='text-sm leading-5'>Signed in as</p>
              <p className='truncate text-sm font-medium leading-5 text-gray-900'>
                tom@example.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}
