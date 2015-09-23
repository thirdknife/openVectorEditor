var test = require('tape');
var tidyUpSequenceData = require('ve-sequence-utils/tidyUpSequenceData');
var chai = require("chai");
chai.should();
var ac = require('./apiCheck.js');
test('apiCheck range!', function(t) {
    t.test('does not throw range errors if passed a valid range', function(t) {
        function throwError () {
            ac.throw(ac.range, {start: 1, end: 10});
        }
        throwError.should.not.throw()
        t.end();
    });
    t.test('does throw range errors if passed an invalid range', function(t) {
        function throwError () {
            ac.throw(ac.range, {start: -1, end: 10});
        }
        throwError.should.throw()
        t.end();
    });
});
test('sequenceData!', function(t) {
    t.test('does not throw errors if passed a valid sequenceData object', function(t) {
        var newSeq = tidyUpSequenceData({});
        function throwError () {
            ac.throw(ac.sequenceData, newSeq);
        }
        throwError.should.not.throw()
        t.end();
    });
    t.test('does not throw errors if passed a valid sequenceData object', function(t) {
        var newSeq = tidyUpSequenceData({});
        newSeq.cutsites[0] = {start: 1, end : 10};
        function throwError () {
            ac.throw(ac.sequenceData, newSeq);
        }
        throwError.should.not.throw()
        t.end();
    });
    t.test('does throw errors if passed an invalid sequenceData object', function(t) {
        var newSeq = tidyUpSequenceData({});
        delete newSeq.cutsites;
        function throwError () {
            ac.throw(ac.sequenceData, newSeq);
        }
        throwError.should.throw()
        t.end();
    });
    t.test('does throw errors if passed an invalid sequenceData object', function(t) {
        var newSeq = tidyUpSequenceData({});
        newSeq.cutsites[0] = {start: -1, end : 10};
        function throwError () {
            ac.throw(ac.sequenceData, newSeq);
        }
        throwError.should.throw()
        t.end();
    });
});