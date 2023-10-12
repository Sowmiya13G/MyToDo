import React, {useState} from 'react';
import {Text, View, TouchableOpacity, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {styles} from './styles';

export default function ToDoItem(props) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState(props.task);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    setIsEditing(false);
    props.editTask(props.index - 1, editedTask);
    console.log('Edited Text:', editedTask);
  };

  return (
    <View style={styles.container}>
      <View style={styles.indexContainer}>
        <Text style={styles.index}>{props.index}</Text>
      </View>
      <View style={styles.taskContainer}>
        {isEditing ? (
          <TextInput
            value={editedTask}
            onChangeText={text => setEditedTask(text)}
            onBlur={handleSave}
            autoFocus
          />
        ) : (
          <Text style={styles.task}>{props.task}</Text>
        )}
        <View style={styles.buttonsContainer}>
          {isEditing ? (
            <TouchableOpacity onPress={handleSave}>
              <Icon name="save" size={20} color="#CCC" />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={handleEdit}>
              <Icon name="edit" size={20} color="#CCC" />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() => props.deleteTask()}
            style={styles.button}>
            <Icon name="trash-o" size={20} color="#FF3B30" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
