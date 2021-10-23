const {expect} = require('chai');
const {testNumbers} = require('./testNumbers');

describe("Tests", () => { 

    describe("sumNumber", () => { 
        it('check first number is typeOf number', () => { 
            expect(testNumbers.sumNumbers('1', 2)).equal(undefined);
        }); 
        it('check second number is typeOf number', () => { 
            expect(testNumbers.sumNumbers(1, '2')).equal(undefined);
        });
        it('check both numbers are typeOf number', () => { 
            expect(testNumbers.sumNumbers('1', '2')).equal(undefined);
        });
        it('sum both numbers', () => { 
            expect(testNumbers.sumNumbers(1, 2)).equal('3.00');
        });
        it('sum numbers', () => { 
            expect(testNumbers.sumNumbers(1.22, 2.22)).equal('3.44');
        });
        it('work with negative numbers', () => { 
            expect(testNumbers.sumNumbers(3, -5)).equal('-2.00');
        });
        it('null', () => { 
            expect(testNumbers.sumNumbers(null, null)).equal(undefined);
            expect(testNumbers.sumNumbers(1, null)).equal(undefined);
            expect(testNumbers.sumNumbers(null, 2)).equal(undefined);
        });
     }); 
     
     describe("numberChecker", () => { 
        it('input => NaN => throw new Error', () => { 
            expect(() => testNumbers.numberChecker('a').throw());
        }); 
        it('input is even number', () => {
            expect(testNumbers.numberChecker(2)).contain('even');
        });
        it('input is odd number', () => {
            expect(testNumbers.numberChecker(1)).contain('odd');
        });
        it('input is even number as string', () => {
            expect(testNumbers.numberChecker('2')).contain('even');
        });
        it('input is odd number as string', () => {
            expect(testNumbers.numberChecker('1')).contain('odd');
        });
        it('empty string', () => {
            expect(testNumbers.numberChecker('')).contain('even');
        });
     });

     describe("averageSumArray", () => {  
        it('array', () => {
            expect(testNumbers.averageSumArray([5, 5])).equal(5);
        });
        it('works with floats', () => {
            expect(testNumbers.averageSumArray([1.5, 2.5, 3.5])).equal(2.5);
        });
     });
}); 