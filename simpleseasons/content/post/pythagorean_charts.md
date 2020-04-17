---
title: Charts of Electoral College
subtitle: Predicting
date: 2017-03-05
tags: ["example", "math"]
js: ["js/pycharts.js"]
---





<div class="btn-group">
	<button type="button" class="btn btn-default btn-xs dropdown-toggle" onclick="showYear(0)">
		Year
		<span class="caret"></span>
	</button>
	<ul class="dropdown-menu pull-right" role="menu" id="selectYear0">
		<li><a href="#" onclick="drawChart(0)">All</a></li>
		<li><a href="#" onclick="drawChart(1980)">1980</a></li>
		<li><a href="#" onclick="drawChart(1984)">1984</a></li>
		<li><a href="#" onclick="drawChart(1988)">1988</a></li>
		<li><a href="#" onclick="drawChart(1992)">1992</a></li>
		<li><a href="#" onclick="drawChart(1996)">1996</a></li>
		<li><a href="#" onclick="drawChart(2000)">2000</a></li>
		<li><a href="#" onclick="drawChart(2004)">2004</a></li>
		<li><a href="#" onclick="drawChart(2008)">2008</a></li>
		<li><a href="#" onclick="drawChart(2012)">2012</a></li>
		<li><a href="#" onclick="drawChart(2016)">2016</a></li>
	</ul>
</div>

<div id="series_chart" style="width: 900px; height: 500px"></div>

<div class="btn-group">
	<button type="button" class="btn btn-default btn-xs dropdown-toggle" onclick="showYear(1)">
		Year
		<span class="caret"></span>
	</button>
	<ul class="dropdown-menu pull-right" role="menu" id="selectYear1">
		<li><a href="#" onclick="drawChartH(0)">All</a></li>
		<li><a href="#" onclick="drawChartH(2000)">2000</a></li>
		<li><a href="#" onclick="drawChartH(2004)">2004</a></li>
		<li><a href="#" onclick="drawChartH(2008)">2008</a></li>
		<li><a href="#" onclick="drawChartH(2012)">2012</a></li>
		<li><a href="#" onclick="drawChartH(2016)">2016</a></li>
	</ul>
</div>

<div id="series_chartH" style="width: 880px; height: 750px"></div>




