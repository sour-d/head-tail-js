## HEAD

**Description**

_Head_, is a command line tool, display lines of a file.

_Head_ displays the first count lines or bytes of each of the specified files.

If count is omitted it defaults to 10.

If more than a single file is specified, each file is preceded by a header consisting of the string ``==> XXX <=='' where ``XXX'' is the name of the file.

**Usage**

```
head [file ...]
  -> display the lines of mentioned files

head [-c bytes] [file ...]
  -> display only the total charecter mentioned

head [-n count] [file ...]
  -> display only the total line mentioned in the line count

```
`NOTE: Default line count is 10`