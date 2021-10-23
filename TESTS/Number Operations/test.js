const {expect} = require('chai');
const {numberOperations} = require('./03. Number Operations_Resources');

describe("numberOperations", () => { 

    describe("powNumber", () => { 
        it('return pow', () => { 
            expect(numberOperations.powNumber(2)).equal(4);
        }); 
     }); 
     
     describe("numberChecker", () => { 
        it('input not a number throws an Error', () => { 
            expect(() => numberOperations.numberChecker('%')).throw();
        }); 
        it('input is number as string', () => {
            expect(numberOperations.numberChecker('2')).equal('The number is lower than 100!');
        });
        it('input is number lower than 100', () => {
            expect(numberOperations.numberChecker(2)).equal('The number is lower than 100!');
        });
        it('input is number equal to 100', () => {
            expect(numberOperations.numberChecker(100)).equal('The number is greater or equal to 100!');
        });
        it('input is number greater than 100', () => {
            expect(numberOperations.numberChecker(101)).equal('The number is greater or equal to 100!');
        });
        it('input number is negative', () => {
            expect(numberOperations.numberChecker(-1)).equal('The number is lower than 100!');
        });
     });

     describe("sumArrays", () => { 
        it('sums arrays', () => { 
            expect(numberOperations.sumArrays([1, 2, 3], [4, 5, 6])).deep.equal([ 5, 7, 9 ]);
        });
        it('first array is longer', () => { 
            expect(numberOperations.sumArrays([1, 2, 3, 4], [5, 6, 7])).deep.equal([6, 8, 10, 4]);
        });  
        it('second array is longer', () => { 
            expect(numberOperations.sumArrays([1, 2, 3], [4, 5, 6, 7])).deep.equal([5, 7, 9, 7]);
        }); 
     });
}); 