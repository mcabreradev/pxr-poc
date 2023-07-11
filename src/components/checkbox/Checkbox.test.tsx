import { fireEvent, render, screen } from '@testing-library/react';

import Checkbox from './Checkbox';

describe('Checkbox component', () => {
  it('renders Checkbox correctly', () => {
    render(<Checkbox />);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });

  it('initially unchecked', () => {
    render(<Checkbox />);
    const element = screen.getByTestId('test-element');
    expect(element).not.toBeChecked();
  });

  test('changes value on click', () => {
    render(<Checkbox />);
    const element = screen.getByTestId('test-element');
    fireEvent.click(element);
    expect(element).toBeChecked();
  });
});
