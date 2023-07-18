import { fireEvent, render, screen } from '@testing-library/react';

import Checkbox from './checkbox';

describe('Checkbox component', () => {
  it('should renders Checkbox correctly', () => {
    render(<Checkbox />);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });

  it('should renders initially unchecked', () => {
    render(<Checkbox />);
    const element = screen.getByTestId('test-element');
    expect(element).not.toBeChecked();
  });

  test('should changes value on click', () => {
    render(<Checkbox />);
    const element = screen.getByTestId('test-element');
    fireEvent.click(element);
    expect(element).toBeChecked();
  });
});
