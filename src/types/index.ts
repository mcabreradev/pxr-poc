import Ratesplan from './ratesplans';

export type PropertyType = {
  id: number;
  name: string;
  email: string;
  phone: string;
  description: Description;
  websiteURL: string;
  countryISO: string;
  countryName: string;
  state: string;
  city: string;
  whatsapp: string;
  reviewRatingScore: number;
  reviewRatingCount: number;
  latitude: number;
  longitude: number;
  tripadvisor: boolean;
  street: string;
  postalCode: unknown;
  roomTypes: number[];
  ratePlans: number[];
  products: number[];
  amenities: Amenity[];
  photos: Photo[];
  reviews: Review[];
  topSights: TopSight[];
};

export type Description = {
  en: string;
};

export type Review = {
  id: string;
  source: string;
  reviewId: string;
  authorURL: string;
  authorPhotoURL: string;
  authorName: string;
  language: string;
  rating: number;
  text: string;
  relativeTime: string;
  submittedAt: string;
  isVisible: boolean;
  isActive: boolean;
};

export type TopSight = {
  id: number;
  source: string;
  name: string;
  googlePlaceId: string;
  iconURL: string;
  photoURL: string;
  rating: number;
  userRatingsTotal: number;
  latitude: number;
  longitude: number;
  isActive: boolean;
};

export type Payment = {
  propertyId: string | number;
  reservationId: string;
  amount: number;
  clientId: number;
  email: string;
  currency: Currency;
  description: string;
  paymentGatewayId: string;
  fees: number[];
  propertyFees: string[] | number[];
  idempotentKey?: string;
  successUrl: string;
  cancelUrl: string;
  offSession: boolean;
};

export type Currency = {
  currencyId: number;
  code: string;
};

export type User = {
  sub: string;
  email: string;
  family_name?: string;
  given_name?: string;
  email_verified: boolean;
  isAuth: boolean;
  err?: unknown;
};

export type EventData = {
  eventType: 'signin' | 'signinModal' | 'signout' | 'getsession' | 'checkuser';
  data: unknown | null;
};

export type RoomTypeName = {
  en: string;
  es: string;
};

export type Room = {
  id: number | null;
  name: string;
  roomTypeId: number | null;
  order: number | null;
  plus: boolean;
  observation: unknown;
  cleaningStatus: string;
  recordStatus: string;
  updatedAt: string;
  createdAt: string;
};

export type Amenity = {
  id: number | null;
  bcomId: string;
  otaId: unknown;
  name: string;
  description: string;
};

export type Photo = {
  id: number | null;
  url: string;
  caption: unknown;
  type: string;
  place: string;
  order: number | null;
  width: unknown;
  height: unknown;
};

export type BedType = {
  id: number | null;
  bcomId: unknown;
  otaId: string;
  name: string;
  description: string;
  numberOfBeds: number | null;
};

export type SelectedRoomtype = {
  id?: number | null;
  name?: RoomTypeName | null;
  propertyId?: number | null;
  description?: null | unknown;
  standardCapacity?: number | null;
  minCapacity?: number;
  maxCapacity?: number;
  childCapacity?: number;
  addCapacity?: number;
  totalRooms?: unknown;
  rooms?: Room[];
  availability?: unknown[];
  amenities?: Amenity[];
  photos?: Photo[];
  bedTypes?: BedType[];
  viewTypes?: unknown[];
  accessibilityFeatures?: unknown[];
  smokePolicy?: string | null;
  roomPrice?: RoomPrice;
  ratesPlan?: { [key: string]: string | number | null | undefined };
};

export type RoomPrice = {
  amountAfterTax?: number | null | undefined;
  amountBeforeTax?: number | null | undefined;
  currency?: number | null | undefined;
  rate?: number | null | undefined;
};

export type Reservation = {
  checkin?: string | Date | null;
  checkout?: string | Date | null;
  adults?: number;
  childrens?: number;
  infants?: number;
  plan?: number | string | null;
  extra?: string | null;
  planCost?: number | null;
  totalCost?: number | null;
  taxes?: number | null;
  extraCost?: number | null;
  cancelationCost?: number | null;
  total?: number | null;
  hasBreakfast?: boolean | null;
  selectedRoom?: { [key: string]: string | number | null | undefined } | null;
  product?: { [key: string]: string | number | null | undefined } | null;
};

export type GeneralPassengerInfo = {
  paxs: string[];
  children: string[];
  infants: string[];
  seniors: string[];
};

export type DetailedPassengerInfo = {
  full_name: string | null;
  first_name: string | null;
  middle_name: string | null;
  primary_last_name: string | null;
  second_last_name: string | null;
  document_id: string | null;
  birthday: string | null;
  age: string | null;
  email: string | null;
  phone: string | null;
  resident: string | null;
  from: string | null;
  country: string | null;
  remarks: string | null;
};

export type ReservedRoom = {
  har_in: string;
  har_out: string;
  har_hab_id?: number | null; // Physical id of the enum, does not have to be sent
  har_tha_id: number; //Room type id
  har_res_id: number;
  har_pla_id: number; // Selected plan
  har_cli_id: number;
  har_hot_id: number;
  har_adults: number;
  har_seniors?: number | null;
  har_children: number;
  har_infants: number;
  har_pax_info: string;
  har_adults_info: string;
  har_childrens_info: string;
  har_seniors_info?: string | null;
  har_infants_info: string;
  har_canc_reason?: string | null; // I don't think we need this one, but technically it's an Enum
  har_cost: number;
  har_commission: number;
  har_commission_amount: number;
  har_commission_percentage: number;
  har_commission_currency: string;
  har_fee_amount: number;
  har_fee_currency: string;
  har_fee_description: string;
  har_fee_includes_taxes: number;
  har_tax_amount: number;
  har_tax_currency: string;
  har_cancel_amount: number;
  har_surchage: number;
  har_surchage_currency: string;
  har_check_in: Date;
  har_check_out: Date;
  har_last_date_account_closed: string;
  har_additional_field_1?: string | null;
  har_additional_field_2?: string | null;
  har_additional_field_3?: string | null;
  har_overbooking: number;
  har_rcld_channel_commission: number;
  har_channel_additional_information: string;
  har_removed_from_the_booking: number;
  har_cancellation_date: Date;
  har_cancellation_user: number;
  har_status_reg: string;
  har_updated_by: number;
};

export type CMAValue = {
  exr_cma_value_1: string | null;
  exr_cma_value_2: string | null;
  exr_cma_value_3: string | null;
};

export type Extras = {
  ext_id: number;
  mon_id: number;
  quantity: number;
  cost: number;
  cma_values: CMAValue[];
};

export type ReservationRequest = {
  property_id: number;
  guest_id: string;
  sales_channel_type: string;
  process_state: string;
  date_in: string; // Like this: 2024-03-07
  date_out: string; // Same as above
  mon_id: number;
  mon_iso: string;
  total_cost: number;
  room_types_cost: number;
  guest_mon_iso: string;
  mon_commission_id: number;
  is_default_commission: number;
  reservation_status: string;
  room_types: ReservedRoom[];
  extras: Extras[];
  //
  adults_amounts: number;
  additional_fields_values: string;
  reg_status: string;
  sales_origin_type: string;
  send_confirmed_email: number;
  confirmed_email_active: number;
  thank_you_email_to_pax_active: number;
  send_payment_email: number;
  new_booking_email_send_to_hotel: number;
  confirmed_agreement: number;
};

export type { Ratesplan };
