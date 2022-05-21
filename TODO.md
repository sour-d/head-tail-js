**TODO**

- [ ] Write `main` connect with lib
- [ ] write `parser`
- [ ] Make `head` work values given by user from cmd-line
- [ ] Changed default `numOfLines` from 3 to 10
- [ ] Provide a `help` message
- [ ] write a formatter to format the output for multiple files

**IDEAS**

- [ ] default line count will be assiged in parser
- [ ] Move string ultil functions into another files
- [ ] what if -n or -c is zero?

**DONE**

- [x] `headMain` can take multiple file in argument
- [x] `head` can take one file in argument
- [x] in `head` function, `content` will be changed to file paths
- [x] separate -n and -c logic
- [x] `head` can take `charCount` in argument
- [x] modified string functions to get lines or charecters
- [x] ~~function to get first N charecters~~
- [x] `head` can take `numOfLines` in argument
- [x] Implement `head` for hard coded content
- [x] Extract the logic to cut the content
- [x] hard code 3 as deafult `numOfLines`
- [x] `head` works on multi line content
- [x] `head` only works on one line content
- [x] Make directory structure and add/arrange necessary files.
- [x] check `mocha`, `eslint` present in the working directory