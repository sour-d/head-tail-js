const readFilesContent = (reader, files) => {
  return files.map((file) => reader(file, 'utf8'));
};

const lastNChars = (content, { numOfChars }) => {
  return content.slice(-numOfChars);
};

const lastNLines = (content, { numOfLines }) => {
  const lines = content.split('\n');
  const lastLines = lines.slice(-numOfLines);
  return lastLines.join('\n');
};

// const identity = (content) => content;

// const isMultiFile = (files) => files.length > 1;

// const multiFileFormatter = ({ file, content }, index) => {
//   const separator = index === 0 ? '' : '\n';
//   let formattedCoontent = content;
//   if (content.endsWith('\n')) {
//     formattedCoontent = content.slice(0, content.length - 1);
//   }
//   return `${separator}==> ${file} <==\n${formattedCoontent}`;
// };

const displayFormattedContent = (contents, stdOut) => {
  contents.forEach((content) => {
    stdOut(content);
  });
};

const tailMain = (fileReader, files, options, stdOut) => {
  const contents = readFilesContent(fileReader, files);
  const tailedContent = contents.map(content => {
    if (options.numOfChars) {
      return lastNChars(content, options);
    }
    return lastNLines(content, options);
  });
  // const formatter = isMultiFile(files) ? multiFileFormatter : identity;
  return displayFormattedContent(tailedContent, stdOut);
};

exports.tailMain = tailMain;
exports.readFilesContent = readFilesContent;

