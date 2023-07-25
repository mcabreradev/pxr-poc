/* eslint-disable simple-import-sort/imports */
import 'jest-styled-components';
import renderer from 'react-test-renderer';

import Typography, { TextVariant } from './';

describe('Text component', () => {
  it('should renders Text component correctly', () => {
    const tree = renderer
      .create(<Typography variant={TextVariant.base}>Hello Paxer!</Typography>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
