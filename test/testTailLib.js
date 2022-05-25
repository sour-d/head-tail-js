const assert = require('assert');
const { tailMain } = require('../src/tailLib.js');

describe.only('tailMain', () => {
  it('should return last two lines', () => {
    const options = { numOfLines: 2 }
    assert.deepStrictEqual(tailMain('1\n2\n3\n4\n6\n6\n7', options), '6\n7');
  });
});
