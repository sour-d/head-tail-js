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

describe.only('tailMain', () => {
  it('should return last two lines', () => {
    const mockedReadFile = mockReadFile(['1.txt'], ['1\n2\n3\n4\n6\n6\n7']);
    const options = { numOfLines: 2 };
    assert.deepStrictEqual(
      tailMain(mockedReadFile, '1.txt', options), '6\n7'
    );
  });

  it('should return last two chars', () => {
    const mockedReadFile = mockReadFile(['1.txt'], ['1\n2\n3\n4\n6\n6\n7']);
    const options = { numOfChars: 2 };
    assert.deepStrictEqual(
      tailMain(mockedReadFile, '1.txt', options), '\n7'
    );
  });
});
