import { render, screen } from '@testing-library/react';

import Header from './index';

describe('Header component', () => {
  it('should renders Header component correctly', () => {
    render(<Header />);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });
});
