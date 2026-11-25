import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useTasks } from '../../src/context/TasksContext';

export default function TaskDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { tasks, deleteTask } = useTasks();

  const task = tasks.find((item) => item.id === Number(id));

  if (!task) {
    return (
      <View style={styles.container}>
        <Stack.Screen options={{ title: 'Not Found' }} />
        <Text style={styles.notFoundTitle}>Task not found</Text>
        <Text style={styles.notFoundText}>No task with id {id}.</Text>
        <Pressable
          onPress={() => router.replace('/')}
          style={({ pressed }) => [styles.backButton, pressed && styles.backButtonPressed]}
        >
          <Text style={styles.buttonText}>Back to Tasks</Text>
        </Pressable>
      </View>
    );
  }

  const handleDelete = () => {
    deleteTask(task.id);
    router.back();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: task.title }} />
      <Text style={styles.title}>{task.title}</Text>
      <Text style={styles.dueDate}>Due: {task.dueDate}</Text>
      <Text style={styles.notes}>{task.notes}</Text>

      <Pressable
        onPress={handleDelete}
        style={({ pressed }) => [styles.deleteButton, pressed && styles.deleteButtonPressed]}
      >
        <Text style={styles.buttonText}>Delete Task</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  dueDate: {
    fontSize: 16,
    color: '#0284c7',
    fontWeight: '600',
    marginBottom: 16,
  },
  notes: {
    fontSize: 17,
    color: '#334155',
    lineHeight: 24,
    marginBottom: 32,
  },
  deleteButton: {
    minHeight: 44,
    backgroundColor: '#dc2626',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonPressed: {
    backgroundColor: '#991b1b',
  },
  backButton: {
    minHeight: 44,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  backButtonPressed: {
    backgroundColor: '#0056b3',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  notFoundTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0f172a',
    marginBottom: 8,
  },
  notFoundText: {
    fontSize: 16,
    color: '#64748b',
  },
});