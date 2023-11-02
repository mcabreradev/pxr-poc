/* eslint-disable simple-import-sort/imports */
import 'jest-styled-components';

import { render, screen } from '@testing-library/react';
import Typography from './';

describe('Text component', () => {
  it('should renders Text component correctly', async () => {
    const text = 'Hola Paxer!';
    const renderComponent = () =>
      render(
        <Typography variant='base' weight='normal'>
          {text}
        </Typography>,
      );

    await renderComponent();
    const element = screen.getByText(text);
    // expect(element).toMatchSnapshot();
    expect(element).toBeInTheDocument();
  });
});
