// Generates a series of sentences based on 
var fs = require('fs');
let rawJson = fs.readFileSync('hig.json');
let hig = JSON.parse(rawJson);

let team = hig.teams;
let statement = hig.statements;
let filler = hig.filler;
let action = hig.actions;
let closing = hig.closing;
let start = hig.starts;
let question = hig.questions;
var rand;

//Team
rand = Math.floor(Math.random() * Math.floor(team.length));
var t = team[rand]

//Player
rand = Math.floor(Math.random() * Math.floor(t.players.length));
var p = t.players[rand]

//Question
rand = Math.floor(Math.random() * Math.floor(question.length));
var q = question[rand];
console.log("(Announcer): Thanks John, I'm here with " + p.name + " of the " + t.name);
console.log("(Announcer): So " + p.nickname + " " + q +"?");

//Start
printLine(p, start, ",");

//Interview of random length
var i = 0;
var count = Math.random() * 10; //get random num from 1 - 10
while (i < count) { 
	//Possible Filler
	if ((i > 0) && (Math.random() < 0.5)) {
		printLine(p, filler, ",");
	}
	//Possible Action
	if (Math.random() < 0.5) {
		printLine(p, action, " ");
	}
	//Statement
	printLine(p, statement, ".");
	i++;
}

//Announcer closing
console.log("(Announcer): Ok, that's great to hear, thanks " + p.nickname + ".");

//Player closing
printLine(p, closing, ".");


function printLine(p, a, punct) {
	var rand = Math.floor(Math.random() * Math.floor(a.length));
    var s = a.splice(rand, 1); //remove the sentence into var s
	console.log(p.nickname + ": " + s + punct); //print out the sentence
}
