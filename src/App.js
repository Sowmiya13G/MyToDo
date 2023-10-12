import React from 'react';
import {Provider} from 'react-redux';
import store from './redux/store/store';
import ToDoScreen from './screens/ToDoScreen/ToDoScreen';
export default function App() {
  return (
    <Provider store={store}>
      <ToDoScreen />
    </Provider>
  );
}
