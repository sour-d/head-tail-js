const { parseArgs } = require('./parse.js');

const USAGE = 'usage: head [-n lines | -c bytes] [file ...]';

const validateFlagValues = (message, values) => {
  return values.forEach((value) => validateFlagValue(message, value));
};

const validateFlagValue = (message, value) => {
  if (!isFinite(+value) || +value < 0) {
    throw {
      message: [message + value]
    };
  }
};

const parseInt = values => +values[0];

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
      message: [USAGE]
    };
  }
};

const validFlags = [
  {
    flagSwitch: ['-n', '-'],
    name: 'numOfLines',
    parse: parseInt,
    validate: validateFlagValues.bind(null, 'head: illegal line count -- '),
    noOfValues: 1
  }, {
    flagSwitch: ['-c'],
    name: 'numOfChars',
    parse: parseInt,
    validate: validateFlagValues.bind(null, 'head: illegal byte count -- '),
    noOfValues: 1
  }, {
    flagSwitch: ['--invalid-flag'],
    name: 'invalidFlag',
    error: illegalFlagErr
  }
];

const parse = (args) => {
  const parsedArgs = parseArgs(args, { validFlags });
  bothSwitchesPresent(parsedArgs);
  noFilePresent(parsedArgs);
  return parsedArgs;
};

exports.parse = parse;
