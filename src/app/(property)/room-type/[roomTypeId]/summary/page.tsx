'use client';

import useHydration from '@/hooks/use-hydration';

import SummaryFeature from '@/features/summary/page';

type Props = {
  params: { roomType: number };
};

export default function Page(props: Props) {
  const {
    params: { roomType },
  } = props;

  const { isHydrated } = useHydration();
  if (!isHydrated) return null;

  return <SummaryFeature roomType={roomType} />;
}
