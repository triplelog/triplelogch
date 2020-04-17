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

cx = []
cy = []
cname = []
nodes = [[],[2,7,6],[1,4,16],[5,6,14],[2,6,11],[3,9,13,14],[1,3,4,8],[1,8,10,12,16],[6,7,9,13,14],[5,8,13,14],[7,12,15,16],[4,16],[7,10,13],[5,8,9,12],[3,5,8,9],[10,16],[2,7,10,11,15]]

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
			#startsvg += '''\n<circle cx="'''+i[0]+'''" cy="'''+i[1]+'''"/>'''
			cx.append(round(float(i[0]),1))
			cy.append(round(float(i[1]),1))
			cname.append(i[2])
	#print(countrylist)
	print(startsvg+'''\n</g>
	</svg>''')
	print('cx: ',cx)
	print('cy: ',cy)
	print('cname: ',cname)

missingnodes = [[]]
idx = 1
for i in nodes[1:]:
	mnode = []
	for ii in range(1,17):
		if ii not in i and ii != idx:
			mnode.append(ii)
	idx += 1
	missingnodes.append(mnode)

print('missingnodes: ',missingnodes)