import axios from 'axios';
import qs from 'qs';

const getAccessToken = async () => {
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
    maxRedirects: 0,
  };

  try {
    const res = await axios(options);
    return res.data.access_token;
  } catch (error) {
    throw new Error(
      "Can't get token from " + process.env.PAXER_AUTH_URL + ' ' + error,
    );
  }
};

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
    maxRedirects: 0,
  };

  try {
    const res = await axios(options);
    return res.data;
  } catch (error) {
    throw new Error("Can't fetch data" + error);
  }
};
