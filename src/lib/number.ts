import { LOCALES } from '@/constants';

export const formatCurrency = (numero: number, locale: string = 'us') => {
  const format = LOCALES?.[locale]?.format;
  const currency = LOCALES?.[locale]?.currency;
  const currencyDisplay = LOCALES?.[locale]?.currencyDisplay;
  return new Intl.NumberFormat(format, {
    style: 'currency',
    currency,
    currencyDisplay,
  }).format(numero);
};
