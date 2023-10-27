import React from 'react';
import tw from 'tailwind-styled-components';

import { TAG } from '@/constant';

const getFontWeight = (weight: FontWeight | undefined) => {
  switch (weight) {
    case 'bold':
      return `font-bold`;
    case 'semibold':
      return `font-semibold`;
    case 'medium':
      return `font-medium`;
    case 'normal':
      return `font-normal`;
    case 'light':
      return `font-light`;
    case 'extralight':
      return `font-extralight`;
    case 'thin':
      return `font-thin`;
  }
};

const getVariant = (variant: TextVariant | undefined) => {
  switch (variant) {
    /** 24 */
    case 'h1':
      return `text-5xl`;
    case 'xl5':
      return `text-5xl`;

    /** 20 */
    case 'h2':
      return `text-xl`;
    case 'xl':
      return `text-xl`;

    /** 16 */
    case 'h3':
      return `text-base`;
    case 'base':
      return `text-base`;

    /** 14 */
    case 'h4':
      return `text-sm`;
    case 'sm':
      return `text-sm`;

    /** 13px */
    case 'sm2':
      return `text-2sm`;

    /** 12px */
    case 'xs':
      return `text-xs`;

    /** 11px */
    case 'xs2':
      return `text-3xs`;

    /** 10px */
    case 'xs3':
      return `text-3xs`;
  }
};

export type TextVariant =
  | 'xl5'
  | 'xl'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'base'
  | 'sm'
  | 'sm2'
  | 'xs'
  | 'xs2'
  | 'xs3';

export type FontWeight =
  | 'bold'
  | 'semibold'
  | 'medium'
  | 'normal'
  | 'light'
  | 'extralight'
  | 'thin';

type TagType = 'span' | 'div' | 'label' | string;

export type TextProps = {
  id?: string;
  variant?: TextVariant;
  weight?: FontWeight;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  tag?: TagType;
};

const StyledSpan = tw.span<TextProps>`
  font-normal
  leading-[160%]
  ${({ variant }) => getVariant(variant)}
  ${({ weight }) => getFontWeight(weight)}
`;

const StyledDiv = tw.div<TextProps>`
  font-normal
  leading-[160%]
  ${({ variant }) => getVariant(variant)}
  ${({ weight }) => getFontWeight(weight)}
`;

const StyledLabel = tw.label<TextProps>`
  font-normal
  leading-[160%]
  ${({ variant }) => getVariant(variant)}
  ${({ weight }) => getFontWeight(weight)}
`;

const Typography = ({
  id,
  className,
  variant = 'sm',
  weight = undefined,
  children,
  tag = TAG.DIV,
  ...rest
}: TextProps) => {
  if (tag === TAG.SPAN) {
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
  }

  if (tag === TAG.LABEL) {
    return (
      <StyledLabel
        id={id}
        variant={variant}
        weight={weight}
        className={className}
        {...rest}
      >
        {children}
      </StyledLabel>
    );
  }

  return (
    <StyledDiv
      id={id}
      variant={variant}
      weight={weight}
      className={className}
      {...rest}
    >
      {children}
    </StyledDiv>
  );
};
export default Typography;
