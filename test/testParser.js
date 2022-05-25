const assert = require('assert');
const { parseArgs, isSwitch, splitArgs } = require('../src/parse.js');

describe('parseArgs', () => {
  const validateFlagValue = (message, value) => {
    if (!isFinite(+value) || +value < 0) {
      throw {
        message: [message + value]
      };
    }
  };

  it('should return array of file names', () => {
    const validFlags = [
      {
        flagSwitch: ['-n', '-'],
        name: 'numOfLines',
        parse: (values) => values.map(value => +value),
        validate: () => { },
        noOfValues: 1
      }
    ];
    const expected = { options: {}, files: ['1.txt', '2.txt', '3.txt'] };
    assert.deepStrictEqual(
      parseArgs(['1.txt', '2.txt', '3.txt'], { validFlags }),
      expected
    );
  });

  it('should return numOfLines flag and value should be parsed', () => {
    const validFlags = [
      {
        flagSwitch: ['-n', '-'],
        name: 'numOfLines',
        parse: (values) => values.map(value => +value),
        validate: () => { },
        noOfValues: 1
      }
    ];
    const expected = { options: { numOfLines: [1] }, files: ['1.txt', '2.txt'] };
    assert.deepStrictEqual(
      parseArgs(['-n', '1', '1.txt', '2.txt'], { validFlags }), expected
    );
  });

  it('should throw error for invalid value of option', () => {
    const validFlags = [
      {
        flagSwitch: ['-n', '-'],
        name: 'numOfLines',
        parse: (values) => values.map(value => +value),
        noOfValues: 1,
        validate: validateFlagValue.bind(null, 'head: illegal line count -- ')
      }
    ];
    assert.throws(() =>
      parseArgs(['-n', 'a', '1.txt', '2.txt'], { validFlags })
    );
  });

  it('should throw error for invalid option', () => {
    const validFlags = [
      {
        flagSwitch: ['--invalid-flag'],
        name: 'invalidFlag',
        error: () => {
          throw 'error';
        }
      }
    ];
    assert.throws(() =>
      parseArgs(['-n', 'a', '1.txt', '2.txt'], { validFlags })
    );
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
