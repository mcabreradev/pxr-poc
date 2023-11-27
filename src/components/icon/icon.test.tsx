import { render } from '@testing-library/react';

import Icon from '.';

describe('Icon component', () => {
  test('should render an svg icon', () => {
    render(<Icon variant='whatsapp' color='red' />);
    // const tree = component.toJSON();
    // expect(tree?.type).toMatch(/span/);
  });
});
