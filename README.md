# HEAD

## **Description**

_Head_, a command line tool, display lines of a file.

_Head_ displays the first count lines or bytes of each of the specified files.

If count is omitted it defaults to 10.

If more than a single file is specified, each file is preceded by a header consisting of the string `==> XXX <==` where `XXX` is the name of the file.

## **Usage**

``` bash

head | head --help
  -> display `usage: head [-n lines | -c bytes] [file ...]`

head [file ...]
  -> display the first 10 lines from the mentioned files

head [-c bytes] [file ...]
  -> display only the total charecter mentioned from the file

head [-n count] [file ...]
  -> display only the total lines mentioned from the file

head [-count] [file ...]
  -> display only the total charecter mentioned from the file
```

# TAIL

## **Description**

_Tail_, a command line tool, display last lines of a file.

_Tail_ displays the last count lines or bytes of each of the specified files.

If count is omitted it defaults to 10.

If more than a single file is specified, each file is preceded by a header consisting of the string `==> XXX <==` where `XXX` is the name of the file.

## **Usage**

``` bash

tail | tail --help
  -> display `usage: tail [-n lines | -c bytes] [file ...]`

tail [file ...]
  -> display the first 10 lines from the mentioned files

tail [-c bytes] [file ...]
  -> display only the total charecter mentioned from the file

tail [-n count] [file ...]
  -> display only the total lines mentioned from the file

tail [-count] [file ...]
  -> display only the total charecter mentioned from the file
```