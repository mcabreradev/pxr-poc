import { render, screen } from '@testing-library/react';

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
});
