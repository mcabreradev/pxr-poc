import axios from 'axios';

import { getAccessToken } from '@/lib/auth';

const getHeaders = async () => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${await getAccessToken()}`,
  };
};

export const get = async (url: string) => {
  const options = {
    method: 'GET',
    url: process.env.PAXER_API_URL + url,
    headers: await getHeaders(),
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
