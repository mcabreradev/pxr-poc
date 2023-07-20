'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import Icon from '@/components/icon';

const Container = tw.footer`
  relative
  box-border
  flex
  h-[308px]
  w-full
  flex-col
  justify-around
  overflow-hidden
  border-t-[0.5px] border-solid border-gray-300
  bg-white-100
  p-4
  text-left text-sm text-black
`;

const Col = tw.div`
  flex flex-row items-center
`;

const Text = tw.span`
  pl-[5px]
`;
export default function Footer() {
  const { t, i18n } = useTranslation();
  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    setHydrated(true);
  }, []);
  if (!hydrated) {
    return null;
  }

  const onClickHandler = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
    document.cookie = `i18next=${i18n.language}`;
  };

  return (
    <Container data-testid='test-element'>
      <Col className='font-semibold'>
        <Col className='w-full'>
          <Icon icon='globe' width='18px' />
          <Text
            className='hover:cursor-pointer'
            onClick={onClickHandler}
            data-testid='test-link'
          >
            {t('link.language')}
          </Text>
        </Col>
        <span className='w-full'>$ USD</span>
      </Col>
      <Col>
        <Icon icon='open_in_new' width='18px' />
        <Text>www.terrazasposta.com</Text>
      </Col>
      <Col>
        <Icon icon='email' width='18px' />
        <Text>kyamashita@terrazasposta.com</Text>
      </Col>
      <Col>
        <Icon icon='phone' width='18px' />
        <Text>+54 388 490-8053</Text>
      </Col>
      <Col>
        <Icon icon='whatsapp' width='18px' />
        <Text>Whatsapp</Text>
      </Col>
      <Col>
        <Icon icon='facebook_round' width='18px' />
        <Text></Text>
        <Icon icon='instagram' width='18px' />
      </Col>
      <Col>{t('link.termsandconditions')}</Col>
      <Col>© {new Date().getFullYear()} Paxer LLC</Col>
    </Container>
  );
}
