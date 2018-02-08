import sched, time,datetime
from dataFile import tasks,updateDataFile
import threading

def executeTask():   
    threading.Timer(60.0,executeTask).start()
    if len(tasks) > 0:
        print "task executed {} at {} with priorty {} and execute time {}".format( \
            tasks[0]['payload'], \
            datetime.datetime.now(), \
            tasks[0]['priorty'],tasks[0]['eTime'] \
        )
        del tasks[0]
        updateDataFile(tasks)