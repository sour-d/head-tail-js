const assert = require('assert');
const { parseArgs, isSwitch, splitArgs } = require('../src/parse.js');

describe('parseArgs', () => {
  const SWITCHES = {
    '-n': 'numOfLines',
    '-c': 'numOfChars',
    '-': 'numOfLines'
  };
  it('should return array of file names', () => {
    const expected = { files: ['1.txt', '2.txt', '3.txt'] };
    assert.deepStrictEqual(
      parseArgs(['1.txt', '2.txt', '3.txt'], SWITCHES), expected
    );
  });

  it('should return array of file names with numOfLines', () => {
    const expected = {
      numOfLines: 1,
      files: ['1.txt', '2.txt', '3.txt']
    };
    assert.deepStrictEqual(
      parseArgs(['-n', '1', '1.txt', '2.txt', '3.txt'], SWITCHES), expected
    );
  });

  it('should return array of file names with numOfChars', () => {
    const expected = {
      numOfChars: 1,
      files: ['1.txt', '2.txt', '3.txt']
    };
    assert.deepStrictEqual(
      parseArgs(['-c', '1', '1.txt', '2.txt', '3.txt'], SWITCHES), expected
    );
  });

  it('should throw error if both switch present', () => {
    assert.throws(() => {
      parseArgs(['-c', '1', '-n', '2', '1.txt', '2.txt', '3.txt'], SWITCHES);
    });
  });

  it('should throw error if switch is invalid', () => {
    assert.throws(() => {
      parseArgs(['-a', '1', './1.txt', './2.txt', '3.txt'], SWITCHES);
    });
  });

  it('Should take last value if switch mentioned two times', () => {
    const expected = {
      numOfChars: 2,
      files: ['1.txt', '2.txt']
    };
    assert.deepStrictEqual(
      parseArgs(['-c', '1', '-c2', '1.txt', '2.txt'], SWITCHES), expected
    );
  });

  it('Should return array if arg have switch and value together', () => {
    const expected = {
      numOfChars: 1,
      files: ['1.txt']
    };
    assert.deepStrictEqual(parseArgs(['-c1', '1.txt'], SWITCHES), expected);
  });

  it('Should consider -[DIGITS] as valid key', () => {
    const expected = {
      numOfLines: 1,
      files: ['1.txt']
    };
    assert.deepStrictEqual(parseArgs(['-1', '1.txt'], SWITCHES), expected);
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

describe('splitArgs', () => {
  it('should not split if switch and value are not together', () => {
    assert.deepStrictEqual(splitArgs(['-n', '1']), ['-n', '1']);
  });
  it('should split if switch and value are together', () => {
    assert.deepStrictEqual(splitArgs(['-n1']), ['-n', '1']);
  });
  it('should not do anything if arg is not switch', () => {
    assert.deepStrictEqual(
      splitArgs(['hello.txt', './bye.txt']), ['hello.txt', './bye.txt']);
  });
  it('should split switches thoses are joined with value only', () => {
    assert.deepStrictEqual(
      splitArgs(['-c', '1', '-n2', '1.txt']), ['-c', '1', '-n', '2', '1.txt']);
  });
});
