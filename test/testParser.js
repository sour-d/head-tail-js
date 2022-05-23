const assert = require('assert');
const { parseArgs, isSwitch } = require('../src/parse.js');

describe('parseArgs', () => {
  it('should return array of file names', () => {
    const expected = {
      files: ['1.txt', '2.txt', '3.txt']
    };
    assert.deepStrictEqual(parseArgs(['1.txt', '2.txt', '3.txt']), expected);
  });

  it('should return array of file names with numOfLines', () => {
    const expected = {
      numOfLines: 1,
      files: ['1.txt', '2.txt', '3.txt']
    };
    assert.deepStrictEqual(
      parseArgs(['-n', '1', '1.txt', '2.txt', '3.txt']), expected
    );
  });

  it('should return array of file names with numOfChars', () => {
    const expected = {
      numOfChars: 1,
      files: ['1.txt', '2.txt', '3.txt']
    };
    assert.deepStrictEqual(
      parseArgs(['-c', '1', '1.txt', '2.txt', '3.txt']), expected
    );
  });

  it('should throw error if both switch present', () => {
    assert.throws(() => {
      parseArgs(['-c', '1', '-n', '2', './1.txt', './2.txt', '3.txt']);
    });
  });

  it('should throw error if switch is invalid', () => {
    assert.throws(() => {
      parseArgs(['-a', '1', './1.txt', './2.txt', '3.txt']);
    });
  });

  it('Should take last value if switch mentioned two times', () => {
    const expected = {
      numOfChars: 2,
      files: ['1.txt', '2.txt']
    };
    assert.deepStrictEqual(
      parseArgs(['-c', '1', '-c2', '1.txt', '2.txt']), expected
    );
  });

  it('Should return array if arg have switch and value together', () => {
    const expected = {
      numOfChars: 1,
      files: ['./1.txt']
    };
    assert.deepStrictEqual(parseArgs(['-c1', './1.txt']), expected);
  });
});

describe('isSwitch', () => {
  it('Should return true if arg is switch', () => {
    assert.deepStrictEqual(isSwitch('-a'), true);
  });

  it('Should return false if arg not is switch', () => {
    assert.deepStrictEqual(isSwitch('a'), false);
  });
  it('Should return false if arg is not start with -', () => {
    assert.deepStrictEqual(isSwitch('a-1'), false);
  });
});
