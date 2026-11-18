import React, { useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../../components/Screen';
import TaskCard from '../../components/TaskCard';
import EmptyState from '../../components/EmptyState';
import { useTasks } from '../../context/TasksContext';
import { COLORS } from '../../utils/colors';

const FILTERS = ['All', 'Pending', 'Completed'];

export default function TasksScreen() {
  const { tasks, toggleTask } = useTasks();
  const [filter, setFilter] = useState('All');
  const [modalVisible, setModalVisible] = useState(false);

  const filteredTasks = useMemo(() => {
    if (filter === 'Pending') return tasks.filter((task) => !task.completed);
    if (filter === 'Completed') return tasks.filter((task) => task.completed);
    return tasks;
  }, [tasks, filter]);

  return (
    <Screen>
      <View style={styles.header}>
        <View>
          <Text style={styles.heading}>My Tasks</Text>
          <Text style={styles.subheading}>Manage your academic activities</Text>
        </View>
        <Pressable style={styles.filterButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="filter" size={18} color={COLORS.primary} />
          <Text style={styles.filterText}>Filter</Text>
        </Pressable>
      </View>

      <View style={styles.activeFilter}>
        <Text style={styles.activeFilterText}>Showing: {filter}</Text>
        <Text style={styles.countText}>{filteredTasks.length} tasks</Text>
      </View>

      <FlatList
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => router.push(`/task/${item.id}`)}
            onToggle={() => toggleTask(item.id)}
          />
        )}
        ListEmptyComponent={<EmptyState title="No tasks found" message="Try changing the filter to see other tasks." />}
        showsVerticalScrollIndicator={false}
      />

      <Modal visible={modalVisible} transparent animationType="fade" onRequestClose={() => setModalVisible(false)}>
        <Pressable style={styles.overlay} onPress={() => setModalVisible(false)}>
          <Pressable style={styles.modalCard} onPress={() => {}}>
            <Text style={styles.modalTitle}>Filter tasks</Text>
            <Text style={styles.modalSubtitle}>Choose which tasks you want to view.</Text>
            {FILTERS.map((item) => (
              <Pressable
                key={item}
                style={[styles.option, filter === item && styles.selectedOption]}
                onPress={() => {
                  setFilter(item);
                  setModalVisible(false);
                }}
              >
                <Text style={[styles.optionText, filter === item && styles.selectedText]}>{item}</Text>
                {filter === item ? <Ionicons name="checkmark-circle" size={20} color={COLORS.primary} /> : null}
              </Pressable>
            ))}
            <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelText}>Cancel</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  heading: { color: COLORS.text, fontSize: 27, fontWeight: '800' },
  subheading: { color: COLORS.muted, fontSize: 13, marginTop: 5 },
  filterButton: { flexDirection: 'row', alignItems: 'center', gap: 6, paddingHorizontal: 13, paddingVertical: 10, borderRadius: 11, backgroundColor: COLORS.primaryLight },
  filterText: { color: COLORS.primary, fontWeight: '700', fontSize: 13 },
  activeFilter: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  activeFilterText: { color: COLORS.text, fontWeight: '700', fontSize: 13 },
  countText: { color: COLORS.muted, fontSize: 12 },
  overlay: { flex: 1, backgroundColor: '#00000066', justifyContent: 'center', padding: 25 },
  modalCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 20 },
  modalTitle: { color: COLORS.text, fontSize: 20, fontWeight: '800' },
  modalSubtitle: { color: COLORS.muted, fontSize: 13, marginTop: 5, marginBottom: 15 },
  option: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 12, borderRadius: 12, marginTop: 5 },
  selectedOption: { backgroundColor: COLORS.primaryLight },
  optionText: { color: COLORS.text, fontSize: 15, fontWeight: '600' },
  selectedText: { color: COLORS.primary },
  cancelButton: { alignItems: 'center', padding: 13, marginTop: 8 },
  cancelText: { color: COLORS.muted, fontWeight: '700' }
});