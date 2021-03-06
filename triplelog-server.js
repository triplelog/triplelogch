
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

const OpenSimplexNoise = require('open-simplex-noise');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/triplelog', {useNewUrlParser: true});
const User = require('./models/user');
const UserData = require('./models/userdata');

var express = require('express');


var fromLogin = require('./login-server.js');
var app = fromLogin.loginApp;
var tempKeys = fromLogin.tempKeys;





app.use('/',express.static('static'));

app.get('/', 
	
	function(req, res) {
		res.write(nunjucks.render('templates/triplelog.html',{
		
		}));
		res.end();
	}
);
app.get('/index.html', 
	
	function(req, res) {
		res.write(nunjucks.render('templates/triplelog.html',{
		
		}));
		res.end();
	}
);

app.get('/graphics.html', 
	
	function(req, res) {
		
		if (req.query.c){
			var htmlstr = '<html><body><svg height="120" width="1200">';

			var circles = [];
			for (var i=0;i<8;i++){
				circles.push({x:75+150*i,y:60,radius:55});
			}
			for (var i=0;i<7;i++){
				circles.push({x:150*(i+1),y:60,radius:44});
			}
			for (var i=0;i<7;i++){
				circles.push({x:150*(i+1),y:60,radius:33});
			}


		
			var nf = req.query.c;
			for (var i=0;i<circles.length;i++){
				nf *= 3.14;
				var noise = OpenSimplexNoise.makeNoise3D(nf);
				nf *= 3.14;
				var noise2D = OpenSimplexNoise.makeNoise2D(nf);
				svg = drawFlower(circles[i],2.0,0.33,0.075,0.025,25,noise,noise2D);
				htmlstr += svg;
			}
		
			htmlstr += '</svg></body></html>';
			res.write(htmlstr);
			res.end();
		}
		else if (req.query.q){
			var htmlstr = '<html><body><svg height="120" width="1200">';

		
			var nf = req.query.q;
			//for (var i=0;i<circles.length;i++){
			nf *= 3.14;
			var noise = OpenSimplexNoise.makeNoise3D(nf);
			nf *= 3.14;
			var noise2D = OpenSimplexNoise.makeNoise2D(nf);
			svg = drawBlur({x:600,y:60,radius:100},2.0,0.33,0.075,0.01,120,noise,noise2D);
			htmlstr += svg;
			//}
		
			htmlstr += '</svg></body></html>';
			res.write(htmlstr);
			res.end();
		}
		
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




function drawFlower(circle,frequency, magnitude,independence, spacing,count,noise,noise2D) {
    // adjust the radius so will have roughly the same size irregardless of magnitude
    let current = {...circle};
    current.radius /= (magnitude + 1);
    var paths = [];
    for (let i = 0; i < count; ++i) {
        // draw a circle, the final parameter controlling how similar it is to
        // other circles in this image
        paths.push(drawDeformedCircle(current,frequency, magnitude,i * independence,noise,noise2D));

        // shrink the radius of the next circle
        current.radius *= Math.pow((1 - spacing),1+2*i/count);
    }
    svg = '';
    for (var i=0;i<paths.length;i++){
    	h = noise2D(.4+i/paths.length*.2,.6-i/paths.length*.2)*360;
    	s = '80%';
    	l = (45-i*40/paths.length);
    	if (i == paths.length - 1){
    		svg += '<path fill="hsl('+h+','+s+','+(l*4)+'%)" stroke="black" d="'+paths[i]+'" />';
    	}
    	else if (i%12==0 || i%12==4){
    		svg += '<path fill="hsl('+h+','+s+','+l+'%)" stroke="none" d="'+paths[i]+'" />';
    	}
    	else if (i%12==8){
    		svg += '<path fill="hsl('+h+','+s+','+l+'%)" stroke="none" d="'+paths[i]+'" />';
    	}
    	else {
    		svg += '<path fill="hsl('+h+','+s+','+l+'%)" stroke="none" d="'+paths[i]+'" />';
    	}
    	
    }
    
	return svg;
}


function drawDeformedCircle( circle,frequency, magnitude,seed,noise,noise2D) {
        var path = 'M';

        // Sample points evenly around the circle
        const samples = Math.floor(4 * circle.radius + 20);
        for (let j = 0; j < samples + 1; ++j) {
            const angle = (2 * Math.PI * j) / samples;

            // Figure out the x/y coordinates for the given angle
            const x = Math.cos(angle);
            const y = Math.sin(angle);

            // Randomly deform the radius of the circle at this point
            const deformation = (noise(x * frequency,
                                               y * frequency,
                                               seed) + 1);
            const radius = circle.radius * (1 + magnitude * deformation);

            // Extend the circle to this deformed radius
            path += (circle.x + radius * x) + ','+(circle.y + radius * y)+' ';
        }
        path += 'Z';
        return path;
}

function drawBlur(circle,frequency, magnitude,independence, spacing,count,noise,noise2D) {
    // adjust the radius so will have roughly the same size irregardless of magnitude
    let current = {...circle};
    current.radius /= (magnitude + 1);
    var paths = [];
    for (let i = 0; i < count; ++i) {
        // draw a circle, the final parameter controlling how similar it is to
        // other circles in this image
        paths.push(drawDeformedOval(current,frequency, magnitude,i * independence,noise,noise2D));

        // shrink the radius of the next circle
        current.radius *= Math.pow((1 - spacing),1+2*i/count);
    }
    svg = '';
    for (var i=0;i<paths.length;i++){
    	h = noise2D(.3+i/paths.length*.4,.7-i/paths.length*.4)*360;
    	s = '80%';
    	l = (75-i*60/paths.length);
    	if (i == paths.length - 1){
    		svg += '<path fill="hsl('+h+','+s+','+(l*2)+'%)" stroke="black" d="'+paths[i]+'" />';
    	}
    	else if (i%24==0 || i%24==8){
    		svg += '<path fill="hsl('+h+','+s+','+l+'%)" stroke="none" d="'+paths[i]+'" />';
    	}
    	else if (i%24==16){
    		svg += '<path fill="hsl('+h+','+s+','+l+'%)" stroke="none" d="'+paths[i]+'" />';
    	}
    	else {
    		svg += '<path fill="hsl('+h+','+s+','+l+'%)" stroke="none" d="'+paths[i]+'" />';
    	}
    	
    }
    
	return svg;
}

function drawDeformedOval( circle,frequency, magnitude,seed,noise,noise2D) {
        var path = 'M';
        // Sample points evenly around the circle
        const samples = Math.floor(4 * circle.radius + 20);
        for (let j = 0; j < samples + 1; ++j) {
            const angle = (2 * Math.PI * j) / samples;

            // Figure out the x/y coordinates for the given angle
            const x = Math.cos(angle);
            const y = Math.sin(angle);

            // Randomly deform the radius of the circle at this point
            const deformation = (noise(x * frequency,
                                               y * frequency,
                                               seed) + 1);
            const radius = circle.radius * (1 + magnitude * deformation);

            // Extend the circle to this deformed radius
            path += (circle.x + radius * x*15) + ','+(circle.y + radius * y)+' ';
        }
        path += 'Z';
        return path;
}


