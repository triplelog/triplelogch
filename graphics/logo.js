
const OpenSimplexNoise = require('open-simplex-noise');
const noise = new OpenSimplexNoise(40);

function drawFlower(circle: {x: number, y: number, radius: number},
                           frequency: number = 2.0, magnitude: number = 0.5,
                           independence: number = 0.1, spacing: number = 0.01,
                           count: number = 300): void {
    // adjust the radius so will have roughly the same size irregardless of magnitude
    let current = {...circle};
    current.radius /= (magnitude + 1);
    var paths = [];
    for (let i = 0; i < count; ++i) {
        // draw a circle, the final parameter controlling how similar it is to
        // other circles in this image
        drawDeformedCircle(current,
                           frequency, magnitude,
                           i * independence);

        // shrink the radius of the next circle
        current.radius *= (1 - spacing);
    }
    console.log(paths);
}

function drawDeformedCircle( circle: {x: number, y: number, radius: number},
                                   frequency: number,
                                   magnitude: number,
                                   seed: number = 0): void {
        var path = 'M';

        // Sample points evenly around the circle
        const samples = Math.floor(4 * circle.radius + 20);
        for (let j = 0; j < samples + 1; ++j) {
            const angle = (2 * Math.PI * j) / samples;

            // Figure out the x/y coordinates for the given angle
            const x = Math.cos(angle);
            const y = Math.sin(angle);

            // Randomly deform the radius of the circle at this point
            const deformation = (noise.noise3D(x * frequency,
                                               y * frequency,
                                               seed) + 1);
            const radius = circle.radius * (1 + magnitude * deformation);

            // Extend the circle to this deformed radius
            path += (circle.x + radius * x) + ','+(circle.y + radius * y)+' ';
        }
        path += 'Z';
        paths.push(path);
}

drawFlower({x:0,y:0,radius:100},2.0,0.5,0.1,0.01,7);