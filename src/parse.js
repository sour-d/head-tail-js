/* eslint-disable max-statements */
const isSwitch = (word) => {
  return word.indexOf('-') === 0;
};

const bothSwitchesPresent = (parsedArgs) => {
  if (parsedArgs.numOfChars && parsedArgs.numOfLines) {
    throw {
      type: 'error',
      message: ['head: can\'t combine line and byte counts']
    };
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

const isSwitchJoinedWithValue = (arg) => {
  return arg.charAt(0) === '-' && /[\d]+/.test(arg);
};

const splitArgs = (args) => {
  let splitedArgs = [];
  const argsIterator = iterate(args);
  while (argsIterator.next()) {
    let arg = argsIterator.current();
    if (isSwitchJoinedWithValue(arg)) {
      const switchName = arg.match(/^-[a-z]*/)[0];
      const switchValue = arg.match(/[\d]+$/)[0];
      arg = [switchName, switchValue];
    }
    splitedArgs = splitedArgs.concat(arg);
  }
  return splitedArgs;
};

const isValidSwitch = (switchName, switchList) => {
  if (!switchList[switchName]) {
    throw {
      message: [
        'head: illegal option -- ' + switchName.slice(1),
        'usage: head [-n lines | -c bytes] [file ...]'
      ]
    };
  }
  return true;
};

const parseArgs = (args, switchList) => {
  const splitedArgs = splitArgs(args);
  const parsedArgs = { files: [] };

  const argsIterator = iterate(splitedArgs);
  while (argsIterator.next()) {
    const argument = argsIterator.current();
    if (isSwitch(argument) && isValidSwitch(argument, switchList)) {
      parsedArgs[switchList[argument]] = argsIterator.next();
    } else {
      parsedArgs.files.push(argument);
    }
  }
  parseValuesToInt(parsedArgs);
  bothSwitchesPresent(parsedArgs);
  return parsedArgs;
};

exports.parseArgs = parseArgs;
exports.isSwitch = isSwitch;
exports.areSwitchesPresent = bothSwitchesPresent;
exports.splitArgs = splitArgs;

