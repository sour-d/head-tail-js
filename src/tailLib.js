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

const tailMain = (fileReader, files, options) => {
  const contents = readFilesContent(fileReader, files);
  return contents.map(content => {
    if (options.numOfChars) {
      return lastNChars(content, options);
    }
    return lastNLines(content, options);
  });
};

exports.tailMain = tailMain;
exports.readFilesContent = readFilesContent;

