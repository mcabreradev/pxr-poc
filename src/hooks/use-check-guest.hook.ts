import { useReservationStore } from '@/store';

import { useCheckGuestMutation } from '@/mutations';

import { User } from '@/types';

/**
 * Hook to check if the user is a paxer guest and set the reservation.
 */
export default function useCheckGuestHook() {
  const { setReservation } = useReservationStore();
  const checkGuestMutation = useCheckGuestMutation();

  const checkGuest = async (user: User) => {
    const { guestPaxerId } = await checkGuestMutation.mutateAsync({
      guestIAMId: user.sub,
      displayName: `${user.given_name} ${user.family_name}`,
      lastName: user.family_name,
      firstName: user.given_name,
      acceptedTerms: true,
    });
    setReservation({ guestPaxerId });
  };

  return checkGuest;
}
