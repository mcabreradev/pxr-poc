import { render, screen } from '@testing-library/react';

import Modal from './';

describe('Modal component', () => {
  it('should renders Modal component correctly', () => {
    render(
      <Modal header='header' body='body' footer='footer' openModal={true} />,
    );
    const element = screen.getByTestId('modal-test-element');
    expect(element).toBeInTheDocument();
  });
});
