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
						allgamesa.append(row)
					except:
						pass
		return allgamesa

		
				
countrydata = readcsv('countrieswithpaths.csv')
citydata = readcsv('citieswithcircles.csv')

contlist = ['Europe']
countrylist = []
countrylist = ['FRA', 'UKR', 'BLR', 'LTU', 'CZE', 'DEU', 'EST', 'LVA', 'LUX', 'BEL', 'MKD', 'ALB', 'KOS', 'ESP', 'DNK', 'ROU', 'HUN', 'SVK', 'POL', 'IRL', 'GBR', 'GRC', 'AUT', 'ITA', 'CHE', 'NLD', 'SRB', 'HRV', 'SVN', 'BGR', 'MNE', 'BIH', 'PRT', 'MDA']

citylist = ['Budapest','London','Paris','Lyon','Madrid','Barcelona','Brussels','Vienna','Bern','Berlin','Munich','Frankfurt','Milan','Prague','Amsterdam','Warsaw']

startsvg = '''<svg xmlns="http://www.w3.org/2000/svg" version="1.2" baseProfile="tiny" width="800" height="387" viewBox="0 0 800 387" stroke-linecap="round" stroke-linejoin="round">
<g id="ne_10m_admin_0_countries">'''

if len(countrylist)==0:
	for i in countrydata:
		if i[6]=='Europe':
			if i[1] not in countrylist:
				countrylist.append(i[1])
			startsvg += '''\n<path d="'''+i[0]+'''"/>'''
else:
	for i in countrydata:
		if i[1] in countrylist:
			startsvg += '''\n<path d="'''+i[0]+'''"/>'''

if len(citylist) == 0:
	for i in citydata:
		if i[4] in countrylist:
			startsvg += '''\n<circle cx="'''+i[0]+'''" cy="'''+i[1]+'''"/>'''
	print(countrylist)
	print(startsvg+'''\n</g>
	</svg>''')
else:
	for i in citydata:
		if i[4] in countrylist and i[2] in citylist:
			startsvg += '''\n<circle cx="'''+i[0]+'''" cy="'''+i[1]+'''"/>'''
	#print(countrylist)
	print(startsvg+'''\n</g>
	</svg>''')
		