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
  const formattedOutput = contents.map((content, index) => {
    return `==> ${files[index]} <==\n${content}`;
  });
  return formattedOutput.join('\n\n');
};

const headMain = (readFile, args) => {
  let parsedData;
  try {
    parsedData = parseArgs(args);
  } catch (error) {
    return error.name + ': ' + error.message;
  }
  const { files, numOfChars, numOfLines } = parsedData;
  if (!files.length) {
    return 'usage: head [-n lines | -c bytes] [file ...]';
  }
  const contents = files.map(file => {
    try {
      return head(readFile(file, 'utf8'), { numOfChars, numOfLines });
    } catch (error) {
      return `head: ${file}: No such file or directory`;
    }
  });
  return formatOutput(contents, files);
};

exports.headMain = headMain;
exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNChars = firstNChars;
exports.formatOutput = formatOutput;
