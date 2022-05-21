const {
  head,
  firstNLines,
  firstNChars,
  headMain
} = require('../src/headLib.js');
const assert = require('assert');

const mockReadFile = (fileName, content) => {
  let index = 0;
  return (fileToRead, encoding) => {
    index++;
    assert.strictEqual(fileName[index - 1], fileToRead);
    assert.strictEqual(encoding, 'utf8');
    return content[index - 1];
  };
};

describe('head', () => {
  it('should return the single line', () => {
    const options = { numOfLines: 1 };
    const actual = head('hello', options);
    assert.strictEqual(actual, 'hello');
  });

  it('should return first 2 lines', () => {
    const options = { numOfLines: 2 };
    const actual = head('Hello\nBye', options);
    assert.strictEqual(actual, 'Hello\nBye');
  });

  it('should return first 4 lines', () => {
    const options = { numOfLines: 4 };
    const actual = head('One\nTwo\nThree\nFour', options);
    assert.strictEqual(actual, 'One\nTwo\nThree\nFour');
  });

  it('should return 1 charecters', () => {
    const options = { numOfChar: 1 };
    const actual = head('One\nTwo\nThree\nFour', options);
    assert.strictEqual(actual, 'O');
  });

  it('should return 5 charecters', () => {
    const options = { numOfChar: 5 };
    const actual = head('One\nTwo\nThree\nFour', options);
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

describe('headMain', () => {
  it('Should return array of one line', () => {
    const mockedReadFile = mockReadFile(['./hello.txt'], ['hello']);
    const actual = headMain(['./hello.txt'], mockedReadFile, { numOfLines: 1 });
    assert.deepStrictEqual(actual, ['hello']);
  });

  it('Should return array of single line from each file', () => {
    const files = ['./hello.txt', './bye.txt', './a.txt'];
    const contents = ['hello', 'bye', 'a'];
    const mockedReadFile = mockReadFile(files, contents);
    const actual = headMain(files, mockedReadFile, { numOfLines: 1 });
    assert.deepStrictEqual(actual, contents);
  });

  it('Should return array of 3 lines of each file', () => {
    const files = ['./hello.txt', './bye.txt', './a.txt'];
    const contents = ['1\n2\n3\n4', '1\n2\n3', '1\n2'];
    const mockedReadFile = mockReadFile(files, contents);
    const actual = headMain(files, mockedReadFile, { numOfLines: 3 });
    assert.deepStrictEqual(actual, ['1\n2\n3', '1\n2\n3', '1\n2']);
  });

  it('Should return array of single charecter of one file', () => {
    const files = ['./hello.txt'];
    const contents = ['hello'];
    const mockedReadFile = mockReadFile(files, contents);
    const actual = headMain(files, mockedReadFile, { numOfChar: 1 });
    assert.deepStrictEqual(actual, ['h']);
  });

  it('Should return array of single charecter of each file', () => {
    const files = ['./hello.txt', './bye.txt', './a.txt'];
    const contents = ['hello', 'bye', 'a'];
    const mockedReadFile = mockReadFile(files, contents);
    const actual = headMain(files, mockedReadFile, { numOfChar: 1 });
    assert.deepStrictEqual(actual, ['h', 'b', 'a']);
  });

  it('Should return array of 2 charecterz of each file', () => {
    const files = ['./hello.txt', './bye.txt', './a.txt'];
    const contents = ['hello', 'bye', 'a'];
    const mockedReadFile = mockReadFile(files, contents);
    const actual = headMain(files, mockedReadFile, { numOfChar: 2 });
    assert.deepStrictEqual(actual, ['he', 'by', 'a']);
  });
});
