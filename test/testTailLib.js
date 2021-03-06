const assert = require('assert');
const { tailMain } = require('../src/tailLib.js');

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
  let count = 0;
  return {
    count: () => count,
    log: (message) => {
      assert.strictEqual(contents[count], message);
      count++;
      return message;
    },
    error: (message) => {
      assert.strictEqual(contents[count], message);
      count++;
      return message;
    }
  };
};

describe('tailMain', () => {
  it('should return last two lines', () => {
    const mockedReadFile = mockReadFile(['1.txt'], ['1\n2\n3\n4\n6\n6\n7']);
    const mockedConsoleLog = mockConsoleFn(['6\n7']);
    const mockedConsoleErr = mockConsoleFn([]);
    tailMain(
      mockedReadFile,
      ['-n', '2', '1.txt'],
      mockedConsoleLog.log,
      mockedConsoleErr.error
    );

    assert.strictEqual(mockedConsoleLog.count(), 1);
    assert.strictEqual(mockedConsoleErr.count(), 0);
  });

  it('should return last two chars', () => {
    const mockedReadFile = mockReadFile(['1.txt'], ['1\n2\n3\n4\n6\n6\n7']);
    const mockedConsoleLog = mockConsoleFn(['\n7']);
    const mockedConsoleErr = mockConsoleFn([]);
    tailMain(
      mockedReadFile,
      ['-c', '2', '1.txt'],
      mockedConsoleLog.log,
      mockedConsoleErr.error
    );
    assert.strictEqual(mockedConsoleLog.count(), 1);
    assert.strictEqual(mockedConsoleErr.count(), 0);
  });

  it('should return last two chars', () => {
    const mockedReadFile = mockReadFile(['1.txt', '2.txt'], ['1\n2', '3\n4']);
    const mockedConsoleLog = mockConsoleFn([
      '==> 1.txt <==\n2', '\n==> 2.txt <==\n4'
    ]);
    const mockedConsoleErr = mockConsoleFn([]);
    tailMain(
      mockedReadFile,
      ['-n', '1', '1.txt', '2.txt'],
      mockedConsoleLog.log,
      mockedConsoleErr.error
    );

    assert.strictEqual(mockedConsoleLog.count(), 2);
    assert.strictEqual(mockedConsoleErr.count(), 0);
  });

  it('should return throw error from error stream', () => {
    const mockedReadFile = mockReadFile(['1.txt'], ['1\n2']);
    const mockedConsoleLog = mockConsoleFn([
      '==> 1.txt <==\n2'
    ]);
    const mockedConsoleErr = mockConsoleFn(
      ['tail: 2.txt: No such file or directory']
    );
    tailMain(
      mockedReadFile,
      ['-n', '1', '1.txt', '2.txt'],
      mockedConsoleLog.log,
      mockedConsoleErr.error
    );

    assert.strictEqual(mockedConsoleLog.count(), 1);
    assert.strictEqual(mockedConsoleErr.count(), 1);
  });
});
