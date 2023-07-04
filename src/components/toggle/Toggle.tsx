import { Switch } from '@material-tailwind/react';

import { cn } from '@/lib/utils';
interface Props {
  onClick?: () => void;
  className?: string;
  label?: string;
}

export default function Toogle({ className, label, onClick }: Props) {
  return (
    <div className='space-x-8'>
      <Switch
        id='custom-switch-component'
        ripple={false}
        className={cn(
          `
          peer-checked:border-bg-paxer-green h-full 
          w-full 
          border-none checked:bg-paxer-green
          checked:bg-none 
          checked:ring-transparent
          hover:checked:bg-paxer-green
          focus:ring-0
          active:bg-paxer-green
          active:checked:bg-paxer-green peer-checked:before:bg-paxer-green
          `,
          className
        )}
        containerProps={{
          className: 'w-11 h-6',
        }}
        circleProps={{
          className: 'before:hidden left-0.5 border-none',
        }}
        labelProps={{
          className: '',
        }}
        label={label}
        onClick={onClick}
      />
    </div>
  );
}
