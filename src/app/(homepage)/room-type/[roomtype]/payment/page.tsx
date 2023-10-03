'use client';

import useHydration from '@/hooks/use-hydration';

import PaymentPage from '@/features/payment/page';

export default function Page() {
  const { isHydrated } = useHydration();
  if (!isHydrated) return null;

  return <PaymentPage />;
}
