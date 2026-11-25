import { useRef, useState, type ComponentRef } from 'react';    
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { router } from 'expo-router';
import { useTasks } from '../src/context/TasksContext';


export default function NewTaskScreen() {
  const { addTask } = useTasks();
  const [title, setTitle] = useState('');
  const [notes, setNotes] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const notesInputRef = useRef<ComponentRef<typeof TextInput>>(null);
const dateInputRef = useRef<ComponentRef<typeof TextInput>>(null);

  const handleSave = () => {
    if (!title.trim()) {
      setErrorMessage('Task title is required.');
      return;
    }
    addTask(title, notes, dueDate);
    router.back();
  };

  return (
    <KeyboardAvoidingView
      style={styles.flex}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        <Text style={styles.label}>Title *</Text>
        <TextInput
          value={title}
          onChangeText={(text) => {
            setTitle(text);
            if (errorMessage) setErrorMessage('');
          }}
          placeholder="Enter task title"
          returnKeyType="next"
          onSubmitEditing={() => notesInputRef.current?.focus()}
          style={styles.input}
        />

        {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}

        <Text style={styles.label}>Notes</Text>
        <TextInput
          ref={notesInputRef}
          value={notes}
          onChangeText={setNotes}
          placeholder="Optional details"
          returnKeyType="next"
          onSubmitEditing={() => dateInputRef.current?.focus()}
          style={styles.input}
        />

        <Text style={styles.label}>Due Date</Text>
        <TextInput
          ref={dateInputRef}
          value={dueDate}
          onChangeText={setDueDate}
          placeholder="YYYY-MM-DD"
          returnKeyType="done"
          onSubmitEditing={handleSave}
          style={styles.input}
        />

        <Pressable
          onPress={handleSave}
          style={({ pressed }) => [styles.saveButton, pressed && styles.saveButtonPressed]}
        >
          <Text style={styles.saveButtonText}>Save Task</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  flex: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 6,
    marginTop: 12,
  },
  input: {
    minHeight: 44,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    backgroundColor: '#f8fafc',
  },
  error: {
    color: '#dc2626',
    fontSize: 14,
    marginTop: 6,
    fontWeight: '500',
  },
  saveButton: {
    minHeight: 44,
    backgroundColor: '#16a34a',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 24,
  },
  saveButtonPressed: {
    backgroundColor: '#15803d',
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 17,
    fontWeight: '600',
  },
});