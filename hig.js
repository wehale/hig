var fs = require('fs');
var hig = fs.readFileSync('hig.txt').toString().split('\n');
var i = 0;
while (i < 5) { 
  var rand = Math.floor(Math.random() * Math.floor(hig.length));
  console.log(hig[rand] + ". ");
  i++;
}