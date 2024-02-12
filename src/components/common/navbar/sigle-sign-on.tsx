import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useEventBus from '@/hooks/use-event-bus';
import useHostUrl from '@/hooks/use-hosturl';

import Modal from '@/components/modal';
import Typography from '@/components/typography';

import useUserStore from '@/store/use-user.store';

import { GET_SESSION, SIGNIN, SIGNOUT } from '@/constants';

import { EventData } from '@/types';

export default function SingleSignOn() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);
  const [lastMessage, setLastMessage] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const { urlStatus, urlSignin } = useHostUrl();
  const { getEventData, publish } = useEventBus();
  const { addUser } = useUserStore();

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  const handlerEvent = useCallback(
    (eventData) => {
      const { eventType, data } = eventData;

      if (!eventType) return;

      // Without this logout may behave unexpectedly at certain views (payment view for example)
      if (eventType === lastMessage && data && !data.err) return;

      setLastMessage(eventType);

      if ((eventType === SIGNIN || eventType === GET_SESSION) && data) {
        closeModal();
        setUser(data);
        addUser({ ...data, isAuth: true });
      }
      if (eventType === SIGNOUT) {
        setUser(null);
        addUser(null);
      }
    },
    [addUser, lastMessage],
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
