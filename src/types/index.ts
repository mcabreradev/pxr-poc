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

export type Amenity = {
  id: number;
  bcomId: unknown;
  otaId?: string;
  name: string;
  description: string;
};

export type Photo = {
  id: number;
  url: string;
  caption: unknown;
  type: string;
  place: string;
  order: number;
  width: unknown;
  height: unknown;
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
