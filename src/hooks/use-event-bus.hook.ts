import { AUTH_IFRAME } from '@/constants';

import { EventData } from '@/types';

export default function useEventBus() {
  const getEventData = (url: string) => {
    const elem = document.getElementById(AUTH_IFRAME);
    if (!elem) {
      const iframe = document.createElement('iframe');
      iframe.setAttribute('src', url);
      iframe.setAttribute('id', AUTH_IFRAME);
      iframe.setAttribute('name', 'example');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
    }
  };

  const subscribe = (callback: (eventData: EventData) => void) => {
    window.addEventListener('message', (event) => {
      if (event.data) {
        const eventData: EventData = event.data;
        callback(eventData);
      }
    });
  };

  const publish = (message: EventData) => {
    const origin =
      process.env.NEXT_PUBLIC_SITE_HOST_URL_AUTH || document.location.origin;
    const iframe = document.getElementById(AUTH_IFRAME) as HTMLIFrameElement;

    if (iframe.contentWindow) {
      iframe.contentWindow.postMessage(message, origin);
    }
  };

  return { getEventData, subscribe, publish };
}
