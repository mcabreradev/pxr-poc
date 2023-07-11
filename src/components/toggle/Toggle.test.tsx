import { fireEvent, render, screen } from '@testing-library/react';

import Toggle from './Toggle';

describe('toggle component', () => {
  it('renders toogle without errors', () => {
    render(<Toggle />);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });

  it('initially unchecked', () => {
    render(<Toggle />);
    const element = screen.getByTestId('test-element');
    expect(element).not.toBeChecked();
  });

  test('changes value on click', () => {
    render(<Toggle />);
    const element = screen.getByTestId('test-element');
    fireEvent.click(element);
    expect(element).toBeChecked();
  });

  it('checks if toggle is readonly and unchecked', () => {
    render(<Toggle readonly={true} />);
    const element = screen.getByTestId('test-element');
    fireEvent.click(element);
    expect(element).not.toBeChecked();
  });

  it('checks if toggle is readonly and checked', () => {
    render(<Toggle toggled={true} readonly={true} />);
    const element = screen.getByTestId('test-element');
    fireEvent.click(element);
    expect(element).toBeChecked();
  });
});
