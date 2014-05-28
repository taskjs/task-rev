'use strict';

var assert = require('assert');
var Rev = require('../lib/rev');

function errorHandler(err){
    process.nextTick(function rethrow() { throw err; });
}

(new Rev).run(
    [{
        contents: ';',
        path: 'foo.js'
    }], // inputs
    {
        template: '{h}-{b}{e}'
    }, // options
    console // logger
).then(function(inputs){
    assert.equal(inputs[0].path, '9eecb7db-foo.js');
}).catch(errorHandler)
