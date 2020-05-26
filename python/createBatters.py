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
			if row[22] != 'retroID':
				allgamesa[row[22]]=row
			
	return allgamesa

def readcsvBatters(filen):
	allgamesa  ={}
	with open(filen, 'r') as csvfile:
		spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
		for row in spamreader:
			try:
				allgamesa[row[1]].append(row)
			except:
				allgamesa[row[1]] = [row]
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
headerB = battingdata['yearID']
headerP = pitchingdata['yearID']

for year in battingdata.keys():

	#teamJSON = {}
	yearCSV = {}
	yearCSV['batting'] = [headerB[0]]
	yearCSV['pitching'] = [headerP[0]]
	#teamJSON['years'] = []

	if year in battingdata.keys():
		yearCSV['batting'] += battingdata[year]
	if year in pitchingdata.keys():
		yearCSV['pitching'] += pitchingdata[year]

	writecsv(yearCSV['batting'],'../static/data/yearsBatters/'+year+'.csv')
	writecsv(yearCSV['pitching'],'../static/data/yearsPitchers/'+year+'.csv')
	
	



