var test = require('tape');
var setSelectionLayer = require('../../app/actions/setSelectionLayer');
var expect = require('chai').expect;
var tree = require('../../app/baobabTree.js');

test('clears the selection layer when called with false', function(t) {
    //clear the selectionLayer
    setSelectionLayer(false);
    expect(tree.get('selectionLayer')).to.deep.equal({
        start: -1,
        end: -1,
        selected: false,
        cursorAtEnd: true
    });
    t.end();
});
test('sets a selection layer and clears the cursor position when passed a valid range', function(t) {
    //clear the selectionLayer
    setSelectionLayer({
        start: 5,
        end: 6
    });
    expect(tree.get('selectionLayer')).to.deep.equal({
        start: 5,
        end: 6,
        selected: true,
        cursorAtEnd: true
    });
    expect(tree.get('caretPosition')).to.deep.equal(-1);
    t.end();
});