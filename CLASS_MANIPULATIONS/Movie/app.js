class Movie { 
    constructor ( movieName, ticketPrice ){
        this.movieName = movieName;
        this.ticketPrice = Number(ticketPrice);
        this.screenings = [];
        this.revenue = 0;
        this.ticketsSold = 0;
    }

    newScreening(date, hall, description) {
        if(this.screenings.some(s => s.date == date && s.hall == hall)){
            throw new Error(`Sorry, ${hall} hall is not available on ${date}`);
        }

        this.screenings.push({
            date,
            hall,
            description
        });
    
        return `New screening of ${this.movieName} is added.`;
    }

    endScreening(date, hall, soldTickets)  {
        if(!this.screenings.some(s => s.date == date && s.hall == hall)){
            throw new Error(`Sorry, there is no such screening for ${this.movieName} movie.`);
        }

        let currentProfit = soldTickets * this.ticketPrice;
        this.revenue += currentProfit;
        this.ticketsSold += soldTickets;
        let currentScreening = this.screenings.find(s => s.date == date && s.hall == hall);
        let screenIndex = this.screenings.indexOf(currentScreening);
        this.screenings.splice(screenIndex, 1);

        return `${this.movieName} movie screening on ${date} in ${hall} hall has ended. Screening profit: ${currentProfit}`;
    }

    toString() {
        const result = [`${this.movieName} full information:`,
        `Total profit: ${this.revenue.toFixed(0)}$`,
        `Sold Tickets: ${this.ticketsSold}`];

        if(this.screenings.length != 0){
            result.push('Remaining film screenings:');

            let sorted = this.screenings.sort((a, b) => a.hall.localeCompare(b.hall));

            for(let movie of sorted){
                result.push(`${movie.hall} - ${movie.date} - ${movie.description}`);
            }
        }else{
            result.push('No more screenings!');
        }

        return result.join('\n');
    }
} 

let m = new Movie('Wonder Woman 1984', '10.00'); 

console.log(m.newScreening('October 2, 2020', 'IMAX 3D', `3D`)); 

console.log(m.newScreening('October 3, 2020', 'Main', `regular`)); 

console.log(m.newScreening('October 4, 2020', 'IMAX 3D', `3D`)); 

console.log(m.endScreening('October 2, 2020', 'IMAX 3D', 150)); 

console.log(m.endScreening('October 3, 2020', 'Main', 78)); 

console.log(m.toString()); 

 

m.newScreening('October 4, 2020', '235', `regular`); 

m.newScreening('October 5, 2020', 'Main', `regular`); 

m.newScreening('October 3, 2020', '235', `regular`); 

m.newScreening('October 4, 2020', 'Main', `regular`); 

console.log(m.toString());
