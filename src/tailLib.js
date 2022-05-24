const { headMain } = require('./headLib.js');
const fs = require('fs');

const mockReadFile = (readFile) => {
  return (file, encoding) => {
    return readFile(file, encoding).split('').reverse().join('');
  };
};

const mockConsoleLog = (displayOutput) => {
  return (message) => {
    displayOutput(message.split('').reverse().join(''));
  };
};

const mockedReadFile = mockReadFile(fs.readFileSync);
const mockedConsoleLog = mockConsoleLog(console.log);
headMain(
  mockedReadFile,
  process.argv.slice(2),
  mockedConsoleLog,
  console.error
);
