class Restaurant {
    constructor(budget){
        this.budget = Number(budget);
        this.menu = {};
        this.stockProducts = {};
        this.history = [];
    }

    loadProducts(products) {
        for(let item of products){
            let splitted = item.split(' ');
            let[productName, productQuantity, productTotalPrice] = splitted;

            let product = {
                productName,
                productQuantity
            }
            
            if(productTotalPrice <= this.budget){
                if(this.stockProducts.productName !== undefined){
                    this.stockProducts.productQuantity += productQuantity;
                }else{
                    this.stockProducts = product;
                }
                this.budget -= productTotalPrice;

                this.history.push(`Successfully loaded ${productQuantity} ${productName}`);
            }else{
                this.history.push(`There was not enough money to load ${productQuantity} ${productName}`);
            }
        }

        return this.history.join('\n');
    };

    addToMenu(meal, neededProducts, price) {
        for(let prod of neededProducts){
            let splitted = prod.split(' ');
            let [productName, productQuantity] = splitted;

            productQuantity = Number(productQuantity);

            let product = {
                productName,
                productQuantity
            };

            let el = {
                product,
                price
            };

            if(!this.menu.hasOwnProperty(meal)){
                this.menu[meal] = el;

                let mealsNum = Object.keys(this.menu).length;
                if(mealsNum == 1){
                    
                    return `Great idea! Now with the ${meal} we have 1 meal in the menu, other ideas?`;
                }else{
                    return `Great idea! Now with the ${meal} we have ${mealsNum} meals in the menu, other ideas?`;
                }
            }

            return `The ${meal} is already in the our menu, try something different.`;
        }
    };

    showTheMenu() {
        let result = [];
        let mealsNum = Object.keys(this.menu).length;
        
        if(mealsNum == 0){
            return `Our menu is not ready yet, please come later...`;
        }else{
            for(let item in this.menu){
                result.push(`${item} - $ ${this.menu[item].price}`);
            }
            return result.join('\n');
        }
    };

    makeTheOrder(meal) {
        if (!this.menu[meal]) {
            return `There is not ${meal} yet in our menu, do you want to order something else?`
        }
        let prodsForMeal = this.menu[meal].product;
        let hasProds = true;
        prodsForMeal.forEach(proQua => {
            let [prod, qua] = proQua.split(' ');
            if (!this.stockProducts[prod] || Number(qua) > this.stockProducts[prod]) {
                hasProds = false; 
            }
        });
        if (hasProds) {
            prodsForMeal.forEach(proQua => {
                let [prod, qua] = proQua.split(' ');
                this.stockProducts[prod] = this.stockProducts[prod] - Number(qua);
            });
            this.budgetMoney = this.budgetMoney + this.menu[meal].price;
            return `Your order (${meal}) will be completed in the next 30 minutes and will cost you ${this.menu[meal].price}.`

        }
        return `For the time being, we cannot complete your order (${meal}), we are very sorry...` 
    };
}

let kitchen = new Restaurant(1000); 

kitchen.loadProducts(['Yogurt 30 3', 'Honey 50 4', 'Strawberries 20 10', 'Banana 5 1']); 

kitchen.addToMenu('frozenYogurt', ['Yogurt 1', 'Honey 1', 'Banana 1', 'Strawberries 10'], 9.99); 

console.log(kitchen.makeTheOrder('frozenYogurt')); 

//OUTPUT

// Your order (frozenYogurt) will be completed in the next 30 minutes and will cost you 9.99. 
