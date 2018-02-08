import json, threading,simplejson
from threading import Thread 
# lock for using in the same file from differnt places
lock = threading.Lock()

# file that contain the data from the client permanently
filePath = 'data.json'

tasks=[]

# read the data from the file that contain the data from previous connections
with open(filePath,'r') as json_file:  
    tasks = json.load(json_file)

def updateDataFile(data):
    lock.acquire() # thread blocks at this line until it can obtain lock
    try:
        jsondata = simplejson.dumps(data)
        fileData = open(filePath, 'w')
        fileData.write(jsondata)
        fileData.close()
    except Exception as e:
        print e

    lock.release()

