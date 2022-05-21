const isSwitch = (word) => {
  return word.indexOf('-') === 0;
};

const areSwitchesPresent = (args, switchList) => {
  return switchList.reduce((result, switchName) => {
    const regex = /switch/;
    return regex.compile(switchName).test(args.join(' ')) && result;
  }, true);
};

const isValidSwitches = (data, validSwitchList) => {
  for (let index = 0; index < data.length; index++) {
    const switchName = data[index].slice(0, 2);
    if (isSwitch(switchName)) {
      if (!validSwitchList.includes(switchName)) {
        return switchName.slice(1);
      }
    }
  }
  // return true;
};

const updateParseArgs = (arg, data, switchList) => {
  if (isSwitch(arg)) {
    const switchName = switchList[arg.slice(0, 2)];
    data[switchName] = +arg.slice(2);
    return data;
  }
  data.files.push(arg);
  return data;
};

const joinSwitchAndValues = data => {
  const updatedData = [];
  let index = 0;
  while (index < data.length) {
    let newValue = data[index];
    if (isSwitch(data[index]) && data[index].length === 2) {
      newValue = `${data[index]}${data[index + 1]}`;
      index++;
    }
    updatedData.push(newValue);
    index++;
  }
  return updatedData;
};

const parseArgs = (args) => {
  const switchList = { '-n': 'numOfLines', '-c': 'numOfChars' };
  if (areSwitchesPresent(args, Object.keys(switchList))) {
    throw {
      name: 'head',
      message: 'can\'t combine line and byte counts'
    };
  }
  if (isValidSwitches(args, Object.keys(switchList))) {
    throw {
      name: 'head',
      message:
        `illegal option -- ${isValidSwitches(args, Object.keys(switchList))}`
    };
  }
  const updatedArgs = joinSwitchAndValues(args);
  const parsedArgs = {
    numOfLines: null,
    numOfChars: null,
    files: []
  };
  for (let index = 0; index < updatedArgs.length; index++) {
    updateParseArgs(updatedArgs[index], parsedArgs, switchList);
  }
  return parsedArgs;
};

exports.parseArgs = parseArgs;
exports.joinSwitchAndValues = joinSwitchAndValues;
exports.updateParseArgs = updateParseArgs;
exports.isSwitch = isSwitch;
exports.areSwitchesPresent = areSwitchesPresent;
exports.isValidSwitches = isValidSwitches;
