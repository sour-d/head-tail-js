const { head, firstNLines, firstNChars } = require('../src/headLib.js');
const assert = require('assert');

const mockReadFile = (fileName, content) => {
  return (fileToRead, encoding) => {
    assert.strictEqual(fileName, fileToRead);
    assert.strictEqual(encoding, 'utf8');
    return content;
  };
};

describe('head', () => {
  it('should return the single line', () => {
    const mockedReadFile = mockReadFile('./hello.txt', 'hello');
    const options = { numOfLines: 1 };
    const actual = head('./hello.txt', mockedReadFile, options);
    assert.strictEqual(actual, 'hello');
  });

  it('should return first 2 lines', () => {
    const mockedReadFile = mockReadFile('./hello.txt', 'Hello\nBye');
    const options = { numOfLines: 2 };
    const actual = head('./hello.txt', mockedReadFile, options);
    assert.strictEqual(actual, 'Hello\nBye');
  });

  it('should return first 4 lines', () => {
    const content = 'One\nTwo\nThree\nFour';
    const mockedReadFile = mockReadFile('./hello.txt', content);
    const options = { numOfLines: 4 };
    const actual = head('./hello.txt', mockedReadFile, options);
    assert.strictEqual(actual, content);
  });

  it('should return 3 lines if line count not passed', () => {
    const content = 'One\nTwo\nThree\nFour';
    const mockedReadFile = mockReadFile('./hello.txt', content);
    const options = {};
    const actual = head('./hello.txt', mockedReadFile, options);
    assert.strictEqual(actual, 'One\nTwo\nThree');
  });

  it('should return 1 charecters', () => {
    const content = 'One\nTwo\nThree\nFour';
    const mockedReadFile = mockReadFile('./hello.txt', content);
    const options = { numOfChar: 1 };
    const actual = head('./hello.txt', mockedReadFile, options);
    assert.strictEqual(actual, 'O');
  });

  it('should return 5 charecters', () => {
    const content = 'One\nTwo\nThree\nFour';
    const mockedReadFile = mockReadFile('./hello.txt', content);
    const options = { numOfChar: 5 };
    const actual = head('./hello.txt', mockedReadFile, options);
    assert.strictEqual(actual, 'One\nT');
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
