const { parse } = require('../src/tailArgParser.js');
const assert = require('assert');

describe('parse', () => {
  it('should give list of file', () => {
    assert.deepStrictEqual(
      parse(['1.txt', '2.txt']), { options: {}, files: ['1.txt', '2.txt'] }
    );
  });
  it('should give list of file and -n options', () => {
    assert.deepStrictEqual(
      parse(['-n', '1', '1.txt', '2.txt']),
      { options: { numOfLines: 1 }, files: ['1.txt', '2.txt'] }
    );
  });

  it('should give list of file and -c options', () => {
    assert.deepStrictEqual(
      parse(['-c', '1', '1.txt', '2.txt']),
      { options: { numOfChars: 1 }, files: ['1.txt', '2.txt'] }
    );
  });

  it('should work if flag and value is together', () => {
    assert.deepStrictEqual(
      parse(['-c1', '1.txt', '2.txt']),
      { options: { numOfChars: 1 }, files: ['1.txt', '2.txt'] }
    );
  });

  it('should throw error if invalid flag', () => {
    assert.throws(() =>
      parse(['-d1', '1.txt', '2.txt'])
    );
  });

  it('should throw error if no file is there', () => {
    assert.throws(() =>
      parse(['-d1'])
    );
  });

  it('should throw error if flag value is invalid', () => {
    assert.throws(() =>
      parse(['-n', 'a'])
    );
  });
});
