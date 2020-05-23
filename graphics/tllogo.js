
const OpenSimplexNoise = require('open-simplex-noise');
var fs = require("fs");


function drawLogs(circle,frequency, magnitude,independence, spacing,count) {
    // adjust the radius so will have roughly the same size irregardless of magnitude
    let current = {...circle};
    current.radius /= (magnitude + 1);
    var paths = [];
    for (let i = 0; i < count; ++i) {
        // draw a circle, the final parameter controlling how similar it is to
        // other circles in this image
        paths.push(drawDeformedCircle(current,frequency, magnitude,i * independence));

        // shrink the radius of the next circle
        current.radius -= spacing;
    }
    var svg = '';
    for (var i=0;i<paths.length;i++){
    	h = 30 + noise2D(.9-i/paths.length*.8,.1+i/paths.length*.8)*10;
    	s = (45 + noise2D(.1+i/paths.length*.8,.9-i/paths.length*.8)*5)+'%';
    	l = (25+Math.min(i%11,10-(i%11))*9)+'%';
    	if (i%5==0){
    		svg += '<path fill="hsl('+h+','+s+','+l+')" stroke="none" d="'+paths[i]+'" />';
    	}
    	else {
    		svg += '<path fill="hsl('+h+','+s+','+l+')" stroke="none" d="'+paths[i]+'" />';
    	}
    	
    }
    return svg;
	
}

function drawDeformedCircle( circle,frequency, magnitude,seed) {
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

function drawLine(xI,yI,color){
	var path = 'M';
	var x = 0;
	var y = 0;
	for (var i=0;i<100;i++){
		x = i*2;
		y = i*-2;
		xdef = .8 + .2*(noise2D(x/300,y/300)+1);
		ydef = .8 + .2*(noise2D(x/600,y/600)+1);
		path += (xI + x * xdef) + ',' + (yI + y * ydef)+' ';
	}
	path += 'Z';
	var svg = '';
	if (i%5==0){
		svg += '<path fill="none" stroke="'+color+'" d="'+path+'" />';
	}
	else {
		svg += '<path fill="none" stroke="'+color+'" d="'+path+'" />';
	}
	return svg;
}

function drawLines(xc,yc,r){
	var svg = '';//'<circle fill="none" stroke="black" cx="'+(xc+250)+'" cy="'+(yc-250)+'" r="'+r+'" />';
	var samples = 200;
	for (let j = 0; j < samples; ++j) {
		const angle = 2 * Math.PI *  (.16 - .5 * j / samples );

		// Figure out the x/y coordinates for the given angle
		const x = Math.cos(angle)*r + xc;
		const y = Math.sin(angle)*r + yc;
		h = 30 + noise2D(.9-j/samples*.8,.1+j/samples*.8)*8;
    	s = (45 + noise2D(.1+j/samples*.8,.9-j/samples*.8)*4)+'%';
    	l = (25+Math.min(j%11,10-(j%11))*1)+'%';
		var color = 'hsl('+h+','+s+','+l+')';
		svg += drawLine(x,y,color);
	}
	return svg;
}


//drawFlower({x:100,y:100,radius:50},2.0,0.5,0.1,0.01,300);
var svg = '<html><body><svg height="600" width="800">';

var noise = OpenSimplexNoise.makeNoise3D(Date.now());
var noise2D = OpenSimplexNoise.makeNoise2D(Date.now());
var line1 = drawLines(400,400,98);
svg += line1;


noise = OpenSimplexNoise.makeNoise3D(Date.now());
noise2D = OpenSimplexNoise.makeNoise2D(Date.now());
var end1 = drawLogs({x:200,y:400,radius:100},2.0,0.04,0.09,.9,105);
svg += end1;

noise = OpenSimplexNoise.makeNoise3D(Date.now());
noise2D = OpenSimplexNoise.makeNoise2D(Date.now());
var end2 = drawLogs({x:400,y:400,radius:100},2.0,0.04,0.09,.9,105);
svg += end2;

noise = OpenSimplexNoise.makeNoise3D(Date.now());
noise2D = OpenSimplexNoise.makeNoise2D(Date.now());
var end3 = drawLogs({x:300,y:227,radius:100},2.0,0.04,0.09,.9,105);
svg += end3;



svg += '</svg></body></html>';
fs.writeFile('../static/logo.html', svg, function (err) {});
