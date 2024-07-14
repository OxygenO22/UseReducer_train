import { v1 } from "uuid";
import { FilterValuesType, TaskType } from "../App";

const ADD_TASK = 'ADD-TASK'; 
const REMOVE_TASK = 'REMOVE-TASK'; 
const CHANGE_TASK_FILTER = 'CHANGE-TASK-FILTER'; 
const CHANGE_TASK_STATUS = 'CHANGE-TASK-STATUS'; 

type AddTaskAT = {
  type: 'ADD-TASK',
  payload: {
    title: string
  } 
}

type RemoveTaskAT = {
  type: 'REMOVE-TASK',
  payload: {
    taskId: string
  } 
}

type ChangeTaskFilterAT = {
  type: 'CHANGE-TASK-FILTER',
  payload: {
    filter: FilterValuesType
  } 
}

type ChangeTaskStatusAT = {
  type: 'CHANGE-TASK-STATUS',
  payload: {
    id: string, 
    isDone: boolean
  } 
}

type AT = AddTaskAT | RemoveTaskAT | ChangeTaskFilterAT | ChangeTaskStatusAT;


export const taskReducer = (tasks: TaskType[], action: AT): TaskType[] => {
  switch (action.type) {
    case 'ADD-TASK':
      const {title} = action.payload;
      return [{ id: v1(), title, isDone: false }, ...tasks];

    case 'REMOVE-TASK':
      const {taskId} = action.payload;
      return tasks.filter((task) => task.id !== taskId);

    case "CHANGE-TASK-FILTER":
      return tasks;

    case "CHANGE-TASK-STATUS":
      const {id, isDone} = action.payload;
      return tasks.map(el => el.id === id ? {...el, isDone} : el)
  
    default:
      return tasks;
  }
}