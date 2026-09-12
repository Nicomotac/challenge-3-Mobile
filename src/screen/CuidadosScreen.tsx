import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { usePets } from '../control/usePetControl';
import { recomendacaoDeCuidados } from '../services/cuidadosService';

export default function CuidadosScreen() {
  const pets = usePets();
  return <View style={styles.container}><Text style={styles.title}>Jornada de Cuidados</Text><Text style={styles.subtitle}>Recomendações simples baseadas nos pets retornados pela API.</Text><FlatList data={pets.data || []} keyExtractor={(item) => String(item.id)} renderItem={({ item }) => <View style={styles.card}><Text style={styles.name}>{item.nome}</Text><Text>{recomendacaoDeCuidados(item)}</Text></View>} ListEmptyComponent={!pets.isLoading ? <Text style={styles.empty}>Cadastre um pet para visualizar cuidados.</Text> : null} /></View>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 16, backgroundColor: '#f8fafc' }, title: { fontSize: 26, fontWeight: 'bold', color: '#1e293b' }, subtitle: { color: '#64748b', marginTop: 5, marginBottom: 14 }, card: { backgroundColor: '#fff', padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#e2e8f0', marginBottom: 10 }, name: { fontWeight: 'bold', fontSize: 17, color: '#2563eb', marginBottom: 5 }, empty: { color: '#64748b', textAlign: 'center', marginTop: 20 } });
