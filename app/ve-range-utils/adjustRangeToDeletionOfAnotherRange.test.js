var adjustRangeToDeletionOfAnotherRange = require('./adjustRangeToDeletionOfAnotherRange.js');
// var collapseOverlapsGeneratedFromRangeComparisonIfPossible = require('./collapseOverlapsGeneratedFromRangeComparisonIfPossible.js');
var test = require('tape');
test('deletes non circular range if fully overlapped', function(t) {
    t.notOk(adjustRangeToDeletionOfAnotherRange({
        start: 10,
        end: 20
    }, {
        start: 10,
        end: 20
    }, 30));
    t.end();
});
test('deletes circular range if fully overlapped', function(t) {
    t.notOk(adjustRangeToDeletionOfAnotherRange({
        start: 20,
        end: 10
    }, {
        start: 20,
        end: 10
    }, 30));
    t.end();
});
test('shifts start and end if deleting before non circular range', function(t) {
    t.deepEqual(adjustRangeToDeletionOfAnotherRange({
        start: 10,
        end: 20
    }, {
        start: 5,
        end: 8
    }, 30), {
        start: 6,
        end: 16
    });
    t.end();
});
test('shifts start if deleting in middle of non circular range', function(t) {
    t.deepEqual(adjustRangeToDeletionOfAnotherRange({
        start: 20,
        end: 10
    }, {
        start: 15,
        end: 20
    }, 30), {
        start: 15,
        end: 10
    });
    t.deepEqual(adjustRangeToDeletionOfAnotherRange({
        start: 20,
        end: 10
    }, {
        start: 15,
        end: 15
    }, 30), {
        start: 19,
        end: 10
    });
    t.end();
});
test('shifts start and end if deleting before end of non circular range', function(t) {
    t.deepEqual(adjustRangeToDeletionOfAnotherRange({
        start: 20,
        end: 10
    }, {
        start: 0,
        end: 0
    }, 30), {
        start: 19,
        end: 9
    });
    t.deepEqual(adjustRangeToDeletionOfAnotherRange({
        start: 20,
        end: 10
    }, {
        start: 5,
        end: 15
    }, 30), {
        start: 9,
        end: 4
    });
    t.end();
});
test('shifts neither start nor end if deleting after start of non circular range', function(t) {
    t.deepEqual(adjustRangeToDeletionOfAnotherRange({
        start: 20,
        end: 10
    }, {
        start: 25,
        end: 27
    }, 30), {
        start: 20,
        end: 10
    });
    t.deepEqual(adjustRangeToDeletionOfAnotherRange({
        start: 20,
        end: 10
    }, {
        start: 20,
        end: 25
    }, 30), {
        start: 20,
        end: 10
    });
    t.end();
});