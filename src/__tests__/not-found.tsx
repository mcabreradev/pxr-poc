import { render, screen } from '@testing-library/react';

import NotFoundPage from '@/app/not-found';

describe('Not Found Page', () => {
  it('renders a heading', () => {
    render(<NotFoundPage />);

    const heading = screen.getByText(/not found/i);

    expect(heading).toBeInTheDocument();
  });
});
