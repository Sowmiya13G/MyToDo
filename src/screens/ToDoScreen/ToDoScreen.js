// import React, {useState, useEffect} from 'react';
// import {
//   Keyboard,
//   Text,
//   View,
//   FlatList,
//   SafeAreaView,
//   StatusBar,
// } from 'react-native';
// import {useSelector, useDispatch} from 'react-redux';
// import ToDoInput from '../../components/ToDoInput/ToDoInput';
// import ToDoItem from '../../components/ToDoItem/ToDoItem';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import {styles} from './styles';

// export default function ToDoScreen() {
//   const tasks = useSelector(state => state.tasks.tasks);
//   const dispatch = useDispatch();
//   const [backgroundColor, setBackgroundColor] = useState('#1E1A3C');
//   useEffect(() => {
//     loadTasks();
//     StatusBar.setBackgroundColor(backgroundColor);
//   }, [backgroundColor]);

//   const loadTasks = async () => {
//     try {
//       const savedTasks = await AsyncStorage.getItem('tasks');
//       console.log('savedTasks', savedTasks);
//     } catch (error) {
//       console.error('Error loading tasks from AsyncStorage:', error);
//     }
//   };
//   const saveTasksToAsyncStorage = async updatedTasks => {
//     try {
//       await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
//     } catch (error) {
//       console.error('Error saving tasks to AsyncStorage:', error);
//     }
//   };
//   const addTask = async task => {
//     if (task == null) return;
//     const newTasks = [...tasks, task];
//     dispatch(setTasks(newTasks));
//     saveTasksToAsyncStorage(newTasks);
//     Keyboard.dismiss();
//   };

//   const editTask = (index, editedTask) => {
//     const updatedTasks = [...tasks];
//     updatedTasks[index] = editedTask;
//     dispatch(setTasks(updatedTasks));
//     saveTasksToAsyncStorage(updatedTasks);
//   };

//   const deleteTask = async deleteIndex => {
//     const newTasks = tasks.filter((value, index) => index !== deleteIndex);
//     setTasks(newTasks);
//     try {
//       await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
//     } catch (error) {
//       console.error('Error saving tasks to AsyncStorage:', error);
//     }
//   };

//   return (
//     <SafeAreaView style={{flex: 1, backgroundColor}}>
//       <View style={styles.container}>
//         <Text style={styles.heading}>TODAY'S TODO LIST</Text>
//         <FlatList
//           data={tasks}
//           keyExtractor={(item, index) => index.toString()}
//           renderItem={({item, index}) => (
//             <View style={styles.taskContainer}>
//               <ToDoItem
//                 index={index + 1}
//                 task={item}
//                 deleteTask={() => deleteTask(index)}
//                 editTask={editTask}
//               />
//             </View>
//           )}
//         />
//         <ToDoInput addTask={addTask} />
//       </View>
//     </SafeAreaView>
//   );
// }

// In ToDoScreen.js

import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
  Keyboard,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ToDoInput from '../../components/ToDoInput/ToDoInput';
import ToDoItem from '../../components/ToDoItem/ToDoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setTasks} from '../../redux/actions/action';
import {styles} from './styles';

export default function ToDoScreen() {
  const tasks = useSelector(state => state.tasks.tasks);
  const dispatch = useDispatch();
  const [backgroundColor, setBackgroundColor] = useState('#1E1A3C');

  useEffect(() => {
    loadTasks();
    StatusBar.setBackgroundColor(backgroundColor);
  }, [backgroundColor]);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      console.log('savedTasks', savedTasks);
    } catch (error) {
      console.error('Error loading tasks from AsyncStorage:', error);
    }
  };

  const saveTasksToAsyncStorage = async updatedTasks => {
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks to AsyncStorage:', error);
    }
  };

  const addTask = async task => {
    if (!task) return;
    const newTasks = [...tasks, task];
    dispatch(setTasks(newTasks));
    saveTasksToAsyncStorage(newTasks);
    Keyboard.dismiss();
  };

  const editTask = (index, editedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editedTask;
    dispatch(setTasks(updatedTasks));
    saveTasksToAsyncStorage(updatedTasks);
  };

  const deleteTask = deleteIndex => {
    const newTasks = tasks.filter((_, index) => index !== deleteIndex);
    dispatch(setTasks(newTasks));
    saveTasksToAsyncStorage(newTasks);
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor}}>
      <View style={styles.container}>
        <Text style={styles.heading}>TODAY'S TODO LIST</Text>
        <FlatList
          data={tasks}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => (
            <View style={styles.taskContainer}>
              <ToDoItem
                index={index + 1}
                task={item}
                deleteTask={() => deleteTask(index)}
                editTask={editedTask => editTask(index, editedTask)}
              />
            </View>
          )}
        />
        <ToDoInput addTask={addTask} />
      </View>
    </SafeAreaView>
  );
}
