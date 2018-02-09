import { FETCH_TASKS } from '../actions/index';
import { DELETE_TASK } from '../actions/index';
import { CREATE_TASK } from '../actions/index';

export default function(state=[],action){

  switch (action.type) {
    case FETCH_TASKS:
      if (action.error) {
        return state;
      }
      return action.payload.data.tasks;
    case DELETE_TASK:
      if (action.error) {
        return state;
      }
      return action.payload.data.tasks;
    case CREATE_TASK:
      if (action.error) {
        return state;
      }
      return action.payload.data.tasks;
  }
  return state;
}
