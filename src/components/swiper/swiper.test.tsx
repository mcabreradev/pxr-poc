import { render, screen } from '@testing-library/react';

import Swiper from './';

describe('Swiper component', () => {
  it('should renders Swiper component correctly', () => {
    render(
      <Swiper>
        <div>test 1</div>
        <div>test 2</div>
        <div>test 3</div>
        <div>test 4</div>
      </Swiper>,
    );
    const element = screen.getByTestId('test-element');
    expect(element).toBeInTheDocument();
  });
});
