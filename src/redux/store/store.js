import {createStore, combineReducers} from 'redux';
import taskReducer from '../reducers/reducer';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['tasks'],
};

const rootReducer = combineReducers({
  tasks: persistReducer(persistConfig, taskReducer),
});

const store = createStore(rootReducer);
const persistor = persistStore(store);

export {store, persistor};
