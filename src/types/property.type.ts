import { Amenity } from './amenity.type';
import { Photo } from './photo.type';
import { Review } from './review.type';
import { TopSight } from './topsight.type';

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
