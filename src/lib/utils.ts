/* eslint-disable simple-import-sort/imports */
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapObject(obj) {
  return Object.entries(obj);
}

export function timeout(delay: number) {
  return new Promise((res) => setTimeout(res, delay));
}
