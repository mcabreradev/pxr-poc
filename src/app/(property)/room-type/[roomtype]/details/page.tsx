'use client';

import useHydration from '@/hooks/use-hydration';

import DetailsComponent from '@/features/guest-details/details';

type Props = {
  params: { roomtype: string };
  searchParams: { action: string };
};

export default function Page(props: Props) {
  const {
    params: { roomtype },
    searchParams: { action },
  } = props;

  const { isHydrated } = useHydration();
  if (!isHydrated) return null;

  return <DetailsComponent roomtype={roomtype} action={action} />;
}
