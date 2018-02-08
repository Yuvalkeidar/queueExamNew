import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { featchTasks,deleteTask } from '../actions/index';
import { Link } from 'react-router-dom';
import io from 'socket.io-client';

class TaskList extends Component{
  constructor(props) {
    super(props)

    const socket = io.connect('http://localhost:5002');
    socket.on('updateTasks',this.updateTasks.bind(this))

// bind this to all fucntions
    this.featchTasks   = props.featchTasks;
    this.onClickDelete = this.onClickDelete.bind(this);
    this.renderTasks   = this.renderTasks.bind(this);
    // this.updateTasks   = this.updateTasks.bind(this);
// create call get from the server
    this.featchTasks( );
// the worker run every minute so I refreshed the taks list 10 times in minute
// to see changes from the worker - better solution to use with websocket
// but I dont have enough time for that
    // setInterval(this.featchTasks,6000);
  }
  onClickDelete(event){
    this.props.deleteTask(event.target.id)
  }
  updateTasks(){
    this.featchTasks( );
  }
// render single row
  renderTasks(task,index){
    return(
      <tr key = {index}>
        <td>{task.payload}</td>
        <td>{task.eTime}</td>
        <td>{task.priorty}</td>
        <td><button id={task.taskKey}type="submit" className="btn btn-secondary" onClick={this.onClickDelete}>Delete</button></td>
      </tr>
    )
  }
  render(){
    return(
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Payload</th>
              <th>Execution Time</th>
              <th>Priorty</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
              {this.props.tasks.map(this.renderTasks)}
          </tbody>
        </table>
        <div>
          <span className="input-group-btn">
            <Link to="/addTask" className="btn btn-secondary">Move to add new task</Link>
          </span>
        </div>
      </div>
    )
  }
}

// create binding to the redux
function mapDispatchToProps(dispatch){
  return bindActionCreators({ featchTasks,deleteTask },dispatch);
}

function mapStateToProps(state){
  return {tasks:state.tasks};
}
export default connect(mapStateToProps,mapDispatchToProps)(TaskList);

// function mapStateToProps(state){
//   return {tasks:state.tasks};
// }
//
// export default connect(mapStateToProps)(TaskList);
