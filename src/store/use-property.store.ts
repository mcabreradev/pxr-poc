import { create } from 'zustand';

import { propertyId } from '@/constants/env';

type Type = {
  propertyId: string;
};

const usePropertyStore = create<Type>(() => ({
  propertyId: propertyId ?? '',
}));

export default usePropertyStore;
