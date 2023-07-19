import { Icon } from '@iconify/react';

import icons_list from './Icon.data.json';

interface Props {
  className?: string;
  icon?: string;
  width?: string | number;
  height?: string | number;
  color?: string;
}

export default function IconComponent({
  className,
  icon = 'hotel',
  width,
  height,
  color = '#000000',
}: Props) {
  return (
    <Icon
      icon={icons_list[icon]}
      width={width}
      height={height}
      className={className}
      color={color}
      data-testid='test-element'
    />
  );
}
