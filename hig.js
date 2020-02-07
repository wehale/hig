// Generates a series of sentences based on 
var fs = require('fs');
let rawJson = fs.readFileSync('hig.json');
let hig = JSON.parse(rawJson);
let player = hig.players;
let statement = hig.statements;
let filler = hig.filler;
let action = hig.actions;
let closing = hig.closing;
let start = hig.starts;

var i = 0;
var count = Math.random() * 10; //get random num from 1 - 10

//Player
var rand = Math.floor(Math.random() * Math.floor(player.length));
var p = player[rand]

//Intro
console.log("(Announcer): Thanks John, I'm here with " + p.name + " getting the lowdown on that first period.");
console.log("(Announcer): So " + p.nickname + " how are you feeling coming into the second?");

//Start
var rand = Math.floor(Math.random() * Math.floor(start.length));
var s = start.splice(rand, 1); //remove the sentence into var s
console.log(p.nickname + ": " + s + ". "); //print out the sentence
while (i < count) { 


	//Possible Filler
	if ((i > 0) && (Math.random() < 0.5)) {
		//Filler
		rand = Math.floor(Math.random() * Math.floor(filler.length));
		s = filler.splice(rand, 1); //remove the sentence into var s
		console.log(p.nickname + ": " + s + ","); //print out the sentence
	}

	//Possible Action
	if (Math.random() < 0.5) {
		//Action
		rand = Math.floor(Math.random() * Math.floor(action.length));
		s = action.splice(rand, 1); //remove the sentence into var s
		console.log(p.nickname + ": " + s + ". "); //print out the sentence
	}

	//Statement
	rand = Math.floor(Math.random() * Math.floor(statement.length));
	s = statement.splice(rand, 1); //remove the sentence into var s
	console.log(p.nickname + ": " + s + ". "); //print out the sentence
	
	i++;
}

//Intro
console.log("(Announcer): Ok, that's great to hear, thanks " + p.nickname + ".");

//Closing
rand = Math.floor(Math.random() * Math.floor(closing.length));
s = closing.splice(rand, 1); //remove the sentence into var s
console.log(p.nickname + ": " + s + ". "); //print out the sentence
