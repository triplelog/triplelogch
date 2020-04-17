---
title: Pythagorean Expectation
subtitle: Predicting Winning Percentages
date: 2017-03-05
tags: ["example", "math"]
---





## A Brute Force Approximation


<select onchange="updateTeamRuns(this.value)">
  <option value="ATL">Volvo</option>
  <option value="ARI">Saab</option>
  <option value="DET">Mercedes</option>
  <option value="TEX">Audi</option>
</select>

<div id="runs_chart" style="width: 900px; height: 400px"></div>

The following chart shows the probabilities of every possible outcome. Larger circles represent larger probabilities. Baseball teams score and/or allow between 2 and 5 runs quite often so these scores like 4-3 have much larger circles than scores like 9-1. The color of the circle represents the Pythagorean probability of winning. The y-axis is runs scored so good teams will have more big circles to the top and left than bottom right.

<div id="series_chart" style="width: 900px; height: 900px"></div>

If we add the probabilities of every outcome with more runs scored than allowed we get the probability of winning. Adding the probabilities of runs scored equal to runs allowed gets the probability of a tie.


<table id="teamsTable">
	<tr>
		<th>Team</th><th>Ws</th><th>Ts</th><th>Ls</th><th>Ws</th><th>Ts</th><th>Ls</th><th>wp</th><th>wp</th>
	</tr>
	
</table>


<button onclick="createFirstTable()">Table</button>

Now if you have don't know how many wins a team had you can estimate the win total if you do have lists of how many runs they scored each game and how many runs they allowed each game. Obviously the above process is significantly more complicated than dividing wins by games played, so our two priorities are simplifying the process and figuring out why it might be good.

Winning percentage is influenced not just by the millions of lucky bounces that may go one way or the other, but also by whether they score too many runs in the wrong games or just enough runs in the right games. We can remove this source of luck by the above proces. After 162 games most teams see their luck even out, but a few games can have very different records.

Computing an expected winning percentage after 10% of the season should provide more information.



