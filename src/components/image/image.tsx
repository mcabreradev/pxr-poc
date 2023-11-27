import NextImage, { ImageProps } from 'next/image';
import * as React from 'react';

import { cn } from '@/lib/utils';

type Props = {
  useSkeleton?: boolean;
  classNames?: {
    image?: string;
    blur?: string;
  };
  alt: string;
  onClick?: () => void;
} & (
  | { width: string | number; height: string | number }
  | { fill: boolean; width?: string | number; height?: string | number }
) &
  ImageProps;

/**
 *
 * @description Must set width using `w-` className
 * @param useSkeleton add background with pulse animation, don't use it if image is transparent
 */
export default function Image({
  useSkeleton = true,
  src,
  width,
  height,
  alt,
  className,
  classNames,
  fill = false,
  onClick,
  ...rest
}: Props) {
  const [status, setStatus] = React.useState(
    useSkeleton ? 'loading' : 'complete',
  );
  const widthIsSet = className?.includes('w-') ?? false;

  return (
    <figure
      style={!widthIsSet ? { width: `${width}px` } : undefined}
      className={cn('w-full', className)}
      data-testid='test-element'
      onClick={onClick}
    >
      <NextImage
        className={cn(
          'relative !h-[unset] !w-full !object-contain',
          classNames?.image,
          status === 'loading' && cn('animate-pulse', classNames?.blur),
        )}
        src={src}
        width={width}
        height={height}
        alt={alt}
        onLoadingComplete={() => setStatus('complete')}
        fill={fill}
        {...rest}
      />
    </figure>
  );
}
