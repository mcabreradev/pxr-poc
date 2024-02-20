'use client';

import useHydration from '@/hooks/use-hydration';

import PaymentFeature from '@/features/payment/page';

type Props = {
  params: { roomTypeId: number };
  searchParams: { action: string };
};

export default function Page(props: Props) {
  const {
    params: { roomTypeId },
    searchParams: { action },
  } = props;

  const { isHydrated } = useHydration();
  if (!isHydrated) return null;

  return <PaymentFeature roomTypeId={roomTypeId} action={action} />;
}
