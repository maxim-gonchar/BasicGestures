import { ADD_NEW_TASK, DELETE_TASK } from "./types";

export const addNewTask = (task: {title: string; index: number}) => ({
  type: ADD_NEW_TASK,
  payload: task,
});

export const deleteTask = (newTasks: {title: string; index: number}[]) => ({
  type: DELETE_TASK,
  payload: newTasks,
});
