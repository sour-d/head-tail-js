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

const head = (file, readFile, { numOfLines = 3, numOfChar }) => {
  const content = readFile(file, 'utf8');
  const sliceUpto = numOfChar ? numOfChar : numOfLines;
  if (numOfChar) {
    return firstNChars(content, sliceUpto);
  }
  return firstNLines(content, sliceUpto);
};

exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNChars = firstNChars;
