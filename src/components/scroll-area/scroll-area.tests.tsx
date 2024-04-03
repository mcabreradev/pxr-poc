import { render, screen } from '@testing-library/react';

import ScrollArea from './';

describe('ScrollArea component', () => {
  it('should renders ScrollArea component correctly', () => {
    render(<ScrollArea />);
    const element = screen.getByTestId('test-scroll-element');
    expect(element).toBeInTheDocument();
  });
});
