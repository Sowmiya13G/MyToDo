import {ADD_TASK, EDIT_TASK, DELETE_TASK} from '../actions/action';

const initialState = {
  tasks: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };

    case EDIT_TASK:
      const updatedTasks = [...state.tasks];
      updatedTasks[action.payload.index] = action.payload.editedTask;
      return {
        ...state,
        tasks: updatedTasks,
      };

    case DELETE_TASK:
      const newTasks = state.tasks.filter(
        (_, index) => index !== action.payload,
      );
      return {
        ...state,
        tasks: newTasks,
      };

    default:
      return state;
  }
};

export default rootReducer;
