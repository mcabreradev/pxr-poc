import { useEffect } from 'react';

import {
  useGlobalStore,
  useReservationStore,
  useSelectedRoomtypeStore,
} from '@/store';

export default function useResetStores() {
  const { resetReservation } = useReservationStore();
  const { resetSelectedRoomtype } = useSelectedRoomtypeStore();
  const { resetGlobalStore } = useGlobalStore();

  useEffect(() => {
    return () => {
      resetReservation();
      resetSelectedRoomtype();
      resetGlobalStore();
    };
  }, [resetGlobalStore, resetReservation, resetSelectedRoomtype]);
}
