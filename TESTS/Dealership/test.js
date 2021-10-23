const {expect} = require('chai');
const {dealership} = require('./dealership');

describe('Tests', () => { 
    describe('newCarCost', () => { 
        it('discountForOldCar', () => { 
            expect(dealership.newCarCost('Audi A4 B8', 16000)).equal(1000);
        }); 
        it('newCarPrice', () => { 
            expect(dealership.newCarCost('BMW', 16000)).equal(16000);
        });
     }); 
 
     describe('carEquipment', () => { 
        it('array', () => { 
            expect(dealership.carEquipment(['seats', 'sliding roof', 'sport rims', 'navigation'], [0, 3])).deep.equal(['seats', 'navigation']);
        }); 
     }); 

     describe('euroCategory', () => { 
        it('euro category 5', () => { 
            expect(dealership.euroCategory(5)).equal(`We have added 5% discount to the final price: 14250.`);
        }); 
        it('euro category 4', () => { 
            expect(dealership.euroCategory(4)).equal(`We have added 5% discount to the final price: 14250.`);
        }); 
        it('euro category 3', () => { 
            expect(dealership.euroCategory(3)).equal('Your euro category is low, so there is no discount from the final price!');
        }); 
     }); 
}); 