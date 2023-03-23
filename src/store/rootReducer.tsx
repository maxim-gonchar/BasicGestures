import {ADD_NEW_TASK, DELETE_TASK} from './types';

const initialState: {tasks: Array<{title: string; index: number}>} = {
  tasks: [
    {title: 'First task', index: 0},
    {title: 'Second task', index: 1},
    {title: 'Third task', index: 2},
    {title: 'Fourth task', index: 3},
    {title: 'Fifth task', index: 4},
  ],
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NEW_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case DELETE_TASK:
      return {
        tasks: action.payload,
      };
    default:
      return state;
  }
};

export default appReducer;
