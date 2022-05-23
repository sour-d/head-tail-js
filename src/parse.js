/* eslint-disable max-statements */
const isSwitch = (word) => {
  return word.indexOf('-') === 0;
};

const bothSwitchesPresent = (args, switchList) => {
  return switchList.reduce((result, switchName) => {
    const regex = /switch/;
    return regex.compile(switchName).test(args.join(' ')) && result;
  }, true);
};

const findInvallidSwitch = (data, validSwitchList) => {
  for (let index = 0; index < data.length; index++) {
    // const switchName = data[index].slice(0, 2);
    const switchName = data[index].match(/^-[a-z]*/)[0];
    let switchValue = data[index].match(/[\d]*$/)[0];
    if (isSwitch(switchName)) {
      if (!validSwitchList.includes(switchName)) {
        return switchName.slice(1);
      }
    }
  }
};

const iterate = (args) => {
  let index = -1;
  return {
    current: function () {
      return args[index];
    },
    next: function () {
      index++;
      return args[index];
    }
  };
};

const validateArgs = (args, validSwitchList) => {
  if (bothSwitchesPresent(args, Object.keys(validSwitchList))) {
    throw {
      type: 'error',
      message: ['head: can\'t combine line and byte counts']
    };
  }
};

// eslint-disable-next-line complexity
const parseValuesToInt = (parsedArgs) => {
  if (parsedArgs.numOfChars) {
    if (!isFinite(+parsedArgs.numOfChars)) {
      throw {
        type: 'error',
        message: ['head: illegal byte count -- ' + parsedArgs.numOfChars]
      };
    }
    parsedArgs.numOfChars = +parsedArgs.numOfChars;
  }
  if (parsedArgs.numOfLines) {
    if (!isFinite(+parsedArgs.numOfLines)) {
      throw {
        type: 'error',
        message: ['head: illegal line count -- ' + parsedArgs.numOfLines]
      };
    }
    parsedArgs.numOfLines = +parsedArgs.numOfLines;
  }
  return parsedArgs;
};

// eslint-disable-next-line max-statements
// eslint-disable-next-line complexity
const parseArgs = (args) => {
  const switchList = {
    '-n': 'numOfLines',
    '-c': 'numOfChars',
    '-': 'numOfLines'
  };
  const parsedArgs = { files: [] };
  const argsIterator = iterate(args);
  while (argsIterator.next()) {
    if (isSwitch(argsIterator.current())) {
      const switchName = argsIterator.current().match(/^-[a-z]*/)[0];
      let switchValue = argsIterator.current().match(/[\d]*$/)[0];
      if (switchValue === '') {
        switchValue = argsIterator.next();
      }
      if (!switchList[switchName]) {
        throw {
          type: 'error',
          message: [
            'head: illegal option -- ' + switchName.match(/[a-z]+/i)[0],
            'usage: head [-n lines | -c bytes] [file ...]'
          ]
        };
      }
      parsedArgs[switchList[switchName]] = switchValue;
    } else {
      parsedArgs.files.push(argsIterator.current());
    }
  }
  parseValuesToInt(parsedArgs);
  validateArgs(args, switchList);
  return parsedArgs;
};

exports.parseArgs = parseArgs;
exports.isSwitch = isSwitch;
exports.areSwitchesPresent = bothSwitchesPresent;
exports.isValidSwitches = findInvallidSwitch;
