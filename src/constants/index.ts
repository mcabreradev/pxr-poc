// Auth
export const AUTH_COOKIE = 'access_token';
export const CLIENT_CREDENTIALS = 'client_credentials';
export const AUTH_IFRAME = 'authIframe';
export const SIGNIN = 'signin';
export const SIGNINMODAL = 'signinModal';
export const SIGNOUT = 'signout';
export const GET_SESSION = 'getsession';
export const CHECKUSER = 'checkuser';

// App
export const PROPERTY = 'property';
export const PROPERTYPATH = '/';
export const ROOMTYPES = 'room-types';
export const ROOMTYPE = 'room-type';
export const ROOMTYPE2 = 'roomtype';
export const PAYMENT = 'payment';
export const SUCCESS = 'success';
export const ERROR = 'error';
export const AMENITIES = 'amenities';
export const TOPSIGHT = 'topsight';
export const GALERY = 'galery';
export const IMAGE = 'img';
export const RESERVATION = 'reservation';
export const PLURAL = 'plural';
export const SINGULAR = 'singular';
export const INVENTORY = 'inventory';
export const AVAILABILITY = 'availability';
export const RATES = 'rates';

// RATE PLANS
export const PLAN_REFUNDABLE = 'refundable';
export const PLAN_NONREFUNDABLE = 'non-refundable';
export const PLAN_BREAKFAST = 'breakfast';
export const PLAN_NONBREAKFAST = 'non-breakfast';
export const PLAN = 'plan';
export const EXTRA = 'extra';
export const DAYS = 'days';

// GUESTS
export const CHECKIN = 'checkin';
export const CHECKOUT = 'checkout';
export const GUESTS = 'guests';
export const TOTAL_GUESTS = 'totalGuests';
export const ADULTS = 'adults';
export const TOTAL_ADULTS = 'totalAdults';
export const TOTAL_ADULTS_DEFAULT =
  Number(process.env.HOTEL_ADULTS_DEFAULT) || Number(2);
export const CHILDRENS = 'childrens';
export const TOTAL_CHILDRENS = 'totalChildren';
export const TOTAL_CHILDRENS_DEFAULT = 0;
export const INFANTS = 'infants';
export const TOTAL_INFANTS = 'totalInfants';
export const TOTAL_INFANTS_DEFAULT = 0;
export const GUEST = 'guest';
export const RATEPLAN = 'rateplan';
export const HOTELID = 'hot_id';
export const PRICE_TAX = 'refPriceTax';
export const PRICE_TOTAL = 'refPriceTotal';

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
export const DEFAULT_LANG = ES;
export const LOOKUP_QUERYSTRING_LANG = 'userLang';

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

export const LOCALES = {
  us: { locale: 'en-US', currency: 'USD', currencyDisplay: 'symbol' },
  euro: { locale: 'es-ES', currency: 'EURO', currencyDisplay: 'symbol' },
  argentina: { locale: 'es-AR', currency: 'ARS', currencyDisplay: 'symbol' },
  bolivia: { locale: 'es-BO', currency: 'BOB', currencyDisplay: 'symbol' },
  chile: { locale: 'es-CL', currency: 'CLP', currencyDisplay: 'symbol' },
  colombia: { locale: 'es-CO', currency: 'COP', currencyDisplay: 'symbol' },
  costa_rica: { locale: 'es-CR', currency: 'CRC', currencyDisplay: 'symbol' },
  cuba: { locale: 'es-CU', currency: 'CUP', currencyDisplay: 'symbol' },
  ecuador: { locale: 'es-EC', currency: 'USD', currencyDisplay: 'symbol' },
  el_salvador: { locale: 'es-SV', currency: 'USD', currencyDisplay: 'symbol' },
  guatemala: { locale: 'es-GT', currency: 'GTQ', currencyDisplay: 'symbol' },
  honduras: { locale: 'es-HN', currency: 'HNL', currencyDisplay: 'symbol' },
  mexico: { locale: 'es-MX', currency: 'MXN', currencyDisplay: 'symbol' },
  nicaragua: { locale: 'es-NI', currency: 'NIO', currencyDisplay: 'symbol' },
  panama: { locale: 'es-PA', currency: 'PAB', currencyDisplay: 'symbol' },
  paraguay: { locale: 'es-PY', currency: 'PYG', currencyDisplay: 'symbol' },
  peru: { locale: 'es-PE', currency: 'PEN', currencyDisplay: 'symbol' },
  puerto_rico: { locale: 'es-PR', currency: 'USD', currencyDisplay: 'symbol' },
  republica_dominicana: {
    locale: 'es-DO',
    currency: 'DOP',
    currencyDisplay: 'symbol',
  },
  uruguay: { locale: 'es-UY', currency: 'UYU', currencyDisplay: 'symbol' },
  venezuela: { locale: 'es-VE', currency: 'VES', currencyDisplay: 'symbol' },
};

// keyboard keys
export const ESCAPE = 'Escape';

// hardcoded values
export const PLAN_COST = 100;
export const PLAN_BREAKFAST_COST = 10;
export const PLAN_REFUNDABLE_PERCENT = 0.03;
export const PLAN_TAXES = 0.15;
export const PLAN_COSTS = [100, 150, 200, 250, 300, 350, 400, 450, 500];
