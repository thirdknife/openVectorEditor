var AxisContainer = require('./AxisContainer');

var test = require('prova')
var React = require('react')
var testTree = require('react-test-tree')

import sinon from 'sinon'

let spy = sinon.spy()

test('timing test', function (t) {
    var fooTree = testTree(<AxisContainer row={{start: 0, end: 10}}
        tickSpacing={5}
        bpsPerRow={10}
        charWidth={10}
        annotationHeight={10} />, {
    });
    debugger;

   
  t.end()
})




