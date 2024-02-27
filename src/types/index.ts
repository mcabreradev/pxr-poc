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
  sub?: string;
  email?: string;
  family_name?: string;
  given_name?: string;
  email_verified?: boolean;
  password?: string;
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
  plan?: string | null;
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
