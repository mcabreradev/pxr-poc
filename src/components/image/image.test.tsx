import { render, screen } from '@testing-library/react';

import Image from './';

describe('Image component', () => {
  it('should renders Image component correctly', () => {
    render(<Image src='/images/og.jpg' alt='image' fill />);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });
});
