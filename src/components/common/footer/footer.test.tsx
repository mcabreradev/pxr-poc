import { render, screen } from '@testing-library/react';

import I18nProvider from '@/providers/i18n-provider';

import Footer from '.';

describe('Footer component', () => {
  const renderComponent = () =>
    render(
      <I18nProvider>
        <Footer />
      </I18nProvider>,
    );

  renderComponent();

  it('should render without crashing', () => {
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });
});
