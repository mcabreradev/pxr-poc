// Auth
export const AUTH_COOKIE = 'access_token';
export const CLIENT_CREDENTIALS = 'client_credentials';

// App
export const PROPERTY = 'property';
export const ROOMTYPES = 'room-types';
export const ROOMTYPE = 'room-type';
export const PAYMENT = 'payment';
export const SUCCESS = 'success';
export const ERROR = 'error';
export const AMENITIES = 'amenities';
export const TOPSIGHT = 'topsight';
export const GALERY = 'galery';
export const RESERVATION = 'reservation';
export const PLURAL = 'plural';
export const SINGULAR = 'singular';

// FORM
export const EMAIL = 'email';
export const PASSWORD = 'password';
export const TEXT = 'text';
export const NAME = 'name';
export const FORM = {
  EMAIL,
  PASSWORD,
  TEXT,
  NAME,
};

export const LABEL = 'label';
export const DIV = 'div';
export const SPAN = 'span';
export const INPUT = 'input';
export const TEXTAREA = 'textarea';
export const TAG = {
  DIV,
  SPAN,
  INPUT,
  LABEL,
  TEXTAREA,
};

export const AUTH = 'auth';
export const LOGIN = 'login';
export const REGISTER = 'register';
export const FORGOT = 'forgot';
export const QUERY = {
  AUTH,
  LOGIN,
  REGISTER,
  FORGOT,
};

// i18n
export const ES = 'es';
export const EN = 'en';
export const FR = 'fr';
export const LANG = {
  ES,
  EN,
  FR,
};

// url params
export const ACTION = 'action';
export const URL = {
  ACTION,
  SUCCESS,
  ERROR,
};

// Errors
export const ERROR_404 = '404';
export const ERROR_500 = '500';
export const ERR_NETWORK = 'ERR_NETWORK';
export const ERRORS = {
  ERROR_404,
  ERROR_500,
  ERR_NETWORK,
};

export const PAYMENT_STATUS = {
  SUCCEEDED: 'succeeded',
  PENDING: 'pending',
  PROCESSING: 'processing',
  REQUIRE_PAYMENT_METHOD: 'requires_payment_method',
  REQUIER_INTENT_CLIENT_SECRET: 'payment_intent_client_secret',
};

export const breakpoints = [3840, 2400, 1080, 640, 384, 256, 128, 96, 64, 48];
