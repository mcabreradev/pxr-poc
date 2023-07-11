import { fireEvent, render, screen } from '@testing-library/react';

import Radio from './Radio';

describe('Radio component', () => {
  it('renders Radio correctly', () => {
    render(<Radio />);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });

  it('initially unchecked', () => {
    render(<Radio />);
    const element = screen.getByTestId('test-element');
    expect(element).not.toBeChecked();
  });

  test('changes value on click', () => {
    render(<Radio />);
    const element = screen.getByTestId('test-element');
    fireEvent.click(element);
    expect(element).toBeChecked();
  });
});
