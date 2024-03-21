import { create } from 'zustand';

import { propertyId } from '@/constants/env';

type Type = {
  propertyId: number;
};

const usePropertyStore = create<Type>(() => ({
  propertyId: propertyId,
}));

export default usePropertyStore;
