const isSwitch = (word) => {
  return word.indexOf('-') === 0;
};

// const areSwitchesPresent = (args, switchList) => {
//   return switchList.reduce((result, switchName) => {
//     return args.includes(switchName) && result;
//   }, true);
// };

// const isValidateSwitches = (data, validSwitchList) => {
//   for (let index = 0; index < data.length; index++) {
//     if (isSwitch(data[index])) {
//       if (!validSwitchList.includes(data[index])) {
//         return false;
//       }
//     }
//   }
//   return true;
// };

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
