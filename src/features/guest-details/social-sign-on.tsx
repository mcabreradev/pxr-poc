import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useEventBus from '@/hooks/use-event-bus';
import useHostUrl from '@/hooks/use-hosturl';
import useOauth from '@/hooks/use-oauth';

import Button from '@/components/button';
import Icon from '@/components/icon';
import Modal from '@/components/modal';

import useUserStore from '@/store/use-user.store';

import { GET_SESSION, SIGNIN, SIGNOUT, URL } from '@/constants';

export default function SocialSignOn() {
  const { t } = useTranslation();
  const [_user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [socialUrl, setSocialUrl] = useState('');
  const { urlStatus } = useHostUrl();
  const { googleUrl, facebookUrl, appleUrl } = useOauth();
  const { getEventData, subscribe } = useEventBus();
  const { addUser } = useUserStore();

  const openModal = (url: string) => {
    return () => {
      setSocialUrl(url);
      setModalOpen(true);
    };
  };
  const closeModal = () => setModalOpen(false);

  const handlerEvent = useCallback(
    (eventData) => {
      const { eventType, data } = eventData;

      if (!eventType) return;

      if ((eventType === SIGNIN || eventType === GET_SESSION) && data) {
        closeModal();
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
        onClick={openModal(googleUrl)}
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
        onClick={openModal(facebookUrl)}
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
        onClick={openModal(appleUrl)}
        replace={true}
        withSearchParams={true}
        query={{ [URL.ACTION]: 'register' }}
      >
        {t('button.apple')}
      </Button>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <iframe
          src={socialUrl}
          style={{
            minHeight: '60vh',
            height: 'auto',
            width: '100%',
          }}
        ></iframe>
      </Modal>
    </div>
  );
}
