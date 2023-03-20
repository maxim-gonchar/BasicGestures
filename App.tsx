import React, {useCallback, useRef, useState} from 'react';
import {
  Dimensions,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';
import ListItem from './src/components/ListItem';
import Icon from 'react-native-vector-icons/Feather';

interface TaskInterface {
  title: string;
  index: number;
}

function App() {
  const [tasks, setTasks] = useState([
    {title: 'Record the dismissible tutorial', index: 0},
    {title: 'Leave to the video', index: 1},
    {title: 'Check YouTube comments', index: 2},
    {title: 'Subscribe to the channel', index: 3},
    {title: 'Leave a on the GitHub Repo', index: 4},
  ]);

  const onDismiss = useCallback((task: TaskInterface) => {
    setTasks(tasks => tasks.filter(item => item.index !== task.index));
  }, []);

  const scrollRef = useRef(null);
  const handleAddItem = () => {
    const newId = Math.floor(Math.random() * 1000);
    setTasks([...tasks, {title: 'New task', index: newId}]);
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
            onDismiss={onDismiss}
          />
        ))}
      </ScrollView>
      <Pressable style={styles.floatingButton} onPress={handleAddItem}>
        <Icon name="plus" color={'white'} size={32} />
      </Pressable>
    </SafeAreaView>
  );
}

export default () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <App />
    </GestureHandlerRootView>
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
    fontSize: 48,
    marginVertical: 20,
    color: 'black',
    textAlign: 'center',
  },
  floatingButton: {
    width: 50,
    height: 50,
    borderRadius: 24,
    backgroundColor: 'skyblue',
    position: 'absolute',
    bottom: Dimensions.get('window').height * 0.05,
    right: 16,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOpacity: 0.08,
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowRadius: 10,
    elevation: 5,
  },
});
