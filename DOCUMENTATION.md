# conclusion

Calculates the percentage of rows that contain special, non-typical Latin characters for each column
Source: <http://www.w3schools.com/charsets/ref_html_utf8.asp>

**Parameters**

-   `rows` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of objects representing rows in the spreadsheet
-   `columnHeads` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of strings for column names of the spreadsheet

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** describing the result

# conclusion

Calculates the percentage of rows that are empty for each column

**Parameters**

-   `rows` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of objects representing rows in the spreadsheet
-   `columnHeads` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of strings for column names of the spreadsheet

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** describing the result

# methodology

Determine the cells that have exactly 255 characters (SQL upper limit error). See ProPublica's bad data guide for further information
<https://github.com/propublica/guides/blob/master/data-bulletproofing.md#integrity-checks-for-every-data-set>

**Parameters**

-   `rows` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of objects representing rows in the spreadsheet
-   `columnHeads` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of strings for column names of the spreadsheet

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** describing the result

# methodology

Indicates an `bigint` at its upper signed limit (MySQL or PostgreSQL) of 9,223,372,036,854,775,807 or its upper unsigned limit (MySQL) of 18,446,744,073,709,551,616.
Common database programs, like MySQL, have a cap on how big of a number it can save.
Please see the [MySQL documentation](https://dev.mysql.com/doc/refman/5.7/en/integer-types.html) or [PostgreSQL documentation](http://www.postgresql.org/docs/9.5/interactive/datatype-numeric.html) for more information.

**Parameters**

-   `rows` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of objects representing rows in the spreadsheet
-   `columnHeads` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of strings for column names of the spreadsheet

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** describing the result

# methodology

Indicates a integer at its upper signed limit is 2,147,483,647 (MySQL or PostgreSQL) or its upper unsigned limit (MySQL) of 4,294,967,295.
Common database programs, like MySQL, have a cap on how big of a number it can save.
Please see the [MySQL documentation](https://dev.mysql.com/doc/refman/5.7/en/integer-types.html) for more information.

**Parameters**

-   `rows` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of objects representing rows in the spreadsheet
-   `columnHeads` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of strings for column names of the spreadsheet

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** describing the result

# methodology

Indicates an `smallint` at its upper signed limit (MySQL or PostgreSQL) of 32,767 or its upper unsigned limit (MySQL) of 65,535.
Common database programs, like MySQL, have a cap on how big of a number it can save.
Please see the [MySQL documentation](https://dev.mysql.com/doc/refman/5.7/en/integer-types.html) or [PostgreSQL documentation](http://www.postgresql.org/docs/9.5/interactive/datatype-numeric.html) for more information.

**Parameters**

-   `rows` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of objects representing rows in the spreadsheet
-   `columnHeads` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of strings for column names of the spreadsheet

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** describing the result

# methodology

Indicates a summed integers at its upper limit of 2,097,152.
Please see the [Integrity Checks](https://github.com/propublica/guides/blob/master/data-bulletproofing.md#integrity-checks-for-every-data-set) section of the ProPublica [Data Bulletproofing Guide](https://github.com/propublica/guides/blob/master/data-bulletproofing.md) for more information.

**Parameters**

-   `rows` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of objects representing rows in the spreadsheet
-   `columnHeads` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of strings for column names of the spreadsheet

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** describing the result

# methodology

Test to see if number of rows is exactly 65,536 rows (cutoff by Excel)

**Parameters**

-   `rows` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of objects representing rows in the spreadsheet
-   `columnHeads` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** an array of strings for column names of the spreadsheet

Returns **[Object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)** describing the result
