import { render, screen } from '@testing-library/react';

import Carousel from './';

describe('Carousel component', () => {
  it('should renders Carousel component correctly', () => {
    render(
      <Carousel>
        <div>Test</div>
        <div>Test</div>
        <div>Test</div>
      </Carousel>,
    );
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });
});
