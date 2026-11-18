import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Screen from '../../components/Screen';
import { COLORS } from '../../utils/colors';

export default function ProfileScreen() {
  return (
    <Screen>
      <Text style={styles.heading}>Profile</Text>
      <View style={styles.profileCard}>
        <View style={styles.avatar}><Ionicons name="person" size={36} color={COLORS.primary} /></View>
        <Text style={styles.name}>University Student</Text>
        <Text style={styles.email}>student@example.com</Text>
        <Text style={styles.note}>Sample profile information</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>About Student Task Manager</Text>
        <Text style={styles.infoText}>A simple academic task organizer designed to help students plan assignments, study activities, project work, and deadlines.</Text>
      </View>
      <View style={styles.infoCard}>
        <Text style={styles.infoTitle}>Application details</Text>
        <Text style={styles.infoText}>Version 1.0.0</Text>
        <Text style={styles.infoText}>Built with React Native, Expo, and JavaScript.</Text>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  heading: { color: COLORS.text, fontSize: 27, fontWeight: '800', marginTop: 12, marginBottom: 20 },
  profileCard: { alignItems: 'center', backgroundColor: '#FFFFFF', borderRadius: 18, padding: 24, borderWidth: 1, borderColor: COLORS.border },
  avatar: { width: 78, height: 78, borderRadius: 39, backgroundColor: COLORS.primaryLight, alignItems: 'center', justifyContent: 'center', marginBottom: 12 },
  name: { color: COLORS.text, fontSize: 18, fontWeight: '800' },
  email: { color: COLORS.muted, fontSize: 13, marginTop: 4 },
  note: { color: COLORS.primary, fontSize: 11, marginTop: 10 },
  infoCard: { backgroundColor: '#FFFFFF', borderRadius: 16, padding: 17, marginTop: 15, borderWidth: 1, borderColor: COLORS.border },
  infoTitle: { color: COLORS.text, fontWeight: '800', fontSize: 15, marginBottom: 8 },
  infoText: { color: COLORS.muted, fontSize: 13, lineHeight: 20 }
});