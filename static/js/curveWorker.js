var recentPoints = [];
onmessage = function(evt){
	if (evt.data.type == "move"){
		recentPoints.push([evt.data.x,evt.data.y]);
	}
	else if (evt.data.type == "up"){
		drawCurveOut();
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
function drawCurveOut(){
	var id = "curve-"+Math.random().toString(36).substr(3,12);
	var pd = "M"; 
	if (currentCurve.length < 3){
		return;
	}
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
	pd += " Q " + currentCurve[currentCurve.length - 2][0];
	pd += " " + currentCurve[currentCurve.length - 2][1];
	pd += " " + currentCurve[currentCurve.length - 1][0];
	pd += " " + currentCurve[currentCurve.length - 1][1];
	console.log(pd);
	
	
	allCurves[id]= currentCurve;
	postMessage({'type':'outputCurve','id':id,'pd':pd,'startPoint':[currentCurve[0][0],currentCurve[0][1]],'endPoint':[currentCurve[currentCurve.length - 1][0],currentCurve[currentCurve.length - 1][1]]});
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