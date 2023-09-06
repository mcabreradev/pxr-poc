import axios from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import qs from 'qs';

import { AUTH_COOKIE, CLIENT_CREDENTIALS } from '@/constant';

const getAuthorization = async () => {
  const data = {
    grant_type: CLIENT_CREDENTIALS,
    client_id: process.env.AUTH_CLIENT_ID,
    client_secret: process.env.AUTH_CLIENT_SECRET,
  };

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url: process.env.AUTH_URL,
  };

  try {
    const res = await axios(options);
    return res.data;
  } catch (error) {
    throw `Can't get token from ${process.env.AUTH_URL} error`;
  }
};

export const getAccessToken = async () => {
  let access_token = getCookie(AUTH_COOKIE);

  if (!access_token) {
    const auth = await getAuthorization();
    access_token = auth.access_token;
    setCookie(AUTH_COOKIE, auth.access_token, {
      maxAge: auth.expires_in,
    });
  }

  return access_token;
};
