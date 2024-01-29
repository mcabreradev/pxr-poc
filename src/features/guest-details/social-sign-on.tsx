import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useEventBus from '@/hooks/use-event-bus';
import useHostUrl from '@/hooks/use-hosturl';
import useOauth from '@/hooks/use-oauth';

import Button from '@/components/button';
import Icon from '@/components/icon';

import useUserStore from '@/store/use-user.store';

import { GET_SESSION, SIGNIN, SIGNOUT, URL } from '@/constants';

export default function SocialSignOn() {
  const { t } = useTranslation();
  const [_user, setUser] = useState(null);
  const [popup, setPopup] = useState(null);
  const { urlStatus } = useHostUrl();
  const { googleUrl, facebookUrl, appleUrl } = useOauth();
  const { getEventData, subscribe } = useEventBus();
  const { addUser } = useUserStore();

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

  const handlerEvent = useCallback(
    (eventData) => {
      const { eventType, data } = eventData;

      if (!eventType) return;

      if ((eventType === SIGNIN || eventType === GET_SESSION) && data) {
        setUser(data);
        addUser(data);
      }
      if (eventType === SIGNOUT) {
        setUser(null);
        addUser(null);
      }
    },
    [addUser],
  );

  useEffect(() => {
    subscribe(handlerEvent);
    getEventData(urlStatus);
  }, [getEventData, handlerEvent, subscribe, urlStatus]);

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
        onClick={() => openPopupCenter(appleUrl, window)}
        replace={true}
        withSearchParams={true}
        query={{ [URL.ACTION]: 'register' }}
      >
        {t('button.apple')}
      </Button>
    </div>
  );
}
