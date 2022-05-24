/* eslint-disable max-statements */
const UASAGE = 'usage: head [-n lines | -c bytes] [file ...]';

const isFlag = (arg) => {
  return arg.startsWith('-');
};

const iterate = (args) => {
  let index = -1;
  return {
    current: () => args[index],
    next: () => args[++index],
    drain: () => args.slice(index)
  };
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

const validateFlagValue = value => {
  if (!isFinite(+value) && +value > 0) {
    throw {
      message: ['head: illegal line count -- ' + value]
    };
  }
};

const parseInt = value => +value;

const illegalFlagErr = (flag) => {
  throw {
    message: [
      'head: illegal option -- ' + flag.slice(1),
      'usage: head [-n lines | -c bytes] [file ...]'
    ]
  };
};

const bothSwitchesPresent = (args) => {
  const options = ['numOfChars', 'numOfLines'];
  const isPresent = options.reduce((isPresent, option) => {
    return isPresent && args.options[option] !== undefined;
  }, true);
  if (isPresent) {
    throw {
      message: ['head: can\'t combine line and byte counts']
    };
  }
};

const noFilePresent = (args) => {
  if (!args.files.length) {
    throw {
      message: [UASAGE]
    };
  }
};

const validFlags = [
  {
    flagSwitch: ['-n', '-'],
    name: 'numOfLines',
    parse: parseInt,
    validate: validateFlagValue
  }, {
    flagSwitch: ['-c'],
    name: 'numOfChars',
    parse: parseInt,
    validate: validateFlagValue
  }, {
    flagSwitch: ['--invalid-flag'],
    name: 'invalidFlag',
    throwErr: illegalFlagErr
  }
];

const validations = [
  bothSwitchesPresent, noFilePresent
];

const parsingData = { validFlags, validations };

const findFlag = (validFlags, flag) => {
  return validFlags.find((flagData) => flagData.flagSwitch.includes(flag));
};

const runValidations = (validations, parsedArgs) => {
  validations.forEach((validator) => validator(parsedArgs));
};

const parseFiles = (fileIterator) => {
  const files = [];
  while (fileIterator.next()) {
    files.push(fileIterator.current());
  }
  return files;
};

const validateFlag = (validFlags, flag, value) => {
  const flagDeatils = findFlag(validFlags, flag);
  if (!flagDeatils) {
    throw findFlag(validFlags, '--invalid-flag').throwErr(flag);
  }
  flagDeatils.validate(value);
  return { name: flagDeatils.name, value: flagDeatils.parse(value) };
};

const parseFlags = (flagIterator, validFlags) => {
  const options = {};
  while (flagIterator.next() && isFlag(flagIterator.current())) {
    const arg = flagIterator.current();
    const flag = validateFlag(validFlags, arg, flagIterator.next());
    options[flag.name] = flag.value;
  }
  return options;
};

const parseArgs = (args) => {
  const { validFlags, validations } = parsingData;
  const splitedArgs = splitArgs(args);

  const flagIterator = iterate(splitedArgs);
  const options = parseFlags(flagIterator, validFlags);

  const fileIterator = iterate(flagIterator.drain());
  const files = parseFiles(fileIterator);

  const parsedArgs = { options, files };
  runValidations(validations, parsedArgs);
  return parsedArgs;
};

exports.parseArgs = parseArgs;
exports.isSwitch = isFlag;
exports.areSwitchesPresent = bothSwitchesPresent;
exports.splitArgs = splitArgs;

