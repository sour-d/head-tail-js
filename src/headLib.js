const splitLines = (content) => content.split('\n');
const joinLines = (content) => content.join('\n');

const firstNLines = (lines, numOfLines) => {
  return lines.slice(0, numOfLines);
};

const head = (content, numOfLines = 3) => {
  const lines = splitLines(content);
  const filteredContent = firstNLines(lines, numOfLines);
  return joinLines(filteredContent);
};

exports.head = head;
exports.firstNLines = firstNLines;
