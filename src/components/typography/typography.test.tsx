/* eslint-disable simple-import-sort/imports */
import 'jest-styled-components';
import renderer from 'react-test-renderer';

import Typography from './';

describe('Text component', () => {
  it('should renders Text component correctly', () => {
    const tree = renderer
      .create(
        <Typography variant='base' weight='normal'>
          Hola Paxer
        </Typography>,
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
