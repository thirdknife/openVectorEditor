var test = require('tape');
var trimRangeByAnotherRange = require('./trimRangeByAnotherRange.js');
// var trimRangeByAnotherRange = require('./trimRangeByAnotherRange.js');
var assert = require('assert');
	test('trims non circular ranges that dont fully overlap', function(t) {
		t.deepEqual(trimRangeByAnotherRange({
			start: 0,
			end: 2
		}, {
			start: 2,
			end: 2
		}, 10), {
			start: 0,
			end: 1
		});
		t.end();
	});
	test('it does not trim non circular ranges with overlap contained within it', function(t) {
		t.deepEqual(trimRangeByAnotherRange({
			start: 0,
			end: 10
		}, {
			start: 2,
			end: 2
		}, 10), {
			start: 0,
			end: 10
		});
		t.end();
	});
	test('trims non circular ranges that fully overlap', function(t) {
		t.deepEqual(trimRangeByAnotherRange({
			start: 0,
			end: 2
		}, {
			start: 0,
			end: 2
		}, 10), undefined);
		t.deepEqual(trimRangeByAnotherRange({
			start: 3,
			end: 5
		}, {
			start: 3,
			end: 5
		}, 10), undefined);
		t.deepEqual(trimRangeByAnotherRange({
			start: 3,
			end: 3
		}, {
			start: 3,
			end: 3
		}, 10), undefined);
		t.deepEqual(trimRangeByAnotherRange({
			start: 0,
			end: 0
		}, {
			start: 0,
			end: 3
		}, 10), undefined);
		t.end();
	});
	test('does not trim non circular ranges that dont overlap', function(t) {
		t.deepEqual(trimRangeByAnotherRange({
			start: 0,
			end: 2
		}, {
			start: 5,
			end: 6
		}, 10), {
			start: 0,
			end: 2
		});
		t.deepEqual(trimRangeByAnotherRange({
			start: 3,
			end: 5
		}, {
			start: 0,
			end: 0
		}, 10), {
			start: 3,
			end: 5
		});
		t.end();
	});
	test('does trim circular ranges that overlap', function(t) {
		t.deepEqual(trimRangeByAnotherRange({
			start: 3,
			end: 2
		}, {
			start: 5,
			end: 6
		}, 10), {
			start: 3,
			end: 2
		});
		t.deepEqual(trimRangeByAnotherRange({
			start: 3,
			end: 2
		}, {
			start: 3,
			end: 6
		}, 10), {
			start: 7,
			end: 2
		});
		t.deepEqual(trimRangeByAnotherRange({
			start: 3,
			end: 2
		}, {
			start: 1,
			end: 6
		}, 10), {
			start: 7,
			end: 0
		});
		t.deepEqual(trimRangeByAnotherRange({
			start: 3,
			end: 2
		}, {
			start: 0,
			end: 6
		}, 10), {
			start: 7,
			end: 9
		});
		t.deepEqual(trimRangeByAnotherRange({
			start: 3,
			end: 2
		}, {
			start: 2,
			end: 9
		}, 10), {
			start: 0,
			end: 1
		});
		t.deepEqual(trimRangeByAnotherRange({
			start: 3,
			end: 2
		}, {
			start: 4,
			end: 2
		}, 10), {
			start: 3,
			end: 3
		});
		t.deepEqual(trimRangeByAnotherRange({
			start: 1,
			end: 2
		}, {
			start: 4,
			end: 1
		}, 10), {
			start: 2,
			end: 2
		});
		t.deepEqual(trimRangeByAnotherRange({
			start: 1,
			end: 5
		}, {
			start: 4,
			end: 1
		}, 10), {
			start: 2,
			end: 3
		});
		t.deepEqual(trimRangeByAnotherRange({
			start: 3,
			end: 2
		}, {
			start: 3,
			end: 2
		}, 10), undefined);
		t.end();
	});
	
