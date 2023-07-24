/* eslint-disable simple-import-sort/imports */
import 'jest-styled-components';
import renderer from 'react-test-renderer';

import { Text } from '.';

describe('Text component', () => {
  it('should renders Text component correctly', () => {
    const tree = renderer.create(<Text>Hello Paxer!</Text>).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
