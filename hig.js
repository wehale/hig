var port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs');
var os = require('os').platform();
const Say = require('say').Say;
const say = new Say(os);
const ANNOUNCER = "Announcer";
const util = require('util');


var myArgs = process.argv.slice(2);

switch (myArgs[0]) {
	case "server":
		runServer();
		break;
	case "speak":
	    runSpeech();
	    break;
	default:
		runCmdLine();
		break;
}

var log = function(entry) {
    fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
};

function Phrase(n, p) {
	this.name = n;
	this.phrase = p;
}

function runServer() {
	var server = http.createServer(function (req, res) {
	    if (req.method === 'POST') {
	        var body = '';

	        req.on('data', function(chunk) {
	            body += chunk;
	        });

	        req.on('end', function() {
	            if (req.url === '/') {
	                log('Received message: ' + body);
	            } else if (req.url = '/scheduled') {
	                log('Received task ' + req.headers['x-aws-sqsd-taskname'] + ' scheduled at ' + req.headers['x-aws-sqsd-scheduled-at']);
	            }

	            res.writeHead(200, 'OK', {'Content-Type': 'text/plain'});
	            res.end();
	        });
	    } else {
	        res.writeHead(200);
	        var out = [];
	        genInterview(out);
        	var html = "";
        	out.forEach(function (p) {
				html = html.concat(p.name + ": " + p.phrase + "\n");
			});
	        res.write(html);
	        res.end();
	    }
	});

	// Listen on port 3000, IP defaults to 127.0.0.1
	server.listen(port);

	// Put a friendly message on the terminal
	console.log('Server running at http://127.0.0.1:' + port + '/');	
}

function runCmdLine() {
	var out = [];
	genInterview(out);
	out.forEach(function (p) {
		console.log(p.name + ": " + p.phrase);
	});
}

function runSpeech() {
	const running = true;
	var out = [];
	genInterview(out);
	while (speak(out)) {}
}

function speak(phrases) {
	if (phrases.length == 0) {
		return false;  	
	}
	var p = phrases.shift();
	if(os == 'darwin'){  //mac male voice to talk as hockey player
		var v = 'Alex';
			if (p.name == ANNOUNCER ) { //mac female voice to talk as announcer 
				v = 'Samantha';
		} 
	}
	else if (os=='win32'){ //windows male voice to talk as hockey player
		 var v = 'Microsoft David Desktop';
			 if (p.name == ANNOUNCER ) { //windows female voice to talk as announcer 
				 v ='Microsoft Zira Desktop';
		}
	}
	
	var ph = p.phrase.toString().startsWith('(') ? "..." : p.phrase;
	// Here we use util.promisify to convert the function to a promise
	const speakAsync = util.promisify(say.speak.bind(say));
	

	speakAsync(ph,v,1)
		.then(() => speak(phrases))
		.catch(err => console.error(`[Error]: ${err}`));
	
	
}
	


function genInterview(h) {
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
	var s = "Thanks John, I'm here with " + p.name + " of the " + t.name;
	h.push(new Phrase(ANNOUNCER, s));
	s = "So " + p.nickname + " " + q;
	h.push(new Phrase(ANNOUNCER, s))
	
	//Start
	addLine(h, p, start);

	//Interview of random length
	var i = 0;
	var count = Math.random() * 10; //get random num from 1 - 10
	while (i < count) { 
		//Possible Filler
		if ((i > 0) && (Math.random() < 0.5)) {
			addLine(h, p, filler);
		}
		//Possible Action
		if (Math.random() < 0.5) {
			addLine(h, p, action);
		}
		//Statement
		addLine(h, p, statement);
		i++;
	}

	//Announcer closing
	s = "Ok, that's great to hear, thanks " + p.nickname;
	h.push(new Phrase(ANNOUNCER, s));

	//Player closing
	addLine(h, p, closing);
}

function addLine(h, p, a) {
	var rand = Math.floor(Math.random() * Math.floor(a.length));
    var s = a.splice(rand, 1); //remove the sentence into var s
	h.push(new Phrase(p.nickname, s))
}