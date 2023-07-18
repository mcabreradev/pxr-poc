import { render, screen } from '@testing-library/react';

import Loading from '.';

describe('Loading component', () => {
  it('should renders Loading component correctly', () => {
    render(<Loading />);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });
});
