# checkColumnHeaders

Check for column headers in spreadsheet-like data

**Parameters**

-   `rows` **Array** an array of objects representing rows in a spreadsheet

**Examples**

```javascript
columnHeads({'': 'foo@whitehouse.gov', 'name': 'Jane Smith'});
// {"passed":false, "consoleMessage": , "htmlTemplate": _.comple('<%= missingHeadersCount %>');}
```

Returns **Object** result an object describing the result

# columnsContainNothing

Determine the percentage of rows that are empty for each column

**Parameters**

-   `rows` **Array** an array of objects representing rows in a spreadsheet

Returns **Object** result an object describing the result

# columnsContainNumbers

Determine the percentage of rows that are numbers for each column

**Parameters**

-   `rows` **Array** an array of objects representing rows in a spreadsheet

Returns **Object** result an object describing the result

# numberOfRows

Count and display the number of rows

**Parameters**

-   `rows` **Array** an array of objects representing rows in a spreadsheet

Returns **Object** result an object describing the result

# numberOfRowsIs65k

Test to see if number of rows is exactly 65,536 rows (cutoff by Excel)

**Parameters**

-   `rows` **Array** an array of objects representing rows in a spreadsheet

Returns **Object** result an object describing the result

# stringsHaveExactly255Characters

Determine the cells that have exactly 255 characters (SQL upper limit error)

**Parameters**

-   `rows` **Array** an array of objects representing rows in a spreadsheet

Returns **Object** result an object describing the result
