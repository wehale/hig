var fs = require('fs');
var hig = fs.readFileSync('hig.txt').toString().split('\n');
var i = 0;
while (i < 5) { 
  var rand = Math.floor(Math.random() * Math.floor(hig.length));
  var s = hig.splice(rand, 1); //remove the sentence into var s
  console.log(s + ". "); //print out the sentence
  i++;
}