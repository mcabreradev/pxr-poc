import { render, screen } from '@testing-library/react';

import Wrapper from '@/__tests__/react-query-wrapper';

import Footer from '.';

test('Footer component', async () => {
  const renderComponent = () =>
    render(
      <Wrapper>
        <Footer />
      </Wrapper>,
    );

  await renderComponent();

  const element = screen.getByTestId('test-element');
  expect(element).toBeInTheDocument();
});
