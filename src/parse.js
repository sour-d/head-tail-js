const isFlag = (arg) => {
  return arg.startsWith('-');
};

const createIterator = (args) => {
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
  const argsIterator = createIterator(args);
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

const findFlag = (validFlags, flag) => {
  return validFlags.find((flagData) => flagData.flagSwitch.includes(flag));
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
    const invalidFlag = findFlag(validFlags, '--invalid-flag');
    throw invalidFlag.error(flag);
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

const parseArgs = (args, { validFlags }) => {
  const splitedArgs = splitArgs(args);

  const flagIterator = createIterator(splitedArgs);
  const options = parseFlags(flagIterator, validFlags);

  const fileIterator = createIterator(flagIterator.drain());
  const files = parseFiles(fileIterator);

  const parsedArgs = { options, files };
  return parsedArgs;
};

exports.parseArgs = parseArgs;
exports.isSwitch = isFlag;
exports.splitArgs = splitArgs;

