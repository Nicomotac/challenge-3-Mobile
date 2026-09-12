import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen() {
  const { usuario } = useAuth();
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Clyvo PetCare</Text>
      <Text style={styles.subtitle}>Cuidado contínuo e inteligente para pets.</Text>
      <View style={styles.card}><Text style={styles.cardTitle}>Usuário</Text><Text>{usuario?.nome}</Text><Text>Perfil: {usuario?.role}</Text></View>
      <View style={styles.card}><Text style={styles.cardTitle}>Como usar</Text><Text>Use o menu lateral para acessar Tutores, Pets, painel veterinário, cuidados, triagem, histórico e o Assistente IA.</Text></View>
      <View style={styles.card}><Text style={styles.cardTitle}>Permissões</Text><Text>ADMIN pode criar, editar e excluir. USER pode consultar os dados cadastrados.</Text></View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' }, title: { fontSize: 30, fontWeight: 'bold', color: '#1e293b' }, subtitle: { color: '#64748b', marginTop: 5, marginBottom: 20 }, card: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e2e8f0', borderRadius: 12, padding: 16, marginBottom: 12 }, cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#2563eb', marginBottom: 7 } });
