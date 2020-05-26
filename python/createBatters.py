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
				
				batter = [name,row[3],age,pa,int(row[6]),int(row[7]),int(row[8]),int(row[11]),tb,int(row[12]),int(row[15]),int(row[13]),int(row[16]),obpa,int(row[18])]
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
			try:
				allgamesa[row[1]].append(row)
			except:
				allgamesa[row[1]] = [row]
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

people = readcsvP('./baseballdatabank-master/core/People.csv')
#first name is 13
teamsdata = readtcsv('./baseballdatabank-master/core/Teams.csv')

battingdata = readcsvBatters('./baseballdatabank-master/core/Batting.csv')
pitchingdata = readcsvPitchers('./baseballdatabank-master/core/Pitching.csv')

battingwar = readcsvBWar('./war_archive/war_daily_bat.txt')

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
				
				if row[13]>0:
					row[14] = (row[6]+row[10]+row[14])/row[13]
				else:
					row[14] = 0
				if row[4]>0:
					row[13] = row[6]/row[4]
					row.append(row[8]/row[4])
				else:
					row[13] = 0
					row.append(0)
				row.append(row[14]+row[15])
				row.append(0)
				war = 0
				try:
					war = battingwar[yearkeys[i]][year]
				except:
					war = 0
				row.append(war)
				yearCSV['batting'].append(row)
	#if year in pitchingdata.keys() and year != 'yearID':
	#	yearCSV['pitching'] += pitchingdata[year]

	writecsv(yearCSV['batting'],'../static/data/yearsBatters/'+year+'.csv')
	#writecsv(yearCSV['pitching'],'../static/data/yearsPitchers/'+year+'.csv')
	
	



