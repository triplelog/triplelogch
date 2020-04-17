var selectedTeam = 0;
var selectedState = "SC";
function showRecruits(teamid){
	document.getElementById("team"+selectedTeam+"Recruits").style.display = "none";
	document.getElementById("team"+teamid+"Recruits").style.display = "inline-block";
	selectedTeam = teamid;
	chooseTeamMap(teamid);
}
function showState(stateid){
	document.getElementById("team"+selectedTeam+"Recruits").style.display = "none";
	document.getElementById("state"+selectedState+"Recruits").style.display = "none";
	document.getElementById("state"+stateid+"Recruits").style.display = "inline-block";
	selectedState = stateid;
}

var vegasFunction;
var bettingFunction;
var bankrollFunction;
function chooseTeam(teamName){
	
	if (chosenTeam != ''){
		myValue += teamData[chosenTeam]['wins'];
		var teamRow = document.getElementById(chosenTeam+'row');
		teamRow.style.backgroundColor = '';
	}

	chosenTeam = teamName;
	myValue -= teamData[chosenTeam]['wins'];
	var teamRow = document.getElementById(teamName+'row');
	teamRow.style.backgroundColor = 'red';
	console.log(myValue);
}


  caja.initialize({
	cajaServer: 'https://caja.appspot.com/',
	debug: true
  });

  function setFormulas(formulaUrl) {
	caja.load(undefined, undefined, function(frame) {
		frame.code(formulaUrl, 'application/javascript')
			 .run(function (guestF) {
				 vegasFunction = frame.untame(guestF);
			 });

	});
  }

  google.setOnLoadCallback(function() {  // (10)
	document.getElementById('set').onclick = function() {
	  setFormulas(document.getElementById('rankingUrl').value);
	};
 });