const { isMultiFile, identity } = require('./headLib.js');
const { parse } = require('./parseTailArg.js');

const lastNChars = (content, sliceFrom) => {
  return content.slice(-sliceFrom);
};

const lastNLines = (content, sliceFrom) => {
  const lines = content.split('\n');
  const lastLines = lines.slice(-sliceFrom);
  return lastLines.join('\n');
};

const tail = (content, { numOfLines, numOfChars }) => {
  const sliceUpto = numOfChars ? numOfChars : numOfLines;
  if (numOfChars) {
    return lastNChars(content, sliceUpto);
  }
  return lastNLines(content, sliceUpto);
};

const tailFileContents = (fileContents, options) => {
  return fileContents.map(fileContent => {
    if (fileContent.content) {
      fileContent.content = tail(fileContent.content, options);
    }
    return fileContent;
  });
};

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

const readFileContent = (files, fileReader) => {
  return files.map((file) => {
    try {
      return {
        content: fileReader(file, 'utf8'), file
      };
    } catch (error) {
      return {
        message: `tail: ${file}: No such file or directory`
      };
    }
  });
};

const tailMain = (fileReader, args, stdOut, stdErr) => {
  try {
    const {
      files, options: { numOfChars, numOfLines = 10 }
    } = parse(args);
    const options = { numOfChars, numOfLines };
    const formatter = isMultiFile(files) ? multiFileFormatter : identity;
    const fileContents = readFileContent(files, fileReader);
    const tailedContents = tailFileContents(fileContents, options);
    displayFormattedContent(tailedContents, formatter, stdOut, stdErr);
  } catch (error) {
    stdErr(error.message.join('\n'));
  }
};

exports.tailMain = tailMain;

