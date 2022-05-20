const head = (content) => {
  const numOfLines = 3;
  const filteredContent = content.split('\n').slice(0, numOfLines).join('\n');
  return filteredContent;
};

exports.head = head;
