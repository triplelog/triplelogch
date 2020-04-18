
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



var app = express();



app.use('/',express.static('static'));

app.get('/', 
	
	function(req, res) {
		res.write(nunjucks.render('templates/csshole.html',{
		
		}));
		res.end();
	}
);
app.get('/index.html', 
	
	function(req, res) {
		res.write(nunjucks.render('templates/csshole.html',{
		
		}));
		res.end();
	}
);
app.get('/trigknob.html', 
	
	function(req, res) {
		var nturns= 16;
		var nangles = 16;
		var angles= [{"points": "184,76 184,-76", "numer": 0, "denom": 1, "needle": "200,0"},{"points": "199,-17 147,-135", "numer": 1, "denom": 6, "needle": "179,-88"},{"points": "173,-99 100,-173", "numer": 1, "denom": 4, "needle": "141,-141"},{"points": "135,-147 17,-199", "numer": 1, "denom": 3, "needle": "88,-179"},{"points": "76,-184 -76,-184", "numer": 1, "denom": 2, "needle": "0,-199"},{"points": "-17,-199 -135,-147", "numer": 2, "denom": 3, "needle": "-88,-179"},{"points": "-99,-173 -173,-100", "numer": 3, "denom": 4, "needle": "-141,-141"},{"points": "-147,-135 -199,-17", "numer": 5, "denom": 6, "needle": "-179,-88"},{"points": "-184,-76 -184,76", "numer": 1, "denom": 1, "needle": "-199,0"},{"points": "-199,17 -147,135", "numer": 7, "denom": 6, "needle": "-179,88"},{"points": "-173,99 -100,173", "numer": 5, "denom": 4, "needle": "-141,141"},{"points": "-135,147 -17,199", "numer": 4, "denom": 3, "needle": "-88,179"},{"points": "-76,184 76,184", "numer": 3, "denom": 2, "needle": "0,199"},{"points": "17,199 135,147", "numer": 5, "denom": 3, "needle": "88,179"},{"points": "99,173 173,100", "numer": 7, "denom": 4, "needle": "141,141"},{"points": "147,135 199,17", "numer": 11, "denom": 6, "needle": "179,88"}]

		res.write(nunjucks.render('templates/trigknob.html',{
			nturns:nturns,
			nangles:nangles,
			angles:angles,
		}));
		res.end();
	}
);

app.get('/mathquiz.html', 
	
	function(req, res) {
		
		res.write(nunjucks.render('templates/mathquiz.html',{
		
		}));
		res.end();
	}
);

app.get('/sortable.html', 
	
	function(req, res) {
		var ncols = 4;
		var nrows = 3;
		var content = [];
		for (var i=0;i<nrows;i++){
			var thiscontent = [];
			for (var ii=0;ii<ncols;ii++){
				thiscontent.push(Math.random());
			}
			thiscontent.push(i);
			content.push(thiscontent);
		}
		
		
		
		//sort content
		var order = [];
		for (var i=0;i<ncols;i++){
			var thiscol= [];
			var sorted = content.slice().sort(function (a,b) {return b[i] - a[i];})
			for (var ii=0;ii<nrows;ii++){
				for (var iii=0;iii<nrows;iii++){
					if ( sorted[iii][ncols] == ii){
						thiscol.push(iii+1);
						break;
					}
				}
			}
			order.push(thiscol);
		}
		
		res.write(nunjucks.render('templates/sortable.html',{
			title: "Sortable Table",
			ncols: ncols,
			nrows: nrows,
			order: order,
			content: content,
		}));
		res.end();
	}
);


const server1 = https.createServer(options, app);

server1.listen(12312);


