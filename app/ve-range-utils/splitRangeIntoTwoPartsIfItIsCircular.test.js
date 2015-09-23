var test = require('tape');
var splitRangeIntoTwoPartsIfItIsCircular = require('./splitRangeIntoTwoPartsIfItIsCircular.js');
var assert = require('assert');
test('returns an array with one range in it if the array is non-circular', function(t) {
    t.deepEqual(splitRangeIntoTwoPartsIfItIsCircular({
        start: 0,
        end: 100
    }, 1000), [{
        start: 0,
        end: 100
    }]);
    t.deepEqual(splitRangeIntoTwoPartsIfItIsCircular({
        start: 10,
        end: 909
    }, 1000), [{
        start: 10,
        end: 909
    }]);
    t.end();
});
test('returns an array with two ranges in it if the array is circular', function(t) {
    t.deepEqual(splitRangeIntoTwoPartsIfItIsCircular({
        start: 110,
        end: 100
    }, 1000), [{
        start: 0,
        end: 100
    }, {
        start: 110,
        end: 999
    }]);
    t.end();
});