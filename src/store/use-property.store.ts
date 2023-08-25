import { create } from 'zustand';

type Type = {
  propertyId: string;
};

const usePropertyStore = create<Type>(() => ({
  propertyId: process.env.NEXT_PUBLIC_PAXER_HOTEL_ID || '',
}));

export default usePropertyStore;
