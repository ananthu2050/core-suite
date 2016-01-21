# core-suite
Core suite of tests for DataProofer

## Writing tests

### Writing documentation

We use [documentation.js](https://github.com/documentationjs/documentation) to generate documentation for every test. Please read this guide for more information on [documentation conventions](https://github.com/documentationjs/documentation/blob/master/docs/GETTING_STARTED.md).

### Generating documentation

```
npm install -g documentation
cd src/
documentation -o ../docs -f "html" *.js
```

### Where to write tests

```
dataproofer/
├── core-suite/
│   ├── index.js
│   ├── src/
│   │   ├── tests...
```

### Result API

The following key/value pairs need to be returned by a test:

```
var result = {
  passed: false,  // whether or not the test passed
  message: "You're missing a column header", // descriptive text about this test rendered to the CLI
  template: _.template(`<span class="test-header">Missing column headers: <%= missingHeaders %></span>`)({ missingHeaders: 42}) // descriptive text which will dynamically display the results of the test in the desktop app
};
```