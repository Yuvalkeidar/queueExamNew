import sched, time,datetime
from dataFile import tasks,updateDataFile
from service import socketio

# this function running when the webserive availeble
# and "execute" the first task, and delete from the global list of tasks
def executeTask():
    while True:
        socketio.sleep(60)
        if len(tasks) > 0:
            print "task executed {} at {} with priorty {} and execute time {}".format( \
                tasks[0]['payload'], \
                datetime.datetime.now(), \
                tasks[0]['priorty'],tasks[0]['eTime'] \
            )
            del tasks[0]
            updateDataFile(tasks)
            socketio.emit('updateTasks')