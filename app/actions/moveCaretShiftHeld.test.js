var test = require('tape');
var setCaretPosition = require('../../app/actions/setCaretPosition');
var moveCaretShiftHeld = require('../../app/actions/moveCaretShiftHeld');
var setSelectionLayer = require('../../app/actions/setSelectionLayer');
var expect = require('chai').expect;
var tree = require('../testHelpers/baobabTestTree.js');
// var tree = require('../../app/baobabTree.js');

test('sets a selection layer in the positive direction when there is no selection layer', function(t) {
    //clear the selectionLayer
    setSelectionLayer(false);
    setCaretPosition(10);
    moveCaretShiftHeld(1);
    expect(tree.get('caretPosition')).to.equal(-1);
    expect(tree.get('selectionLayer')).to.deep.equal({
        start: 10,
        end: 10,
        selected: true,
        cursorAtEnd: true
    });
    t.end();
});
test('sets a selection layer in the negative direction when there is no selection layer', function(t) {
    //clear the selectionLayer
    setSelectionLayer(false);
    setCaretPosition(10);
    moveCaretShiftHeld(-1);
    expect(tree.get('caretPosition')).to.equal(-1);
    expect(tree.get('selectionLayer')).to.deep.equal({
        start: 9,
        end: 9,
        selected: true,
        cursorAtEnd: false
    });
    t.end();
});
//tnrtodo: add more tests to make sure other cases are working