# checkColumnHeaders

Check for column headers in spreadsheet-like data
Do all columns have a string indicating the nature of the data column?
**Assumptions**: Without column headers, it can be difficult to discern the nature of a dataset.

**Parameters**

-   `The` **Array** rows of the spreadsheet parsed out
-   `The` **String** raw string of the file
-   `rows`  
-   `str`  

**Examples**

```javascript
columnHeads({'': 'foo@whitehouse.gov', 'name': 'Jane Smith'});
// {"passed":false, "consoleMessage": , "htmlTemplate": _.comple('<%= missingHeadersCount %>');}
```

Returns **Object** The result of the test

# columnsContainNothing

Determine the percentage of rows that are empty for each column

**Parameters**

-   `the` **Array** rows of the spreadsheet
-   `rows`  

Returns **Object** the result

# columnsContainNumbers

Determine the percentage of rows that are numbers for each column

**Parameters**

-   `the` **Array** rows of the spreadsheet
-   `rows`  

Returns **Object** the result

# numberOfRows

Simple test to count and display the number of rows

**Parameters**

-   `Array`  
-   `rows`  

Returns **Object** 

# numberOfRowsIs65k

Test to see if # of rows is exactly 65,536 rows (cutoff by Excel)

**Parameters**

-   `Array`  
-   `rows`  

Returns **Object** 

# stringsHaveExactly255Characters

Determine the cells that have exactly 255 characters (SQL upper limit error)

**Parameters**

-   `the` **Array** rows of the spreadsheet
-   `rows`  

Returns **Object** the result
