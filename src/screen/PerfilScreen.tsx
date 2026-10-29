import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import Text from '../components/ThemedText';
import { useAuth } from '../context/AuthContext';
import { useTema, type Cores, type ModoTema } from '../Theme/themeContext';

const opcoes: Array<{ valor: ModoTema; titulo: string }> = [
  { valor: 'sistema', titulo: 'Seguir o sistema' },
  { valor: 'claro', titulo: 'Modo claro' },
  { valor: 'escuro', titulo: 'Modo escuro' },
];

export default function PerfilScreen() {
  const { usuario, sair } = useAuth();
  const { modo, definirModo, cores } = useTema();
  const styles = criarEstilos(cores);

  return (
    <ScrollView style={styles.pagina} contentContainerStyle={styles.conteudo}>
      <Text style={styles.titulo}>Meu Perfil</Text>
      <View style={styles.card}>
        <Text style={styles.nome}>{usuario?.nome ?? 'Usuário'}</Text>
        <Text>Usuário: {usuario?.username}</Text>
        <Text>E-mail: {usuario?.email}</Text>
        <Text>Perfil: {usuario?.role}</Text>
      </View>
      <View style={styles.card}>
        <Text style={styles.nome}>Aparência</Text>
        {opcoes.map((opcao) => (
          <TouchableOpacity
            key={opcao.valor}
            style={styles.opcao}
            onPress={() => definirModo(opcao.valor)}
          >
            <Text>{modo === opcao.valor ? '◉' : '○'} {opcao.titulo}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity style={styles.sair} onPress={() => { void sair(); }}>
        <Text style={styles.sairTexto}>Sair da conta</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const criarEstilos = (cores: Cores) => StyleSheet.create({
  pagina: { flex: 1, backgroundColor: cores.fundo },
  conteudo: { padding: 20 },
  titulo: { fontSize: 26, fontWeight: 'bold', marginBottom: 14 },
  card: {
    backgroundColor: cores.superficie,
    borderColor: cores.borda,
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    marginBottom: 14,
  },
  nome: { fontSize: 20, color: cores.primaria, fontWeight: 'bold', marginBottom: 8 },
  opcao: { paddingVertical: 12 },
  sair: { backgroundColor: '#dc2626', padding: 14, borderRadius: 9 },
  sairTexto: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
});
