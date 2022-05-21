const {
  head,
  firstNLines,
  firstNChars,
  headMain,
  formatOutput
} = require('../src/headLib.js');
const assert = require('assert');

const mockReadFile = (fileName, content) => {
  let count = 0;
  return (fileToRead, encoding) => {
    count++;
    assert.strictEqual(fileName[count - 1], fileToRead);
    assert.strictEqual(encoding, 'utf8');
    return content[count - 1];
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
    const options = { numOfChars: 1 };
    const actual = head('One\nTwo\nThree\nFour', options);
    assert.strictEqual(actual, 'O');
  });

  it('should return 5 charecters', () => {
    const options = { numOfChars: 5 };
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
    const actual = headMain(mockedReadFile, ['-n', '1', './hello.txt']);
    assert.deepStrictEqual(actual, 'hello');
  });

  it('Should return array of single charecter of one file', () => {
    const files = ['./hello.txt'];
    const contents = ['hello'];
    const mockedReadFile = mockReadFile(files, contents);
    const actual = headMain(mockedReadFile, ['-c', '1', './hello.txt']);
    assert.deepStrictEqual(actual, 'h');
  });

  it('Should return array of single line from each file', () => {
    const files = ['./hello.txt', './bye.txt'];
    const contents = ['hello', 'bye'];
    const mockedReadFile = mockReadFile(files, contents);
    const actual = headMain(mockedReadFile, [
      '-n', '1', './hello.txt', './bye.txt'
    ]);
    assert.deepStrictEqual(
      actual,
      '==> ./hello.txt <==\nhello\n\n==> ./bye.txt <==\nbye');
  });

  it('Should return array of single charecter of each file', () => {
    const files = ['./hello.txt', './bye.txt', './a.txt'];
    const contents = ['hello', 'bye', 'a'];
    const mockedReadFile = mockReadFile(files, contents);
    const actual = headMain(mockedReadFile, [
      '-c', '1', './hello.txt', './bye.txt', './a.txt'
    ]);
    assert.deepStrictEqual(actual, '==> ./hello.txt <==\nh\n\n==> ./bye.txt <==\nb\n\n==> ./a.txt <==\na');
  });

  it('Should return array of 3 lines of each file', () => {
    const files = ['./hello.txt', './bye.txt', './a.txt'];
    const contents = ['1\n2\n3\n4', '1\n2\n3', '1\n2'];
    const mockedReadFile = mockReadFile(files, contents);
    const actual = headMain(mockedReadFile, [
      '-n', '3', './hello.txt', './bye.txt', './a.txt'
    ]);
    assert.deepStrictEqual(
      actual,
      '==> ./hello.txt <==\n1\n2\n3\n\n==> ./bye.txt <==\n1\n2\n3\n\n==> ./a.txt <==\n1\n2'
    );
  });

  it('Should return array of 2 charecters of each file', () => {
    const files = ['./hello.txt', './bye.txt', './a.txt'];
    const contents = ['hello', 'bye', 'a'];
    const mockedReadFile = mockReadFile(files, contents);
    const actual = headMain(mockedReadFile, [
      '-c', '2', './hello.txt', './bye.txt', './a.txt'
    ]);
    assert.deepStrictEqual(actual, '==> ./hello.txt <==\nhe\n\n==> ./bye.txt <==\nby\n\n==> ./a.txt <==\na');
  });

  it('Should return error if invalid switches', () => {
    const files = ['./hello.txt'];
    const contents = ['hello'];
    const mockedReadFile = mockReadFile(files, contents);
    const actual = headMain(mockedReadFile, ['-a', 2, './hello.txt']);
    assert.deepStrictEqual(actual, 'head: illegal option -- a');
  });

  it('Should return error if both switches are present', () => {
    const files = ['./hello.txt'];
    const contents = ['hello'];
    const mockedReadFile = mockReadFile(files, contents);
    const actual = headMain(mockedReadFile, [
      '-n', '2', '-c', '1', './ hello.txt'
    ]);
    assert.deepStrictEqual(
      actual,
      'head: can\'t combine line and byte counts'
    );
  });

  it('Should return error if file name is not present', () => {
    const files = [];
    const contents = [];
    const mockedReadFile = mockReadFile(files, contents);
    const actual = headMain(mockedReadFile, [
      '-n', '2'
    ]);
    assert.deepStrictEqual(
      actual,
      'usage: head [-n lines | -c bytes] [file ...]'
    );
  });
});

describe('formatOutput', () => {
  it('should return first element', () => {
    assert.deepStrictEqual(formatOutput(['hello'], ['hello.txt']), 'hello');
  });

  it('should return all formatted content', () => {
    assert.deepStrictEqual(formatOutput(['1', '2'], ['1.txt', '2.txt']), '==> 1.txt <==\n1\n\n==> 2.txt <==\n2');
  });
});
