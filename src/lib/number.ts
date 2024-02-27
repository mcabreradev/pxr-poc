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

export const getRatesPerRoom = (ratesPlan, roomId) => {
  if (!ratesPlan) return;

  const plan = ratesPlan.filter(({ roomTypeId }) => roomTypeId === roomId)[0];
  if (!plan) return;

  const productDates = Object.keys(plan?.productDates).map(
    (date) => plan?.productDates[date],
  );
  const rates = productDates[0].rates[1];

  return {
    ...rates,
    currency: productDates[0].currency,
  };
};
