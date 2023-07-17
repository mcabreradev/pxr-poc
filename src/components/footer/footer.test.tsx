import { render, screen } from '@testing-library/react';

import Footer from './';

describe('Footer component', () => {
  it('renders Footer correctly', () => {
    render(<Footer />);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });
});
