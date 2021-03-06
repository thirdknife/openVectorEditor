var expect = require('chai').expect;
var getYOffsetsForPotentiallyCircularRanges = require('./getYOffsetsForPotentiallyCircularRanges.js');
describe('getYOffsetsForPotentiallyCircularRanges', function() {
    it('returns correct yOffset for overlapping ranges', function() {
        expect(getYOffsetsForPotentiallyCircularRanges([{
            start: 5,
            end: 100
        }, {
            start: 50,
            end: 50
        }])).to.deep.equal([0,1]);
        expect(getYOffsetsForPotentiallyCircularRanges([{
            start: 5,
            end: 100
        }, {
            start: 50,
            end: 50
        },{
            start: 50,
            end: 50
        },{
            start: 150,
            end: 4
        },{
            start: 150,
            end: 150
        }])).to.deep.equal([0,1,2,0,1]);
    });
    // it('returns false if ranges do not overlap', function() {
    //     expect(getYOffsetsForPotentiallyCircularRanges([{
    //         start: 5,
    //         end: 100
    //     }, {
    //         start: 1,
    //         end: 4
    //     }])).to.deep.equal(false);
    // });
});