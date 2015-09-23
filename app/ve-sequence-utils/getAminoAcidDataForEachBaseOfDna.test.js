//var tap = require('tap');
//tap.mochaGlobals();
var getAminoAcidDataForEachBaseOfDna = require('./getAminoAcidDataForEachBaseOfDna.js');
var getAA = require('./getAminoAcidFromSequenceTriplet');
// var collapseOverlapsGeneratedFromRangeComparisonIfPossible = require('./collapseOverlapsGeneratedFromRangeComparisonIfPossible.js');
var assert = require('assert');
var aaData;
var test = require('tape');
//: It gets correct amino acid mapping and position in codon for each basepair in sequence
test('1 amino acid long sequence', function(t) {
    aaData = getAminoAcidDataForEachBaseOfDna('atg', true);
    assert.deepEqual(aaData, [{
        aminoAcid: getAA('atg'),
        positionInCodon: 0,
        aminoAcidIndex: 0,
        fullCodon: true,
    }, {
        aminoAcid: getAA('atg'),
        positionInCodon: 1,
        aminoAcidIndex: 0,
        fullCodon: true,
    }, {
        aminoAcid: getAA('atg'),
        positionInCodon: 2,
        aminoAcidIndex: 0,
        fullCodon: true,
    }]);
    t.end();
});
test('1 amino acid long sequence in reverse direction', function(t) {
    aaData = getAminoAcidDataForEachBaseOfDna('atg', false);
    assert.deepEqual(aaData, [{
        aminoAcid: getAA('cat'),
        positionInCodon: 2,
        aminoAcidIndex: 0,
        fullCodon: true,
    }, {
        aminoAcid: getAA('cat'),
        positionInCodon: 1,
        aminoAcidIndex: 0,
        fullCodon: true,
    }, {
        aminoAcid: getAA('cat'),
        positionInCodon: 0,
        aminoAcidIndex: 0,
        fullCodon: true,
    }]);
    t.end();
});
test('> 1 amino acid long sequence', function(t) {
    aaData = getAminoAcidDataForEachBaseOfDna('atgtaat', true);
    assert.deepEqual(aaData, [{
        aminoAcid: getAA('atg'),
        positionInCodon: 0,
        aminoAcidIndex: 0,
        fullCodon: true,
    }, {
        aminoAcid: getAA('atg'),
        positionInCodon: 1,
        aminoAcidIndex: 0,
        fullCodon: true,
    }, {
        aminoAcid: getAA('atg'),
        positionInCodon: 2,
        aminoAcidIndex: 0,
        fullCodon: true,
    }, {
        aminoAcid: getAA('taa'),
        positionInCodon: 0,
        aminoAcidIndex: 1,
        fullCodon: true,
    }, {
        aminoAcid: getAA('taa'),
        positionInCodon: 1,
        aminoAcidIndex: 1,
        fullCodon: true,
    }, {
        aminoAcid: getAA('taa'),
        positionInCodon: 2,
        aminoAcidIndex: 1,
        fullCodon: true,
    }, {
        aminoAcid: getAA('xxx'),
        positionInCodon: 0,
        aminoAcidIndex: 2,
        fullCodon: false,
    }]);
    t.end();
});
test('> 1 amino acid long sequence in reverse direction', function(t) {
    aaData = getAminoAcidDataForEachBaseOfDna('atgtaat', false);

    assert.deepEqual(aaData, [{
        aminoAcid: getAA('xxx'),
        positionInCodon: 0,
        aminoAcidIndex: 2,
        fullCodon: false,
    }, {
        aminoAcid: getAA('aca'),
        positionInCodon: 2,
        aminoAcidIndex: 1,
        fullCodon: true,
    }, {
        aminoAcid: getAA('aca'),
        positionInCodon: 1,
        aminoAcidIndex: 1,
        fullCodon: true,
    }, {
        aminoAcid: getAA('aca'),
        positionInCodon: 0,
        aminoAcidIndex: 1,
        fullCodon: true,
    }, {
        aminoAcid: getAA('att'),
        positionInCodon: 2,
        aminoAcidIndex: 0,
        fullCodon: true,
    }, {
        aminoAcid: getAA('att'),
        positionInCodon: 1,
        aminoAcidIndex: 0,
        fullCodon: true,
    }, {
        aminoAcid: getAA('att'),
        positionInCodon: 0,
        aminoAcidIndex: 0,
        fullCodon: true,
    }]);
    t.end();
});
test('< 1 amino acid long sequence', function(t) {
    aaData = getAminoAcidDataForEachBaseOfDna('at', true);
    assert.deepEqual(aaData, [{
        aminoAcid: getAA('xxx'),
        positionInCodon: 0,
        aminoAcidIndex: 0,
        fullCodon: false,
    }, {
        aminoAcid: getAA('xxx'),
        positionInCodon: 1,
        aminoAcidIndex: 0,
        fullCodon: false,
    }]);
    t.end();
});
test('< 1 amino acid long sequence in reverse direction', function(t) {
    aaData = getAminoAcidDataForEachBaseOfDna('at', false);
    assert.deepEqual(aaData, [{
        aminoAcid: getAA('xxx'),
        positionInCodon: 1,
        aminoAcidIndex: 0,
        fullCodon: false,
    }, {
        aminoAcid: getAA('xxx'),
        positionInCodon: 0,
        aminoAcidIndex: 0,
        fullCodon: false,
    }]);
    t.end();
});