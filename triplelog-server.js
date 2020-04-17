
const https = require('https');
var fs = require("fs");

var qs = require('querystring');
const { exec } = require('child_process');
const bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var crypto = require("crypto");
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/martianmath.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/martianmath.com/fullchain.pem')
};
const { PerformanceObserver, performance } = require('perf_hooks');

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/triplelog', {useNewUrlParser: true});
const User = require('./models/user');
const UserData = require('./models/userdata');

var express = require('express');


var fromLogin = require('./login-server.js');
var app = fromLogin.loginApp;
var tempKeys = fromLogin.tempKeys;





app.use('/',express.static('static'));

app.get('/triplelog', 
	
	function(req, res) {
		res.write(nunjucks.render('templates/triplelog.html',{
		
		}));
		res.end();
	}
);
app.get('/sudokufarm', 
	
	function(req, res) {
		res.write(nunjucks.render('templates/sudokufarm.html',{
		
		}));
		res.end();
	}
);
app.get('/puzzlepage', 
	
	function(req, res) {
		res.write(nunjucks.render('templates/basepuzzle.html',{
		
		}));
		res.end();
	}
);

app.get('/puzzles/:puzzleid', 
	
	function(req, res) {
		var tkey = crypto.randomBytes(100).toString('hex').substr(2, 18);
		var collab = true;
		if (req.query && req.query.q && req.query.q == 'solo'){
			collab = false;
		}
		var puzzleid = req.params.puzzleid;
		var matches = false;
		tempKeys[tkey]={username:'',puzzleid:puzzleid};
		if (!collab){
			matches = true;
		}
		res.write(nunjucks.render('puzzles/'+puzzleid+'.html',{
			tkey: tkey,
			matches: matches,
			collab: collab,
		}));
		res.end();
	}
);

app.post('/create', 
	
	function(req, res) {
		
		var puzzleid = crypto.randomBytes(100).toString('hex').substr(2, 12);
		var vm = new VM();
		var gametype = 'solo';
		var players = 'one';
		var score = false;
		
		{
			var initialScript = `var players={};
			function newPlayer(username){
				var color = 'rgb('+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+','+Math.floor(Math.random()*255)+')';
				players[username]={score:0,color:color};
			}
			function newMerge(username,matches){
				players[username].score++;
				return {stroke: players[username].color};
			}`;
			var initialCSS = `.pieceBorder{
				stroke-dasharray: .02;
				stroke:red;
				stroke-width:.02;
				stroke-opacity:.5;
				fill: transparent;
			}
			.interiorBorder{
				stroke-dasharray: .01;
				stroke:blue;
				stroke-width:.01;
				stroke-opacity:.5;
				fill: transparent;
			}
			.interiorBorder.toggled{
				stroke-dasharray: .03;
				stroke:blue;
				stroke-width:.03;
				stroke-opacity:1;
				fill: transparent;
			}
			.piece {
				fill: black;
				fill-opacity: .1;
				stroke: none;
			}`;
		}
		var fullname = req.body.fileSrc.replace('../img/in/','');
		var fname = fullname.substring(0,fullname.indexOf('.'));
		var nrows = parseInt(req.body.nrows);
		var ncols = parseInt(req.body.ncols);
		initialScript = req.body.initialScript;
		initialCSS = req.body.initialCSS;
		
		var encryptedpuzzle = false;
		
		var collab = true;
		var dimensions = sizeOf('static/img/in/' + fullname);
		var actheight = dimensions.height;
		var actwidth = dimensions.width;
		if (encryptedpuzzle){
			actheight = dimensions.height-40;
			actwidth = (dimensions.width-40)/2;
		}
		var pointyFactor = parseFloat(req.body.pointyFactor)/10; // from .2 (very round) to 10 (pointy)?
		var heightFactor = parseFloat(req.body.heightFactor)/10; // from 1 (tall) to 10 (short)?
		var widthFactor = parseFloat(req.body.widthFactor)/10; // from 1 (long) to 10 (short)?
		var retval = makelines(vm,encryptedpuzzle,actwidth,actheight,nrows,ncols,pointyFactor,heightFactor,widthFactor);
		
		var pieces = [];
		var npieces = retval[5];
		
		var matches = JSON.stringify(retval[4]);
		if (collab){
			matches = false;
			//Add connection to db
		}
		
		for (var i=0;i<npieces;i++){
			var piece = {id:'video'+(i+1),rotation:retval[3][i],location:retval[2][i],centers:retval[1][i]};
			pieces.push(piece);
		}
		var htmlstr = nunjucks.render('templates/basepuzzle.html',{
			gametype: gametype,
			players: players,
			score: score,
			npieces: npieces,
			pagename: fname,
			image: {'name':'../img/in/'+fullname,'width':dimensions.width,'height':dimensions.height},
			clines:JSON.stringify(retval[6]),
			ccenters:JSON.stringify(retval[7]),
			lines:retval[0],
			matchesHolder:'{% if matches %}'+JSON.stringify(retval[4])+'{% else %}false{% endif %}',
			nrows:nrows,
			ncols:ncols,
			//actheight:288,
			//actwidth:512,
			actheight:actheight,
			actwidth:actwidth,
			pieces: JSON.stringify(pieces),
			collabHolder: `{% if collab %}

			<script>var keepscore = true; var collab = true; var tkey = '{{tkey}}';</script>
			<script src="../js/collabpuzzle.js"></script>
			<script src="../js/solopuzzle.js"></script>

			{% else %}

			<script>var keepscore = false; var collab = false; var tkey = '{{tkey}}';</script>
			<script src="../js/solopuzzle.js"></script>

			{% endif %}`,
			initialCSS: initialCSS,
			
		});
		
		
		var puzzle = new Puzzle({id:puzzleid,matches:retval[4],initialScript:initialScript});
		puzzle.save(function(err,result) {
			if (err){
				console.log(err);
				res.redirect('../create');
				return;
			}
			fs.writeFile("puzzles/"+puzzleid+'.html', htmlstr, function (err2) {
				if (err){
					console.log(err);
					res.redirect('../create');
				}
				else {
				
					res.redirect('../puzzles/'+puzzleid);
				}
			
			});
		})
		
		
	}
);

app.get('/create', 
	
	function(req, res) {
		
		res.write(nunjucks.render('createpuzzle.html',{
			
		}));
		res.end();
	}
);

app.get('/puzzle', 
	
	function(req, res) {
		var vm = new VM();
		var npieces;
		var gametype = 'solo';
		var players = 'one';
		var score = false;
		var fname = 'testname';
		var fullname = 'testname.gif';
		var encryptedpuzzle = false;
		
		var nrows = 4;
		var ncols = 8;
		var dimensions = sizeOf('static/gifs/' + fullname);
		var actheight = dimensions.height;
		var actwidth = dimensions.width;
		if (encryptedpuzzle){
			actheight = dimensions.height-40;
			actwidth = (dimensions.width-40)/2;
		}
		var retval = makelines(vm,encryptedpuzzle,actwidth,actheight,nrows,ncols);
		
		var pieces = [];
		npieces = retval[6];
		for (var i=0;i<npieces;i++){
			var piece = {id:'video'+(i+1),rotation:retval[4][i],location:retval[3][i],centers:retval[2][i]};
			pieces.push(piece);
		}
		res.write(nunjucks.render('encryptedpuzzle.html',{
			gametype: gametype,
			players: players,
			score: score,
			npieces: retval[6],
			pagename: fname,
			image: {'name':'../gifs/'+fullname,'width':dimensions.width,'height':dimensions.height},
			vclines:JSON.stringify(retval[7]),
			hclines:JSON.stringify(retval[8]),
			ccenters:JSON.stringify(retval[9]),
			vlines:retval[0],
			hlines:retval[1],
			matches:JSON.stringify(retval[5]),
			nrows:nrows,
			ncols:ncols,
			//actheight:288,
			//actwidth:512,
			actheight:actheight,
			actwidth:actwidth,
			pieces: JSON.stringify(pieces),
		}));
		res.end();
	}
);



const server1 = https.createServer(options, app);

server1.listen(12312);

const server = https.createServer(options, (req, res) => {
  res.writeHead(200);
  res.end('hello world\n');
}).listen(8080);

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });
var rooms = {};
wss.on('connection', function connection(ws) {
	var imgid = parseInt(crypto.randomBytes(50).toString('hex'),16).toString(36).substr(2, 12);
  	var outSrc = 'out/'+imgid+'.png';
  	var inSrc = 'static/img/in/'+imgid+'.png';
  	var imgTypes = ['.png','.jpg','.jpeg','.gif','.tiff','.tif'];//.svg, .psd, .eps, .raw, .pdf?
  	var imgIndex = 0;
  	var matches= [];
  	var username = parseInt(crypto.randomBytes(50).toString('hex'),16).toString(36).substr(2, 12);
  	var puzzleid = '';
  	var myroom = false;
  	ws.on('message', function incoming(message) {
		if (typeof message !== 'string'){
			console.log("af",performance.now());
		
			return;
		}
	
		var dm = JSON.parse(message);
		if (dm.type && dm.type == 'key'){
			if (dm.message && tempKeys[dm.message]){
				if (tempKeys[dm.message].username && tempKeys[dm.message].username != ''){
					username = tempKeys[dm.message].username;
				}
				if (tempKeys[dm.message].puzzleid){
					puzzleid = tempKeys[dm.message].puzzleid;
					matches = false;

					
					
					
				}
			}
			return;
		}
  	});
});



