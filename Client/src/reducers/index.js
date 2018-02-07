import { combineReducers } from 'redux';
import TaskListReducer from './task_list_reducer';

const rootReducer = combineReducers({
  tasks:TaskListReducer
});

export default rootReducer;
