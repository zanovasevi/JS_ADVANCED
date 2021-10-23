class ArtGallery {
    constructor(creator){
        this.creator = creator;
        this.possibleArticles = { "picture":200,"photo":50,"item":250 };
        this.listOfArticles = [];
        this.guests = [];
        this._purchaseArticle = 0;
        this._points = 50;
    }

    addArticle( articleModel, articleName, quantity ) {
        articleModel = articleModel.toLowerCase();
        let articles = Object.keys(this.possibleArticles);

        if(!articles.includes(articleModel)){
            throw new Error('This article model is not included in this gallery!');
        }

        let obj = {
            articleModel,
            articleName,
            quantity
        };

        let art = this.listOfArticles.find(s => s.articleModel == articleModel &&
            s.articleName == articleName);

        if(art != undefined){
                art.quantity += Number(quantity);
        }else{
            this.listOfArticles.push(obj);
        }
        

        return `Successfully added article ${articleName} with a new quantity- ${quantity}.`;
    }

    inviteGuest ( guestName, personality) {
        if(this.guests.some(s => s.guestName == guestName)){
            throw new Error(`${guestName} has already been invited.`);
        }

        if(personality == 'Vip'){
            this._points = 500;
        }else if(personality == 'Middle'){
            this._points = 250;
        }

        let guest = {
            guestName, 
            points: this._points, 
            purchaseArticle: this._purchaseArticle
        }

        this.guests.push(guest);  
        
        return `You have successfully invited ${guestName}!`;
    }

    buyArticle ( articleModel, articleName, guestName) {
        let currentArticle = this.listOfArticles.find(f => f.articleModel == articleModel &&
            f.articleName == articleName);

        if(currentArticle == undefined){
                throw new Error ('This article is not found.');
        }

        
        if(currentArticle.quantity == 0){
            return `The ${articleName} is not available.`;
        }

        let guest = this.guests.find(f => f.guestName == guestName);

        if(guest == undefined){
            return `This guest is not invited.`;
        }

        let articles = Object.keys(this.possibleArticles);

        if(guest.points < this.possibleArticles[currentArticle.articleModel]){
            return 'You need to more points to purchase the article.';
        }else{
            guest.points -= this.possibleArticles[currentArticle.articleModel];
            currentArticle.quantity -= 1;
            guest.purchaseArticle += 1;
        }

        return `${guestName} successfully purchased the article worth ${this.possibleArticles[currentArticle.articleModel]} points.`;
    }

    showGalleryInfo (criteria) {

        let result = [];

        if(criteria == 'article'){
            result.push('Articles information:');

            for(let article of this.listOfArticles){
                result.push(`${article.articleModel} - ${article.articleName} - ${article.quantity}`);
            }
        }
        if(criteria == 'guest'){
            result.push('Guests information:');

            for(let guest of this.guests){
                result.push(`${guest.guestName} - ${guest.purchaseArticle}`);
            }
        }

        return result.join('\n');
    }
}

const artGallery = new ArtGallery('Curtis Mayfield');  

artGallery.addArticle('picture', 'Mona Liza', 3); 

artGallery.addArticle('Item', 'Ancient vase', 2); 

artGallery.addArticle('picture', 'Mona Liza', 1); 

artGallery.inviteGuest('John', 'Vip'); 

artGallery.inviteGuest('Peter', 'Middle'); 
artGallery.buyArticle('picture', 'Mona Liza', 'John'); 

artGallery.buyArticle('item', 'Ancient vase', 'Peter'); 

console.log(artGallery.showGalleryInfo('article')); 

console.log(artGallery.showGalleryInfo('guest')); 


// Articles information: 

 //picture - Mona Liza - 3 

//  item - Ancient vase - 1 

//  Guests information: 

//  John - 1 

//  Peter - 1 
