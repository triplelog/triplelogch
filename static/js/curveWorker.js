var recentPoints = [];
onmessage = function(evt){
	if (evt.data.type == "move"){
		recentPoints.push([evt.data.x,evt.data.y]);
	}
	else if (evt.data.type == "up"){
		createPD();
	}
	
}

function sendPoints() {
	var rlen = recentPoints.length;
	if (rlen == 0){return;}
	var points = [[0,0,0],[0,0,0],[0,0,0]];
	if (rlen > 3){
		
		for (var i=0;i<Math.floor(rlen/4);i++){
			points[0][0]+=recentPoints[i][0];
			points[0][1]+=recentPoints[i][1];
			points[0][2]++;
		}
		for (var i=Math.floor(rlen/4);i<Math.floor(rlen/2);i++){
			points[0][0]+=recentPoints[i][0];
			points[0][1]+=recentPoints[i][1];
			points[0][2]++;
			points[1][0]+=recentPoints[i][0];
			points[1][1]+=recentPoints[i][1];
			points[1][2]++;
		}
		for (var i=Math.floor(rlen/2);i<Math.floor(rlen*3/4);i++){
			points[2][0]+=recentPoints[i][0];
			points[2][1]+=recentPoints[i][1];
			points[2][2]++;
			points[1][0]+=recentPoints[i][0];
			points[1][1]+=recentPoints[i][1];
			points[1][2]++;
		}
		for (var i=Math.floor(rlen*3/4);i<rlen;i++){
			points[2][0]+=recentPoints[i][0];
			points[2][1]+=recentPoints[i][1];
			points[2][2]++;
		}
		points[0][0] /= points[0][2];
		points[0][1] /= points[0][2];
		points[1][0] /= points[1][2];
		points[1][1] /= points[1][2];
		points[2][0] /= points[2][2];
		points[2][1] /= points[2][2];
	}
	else {
		points = recentPoints;
	}
	for (var i=0;i<points.length;i++){
		currentCurve.push([points[i][0],points[i][1]]);
	}
	postMessage({'type':'inputCurve','points':points});
	recentPoints = [];
}
setInterval(sendPoints, 100);

var currentCurve = [];
var allCurves = {};
var isDown = false;
var isGroup = false;


function drawCurveIn(pt){
	
	/*for (var i=0;i<currentCurve.length;i++){
		var el = document.createElement('div');
		el.classList.add("pt");
		el.style.left = currentCurve[i][0]+"px";
		el.style.top = currentCurve[i][1]+"px";
		inputEl.appendChild(el);
	}*/
	var el = document.createElement('div');
	el.classList.add("pt");
	el.style.left = pt[0]+"px";
	el.style.top = pt[1]+"px";
	inputEl.appendChild(el);
}
function createPD(){
	if (currentCurve.length < 1){
		return;
	}
	var id = "curve-"+Math.random().toString(36).substr(3,12);
	var pd = "M"; 
	
	pd += " " + currentCurve[0][0];
	pd += " " + currentCurve[0][1];
		
	for (var i=1; i<currentCurve.length - 2; i++){
		pd += " Q " + currentCurve[i][0];
		pd += " " + currentCurve[i][1];
		var xc = (currentCurve[i][0] + currentCurve[i+1][0]) / 2;
		var yc = (currentCurve[i][1] + currentCurve[i+1][1]) / 2;
		pd += " " + xc;
		pd += " " + yc;
	}
	if (currentCurve.length > 1){
		pd += " Q " + currentCurve[currentCurve.length - 2][0];
		pd += " " + currentCurve[currentCurve.length - 2][1];
	}
	pd += " " + currentCurve[currentCurve.length - 1][0];
	pd += " " + currentCurve[currentCurve.length - 1][1];

	
	allCurves[id]= currentCurve;
	postMessage({'type':'outputCurve','id':id,'pd':pd,'startPoint':[currentCurve[0][0],currentCurve[0][1]],'endPoint':[currentCurve[currentCurve.length - 1][0],currentCurve[currentCurve.length - 1][1]]});
	convexHull(currentCurve);
	currentCurve = [];
	recentPoints = [];
}

function selectGroup(){
	isGroup = true;
}

function groupDown() {

}
function groupMove() {

}
function groupUp() {
	isGroup = false;
}

function convexHull(points){
	var minX = points[0][0]+1;
	var len = points.length;
	var hullPoints = [[0,0]];
	var currentPoint = 0;
	var cx = 0;
	var cy = 0;
	for (var i=0;i<len;i++){
		if (points[i][0] < minX) {
			minX = points[i][0];
			currentPoint = i;
		}
	}
	hullPoints[0] = [points[currentPoint][0],points[currentPoint][1]];
	points.splice(currentPoint,1);
	cx = points[currentPoint][0];
	cy = points[currentPoint][1];
	len--;
	
	var maxAngle = -10;
	var toRight = false;
	for (var i=0;i<len;i++){
		var a = -11;
		if (points[i][0]>cx){
			a = Math.atan((points[i][1]-cy)/(points[i][0]-cx));
			toRight = true;
		}
		else {
			continue;
		}
		if (a > maxAngle) {
			maxAngle = a;
			currentPoint = i;
		}
	}
	if (!toRight){
		currentPoint = 0;
	}
	hullPoints[1] = [points[currentPoint][0],points[currentPoint][1]];
	points.splice(currentPoint,1);
	cx = points[currentPoint][0];
	cy = points[currentPoint][1];
	len--;
	console.log(hullPoints);
	console.log(points);
}