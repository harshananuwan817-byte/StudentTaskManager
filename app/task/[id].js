import React from 'react';
import { Alert, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useTasks } from '../../context/TasksContext';
import { COLORS } from '../../utils/colors';

export default function TaskDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { tasks, toggleTask } = useTasks();
  const task = tasks.find((item) => item.id === String(id));

  if (!task) {
    return (
      <View style={styles.notFound}>
        <Stack.Screen options={{ title: 'Task not found' }} />
        <Text style={styles.notFoundText}>This task could not be found.</Text>
      </View>
    );
  }

  const handleToggle = async () => {
    await toggleTask(task.id);
    Alert.alert('Task updated', task.completed ? 'Task moved back to pending.' : 'Task marked as completed.');
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Task Details', headerTintColor: COLORS.primary, headerTitleStyle: { fontWeight: '700' } }} />
      <ScrollView style={styles.page} contentContainerStyle={styles.content}>
        <View style={styles.iconCircle}><Ionicons name="book-outline" size={30} color={COLORS.primary} /></View>
        <Text style={styles.title}>{task.title}</Text>
        <Text style={styles.subject}>{task.subject}</Text>

        <View style={styles.detailsCard}>
          <DetailRow icon="calendar-outline" label="Due date" value={task.dueDate} />
          <DetailRow icon="flag-outline" label="Priority" value={task.priority} />
          <DetailRow icon="pricetag-outline" label="Category" value={task.category} />
          <DetailRow icon="checkmark-circle-outline" label="Status" value={task.completed ? 'Completed' : 'Pending'} />
        </View>

        <View style={styles.descriptionCard}>
          <Text style={styles.sectionTitle}>Description</Text>
          <Text style={styles.description}>{task.description}</Text>
        </View>

        <Pressable style={[styles.actionButton, task.completed && styles.pendingButton]} onPress={handleToggle}>
          <Ionicons name={task.completed ? 'refresh-outline' : 'checkmark-circle-outline'} size={19} color="#FFFFFF" />
          <Text style={styles.actionText}>{task.completed ? 'Mark as Pending' : 'Mark as Completed'}</Text>
        </Pressable>
      </ScrollView>
    </>
  );
}

function DetailRow({ icon, label, value }) {
  return (
    <View style={styles.detailRow}>
      <View style={styles.detailLabel}>
        <Ionicons name={icon} size={18} color={COLORS.primary} />
        <Text style={styles.label}>{label}</Text>
      </View>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  page: { flex: 1, backgroundColor: COLORS.background },
  content: { padding: 20, paddingBottom: 40 },
  iconCircle: { width: 64, height: 64, borderRadius: 20, backgroundColor: COLORS.primaryLight, alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  title: { color: COLORS.text, fontSize: 25, fontWeight: '800', lineHeight: 32 },
  subject: { color: COLORS.muted, fontSize: 14, marginTop: 7, marginBottom: 22 },
  detailsCard: { backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 16, borderWidth: 1, borderColor: COLORS.border },
  detailRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 16, borderBottomWidth: 1, borderBottomColor: COLORS.border },
  detailLabel: { flexDirection: 'row', alignItems: 'center', gap: 9 },
  label: { color: COLORS.muted, fontSize: 13 },
  value: { color: COLORS.text, fontSize: 13, fontWeight: '700' },
  descriptionCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 17, marginTop: 15, borderWidth: 1, borderColor: COLORS.border },
  sectionTitle: { color: COLORS.text, fontSize: 16, fontWeight: '800', marginBottom: 8 },
  description: { color: COLORS.muted, fontSize: 14, lineHeight: 22 },
  actionButton: { backgroundColor: COLORS.primary, borderRadius: 14, padding: 16, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 9, marginTop: 22 },
  pendingButton: { backgroundColor: COLORS.warning },
  actionText: { color: '#FFFFFF', fontSize: 14, fontWeight: '800' },
  notFound: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS.background },
  notFoundText: { color: COLORS.text, fontSize: 16 }
});