'use client';

import { ThemeProvider as MaterialProvider } from '@material-tailwind/react';
import { Flowbite } from 'flowbite-react';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Flowbite>
      <MaterialProvider>{children}</MaterialProvider>
    </Flowbite>
  );
}
