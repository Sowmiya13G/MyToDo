import {createStore, combineReducers} from 'redux';
import taskReducer from '../reducers/reducer';

const rootReducer = combineReducers({
  tasks: taskReducer,
});

const store = createStore(rootReducer);

export default store;
