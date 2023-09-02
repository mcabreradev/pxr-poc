import axios from 'axios';

import { getAccessToken } from '@/lib/auth';

const getHeaders = async () => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${await getAccessToken()}`,
  };
};

const get = async (url: string) => {
  const options = {
    method: 'GET',
    url: process.env.SITE_API_URL + url,
    headers: await getHeaders(),
  };

  try {
    const res = await axios.request(options);
    return res.data;
  } catch (error) {
    throw new Error(
      `Can't fetch data from ${process.env.SITE_API_URL + url}  ${error}`,
    );
  }
};

const api = {
  get,
};

export default api;
