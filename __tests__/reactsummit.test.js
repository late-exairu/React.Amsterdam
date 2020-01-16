import regeneratorRuntime from "regenerator-runtime";
// import { getContent } from '@focus-reactive/graphql-content-layer';
var { getContent } = require('../content');

describe('JsNation', () => {
  it('should render content', async () => {
    const content = await getContent();

    expect(content).toMatchSnapshot();
  });
});
