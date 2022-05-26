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
      return { name: file, content: fileReader(file, 'utf8') };
    } catch (error) {
      return {
        message: `head: ${file}: No such file or directory`
      };
    }
  });
};

const identity = ({ content }) => content;

const isMultiFile = (files) => files.length > 1;

const multiFileFormatter = ({ name, content }, index) => {
  const separator = index === 0 ? '' : '\n';
  let formattedContent = content;
  if (content.endsWith('\n')) {
    formattedContent = content.slice(0, content.length - 1);
  }
  return `${separator}==> ${name} <==\n${formattedContent}`;
};

const displayFormattedContent = (filesData, formatter, stdOut, stdErr) => {
  filesData.forEach((file, index) => {
    if (file.content) {
      stdOut(formatter(file, index));
      return;
    }
    stdErr(file.message);
  });
};

const head = ({ content }, { numOfLines, numOfChars }) => {
  const sliceUpto = numOfChars ? numOfChars : numOfLines;
  if (numOfChars) {
    return firstNChars(content, sliceUpto);
  }
  return firstNLines(content, sliceUpto);
};

const headFileContents = (filesData, options) => {
  return filesData.map(data => {
    if (data.content) {
      data.content = head(data, options);
    }
    return data;
  });
};

const headMain = (fileReader, args, stdOut, stdErr) => {
  try {
    const { files, options: { numOfChars, numOfLines = 10 } } = parse(args);
    const options = { numOfChars, numOfLines };
    const formatter = isMultiFile(files) ? multiFileFormatter : identity;
    const filesData = readFileContent(files, fileReader);
    const headedContents = headFileContents(filesData, options);
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
