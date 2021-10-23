const { expect } = require('chai');
const { library } = require('./library');

describe("Tests", () => {

    describe('calcPriceOfBook', () => {
        it('validate name of book', () => {
            expect(() => library.calcPriceOfBook(1, 1)).throw();
        });
        it('validate year of book', () => {
            expect(() => library.calcPriceOfBook('name', '1')).throw();
        });
        it('year of book is negative', () => {
            expect(() => library.calcPriceOfBook('', 1980)).throw('Invalid input');
        });

        it('valid input with year less than 1980', () => {
            expect(library.calcPriceOfBook('story', 1979)).equal(`Price of story is 10.00`);
        });
        it('valid input with year equal to 1980', () => {
            expect(library.calcPriceOfBook('story', 1980)).equal(`Price of story is 10.00`);
        });
        it('valid input with year more than 1980', () => {
            expect(library.calcPriceOfBook('story', 1981)).equal(`Price of story is 20.00`);
        });
    });

    describe('findBook', () => {
        it('validate booksArr length', () => {
            expect(() => library.findBook(0, 'book')).throw();
        });
        it('found book', () => {
            expect(library.findBook(['book', 'troy'], 'book')).equal('We found the book you want.');
        });
        it('book is not here', () => {
            expect(library.findBook(['book', 'troy'], 'sevy')).equal('The book you are looking for is not here!');
        });
    });

    describe('arrangeTheBooks', () => {
        it('input is not a number', () => {
            expect(() => library.arrangeTheBooks('1')).throw();
        });
        it('input is not a number', () => {
            expect(() => library.arrangeTheBooks('')).throw();
        });
        it('input is a negative number', () => {
            expect(() => library.arrangeTheBooks(-1)).throw();
        });

        it('books less than 40', () => {
            expect(library.arrangeTheBooks(39)).equal('Great job, the books are arranged.');
        });
        it('books equal to 40', () => {
            expect(library.arrangeTheBooks(40)).equal('Great job, the books are arranged.');
        });
        it('books more than 40', () => {
            expect(library.arrangeTheBooks(41)).equal('Insufficient space, more shelves need to be purchased.');
        });
    });
});