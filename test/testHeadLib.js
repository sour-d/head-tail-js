const assert = require('assert');
const {
  headMain,
  headFileContents,
  head,
  firstNLines,
  firstNChars,
  multiFileFormatter,
  readFileContent,
  displayFormattedContent
} = require('../src/headLib.js');

const mockReadFile = (fileName, content) => {
  let count = 0;
  return (fileToRead, encoding) => {
    count++;
    assert.strictEqual(fileName[count - 1], fileToRead);
    assert.strictEqual(encoding, 'utf8');
    return content[count - 1];
  };
};

const mockConsoleFn = (contents) => {
  const log = (message) => {
    assert.strictEqual(contents[log.count], message);
    log.count++;
    return message;
  };
  log.count = 0;
  return log;
};

describe('head', () => {
  it('should return the single line', () => {
    const options = { numOfLines: 1 };
    const content = 'hello';
    const actual = head({ content }, options);
    assert.strictEqual(actual, 'hello');
  });

  it('should return first 2 lines', () => {
    const options = { numOfLines: 2 };
    const content = 'Hello\nBye';
    const actual = head({ content }, options);
    assert.strictEqual(actual, 'Hello\nBye');
  });

  it('should return first 4 lines', () => {
    const options = { numOfLines: 4 };
    const content = 'One\nTwo\nThree\nFour';
    const actual = head({ content }, options);
    assert.strictEqual(actual, 'One\nTwo\nThree\nFour');
  });

  it('should return 1 charecter', () => {
    const options = { numOfChars: 1 };
    const content = 'One\nTwo\nThree\nFour';
    const actual = head({ content }, options);
    assert.strictEqual(actual, 'O');
  });

  it('should return 5 charecters', () => {
    const options = { numOfChars: 5 };
    const content = 'One\nTwo\nThree\nFour';
    const actual = head({ content }, options);
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

  it('Should return all char if count is greater than content length', () => {
    assert.deepStrictEqual(firstNChars('hello', 6), 'hello');
  });
});

describe('headMain', () => {
  it('Should return array of one line', () => {
    const mockedReadFile = mockReadFile(['./hello.txt'], ['hello']);
    const mockedDisplayOutput = mockConsoleFn(['hello']);
    const mockedDisplayError = mockConsoleFn([]);
    headMain(
      mockedReadFile,
      ['-n', '1', './hello.txt'],
      mockedDisplayOutput,
      mockedDisplayError
    );

    assert.strictEqual(mockedDisplayOutput.count, 1);
    assert.strictEqual(mockedDisplayError.count, 0);
  });

  it('Should return array of single charecter of one file', () => {
    const files = ['./hello.txt'];
    const contents = ['hello'];
    const mockedReadFile = mockReadFile(files, contents);
    const mockedDisplayOutput = mockConsoleFn(['h']);
    const mockedDisplayError = mockConsoleFn([]);
    headMain(
      mockedReadFile,
      ['-c', '1', './hello.txt'],
      mockedDisplayOutput,
      mockedDisplayError
    );
    assert.strictEqual(mockedDisplayOutput.count, 1);
    assert.strictEqual(mockedDisplayError.count, 0);
  });

  it('Should return array of single line from each file', () => {
    const files = ['hello.txt', 'bye.txt'];
    const contents = ['hello', 'bye\nbyebye'];
    const mockedReadFile = mockReadFile(files, contents);
    const mockedDisplayOutput = mockConsoleFn([
      '==> hello.txt <==\nhello',
      '\n==> bye.txt <==\nbye',
    ]);
    const mockedDisplayError = mockConsoleFn([]);
    headMain(
      mockedReadFile,
      ['-n', '1', 'hello.txt', 'bye.txt'],
      mockedDisplayOutput,
      mockedDisplayError
    );
    assert.strictEqual(mockedDisplayOutput.count, 2);
    assert.strictEqual(mockedDisplayError.count, 0);
  });

  it('Should return array of single charecter of each file', () => {
    const files = ['hello.txt', 'bye.txt'];
    const contents = ['hello', 'bye\nbyebye'];
    const mockedReadFile = mockReadFile(files, contents);
    const mockedDisplayOutput = mockConsoleFn([
      '==> hello.txt <==\nh',
      '\n==> bye.txt <==\nb',
    ]);
    const mockedDisplayError = mockConsoleFn([]);
    headMain(
      mockedReadFile,
      ['-c', '1', 'hello.txt', 'bye.txt'],
      mockedDisplayOutput,
      mockedDisplayError
    );
    assert.strictEqual(mockedDisplayOutput.count, 2);
    assert.strictEqual(mockedDisplayError.count, 0);
  });

  it('Should return error if invalid switches', () => {
    const files = ['hello.txt'];
    const contents = ['hello'];
    const mockedReadFile = mockReadFile(files, contents);
    const mockedDisplayOutput = mockConsoleFn([]);
    const mockedDisplayError = mockConsoleFn([
      'head: illegal option -- a\nusage: head [-n lines | -c bytes] [file ...]'
    ]);
    headMain(
      mockedReadFile,
      ['-a', '1', 'hello.txt'],
      mockedDisplayOutput,
      mockedDisplayError
    );
    assert.strictEqual(mockedDisplayOutput.count, 0);
    assert.strictEqual(mockedDisplayError.count, 1);
  });

  it('Should return error if both switches are present', () => {
    const files = ['hello.txt'];
    const contents = ['hello'];
    const mockedReadFile = mockReadFile(files, contents);
    const mockedDisplayOutput = mockConsoleFn([]);
    const mockedDisplayError = mockConsoleFn([
      'head: can\'t combine line and byte counts'
    ]);
    headMain(
      mockedReadFile,
      ['-n', '1', '-c1', 'hello.txt'],
      mockedDisplayOutput,
      mockedDisplayError
    );
    assert.strictEqual(mockedDisplayOutput.count, 0);
    assert.strictEqual(mockedDisplayError.count, 1);
  });

  it('Should return error if file name is not present', () => {
    const mockedReadFile = mockReadFile([], []);
    const mockedDisplayOutput = mockConsoleFn([]);
    const mockedDisplayError = mockConsoleFn([
      'usage: head [-n lines | -c bytes] [file ...]'
    ]);
    headMain(
      mockedReadFile,
      ['-n', '1'],
      mockedDisplayOutput,
      mockedDisplayError
    );
    assert.strictEqual(mockedDisplayOutput.count, 0);
    assert.strictEqual(mockedDisplayError.count, 1);
  });
});

describe('multiFileFormatter', () => {
  it('should return formatted content', () => {
    const fileContent = {
      name: '1.txt',
      content: '1'
    };
    assert.deepStrictEqual(
      multiFileFormatter(fileContent, 0), '==> 1.txt <==\n1'
    );
    assert.deepStrictEqual(
      multiFileFormatter(fileContent, 1), '\n==> 1.txt <==\n1'
    );
  });
});

describe('readFileContent', () => {
  it('Should return array of file content', () => {
    const mockedReadFile = mockReadFile(['hello.txt'], ['hello']);
    const actual = readFileContent(['hello.txt'], mockedReadFile);
    const expected = [
      { name: 'hello.txt', content: 'hello' }
    ];
    assert.deepStrictEqual(actual, expected);
  });

  it('Should return array containing error if file not readable', () => {
    const mockedReadFile = mockReadFile(['1.txt'], ['1']);
    const actual = readFileContent(['1.txt', '2.txt'], mockedReadFile);
    const expected = [
      { name: '1.txt', content: '1' },
      { message: 'head: 2.txt: No such file or directory' }
    ];
    assert.deepStrictEqual(actual, expected);
  });
});

describe('displayFormattedContent', () => {
  it('Should display headed contents', () => {
    const contents = [{ file: 'hello.txt', content: 'hello' }];
    const mockedDisplayOutput = mockConsoleFn(['hello']);
    const mockedDisplayError = mockConsoleFn([]);
    displayFormattedContent(
      contents,
      ({ content }) => content,
      mockedDisplayOutput,
      mockedDisplayError
    );
    assert.strictEqual(mockedDisplayOutput.count, 1);
    assert.strictEqual(mockedDisplayError.count, 0);
  });

  it('Should display headed contents and error also', () => {
    const contents = [
      { file: 'hello.txt', content: 'hello' },
      { message: 'its a error' }
    ];
    const mockedDisplayOutput = mockConsoleFn(['hello']);
    const mockedDisplayError = mockConsoleFn(['its a error']);
    displayFormattedContent(
      contents,
      ({ content }) => content,
      mockedDisplayOutput,
      mockedDisplayError
    );
    assert.strictEqual(mockedDisplayOutput.count, 1);
    assert.strictEqual(mockedDisplayError.count, 1);
  });
});

describe('headFileContents', () => {
  it('Should call head for valid file content', () => {
    const fileContents = [{ file: 'hello.txt', content: 'hello\nbye' }];
    const options = { numOfLines: 1 };
    const expected = [{ file: 'hello.txt', content: 'hello' }];
    assert.deepStrictEqual(headFileContents(fileContents, options), expected);
  });

  it('Shouldn\'t call head for invalid file content', () => {
    const fileContents = [{ message: 'error' }];
    const options = { numOfLines: 1 };
    const expected = [{ message: 'error' }];
    assert.deepStrictEqual(headFileContents(fileContents, options), expected);
  });

  it('Shouldn call head only for valid file content', () => {
    const fileContents = [
      { file: 'hello.txt', content: 'hello\nbye' },
      { message: 'error' }
    ];
    const options = { numOfLines: 1 };
    const expected = [
      { file: 'hello.txt', content: 'hello' },
      { message: 'error' }
    ];
    assert.deepStrictEqual(headFileContents(fileContents, options), expected);
  });
});
