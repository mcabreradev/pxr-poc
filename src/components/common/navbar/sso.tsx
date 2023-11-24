import { useEffect, useState } from 'react';

import { getEventData, publishEvent, subscribeEvent } from '@/lib/event-bus';

export default function SsoComponent() {
  const originUrl =
    process.env.NEXT_PUBLIC_HOST_URL_AUTH ||
    (typeof window === 'object' && document.location.origin);
  const urlStatus = `${originUrl}/status`;
  const urlSignin = `${originUrl}/signin`;
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handlerEvent = (eventData) => {
    const { eventType, data } = eventData;

    console.log('Ecommerce - handlerEvent -> ', eventType);
    if (eventType === 'signin' || eventType === 'getsession') {
      console.log('Ecommerce - handlerEvent -> ', eventData);
    }

    if ((eventType === 'signin' || eventType === 'getsession') && data) {
      console.log('Message ->', data);
      setShow(false);
      setUser(data);
    }

    if (eventType === 'signout') {
      setUser(null);
    }
  };

  const signOut = () => {
    publishEvent({
      eventType: 'signout',
      data: user,
    });
  };

  useEffect(() => {
    subscribeEvent(handlerEvent);
    getEventData(urlStatus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div data-testid='test-element'>Hi I'm Sso Component</div>;
}
