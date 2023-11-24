import { render, screen } from '@testing-library/react';

import Navbar from '.';

describe('Navbar component', () => {
  it('should renders Navbar component correctly', () => {
    render(<Navbar />);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });
});
