import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {store, persistor} from './redux/store/store';
import ToDoScreen from './screens/ToDoScreen/ToDoScreen';

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ToDoScreen />
      </PersistGate>
    </Provider>
  );
}
