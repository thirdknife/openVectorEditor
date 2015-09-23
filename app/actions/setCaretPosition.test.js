var test = require('tape');
var setCaretPosition = require('../../app/actions/setCaretPosition');
var tree = require('../../app/baobabTree.js');
var assert = require('assert');
test('changes the caret position from its initial value', function(t) {
    assert.notEqual(55, tree.get('caretPosition'));
    setCaretPosition(55);
    assert.equal(55, tree.get('caretPosition'));
    setCaretPosition(59);
    assert.equal(59, tree.get('caretPosition'));
    t.end();
});
test('changes the caret position to -1 if passed anything but a non-negative integer', function(t) {
    assert.notEqual(-1, tree.get('caretPosition'));
    setCaretPosition(false);
    assert.equal(-1, tree.get('caretPosition'));
    t.end();
});