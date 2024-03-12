'use client';

import useHydration from '@/hooks/use-hydration';

import SummaryFeature from '@/features/summary/page';

type Props = {
  params: { roomTypeId: number };
};

export default function Page(props: Props) {
  const {
    params: { roomTypeId },
  } = props;

  const { isHydrated } = useHydration();
  if (!isHydrated) return null;

  return <SummaryFeature roomType={roomTypeId} />;
}
