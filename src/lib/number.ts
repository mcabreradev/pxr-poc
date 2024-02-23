import { CURRENCIES, PROPERTY_CURRENCY } from '@/constants';

export const formatCurrency = (
  amount: number,
  currency: string = PROPERTY_CURRENCY,
) => {
  const currencyLocale = CURRENCIES.find((c) => c.currency === currency);

  const { format, currencyDisplay } = currencyLocale!; // Add type assertion to ensure currencyLocale is not undefined

  return new Intl.NumberFormat(format, {
    style: 'currency',
    currency,
    currencyDisplay,
  }).format(amount);
};
