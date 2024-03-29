export const isProd = process.env.NODE_ENV === 'production';
export const isLocal = process.env.NODE_ENV === 'development';

export const showLogger = isLocal
  ? true
  : process.env.NEXT_PUBLIC_SHOW_LOGGER === 'true' ?? false;

export const propertyId = Number(process.env.NEXT_PUBLIC_PROPERTY_ID);

export const adultsDefault = process.env.HOTEL_ADULTS_DEFAULT;

export const SITE_IMAGE_URL = process.env.NEXT_PUBLIC_SITE_IMAGE_URL;
