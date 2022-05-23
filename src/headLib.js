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

const identity = (fileName, content) => content;

const outputFormatter = (fileName, content) => {
  return `==> ${fileName} <==\n${content}\n`;
};


// eslint-disable-next-line max-statements
const headMain = (readFile, args, displayOutput, displayError) => {
  let parsedData;
  try {
    parsedData = parseArgs(args);
  } catch (error) {
    displayError(error.message.join('\n'));
    return;
  }
  const { files, numOfChars, numOfLines = 10 } = parsedData;
  if (!files.length) {
    displayError('usage: head [-n lines | -c bytes] [file ...]');
    return;
  }
  const formatter = files.length === 1 ? identity : outputFormatter;
  files.forEach(file => {
    try {
      const formattedOutput = formatter(
        file,
        head(readFile(file, 'utf8'), { numOfChars, numOfLines })
      );
      displayOutput(formattedOutput);
    } catch (error) {
      displayError(`head: ${file}: No such file or directory`);
    }
  });
};

exports.headMain = headMain;
exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNChars = firstNChars;
exports.outputFormatter = outputFormatter;
