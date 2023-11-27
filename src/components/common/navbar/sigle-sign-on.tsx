/* eslint-disable no-console */
/* eslint-disable simple-import-sort/imports */
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useHostUrl from '@/hooks/use-hosturl';
import { getEventData, publish, subscribe } from '@/lib/event-bus';

import Modal from '@/components/modal';
import Typography from '@/components/typography';

import { GET_SESSION, SIGNIN, SIGNOUT } from '@/constants';

export default function SingleSignOn() {
  const { t } = useTranslation();
  const { urlStatus, urlSignin } = useHostUrl();
  const [user, setUser] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handlerEvent = useCallback((eventData) => {
    const { eventType, data } = eventData;

    if (!eventType) return;

    if ((eventType === SIGNIN || eventType === GET_SESSION) && data) {
      closeModal();
      setUser(data);
    }
    if (eventType === SIGNOUT) {
      setUser(null);
    }
  }, []);

  const signOut = () => {
    publish({
      eventType: SIGNOUT,
      data: user,
    });
  };

  useEffect(() => {
    subscribe(handlerEvent);
    getEventData(urlStatus);
  }, [handlerEvent, urlStatus]);

  if (user) {
    return (
      <>
        <Typography variant='sm' onClick={signOut}>
          {t('signout')}
        </Typography>
      </>
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
