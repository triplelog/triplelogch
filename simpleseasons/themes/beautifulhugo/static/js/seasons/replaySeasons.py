import time
import sys
import random
import csv
import math
import json
import lxml
from lxml import html
from lxml import etree
from io import StringIO, BytesIO
import requests


def writecsv(parr, filen):
		with open(filen, 'a') as csvfile:
				spamwriter = csv.writer(csvfile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
				for i in range(0,len(parr)):
						try:
								spamwriter.writerow(parr[i])
						except:
								print(parr[i], i)



def readcsv(filen):
		allgamesa  =[]
		with open(filen, 'r') as csvfile:
				spamreader = csv.reader(csvfile, delimiter=',', quotechar='|')
				for row in spamreader:
						allgamesa.append(row)
		return allgamesa

def pywin(runs,allowed,exponent):
	return runs**exponent/(runs**exponent+allowed**exponent)

def log5(team1,team2):
	return (team1-team1*team2)/(team1+team2-2*team1*team2)

year = sys.argv[1]
allteams = readcsv('Teams.csv')
teams = {'NL':{},'AL':{}}
for i in allteams:
	if i[0]==year:
		if i[4] not in teams[i[1]].keys():
			teams[i[1]][i[4]]=[i[2]]
		else:
			teams[i[1]][i[4]].append(i[2])
print(teams)

year = '2016'
allgames = readcsv('results/GL'+year+'.txt')
schedule = {}
for i in allgames:
	if i[0].replace('"','') not in schedule.keys():
		schedule[i[0].replace('"','')]=[{'vteam':i[3].replace('"',''),'hteam':i[6].replace('"',''),'vruns':int(i[9]),'hruns':int(i[10]),'outs':int(i[11])}]
	else:
		schedule[i[0].replace('"','')].append({'vteam':i[3].replace('"',''),'hteam':i[6].replace('"',''),'vruns':int(i[9]),'hruns':int(i[10]),'outs':int(i[11])})
print(schedule)

		