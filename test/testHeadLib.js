const { head, firstNLines, firstNChars } = require('../src/headLib.js');
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
    assert.deepStrictEqual(firstNLines('hello', 1), 'hello');
  });

  it('Should filter first 2 lines', () => {
    assert.deepStrictEqual(firstNLines('1\n2\n3', 2), '1\n2');
  });
  it('Should filter first 3 lines', () => {
    assert.deepStrictEqual(firstNLines('1\n2\n3', 3), '1\n2\n3');
  });
});

describe('firstNChars', () => {
  it('Should return single char', () => {
    assert.deepStrictEqual(firstNChars('h', 1), 'h');
  });

  it('Should return first 2 chars', () => {
    assert.deepStrictEqual(firstNChars('he', 2), 'he');
    assert.deepStrictEqual(firstNChars('hello', 2), 'he');
  });
  it('Should return first 3 chars', () => {
    assert.deepStrictEqual(firstNChars('hello', 3), 'hel');
  });
  it('Should return all char if length is greater than content length', () => {
    assert.deepStrictEqual(firstNChars('hello', 3), 'hel');
  });
});
