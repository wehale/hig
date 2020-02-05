// Generates a series of sentences based on 
var fs = require('fs');
var hig = fs.readFileSync('hig.txt').toString().trim().split('\n');
var i = 0;
var count = Math.random() * 10; //get random num from 1 - 10
while (i < count) { 
  var rand = Math.floor(Math.random() * Math.floor(hig.length));
  var s = hig.splice(rand, 1); //remove the sentence into var s
  console.log(s + ". "); //print out the sentence
  i++;
}