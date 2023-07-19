import { render, screen } from '@testing-library/react';

import Carousel from './';

describe('Carousel component', () => {
  it('should renders Carousel component correctly', () => {
    render(<Carousel />);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });
});
