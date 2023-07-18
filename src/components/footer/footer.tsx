'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { AiOutlineInstagram } from 'react-icons/ai';
import {
  MdFacebook,
  MdOpenInNew,
  MdOutlineEmail,
  MdOutlinePhone,
  MdOutlineWhatsapp,
} from 'react-icons/md';
import { VscGlobe } from 'react-icons/vsc';
import tw from 'tailwind-styled-components';

const Container = tw.footer`
  relative
  box-border
  flex
  h-[308px]
  w-full
  flex-col
  justify-around
  overflow-hidden
  border-t-[1px] border-solid border-gray
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
export default function FooterComponent() {
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
          <VscGlobe size='18px' />
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
        <MdOpenInNew size='18px' />
        <Text>www.terrazasposta.com</Text>
      </Col>
      <Col>
        <MdOutlineEmail size='18px' />
        <Text>kyamashita@terrazasposta.com</Text>
      </Col>
      <Col>
        <MdOutlinePhone size='18px' />
        <Text>+54 388 490-8053</Text>
      </Col>
      <Col>
        <MdOutlineWhatsapp size='18px' />
        <Text>Whatsapp</Text>
      </Col>
      <Col>
        <MdFacebook size='18px' />
        <Text></Text>
        <AiOutlineInstagram size='18px' />
      </Col>
      <Col>{t('link.termsandconditions')}</Col>
      <Col>© {new Date().getFullYear()} Paxer LLC</Col>
    </Container>
  );
}
