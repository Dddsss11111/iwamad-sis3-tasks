import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useTasks } from '../src/context/TasksContext';
import { TaskRow } from '../src/components/TaskRow';

export default function TaskListScreen() {
  const { tasks, deleteTask } = useTasks();

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => router.push('/new')}
        style={({ pressed }) => [styles.addButton, pressed && styles.addButtonPressed]}
      >
        <Text style={styles.addButtonText}>+ New Task</Text>
      </Pressable>

      <Text style={styles.hint}>Swipe left on a task to delete it.</Text>

      <FlatList
        data={tasks}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <TaskRow
            task={item}
            onPress={() => router.push(`/tasks/${item.id}`)}
            onDelete={() => deleteTask(item.id)}
          />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No tasks yet. Tap + New Task to create one.</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  addButton: {
    minHeight: 44,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  addButtonPressed: {
    backgroundColor: '#0056b3',
  },
  addButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
  hint: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#64748b',
    marginTop: 40,
  },
});