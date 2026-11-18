import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../utils/colors';

export default function EmptyState({ title, message }) {
  return (
    <View style={styles.container}>
      <Ionicons name="checkbox-outline" size={42} color={COLORS.primary} />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center', padding: 30, marginTop: 30 },
  title: { fontSize: 17, fontWeight: '700', color: COLORS.text, marginTop: 12 },
  message: { fontSize: 13, color: COLORS.muted, textAlign: 'center', marginTop: 6, lineHeight: 19 }
});