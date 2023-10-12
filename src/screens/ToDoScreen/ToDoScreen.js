import React, {useState, useEffect} from 'react';
import {
  Keyboard,
  Text,
  View,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import ToDoInput from '../../components/ToDoInput/ToDoInput';
import ToDoItem from '../../components/ToDoItem/ToDoItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './styles';
export default function ToDoScreen() {
  const [tasks, setTasks] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState('#1E1A3C');
  useEffect(() => {
    loadTasks();
    StatusBar.setBackgroundColor(backgroundColor);
  }, [backgroundColor]);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem('tasks');
      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks));
      }
    } catch (error) {
      console.error('Error loading tasks from AsyncStorage:', error);
    }
  };

  const addTask = async task => {
    if (task == null) return;
    const newTasks = [...tasks, task];
    setTasks(newTasks);

    // Save updated tasks to AsyncStorage
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Error saving tasks to AsyncStorage:', error);
    }

    Keyboard.dismiss();
  };
  const editTask = (index, editedTask) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = editedTask;
    setTasks(updatedTasks);

    // Save updated tasks to AsyncStorage
    try {
      AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
    } catch (error) {
      console.error('Error saving tasks to AsyncStorage:', error);
    }
  };
  const deleteTask = async deleteIndex => {
    const newTasks = tasks.filter((value, index) => index !== deleteIndex);
    setTasks(newTasks);

    // Save updated tasks to AsyncStorage
    try {
      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (error) {
      console.error('Error saving tasks to AsyncStorage:', error);
    }
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
                editTask={editTask}
              />
            </View>
          )}
        />
        <ToDoInput addTask={addTask} />
      </View>
    </SafeAreaView>
  );
}
