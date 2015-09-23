var test = require('tape');
var addAnnotations = require('../../app/actions/addAnnotations');
var expect = require('chai').expect;
var tree = require('../testHelpers/baobabTestTree.js');

test('adds features to sequence object', function(t) {
    //clear the selectionLayer
    var newFeatures = [{
        name: 'hey',
        start: 1,
        end: 3
    }];
    addAnnotations('features', newFeatures);
    expect(tree.get('sequenceData', 'features')).to.exist;
    expect(tree.get('sequenceData', 'features')).to.deep.equal(newFeatures);
    t.end();
});
test('adds parts to sequence object', function(t) {
    //clear the selectionLayer
    var newParts = [{
        name: 'hey',
        start: 1,
        end: 3
    }];
    addAnnotations('parts', newParts);
    expect(tree.get('sequenceData', 'parts')).to.exist;
    expect(tree.get('sequenceData', 'parts')).to.deep.equal(newParts);
    t.end();
});
//tnrtodo: add more tests to make sure other cases are working