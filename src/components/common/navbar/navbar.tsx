/* eslint-disable simple-import-sort/imports */
'use client';

import { setCookie } from 'cookies-next';
import { Dropdown } from 'flowbite-react';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import { useHydration } from '@/hooks';
import { cn } from '@/lib/utils';

import { Icon, Typography } from '@/components';
import SingleSignOn from '@/components/common/single-sign-on/sigle-sign-on';

import HeaderDatepickerComponent from '@/features/property/header-datepicker-form';

import { PROPERTYPATH } from '@/constants';
import { useSubscribeToStore } from '@/hooks';
import { useGlobalStore } from '@/store';

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
  const [intersected, setIntersected] = useState(true);

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

  useSubscribeToStore(useGlobalStore, ({ guestForm }) => {
    setIntersected(guestForm?.isIntersecting);
  });

  if (!isHydrated) return null;

  return (
    <div
      className={cn(
        'top-0 z-50 bg-white md:border-b-[1px] md:border-solid md:border-white-200',
        { sticky: pathname === PROPERTYPATH },
      )}
      data-testid='test-element-navbar'
    >
      <Nav className={cn(className)} data-testid='test-element'>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        >
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
        </motion.div>

        <div>
          <AnimatePresence>
            {/* {!!intersected && ( */}
            <motion.ul
              initial='hidden'
              className='flex items-center justify-center'
              animate={intersected ? 'visible' : 'hidden'}
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              exit={{ opacity: 0 }}
              variants={{
                hidden: { opacity: 0, y: '-100%' },
                visible: { opacity: 1, y: '0%' },
              }}
            >
              <motion.li className='cursor-pointer'>
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
              </motion.li>
              <motion.li className='cursor-pointer'>
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
              </motion.li>
              <motion.li className='cursor-pointer hover:underline'>
                <SingleSignOn />
              </motion.li>
            </motion.ul>
            {/* )} */}

            {!intersected && pathname === PROPERTYPATH && (
              <motion.div
                initial='hidden'
                animate={intersected ? 'hidden' : 'visible'}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                exit={{ opacity: 0 }}
                variants={{
                  hidden: { opacity: 0, y: '-100%' },
                  visible: { opacity: 1, y: '0%' },
                }}
              >
                <HeaderDatepickerComponent />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Nav>
    </div>
  );
}
