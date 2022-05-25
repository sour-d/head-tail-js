const { readFile } = require("fs");

const lastNChars = (content, { numOfChars }) => {
  return content.slice(-numOfChars);
};

const lastNLines = (content, { numOfLines }) => {
  const lines = content.split('\n');
  const lastLines = lines.slice(-numOfLines);
  return lastLines.join('\n');
};

const tailMain = (readFile, file, options) => {
  const content = readFile(file, 'utf8');
  if (options.numOfChars) {
    return lastNChars(content, options);
  }
  return lastNLines(content, options);
};

exports.tailMain = tailMain;

