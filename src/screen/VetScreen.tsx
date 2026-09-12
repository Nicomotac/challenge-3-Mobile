import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePets } from '../control/usePetControl';
import { useTutores } from '../control/useTutorControl';

export default function VetScreen() {
  const pets = usePets();
  const tutores = useTutores();
  return <ScrollView style={styles.container}><Text style={styles.title}>Painel Veterinário</Text><Text style={styles.subtitle}>Visão rápida dos cadastros acompanhados.</Text><View style={styles.row}><View style={styles.card}><Text style={styles.number}>{pets.data?.length || 0}</Text><Text>Pets</Text></View><View style={styles.card}><Text style={styles.number}>{tutores.data?.length || 0}</Text><Text>Tutores</Text></View></View><View style={styles.info}><Text style={styles.cardTitle}>Objetivo</Text><Text>Centralizar informações para apoiar consultas, retornos e acompanhamento preventivo.</Text></View></ScrollView>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' }, title: { fontSize: 28, fontWeight: 'bold', color: '#1e293b' }, subtitle: { color: '#64748b', marginBottom: 18 }, row: { flexDirection: 'row', gap: 10 }, card: { flex: 1, backgroundColor: '#fff', padding: 18, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', alignItems: 'center' }, number: { fontSize: 30, fontWeight: 'bold', color: '#2563eb' }, info: { backgroundColor: '#fff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0', marginTop: 14 }, cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#2563eb', marginBottom: 7 } });
