/* eslint-disable simple-import-sort/exports */
import useAvailabilityQuery from './use-availabity.query';
import usePropertyQuery from './use-property.query';
import useRatesPlanQuery from './use-rates-plan.query';
import useRoomTypeQuery from './use-roomtype.query';
import useRoomTypesQuery, {
  useRoomTypeWithRatesPlansQuery,
} from './use-roomtypes.query';
import useStripePaymentIntentQuery from './use-stripe.query';

export {
  useAvailabilityQuery,
  usePropertyQuery,
  useRatesPlanQuery,
  useRoomTypeQuery,
  useRoomTypeWithRatesPlansQuery,
  useRoomTypesQuery,
  useStripePaymentIntentQuery,
};
