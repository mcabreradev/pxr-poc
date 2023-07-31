import { fireEvent, render, screen } from '@testing-library/react';

import Button from '.';

describe('Button component', () => {
  it('should renders button correctly', () => {
    render(<Button variant='primary'>Click me</Button>);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });

  it('should fires onClick event when clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button variant='secondary' onClick={handleClick}>Click me</Button>,
    );
    const buttonElement = getByText('Click me');
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
