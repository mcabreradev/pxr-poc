import axios from 'axios';
import { cookies } from 'next/headers';
import qs from 'qs';

const getAuthorization = async () => {
  const data = {
    grant_type: 'client_credentials',
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
  let access_token = cookies().get('access_token')?.value;

  if (!access_token) {
    const auth = await getAuthorization();
    access_token = auth.access_token;
    cookies().set('access_token', auth.access_token, {
      maxAge: auth.expires_in,
    });
  }

  return access_token;
};
