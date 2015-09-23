// var tap = require('tap');
// tap.mochaGlobals();
var chai = require("chai");
var should = chai.should();
var cutSequenceByRestrictionEnzyme = require('./cutSequenceByRestrictionEnzyme.js');
var enzymeList = require('./enzymeList.js');
var test = require('tape');
// var collapseOverlapsGeneratedFromRangeComparisonIfPossible = require('./collapseOverlapsGeneratedFromRangeComparisonIfPossible.js');
test('a simple, palindromic enzyme', function(t) {
    //bamhi
    // "bamhi": {
    //     "name": "bamhi",
    //     "site": "ggatcdc",
    //     "forwardRegex": "g{2}atc{2}",
    //     "reverseRegex": "g{2}atc{2}",
    //     "cutType": 0,
    //     "dsForward": 1,
    //     "dsReverse": 5,
    //     "usForward": 0,
    //     "usReverse": 0
    // },
    t.test('cuts a single non-circular cutsite', function(t) {
        var cutsites = cutSequenceByRestrictionEnzyme('ggatcc', true, enzymeList['bamhi']);
        cutsites.should.be.an.array;
        cutsites.length.should.equal(1);
        cutsites[0].start.should.equal(0);
        cutsites[0].end.should.equal(5);
        cutsites[0].recognitionSiteRange.start.should.equal(0);
        cutsites[0].recognitionSiteRange.end.should.equal(5);
        cutsites[0].downstreamTopSnip.should.equal(1);
        cutsites[0].downstreamBottomSnip.should.equal(5);
        should.not.exist(cutsites[0].upstreamTopSnip);
        should.not.exist(cutsites[0].upstreamBottomSnip);
        t.end();
    });
    t.test('cuts a single circular cutsite', function(t) {
        var cutsites = cutSequenceByRestrictionEnzyme('ccrrrrggat', true, enzymeList['bamhi']);
        cutsites.should.be.an.array;
        cutsites.length.should.equal(1);
        cutsites[0].start.should.equal(6);
        cutsites[0].end.should.equal(1);
        cutsites[0].recognitionSiteRange.start.should.equal(6);
        cutsites[0].recognitionSiteRange.end.should.equal(1);
        cutsites[0].downstreamTopSnip.should.equal(7);
        cutsites[0].downstreamBottomSnip.should.equal(1);
        should.not.exist(cutsites[0].upstreamTopSnip);
        should.not.exist(cutsites[0].upstreamBottomSnip);
        t.end();
    });
    t.test('does not cut a circular cutsite if sequence is non-circular', function(t) {
        var cutsites = cutSequenceByRestrictionEnzyme('ccrrrrggat', false, enzymeList['bamhi']);
        cutsites.should.be.an.array;
        cutsites.length.should.equal(0);
        t.end();
    });
    t.test('cuts multiple times', function(t) {
        //bamhi
        // "bamhi": {
        //     "name": "bamhi",
        //     "site": "ggatcdc",
        //     "forwardRegex": "g{2}atc{2}",
        //     "reverseRegex": "g{2}atc{2}",
        //     "cutType": 0,
        //     "dsForward": 1,
        //     "dsReverse": 5,
        //     "usForward": 0,
        //     "usReverse": 0
        // },
        var cutsites = cutSequenceByRestrictionEnzyme('ggatccttttggatcc', true, enzymeList['bamhi']);
        cutsites.should.be.an.array;
        cutsites.length.should.equal(2);
        cutsites[0].start.should.equal(0);
        cutsites[0].end.should.equal(5);
        cutsites[0].recognitionSiteRange.start.should.equal(0);
        cutsites[0].recognitionSiteRange.end.should.equal(5);
        cutsites[0].downstreamTopSnip.should.equal(1);
        cutsites[0].downstreamBottomSnip.should.equal(5);
        should.not.exist(cutsites[0].upstreamTopSnip);
        should.not.exist(cutsites[0].upstreamBottomSnip);
        cutsites[1].start.should.equal(10);
        cutsites[1].end.should.equal(15);
        cutsites[1].recognitionSiteRange.start.should.equal(10);
        cutsites[1].recognitionSiteRange.end.should.equal(15);
        cutsites[1].downstreamTopSnip.should.equal(11);
        cutsites[1].downstreamBottomSnip.should.equal(15);
        should.not.exist(cutsites[1].upstreamTopSnip);
        should.not.exist(cutsites[1].upstreamBottomSnip);
        t.end();
    });
});
test('non-palindromic enzyme', function(t) {
    // "bsmbi": {
    //     "name": "BsmBI",
    //     "site": "cgtctc",
    //     "forwardRegex": "cgtctc",
    //     "reverseRegex": "gagacg",
    //     "cutType": 0,
    //     "dsForward": 7,
    //     "dsReverse": 11,
    //     "usForward": 0,
    //     "usReverse": 0
    // },
    // 
    t.test('does not cut if the enzyme cuts outside of a linear sequence', function(t) {
        var cutsites = cutSequenceByRestrictionEnzyme('cgtctc', false, enzymeList['bsmbi']);
        cutsites.should.be.an.array;
        cutsites.length.should.equal(0);
        t.end();
    });
    t.test('does cut if the enzyme fits within circular sequence', function(t) {
        var cutsites = cutSequenceByRestrictionEnzyme('cgtctc', true, enzymeList['bsmbi']);
        cutsites.should.be.an.array;
        cutsites.length.should.equal(1);
        cutsites[0].start.should.equal(0);
        cutsites[0].end.should.equal(4);
        cutsites[0].recognitionSiteRange.start.should.equal(0);
        cutsites[0].recognitionSiteRange.end.should.equal(5);
        cutsites[0].downstreamTopSnip.should.equal(1);
        cutsites[0].downstreamBottomSnip.should.equal(5);
        should.not.exist(cutsites[0].upstreamTopSnip);
        t.end();
    });
    t.test('does cut if the sequence is long enough', function(t) {
        // 0123456 7890 12345678
        // cgtctct tttt tttttttttttttttttt
        // rrrrrr
        //        |  dsTopSnip
        //             |  dsBottomSnip
        var cutsites = cutSequenceByRestrictionEnzyme('cgtctcttttttttttttttttttttttt', true, enzymeList['bsmbi']);
        cutsites.should.be.an.array;
        cutsites.length.should.equal(1);
        cutsites[0].start.should.equal(0);
        cutsites[0].end.should.equal(10);
        cutsites[0].recognitionSiteRange.start.should.equal(0);
        cutsites[0].recognitionSiteRange.end.should.equal(5);
        cutsites[0].downstreamTopSnip.should.equal(7);
        cutsites[0].downstreamBottomSnip.should.equal(11);
        should.not.exist(cutsites[0].upstreamTopSnip);
        should.not.exist(cutsites[0].upstreamBottomSnip);
        t.end();
    });
    t.test('cuts on reverse strand', function(t) {
        // 0123456 7890 12345678
        // cgtctct tttt tttttttttttttttttt
        // rrrrrr
        //        |  dsTopSnip
        //             |  dsBottomSnip
        var cutsites = cutSequenceByRestrictionEnzyme('aaaaaaaaaaaaaaaaaaaaaaagagacg', true, enzymeList['bsmbi']);
        cutsites.should.be.an.array;
        cutsites.length.should.equal(1);
        cutsites[0].start.should.equal(18);
        cutsites[0].end.should.equal(28);
        cutsites[0].recognitionSiteRange.start.should.equal(23);
        cutsites[0].recognitionSiteRange.end.should.equal(28);
        cutsites[0].downstreamTopSnip.should.equal(18);
        cutsites[0].downstreamBottomSnip.should.equal(22);
        should.not.exist(cutsites[0].upstreamTopSnip);
        should.not.exist(cutsites[0].upstreamBottomSnip);
        t.end();
    });
});
test('palindromic enzyme that cuts both upstream and downstream', function(t) {
    // "nmedi": {
    //     "name": "NmeDI",
    //     "site": "rccggy",
    //     "forwardRegex": "[agr]c{2}g{2}[cty]",
    //     "reverseRegex": "[agr]c{2}g{2}[cty]",
    //     "cutType": 1,
    //     "dsForward": 13,
    //     "dsReverse": 18,
    //     "usForward": 13,
    //     "usReverse": 18
    // },
    t.test('does not cut if the enzyme cuts outside of a linear sequence', function(t) {
        var cutsites = cutSequenceByRestrictionEnzyme('rccggy', false, enzymeList['nmedi']);
        cutsites.should.be.an.array;
        cutsites.length.should.equal(0);
        t.end();
    });
    t.test('does cut twice if the enzyme fits within linear sequence', function(t) {
        // ttttttttttttttttttttrccggyttttttttttttttttttttt
        // 01234567890123456789012345678901234567890123456
        var cutsites = cutSequenceByRestrictionEnzyme('ttttttttttttttttttttrccggyttttttttttttttttttttt', false, enzymeList['nmedi']);
        cutsites.should.be.an.array;
        cutsites.length.should.equal(1);
        cutsites[0].start.should.equal(8);
        cutsites[0].end.should.equal(37);
        cutsites[0].recognitionSiteRange.start.should.equal(20);
        cutsites[0].recognitionSiteRange.end.should.equal(25);
        cutsites[0].downstreamTopSnip.should.equal(33);
        cutsites[0].downstreamBottomSnip.should.equal(38);
        cutsites[0].upstreamTopSnip.should.equal(12);
        cutsites[0].upstreamBottomSnip.should.equal(7);
        t.end();
    });
    t.test('cuts only once if only the upstream cutting end fits within linear sequence', function(t) {
        // ttttttttttttttttttttrccggyttttttttttttttttttttt
        // 01234567890123456789012345678901234567890123456
        var cutsites = cutSequenceByRestrictionEnzyme('ttttttttttttttttttttrccggy', false, enzymeList['nmedi']);
        cutsites.should.be.an.array;
        cutsites.length.should.equal(1);
        cutsites[0].start.should.equal(8);
        cutsites[0].end.should.equal(25);
        cutsites[0].recognitionSiteRange.start.should.equal(20);
        cutsites[0].recognitionSiteRange.end.should.equal(25);
        should.not.exist(cutsites[0].downstreamTopSnip);
        should.not.exist(cutsites[0].downstreamBottomSnip);
        cutsites[0].upstreamTopSnip.should.equal(12);
        cutsites[0].upstreamBottomSnip.should.equal(7);
        t.end();
    });
    t.test('cuts only once if only the downstream cutting end fits within linear sequence', function(t) {
        // ttttttttttttttttttttrccggyttttttttttttttttttttt
        // 01234567890123456789012345678901234567890123456
        var cutsites = cutSequenceByRestrictionEnzyme('rccggyttttttttttttttttttttt', false, enzymeList['nmedi']);
        cutsites.should.be.an.array;
        cutsites.length.should.equal(1);
        cutsites[0].start.should.equal(0);
        cutsites[0].end.should.equal(17);
        cutsites[0].recognitionSiteRange.start.should.equal(0);
        cutsites[0].recognitionSiteRange.end.should.equal(5);
        cutsites[0].downstreamTopSnip.should.equal(13);
        cutsites[0].downstreamBottomSnip.should.equal(18);
        should.not.exist(cutsites[0].upstreamTopSnip);
        should.not.exist(cutsites[0].upstreamBottomSnip);
        t.end();
    });
});