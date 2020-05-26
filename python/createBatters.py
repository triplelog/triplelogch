import time
import random
import sys
import csv
import math
import threading
import json
import re
from os import listdir
import os
import tarfile
import gzip
import numpy

def make_gz(input_filename):
	input = open(input_filename, 'rb')
	s = input.read()
	input.close()

	output = gzip.GzipFile(input_filename+'.gz', 'wb')
	output.write(s)
	output.close()
    #with tarfile.open(output_filename, "w:gz") as tar:
    #    tar.add(input_filename, arcname=os.path.basename(source_dir))
        
        
def writecsv(parr, filen):
		with open(filen, 'w') as csvfile:
				spamwriter = csv.writer(csvfile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
				for i in range(0,len(parr)):
						try:
								spamwriter.writerow(parr[i])
						except:
								print(parr[i], i)
def writenewcsv(parr, filen):
		with open(filen, 'w') as csvfile:
				spamwriter = csv.writer(csvfile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
				for i in range(0,len(parr)):
						try:
								spamwriter.writerow(parr[i])
						except:
								print(parr[i], i)

def readtcsv(filen):
	allgamesa  =[]
	with open(filen, 'r') as csvfile:
		spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
		for row in spamreader:
			allgamesa.append(row)
			
	return allgamesa

def readcsvP(filen):
	allgamesa  ={}
	with open(filen, 'r') as csvfile:
		spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
		for row in spamreader:
			if row[0] != 'playerID':
				allgamesa[row[0]]=row
			
	return allgamesa

def readcsvBatters(filen):
	allgamesa  ={}
	with open(filen, 'r') as csvfile:
		spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
		for row in spamreader:
			if row[1] == 'yearID':
				row = ['Name', 'Team','Age','PA','AB','R','H','HR','TB','RBI','BB','SB','K','AVG','OBP','SLG','OPS','wOBA','WAR']
				allgamesa['yearID'] = [row]
			else:
				bio = people[row[0]]
				bid = bio[23]
				name = bio[13]+' '+bio[14]
				try:
					age = int(row[1]) - int(bio[1])
					if int(bio[2])>6:
						age-=1
				except:
					age = '?'
				
				for i in range(5,21):
					if row[i] == '':
						row[i] = 0
				pa = int(row[6])+int(row[15])+int(row[18])+int(row[19])+int(row[20])
				tb = int(row[8])+int(row[9])+2*int(row[10])+3*int(row[11])
				obpa = int(row[6])+int(row[15])+int(row[18])+int(row[20])
				
				batter = [name,row[3],age,pa,int(row[6]),int(row[7]),int(row[8]),int(row[11]),tb,int(row[12]),int(row[15]),int(row[13]),int(row[16]),obpa,int(row[18]),int(row[17]),int(row[9]),int(row[10])]
				try:
					try:
						oldbatter = allgamesa[row[1]][bid]
						totbatter = batter
						if isinstance(oldbatter[1], int):
							totbatter[1] = oldbatter[1]+1
						else:
							totbatter[1] = 2
						for i in range(3,15):
							totbatter[i]+=oldbatter[i]
						allgamesa[row[1]][bid] = totbatter
					except:
						allgamesa[row[1]][bid] = batter
				except:
					allgamesa[row[1]] = {}
					allgamesa[row[1]][bid] = batter
			
	return allgamesa

def readcsvPitchers(filen):
	allgamesa  ={}
	with open(filen, 'r') as csvfile:
		spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
		for row in spamreader:
			if row[1] == 'yearID':
				row = ['Name', 'Team','Age','IP','W','L','SV','H','R','ER','HR','BB','K','ERA','FIP','WHIP','K/BB','WAR']
				allgamesa['yearID'] = [row]
			else:
				bio = people[row[0]]
				bid = bio[23]
				name = bio[13]+' '+bio[14]
				try:
					age = int(row[1]) - int(bio[1])
					if int(bio[2])>6:
						age-=1
				except:
					age = '?'
				for i in range(5,30):
					if row[i] == '':
						row[i] = 0
				if row[24] == 0:
					bf = int(row[12])+int(row[13])+int(row[16])+int(row[22])+int(row[27])+int(row[28])-int(row[29])
				else:
					bf = int(row[24])
				hbp = int(row[22])
				
				batter = [name,row[3],age,int(row[12]),int(row[5]),int(row[6]),int(row[11]),int(row[13]),int(row[26]),int(row[14]),int(row[15]),int(row[16]),int(row[17]),bf,hbp]
				try:
					try:
						oldbatter = allgamesa[row[1]][bid]
						totbatter = batter
						if isinstance(oldbatter[1], int):
							totbatter[1] = oldbatter[1]+1
						else:
							totbatter[1] = 2
						for i in range(3,15):
							totbatter[i]+=oldbatter[i]
						allgamesa[row[1]][bid] = totbatter
					except:
						allgamesa[row[1]][bid] = batter
				except:
					allgamesa[row[1]] = {}
					allgamesa[row[1]][bid] = batter
	return allgamesa
def readcsvBWar(filen):
	allgamesa  ={}
	with open(filen, 'r') as csvfile:
		spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
		for row in spamreader:
			if row[0]=='name_common':
				continue
			try:
				war = float(row[30])
			except:
				continue
			try:
				stint = row[6]
				#war = row[30]
				#salary = row[34]
				#pid = row[3]
				#year = row[4]
				if int(stint)>1:
					allgamesa[row[3]][row[4]]+=war
				else:
					allgamesa[row[3]][row[4]]=war
			except:
				allgamesa[row[3]] = {}
				allgamesa[row[3]][row[4]]=war
	return allgamesa
def readcsvPWar(filen):
	allgamesa  ={}
	with open(filen, 'r') as csvfile:
		spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
		for row in spamreader:
			if row[0]=='name_common':
				continue
			try:
				war = float(row[28])
			except:
				continue
			try:
				stint = row[6]
				#war = row[28]
				#salary = row[29]
				#pid = row[3]
				#year = row[4]
				if int(stint)>1:
					allgamesa[row[3]][row[4]]+=war
				else:
					allgamesa[row[3]][row[4]]=war
			except:
				allgamesa[row[3]] = {}
				allgamesa[row[3]][row[4]]=war
	return allgamesa
def readcsvWoba(filen):
	allgamesa  ={}
	with open(filen, 'r') as csvfile:
		spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
		for row in spamreader:
			if row[0]=='Season':
				continue
			try:
				for i in range(3,14):
					row[i] = float(row[i])
				allgamesa[row[0]]=row
			except:
				continue

	return allgamesa		
def readcsvI(filen):
	allgamesa  =[]
	with open(filen, 'r') as csvfile:
		spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
		for row in spamreader:
			if row[0] not in ['start','sub','play','com']:
				if row[0] == 'info' and (row[1] == 'wp' or row[1] == 'lp' or row[1] == 'save'):
					try:
						row[2] = people[row[2]][14] + ', '+people[row[2]][13]
					except:
						pass
				allgamesa.append(row)
			
	return allgamesa

	
def readcsv(filen):
	allgamesa  =[]
	with open(filen, 'r') as csvfile:
		spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
		for row in spamreader:
			allgamesa.append(row)
			
	return allgamesa

def threedecimals(x,n=3):
	nval = 1
	for i in range(0,n):
		nval *=10
	xxx = round(nval*x)
	intstr = ''
	if xxx>= nval:
		intstr = str(math.floor(xxx/nval))
	elif xxx<0:
		return '-'+threedecimals(-1*x,n)
	elif n<3:
		intstr = '0'
		
	intstr += '.'
	decstr = ''
	for i in range(0,n):
		decstr += '0'
	decstr += str(xxx%nval)
	decstr = decstr[len(decstr)-n:len(decstr)]
	return intstr+decstr
people = readcsvP('./baseballdatabank-master/core/People.csv')
#first name is 13
teamsdata = readtcsv('./baseballdatabank-master/core/Teams.csv')

battingdata = readcsvBatters('./baseballdatabank-master/core/Batting.csv')
pitchingdata = readcsvPitchers('./baseballdatabank-master/core/Pitching.csv')

battingwar = readcsvBWar('./war_archive/war_daily_bat.txt')
pitchingwar = readcsvPWar('./war_archive/war_daily_pitch.txt')
wobac = readcsvWoba('./constants/woba.csv')
fipc = {}
for year in pitchingdata.keys():
	fipc[year] = 0
	lgIPouts = 0
	lgK = 0
	lgBF = 0
	lgHR = 0
	lgBB = 0
	lgHBP = 0
	if year in pitchingdata.keys() and year != 'yearID':
		yeardata = pitchingdata[year]
		yearkeys = list(yeardata.keys())
		for i in range(0,len(yearkeys)):
			pitcher = yeardata[yearkeys[i]]
			#['Name', 'Team','Age','IP','W','L','SV','H','R','ER','HR','BB','K',bf,hbp]
			lgIPouts += pitcher[3]
			lgK += pitcher[12]
			lgBF += pitcher[13]
			lgHR += pitcher[10]
			lgBB += pitcher[11]
			lgHBP += pitcher[14]
		fipc[year] = (lgIPouts-lgK)/(lgBF-lgHR-lgBB-lgHBP-lgK)

franchises = {}
teams = {}
locations = {}
locid = 0
idx = 0
for row in teamsdata[1:]:
	if row[1] != 'NL' and row[1] != 'AL':
		continue
	if int(row[0]) < 1900:
		continue
	#row[47] is retroID, row[2] is lahmanTeamID, row[3] is lahmanFeanchiseID
	if row[2] not in franchises.keys():
		useold = -1
		for i in range(0,idx):
			if teams[i] == row[3]:
				useold = i
				break
		if useold > -1:
			franchises[row[2]] = useold
		else:
			franchises[row[2]] = idx
			teams[idx] = row[3]
			idx += 1
			
	elif row[3] != teams[franchises[row[2]]]:
		print(teams[franchises[row[2]]],row[3],row[2])

print(teams)
print(franchises)
print(battingdata.keys())
headerB = battingdata['yearID']
headerP = pitchingdata['yearID']

correlations = {}
for year in battingdata.keys():

	#teamJSON = {}
	yearCSV = {}
	yearCSV['batting'] = [headerB[0]]
	yearCSV['pitching'] = [headerP[0]]
	#teamJSON['years'] = []

	if year in battingdata.keys() and year != 'yearID':
		yeardata = battingdata[year]
		yearkeys = list(yeardata.keys())
		for i in range(0,len(yearkeys)):
			batter = yeardata[yearkeys[i]]
			if batter[3]>0:
				row = batter
				if yearkeys[i] == '':
					print(year)
					continue
				row[0] = '<a href="https://www.baseball-reference.com/players/'+yearkeys[i][0]+'/'+yearkeys[i]+'.shtml">'+batter[0]+'</a>'
				#['Name', 'Team','Age','PA','AB','R','H','HR','TB','RBI','BB','SB','K','AVG','OBP','SLG','OPS','wOBA','WAR']
				ibb = row[15]
				hbp = row[14]
				db = row[16]
				tb = row[17]
				obpa = row[13]
				if row[13]>0:
					row[14] = (row[6]+row[10]+row[14])/obpa
				else:
					row[14] = 0
				if row[4]>0:
					row[13] = row[6]/row[4]
					row[15] = row[8]/row[4]
				else:
					row[13] = 0
					row[15] = 0
				row[16] =row[14]+row[15]
				
				woba = 0
				try:
					woban = wobac[year][3]*(row[10]-ibb)+wobac[year][4]*hbp+wobac[year][5]*(row[6]-db-tb-row[7])+wobac[year][6]*db+wobac[year][7]*tb+wobac[year][8]*row[7]
					wobad = obpa-ibb
					if wobad> 0:
						woba = woban/wobad
				except:
					woba = 0
				row[17]=woba
				
				war = 0
				try:
					war = battingwar[yearkeys[i]][year]
				except:
					war = 0
				row.append(war)
				for ii in range(13,18):
					row[ii] = threedecimals(row[ii])
				row[18] = threedecimals(row[18],2)
				yearCSV['batting'].append(row)
	if year in pitchingdata.keys() and year != 'yearID':
		yeardata = pitchingdata[year]
		yearkeys = list(yeardata.keys())
		for i in range(0,len(yearkeys)):
			pitcher = yeardata[yearkeys[i]]
			if pitcher[3]>0:
				row = pitcher
				if yearkeys[i] == '':
					print(year)
					continue
				row[0] = '<a href="https://www.baseball-reference.com/players/'+yearkeys[i][0]+'/'+yearkeys[i]+'.shtml">'+pitcher[0]+'</a>'
				#['Name', 'Team','Age','IP','W','L','SV','H','R','ER','HR','BB','K','ERA','FIP','WHIP','K/BB','WAR']
				bf = row[13]
				hbp = row[14]
				if row[3]>0:
					row[13] = (row[9])/row[3]*27
				else:
					row[13] = 'inf'
					
				xIPouts = fipc[year]*(bf-row[10]-row[11]-hbp-row[12])+row[12]
				if xIPouts > 0:
					fip = wobac[year][13]+(13*row[10]+3*(row[11]-hbp)-2*row[12])*3/row[3]
					myfip = wobac[year][13]+(13*row[10]+3*(row[11]-hbp)-2*row[12])*3/(xIPouts)
					if row[3]>49:
						try:
							first = correlations[yearkeys[i]]['first']
							if first['year']==int(year)-1 and first['team'] != row[1]:
								correlations[yearkeys[i]]['second']={}
								correlations[yearkeys[i]]['second']['fip']=fip
								correlations[yearkeys[i]]['second']['myfip']=myfip
								correlations[yearkeys[i]]['second']['era']=(row[9])/row[3]*27
						except:
							correlations[yearkeys[i]]={}
							correlations[yearkeys[i]]['first']={}
							correlations[yearkeys[i]]['first']['year']=int(year)
							correlations[yearkeys[i]]['first']['team']=row[1]
							correlations[yearkeys[i]]['first']['fip']=fip
							correlations[yearkeys[i]]['first']['myfip']=myfip
							correlations[yearkeys[i]]['first']['era']=(row[9])/row[3]*27
						
					row[14] = myfip
				else:
					row[14] = 0
					
					
				if row[3]>0:
					row.append((row[11]+row[7])*3/row[3])
				else:
					row.append('inf')
				
				if row[11]>0:
					row.append((row[12])/row[11])
				else:
					row.append('inf')
				
				war = 0
				try:
					war = pitchingwar[yearkeys[i]][year]
				except:
					war = 0
				row.append(war)
				for ii in range(13,16):
					row[ii] = threedecimals(row[ii])
				for ii in range(16,18):
					if row[ii] == 'inf':
						row[ii] = '&infin;'
					else:
						row[ii] = threedecimals(float(row[ii]),2)
				if row[3]%3 == 0:
					row[3] = str(math.floor(row[3]/3))
				elif row[3]%3 == 1:
					row[3] = str(math.floor(row[3]/3))+'&frac13;'
				elif row[3]%3 == 2:
					row[3] = str(math.floor(row[3]/3))+'&frac23;'
				yearCSV['pitching'].append(row)

	writecsv(yearCSV['batting'],'../static/data/yearsBatters/'+year+'.csv')
	writecsv(yearCSV['pitching'],'../static/data/yearsPitchers/'+year+'.csv')
	
x = {'fip':[],'myfip':[],'era':[]}
y = {'fip':[],'myfip':[],'era':[]}	
for pitcher in correlations.keys():
	try:
		second = correlations[pitcher]['second']
		first = correlations[pitcher]['first']
		x['fip'].append(second['fip'])
		x['myfip'].append(second['myfip'])
		x['era'].append(second['era'])
		y['fip'].append(first['fip'])
		y['myfip'].append(first['myfip'])
		y['era'].append(first['era'])
	except:
		continue
		

print(numpy.corrcoef(x['fip'],y['era']))
print(numpy.corrcoef(x['myfip'],y['era']))
print(numpy.corrcoef(x['era'],y['era']))

print(numpy.corrcoef(x['fip'],y['fip']))
print(numpy.corrcoef(x['myfip'],y['myfip']))
print(numpy.corrcoef(x['era'],y['era']))