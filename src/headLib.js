const { parseArgs } = require('./parse.js');

const NEWLINE = '\n';

const UASAGE = 'usage: head [-n lines | -c bytes] [file ...]';

const SWITCHES = {
  '-n': 'numOfLines',
  '-c': 'numOfChars',
  '-': 'numOfLines'
};

const split = (content, delimeter) => content.split(delimeter);

const join = (content, delimeter) => content.join(delimeter);

const firstNLines = (content, sliceUpto) => {
  const elements = split(content, NEWLINE);
  const firstElements = elements.slice(0, sliceUpto);
  return join(firstElements, NEWLINE);
};

const firstNChars = (content, sliceUpto) => content.slice(0, sliceUpto);

const readFileContent = (files, fileReader) => {
  if (!files.length) {
    throw { message: [UASAGE] };
  }
  return files.map((file) => {
    try {
      return {
        content: fileReader(file, 'utf8'), file
      };
    } catch (error) {
      return {
        message: `head: ${file}: No such file or directory`
      };
    }
  });
};

const identity = ({ content }) => content;

const isMultiFile = (files) => files.length > 1;

const multiFileFormatter = ({ file, content }, index) => {
  const separator = index === 0 ? '' : '\n';
  return `${separator}==> ${file} <==\n${content}`;
};

const displayFormattedContent = (contents, formatter, stdOut, stdErr) => {
  contents.forEach((content, index) => {
    if (content.content) {
      stdOut(formatter(content, index));
      return;
    }
    stdErr(content.message);
  });
};

const head = (content, { numOfLines, numOfChars }) => {
  const sliceUpto = numOfChars ? numOfChars : numOfLines;
  if (numOfChars) {
    return firstNChars(content, sliceUpto);
  }
  return firstNLines(content, sliceUpto);
};

const headFileContents = (fileContents, options) => {
  return fileContents.map(fileContent => {
    if (fileContent.content) {
      fileContent.content = head(fileContent.content, options);
    }
    return fileContent;
  });
};

const headMain = (readFile, args, stdOut, strErr) => {
  try {
    const { files, numOfChars, numOfLines = 10 } = parseArgs(args, SWITCHES);
    const options = { numOfChars, numOfLines };
    const formatter = isMultiFile(files) ? multiFileFormatter : identity;
    const fileContents = readFileContent(files, readFile);
    const headedContents = headFileContents(fileContents, options);
    displayFormattedContent(headedContents, formatter, stdOut, strErr);
  } catch (error) {
    strErr(error.message.join('\n'));
  }
};

exports.headMain = headMain;
exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNChars = firstNChars;
exports.outputFormatter = multiFileFormatter;
exports.readFileContent = readFileContent;
exports.display = displayFormattedContent;

