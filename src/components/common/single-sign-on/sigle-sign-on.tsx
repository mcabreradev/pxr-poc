/* eslint-disable no-console */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useEventBus, useHostUrl } from '@/hooks';

import { Modal, Typography } from '@/components';

import { useSessionStore, useUserStore } from '@/store';

import { GET_SESSION, SIGNIN, SIGNOUT } from '@/constants';

import { EventData } from '@/types';

export default function SingleSignOn() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [lastMessage, setLastMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const { urlStatus, urlSignin } = useHostUrl();
  const { getEventData, publish } = useEventBus();
  const { addUserToStore, loginEnabled } = useUserStore();
  const { setSession, removeSession } = useSessionStore();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handlerEvent = useCallback(
    (eventData) => {
      const { eventType, data } = eventData;

      if (!eventType) return;

      // Without this logout may behave unexpectedly at certain views (payment view for example)
      if (eventType === lastMessage && data && !data.err) return;

      setLastMessage(eventType);
      console.log('SSO', { eventType, data });

      if ((eventType === SIGNIN || eventType === GET_SESSION) && data) {
        closeModal();
        setUser(data);
        addUserToStore({ ...data, isAuth: true });
        setSession(data);
      }

      if (eventType === SIGNOUT) {
        setUser(null);
        addUserToStore(null);
        removeSession();
      }
    },
    [addUserToStore, removeSession, setSession, lastMessage],
  );

  const signOut = () => {
    publish({
      eventType: SIGNOUT,
      data: {},
    });
  };

  useEffect(() => {
    const messageListener = (event) => {
      if (event.data) {
        const eventData: EventData = event.data;
        handlerEvent(eventData);
      }
    };
    window.addEventListener('message', messageListener);
    getEventData(urlStatus);
  }, [getEventData, handlerEvent, urlStatus]);

  if (user) {
    return (
      <Typography variant='sm' onClick={loginEnabled ? signOut : () => {}}>
        {t('signout')}
      </Typography>
    );
  }

  return (
    <>
      <Typography variant='sm' onClick={loginEnabled ? openModal : () => {}}>
        {t('signin')}
      </Typography>
      <Modal isOpen={modalOpen} onClose={closeModal}>
        <iframe
          src={urlSignin}
          style={{
            minHeight: '60vh',
            height: 'auto',
            width: '100%',
          }}
        ></iframe>
      </Modal>
    </>
  );
}
