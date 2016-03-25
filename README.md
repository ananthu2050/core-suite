# core-suite
Core suite of tests for Dataproofer. These tests help detect common indicators of database or Excel cut-offs which may suggest missing data.

* [Documentation](https://github.com/dataproofer/core-suite/blob/master/README.md)
* [Repository](https://github.com/dataproofer/core-suite/)
* [Issues](https://github.com/dataproofer/core-suite/issues)

## Table of Contents

* [Tests](https://github.com/dataproofer/core-suite#tests)
  * [numberOfRowsIs65k.js](https://github.com/dataproofer/core-suite#numberofrowsis65kjs)
  * [integerEquals2097152.js](https://github.com/dataproofer/core-suite#integerequals2097152js)
  * [checkDuplicateRows.js](https://github.com/dataproofer/core-suite#checkduplicaterowsjs)
  * [stringsHaveExactly255Characters.js](https://github.com/dataproofer/core-suite#stringshaveexactly255charactersjs)
* [Development](https://github.com/dataproofer/core-suite#development)
  * [Getting started](https://github.com/dataproofer/core-suite#getting-started)
  * [Documentation](https://github.com/dataproofer/core-suite#documentation)

## Tests

### numberOfRowsIs65k.js

[src/numberOfRowsIs65k.js:12-31](https://github.com/dataproofer/core-suite/blob/b45d4fbd12f1b6c80c2dc14ba89c4dcbcce9a078/src/numberOfRowsIs65k.js#L12-L31 "Source code on GitHub")

Test to see if number of rows is exactly 65,536 rows (cutoff by Excel)

**Parameters**

-   `rows` **Array** an array of objects representing rows in the spreadsheet
-   `columnHeads` **Array** an array of strings for column names of the spreadsheet

Returns **Object** describing the result

### integerEquals2097152.js

[src/integerEquals2097152.js:13-65](https://github.com/dataproofer/core-suite/blob/b45d4fbd12f1b6c80c2dc14ba89c4dcbcce9a078/src/integerEquals2097152.js#L13-L65 "Source code on GitHub")

Integers at their upper limit

**Parameters**

-   `rows` **Array** an array of objects representing rows in the spreadsheet
-   `columnHeads` **Array** an array of strings for column names of the spreadsheet

Returns **Object** describing the result

### checkDuplicateRows.js

[src/checkDuplicateRows.js:13-73](https://github.com/dataproofer/core-suite/blob/b45d4fbd12f1b6c80c2dc14ba89c4dcbcce9a078/src/checkDuplicateRows.js#L13-L73 "Source code on GitHub")

Check for any duplicate rows in the spreadsheet. Optionally

**Parameters**

-   `rows` **Array** an array of objects representing rows in the spreadsheet
-   `columnHeads` **Array** an array of strings for column names of the spreadsheet
-   `input` **Object** accept user input, such as selected Columns

Returns **Object** describing the result

### stringsHaveExactly255Characters.js

[src/stringsHaveExactly255Characters.js:14-66](https://github.com/dataproofer/core-suite/blob/b45d4fbd12f1b6c80c2dc14ba89c4dcbcce9a078/src/stringsHaveExactly255Characters.js#L14-L66 "Source code on GitHub")

Determine the cells that have exactly 255 characters (SQL upper limit error). See ProPublica's bad data guide for further information
<https://github.com/propublica/guides/blob/master/data-bulletproofing.md#integrity-checks-for-every-data-set>

**Parameters**

-   `rows` **Array** an array of objects representing rows in the spreadsheet
-   `columnHeads` **Array** an array of strings for column names of the spreadsheet

Returns **Object** describing the result

## Development

### Getting started

```
git clone git@github.com:dataproofer/dataproofertest-js.git
cd dataproofertest-js
npm install
```
### Documentation

We use [documentation.js](https://github.com/documentationjs/documentation), but have created a handy script for regenerating documentation.

```
npm run docs
```