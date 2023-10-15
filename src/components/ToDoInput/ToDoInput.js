import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useDispatch} from 'react-redux';
import {styles} from './style';
import Icon from 'react-native-vector-icons/FontAwesome';
import {connect} from 'react-redux';
import {addTask} from '../../redux/actions/action';
const TaskInputField = props => {
  const [task, setTask] = useState();
  const dispatch = useDispatch();
  const handleAddTask = () => {
    if (task.trim() === '') return;
    dispatch(addTask(task));
    setTask('');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TextInput
        style={styles.inputField}
        value={task}
        onChangeText={text => setTask(text)}
        placeholder={'Write a task'}
        placeholderTextColor={'#fff'}
      />
      <TouchableOpacity onPress={() => handleAddTask(task)}>
        <View style={styles.button}>
          <Icon name="arrow-up" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};
export default connect(null, {addTask})(TaskInputField);
