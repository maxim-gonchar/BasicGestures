import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
  PanGestureHandlerProps,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

interface TaskInterface {
  title: string;
  index: number;
}

interface ListItemProps
  extends Pick<PanGestureHandlerProps, 'simultaneousHandlers'> {
  task: TaskInterface;
  handleDeleteTask?: (task: TaskInterface) => void;
}

const TASK_HEIGHT = 70;

const {width: SCREEN_WIDTH} = Dimensions.get('window');
const SWIPE_THRESHOLD = -SCREEN_WIDTH * 0.2;

const ListItem: React.FC<ListItemProps> = ({
  task,
  handleDeleteTask,
  simultaneousHandlers,
}) => {
  const translateX = useSharedValue(0);
  const itemHeight = useSharedValue(TASK_HEIGHT);
  const marginVertical = useSharedValue(10);
  const opacity = useSharedValue(1);

  const panGesture = useAnimatedGestureHandler<PanGestureHandlerGestureEvent>({
    onActive: event => {
      translateX.value = event.translationX;
    },
    onEnd: () => {
      const shouldBeDismissed = translateX.value < SWIPE_THRESHOLD;
      if (shouldBeDismissed) {
        translateX.value = withTiming(-SCREEN_WIDTH);
        itemHeight.value = withTiming(0);
        marginVertical.value = withTiming(0);
        opacity.value = withTiming(0, undefined, isFinished => {
          if (isFinished && handleDeleteTask) {
            runOnJS(handleDeleteTask)(task);
          }
        });
      } else {
        translateX.value = withTiming(0);
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: translateX.value,
      },
    ],
  }));

  const iconContainerStyle = useAnimatedStyle(() => {
    const opacity = withTiming(translateX.value < SWIPE_THRESHOLD ? 1 : 0);
    return {opacity};
  });

  const taskContainerStyle = useAnimatedStyle(() => {
    return {
      height: itemHeight.value,
      marginVertical: marginVertical.value,
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={[styles.taskContainer, taskContainerStyle]}>
      <Animated.View style={[styles.iconContainer, iconContainerStyle]}>
        <Icon name={'trash-2'} size={TASK_HEIGHT * 0.4} color={'red'} />
      </Animated.View>
      <PanGestureHandler
        simultaneousHandlers={simultaneousHandlers}
        onGestureEvent={panGesture}>
        <Animated.View style={[styles.task, animatedStyle]}>
          <Text style={styles.taskTitle}>{task.title}</Text>
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    width: '100%',
    alignItems: 'center',
  },
  task: {
    width: '90%',
    height: TASK_HEIGHT,
    justifyContent: 'center',
    paddingLeft: 20,
    backgroundColor: 'skyblue',
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowOffset: {
      width: 0,
      height: 24,
    },
    shadowRadius: 12,
    elevation: 6,
  },
  taskTitle: {
    fontSize: 18,
    color: 'black',
  },
  iconContainer: {
    height: TASK_HEIGHT,
    width: TASK_HEIGHT,
    position: 'absolute',
    right: '10%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListItem;
