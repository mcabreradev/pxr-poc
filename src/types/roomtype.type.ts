import { Amenity } from './amenity.type';
import { Photo } from './photo.type';

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

export type BedType = {
  id: number | null;
  bcomId: unknown;
  otaId: string;
  name: string;
  description: string;
  numberOfBeds: number | null;
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
