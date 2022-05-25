const tailMain = (content, { numOfLines, numOfChars }) => {
  return lastNLines(content, { numOfLines });
};

const lastNLines = (content, { numOfLines }) => {
  const lines = content.split('\n');
  const lastLines = lines.slice(-numOfLines);
  return lastLines.join('\n');
};

exports.tailMain = tailMain;

