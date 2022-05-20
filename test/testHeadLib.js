const { head, firstNLines } = require('../src/headLib.js');
const assert = require('assert');

describe('head', () => {
  it('should display the single line of content', () => {
    assert.strictEqual(head('hello', 1), 'hello');
    assert.strictEqual(head('bye', 1), 'bye');
  });

  it('should display first 2 lines', () => {
    assert.strictEqual(head('Hello\nBye', 2), 'Hello\nBye');
    assert.strictEqual(head('Hello\nBye\nHi', 2), 'Hello\nBye');
  });

  it('should display first 3 lines', () => {
    const content = 'One\nTwo\nThree\nFour';
    assert.strictEqual(head(content, 3), 'One\nTwo\nThree');
  });

  it('should display first 4 lines', () => {
    const content = 'One\nTwo\nThree\nFour';
    assert.strictEqual(head(content, 4), content);
  });

  it('should display 3 lines if line count not passed', () => {
    const content = 'One\nTwo\nThree\nFour';
    assert.strictEqual(head(content), 'One\nTwo\nThree');
  });
});

describe('firstNLines', () => {
  it('Should filter single line', () => {
    assert.deepStrictEqual(firstNLines(['hello'], 1), ['hello']);
  });

  it('Should filter multiple lines', () => {
    const lines = ['1', '2', '3'];
    assert.deepStrictEqual(firstNLines(lines, 2), ['1', '2']);
    assert.deepStrictEqual(firstNLines(lines, 3), ['1', '2', '3']);
  });
});
