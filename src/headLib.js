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

const headMain = (readFile, args) => {
  const { files, numOfChars, numOfLines } = parseArgs(args);
  const contents = files.map(file => {
    const content = readFile(file, 'utf8');
    return head(content, { numOfChars, numOfLines });
  });
  return contents;
};

exports.headMain = headMain;
exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNChars = firstNChars;
