'use client';

import useHydration from '@/hooks/use-hydration';

import PaymentFeature from '@/features/payment/page';

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

  return <PaymentFeature roomtype={roomtype} action={action} />;
}
