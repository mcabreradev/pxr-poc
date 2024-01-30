import { render, screen } from '@testing-library/react';

import Drawer from './';

describe('Drawer component', () => {
  it('should renders Drawer component correctly', () => {
    render(<Drawer />);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });
});
