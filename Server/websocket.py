from flask import Flask, render_template
from flask_socketio import SocketIO,send,emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app)

@socketio.on('connect')
def getMessage():
    socketio.emit('updateTasks')
    print 'run'

def updateTasks(tasks):
    socketio.emit('updateTasks')

if __name__ == '__main__':
    updateTasks("asdasd")
    socketio.run(app)
