'use client';

import { Button as Base } from 'flowbite-react';
import React from 'react';
import tw from 'tailwind-styled-components';

import { cn } from '@/lib/utils';

interface Props {
  onClick?: () => void;
  className?: string;
  children: React.ReactNode;
}

const Component = tw(Base)`
  [background:linear-gradient(180deg,_#2ec392,_#27a97e)] 
  box-border 
  flex flex-row items-center justify-center
  h-[40px] w-full
  p-2 
  rounded 
  focus:ring-green-300 disabled:hover:bg-cyan-700 disabled:bg-cyan-700
`;

const Label = tw.span`
  font-normal
  leading-[24px]
  text-base
  text-white
`;

export default function Button({ onClick, children, className }: Props) {
  return (
    <Component className={cn(className)} onClick={onClick}>
      <Label>{children}</Label>
    </Component>
  );
}
