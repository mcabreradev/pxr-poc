import { create } from 'zustand';

type Type = {
  propertyId: string;
};

const usePropertyStore = create<Type>(() => ({
  propertyId: process.env.NEXT_PUBLIC_PROPERTY_ID || '',
}));

export default usePropertyStore;
