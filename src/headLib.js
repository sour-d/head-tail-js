const { parseArgs } = require('./parse.js');
const NEWLINE = '\n';

const split = (content, delimeter) => content.split(delimeter);

const join = (content, delimeter) => content.join(delimeter);

const firstNLines = (content, sliceUpto) => {
  const elements = split(content, NEWLINE);
  const firstElements = elements.slice(0, sliceUpto);
  return join(firstElements, NEWLINE);
};

const firstNChars = (content, sliceUpto) => {
  return content.slice(0, sliceUpto);
};

const head = (content, { numOfLines, numOfChars }) => {
  const sliceUpto = numOfChars ? numOfChars : numOfLines;
  if (numOfChars) {
    return firstNChars(content, sliceUpto);
  }
  return firstNLines(content, sliceUpto);
};

const formatOutput = function (contents, files) {
  if (contents.length === 1) {
    return contents[0];
  }
  return contents.reduce((formattedOutput, content, index) => {
    return `${formattedOutput}==> ${files[index]} <==\n${content}\n\n`;
  }, '');
};

const headMain = (readFile, args) => {
  let parsedData;
  try {
    parsedData = parseArgs(args);
  } catch (error) {
    return error.name + ': ' + error.message;
  }
  const { files, numOfChars, numOfLines = 10 } = parsedData;
  if (!files.length) {
    return 'usage: head [-n lines | -c bytes] [file ...]';
  }
  const contents = files.map(file => {
    const content = readFile(file, 'utf8');
    return head(content, { numOfChars, numOfLines });
  });
  return formatOutput(contents, files);
};

exports.headMain = headMain;
exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNChars = firstNChars;
exports.formatOutput = formatOutput;
