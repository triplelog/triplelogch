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
						allgamesa.append([row[8],row[24]])
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
		
				
countrydata = readcsv('ne_50m_admin_1_states_provinces_lakes.csv')
print(len(countrydata))
f=open("ne_50m_admin_1_states_provinces_lakes.svg", "r")
lines = f.readlines()
idx = 1
gooddata = [['path']+countrydata[0]]
for line in lines[3:-1]:
	if len(line)>10:
		gooddata.append([line[9:-4]]+countrydata[idx])
	idx += 1
	
f.close()

writecsv(gooddata,'stateswithpaths.csv')



citydata = readcsvCity('ne_10m_populated_places_simple.csv')

f=open("ne_10m_populated_places_simple.svg", "r")
lines = f.readlines()
idx = 1
gooddata = [['cx','cy']+citydata[0]]
print('')
print('')
print('')
print('')
print('')
for line in lines[3:-1]:
	if len(line)>10 and citydata[idx][2]=='USA':
		pathstr = line[8:-3]
		cxstr = pathstr[pathstr.find('cx="')+4:]
		cxval = (244.25-257.75)/(229.0-241.5)*(float(cxstr[:cxstr.find('"')])-229.0)+244.25
		cystr = cxstr[cxstr.find('cy="')+4:]
		cyval = (107.0-100.0)/(97.9-91.4)*(float(cystr[:cystr.find('"')])-91.4)+100.0
		gooddata.append([cxval,cyval]+citydata[idx])
		print('<circle cx="'+str(cxval)+'" r="1" cy="'+str(cyval)+'"/>')
	idx += 1
	
f.close()

writecsv(gooddata,'uscitieswithcircles.csv')