import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { usePets } from '../control/usePetControl';
import { useTutores } from '../control/useTutorControl';

export default function HistoricoScreen() {
  const pets = usePets(); const tutores = useTutores();
  return <ScrollView style={styles.container}><Text style={styles.title}>Histórico Cadastral</Text><Text style={styles.subtitle}>Visão consolidada dos dados retornados pela API.</Text><View style={styles.card}><Text style={styles.cardTitle}>{tutores.data?.length || 0} tutores</Text>{(tutores.data || []).map((t) => <Text key={t.id}>• {t.nome}</Text>)}</View><View style={styles.card}><Text style={styles.cardTitle}>{pets.data?.length || 0} pets</Text>{(pets.data || []).map((p) => <Text key={p.id}>• {p.nome} — {p.especie} — tutor: {p.responsavelNome}</Text>)}</View></ScrollView>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 18, backgroundColor: '#f8fafc' }, title: { fontSize: 26, fontWeight: 'bold', color: '#1e293b' }, subtitle: { color: '#64748b', marginVertical: 10 }, card: { backgroundColor: '#fff', padding: 15, borderRadius: 10, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 10 }, cardTitle: { fontWeight: 'bold', fontSize: 17, color: '#2563eb', marginBottom: 7 } });
