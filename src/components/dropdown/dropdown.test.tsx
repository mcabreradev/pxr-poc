import { render, screen } from '@testing-library/react';

import Dropdown from './';

describe('Dropdown component', () => {
  it('should renders Dropdown component correctly', () => {
    render(<Dropdown />);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });
});
