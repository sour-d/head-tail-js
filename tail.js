// console.log('usage: tail [-c # | -n #] [file ...]');

const { tailMain } = require('./src/tailLib.js');
const fs = require('fs');

const main = () => tailMain(
  fs.readFileSync,
  process.argv.slice(2),
  console.log,
  console.error
);

main();
