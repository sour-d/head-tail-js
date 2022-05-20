const { head, firstNElement } = require('../src/headLib.js');
const assert = require('assert');

describe('head', () => {
  it('should return the single line', () => {
    const numOfLines = 1;
    assert.strictEqual(head('hello', { numOfLines }), 'hello');
    assert.strictEqual(head('bye', { numOfLines }), 'bye');
  });

  it('should return first 2 lines', () => {
    const numOfLines = 2;
    assert.strictEqual(head('Hello\nBye', { numOfLines }), 'Hello\nBye');
    assert.strictEqual(head('Hello\nBye\nHi', { numOfLines }), 'Hello\nBye');
  });

  it('should return first 4 lines', () => {
    const content = 'One\nTwo\nThree\nFour';
    const numOfLines = 4;
    assert.strictEqual(head(content, { numOfLines }), content);
  });

  it('should return 3 lines if line count not passed', () => {
    const content = 'One\nTwo\nThree\nFour';
    assert.strictEqual(head(content, {}), 'One\nTwo\nThree');
  });

  it('should return 1 charecters', () => {
    const content = 'One\nTwo\nThree\nFour';
    assert.strictEqual(head(content, { numOfChar: 1 }), 'O');
  });

  it('should return 3 charecters', () => {
    const content = 'One\nTwo\nThree\nFour';
    assert.strictEqual(head(content, { numOfChar: 3 }), 'One');
  });

  it('should return 5 charecters', () => {
    const content = 'One\nTwo\nThree\nFour';
    assert.strictEqual(head(content, { numOfChar: 5 }), 'One\nT');
  });
});

describe('firstNLines', () => {
  it('Should filter single line', () => {
    assert.deepStrictEqual(firstNElement('hello', '\n', 1), 'hello');
  });

  it('Should filter first 2 lines', () => {
    const lines = '1\n2\n3';
    assert.deepStrictEqual(firstNElement(lines, '\n', 2), '1\n2');
  });
  it('Should filter first 3 lines', () => {
    const lines = '1\n2\n3';
    assert.deepStrictEqual(firstNElement(lines, '\n', 3), '1\n2\n3');
  });
});
