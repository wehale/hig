var port = process.env.PORT || 3000,
    http = require('http'),
    fs = require('fs');

var myArgs = process.argv.slice(2);

switch (myArgs[0]) {
	case "server":
		runServer();
		break;
	default:
		runCmdLine();
		break;
}

var log = function(entry) {
    fs.appendFileSync('/tmp/sample-app.log', new Date().toISOString() + ' - ' + entry + '\n');
};

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
	        var html = "";
	        html = genInterview(html);
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
	var out = "";
	out = genInterview(out);
	console.log(out);
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
	h = h.concat("(Announcer): Thanks John, I'm here with " + p.name + " of the " + t.name + "\n");
    h = h.concat("(Announcer): So " + p.nickname + " " + q +"?" + "\n");

	//Start
	h = addLine(h, p, start, ",");

	//Interview of random length
	var i = 0;
	var count = Math.random() * 10; //get random num from 1 - 10
	while (i < count) { 
		//Possible Filler
		if ((i > 0) && (Math.random() < 0.5)) {
			h = addLine(h, p, filler, ",");
		}
		//Possible Action
		if (Math.random() < 0.5) {
			h = addLine(h, p, action, " ");
		}
		//Statement
		h = addLine(h, p, statement, ".");
		i++;
	}

	//Announcer closing
	h = h.concat("(Announcer): Ok, that's great to hear, thanks " + p.nickname + "." + "\n");

	//Player closing
	h = addLine(h, p, closing, ".");

	return h;
}

function addLine(h, p, a, punct) {
	var rand = Math.floor(Math.random() * Math.floor(a.length));
    var s = a.splice(rand, 1); //remove the sentence into var s
	h = h.concat(p.nickname + ": " + s + punct + "\n"); //print out the sentence
	return h;
}
