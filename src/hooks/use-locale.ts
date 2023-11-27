import { enUS, es, fr } from 'date-fns/locale';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { LANG } from '../constants';

function useLocale() {
  const [locale, setLocale] = useState(enUS);
  const { i18n } = useTranslation();
  const { language } = i18n;

  useEffect(() => {
    setLocale(() => {
      switch (language) {
        case LANG.ES:
          return es;
        case LANG.FR:
          return fr;
        default:
          return enUS;
      }
    });
  }, [language]);

  return { locale, language };
}

export default useLocale;
