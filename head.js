// console.log('usage: head [-n lines | -c bytes] [file ...]');
const { headMain } = require('./src/headLib.js');
const fs = require('fs');

const main = (args) => headMain(
  fs.readFileSync,
  args,
  console.log,
  console.error
);

main(process.argv.slice(2));

