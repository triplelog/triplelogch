
const OpenSimplexNoise = require('open-simplex-noise');
var fs = require("fs");
const noise = OpenSimplexNoise.makeNoise3D(Date.now());

function drawFlower(circle,frequency, magnitude,independence, spacing,count) {
    // adjust the radius so will have roughly the same size irregardless of magnitude
    let current = {...circle};
    current.radius /= (magnitude + 1);
    var paths = [];
    for (let i = 0; i < count; ++i) {
        // draw a circle, the final parameter controlling how similar it is to
        // other circles in this image
        paths.push(drawDeformedCircle(current,frequency, magnitude,i * independence));

        // shrink the radius of the next circle
        current.radius *= (1 - spacing);
    }
    var svg = '<svg height="200" width="200">';
    for (var i=0;i<paths.length;i++){
    	svg += '<path fill="none" stroke="black" d="'+paths[i]+'">'
    }
    svg += '</svg>';
	fs.writeFile('../static/logo.svg', svg, function (err) {});
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

drawFlower({x:100,y:100,radius:50},2.0,0.5,0.1,0.01,7);