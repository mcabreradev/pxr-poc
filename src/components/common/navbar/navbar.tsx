/* eslint-disable simple-import-sort/imports */
'use client';

import { setCookie } from 'cookies-next';
import { Dropdown } from 'flowbite-react';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import useHydration from '@/hooks/use-hydration';
import { cn } from '@/lib/utils';

import SingleSignOn from '@/components/common/single-sign-on/sigle-sign-on';
import Icon from '@/components/icon';
import Typography from '@/components/typography';

import { PROPERTYPATH } from '@/constants';

interface Props {
  className?: string;
}

const Nav = tw.nav`
  layout hidden content-around items-center justify-between bg-white py-[35px] text-neutral-400 md:flex
`;

export default function Navbar({ className }: Props) {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const { isHydrated } = useHydration();
  const [selectedLink, setLink] = useState(0);

  const links = useMemo(
    () => [
      { label: 'summary', href: '#summary' },
      { label: 'rooms', href: '#rooms' },
      { label: 'reviews', href: '#reviews' },
      { label: 'location', href: '#location' },
      { label: 'topsites', href: '#topsites' },
    ],
    [],
  );

  const handleClick = useCallback(
    (index: number) => {
      setLink(index);
      const element = document.getElementById(links[index].label);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    },
    [links],
  );

  useEffect(() => {
    setCookie('i18next', i18n.language);
  }, [i18n.language]);

  if (!isHydrated) return null;

  return (
    <div className='md:border-b-[1px] md:border-solid md:border-white-200'>
      <Nav className={cn(className)} data-testid='test-element'>
        <div>
          {pathname === PROPERTYPATH && (
            <ul className='flex space-x-6'>
              {links.map((link, index) => (
                <li
                  key={`link.label${link.label}`}
                  className='cursor-pointer hover:underline'
                  onClick={() => handleClick(index)}
                >
                  <Typography
                    variant='sm'
                    className={cn(
                      selectedLink === index ? 'font-semibold underline' : '',
                    )}
                  >
                    {t(`link.${link.label}`)}
                  </Typography>
                </li>
              ))}
            </ul>
          )}
        </div>
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
