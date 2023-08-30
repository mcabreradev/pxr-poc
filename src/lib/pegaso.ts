import axios from 'axios';

import { getAccessToken } from '@/lib/auth';

const getHeaders = (token: unknown) => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
};

export const get = async (url: string) => {
  const token = await getAccessToken();

  const options = {
    method: 'GET',
    url: process.env.PAXER_API_URL + url,
    headers: getHeaders(token),
  };

  try {
    const res = await axios(options);
    return res.data;
  } catch (error) {
    throw new Error(
      `Can't fetch data from ${process.env.PAXER_API_URL + url}  ${error}`,
    );
  }
};
