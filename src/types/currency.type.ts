export type CurrencyCode = string & ('EUR' | 'USD' | 'CLP' | 'ARS');

export type Currency = {
  currencyId?: number;
  code?: CurrencyCode | null;
};

export default Currency;
