import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function PerfilScreen() {
  const { usuario, sair } = useAuth();
  return <View style={styles.container}><Text style={styles.title}>Meu Perfil</Text><View style={styles.card}><Text style={styles.name}>{usuario?.nome}</Text><Text>Usuário: {usuario?.username}</Text><Text>E-mail: {usuario?.email}</Text><Text>Perfil: {usuario?.role}</Text></View><TouchableOpacity style={styles.button} onPress={sair}><Text style={styles.buttonText}>Sair da conta</Text></TouchableOpacity></View>;
}
const styles = StyleSheet.create({ container: { flex: 1, padding: 20, backgroundColor: '#f8fafc' }, title: { fontSize: 26, fontWeight: 'bold', color: '#1e293b', marginBottom: 14 }, card: { backgroundColor: '#fff', padding: 16, borderRadius: 12, borderWidth: 1, borderColor: '#e2e8f0' }, name: { fontSize: 20, fontWeight: 'bold', color: '#2563eb', marginBottom: 6 }, button: { backgroundColor: '#dc2626', padding: 13, borderRadius: 9, marginTop: 16 }, buttonText: { color: '#fff', fontWeight: 'bold', textAlign: 'center' } });
