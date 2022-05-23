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
    const switchName = data[index].slice(0, 2);
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
  const invalidSwith = findInvallidSwitch(args, Object.keys(validSwitchList));
  if (invalidSwith) {
    throw {
      type: 'error',
      message: [
        'head: illegal option -- ' + invalidSwith,
        'usage: head [-n lines | -c bytes] [file ...]'
      ]
    };
  }

  if (bothSwitchesPresent(args, Object.keys(validSwitchList))) {
    throw {
      type: 'error',
      message: ['head: can\'t combine line and byte counts']
    };
  }
};

const parseValuesToInt = (parsedArgs) => {
  if (parsedArgs.numOfChars) {
    if (!isFinite(+parsedArgs.numOfChars)) {
      throw {
        type: 'error',
        message: ['head: illegal byte count -- ' + parsedArgs.numOfChars]
      };
    } else {
      parsedArgs.numOfChars = +parsedArgs.numOfChars;
    }
  }
  if (parsedArgs.numOfLines) {
    if (!isFinite(+parsedArgs.numOfLines)) {
      throw {
        type: 'error',
        message: ['head: illegal line count -- ' + parsedArgs.numOfLines]
      };
    } else {
      parsedArgs.numOfLines = +parsedArgs.numOfLines;
    }
  }
  return parsedArgs;
};

// eslint-disable-next-line max-statements
const parseArgs = (args) => {
  const switchList = {
    '-n': 'numOfLines',
    '-c': 'numOfChars',
    '-': 'numOfLines'
  };
  validateArgs(args, switchList);
  const parsedArgs = { files: [] };
  const argsIterator = iterate(args);
  while (argsIterator.next()) {
    if (isSwitch(argsIterator.current())) {
      const switchName = argsIterator.current().match(/^-[a-z]*/)[0];
      let switchValue = argsIterator.current().match(/[\d]*$/)[0];
      if (switchValue === '') {
        switchValue = argsIterator.next();
      }
      parsedArgs[switchList[switchName]] = switchValue;
    } else {
      parsedArgs.files.push(argsIterator.current());
    }
  }
  return parseValuesToInt(parsedArgs);
};

exports.parseArgs = parseArgs;
exports.isSwitch = isSwitch;
exports.areSwitchesPresent = bothSwitchesPresent;
exports.isValidSwitches = findInvallidSwitch;
