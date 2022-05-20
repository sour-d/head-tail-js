const splitLines = (content, delimeter) => content.split(delimeter);

const joinLines = (content, delimeter) => content.join(delimeter);

const filterFirstNElement = (lines, filterUpto) => lines.slice(0, filterUpto);

const head = (content, { numOfLines = 3, numOfChar }) => {
  let delimeter = '\n';
  let filterUpto = numOfLines;
  if (numOfChar) {
    delimeter = '';
    filterUpto = numOfChar;
  }
  const lines = splitLines(content, delimeter);
  const filteredContent = filterFirstNElement(lines, filterUpto);
  return joinLines(filteredContent, delimeter);
};

exports.head = head;
exports.firstNLines = filterFirstNElement;
