import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import XHR from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';

type Languages = {
  [lang: string]: {
    [key: string]: string;
  };
};

type Resources = {
  [lang: string]: {
    translation: {
      [key: string]: string;
    };
  };
};

const LANGUAGES: Languages = {
  en: require('./en'),
  es: require('./es'),
  // Add other languages
};

const defaultLanguage = 'en';

const getResources = () => {
  const resources: Resources = {};

  for (const lang in LANGUAGES) {
    resources[lang] = {
      translation: LANGUAGES[lang],
    };
  }

  return resources;
};

const options = {
  order: [
    'querystring',
    'cookie',
    'localStorage',
    'sessionStorage',
    'navigator',
    'htmlTag',
    'path',
    'subdomain',
  ],
  lookupQuerystring: 'lng',
};

i18n
  .use(XHR)
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources: getResources(),
    fallbackLng: defaultLanguage,
    debug: false,
    detection: options,
    // lng: defaultLanguage,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
