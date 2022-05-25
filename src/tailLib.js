const tailMain = (content, options) => {
  if (options.numOfChars) {
    return lastNChars(content, options);
  }
  return lastNLines(content, options);
};

const lastNChars = (content, { numOfChars }) => {
  return content.slice(-numOfChars);
};

const lastNLines = (content, { numOfLines }) => {
  const lines = content.split('\n');
  const lastLines = lines.slice(-numOfLines);
  return lastLines.join('\n');
};

exports.tailMain = tailMain;

