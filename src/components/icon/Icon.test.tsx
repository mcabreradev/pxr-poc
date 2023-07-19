import { render, screen } from '@testing-library/react';

import Icon from './';

describe('Icon component', () => {
  it('should renders Icon component correctly', () => {
    render(<Icon />);
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });
});
