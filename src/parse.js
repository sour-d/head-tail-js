const isFlag = (arg) => {
  return arg.startsWith('-');
};

const createIterator = (args) => {
  let index = 0;
  return {
    current: () => args[index],
    next: () => args[++index],
    drain: () => args.slice(index),
    nextElements: (count) => {
      const elements = args.slice(index + 1, index + count + 1);
      index = index + count;
      return elements;
    }
  };
};

const isCombinedFlag = (arg) => {
  return arg.charAt(0) === '-' && /[\d]+/.test(arg);
};

const splitFlagAndValue = (arg) => {
  const flag = arg.match(/^-[a-z]*/)[0];
  const value = arg.match(/[\d]+$/)[0];
  return [flag, value];
};

const standardizeArgs = (rawArgs) => {
  return rawArgs.flatMap((arg) => {
    if (isCombinedFlag(arg)) {
      return splitFlagAndValue(arg);
    }
    return arg;
  });
};

const findFlag = (validFlags, flag) => {
  return validFlags.find((flagData) => flagData.flagSwitch.includes(flag));
};

const validateFlag = (validFlags, flag, flagIterator) => {
  const flagDeatils = findFlag(validFlags, flag);
  if (!flagDeatils) {
    const invalidFlag = findFlag(validFlags, '--invalid-flag');
    throw invalidFlag.error(flag);
  }

  const values = flagIterator.nextElements(flagDeatils.noOfValues);
  const name = flagDeatils.name;
  const parsedValues = flagDeatils.parse(values);
  flagDeatils.validate(values);

  return { name, value: parsedValues };
};

const parseFlags = (flagIterator, validFlags) => {
  const options = {};
  while (flagIterator.current() && isFlag(flagIterator.current())) {
    const arg = flagIterator.current();
    const flag = validateFlag(validFlags, arg, flagIterator);
    options[flag.name] = flag.value;
    flagIterator.next();
  }
  return options;
};

const parseArgs = (rawArgs, { validFlags }) => {
  const args = standardizeArgs(rawArgs);

  const argsIterator = createIterator(args);
  const options = parseFlags(argsIterator, validFlags);

  const files = argsIterator.drain();

  const parsedArgs = { options, files };
  return parsedArgs;
};

exports.parseArgs = parseArgs;
exports.isSwitch = isFlag;
exports.splitArgs = standardizeArgs;
exports.createIterator = createIterator;

