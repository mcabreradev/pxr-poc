import { fireEvent, render, screen } from '@testing-library/react';

import Drawer from './';

describe('Drawer component', () => {
  it('renders children correctly', () => {
    const handleEvent = jest.fn();

    render(
      <Drawer open={true} onClose={handleEvent}>
        Hello World
      </Drawer>,
    );

    expect(screen.getByText('Hello World')).toBeInTheDocument();
  });

  it('calls onClose callback when close button is clicked', () => {
    const handleEvent = jest.fn();

    render(
      <Drawer open={true} onClose={handleEvent}>
        Hello World
      </Drawer>,
    );

    fireEvent.click(screen.getByRole('button'));
    expect(handleEvent).toHaveBeenCalled();
  });
});
