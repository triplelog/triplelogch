import fiona
import time
import sys
import random
import csv
import math
import json
import pyproj
import shapely
import shapely.ops as ops
from shapely.geometry.polygon import Polygon
from functools import partial

def readcsv(filen):
        allgamesa  =[]
        with open(filen, 'r', encoding='mac_roman') as csvfile:
                spamreader = csv.reader(csvfile, delimiter=',', quotechar='"')
                for row in spamreader:
                        allgamesa.append(row)
        return allgamesa

def computeCentroid(pgon):
	area = 0
	for i in range(0,len(pgon)):
		geom = Polygon(pgon[i])
		geom_area = ops.transform(
			partial(
				pyproj.transform,
				pyproj.Proj(init='EPSG:4326'),
				pyproj.Proj(
					proj='aea',
					lat1=geom.bounds[1],
					lat2=geom.bounds[3])),
			geom)

		area += geom_area.area  
	return area,geom_area.centroid  


shape = fiona.open("../usStateFull.json")



shprop = shape.next()


blkgrpid = str(shprop['properties']['GEOID'])
if blkgrpid[2:5] not in counties.keys():
	counties[blkgrpid[2:5]]=[0,0,0,0,[[.0005,0],[.001,0],[.0015,0],[.002,0],[.0025,0],[.003,0],[.0035,0],[.004,0],[.0045,0],[.005,0]]]
polydata = computeArea(shprop['geometry']['coordinates'])
			


	
