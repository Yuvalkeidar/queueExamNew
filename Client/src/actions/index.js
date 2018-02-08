import axios from 'axios';
import io from 'socket.io-client';
const ROOT_URL = `http://127.0.0.1:5002`;
// const ROOT_SOCKET = `http://localhost:8888`;
// managing the task to the server
export const FETCH_TASKS = 'FETCH_TASKS';
export const DELETE_TASK = 'DELETE_TASK';
export const CREATE_TASK = 'CREATE_TASK';
// export const UPDATE_FROM_SERVER = 'UPDATE_FROM_SERVER';



// // open websocket
// export function updateTasks(tasks){
//   debugger;
//   return{
//     type:UPDATE_FROM_SERVER,
//     payload:tasks
//   };
// }
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
