import axios from 'axios';

const getHeaders = async () => {
  return {
    'Content-Type': 'application/json',
  };
};

const get = async (url: string) => {
  const options = {
    method: 'GET',
    url: process.env.SITE_PEGASO_URL + url,
    headers: await getHeaders(),
  };

  try {
    const res = await axios.request(options);
    return res.data;
  } catch (error) {
    throw new Error(
      `Can't fetch data from ${process.env.SITE_PEGASO_URL + url}  ${error}`,
    );
  }
};

const post = async (url: string, _body?) => {
  const options = {
    method: 'POST',
    maxBodyLength: Infinity,
    url: process.env.SITE_PEGASO_URL + url,
    headers: await getHeaders(),
  };

  try {
    const res = await axios.request(options);
    return res.data;
  } catch (error) {
    throw new Error(
      `Can't post data from ${process.env.SITE_PEGASO_URL + url} ${error}`,
    );
  }
};

const api = {
  get,
  post,
};

export default api;
