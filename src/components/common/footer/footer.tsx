'use client';

import { setCookie } from 'cookies-next';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import useFetchProperty from '@/hooks/use-property.query';

import Icon from '@/components/icon';

const Row = tw.div`
  flex flex-row items-center
`;

const Container = tw.footer`
  relative
  z-10
  box-border
  flex
  h-[308px]
  w-full
  flex-col
  justify-around
  overflow-hidden border-t-[0.5px] border-solid
  border-gray-300
  bg-white-100
  p-4 text-left text-sm
  text-black
`;

export default function Footer() {
  const { t, i18n } = useTranslation();
  const { data: property, isLoading } = useFetchProperty();

  const onClickHandler = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
    setCookie('i18next', i18n.language);
  };

  if (isLoading) {
    return <div data-testid='test-element'>loading</div>;
  }

  return (
    <Container data-testid='test-element'>
      <Row className='font-semibold'>
        <Row className='w-full'>
          <Icon variant='globe' width='18px' />
          <div
            className='hover:cursor-pointer'
            onClick={onClickHandler}
            data-testid='test-link'
          >
            {t('link.language')}
          </div>
        </Row>
        <span className='w-full'>$ USD</span>
      </Row>
      <Row>
        <Icon variant='open-in-new' width='18px' />
        <div className='pl-[5px]'>{property.websiteURL}</div>
      </Row>
      <Row>
        <Icon variant='email' width='18px' />
        <div className='pl-[5px]'>{property.email}</div>
      </Row>
      <Row>
        <Icon variant='phone' width='18px' />
        <div className='pl-[5px]'>{property.phone}</div>
      </Row>
      <Row>
        <Icon variant='whatsapp' width='18px' />
        <div className='pl-[5px]'>Whatsapp</div>
      </Row>
      <Row>
        <Icon variant='facebook-round' width='18px' />
        <div className='pl-[5px]'></div>
        <Icon variant='instagram' width='18px' />
      </Row>
      <Row>{t('title.termsandconditions')}</Row>
      <Row>© {new Date().getFullYear()} Paxer LLC</Row>
    </Container>
  );
}
