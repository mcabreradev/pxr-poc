import React from 'react';
import tw from 'tailwind-styled-components';

const getFontWeight = (weight: TextFontWeight | undefined) => {
  switch (weight) {
    case TextFontWeight.bold:
      return `font-bold`;
    case TextFontWeight.semibold:
      return `font-semibold`;
    case TextFontWeight.medium:
      return `font-medium`;
    case TextFontWeight.normal:
      return `font-normal`;
    case TextFontWeight.light:
      return `font-light`;
  }
};

const getVariant = (variant: TextVariant | undefined) => {
  switch (variant) {
    /** 24 */
    case TextVariant.h1:
      return `text-5xl`;
    case TextVariant.xl5:
      return `text-5xl`;

    /** 20 */
    case TextVariant.h2:
      return `text-xl`;
    case TextVariant.xl:
      return `text-xl`;

    /** 16 */
    case TextVariant.h3:
      return `text-base`;
    case TextVariant.base:
      return `text-base`;

    /** 14 */
    case TextVariant.h4:
      return `text-sm`;
    case TextVariant.sm:
      return `text-sm`;

    /** 13px */
    case TextVariant.sm2:
      return `text-2sm`;

    /** 12px */
    case TextVariant.xs:
      return `text-xs`;

    /** 11px */
    case TextVariant.xs2:
      return `text-3xs`;

    /** 10px */
    case TextVariant.xs3:
      return `text-3xs`;
  }
};

export enum TextVariant {
  xl5,
  xl,
  h1,
  h2,
  h3,
  h4,
  base,
  sm,
  sm2,
  xs,
  xs2,
  xs3,
}

export enum TextFontWeight {
  bold,
  semibold,
  medium,
  normal,
  light,
}

export type TextProps = {
  variant?: TextVariant;
  weight?: TextFontWeight | undefined;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

const StyledSpan = tw.div<TextProps>`
  font-normal
  leading-[160%]
  ${({ variant }) => getVariant(variant)}
  ${({ weight }) => getFontWeight(weight)}
`;

const Typography = ({
  className,
  variant = undefined,
  weight = undefined,
  children,
  ...rest
}: TextProps) => {
  return (
    <StyledSpan
      variant={variant}
      weight={weight}
      className={className}
      {...rest}
    >
      {children}
    </StyledSpan>
  );
};
export default Typography;
