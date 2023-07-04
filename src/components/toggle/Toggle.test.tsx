import { fireEvent, render } from '@testing-library/react';
import React from 'react';

import Toggle from './Toggle';

describe('Toggle component', () => {
  it('renders without errors', () => {
    render(<Toggle />);
  });

  test('initially unchecked', () => {
    const label = 'Toggle me';
    const { getByLabelText } = render(<Toggle label={label} />);
    const checkbox = getByLabelText(label);
    expect(checkbox?.checked).toBe(false);
  });

  it('renders toogle component correctly', () => {
    const label = 'Toggle me';
    const { getByText } = render(<Toggle label={label} />);
    const toggleElement = getByText('Toggle me');
    expect(toggleElement).toBeInTheDocument();
  });

  test('changes value on click', () => {
    const label = 'Toggle me';
    const { getByLabelText } = render(<Toggle label={label} />);
    const checkbox = getByLabelText(label);
    fireEvent.click(checkbox);
    expect(checkbox?.checked).toBe(true);
  });

  test('calls onClick callback', () => {
    const label = 'Toggle me';
    const handleClick = jest.fn();
    const { getByLabelText } = render(
      <Toggle label={label} onClick={handleClick} />
    );
    const checkbox = getByLabelText(label);
    fireEvent.click(checkbox);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
