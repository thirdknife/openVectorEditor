var tree = require('../baobabTree');
var validateAndTidyUpSequenceData = require('ve-sequence-utils/validateAndTidyUpSequenceData.js');

module.exports = function (simpleSequenceData) {
	if (!simpleSequenceData) {
		//initialize it with something
		simpleSequenceData = {sequence: 'atgc'};
	}
	tree.set(['sequenceData'], validateAndTidyUpSequenceData(simpleSequenceData));
};
