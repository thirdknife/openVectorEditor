var test = require('tape');
var getSequenceWithinRange = require('./getSequenceWithinRange.js');
// var collapseOverlapsGeneratedFromRangeComparisonIfPossible = require('./collapseOverlapsGeneratedFromRangeComparisonIfPossible.js');
var assert = require('assert');
var subseq;

test('works with an array (translation amino acids for example) as well', function(t) {
    subseq = getSequenceWithinRange({
        start: 0,
        end: 0
    }, ['a', 't', 'g', 'c']);
    t.deepEqual(subseq, ['a']);
    subseq = getSequenceWithinRange({
        start: 1,
        end: 1
    }, ['a', 't', 'g', 'c']);
    t.deepEqual(subseq, ['t']);
    subseq = getSequenceWithinRange({
        start: 1,
        end: 0
    }, ['a', 't', 'g', 'c']);
    t.deepEqual(subseq, ['t', 'g', 'c', 'a']);
    t.end();
});
test('gets a non circular range', function(t) {
    subseq = getSequenceWithinRange({
        start: 0,
        end: 0
    }, 'atgc');
    t.equal(subseq, 'a');
    subseq = getSequenceWithinRange({
        start: 1,
        end: 1
    }, 'atgc');
    t.equal(subseq, 't');
    subseq = getSequenceWithinRange({
        start: 0,
        end: 3
    }, 'atgc');
    t.equal(subseq, 'atgc');
    t.end();
});
test('gets a circular range', function(t) {
    subseq = getSequenceWithinRange({
        start: 1,
        end: 0
    }, 'atgc');
    t.deepEqual(subseq, 'tgca');
    subseq = getSequenceWithinRange({
        start: 2,
        end: 1
    }, 'atgc');
    t.deepEqual(subseq, 'gcat');
    subseq = getSequenceWithinRange({
        start: 3,
        end: 0
    }, 'atgc');
    t.deepEqual(subseq, 'ca');
    t.end();
});
test('gets a circular range', function(t) {
    subseq = getSequenceWithinRange({
        start: 1,
        end: 0
    }, 'atgc');
    t.deepEqual(subseq, 'tgca');
    subseq = getSequenceWithinRange({
        start: 2,
        end: 1
    }, 'atgc');
    t.deepEqual(subseq, 'gcat');
    subseq = getSequenceWithinRange({
        start: 3,
        end: 0
    }, 'atgc');
    t.deepEqual(subseq, 'ca');
    t.end();
});