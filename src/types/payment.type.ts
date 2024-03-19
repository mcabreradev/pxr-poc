import { Currency } from './currency.type';

export type Payment = {
  propertyId?: unknown;
  reservationId?: unknown;
  amount?: unknown;
  clientId?: unknown;
  email?: unknown;
  currency?: Currency;
  description?: unknown;
  paymentGatewayId?: unknown;
  fees?: unknown[];
  propertyFees?: unknown[];
  idempotentKey?: unknown;
  successUrl?: unknown;
  cancelUrl?: unknown;
  offSession?: unknown;
};
