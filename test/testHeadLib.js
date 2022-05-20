const { head } = require('../src/headLib.js');
const assert = require('assert');

describe('head', () => {
  it('should display the single line of content', () => {
    assert.strictEqual(head('hello'), 'hello');
    assert.strictEqual(head('bye'), 'bye');
  });

  it('should display the multi line content', () => {
    assert.strictEqual(head('hello\nbye'), 'hello\nbye');
    assert.strictEqual(head('hello\nbye\nhi'), 'hello\nbye\nhi');
  });
});
