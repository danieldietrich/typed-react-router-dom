## Prerequisites

* Node Package Manager: [npm](https://www.npmjs.com/get-npm)

## Publishing

In the following is described how to publish a new version to https://npmjs.org.

```bash
# clean the project, run linter, typescript compiler and tests
npm run prepublishOnly

# create a tarball similar to that which will be published
npm pack

# check the tarball contents
tar tvf *.tgz
```

## Running the examples

```bash
# first build the library
npm run prepublishOnly

# then run the examples
cd examples
npm install
npm start
```

Visit http://127.0.0.1:8080
