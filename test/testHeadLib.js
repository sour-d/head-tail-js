const { head } = require('../src/headLib.js');
const assert = require('assert');

describe('head', () => {
  it('should display the single line of content', () => {
    assert.deepStrictEqual(head('hello'), 'hello');
    assert.deepStrictEqual(head('bye'), 'bye');
  });
});
