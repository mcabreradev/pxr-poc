/* eslint-disable no-console */
import axios from 'axios';

import { getAccessToken } from '@/lib/auth';

import { environmentDefined, isLocal } from '@/constants/env';

const getHeaders = async () => {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${await getAccessToken()}`,
  };
};

const get = async (url: string) => {
  let environment = '';

  if (environmentDefined) {
    environment = isLocal ? 'dev' : 'prod';
  } else {
    environment = 'invalid';
  }
  console.log(
    process.env.SITE_API_URL + url.replace(':environment', environment),
  );
  const options = {
    method: 'GET',
    url: process.env.SITE_API_URL + url.replace(':environment', environment),
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

const post = async (url: string, body) => {
  const options = {
    method: 'POST',
    maxBodyLength: Infinity,
    url: process.env.SITE_API_URL + url,
    headers: await getHeaders(),
    data: JSON.stringify(body),
  };

  try {
    const res = await axios.request(options);
    return res.data;
  } catch (error) {
    throw new Error(
      `Can't post data from ${process.env.SITE_API_URL + url} ${error}`,
    );
  }
};

const api = {
  get,
  post,
};

export default api;
