import React from 'react';
import { FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../../components/Screen';
import TaskCard from '../../components/TaskCard';
import { useTasks } from '../../context/TasksContext';
import { useAppForeground } from '../../hooks/useAppForeground';
import { COLORS } from '../../utils/colors';

export default function HomeScreen() {
  const { tasks, toggleTask } = useTasks();
  const { returnedToForeground, clearForegroundMessage } = useAppForeground();
  const completedCount = tasks.filter((task) => task.completed).length;
  const pendingCount = tasks.length - completedCount;
  const upcoming = tasks.filter((task) => !task.completed).slice(0, 3);

  return (
    <Screen>
      <FlatList
        data={upcoming}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            <Image
              source={{ uri: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=1200&q=85' }}
              style={styles.heroImage}
              accessibilityLabel="Study desk with notebooks and study materials"
            />
            <Text style={styles.greeting}>Hello, Student 👋</Text>
            <Text style={styles.subtitle}>Keep your university work organized.</Text>

            {returnedToForeground ? (
              <Pressable style={styles.foreground} onPress={clearForegroundMessage}>
                <Ionicons name="refresh-circle" size={18} color={COLORS.success} />
                <Text style={styles.foregroundText}>Welcome back! The app is active again. Tap to dismiss.</Text>
              </Pressable>
            ) : null}

            <View style={styles.summary}>
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>{tasks.length}</Text>
                <Text style={styles.summaryLabel}>Total tasks</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>{pendingCount}</Text>
                <Text style={styles.summaryLabel}>Pending</Text>
              </View>
              <View style={styles.summaryDivider} />
              <View style={styles.summaryItem}>
                <Text style={styles.summaryNumber}>{completedCount}</Text>
                <Text style={styles.summaryLabel}>Completed</Text>
              </View>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Upcoming tasks</Text>
              <Pressable onPress={() => router.push('/(tabs)/tasks')}>
                <Text style={styles.seeAll}>See all</Text>
              </Pressable>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <TaskCard
            task={item}
            onPress={() => router.push(`/task/${item.id}`)}
            onToggle={() => toggleTask(item.id)}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>You are all caught up. Great work!</Text>}
        ListFooterComponent={
          <Pressable style={styles.tip} onPress={() => router.push('/(tabs)/tasks')}>
            <Ionicons name="bulb-outline" size={22} color={COLORS.primary} />
            <View style={{ flex: 1 }}>
              <Text style={styles.tipTitle}>Study tip</Text>
              <Text style={styles.tipText}>Break large assignments into smaller tasks and complete them one by one.</Text>
            </View>
          </Pressable>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  heroImage: { width: '100%', height: 145, borderRadius: 18, marginBottom: 18, backgroundColor: COLORS.primaryLight },
  greeting: { fontSize: 27, fontWeight: '800', color: COLORS.text, marginTop: 12 },
  subtitle: { color: COLORS.muted, fontSize: 14, marginTop: 6, marginBottom: 22 },
  foreground: { flexDirection: 'row', alignItems: 'center', backgroundColor: COLORS.successLight, padding: 11, borderRadius: 12, marginBottom: 16, gap: 8 },
  foregroundText: { color: COLORS.success, fontSize: 12, flex: 1 },
  summary: { flexDirection: 'row', backgroundColor: COLORS.primary, borderRadius: 18, paddingVertical: 20, marginBottom: 26, alignItems: 'center' },
  summaryItem: { flex: 1, alignItems: 'center' },
  summaryNumber: { color: '#FFFFFF', fontSize: 25, fontWeight: '800' },
  summaryLabel: { color: '#E5E7FF', fontSize: 11, marginTop: 5 },
  summaryDivider: { width: 1, height: 35, backgroundColor: '#FFFFFF55' },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 13 },
  sectionTitle: { color: COLORS.text, fontSize: 18, fontWeight: '800' },
  seeAll: { color: COLORS.primary, fontWeight: '700', fontSize: 13 },
  empty: { color: COLORS.muted, textAlign: 'center', padding: 25 },
  tip: { flexDirection: 'row', gap: 12, padding: 15, backgroundColor: COLORS.primaryLight, borderRadius: 15, marginTop: 8, marginBottom: 20, alignItems: 'center' },
  tipTitle: { color: COLORS.text, fontWeight: '700', marginBottom: 3 },
  tipText: { color: COLORS.muted, fontSize: 12, lineHeight: 18 }
});