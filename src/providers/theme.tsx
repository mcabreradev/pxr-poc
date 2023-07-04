'use client';

import { Flowbite } from 'flowbite-react';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Flowbite>{children}</Flowbite>;
}
