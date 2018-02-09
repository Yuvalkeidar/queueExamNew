import axios from 'axios';
import io from 'socket.io-client';
const ROOT_URL = `http://127.0.0.1:5002`;

// managing the task to the server
export const FETCH_TASKS = 'FETCH_TASKS';
export const DELETE_TASK = 'DELETE_TASK';
export const CREATE_TASK = 'CREATE_TASK';

// get tasks
export function featchTasks(){
  const url = `${ROOT_URL}/getTasks`;
  const request = axios.get(url);

  return{
    type:FETCH_TASKS,
    payload:request
  };
}
// delete tasks
export function deleteTask(taskKey){
  debugger;
  const url = `${ROOT_URL}/deleteTask/${taskKey}`;
  const request = axios.post(url);

  return{
    type:DELETE_TASK,
    payload:request
  };
}
// creaet tasks
export function createTask(payload,eTime,priorty){
  const url = `${ROOT_URL}/createTask?payload=${payload}&eTime=${eTime}&priorty=${priorty}`;
  const request = axios.post(url);

  return{
    type:CREATE_TASK,
    payload:request
  };
}
