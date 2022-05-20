const split = (content, delimeter) => content.split(delimeter);

const join = (content, delimeter) => content.join(delimeter);

// const slice = (lines, from, to) => lines.slice(from, to);

const firstNElement = (content, delimeter, sliceUpto) => {
  const elements = split(content, delimeter);
  const firstElements = elements.slice(0, sliceUpto);
  return join(firstElements, delimeter);
  // return content.split(delimeter).slice(0, filterUpto).join(delimeter);
};

const head = (content, { numOfLines = 3, numOfChar }) => {
  const delimeter = numOfChar ? '' : '\n';
  const sliceUpto = numOfChar ? numOfChar : numOfLines;
  return firstNElement(content, delimeter, sliceUpto);
};

exports.head = head;
exports.firstNElement = firstNElement;
