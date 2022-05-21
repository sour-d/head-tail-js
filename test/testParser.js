const assert = require('assert');
const { parseArgs, joinSwitchAndValues, updateParseArgs, isSwitch } = require('../src/parse.js');

describe('parseArgs', () => {
  it('should return array of file names', () => {
    assert.deepStrictEqual(
      parseArgs(['./1.txt', './2.txt', '3.txt']),
      {
        numOfLines: null,
        numOfChars: null,
        files: ['./1.txt', './2.txt', '3.txt']
      }
    );
  });

  it('should return array of file names with numOfLines', () => {
    assert.deepStrictEqual(
      parseArgs(['-n', '1', './1.txt', './2.txt', '3.txt']),
      {
        numOfLines: 1,
        numOfChars: null,
        files: ['./1.txt', './2.txt', '3.txt']
      }
    );
  });

  it('should return array of file names with numOfChars', () => {
    assert.deepStrictEqual(
      parseArgs(['-c', '1', './1.txt', './2.txt', '3.txt']),
      {
        numOfLines: null,
        numOfChars: 1,
        files: ['./1.txt', './2.txt', '3.txt']
      }
    );
  });

  // it('should throw error if both switch present', () => {
  //   assert.throws(() => {
  //     parseArgs(['-c', '1', '-n', '2', './1.txt', './2.txt', '3.txt']);
  //   });
  // });

  // it('should throw error if switch is invalid', () => {
  //   assert.throws(() => {
  //     parseArgs(['-a', '1', './1.txt', './2.txt', '3.txt']);
  //   });
  // });

  it('Should take last value if switch mentioned two times', () => {
    assert.deepStrictEqual(
      parseArgs(['-c', '1', '-c', '2', './1.txt', './2.txt', '3.txt']),
      {
        numOfLines: null,
        numOfChars: 2,
        files: ['./1.txt', './2.txt', '3.txt']
      }
    );
  });

  it('Should return array if arg have switch and vlaue together', () => {
    assert.deepStrictEqual(
      parseArgs(['-c1', './1.txt']),
      {
        numOfLines: null,
        numOfChars: 1,
        files: ['./1.txt']
      }
    );
  });
});

describe('joinSwitchAndValues', () => {
  it('Should join single switch and their values', () => {
    const data = ['-c', '1'];
    assert.deepStrictEqual(joinSwitchAndValues(data), ['-c1']);
  });

  it('Should join all switch and their values', () => {
    const data = ['-c', '1', '-a', '3', '-z', '60'];
    assert.deepStrictEqual(joinSwitchAndValues(data), ['-c1', '-a3', '-z60']);
  });

  it('Should join switch rather than anything else', () => {
    const data = ['-c', '1', '-a', '3', 'a', 'c'];
    assert.deepStrictEqual(joinSwitchAndValues(data), ['-c1', '-a3', 'a', 'c']);
  });
});

describe('updateParseArgs', () => {
  it('Should update the given object file name', () => {
    assert.deepStrictEqual(
      updateParseArgs('hello', { files: [] }, { '-n': 'numOfLines' }),
      { files: ['hello'] });
  });

  it('Should update the given object switch name', () => {
    assert.deepStrictEqual(
      updateParseArgs('-n1', { files: [] }, { '-n': 'numOfLines' }),
      { numOfLines: 1, files: [] });
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
