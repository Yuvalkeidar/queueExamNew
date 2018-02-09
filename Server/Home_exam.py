import sys
# import the flask_cors from package add that path
sys.path.insert(0, './packages/')

# service - webservice declartion and global list of tasks
from service   import tasks,app,socketio
# the worker print to log and delete the first task in the sorted list
from worker    import executeTask

if __name__ == '__main__':

# separte thread for running in background when the service is alive
    socketio.start_background_task(target=executeTask)

# open port for webservice connection
    socketio.run(app,port=5002)