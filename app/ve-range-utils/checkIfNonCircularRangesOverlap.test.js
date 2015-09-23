var test = require('tape');
var expect = require('chai').expect;
var checkIfNonCircularRangesOverlap = require('./checkIfNonCircularRangesOverlap.js');
// checkIfNonCircularRangesOverlap(frame, sequence, minimumOrfSize, forward, circular)
	test('returns true if non circular ranges do overlap', function(t) {
		expect(checkIfNonCircularRangesOverlap({
			start: 5,
			end: 100
		}, {
			start: 50,
			end: 50
		})).to.equal(true);
		expect(checkIfNonCircularRangesOverlap({
			start: 5,
			end: 100
		}, {
			start: 50,
			end: 500
		})).to.equal(true);
		expect(checkIfNonCircularRangesOverlap({
			start: 5,
			end: 100
		}, {
			start: 0,
			end: 5
		})).to.equal(true);
		t.end();
	});
	test('returns false if non circular ranges do not overlap', function(t) {
		expect(checkIfNonCircularRangesOverlap({
			start: 5,
			end: 100
		}, {
			start: 1,
			end: 4
		})).to.equal(false);
		expect(checkIfNonCircularRangesOverlap({
			start: 5,
			end: 100
		}, {
			start: 101,
			end: 101
		})).to.equal(false);
		t.end();
	});
