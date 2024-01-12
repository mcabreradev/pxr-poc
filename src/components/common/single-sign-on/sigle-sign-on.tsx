/* eslint-disable no-console */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useEventBus from '@/hooks/use-event-bus';
import useHostUrl from '@/hooks/use-hosturl';

import Modal from '@/components/modal';
import Typography from '@/components/typography';

import useSessionStore from '@/store/use-session.store';
import useUserStore from '@/store/use-user.store';

import { GET_SESSION, SIGNIN, SIGNOUT } from '@/constants';

export default function SingleSignOn() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const { urlStatus, urlSignin } = useHostUrl();
  const { getEventData, subscribe, publish } = useEventBus();
  const { addUser } = useUserStore();
  const { setSession, removeSession } = useSessionStore();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handlerEvent = useCallback(
    (eventData) => {
      const { eventType, data } = eventData;

      if (!eventType) return;

      console.log('SSO', { eventType, data });

      if ((eventType === SIGNIN || eventType === GET_SESSION) && data) {
        closeModal();
        setUser(data);
        addUser(data);
        setSession(data);
      }
      if (eventType === SIGNOUT) {
        setUser(null);
        addUser(null);
        removeSession();
      }
    },
    [addUser, removeSession, setSession],
  );

  const signOut = () => {
    publish({
      eventType: SIGNOUT,
      data: user,
    });
  };

  useEffect(() => {
    subscribe(handlerEvent);
    getEventData(urlStatus);
  }, [getEventData, handlerEvent, subscribe, urlStatus]);

  if (user) {
    return (
      <Typography variant='sm' onClick={signOut}>
        {t('signout')}
      </Typography>
    );
  }

  return (
    <>
      <Typography variant='sm' onClick={openModal}>
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