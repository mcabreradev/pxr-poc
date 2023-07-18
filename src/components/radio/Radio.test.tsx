import { fireEvent, render, screen } from '@testing-library/react';

import Radio from './';

describe('Radio component', () => {
  it('should renders Radio component correctly', () => {
    render(<Radio />);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });

  it('should renders Radio component initially unchecked', () => {
    render(<Radio />);
    const element = screen.getByTestId('test-element');
    expect(element).not.toBeChecked();
  });

  test('should changes value on click', () => {
    render(<Radio />);
    const element = screen.getByTestId('test-element');
    fireEvent.click(element);
    expect(element).toBeChecked();
  });
});
