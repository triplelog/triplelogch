import time
import sys
import random
import csv
import math
import json



def writecsv(parr, filen):
		with open(filen, 'w') as csvfile:
				spamwriter = csv.writer(csvfile, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)
				for i in range(0,len(parr)):
						try:
								spamwriter.writerow(parr[i])
						except:
								print(parr[i], i)



def readcsv(filen):
		allgamesa  =[]
		with open(filen, 'r') as csvfile:
				spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
				for row in spamreader:
					try:
						allgamesa.append([row[9],row[17],row[18],row[22],row[23],row[59],row[62]])
					except:
						pass
		return allgamesa

def readcsvCity(filen):
		allgamesa  =[]
		with open(filen, 'r') as csvfile:
				spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
				for row in spamreader:
					try:
						allgamesa.append([row[8],row[16],row[17]])
					except:
						pass
		return allgamesa
		
				
countrydata = readcsv('ne_10m_admin_0_countries.csv')

f=open("ne_10m_admin_0_countries.svg", "r")
lines = f.readlines()
idx = 1
gooddata = [['path']+countrydata[0]]
for line in lines[3:-1]:
	if len(line)>10:
		gooddata.append([line[9:-4]]+countrydata[idx])
	idx += 1
	
f.close()

writecsv(gooddata,'countrieswithpaths.csv')



citydata = readcsvCity('ne_10m_populated_places_simple.csv')

f=open("ne_10m_populated_places_simple.svg", "r")
lines = f.readlines()
idx = 1
gooddata = [['cx','cy']+citydata[0]]
for line in lines[3:-1]:
	if len(line)>10:
		pathstr = line[8:-3]
		cxstr = pathstr[pathstr.find('cx="')+4:]
		cxval = cxstr[:cxstr.find('"')]
		cystr = cxstr[cxstr.find('cy="')+4:]
		cyval = float(cystr[:cystr.find('"')])+2.0
		gooddata.append([cxval,cyval]+citydata[idx])
	idx += 1
	
f.close()

writecsv(gooddata,'citieswithcircles.csv')