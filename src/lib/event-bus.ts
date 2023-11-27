/* eslint-disable no-console */
import { AUTH_IFRAME } from '@/constants';

import { EventData } from '@/types';

export const getEventData = (url: string) => {
  const elem = document.getElementById(AUTH_IFRAME);
  console.log('getEventData - Ecommerce');

  if (!elem) {
    const iframe = document.createElement('iframe');
    iframe.setAttribute('src', url);
    iframe.setAttribute('id', AUTH_IFRAME);
    iframe.setAttribute('name', 'example');
    iframe.style.display = 'none';
    document.body.appendChild(iframe);
  }
};

export const subscribe = (callback: (eventData: EventData) => void) => {
  console.log('Se ejecuta subscribe Ecommerce');
  window.addEventListener('message', (event) => {
    // Fix: Added missing arrow function
    // && event.origin === originUrl

    if (event.data) {
      const eventData: EventData = event.data;
      callback(eventData);
    }
  });
};

export const publish = (message: EventData) => {
  const origin =
    process.env.NEXT_PUBLIC_SITE_HOST_URL_AUTH || document.location.origin;
  console.log('publish -> ', message.eventType);
  const iframe = document.getElementById(AUTH_IFRAME) as HTMLIFrameElement;

  if (iframe.contentWindow) {
    iframe.contentWindow.postMessage(message, origin);
  }
};
