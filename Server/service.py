from flask import Flask, redirect, url_for, request, jsonify,render_template
from flask_cors import CORS
from dataFile import updateDataFile,tasks
from flask_socketio import SocketIO,emit
import sched, time,datetime

# get Max Key in the list to continue from there
# and to avoid duplicates
def getMaxKey():
    taskKey = 1
    for task in tasks:
        if taskKey < task['taskKey']:
            taskKey = task['taskKey']
    return taskKey

# This key will be the way to recognize the specific value that exist 
# get the max value as start key value
taskKey = getMaxKey()

app = Flask(__name__)

# open the webservie to all origins
CORS(app)

socketio = SocketIO(app,async_mode=None)

def updateTasks(tasks):
    updateDataFile(tasks)
    socketio.emit('updateTasks')

@socketio.on('connect') 
def handle_connect():
    socketio.emit('updateTasks')

# all the methods return json for the client
# new task - add task and sort the queue as the question want
# by Execution time and priorty
@app.route('/createTask' ,methods = ['POST'])
def createTask():
    try:
        global taskKey
        taskKey+=1
        if  request.args['payload'] \
        and request.args['eTime']   \
        and request.args['priorty'] :
            task = ({
                'payload':request.args['payload'],
                'eTime':  request.args['eTime'],
                'priorty':int(request.args['priorty']) ,
                'taskKey':taskKey,
            })
            tasks.append(task)
            tasks.sort(key = lambda x:(x['eTime'],x['priorty']*-1))

            updateTasks(tasks)

            return jsonify({'tasks': tasks})

    except Exception as e:
        return 'There is Missing fields',404

# get all tasks
@app.route('/getTasks')
def getTasks():
      return jsonify({'tasks': tasks})

# delete task by key
@app.route('/deleteTask/<int:key>', methods = ['POST'])
def deleteTask(key):
    index = 0
    for task in tasks:
        if key == task['taskKey']:
          del tasks[index]
        index+=1

    updateTasks(tasks)

    return jsonify({'tasks': tasks})
