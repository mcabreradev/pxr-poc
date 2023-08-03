import { render, screen } from '@testing-library/react';

import img from '@/public/images/og.jpg';

import Image from './';

describe('Image component', () => {
  it('should renders Image component correctly', () => {
    render(<Image src={img} alt='image' fill />);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });
});
