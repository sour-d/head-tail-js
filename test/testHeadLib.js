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

  it('should display only 3 line', () => {
    assert.strictEqual(head('hello\nbye\nbye\nhi'), 'hello\nbye\nbye');
    assert.strictEqual(head('1\n2\n3\n4'), '1\n2\n3');
  });
});
