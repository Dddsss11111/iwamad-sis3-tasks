import { Pressable, StyleSheet, Text, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Animated, { FadeIn, FadeOut, LinearTransition } from 'react-native-reanimated';
import type { Task } from '../data/tasks';

interface TaskRowProps {
  task: Task;
  onPress: () => void;
  onDelete: () => void;
}

export function TaskRow({ task, onPress, onDelete }: TaskRowProps) {
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} layout={LinearTransition}>
      <Swipeable
        friction={2}
        rightThreshold={60}
        renderRightActions={(_progress, _translation, swipeable) => (
          <Pressable
            onPress={() => {
              swipeable.close();
              onDelete();
            }}
            style={({ pressed }) => [
              styles.deleteAction,
              pressed && styles.deleteActionPressed,
            ]}
          >
            <Text style={styles.deleteActionText}>Delete</Text>
          </Pressable>
        )}
      >
        <Pressable
          onPress={onPress}
          style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}
        >
          <View style={styles.rowHeader}>
            <Text style={styles.title}>{task.title}</Text>
          </View>
          <Text style={styles.dueDate}>Due: {task.dueDate}</Text>
        </Pressable>
      </Swipeable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    minHeight: 44,
    padding: 16,
    marginBottom: 10,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    justifyContent: 'center',
  },
  cardPressed: {
    backgroundColor: '#e0f2fe',
    borderColor: '#0284c7',
  },
  rowHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#0f172a',
  },
  dueDate: {
    fontSize: 14,
    color: '#64748b',
  },
  deleteAction: {
    minHeight: 44,
    backgroundColor: '#dc2626',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 10,
    marginLeft: 8,
  },
  deleteActionPressed: {
    backgroundColor: '#991b1b',
  },
  deleteActionText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
  },
});