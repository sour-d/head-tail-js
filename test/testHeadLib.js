const { head, firstNLines, firstNCharecters } = require('../src/headLib.js');
const assert = require('assert');

describe('head', () => {
  it('should return the single line', () => {
    assert.strictEqual(head('hello', 1), 'hello');
    assert.strictEqual(head('bye', 1), 'bye');
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
    assert.deepStrictEqual(firstNLines(['hello'], 1), ['hello']);
  });

  it('Should filter first 2 lines', () => {
    const lines = ['1', '2', '3'];
    assert.deepStrictEqual(firstNLines(lines, 2), ['1', '2']);
  });
  it('Should filter first 3 lines', () => {
    const lines = ['1', '2', '3'];
    assert.deepStrictEqual(firstNLines(lines, 3), ['1', '2', '3']);
  });
});

describe.skip('firstNCharecters', () => {
  it('Should filter single charecter', () => {
    assert.deepStrictEqual(firstNCharecters('hello', 1), 'h');
  });

  it('Should filter multi charecter', () => {
    assert.deepStrictEqual(firstNCharecters('hello', 2), 'he');
    assert.deepStrictEqual(firstNCharecters('hello', 3), 'hel');
    assert.deepStrictEqual(firstNCharecters('hello', 10), 'hello');
  });

  it('Should return all if char count is large than content', () => {
    assert.deepStrictEqual(firstNCharecters('hello', 10), 'hello');
  });
});
