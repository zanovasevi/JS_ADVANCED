class SummerCamp {
    constructor(organizer, location) {
        this.organizer = organizer;
        this.location = location;
        this.priceForTheCamp = { "child": 150, "student": 300, "collegian": 500 };
        this.listOfParticipants = [];
    }

    registerParticipant(name, condition, money) {
        if (!this.priceForTheCamp.hasOwnProperty(condition)) {
            throw new Error('Unsuccessful registration at the camp.');
        }

        if (this.listOfParticipants.some(s => s.name == name)) {
            return `The ${name} is already registered at the camp.`;
        } else {
            if (money < this.priceForTheCamp[condition]) {
                return `The money is not enough to pay the stay at the camp.`;
            } else {
                this.listOfParticipants.push({
                    name,
                    condition,
                    power: 100,
                    wins: 0
                });

                return `The ${name} was successfully registered.`;
            }
        }
    };

    unregisterParticipant(name) {
        if (!this.listOfParticipants.some(s => s.name == name)) {
            throw new Error(`The ${name} is not registered in the camp.`);
        } else {
            let participant = this.listOfParticipants.find(s => s.name == name);
            let index = this.listOfParticipants.indexOf(participant);

            this.listOfParticipants.splice(index, 1);
            return `The ${name} removed successfully.`;
        }
    };

    timeToPlay(typeOfGame, participant1, participant2) {
        if (typeOfGame == 'WaterBalloonFights') {

            let person1 = this.listOfParticipants.find(f => f.name == participant1);
            let person2 = this.listOfParticipants.find(f => f.name == participant2);

            if (person1 == undefined || person2 == undefined){
                throw new Error('Invalid entered names.');
            }

            if(person1.condition != person2.condition){
                throw new Error(`Choose players with equal condition.`);
            }

            if(person1.power > person2.power){
                person1.wins += 1;
                return `The ${person1.name} is winner in the game ${typeOfGame}.`;
            }else if(person2.power > person1.power){
                person2.wins += 1;
                return `The ${person2.name} is winner in the game ${typeOfGame}.`;
            }else{
                return `There is no winner.`;
            }

        }else if(typeOfGame == 'Battleship') {

            if (!this.listOfParticipants.some(s => s.name == participant1)) {
                throw new Error('Invalid entered name/s.');
            }

            let person = this.listOfParticipants.find(f => f.name == participant1);
            person.power += 20;
            return `The ${participant1} successfully completed the game ${typeOfGame}.`;
        }
    };

    toString() {
        let numberOfParticipants = this.listOfParticipants.length;
        let result = [`${this.organizer} will take ${numberOfParticipants} participants on camping to ${this.location}`,
    ];

        for(let person of this.listOfParticipants){
            result.push(`${person.name} - ${person.condition} - ${person.power} - ${person.wins}`);
        }

        return result.join('\n');
    }

}

const summerCamp = new SummerCamp("Jane Austen", "Pancharevo Sofia 1137, Bulgaria"); 

console.log(summerCamp.registerParticipant("Petar Petarson", "student", 300)); 
console.log(summerCamp.timeToPlay("Battleship", "Petar Petarson")); 

console.log(summerCamp.registerParticipant("Sara Dickinson", "child", 200)); 
// console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Sara Dickinson")); 

console.log(summerCamp.registerParticipant("Dimitur Kostov", "student", 300)); 
console.log(summerCamp.timeToPlay("WaterBalloonFights", "Petar Petarson", "Dimitur Kostov")); 

console.log(summerCamp.toString()); 

//OUTPUT

//The Petar Petarson was successfully registered. 
// The Petar Petarson successfully completed the game Battleship. 
// The Sara Dickinson was successfully registered. 
// Uncaught Error: Choose players with equal condition. 
// The Dimitur Kostov was successfully registered. 
// The Petar Petarson is winner in the game WaterBalloonFights. 
// Jane Austen will take 3 participants on camping to Pancharevo Sofia 1137, Bulgaria 
// Petar Petarson - student - 120 - 1 
// Sara Dickinson - child - 100 - 0 
// Dimitur Kostov - student - 100 - 0 
