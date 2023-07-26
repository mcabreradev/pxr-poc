import { Icon } from '@iconify/react';

import icons_list from './icon.data.json';

interface Props {
  id?: string;
  className?: string;
  icon?: string;
  width?: string | number;
  height?: string | number;
  color?: string;
}

export default function IconComponent({
  id,
  className,
  icon = 'hotel',
  width,
  height,
  color = '#000000',
}: Props) {
  return (
    <Icon
      id={id}
      icon={icons_list[icon]}
      width={width}
      height={height}
      className={className}
      color={color}
      data-testid='test-element'
    />
  );
}
