class ChristmasDinner {
    constructor(budget){
        if(budget < 0){
            throw new Error('The budget cannot be a negative number');
        }
        this.budget = budget;
        this.dishes = [];
        this.products = [];
        this.guests = {};
    }

    shopping(product) {
        let [type, price] = product;
        price = Number(price);

        if(price > this.budget){
            throw new Error('Not enough money to buy this product');
        }else if(price <= this.budget){
            this.products.push(type);
            this.budget -= price;
            return `You have successfully bought ${type}!`;
        }
    };

    recipes(recipe) {
        let recipeName = recipe.recipeName;
        let productsList = recipe.productsList;
        
        for(let prod of productsList){
            if(!this.products.includes(prod)){
                throw new Error('We do not have this product');
            }
        }
        
        this.dishes.push(recipe);
        return `${recipeName} has been successfully cooked!`;
    };

    inviteGuests(name, dish) {
        
        let isPresent = this.dishes.some(s => s.recipeName == dish);
        if(!isPresent){
            throw new Error('We do not have this dish');
        }

        let keys = Object.keys(this.guests);

        if(!keys.includes(name)){
            this.guests[name] = dish;
            return `You have successfully invited ${name}!`; 
        }else{
            return `This guest has already been invited`;
        }
    };

    showAttendance() {
        
        let result = [];
        let products = []

        for(let person in this.guests){
            let name = person;
            let dish = this.guests[person];
            
            for(let curDish of this.dishes){
                if(curDish.recipeName == dish){
                    products = curDish.productsList;
                }
            }

            result.push(`${name} will eat ${dish}, which consists of ${products.join(', ')}`);
        }

        return result.join('\n');
    };
}

let dinner = new ChristmasDinner(300);
dinner.shopping(['Salt', 1]);
dinner.shopping(['Beans', 3]);
dinner.shopping(['Cabbage', 4]);
dinner.shopping(['Rice', 2]);
dinner.shopping(['Savory', 1]);
dinner.shopping(['Peppers', 1]);
dinner.shopping(['Fruits', 40]);
dinner.shopping(['Honey', 10]);

dinner.recipes({ 
    recipeName: 'Oshav', 
    productsList: ['Fruits', 'Honey'] 
}); 

dinner.recipes({ 
    recipeName: 'Folded cabbage leaves filled with rice', 
    productsList: ['Cabbage', 'Rice', 'Salt', 'Savory'] 
});

dinner.recipes({ 
    recipeName: 'Peppers filled with beans', 
    productsList: ['Beans', 'Peppers', 'Salt'] 
}); 


dinner.inviteGuests('Ivan', 'Oshav');
dinner.inviteGuests('Petar', 'Folded cabbage leaves filled with rice'); 
dinner.inviteGuests('Georgi', 'Peppers filled with beans');

console.log(dinner.showAttendance()); 
