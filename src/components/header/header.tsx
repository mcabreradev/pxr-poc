import tw from 'tailwind-styled-components';

import Logo from '~/svg/Paxer.svg';

interface Props {
  className?: string;
}

const Container = tw.header`
  flex
  border-b-[0.5px] border-solid border-white-200
  p-[10px] pl-[8px]
`;

export default function Header({ className }: Props) {
  return (
    <Container className={className} data-testid='test-element'>
      <Logo className='h-[38px] w-[103px]' />
    </Container>
  );
}
