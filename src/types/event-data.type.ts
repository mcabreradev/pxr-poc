export type EventData = {
  eventType: 'signin' | 'signinModal' | 'signout' | 'getsession' | 'checkuser';
  data: unknown | null;
};
