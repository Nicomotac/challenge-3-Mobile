import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

export default function Loading({ texto = 'Carregando...' }: { texto?: string }) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="#2563eb" />
      <Text style={styles.text}>{texto}</Text>
    </View>
  );
}
const styles = StyleSheet.create({ container: { padding: 24, alignItems: 'center' }, text: { marginTop: 10, color: '#475569' } });
