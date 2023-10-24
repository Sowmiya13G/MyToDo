import {
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  SET_TASKS,
} from '../constants/constants';

export const addTask = task => {
  return {
    type: ADD_TASK,
    payload: task,
  };
};

export const editTask = (index, editedTask) => {
  return {
    type: EDIT_TASK,
    payload: {index, editedTask},
  };
};

export const deleteTask = index => {
  return {
    type: DELETE_TASK,
    payload: index,
  };
};

export const setTasks = tasks => {
  return {
    type: SET_TASKS,
    payload: tasks,
  };
};
