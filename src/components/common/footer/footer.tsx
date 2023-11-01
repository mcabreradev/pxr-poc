'use client';

import { setCookie } from 'cookies-next';
import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import useFetchProperty from '@/hooks/use-property.query';

import Icon from '@/components/icon';

import { LANG } from '@/constant';
import { siteConfig } from '@/constant/config';

const Container = tw.footer`
  relative
  z-10
  box-border
  flex
  h-max
  w-full
  flex-col
  gap-3.5
  overflow-hidden
  border-t-[0.5px]
  border-solid
  border-gray-300 bg-white-100 p-4
  text-left
  text-sm
  text-black
`;

const Item = tw.div`
  flex flex-row items-center
`;

const Layout = tw.div`
  layout
  grid-2 my-2
  grid
  grid-flow-col
`;

export default function Footer() {
  const { t, i18n } = useTranslation();
  const { data: property, isLoading } = useFetchProperty();

  const onClickHandler = () => {
    i18n.changeLanguage(i18n.language === LANG.EN ? LANG.ES : LANG.EN);
    setCookie('i18next', i18n.language);
  };

  if (isLoading) {
    return <div data-testid='test-element'>..</div>;
  }

  return (
    <>
      <Container data-testid='test-element' className='md:hidden'>
        <Item className='font-semibold'>
          <Item className='w-full'>
            <Icon variant='globe' width='18px' />
            <div
              className='hover:cursor-pointer'
              onClick={onClickHandler}
              data-testid='test-link'
            >
              {t('link.language')}
            </div>
          </Item>
          <span className='w-full'>$ USD</span>
        </Item>
        <Item>
          <Icon variant='open-in-new' width='18px' />
          <div className='pl-[5px]'>{property.websiteURL}</div>
        </Item>
        <Item>
          <Icon variant='email' width='18px' />
          <div className='pl-[5px]'>{property.email}</div>
        </Item>
        <Item>
          <Icon variant='phone' width='18px' />
          <div className='pl-[5px]'>{property.phone}</div>
        </Item>
        <Item>
          <Icon variant='whatsapp-plain' width='18px' />
          <div className='pl-[5px]'>Whatsapp</div>
        </Item>
        <Item>
          <Icon variant='facebook-round' width='18px' />
          <div className='pl-[5px]'></div>
          <Icon variant='instagram' width='18px' />
        </Item>
        <Item>{t('title.termsandconditions')}</Item>
        <Item>{`© ${new Date().getFullYear()} ${siteConfig.company}`}</Item>
      </Container>

      <Container data-testid='test-element' className='hidden md:block'>
        <Layout>
          <div className='flex flex-col'>
            <Item className='pb-4'>
              <Icon variant='globe' width='18px' />
              <span
                className='pl-[5px] font-semibold hover:cursor-pointer'
                onClick={onClickHandler}
                data-testid='test-link'
              >
                {t('link.language')}
              </span>
            </Item>
            <Item className='pb-2'>
              <Icon variant='open-in-new' width='18px' />
              <div className='pl-[5px]'>{property.websiteURL}</div>
            </Item>
            <Item className='pb-2'>
              <Icon variant='email' width='18px' />
              <div className='pl-[5px]'>{property.email}</div>
            </Item>
            <Item className='pb-2'>
              <Icon variant='phone' width='18px' />
              <div className='pl-[5px]'>{property.phone}</div>
            </Item>
          </div>

          <div className='flex flex-col'>
            <span className='cursor-pointer pb-4 font-semibold'>$ USD</span>
            <Item className='pb-2'>
              <Icon variant='whatsapp-plain' width='18px' />
              <div className='pl-[5px]'>Whatsapp</div>
            </Item>
            <Item className='pb-2'>
              <Icon variant='facebook-round' width='18px' />
              <div className='pl-[5px]'></div>
              <Icon variant='instagram' width='18px' />
            </Item>
          </div>

          <div className='flex flex-col justify-center'>
            <span>
              <Item className='pb-2'>{t('title.termsandconditions')}</Item>
              <Item>{`© ${new Date().getFullYear()} ${
                siteConfig.company
              }`}</Item>
            </span>
          </div>
        </Layout>
      </Container>
    </>
  );
}
