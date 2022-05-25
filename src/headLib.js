const { parse } = require('./headArgParser.js');

const NEWLINE = '\n';

const split = (content, delimeter) => content.split(delimeter);

const join = (content, delimeter) => content.join(delimeter);

const firstNLines = (content, sliceUpto) => {
  const elements = split(content, NEWLINE);
  const firstElements = elements.slice(0, sliceUpto);
  return join(firstElements, NEWLINE);
};

const firstNChars = (content, sliceUpto) => content.slice(0, sliceUpto);

const readFileContent = (files, fileReader) => {
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
  let formattedCoontent = content;
  if (content.endsWith('\n')) {
    formattedCoontent = content.slice(0, content.length - 1);
  }
  return `${separator}==> ${file} <==\n${formattedCoontent}`;
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

const headMain = (readFile, args, stdOut, stdErr) => {
  try {
    const {
      files, options: { numOfChars, numOfLines = 10 }
    } = parse(args);
    const options = { numOfChars, numOfLines };
    const formatter = isMultiFile(files) ? multiFileFormatter : identity;
    const fileContents = readFileContent(files, readFile);
    const headedContents = headFileContents(fileContents, options);
    displayFormattedContent(headedContents, formatter, stdOut, stdErr);
  } catch (error) {
    stdErr(error.message.join('\n'));
  }
};

exports.headMain = headMain;
exports.headFileContents = headFileContents;
exports.head = head;
exports.displayFormattedContent = displayFormattedContent;
exports.firstNLines = firstNLines;
exports.firstNChars = firstNChars;
exports.multiFileFormatter = multiFileFormatter;
exports.readFileContent = readFileContent;
exports.isMultiFile = isMultiFile;
exports.identity = identity;
// exports.formatter ;
