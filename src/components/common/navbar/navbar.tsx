'use client';

import { setCookie } from 'cookies-next';
import { Dropdown } from 'flowbite-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

import Icon from '@/components/icon';
import Typography from '@/components/typography';

import SingleSignOn from './sigle-sign-on';

interface Props {
  className?: string;
}

const Nav = tw.nav`
  layout hidden content-around items-center justify-between bg-white py-[35px] text-neutral-400 md:flex
`;

export default function Navbar({ className }: Props) {
  const { i18n } = useTranslation();

  useEffect(() => {
    setCookie('i18next', i18n.language);
  }, [i18n.language]);

  return (
    <div className='md:border-b-[1px] md:border-solid md:border-white-200'>
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
                  onClick={() => i18n.changeLanguage('es')}
                >
                  <Typography
                    variant='sm'
                    className={cn('w-32 text-left text-neutral-400', {
                      'text-neutral-500': i18n.language === 'es',
                    })}
                  >
                    Español
                  </Typography>
                </Dropdown.Item>
                <Dropdown.Item
                  className='hover:bg-neutral-40 focus:bg-neutral-40'
                  size='lg'
                  onClick={() => i18n.changeLanguage('en')}
                >
                  <Typography
                    variant='sm'
                    className={cn('w-32 text-left text-neutral-400', {
                      'text-neutral-500': i18n.language === 'en',
                    })}
                  >
                    Ingles
                  </Typography>
                </Dropdown.Item>
              </Dropdown>
            </li>
            <li className='cursor-pointer hover:underline'>
              <SingleSignOn />
            </li>
          </ul>
        </div>
      </Nav>
    </div>
  );
}