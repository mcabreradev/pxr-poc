// Auth
export const AUTH_COOKIE = 'access_token';
export const CLIENT_CREDENTIALS = 'client_credentials';
export const AUTH_IFRAME = 'authIframe';
export const SIGNIN = 'signin';
export const SIGNINMODAL = 'signinModal';
export const SIGNOUT = 'signout';
export const GET_SESSION = 'getsession';
export const CHECKUSER = 'checkuser';
export const PROVIDER_TAG = ':PROVIDER';
//The following 3 constants are to be used ONLY for SSO links.
//If you need to name any of these 3 tech giants elsewhere, I'd recommend another constant to avoid mistakes
export const PROVIDER_GOOGLE = 'Google';
export const PROVIDER_FACEBOOK = 'Facebook';
export const PROVIDER_APPLE = 'SignInWithApple';

// App
export const PROPERTY_CURRENCY = 'EUR';
export const PROPERTY_CURRENCY_OTA = 'EUR';
export const PROPERTY = 'property';
export const PROPERTYPATH = '/';
export const ROOMTYPES = 'room-types';
export const ROOMTYPE = 'room-type';
export const ROOMTYPE2 = 'roomTypeId';
export const PAYMENT = 'payment';
export const SUCCESS = 'success';
export const ERROR = 'error';
export const AMENITIES = 'amenities';
export const TOPSIGHT = 'topsight';
export const GALERY = 'galery';
export const IMG = 'img';
export const IMAGES = 'images';
export const LANDSCAPE = 'landscape';
export const PORTRAIT = 'portrait';
export const SQUARE = 'square';
export const ORIENTATION = 'orientation';
export const URLS = 'urls';
export const PHOTOS = 'photos';
export const PHOTO = 'photo';
export const RESERVATION = 'reservation';
export const PLURAL = 'plural';
export const SINGULAR = 'singular';
export const INVENTORY = 'inventory';
export const AVAILABILITY = 'availability';
export const RATES = 'rates';
export const CALENDAR = 'calendar';
export const GUESTSINFO = 'guestsinfo';
export const MOBILE_DEVICE_CSS_QUERY = 'only screen and (max-width : 768px)';
export const MEDIUM_DEVICE_CSS_QUERY =
  'only screen and (min-width : 769px) and (max-width : 992px)';
export const LARGE_DEVICE_CSS_QUERY =
  'only screen and (min-width : 769px) and (max-width : 1200px)';
export const EXTRA_LARGE_DEVICE_CSS_QUERY =
  'only screen and (min-width : 1201px)';

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
export const CHECKIN_DEFAULT_FUTURE_DAYS = 7;
export const CHECKOUT = 'checkout';
export const CHECKOUT_DEFAULT_FUTURE_DAYS = 9;
export const GUESTS = 'guests';
export const TOTAL_GUESTS = 'totalGuests';
export const ADULTS = 'adults';
export const TOTAL_ADULTS = 'totalAdults';
export const TOTAL_ADULTS_DEFAULT = 2;
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
export const A = 'a';
export const TAG = {
  DIV,
  SPAN,
  INPUT,
  LABEL,
  TEXTAREA,
  A,
};

export const AUTH = 'auth';
export const LOGIN = 'login';
export const REGISTER = 'register';
export const FORGOT = 'forgot';
export const IDENTIFICATION = 'identification';
export const QUERY = {
  AUTH,
  LOGIN,
  REGISTER,
  FORGOT,
  IDENTIFICATION,
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

export const BREAKPOINTS = [3840, 2400, 1080, 640, 384, 256, 128, 96, 64, 48];

export const LOCALES = {
  us: { format: 'en-US', currency: 'USD', currencyDisplay: 'symbol' },
  euro: { format: 'es-ES', currency: 'EUR', currencyDisplay: 'symbol' },
  argentina: { format: 'es-AR', currency: 'ARS', currencyDisplay: 'symbol' },
  bolivia: { format: 'es-BO', currency: 'BOB', currencyDisplay: 'symbol' },
  chile: { format: 'es-CL', currency: 'CLP', currencyDisplay: 'symbol' },
  colombia: { format: 'es-CO', currency: 'COP', currencyDisplay: 'symbol' },
  costa_rica: { format: 'es-CR', currency: 'CRC', currencyDisplay: 'symbol' },
  cuba: { format: 'es-CU', currency: 'CUP', currencyDisplay: 'symbol' },
  ecuador: { format: 'es-EC', currency: 'USD', currencyDisplay: 'symbol' },
  el_salvador: { format: 'es-SV', currency: 'USD', currencyDisplay: 'symbol' },
  guatemala: { format: 'es-GT', currency: 'GTQ', currencyDisplay: 'symbol' },
  honduras: { format: 'es-HN', currency: 'HNL', currencyDisplay: 'symbol' },
  mexico: { format: 'es-MX', currency: 'MXN', currencyDisplay: 'symbol' },
  nicaragua: { format: 'es-NI', currency: 'NIO', currencyDisplay: 'symbol' },
  panama: { format: 'es-PA', currency: 'PAB', currencyDisplay: 'symbol' },
  paraguay: { format: 'es-PY', currency: 'PYG', currencyDisplay: 'symbol' },
  peru: { format: 'es-PE', currency: 'PEN', currencyDisplay: 'symbol' },
  puerto_rico: { format: 'es-PR', currency: 'USD', currencyDisplay: 'symbol' },
  republica_dominicana: {
    format: 'es-DO',
    currency: 'DOP',
    currencyDisplay: 'symbol',
  },
  uruguay: { format: 'es-UY', currency: 'UYU', currencyDisplay: 'symbol' },
  venezuela: { format: 'es-VE', currency: 'VES', currencyDisplay: 'symbol' },
};

export const CURRENCIES = [
  { format: 'en-US', currency: 'USD', currencyDisplay: 'symbol' },
  { format: 'es-ES', currency: 'EUR', currencyDisplay: 'symbol' },
  { format: 'es-AR', currency: 'ARS', currencyDisplay: 'symbol' },
  { format: 'es-BO', currency: 'BOB', currencyDisplay: 'symbol' },
  { format: 'es-CL', currency: 'CLP', currencyDisplay: 'symbol' },
  { format: 'es-CO', currency: 'COP', currencyDisplay: 'symbol' },
  { format: 'es-CR', currency: 'CRC', currencyDisplay: 'symbol' },
  { format: 'es-CU', currency: 'CUP', currencyDisplay: 'symbol' },
  { format: 'es-EC', currency: 'USD', currencyDisplay: 'symbol' },
  { format: 'es-SV', currency: 'USD', currencyDisplay: 'symbol' },
  { format: 'es-GT', currency: 'GTQ', currencyDisplay: 'symbol' },
  { format: 'es-HN', currency: 'HNL', currencyDisplay: 'symbol' },
  { format: 'es-MX', currency: 'MXN', currencyDisplay: 'symbol' },
  { format: 'es-NI', currency: 'NIO', currencyDisplay: 'symbol' },
  { format: 'es-PA', currency: 'PAB', currencyDisplay: 'symbol' },
  { format: 'es-PY', currency: 'PYG', currencyDisplay: 'symbol' },
  { format: 'es-PE', currency: 'PEN', currencyDisplay: 'symbol' },
  { format: 'es-PR', currency: 'USD', currencyDisplay: 'symbol' },
  {
    format: 'es-DO',
    currency: 'DOP',
    currencyDisplay: 'symbol',
  },
  { format: 'es-UY', currency: 'UYU', currencyDisplay: 'symbol' },
  { format: 'es-VE', currency: 'VES', currencyDisplay: 'symbol' },
];

// keyboard keys
export const ESCAPE = 'Escape';

// defaults
export const DEFAULT_WIDTH = 980;
export const DEFAULT_HEIGHT = 551;

// hardcoded values
export const PLAN_COST = 100;
export const PLAN_BREAKFAST_COST = 10;
export const PLAN_REFUNDABLE_PERCENT = 0.03;
export const PLAN_TAXES = 0.15;
export const PLAN_COSTS = [100, 150, 200, 250, 300, 350, 400, 450, 500];
