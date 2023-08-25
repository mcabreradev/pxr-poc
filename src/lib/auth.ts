import axios from 'axios';
import qs from 'qs';

export const getAccessToken = async () => {
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
    return res.data.access_token;
  } catch (error) {
    throw `Can't get token from ${process.env.PAXER_AUTH_URL} error`;
  }
};
