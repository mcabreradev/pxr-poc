import axios from 'axios';
import { cookies } from 'next/headers';
import qs from 'qs';

import { AUTH_COOKIE, CLIENT_CREDENTIALS } from '@/constant';

const getAuthorization = async () => {
  const data = {
    grant_type: CLIENT_CREDENTIALS,
    client_id: process.env.PAXER_AUTH_CLIENT_ID,
    client_secret: process.env.PAXER_AUTH_CLIENT_SECRET,
  };

  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: qs.stringify(data),
    url: process.env.PAXER_AUTH_URL,
  };

  try {
    const res = await axios(options);
    return res.data;
  } catch (error) {
    throw `Can't get token from ${process.env.PAXER_AUTH_URL} error`;
  }
};

export const getAccessToken = async () => {
  let access_token = cookies().get(AUTH_COOKIE)?.value;

  if (!access_token) {
    const auth = await getAuthorization();
    access_token = auth.access_token;
    cookies().set(AUTH_COOKIE, auth.access_token, {
      maxAge: auth.expires_in,
    });
  }

  return access_token;
};
