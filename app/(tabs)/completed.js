import React from 'react';
import { FlatList, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import Screen from '../../components/Screen';
import TaskCard from '../../components/TaskCard';
import EmptyState from '../../components/EmptyState';
import { useTasks } from '../../context/TasksContext';
import { COLORS } from '../../utils/colors';

export default function CompletedScreen() {
  const { tasks, toggleTask } = useTasks();
  const completed = tasks.filter((task) => task.completed);

  return (
    <Screen>
      <Text style={styles.heading}>Completed Tasks</Text>
      <Text style={styles.subtitle}>Your finished work and achievements</Text>
      <FlatList
        data={completed}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard task={item} onPress={() => router.push(`/task/${item.id}`)} onToggle={() => toggleTask(item.id)} />
        )}
        ListEmptyComponent={<EmptyState title="Nothing completed yet" message="Completed tasks will appear here." />}
        showsVerticalScrollIndicator={false}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { color: COLORS.text, fontSize: 27, fontWeight: '800', marginTop: 12 },
  subtitle: { color: COLORS.muted, fontSize: 13, marginTop: 5, marginBottom: 22 }
});