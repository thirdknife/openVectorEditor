var filterAminoAcidSequenceString = require('./filterAminoAcidSequenceString');

var test = require('tape');
test('filterAminoAcidSequenceString', function(t) {
    var allGoodAminoAcidsString = 'mrssknvikefmrfkvrmegtvnghefeiegegegrpyeghntvklkvtkggplpfawdilspqfqygskvyvkhpadipdykklsfpegfkwervmnfedggvvtvtqdsslqdgcfiykvkfigvnfpsdgpvmqkktmgweasterlyprdgvlkgeihkalklkdgghylvefksiymakkpvqlpgyyyvdsklditshnedytiveqyertegrhhlfl';
    t.equal(filterAminoAcidSequenceString(allGoodAminoAcidsString), allGoodAminoAcidsString);
    t.end();
});