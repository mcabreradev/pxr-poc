import { Icon } from '@iconify/react';

import icons_list from './icon.data.json';

interface Props {
  id?: string;
  className?: string;
  variant?: string;
  width?: string | number;
  height?: string | number;
  color?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

export default function IconComponent({
  id,
  className,
  variant = 'hotel',
  width,
  height,
  color = '#000000',
  onClick,
  style,
}: Props) {
  return (
    <Icon
      id={id}
      icon={icons_list[variant]}
      width={width}
      height={height}
      className={className}
      color={color}
      style={style}
      data-testid='test-element'
      onClick={onClick}
    />
  );
}
