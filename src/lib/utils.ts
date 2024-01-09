/* eslint-disable simple-import-sort/imports */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { uid } from 'uid';

import { PLURAL, SINGULAR } from '@/constants';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapObject(obj) {
  return Object.entries(obj);
}

export function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}

export function uuid() {
  return uid();
}

export function isBrowser() {
  return typeof window !== 'undefined';
}

export function getBreackpointHeight({
  height,
  width,
  breakpoint,
}: {
  height: number;
  width: number;
  breakpoint: number;
}) {
  return Math.round((height / width) * breakpoint);
}

export function getSrcSet({
  src,
  height,
  width,
  breakpoints,
}: {
  src: string;
  height: number;
  width: number;
  breakpoints: number[];
}) {
  return breakpoints.map((breakpoint) => {
    const breakpintHeight = getBreackpointHeight({ height, width, breakpoint });
    return {
      src: src,
      width: breakpoint,
      height: breakpintHeight,
    };
  });
}

export function p(word: string, count: number, plural?: string) {
  return count === 1 ? word : `${word + (plural || 's')}`;
}

export function plural(word: string, count: number, plural?: string) {
  return `${word} ${p(word, count, plural)}`;
}

export function ps(count: number) {
  return count > 1 ? PLURAL : SINGULAR;
}

export function formatDate(date) {
  if (!date) return '';

  const d = date.split('-');
  const day = d[1];
  const month = d[2];
  const year = d[0];
  return [day, month, year].join('-');
}

export function reFormatDate(date: Date | string) {
  const d = new Date(date?.toString());
  let month = '' + (d.getMonth() + 1),
    day = '' + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
