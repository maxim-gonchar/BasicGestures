import React, {useCallback, useRef, useState} from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Feather';
import {useDispatch, useSelector} from 'react-redux';
import ListItem from '../components/ListItem';
import {addNewTask, deleteTask} from '../store/actions';

interface TaskInterface {
  title: string;
  index: number;
}
export const MainScreen = () => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([
    {title: 'First task', index: 0},
    {title: 'Second task', index: 1},
    {title: 'Third task', index: 2},
    {title: 'Fourth task', index: 3},
    {title: 'Fifth task', index: 4},
  ]);
  const handleDeleteTask = useCallback((task: TaskInterface) => {
    setTasks(tasks => tasks.filter(item => item.index !== task.index));
  }, []);

  const scrollRef = useRef(null);
  const handleAddItem = () => {
    const index = Math.floor(Math.random() * 1000);
    setTasks([...tasks, {title: 'New task', index: index}]);
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Swipe left to delete</Text>
      <ScrollView ref={scrollRef} style={styles.scrollContainer}>
        {tasks.map(task => (
          <ListItem
            simultaneousHandlers={scrollRef}
            key={task.index}
            task={task}
            onDismiss={handleDeleteTask}
          />
        ))}
      </ScrollView>
      <Pressable style={styles.floatingButton} onPress={handleAddItem}>
        <Icon name="plus" color={'white'} size={32} />
      </Pressable>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAFBFF',
  },
  scrollContainer: {
    flex: 1,
  },
  title: {
    fontSize: 32,
    marginVertical: 20,
    color: 'black',
    textAlign: 'center',
  },
  floatingButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'orange',
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.05,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 22,
    },
    shadowRadius: 12,
    elevation: 6,
  },
});
