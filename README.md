# HEAD

## **Description**

_Head_, a command line tool, display lines of a file.

_Head_ displays the first count lines or bytes of each of the specified files.

If count is omitted it defaults to 10.

If more than a single file is specified, each file is preceded by a header consisting of the string `==> XXX <==` where `XXX` is the name of the file.

## **Usage**

``` bash

head | head --help
  -> Display 'usage: head [-n lines | -c bytes] [file ...]'

head [file ...]
  -> Display the first 10 lines from the mentioned files.

head [-c bytes] [file ...]
  -> Display only the total charecter mentioned from the file.

head [-n count] [file ...]
  -> Display only the total lines mentioned from the file.

head [-count] [file ...]
  -> Display only the total charecter mentioned from the file.
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
  -> Display 'usage: tail [-n lines | -c bytes] [file ...]'

tail [file ...]
  -> Display the first 10 lines from the mentioned files.

tail [-c bytes] [file ...]
  -> Display only the total charecter mentioned from the file.

tail [-n count] [file ...]
  -> Display only the total lines mentioned from the file.

tail [-count] [file ...]
  -> Display only the total charecter mentioned from the file.

tail [-q] [file ...]
  -> Suppresses printing of headers when multiple files are being examined.

tail [-r] [file ...]
  -> The -r option causes the input to be displayed in reverse order, by line.
```