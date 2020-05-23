
const OpenSimplexNoise = require('open-simplex-noise');
var fs = require("fs");
const noise = OpenSimplexNoise.makeNoise3D(Date.now());
const noise2D = OpenSimplexNoise.makeNoise2D(Date.now());

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
    var svg = '<html><body><svg height="400" width="400">';
    for (var i=0;i<paths.length;i++){
    	h = 34;
    	s = (25 + noise2D(.1+i/paths.length*.8,.9-i/paths.length*.8)*50)+'%';
    	l = (50+Math.min(i%11,10-(i%11))*6)+'%';
    	if (i%5==0){
    		svg += '<path fill="hsl('+h+','+s+','+l+')" stroke="none" d="'+paths[i]+'" />';
    	}
    	else {
    		svg += '<path fill="hsl('+h+','+s+','+l+')" stroke="none" d="'+paths[i]+'" />';
    	}
    	
    }
    svg += '</svg></body></html';
	fs.writeFile('../static/logo.html', svg, function (err) {});
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



//drawFlower({x:100,y:100,radius:50},2.0,0.5,0.1,0.01,300);
drawLogs({x:200,y:200,radius:100},2.0,0.05,0.09,1,100);
