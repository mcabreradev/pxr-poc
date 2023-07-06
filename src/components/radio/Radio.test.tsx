import { render } from '@testing-library/react';
import React from 'react';

import Radio from './Radio';

describe('Radio component', () => {
  it('renders Radio correctly', () => {
    const { getByRole } = render(<Radio role='radio' />);
    const radioElement = getByRole('radio');
    expect(radioElement).toBeInTheDocument();
  });
});
