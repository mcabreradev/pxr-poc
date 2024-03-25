'use client';

import useHydration from '@/hooks/use-hydration.hook';

import DetailsComponent from '@/features/guest-details/page';

type Props = {
  params: { roomTypeId: number };
  searchParams: { action: string };
};

export default function Page(props: Props) {
  const {
    params: { roomTypeId },
  } = props;

  const { isHydrated } = useHydration();
  if (!isHydrated) return null;

  return <DetailsComponent roomTypeId={roomTypeId} />;
}
