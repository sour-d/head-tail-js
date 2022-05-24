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

const identity = ({ content }) => content;

const outputFormatter = ({ file, content }, index) => {
  const separater = index === 0 ? '' : '\n';
  return `${separater}==> ${file} <==\n${content}`;
};

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

const display = (headedContents, formatter, displayOutput, displayError) => {
  headedContents.forEach(function (headedContent, index) {
    if (headedContent.content) {
      displayOutput(formatter(headedContent, index));
      return;
    }
    displayError(headedContent.message);
  });
};

const headMain = (readFile, args, displayOutput, displayError) => {
  try {
    const parsedData = parseArgs(args, SWITCHES);
    const { files, numOfChars, numOfLines = 10 } = parsedData;
    const options = { numOfChars, numOfLines };
    const formatter = files.length === 1 ? identity : outputFormatter;
    const fileContents = readFileContent(files, readFile);
    fileContents.forEach(fileContent => {
      if (fileContent.content) {
        fileContent.content = head(fileContent.content, options);
      }
      return fileContent;
    });
    display(fileContents, formatter, displayOutput, displayError);
  } catch (error) {
    displayError(error.message.join('\n'));
  }
};

exports.headMain = headMain;
exports.head = head;
exports.firstNLines = firstNLines;
exports.firstNChars = firstNChars;
exports.outputFormatter = outputFormatter;
exports.readFileContent = readFileContent;
exports.readFileContent = readFileContent;
exports.display = display;
