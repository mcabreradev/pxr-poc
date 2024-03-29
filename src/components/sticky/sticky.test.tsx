import { render, screen } from '@testing-library/react';

import Sticky from './';

describe('Sticky component', () => {
  it('should renders Sticky component correctly', () => {
    render(
      <Sticky>
        <div data-testid='test-children-element'>test</div>
      </Sticky>,
    );
    const element = screen.getByTestId('test-sticky-element');
    expect(element).toBeInTheDocument();
  });

  it('should renders Sticky children correctly', () => {
    render(
      <Sticky>
        <div data-testid='test-children-element'>test</div>
      </Sticky>,
    );
    const element = screen.getByTestId('test-children-element');
    expect(element).toBeInTheDocument();
  });
});
