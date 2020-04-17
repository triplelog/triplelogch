
var currentTeam = -1;

function showGames(teamid) {
	if (currentTeam > -1) {
		document.getElementById("team"+currentTeam+"Games").style.display = 'none';
	}
 	document.getElementById("team"+teamid+"Games").style.display = 'inline-block';
 	currentTeam = teamid;
 	

}

function showConference() {
	if (document.getElementById("selectConference").style.display != 'inline-block') {
		document.getElementById("selectConference").style.display = 'inline-block';
	}
	else {
		document.getElementById("selectConference").style.display = 'none';
	}
}
function chooseConference(conference){
	var allRows = document.getElementsByClassName('bracketRow');
	for (var i=0;i<allRows.length;i++) {
		allRows[i].style.display = 'none';
	}
	var confRows = document.getElementsByClassName(conference);
	for (var i=0;i<confRows.length;i++) {
		confRows[i].style.display = 'table-row';
	}
	document.getElementById("selectConference").style.display = 'none';
}



