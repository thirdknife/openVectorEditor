var test = require('tape');
var setCaretPosition = require('./setCaretPosition');
var insertSequenceData = require('./insertSequenceData');
var setSelectionLayer = require('./setSelectionLayer');
var setCaretPosition = require('./setCaretPosition');
var addAnnotations = require('./addAnnotations');
var setSelectionLayer = require('./setSelectionLayer');
var tree = require('../testHelpers/baobabTestTree');
var seedTreeWithSimpleSequenceData = require('../testHelpers/seedTreeWithSimpleSequenceData');
var chai = require("chai");
chai.should();
var chaiSubset = require('chai-subset');
chai.use(chaiSubset);


test('inserts characters at correct caret position', function(t) {
    var sequenceToInsert = {
        sequence: 'atgagagaga'
    };
    var sequenceLengthPreInsert = tree.get('sequenceLength');
    setSelectionLayer(false); //make sure there's no selection layer
    setCaretPosition(0);
    insertSequenceData(sequenceToInsert);
    var sequenceLengthPostInsert = tree.get('sequenceLength');
    sequenceLengthPostInsert.should.equal(sequenceLengthPreInsert + sequenceToInsert.sequence.length);
    t.end();
});

test('moves existing annotations correctly', function(t) {
    var sequenceToInsert = {
        sequence: 'atgagagaga',
    };
    seedTreeWithSimpleSequenceData({
        sequence: 'atgc'
    });
    addAnnotations('features', [{
        start: 0,
        end: 3
    }]);
    addAnnotations('features', [{
        start: 3,
        end: 1
    }]);
    addAnnotations('parts', [{
        start: 0,
        end: 3
    }]);
    addAnnotations('translations', [{
        start: 0,
        end: 3
    }]);
    var sequenceLengthPreInsert = tree.get('sequenceLength');
    setSelectionLayer(false); //make sure there's no selection layer
    setCaretPosition(0);
    insertSequenceData(sequenceToInsert);
    var sequenceLengthPostInsert = tree.get('sequenceLength');
    sequenceLengthPostInsert.should.equal(sequenceLengthPreInsert + sequenceToInsert.sequence.length);
    tree.get('sequenceData', 'features').should.containSubset([{
        start: 10,
        end: 13
    }, {
        start: 13,
        end: 11
    }])
    tree.get('sequenceData', 'parts').should.containSubset([{
        start: 10,
        end: 13
    }])
    tree.get('sequenceData', 'translations').should.containSubset([{
        start: 10,
        end: 13
    }])
    t.end();
});