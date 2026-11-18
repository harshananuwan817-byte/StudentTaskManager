import React from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import { COLORS } from '../utils/colors';

export default function Screen({ children, style }) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.content, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: COLORS.background },
  content: { flex: 1, paddingHorizontal: 20, paddingTop: 12 }
});