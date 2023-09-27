import { create } from 'zustand';

import { propertyId } from '@/constant/env';

type Type = {
  propertyId: string;
};

const usePropertyStore = create<Type>(() => ({
  propertyId: propertyId ?? '',
}));

export default usePropertyStore;
