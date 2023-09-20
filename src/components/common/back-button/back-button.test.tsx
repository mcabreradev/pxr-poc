import { render, screen } from '@testing-library/react';

import BackButton from './';

describe('BackButton component', () => {
  it('should renders BackButton component correctly', () => {
    render(<BackButton>Regresar</BackButton>);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });
});
