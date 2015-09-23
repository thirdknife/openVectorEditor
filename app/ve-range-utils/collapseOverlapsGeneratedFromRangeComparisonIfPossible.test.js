var test = require('tape');

var getOverlapsOfPotentiallyCircularRanges = require('./getOverlapsOfPotentiallyCircularRanges.js');
var collapseOverlapsGeneratedFromRangeComparisonIfPossible = require('./collapseOverlapsGeneratedFromRangeComparisonIfPossible.js');
var assert = require('assert');
	test('returns an empty array if passed an empty array of overlaps', function(t) {
		t.deepEqual(collapseOverlapsGeneratedFromRangeComparisonIfPossible([], 1000), []);
		t.deepEqual(collapseOverlapsGeneratedFromRangeComparisonIfPossible(getOverlapsOfPotentiallyCircularRanges({
			start: 900,
			end: 100
		}, {
			start: 900,
			end: 100
		}, 1000), 1000), [{
			start: 900,
			end: 100
		}]);
		t.end();
	});
	test('collapses a split circular range', function(t) {
		t.deepEqual(collapseOverlapsGeneratedFromRangeComparisonIfPossible([{
			start: 0,
			end: 100
		}, {
			start: 105,
			end: 999
		}], 1000), [{
			start: 105,
			end: 100
		}]);
		t.deepEqual(collapseOverlapsGeneratedFromRangeComparisonIfPossible(getOverlapsOfPotentiallyCircularRanges({
			start: 900,
			end: 100
		}, {
			start: 900,
			end: 100
		}, 1000), 1000), [{
			start: 900,
			end: 100
		}]);
		t.end();
	});
	test('doesnt collapses a split range that doesnt line up correctly', function(t) {
		t.deepEqual(collapseOverlapsGeneratedFromRangeComparisonIfPossible([{
			start: 0,
			end: 100
		}, {
			start: 105,
			end: 998
		}], 1000),[{
			start: 0,
			end: 100
		}, {
			start: 105,
			end: 998
		}]);
		t.end();
	});
	test('collapses a split circular range with a third part', function(t) {
		t.deepEqual(collapseOverlapsGeneratedFromRangeComparisonIfPossible([{
			start: 200,
			end: 300
		},{
			start: 0,
			end: 100
		}, {
			start: 500,
			end: 999
		}], 1000), [{
			start: 500,
			end: 100
		},{
			start: 200,
			end: 300
		}]);
		t.end();
	});

	test('collapses a split circular range with a third part in a different order', function(t) {
		t.deepEqual(collapseOverlapsGeneratedFromRangeComparisonIfPossible([{
			start: 0,
			end: 100
		},{
			start: 200,
			end: 300
		}, {
			start: 500,
			end: 999
		}], 1000), [{
			start: 500,
			end: 100
		},{
			start: 200,
			end: 300
		}]);
		t.end();
	});
