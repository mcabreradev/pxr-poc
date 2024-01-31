import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useOauth from '@/hooks/use-oauth';

import Button from '@/components/button';
import Icon from '@/components/icon';

import { QUERY, URL } from '@/constants';

type Props = {
  className?: string;
  roomtype: string;
};

export default function SocialSignOn({ roomtype }: Props) {
  const { t } = useTranslation();
  const [popup, setPopup] = useState(null);
  const { googleUrl, facebookUrl } = useOauth();

  useEffect(() => {
    const interval = setInterval(() => {
      if (popup && popup['closed']) {
        clearInterval(interval);
        window.location.reload();
      } else if (!popup) {
        clearInterval(interval);
      }
    }, 1000);
  }, [popup]);

  const openPopupCenter = (url, parent) => {
    const width = 500;
    const height = 500;
    const left = parent.top.outerWidth / 2 + parent.top.screenX - width / 2;
    const top = parent.top.outerHeight / 2 + parent.top.screenY - height / 2;
    const newWindow = parent.open(
      url,
      '',
      `popup=true, width=${width}, height=${height}, left=${left}, top=${top}`,
    );
    setPopup(newWindow);
  };

  return (
    <div className='flex flex-col gap-5 py-3 pb-10'>
      <Button
        className='md:w-full'
        variant='secondary'
        icon={<Icon variant='google' height='24' />}
        type='link'
        onClick={() => openPopupCenter(googleUrl, window)}
        replace={true}
        withSearchParams={true}
      >
        {t('button.google')}
      </Button>

      <Button
        className='md:w-full'
        variant='secondary'
        icon={<Icon variant='facebook' height='24' />}
        type='link'
        onClick={() => openPopupCenter(facebookUrl, window)}
        replace={true}
        withSearchParams={true}
        query={{ [URL.ACTION]: 'login' }}
      >
        {t('button.facebook')}
      </Button>

      <Button
        className='md:w-full'
        variant='secondary'
        icon={<Icon variant='apple' height='24' />}
        type='link'
        href={`/room-type/${roomtype}/details`}
        replace={true}
        withSearchParams={true}
        query={{ [URL.ACTION]: QUERY.IDENTIFICATION }}
      >
        {t('button.apple')}
      </Button>
    </div>
  );
}
