import { useTranslation } from 'react-i18next';
import tw from 'tailwind-styled-components';

import Icon from '@/components/icon';

const Footer = tw.footer`
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

const Row = tw.div`
  flex flex-row items-center
`;

export default function FooterComponent() {
  const { t, i18n } = useTranslation();

  const onClickHandler = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'es' : 'en');
    document.cookie = `i18next=${i18n.language}`;
  };

  return (
    <Footer data-testid='test-element'>
      <Row className='font-semibold'>
        <Row className='w-full'>
          <Icon icon='globe' width='18px' />
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
        <Icon icon='open_in_new' width='18px' />
        <div className='pl-[5px]'>www.terrazasposta.com</div>
      </Row>
      <Row>
        <Icon icon='email' width='18px' />
        <div className='pl-[5px]'>kyamashita@terrazasposta.com</div>
      </Row>
      <Row>
        <Icon icon='phone' width='18px' />
        <div className='pl-[5px]'>+54 388 490-8053</div>
      </Row>
      <Row>
        <Icon icon='whatsapp' width='18px' />
        <div className='pl-[5px]'>Whatsapp</div>
      </Row>
      <Row>
        <Icon icon='facebook_round' width='18px' />
        <div className='pl-[5px]'></div>
        <Icon icon='instagram' width='18px' />
      </Row>
      <Row>{t('link.termsandconditions')}</Row>
      <Row>© {new Date().getFullYear()} Paxer LLC</Row>
    </Footer>
  );
}
