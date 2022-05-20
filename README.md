# HEAD

## **Description**

_Head_, a command line tool, display lines of a file.

_Head_ displays the first count lines or bytes of each of the specified files.

If count is omitted it defaults to 10.

If more than a single file is specified, each file is preceded by a header consisting of the string `==> XXX <==` where `XXX` is the name of the file.

## **Usage**

``` bash
head [file ...]
  -> display the first 10 lines from the mentioned files

head [-c bytes] [file ...]
  -> display only the total charecter mentioned from the file

head [-n count] [file ...]
  -> display only the total lines mentioned from the file

```