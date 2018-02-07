import sys
# import the flask_cors from package add that path
sys.path.insert(0, './packages/')

from threading import Thread
# service - webservice declartion and global list of tasks
from service   import tasks,app
# the worker print to log and delete the first task in the sorted list
from worker    import executeTask

if __name__ == '__main__':

# separte thread for running in background when the service is alive
    worker = Thread(target=executeTask)
    worker.start()
# open port for webservice connection
    app.run(port=5002)

