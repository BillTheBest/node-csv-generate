[![Build Status](https://secure.travis-ci.org/wdavidw/node-csv-generate.png)](http://travis-ci.org/wdavidw/node-csv-generate)

CSV and object generation
=========================

This module export a flexible generator of CSV string and Javascript objects 
implementing the Node.js `stream.Readable` API.

Features includes

*   random or pseudo-random seed based generation
*   `stream.Readable` implementation


Migration
---------

Most of the generator is imported from its parent project [CSV][csv] in a effort 
to split it between the generator, the parser, the transformer and the stringifier.

Development
-----------

Tests are executed with mocha. To install it, simple run `npm install` 
followed by `npm test`. It will install mocha and its dependencies in your 
project "node_modules" directory and run the test suite. The tests run 
against the CoffeeScript source files.

To generate the JavaScript files, run `make build`.

The test suite is run online with [Travis][travis] against the versions 
0.9, 0.10 and 0.11 of Node.js.

Contributors
------------

*   David Worms: <https://github.com/wdavidw>

[csv]: https://github.com/wdavidw/node-csv
[travis]: https://travis-ci.org/#!/wdavidw/node-csv-generate