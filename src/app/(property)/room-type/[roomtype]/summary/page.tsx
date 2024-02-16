'use client';

import useHydration from '@/hooks/use-hydration';

import SummaryFeature from '@/features/summary/page';

type Props = {
  params: { roomtype: string };
};

export default function Page(props: Props) {
  const {
    params: { roomtype },
  } = props;

  const { isHydrated } = useHydration();
  if (!isHydrated) return null;

  return <SummaryFeature roomtype={roomtype} />;
}
