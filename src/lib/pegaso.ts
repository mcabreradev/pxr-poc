import axios from 'axios';
import qs from 'qs';

// Define un tipo para los datos del error
type ApiErrorData = {
  code: number;
  message: string;
};

// Define un tipo para el error completo
type ApiError = {
  response: {
    status: number;
    data: ApiErrorData;
  };
};

// type ApiResponse = {
//   status: string;
//   code: number;
//   data: unknown;
//   message: string;
// };

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
    const apiError = error as ApiError;

    if (apiError.response) {
      const { status, data } = apiError.response;
      if (status === 404) {
        // eslint-disable-next-line no-console
        console.log('Recurso no encontrado:', data.message);
      } else if (status === 500) {
        // eslint-disable-next-line no-console
        console.log('Error interno del servidor:', data.message);
      } else {
        // eslint-disable-next-line no-console
        console.log('Error desconocido:', data.message);
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('Error de red:', error);
    }
    // throw new Error(
    //   "Can't get token from " + process.env.PAXER_AUTH_URL + ' ' + error,
    // );
    throw error;
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
    const apiError = error as ApiError;

    if (apiError.response) {
      const { status, data } = apiError.response;
      if (status === 404) {
        // eslint-disable-next-line no-console
        console.log('Recurso no encontrado:', data.message);
      } else if (status === 500) {
        // eslint-disable-next-line no-console
        console.log('Error interno del servidor:', data.message);
      } else {
        // eslint-disable-next-line no-console
        console.log('Error desconocido:', data.message);
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('Error de red:', error);
    }

    // throw new Error("Can't fetch data" + error);
    return apiError.response.data;
  }
};
