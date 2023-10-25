'use client';

import { Dropdown } from 'flowbite-react';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import Icon from '@/components/icon';
import Typography from '@/components/typography';

interface Props {
  className?: string;
}

const Nav = tw.nav`
  container flex content-around items-center justify-between bg-white py-[35px] text-neutral-400
`;

export default function Navbar({ className }: Props) {
  return (
    <Nav className={cn(className)} data-testid='test-element'>
      <div></div>
      <div>
        <ul className='flex space-x-6'>
          <li className='cursor-pointer'>
            <Dropdown
              label={<Typography variant='sm'>$ USD</Typography>}
              inline
              size='lg'
            >
              <Dropdown.Item className='hover:bg-neutral-40 focus:bg-neutral-40'>
                <Typography variant='sm' className='w-32 text-left'>
                  $ USD
                </Typography>
              </Dropdown.Item>
              <Dropdown.Item className='hover:bg-neutral-40 focus:bg-neutral-40'>
                <Typography variant='sm' className='w-32 text-left'>
                  Euro
                </Typography>
              </Dropdown.Item>
              <Dropdown.Item className='hover:bg-neutral-40 focus:bg-neutral-40'>
                <Typography variant='sm' className='w-32 text-left'>
                  CLP
                </Typography>
              </Dropdown.Item>
            </Dropdown>
          </li>
          <li className='cursor-pointer'>
            <Dropdown
              label={<Icon variant='web' color='#959595' />}
              inline
              size='lg'
            >
              <Dropdown.Item
                className='hover:bg-neutral-40 focus:bg-neutral-40'
                size='lg'
              >
                <Typography variant='sm' className='w-32 text-left'>
                  Español
                </Typography>
              </Dropdown.Item>
              <Dropdown.Item
                className='hover:bg-neutral-40 focus:bg-neutral-40'
                size='lg'
              >
                <Typography variant='sm' className='w-32 text-left'>
                  Ingles
                </Typography>
              </Dropdown.Item>
            </Dropdown>
          </li>
          <li className='cursor-pointer hover:underline'>
            <Typography variant='sm'>Guest Login</Typography>
          </li>
        </ul>
      </div>
    </Nav>
  );
}
