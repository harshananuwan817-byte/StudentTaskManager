import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';

export default function TaskCard({ task, onPress, onToggle }) {
  const priorityColor = task.priority === 'High' ? COLORS.danger : task.priority === 'Medium' ? COLORS.warning : COLORS.success;

  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.card, pressed && styles.pressed]}>
      <View style={styles.topRow}>
        <View style={styles.titleArea}>
          <Text style={[styles.title, task.completed && styles.completed]}>{task.title}</Text>
          <Text style={styles.subject}>{task.subject}</Text>
        </View>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={task.completed ? 'Mark task as pending' : 'Mark task as completed'}
          onPress={(event) => {
            event.stopPropagation?.();
            onToggle();
          }}
          style={[styles.check, task.completed && styles.checked]}
        >
          {task.completed ? <Ionicons name="checkmark" size={18} color="#FFFFFF" /> : null}
        </Pressable>
      </View>
      <View style={styles.bottomRow}>
        <Text style={styles.due}>Due: {task.dueDate}</Text>
        <View style={[styles.priority, { backgroundColor: priorityColor + '18' }]}>
          <Text style={[styles.priorityText, { color: priorityColor }]}>{task.priority}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: COLORS.surface, borderRadius: 16, padding: 16, marginBottom: 12, borderWidth: 1, borderColor: COLORS.border },
  pressed: { opacity: 0.85 },
  topRow: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' },
  titleArea: { flex: 1, paddingRight: 12 },
  title: { fontSize: 15, fontWeight: '700', color: COLORS.text, lineHeight: 21 },
  completed: { textDecorationLine: 'line-through', color: COLORS.muted },
  subject: { fontSize: 12, color: COLORS.muted, marginTop: 5 },
  check: { width: 28, height: 28, borderRadius: 9, borderWidth: 1.5, borderColor: COLORS.border, alignItems: 'center', justifyContent: 'center' },
  checked: { backgroundColor: COLORS.success, borderColor: COLORS.success },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 14 },
  due: { fontSize: 12, color: COLORS.muted },
  priority: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 20 },
  priorityText: { fontSize: 11, fontWeight: '700' }
});