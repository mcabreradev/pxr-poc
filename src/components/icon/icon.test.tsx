import renderer from 'react-test-renderer';

import Icon from '.';

describe('Icon component', () => {
  test('should render an svg icon', () => {
    renderer.create(<Icon variant='whatsapp' color='red' />);
    // const tree = component.toJSON();
    // expect(tree?.type).toMatch(/span/);
  });
});
