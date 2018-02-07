import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createTask } from '../actions/index';
import TaskField from '../components/taskField';
import { Link } from 'react-router-dom';

class AddTask extends Component{
  constructor(props) {
    super(props)

// set initial state for data enter
    this.state = {
      payload: '',
      eTime: '',
      priorty:''
    };
// create new instance with connection to this
    this.createTask      = props.createTask;
    this.onPayloadChange = this.onPayloadChange.bind(this);
    this.onEtimeChange   = this.onEtimeChange.bind(this);
    this.onPriortyChange = this.onPriortyChange.bind(this);
    this.onFormSubmit    = this.onFormSubmit.bind(this);

  }

// on submit create new task in the server and return tasks
  onFormSubmit(event){
    event.preventDefault();

    this.createTask(this.state.payload,this.state.eTime,this.state.priorty);
    this.setState({
      payload: '',
      eTime:   '',
      priorty: ''
    });

  }
  onPayloadChange(event){
    this.setState({payload:event.target.value});
  }
  onEtimeChange(event){
    this.setState({eTime:event.target.value});
  }
  onPriortyChange(event){
    this.setState({priorty:event.target.value});
  }
  render(){
    return(
      <form onSubmit={this.onFormSubmit} className="input-group">
        <div>
          <TaskField
            label="Task name"
            placeholder="Enter name for task"
            value={this.state.payload}
            type="text"
            onChange={this.onPayloadChange}
          />
          <TaskField
            label="Execution time"
            placeholder="Enter execution time for task"
            value={this.state.eTime}
            pattern="[0-9]{6}"
            onChange={this.onEtimeChange}
          />
          <TaskField
            label="Priorty"
            placeholder="Enter priorty for task"
            value={this.state.priorty}
            type="number"
            onChange={this.onPriortyChange}
          />
        </div>
        <div>
          <span className="input-group-btn">
            <button type="submit" className="btn btn-primary">Create New Task</button>
            <Link to="/" className="btn btn-secondary">Move to task list</Link>
          </span>
        </div>
      </form>
    )
  }
}

// bind to redux action creator
function mapDispatchToProps(dispatch){
  return bindActionCreators({ createTask },dispatch);
}

export default connect(null,mapDispatchToProps)(AddTask);
